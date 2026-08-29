import type { ArchiveProject } from '../types/content';

export interface GitHubRepository {
  name: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  html_url: string;
  fork: boolean;
  archived: boolean;
}

export function isEligibleArchiveProject(repo: Pick<GitHubRepository, 'name' | 'fork' | 'archived'>) {
  return repo.name !== 'rajeet-04' && repo.name !== '.github';
}

export function toArchiveProject(repo: GitHubRepository): ArchiveProject {
  return {
    name: repo.name,
    description: repo.description ?? '',
    language: repo.language,
    updatedAt: repo.updated_at,
    htmlUrl: repo.html_url,
    fork: repo.fork,
    archived: repo.archived,
    ownership: repo.fork ? 'fork' : 'original',
  };
}
