import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const move = (event: PointerEvent) => {
      animate(cursor, {
        translateX: event.clientX,
        translateY: event.clientY,
        duration: 220,
        ease: 'out(4)',
      });
    };
    const setInteractive = (active: boolean) => {
      if (active) cursor.dataset.active = 'true';
      else delete cursor.dataset.active;
      animate(cursor, { scale: active ? 1.35 : 1, duration: 180, ease: 'out(4)' });
    };
    const overInteractive = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest('a, button, [data-pretext-canvas="true"]')) setInteractive(true);
    };
    const outInteractive = (event: Event) => {
      const related = (event as MouseEvent).relatedTarget;
      if (!(related instanceof Element) || !related.closest('a, button, [data-pretext-canvas="true"]')) setInteractive(false);
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', overInteractive, { passive: true });
    document.addEventListener('pointerout', outInteractive, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', overInteractive);
      document.removeEventListener('pointerout', outInteractive);
    };
  }, []);

  return <div ref={ref} className="custom-cursor" data-testid="custom-cursor" aria-hidden="true"><span /></div>;
}
