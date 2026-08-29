const capabilities = [
  { title: 'Android products', detail: 'Native Kotlin, Jetpack Compose, offline-first data, and media-rich experiences.', proof: 'JUKES · Hopper' },
  { title: 'AI systems', detail: 'Human-centered AI, computer vision, local models, and safer application workflows.', proof: 'INTENTFENCE · BlindUnfold' },
  { title: 'Full-stack delivery', detail: 'Practical web systems with clear interfaces, durable data flows, and careful release work.', proof: 'TIDE · BizzChat' },
  { title: 'Research practice', detail: 'Turning technical questions into experiments, evidence, and explainable results.', proof: 'IEEE AICARE · BE-PS' },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="section capabilities-section" aria-labelledby="capabilities-title">
      <div className="section-heading"><div><p className="eyebrow">Capabilities</p><h2 id="capabilities-title">Systems thinking, product instincts.</h2></div><p className="section-heading__aside">A practical range for work that has to ship, explain itself, and keep working.</p></div>
      <div className="capability-list">{capabilities.map((capability) => <article className="capability-row" key={capability.title}><h3>{capability.title}</h3><p>{capability.detail}</p><span>{capability.proof}</span></article>)}</div>
    </section>
  );
}
