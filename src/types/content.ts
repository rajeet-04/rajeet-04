export type Ownership = 'original' | 'contribution' | 'research' | 'team' | 'fork';
export type ProjectCategory = 'android' | 'ai' | 'web' | 'research';

export interface Identity {
  name: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  lead: string;
  support: string;
}

export interface CuratedProject {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  role: string;
  stack: string[];
  evidenceUrl: string;
  repositoryUrl?: string;
  liveUrl?: string;
  image?: string;
  ownership: Ownership;
  featured: boolean;
}

export interface TimelineEntry {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  evidenceUrl: string;
  kind: 'research' | 'experience' | 'recognition' | 'credential';
}

export interface ArchiveProject {
  name: string;
  description: string;
  language: string | null;
  updatedAt: string;
  htmlUrl: string;
  fork: boolean;
  archived: boolean;
  ownership: 'original' | 'fork';
}
