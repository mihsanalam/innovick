/**
 * One place where the ScrollTrigger plugin is registered.
 *
 * Every component imports gsap *from here* rather than from the package, so the
 * plugin is guaranteed to be registered before any component tries to use it —
 * no matter which section happens to mount first.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * True when the visitor has asked their OS for reduced motion.
 *
 * The `@media (prefers-reduced-motion)` block in `index.css` only neutralises CSS
 * transitions and keyframes — it has no effect on GSAP, which drives elements from
 * JavaScript. So every scroll animation in `components/sections/` starts with
 * `if (prefersReducedMotion()) return;`.
 *
 * That early return is only safe because the animations are written as `fromTo`
 * tweens: skipping one leaves the element exactly as the JSX rendered it. Never
 * use a bare `from()` — if the tween is skipped the element stays invisible.
 */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };
