import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SelectedWorkSection } from '../components/projects/SelectedWorkSection';
import { ResearchExperienceSection } from '../components/research/ResearchExperienceSection';
import { ArchiveSection } from '../components/archive/ArchiveSection';

export default function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top"><Header /></div>
      <main id="main-content" tabIndex={-1}>
        <div className="page-intro"><p className="eyebrow">Building across the stack</p><h1>Rajeet Ash</h1><p>Software engineer building native Android, AI-enabled products, and full-stack systems.</p></div>
        <SelectedWorkSection />
        <ResearchExperienceSection />
        <section id="capabilities" className="section"><p className="eyebrow">Capabilities</p><h2>Systems thinking, product instincts.</h2></section>
        <ArchiveSection />
        <section id="contact" className="section"><p className="eyebrow">Contact</p><h2>Have a thoughtful problem?</h2></section>
      </main>
      <Footer />
    </div>
  );
}
