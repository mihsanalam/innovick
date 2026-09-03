import { useEffect, useRef } from 'react';
import { fireConfetti } from '@/components/visuals/confetti';

/**
 * Invisible marker that fires one confetti burst from its parent the first time
 * the parent scrolls into view (P1 · confetti result cards on `/success`).
 *
 * Give the parent `position: relative`. The burst self-removes, fires once, and
 * no-ops under reduced motion (handled inside `fireConfetti`).
 */
export function ConfettiOnView({ count = 18 }: { count?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const marker = ref.current;
    const host = marker?.parentElement;
    if (!marker || !host) return;

    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          fireConfetti(host, count);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(host);
    return () => io.disconnect();
  }, [count]);

  return <span ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}

export default ConfettiOnView;
