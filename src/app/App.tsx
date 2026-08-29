import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SelectedWorkSection } from '../components/projects/SelectedWorkSection';
import { ResearchExperienceSection } from '../components/research/ResearchExperienceSection';
import { ArchiveSection } from '../components/archive/ArchiveSection';
import { HeroSection } from '../components/hero/HeroSection';
import { ContactSection } from '../components/contact/ContactSection';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top"><Header /></div>
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <SelectedWorkSection />
        <ResearchExperienceSection />
        <section id="capabilities" className="section"><p className="eyebrow">Capabilities</p><h2>Systems thinking, product instincts.</h2></section>
        <ArchiveSection />
        <ContactSection />
      </main>
      <Toaster position="bottom-right" />
      <Footer />
    </div>
  );
}
