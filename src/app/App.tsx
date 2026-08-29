import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export default function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top"><Header /></div>
      <main id="main-content" tabIndex={-1} />
      <Footer />
    </div>
  );
}
