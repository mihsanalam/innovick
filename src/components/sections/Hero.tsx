import { Fragment, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Button } from '@/components/common/Button';
import { socialLinks } from '@/data/site';
import { serifAccent } from '@/lib/theme';

/**
 * Centred type on plain white. No background image, no ticker — the headline and
 * the one purple button are the whole hero.
 *
 * That restraint is deliberate: the purple CTA is the only saturated thing above
 * the fold, which is what makes it read as the single next step. Anything else
 * competing up here costs it. The glass header sits over the white, so the nav
 * links stay ink-coloured.
 *
 * The content sits a little below centre. The group is `justify-center`, so
 * moving weight from `pb` to `pt` slides it down while the total height stays
 * the same — the section never grows past one screen. Want it lower still? Add
 * to the `pt` figure and take the same off `pb`. The 92px is the fixed header.
 */

/**
 * The headline, word by word, so each one can be animated on its own. The last
 * word is the serif accent and is rendered separately below — phrase the line so
 * the word you want emphasised comes last.
 */
const headlineWords = ['Dominate', 'Your', 'Market', 'With'];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    /*
      Plays once on load, not on scroll — the hero is already on screen.

      The headline arrives a word at a time, each one tilting up out of the page:
      `rotateX` off a `transformPerspective` is what separates this from a plain
      fade, and because the words are `inline-block` they wrap exactly like normal
      text, so nothing has to be measured or re-split when the line breaks
      differently at another width. The serif accent is simply the last word in the
      stagger, so it lands on its own beat without needing its own tween.

      Everything below the headline follows as one group, overlapping the tail of
      the word cascade rather than waiting for it — the whole entrance is ~1.6s.

      The word tween clears only `transform`/`opacity`, NOT `all`: "Precision."
      carries its serif font as an inline `style={{ fontFamily }}`, and
      `clearProps: 'all'` would strip that too, snapping the word to the sans
      display font the instant the tween landed. Clearing the transform still lifts
      it off its 3D compositing layer, so the text renders crisp.
    */
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo('.hero-eyebrow',
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, clearProps: 'all' })
      .fromTo('.hero-word',
        { y: 46, opacity: 0, rotateX: -38, transformPerspective: 620, transformOrigin: '50% 100%' },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.95, stagger: 0.075, clearProps: 'transform,transformOrigin,opacity' },
        0.1)
      .fromTo('.hero-rise',
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, clearProps: 'all' },
        0.55);
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative flex min-h-[90svh] flex-col items-center justify-center bg-white px-5 pb-8 pt-[calc(92px+5.5rem)] text-center"
    >
      {/*
        A letterhead line, not a bar — no box, no border, no fill. Small mark,
        the name, then the discipline in mono caps. It sits close enough to the
        headline to read as its opening line.
      */}
      <p className="hero-eyebrow flex items-center gap-2.5 text-[#7a8199]">
        <img src="/logo.png" alt="" className="h-5 w-5 shrink-0 object-contain" style={{ aspectRatio: '1 / 1' }} />
        <span className="font-display text-[14px] font-extrabold tracking-[-.02em] text-[#151a35]">Innovick</span>
        <span aria-hidden="true" className="h-3 w-px bg-[#151a35]/20" />
        <span className="font-mono-custom text-[10px] font-bold uppercase tracking-[.22em]">Marketing Agency</span>
      </p>

      {/* Each word is its own `inline-block` so it can be transformed — transforms
          have no effect on a plain inline span. The spaces are left as real text
          nodes *between* the spans, so the line still wraps naturally. */}
      <h1 className="hero-title mt-7 max-w-[19ch] font-display text-[clamp(2.7rem,7vw,5.6rem)] font-extrabold leading-[.95] tracking-[-.06em] text-[#151a35]">
        {headlineWords.map(word => (
          <Fragment key={word}>
            <span className="hero-word inline-block">{word}</span>{' '}
          </Fragment>
        ))}
        <span
          className="hero-word inline-block font-normal italic tracking-[-.015em] text-[#8e31b5]"
          style={{ fontFamily: serifAccent }}
        >
          Precision.
        </span>
      </h1>

      <p className="hero-rise mt-7 max-w-[44rem] text-[17px] leading-8 text-[#5c6178] md:text-[19px] md:leading-9">
        We turn messy growth challenges into measurable wins through marketing, creative,
        development, and automation that moves at the speed of your ambition.
      </p>

      {/* Socials, then the two buttons. Kept small and unfilled so they read as
          a footnote to the CTA rather than a competing row of things to click. */}
      <div className="hero-rise mt-9 flex items-center gap-2">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#151a35]/12 text-[#5c6178] transition-colors duration-300 hover:border-[#8e31b5]/50 hover:bg-[#8e31b5]/[.06] hover:text-[#8e31b5]"
            data-testid={`link-hero-${label.toLowerCase()}`}
          >
            <Icon size={16} strokeWidth={1.9} />
          </a>
        ))}
      </div>

      <div className="hero-rise mt-7 flex flex-col items-center gap-3.5 sm:flex-row">
        <Button href="#contact" variant="brand" className="px-7 py-4 text-[15px]">
          Book a Strategy Call <ArrowRight size={16} />
        </Button>
        <Button href="#work" variant="outline" className="px-7 py-4 text-[15px]">
          View Our Work
        </Button>
      </div>

      <p className="hero-rise mt-6 text-[13px] text-[#7a8199]">
        45 minutes. A written plan you keep either way.
      </p>
    </section>
  );
}

export default Hero;
