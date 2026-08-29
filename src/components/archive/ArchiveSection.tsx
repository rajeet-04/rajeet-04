import { useMemo, useState } from 'react';
import { archiveProjects } from '../../content/archive.generated';

export function ArchiveSection() {
  const [ownership, setOwnership] = useState('all');
  const visible = useMemo(() => archiveProjects.filter((project) => ownership === 'all' || project.ownership === ownership), [ownership]);

  return (
    <section id="archive" className="section archive-section" aria-labelledby="archive-title">
      <div className="section-heading"><div><p className="eyebrow">Open source trail</p><h2 id="archive-title">GitHub archive</h2></div>
        <label>Ownership<select aria-label="Ownership" value={ownership} onChange={(event) => setOwnership(event.target.value)}><option value="all">All</option><option value="original">Original</option><option value="fork">Forks</option></select></label>
      </div>
      {visible.length === 0 ? <p className="empty-state">No repositories match this filter. Browse the <a href="https://github.com/rajeet-04">GitHub profile ↗</a>.</p> : <div className="archive-list">{visible.slice(0, 24).map((project) => <a className="archive-row" key={project.name} href={project.htmlUrl} target="_blank" rel="noreferrer"><strong>{project.name}</strong><span>{project.language ?? 'Unspecified'} · {project.ownership}{project.archived ? ' · archived' : ''}</span></a>)}</div>}
      {visible.length > 24 && <p className="archive-note">Showing 24 of {visible.length}; the full archive remains available on GitHub.</p>}
    </section>
  );
}
