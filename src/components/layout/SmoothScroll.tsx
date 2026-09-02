import { useEffect } from 'react';
import { initSmoothScroll } from '@/lib/scroll';

/**
 * Mounted once in the app shell. Owns the site-wide Lenis instance so every
 * page inherits the same eased scrolling without each section wiring its own.
 */
export function SmoothScroll() {
  useEffect(() => initSmoothScroll(), []);
  return null;
}

export default SmoothScroll;