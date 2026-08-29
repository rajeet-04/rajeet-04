import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { createEntranceTimeline } from '../../lib/motion';
import { EngineeringCanvas } from './EngineeringCanvas';
import { PretextStatement } from './PretextStatement';

const focus = ['Android', 'AI / ML', 'Full-Stack', 'Research', 'Robotics exploration'];

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const animation = createEntranceTimeline(Array.from(ref.current.querySelectorAll('.hero__copy > *')), reducedMotion);
    return () => { animation?.pause(); };
  }, [reducedMotion]);
  return <section ref={ref} className="hero section" aria-labelledby="hero-title">
    <div className="hero__copy"><p className="eyebrow">Software / systems / curiosity</p><h1 id="hero-title">Software engineer building products that move.</h1><p className="hero__support">Native Android, AI-enabled products, and full-stack systems—with an interest in the edge where software meets the physical world.</p><div className="hero__actions"><a className="button button--solid" href="#work">See selected work ↓</a><a className="button" href="#contact">Start a conversation ↗</a></div></div>
    <div className="hero__map"><EngineeringCanvas reducedMotion={reducedMotion} /><ul aria-label="Engineering focus">{focus.map((item) => <li key={item}><a href={item === 'Research' ? '#research' : item === 'Robotics exploration' ? '#capabilities' : '#work'}>{item}</a></li>)}</ul><PretextStatement /></div>
  </section>;
}
