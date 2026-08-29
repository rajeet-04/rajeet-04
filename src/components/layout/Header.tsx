import { SECTIONS } from '../../app/sections';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Rajeet Ash home">RA / 04</a>
      <nav aria-label="Primary">
        {SECTIONS.map((section) => <a key={section.id} href={`#${section.id}`}>{section.label}</a>)}
      </nav>
      <ThemeToggle />
    </header>
  );
}
