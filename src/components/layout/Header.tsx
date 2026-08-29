import { useState } from 'react';
import { SECTIONS } from '../../app/sections';
import { ThemeToggle } from '../ui/ThemeToggle';
import { CommandSurface } from '../terminal/CommandSurface';

export function Header() {
  const [commandOpen, setCommandOpen] = useState(false);
  return (
    <>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Rajeet Ash home">RA / 04</a>
      <nav aria-label="Primary">
        {SECTIONS.map((section) => <a key={section.id} href={`#${section.id}`}>{section.label}</a>)}
      </nav>
      <div className="header-actions"><button type="button" onClick={() => setCommandOpen(true)}>⌘K <span className="visually-hidden">Open command surface</span></button><ThemeToggle /></div>
    </header>
    <CommandSurface open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
