import { animate, stagger, type JSAnimation } from 'animejs';

export function createEntranceTimeline(elements: Element[], reducedMotion: boolean): JSAnimation | undefined {
  if (reducedMotion || elements.length === 0) return undefined;
  return animate(elements, { opacity: [0, 1], translateY: [16, 0], delay: stagger(60), duration: 520, ease: 'out(4)' });
}
