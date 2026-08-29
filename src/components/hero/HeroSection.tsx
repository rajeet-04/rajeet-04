import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { createEntranceTimeline } from '../../lib/motion';
import { EngineeringCanvas } from './EngineeringCanvas';
import { PretextStatement } from './PretextStatement';

const focus = ['Android', 'AI / ML', 'Full-Stack', 'Research', 'Robotics exploration'];

export function HeroSection({ ready = true }: { ready?: boolean }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current || !ready) return;
    const animation = createEntranceTimeline(Array.from(ref.current.querySelectorAll('.hero__copy > *')), reducedMotion);
    return () => { animation?.pause(); };
  }, [ready, reducedMotion]);
  return <section ref={ref} className="hero section" aria-labelledby="hero-title">
    <div className="hero__copy"><p className="eyebrow">Software / systems / curiosity</p><h1 id="hero-title"><span className="hero__title-line">Software engineer</span><span className="hero__title-line">building products</span><span className="hero__title-line">that move.</span></h1><p className="hero__support">Native Android, AI-enabled products, and full-stack systems—with an interest in the edge where software meets the physical world.</p><div className="hero__actions"><a className="button button--solid" href="#work"><span>See selected work</span><span className="link-arrow" aria-hidden="true">↓</span></a><a className="button" href="#contact"><span>Start a conversation</span><span className="link-arrow" aria-hidden="true">↗</span></a></div></div>
    <div className="hero__map"><EngineeringCanvas reducedMotion={reducedMotion} /><div className="hero__map-content"><PretextStatement /><ul aria-label="Engineering focus">{focus.map((item) => <li key={item}><a href={item === 'Research' ? '#research' : item === 'Robotics exploration' ? '#capabilities' : '#work'}>{item}</a></li>)}</ul></div></div>
  </section>;
}
