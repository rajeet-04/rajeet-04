import { useCallback, useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SelectedWorkSection } from '../components/projects/SelectedWorkSection';
import { ResearchExperienceSection } from '../components/research/ResearchExperienceSection';
import { ArchiveSection } from '../components/archive/ArchiveSection';
import { HeroSection } from '../components/hero/HeroSection';
import { ContactSection } from '../components/contact/ContactSection';
import { TerminalLoader } from '../components/loading/TerminalLoader';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Toaster } from 'sonner';
import { CustomCursor } from '../components/ui/CustomCursor';
import { CapabilitiesSection } from '../components/capabilities/CapabilitiesSection';

const LOADER_SESSION_KEY = 'rajeet-portfolio-loader-seen';

function loaderWasSeen() {
  if (typeof window === 'undefined') return true;
  try { return window.sessionStorage.getItem(LOADER_SESSION_KEY) === 'true'; }
  catch { return false; }
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(() => !loaderWasSeen());
  const finishLoader = useCallback(() => {
    try { window.sessionStorage.setItem(LOADER_SESSION_KEY, 'true'); }
    catch { /* The loader remains optional when storage is unavailable. */ }
    setShowLoader(false);
  }, []);

  return (
    <div className="app-shell" aria-busy={showLoader}>
      {showLoader && <TerminalLoader reducedMotion={reducedMotion} onComplete={finishLoader} />}
      <CustomCursor />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top"><Header /></div>
      <main id="main-content" tabIndex={-1}>
        <HeroSection ready={!showLoader} />
        <SelectedWorkSection />
        <ResearchExperienceSection />
        <CapabilitiesSection />
        <ArchiveSection />
        <ContactSection />
      </main>
      <Toaster position="bottom-right" />
      <Footer />
    </div>
  );
}
