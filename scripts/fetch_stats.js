#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
let fetch = global.fetch;
if (!fetch) {
  try {
    // Try node-fetch if available
    // eslint-disable-next-line global-require
    fetch = require('node-fetch');
  } catch (e) {
    // Last-resort small fetch using https
    const https = require('https');
    fetch = (url, opts = {}) => new Promise((resolve, reject) => {
      const { method = 'GET', headers = {}, body } = opts;
      const u = new URL(url);
      const req = https.request({ hostname: u.hostname, path: u.pathname + u.search, method, headers }, res => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', chunk => (data += chunk));
        res.on('end', () => {
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, text: async () => data, json: async () => JSON.parse(data) });
        });
      });
      req.on('error', reject);
      if (body) req.write(body);
      req.end();
    });
  }
}

const OUT = path.join(__dirname, '..', 'gh_stats.svg');
const EXTERNAL_URL = 'https://github-readme-stats.vercel.app/api?username=rajeet-04&show_icons=true&theme=tokyonight';

function svgTemplate({ name, stars, repos, followers, commits, prs, issues, topLangs }){
  const rows = [
    { label: 'Repos', value: repos },
    { label: 'Stars', value: stars },
    { label: 'Followers', value: followers },
    { label: 'Commits (year)', value: commits },
    { label: 'PRs (year)', value: prs },
    { label: 'Issues (year)', value: issues }
  ];
  const langLine = topLangs.map(l => `${l.name} (${l.count})`).join(' • ');
  const width = 680;
  const height = 140;
  const yStart = 34;
  const lineHeight = 18;
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n` +
    `<style>text{font-family: Inter, sans-serif; fill:#cdd6f4; font-size:14px;} .title{font-size:16px; font-weight:700; fill:#89b4fa;} .value{font-weight:700; fill:#f5c2e7;}</style>\n` +
    `<rect width="100%" height="100%" fill="#0f1724" rx="8" />\n` +
    `<text x="24" y="20" class="title">GitHub Summary — ${name}</text>\n` +
    rows.map((r, i) => `<text x="24" y="${yStart + i*lineHeight}"><tspan class="label">${r.label}: </tspan><tspan class="value">${r.value}</tspan></text>`).join('\n') +
    `<text x="24" y="${yStart + rows.length*lineHeight + 12}" style="font-size:12px; fill:#89b4fa">Top languages: ${langLine}</text>\n` +
    `</svg>`;
}

async function fetchExternal(){
  try{
    const res = await fetch(EXTERNAL_URL, { timeout: 10000 });
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const txt = await res.text();
    fs.writeFileSync(OUT, txt, 'utf8');
    console.log('Saved (external)', OUT);
    return true;
  }catch(err){
    console.warn('External stats fetch failed:', err.message || err);
    return false;
  }
}

async function queryGitHub(token){
  const url = 'https://api.github.com/graphql';
  const now = new Date();
  const to = now.toISOString();
  const fromDate = new Date(now.getTime() - 365*24*60*60*1000).toISOString();
  const query = `query($login: String!, $from: DateTime!, $to: DateTime!) {\n` +
    `  user(login: $login) {\n` +
    `    name\n` +
    `    login\n` +
    `    followers { totalCount }\n` +
    `    repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {\n` +
    `      totalCount\n` +
    `      nodes { stargazerCount primaryLanguage { name } }\n` +
    `    }\n` +
    `    contributionsCollection(from: $from, to: $to) {\n` +
    `      totalCommitContributions\n` +
    `      totalPullRequestContributions\n` +
    `      totalIssueContributions\n` +
    `    }\n` +
    `  }\n` +
    `}`;
  const variables = { login: 'rajeet-04', from: fromDate, to };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'fetch-stats-script' },
    body: JSON.stringify({ query, variables })
  });
  if(!res.ok) throw new Error(`GraphQL ${res.status}`);
  const json = await res.json();
  if(json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data.user;
}

async function fallbackLocal(token){
  try{
    const user = await queryGitHub(token);
    // aggregate stars and languages
    const repos = user.repositories.nodes || [];
    const stars = repos.reduce((s, r) => s + (r.stargazerCount || 0), 0);
    const reposCount = user.repositories.totalCount || repos.length;
    const followers = user.followers.totalCount || 0;
    const commits = user.contributionsCollection.totalCommitContributions || 0;
    const prs = user.contributionsCollection.totalPullRequestContributions || 0;
    const issues = user.contributionsCollection.totalIssueContributions || 0;
    const langs = {};
    repos.forEach(r => { if(r.primaryLanguage && r.primaryLanguage.name){ langs[r.primaryLanguage.name] = (langs[r.primaryLanguage.name]||0) + 1; } });
    const topLangs = Object.entries(langs).sort((a,b) => b[1]-a[1]).slice(0,3).map(([name,count]) => ({ name, count }));
    const name = user.name || user.login || 'rajeet-04';
    const svg = svgTemplate({ name, stars, repos: reposCount, followers, commits, prs, issues, topLangs });
    fs.writeFileSync(OUT, svg, 'utf8');
    console.log('Saved (local)', OUT);
    return true;
  }catch(err){
    console.error('Local fallback failed:', err.message || err);
    return false;
  }
}

async function main(){
  const ok = await fetchExternal();
  if(ok) return;
  // try GraphQL fallback using GH_PAT or GITHUB_TOKEN from env
  const token = process.env.GH_PAT || process.env.GITHUB_TOKEN;
  if(!token){
    console.error('No GH_PAT or GITHUB_TOKEN found for GraphQL fallback. Exiting.');
    process.exit(2);
  }
  const ok2 = await fallbackLocal(token);
  if(!ok2) process.exit(2);
}

main();
