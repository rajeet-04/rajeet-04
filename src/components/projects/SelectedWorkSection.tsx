import { curatedProjects } from '../../content/projects';
import { ProjectCard } from './ProjectCard';

export function SelectedWorkSection() {
  return (
    <section id="work" className="section section--work" aria-labelledby="work-title">
      <div className="section-heading"><p className="eyebrow">Selected systems</p><h2 id="work-title">Work with a reason to exist.</h2></div>
      <div className="project-grid">{curatedProjects.filter((project) => project.featured).map((project) => <ProjectCard key={project.id} project={project} />)}</div>
    </section>
  );
}
