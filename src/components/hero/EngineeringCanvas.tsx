import { useEffect, useRef } from 'react';

const labels = ['Android', 'AI / ML', 'Full-Stack', 'Research', 'Robotics'];

export function EngineeringCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reducedMotion) return;
    let context: CanvasRenderingContext2D | null = null;
    try { context = canvas.getContext('2d'); } catch { return; }
    if (!context) return;
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio, 2);
      canvas.width = bounds.width * ratio; canvas.height = bounds.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, bounds.width, bounds.height);
      const center = { x: bounds.width / 2, y: bounds.height / 2 };
      labels.forEach((label, index) => {
        const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
        const point = { x: center.x + Math.cos(angle) * bounds.width * .27, y: center.y + Math.sin(angle) * bounds.height * .28 };
        context.strokeStyle = 'rgba(179, 79, 46, .3)'; context.lineWidth = 1;
        context.beginPath(); context.moveTo(center.x, center.y); context.lineTo(point.x, point.y); context.stroke();
        context.fillStyle = 'currentColor'; context.beginPath(); context.arc(point.x, point.y, 4, 0, Math.PI * 2); context.fill();
      });
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return <canvas className="engineering-canvas" ref={ref} aria-hidden="true" />;
}
