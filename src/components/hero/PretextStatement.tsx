import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { layout, prepare } from '@chenglou/pretext';

const statement = 'Good software makes complex systems feel possible.';
const words = statement.split(/(\s+)/);

export function PretextStatement() {
  const [lineCount, setLineCount] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const prepared = prepare(statement, '600 24px system-ui');
      setLineCount(layout(prepared, 520, 32).lineCount);
    } catch {
      setLineCount(1);
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const units = Array.from(element.querySelectorAll<HTMLElement>('[data-pretext-unit]'));
    let frame = 0;
    let pointer = { x: 0, y: 0 };

    const move = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      if (frame) return;
      frame = window.setTimeout(() => {
        frame = 0;
        units.forEach((unit) => {
          const unitBounds = unit.getBoundingClientRect();
          const unitX = unitBounds.left - bounds.left + unitBounds.width / 2;
          const unitY = unitBounds.top - bounds.top + unitBounds.height / 2;
          const distance = Math.hypot(pointer.x - unitX, pointer.y - unitY);
          const strength = Math.max(0, 1 - distance / 150);
          const angle = Math.atan2(unitY - pointer.y, unitX - pointer.x);
          animate(unit, {
            translateX: Math.cos(angle) * strength * 8,
            translateY: Math.sin(angle) * strength * 8,
            duration: 260,
            ease: 'out(4)',
          });
        });
      }, 32);
    };
    const reset = () => {
      units.forEach((unit) => animate(unit, { translateX: 0, translateY: 0, duration: 300, ease: 'out(4)' }));
    };

    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    return () => {
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
      if (frame) window.clearTimeout(frame);
    };
  }, []);

  return <div ref={ref} className="pretext-statement" data-lines={lineCount} data-pretext-canvas="true" role="img" aria-label={statement}>
    <p aria-hidden="true">{words.map((word, index) => <span data-pretext-unit="true" data-pretext-space={word.trim() === '' ? 'true' : undefined} key={`${word}-${index}`}>{word === ' ' ? '\u00a0' : word}</span>)}</p>
  </div>;
}
