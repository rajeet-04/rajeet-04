import { timeline } from '../../content/timeline';

export function ResearchExperienceSection() {
  return (
    <section id="research" className="section" aria-labelledby="research-title">
      <div className="section-heading"><p className="eyebrow">Evidence / trajectory</p><h2 id="research-title">Research, practice, and momentum.</h2></div>
      <div className="timeline">{timeline.map((entry) => <article className="timeline-item" key={entry.id}>
        <p className="eyebrow">{entry.date} · {entry.kind}</p>
        <h3>{entry.title}</h3><p>{entry.description}</p>
        <a href={entry.evidenceUrl} target="_blank" rel="noreferrer">View evidence ↗</a>
        <span className="evidence-label">Evidence-linked</span>
      </article>)}</div>
    </section>
  );
}
