import type { CuratedProject } from '../types/content';

export const curatedProjects: CuratedProject[] = [
  {
    id: 'jukes', title: 'JUKES', category: 'android',
    summary: 'A native Android music player built around smart discovery, offline playback, and a small production-ready footprint.',
    role: 'Creator and maintainer', stack: ['Kotlin', 'Jetpack Compose', 'Room', 'Ktor', 'Media3'],
    evidenceUrl: 'https://github.com/rajeet-04/JUKES', repositoryUrl: 'https://github.com/rajeet-04/JUKES',
    liveUrl: 'https://github.com/rajeet-04/JUKES/releases', ownership: 'original', featured: true,
  },
  {
    id: 'intentfence', title: 'INTENTFENCE', category: 'ai',
    summary: 'An AI-assisted security product exploring safer interpretation of user intent in application workflows.',
    role: 'Creator and maintainer', stack: ['Python', 'AI', 'Web'],
    evidenceUrl: 'https://github.com/rajeet-04/INTENTFENCE', repositoryUrl: 'https://github.com/rajeet-04/INTENTFENCE',
    liveUrl: 'https://intentfence.vercel.app', ownership: 'original', featured: true,
  },
  {
    id: 'blindunfold', title: 'BlindUnfold', category: 'ai',
    summary: 'A real-time vision project exploring accessible computer interaction for visually impaired students.',
    role: 'Project contributor', stack: ['TypeScript', 'Computer Vision', 'Realtime Systems'],
    evidenceUrl: 'https://github.com/rajeet-04/BlindUnfold', repositoryUrl: 'https://github.com/rajeet-04/BlindUnfold',
    ownership: 'contribution', featured: true,
  },
  {
    id: 'offline-file-transfer', title: 'Offline File Transfer', category: 'web',
    summary: 'A peer-to-peer transfer experiment designed for sharing files without depending on a central server.',
    role: 'Creator and maintainer', stack: ['JavaScript', 'WebRTC', 'P2P Networking'],
    evidenceUrl: 'https://github.com/rajeet-04/OFFLINE_FILE_TRANSFER', repositoryUrl: 'https://github.com/rajeet-04/OFFLINE_FILE_TRANSFER',
    ownership: 'original', featured: true,
  },
  {
    id: 'be-ps', title: 'BE-PS Research', category: 'research',
    summary: 'An entropy-guided parallel sorting approach for clustered renewable-energy and power-system data.',
    role: 'Research author and presenter', stack: ['C++', 'Shannon Entropy', 'Power Systems', 'Algorithms'],
    evidenceUrl: 'https://doi.org/10.1109/AICARE66005.2025.11402801',
    ownership: 'research', featured: true,
  },
  {
    id: 'tinycolor-go', title: 'TinyColor-Go', category: 'web',
    summary: 'A team-built color utility created during a 72-hour Hackathon Raptors challenge.',
    role: 'Team project contributor', stack: ['Go', 'Algorithms', 'Open Source'],
    evidenceUrl: 'https://www.linkedin.com/in/rajeet/', repositoryUrl: 'https://github.com/rajeet-04/TinyColor',
    ownership: 'team', featured: true,
  },
];
