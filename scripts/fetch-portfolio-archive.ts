import { writeFile } from 'node:fs/promises';
import { isEligibleArchiveProject, toArchiveProject, type GitHubRepository } from '../src/lib/archive';

const endpoint = 'https://api.github.com/users/rajeet-04/repos?per_page=100&sort=updated';
const response = await fetch(endpoint, { headers: { Accept: 'application/vnd.github+json', ...(Bun.env.GITHUB_TOKEN ? { Authorization: `Bearer ${Bun.env.GITHUB_TOKEN}` } : {}) } });

if (!response.ok) throw new Error(`GitHub API failed: ${response.status} ${response.statusText}`);
const payload: unknown = await response.json();
if (!Array.isArray(payload)) throw new Error('GitHub API returned an invalid repository list');

const repositories = payload.filter((item): item is GitHubRepository => Boolean(item && typeof item === 'object' && 'name' in item && 'html_url' in item));
const projects = repositories.filter(isEligibleArchiveProject).map(toArchiveProject).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
const source = `import type { ArchiveProject } from '../types/content';\n\nexport const archiveProjects: ArchiveProject[] = ${JSON.stringify(projects, null, 2)};\n`;
await writeFile(new URL('../src/content/archive.generated.ts', import.meta.url), source);
console.log(`Wrote ${projects.length} archive repositories`);
