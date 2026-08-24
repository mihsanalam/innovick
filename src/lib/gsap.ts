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

export { gsap, ScrollTrigger };
