import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * G1 · Magnetic wrapper.
 *
 * Elements inside drift toward the cursor while it hovers within `radius`
 * pixels of the element's edge, and settle back when it leaves. Position is
 * driven by `gsap.quickTo` (one persistent tween per axis), so pointer movement
 * never triggers a React render and the settle-back is eased, not snapped.
 *
 * - Fine pointers only, and disabled entirely under reduced motion.
 * - The centre is corrected for the element's *current* magnetic offset,
 *   otherwise the pull feeds back on itself and the button drifts away.
 *
 * Used by the shared `Button` so every CTA on the site inherits the effect.
 */
export function Magnetic({
  children,
  strength = 0.32,
  radius = 80,
  className = '',
}: {
  children: ReactNode;
  /** How far the element chases the cursor (0 = not at all, 1 = onto it). */
  strength?: number;
  /** Extra attraction distance beyond the element's own edge, in px. */
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const offsetX = Number(gsap.getProperty(el, 'x'));
      const offsetY = Number(gsap.getProperty(el, 'y'));
      const dx = e.clientX - (r.left + r.width / 2 - offsetX);
      const dy = e.clientY - (r.top + r.height / 2 - offsetY);
      const reach = Math.max(r.width, r.height) / 2 + radius;

      if (Math.hypot(dx, dy) < reach) {
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, radius]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}

export default Magnetic;
