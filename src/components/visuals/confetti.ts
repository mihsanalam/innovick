import { gsap, prefersReducedMotion } from '@/lib/gsap';

/**
 * A tiny hand-rolled confetti pop — no library, ~1.5KB of GSAP.
 *
 * Spawns `count` purple/white particles at the centre of `source` (a DOM
 * element), flings them outward on a single shared timeline, then removes the
 * whole layer from the DOM. The layer is `position: fixed`, so it never affects
 * layout and always reads above the page (`z-80`, under the cursor puck at 60? —
 * actually below nothing interactive; it's `pointer-events-none`).
 *
 * Reduced motion: silently does nothing — callers don't need to guard.
 *
 * Used by H5 (stat count-up pops, `sections/Stats`) and P1 (result-card bursts
 * on `/success`).
 */
const COLORS = ['#8e31b5', '#b565d6', '#c27cdf', '#ffffff', '#e9d5ff'];

export function fireConfetti(source: HTMLElement, count = 16): void {
  if (prefersReducedMotion() || typeof document === 'undefined') return;

  const rect = source.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  Object.assign(layer.style, {
    position: 'fixed',
    inset: '0',
    pointerEvents: 'none',
    zIndex: '70',
  } satisfies Partial<CSSStyleDeclaration>);

  const parts: HTMLElement[] = [];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('i');
    const size = 4 + Math.random() * 5;
    const round = Math.random() > 0.5;
    Object.assign(p.style, {
      position: 'absolute',
      left: `${cx}px`,
      top: `${cy}px`,
      width: `${size}px`,
      height: `${round ? size : size * 2.2}px`,
      borderRadius: round ? '50%' : '1.5px',
      background: COLORS[i % COLORS.length] ?? COLORS[0]!,
      opacity: '0',
    } satisfies Partial<CSSStyleDeclaration>);
    layer.appendChild(p);
    parts.push(p);
  }
  document.body.appendChild(layer);

  // One timeline owns every particle, so the layer is removed exactly once,
  // when the last particle dies — not mid-flight when an earlier one finishes.
  const tl = gsap.timeline({ onComplete: () => layer.remove() });
  parts.forEach(p => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 34 + Math.random() * 66;
    tl.fromTo(
      p,
      { x: 0, y: 0, opacity: 1, rotation: Math.random() * 180 },
      {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist + 26, // slight gravity bias
        opacity: 0,
        rotation: `+=${90 + Math.random() * 180}`,
        duration: 0.9 + Math.random() * 0.5,
        ease: 'power2.out',
      },
      0,
    );
  });
}

export default fireConfetti;
