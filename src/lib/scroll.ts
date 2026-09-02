import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * One site-wide Lenis instance, shared by every page.
 *
 * Lenis reassigns wheel/trackpad/touch input to an eased, interpolated scroll
 * — the "smooth scroll everywhere" feel that CSS `scroll-behavior` can't give
 * (that only smooths anchor jumps, never the mouse wheel). It plays nicely
 * with GSAP ScrollTrigger because it fires scroll events and we forward them:
 * `lenis.on('scroll', ScrollTrigger.update)`, then drive Lenis's own rAF from
 * the GSAP ticker so the whole page shares a single animation clock.
 *
 * Anchor links (`a[href^="#"]` like the navbar's #contact) are intercepted so
 * they glide with a fixed-header offset instead of jumping. Reduced-motion
 * visitors get the plain browser jump — instant, no animation.
 */
let lenis: Lenis | null = null;
let cleanup: (() => void) | null = null;

/** Clear the fixed navbar (92px) plus a little air so a scrolled-to anchor isn't hidden under it. */
const NAV_OFFSET = -100;

/** Start site-wide smooth scrolling. Call once from the app shell; returns a cleanup function. */
export function initSmoothScroll(): () => void {
  if (cleanup) return cleanup;
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  lenis = new Lenis({
    autoRaf: false, // we drive rAF from the GSAP ticker below
    lerp: 0.09,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const raf = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Re-measure ScrollTrigger start/end points now that Lenis owns scrolling.
  const settle = requestAnimationFrame(() => ScrollTrigger.refresh());

  // Smooth in-page anchor scrolling — only when the target actually exists on
  // this page; otherwise fall back to the browser default (a no-op / jump).
  const onAnchorClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
    const hash = anchor?.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target || !lenis) return;
    event.preventDefault();
    lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET, duration: 1.1 });
    history.pushState(null, '', hash);
  };
  document.addEventListener('click', onAnchorClick);

  cleanup = () => {
    cancelAnimationFrame(settle);
    document.removeEventListener('click', onAnchorClick);
    gsap.ticker.remove(raf);
    lenis?.destroy();
    lenis = null;
    cleanup = null;
  };
  return cleanup;
}

/** Reset to the top on route change — instantly, so navigation never "sweeps" past sections. */
export function scrollToTopY(immediate = true): void {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
}