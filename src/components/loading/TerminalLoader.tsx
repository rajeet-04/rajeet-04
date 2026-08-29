import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, stagger, type JSAnimation } from 'animejs';

const FULL_DURATION = 820;
const EXIT_START = 620;
const REDUCED_DURATION = 160;

export function TerminalLoader({ reducedMotion, onComplete }: { reducedMotion: boolean; onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const [leaving, setLeaving] = useState(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    let lineAnimation: JSAnimation | undefined;
    if (!reducedMotion && rootRef.current) {
      lineAnimation = animate(rootRef.current.querySelectorAll('.terminal-loader__line'), {
        opacity: [0, 1],
        translateY: [8, 0],
        delay: stagger(80),
        duration: 280,
        ease: 'out(4)',
      });
    }

    const exitTimer = window.setTimeout(() => setLeaving(true), reducedMotion ? 0 : EXIT_START);
    const completeTimer = window.setTimeout(finish, reducedMotion ? REDUCED_DURATION : FULL_DURATION);
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') finish(); };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      lineAnimation?.pause();
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [finish, reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="terminal-loader"
      data-leaving={leaving}
      data-reduced-motion={reducedMotion}
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
    >
      <div className="terminal-loader__panel">
        <div className="terminal-loader__bar" aria-hidden="true"><span /><span /><span /></div>
        <div className="terminal-loader__body">
          <p className="terminal-loader__line"><span className="terminal-loader__prompt">rajeet@portfolio:~$</span> init portfolio</p>
          <p className="terminal-loader__line"><span className="terminal-loader__ok">[ok]</span> systems online</p>
          <p className="terminal-loader__line">opening portfolio<span className="terminal-loader__cursor" aria-hidden="true">_</span></p>
        </div>
        <span className="terminal-loader__hint">esc to skip</span>
      </div>
    </div>
  );
}
