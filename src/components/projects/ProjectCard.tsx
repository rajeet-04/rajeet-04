import { useState } from 'react';
import type { CuratedProject } from '../../types/content';

export function ProjectCard({ project }: { project: CuratedProject }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="project-card" aria-label={project.title}>
      <div className="project-card__visual" data-testid={`project-preview-${project.id}`} data-category={project.category} aria-hidden="true">
        <div className="project-card__visual-top"><span>0{project.id === 'jukes' ? 1 : project.id === 'intentfence' ? 2 : 3} / {project.category}</span><span>selected system</span></div>
        <div className="project-card__visual-core"><strong>{project.title}</strong><span className="project-card__visual-pulse" /></div>
        <div className="project-card__visual-stack">{project.stack.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="project-card__body">
        <p className="eyebrow">{project.category} · {project.ownership}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-card__actions">
          <button type="button" aria-expanded={open} aria-controls={`${project.id}-details`} aria-label={`Details for ${project.title}`} onClick={() => setOpen(!open)}>
            {open ? 'Hide details' : 'Details'}
          </button>
          <a href={project.evidenceUrl} target="_blank" rel="noreferrer">Evidence <span className="link-arrow" aria-hidden="true">↗</span></a>
        </div>
        <div id={`${project.id}-details`} hidden={!open} className="project-card__details">
          <strong>{project.role}</strong>
          <div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
          {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer">Repository <span className="link-arrow" aria-hidden="true">↗</span></a>}
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live / release <span className="link-arrow" aria-hidden="true">↗</span></a>}
        </div>
      </div>
    </article>
  );
}
