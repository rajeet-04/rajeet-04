#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const fetch = global.fetch || require('node-fetch');

const OUT = path.join(__dirname, '..', 'gh_stats.svg');
const URL = 'https://github-readme-stats.vercel.app/api?username=rajeet-04&show_icons=true&theme=tokyonight';

async function main(){
  try{
    const res = await fetch(URL);
    if(!res.ok){
      throw new Error(`Failed to fetch ${URL}: ${res.status}`);
    }
    const text = await res.text();
    fs.writeFileSync(OUT, text, 'utf8');
    console.log('Saved', OUT);
  }catch(err){
    console.error('Error fetching stats:', err.message || err);
    process.exit(2);
  }
}

main();
