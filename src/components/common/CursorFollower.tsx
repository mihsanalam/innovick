import { useEffect, useRef } from 'react';

/** The puck's resting fill. Cleared on hover so only the ring is left. */
const FILL = 'radial-gradient(circle at 34% 30%, rgba(142,49,181,.22), rgba(142,49,181,.10) 70%)';
const SHADOW = '0 8px 26px rgba(142,49,181,.16)';

/** Anything worth swelling over. */
const TARGETS = 'a, button, [role="button"], input, textarea, select, label';

/**
 * A soft glass puck that trails the cursor.
 *
 * It eases toward the pointer instead of tracking it — the lag *is* the effect,
 * so it reads as weight rather than as a cursor replacement. The native cursor
 * stays visible on top; this is decoration, not a custom cursor.
 *
 * Over anything clickable it swells and empties out: the fill and shadow drop
 * away and it becomes a bare purple ring around the thing you're about to click.
 *
 * Built to survive the dark bands — a translucent fill alone would vanish on
 * `#0d1128`, so the ring carries the shape. Both are brand purple, which reads
 * on white and on navy.
 *
 * Position is written straight to `style.transform` inside a single rAF loop, so
 * a moving mouse never triggers a React render.
 *
 * Runs only for fine pointers, and only when the visitor hasn't asked for
 * reduced motion — but it *re-checks* both, so plugging in a mouse (or a device
 * switching from touch to trackpad) starts it without a reload. Pass `src` to put
 * an image inside the puck.
 */
export function CursorFollower({ src }: { src?: string }) {
  const puckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const puck = puckRef.current;
    if (!puck) return;

    const fine = window.matchMedia('(pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

    /** Attaches the listeners and the rAF loop. Returns its own teardown. */
    const start = () => {
      let targetX = window.innerWidth / 2;
      let targetY = window.innerHeight / 2;
      let x = targetX;
      let y = targetY;
      let scale = 1;
      let targetScale = 1;
      let started = false;
      let hovering = false;
      let frame = 0;

      const onMove = (e: PointerEvent) => {
        targetX = e.clientX;
        targetY = e.clientY;

        if (!started) {
          started = true;
          // Snap to the pointer on the first move, or the puck glides in from
          // the middle of the screen on page load.
          x = targetX;
          y = targetY;
          puck.style.opacity = '1';
        }

        const over = !!(e.target as Element | null)?.closest?.(TARGETS);
        targetScale = over ? 1.9 : 1;

        // Only touch the paint properties when the state actually flips.
        if (over !== hovering) {
          hovering = over;
          if (!src) puck.style.background = over ? 'transparent' : FILL;
          puck.style.boxShadow = over ? 'none' : SHADOW;
          puck.style.borderColor = over ? 'rgba(142,49,181,.6)' : 'rgba(142,49,181,.32)';
          puck.style.backdropFilter = over ? 'none' : 'blur(2px) saturate(1.5)';
        }
      };

      const hide = () => {
        started = false;
        puck.style.opacity = '0';
      };

      const tick = () => {
        // Exponential ease. 0.15 is slow enough to see the trail, fast enough
        // that it never feels like input lag.
        x += (targetX - x) * 0.15;
        y += (targetY - y) * 0.15;
        scale += (targetScale - scale) * 0.12;
        puck.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
        frame = requestAnimationFrame(tick);
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', hide);
      window.addEventListener('blur', hide);
      frame = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('pointerleave', hide);
        window.removeEventListener('blur', hide);
        puck.style.opacity = '0';
      };
    };

    let stop: (() => void) | null = null;

    const sync = () => {
      const wanted = fine.matches && !calm.matches;
      if (wanted && !stop) stop = start();
      else if (!wanted && stop) {
        stop();
        stop = null;
      }
    };

    sync();
    fine.addEventListener('change', sync);
    calm.addEventListener('change', sync);

    return () => {
      stop?.();
      fine.removeEventListener('change', sync);
      calm.removeEventListener('change', sync);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] hidden overflow-hidden md:block">
      <div
        ref={puckRef}
        className="absolute left-0 top-0 h-10 w-10 overflow-hidden rounded-full opacity-0 will-change-transform"
        style={{
          background: src ? undefined : FILL,
          border: '1.5px solid rgba(142,49,181,.32)',
          backdropFilter: 'blur(2px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(2px) saturate(1.5)',
          boxShadow: SHADOW,
          transition: 'opacity .5s ease, background .3s ease, box-shadow .3s ease, border-color .3s ease',
        }}
      >
        {src && <img src={src} alt="" className="h-full w-full object-cover" />}
      </div>
    </div>
  );
}

export default CursorFollower;
