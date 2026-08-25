import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { socialLinks } from '@/data/site';
import { serifAccent } from '@/lib/theme';

/**
 * Centred type on plain white. No background image, no entrance animation, no
 * ticker — the headline and the one purple button are the whole hero.
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
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[90svh] flex-col items-center justify-center bg-white px-5 pb-8 pt-[calc(92px+5.5rem)] text-center"
    >
      {/*
        A letterhead line, not a bar — no box, no border, no fill. Small mark,
        the name, then the discipline in mono caps. It sits close enough to the
        headline to read as its opening line.
      */}
      <p className="flex items-center gap-2.5 text-[#7a8199]">
        <img src="/logo.png" alt="" className="h-5 w-5 shrink-0 object-contain" style={{ aspectRatio: '1 / 1' }} />
        <span className="font-display text-[14px] font-extrabold tracking-[-.02em] text-[#151a35]">Innovick</span>
        <span aria-hidden="true" className="h-3 w-px bg-[#151a35]/20" />
        <span className="font-mono-custom text-[10px] font-bold uppercase tracking-[.22em]">Marketing Agency</span>
      </p>

      <h1 className="hero-title mt-7 max-w-[19ch] font-display text-[clamp(2.7rem,7vw,5.6rem)] font-extrabold leading-[.95] tracking-[-.06em] text-[#151a35]">
        Dominate Your Market With{' '}
        <span className="font-normal italic tracking-[-.015em] text-[#8e31b5]" style={{ fontFamily: serifAccent }}>
          Precision.
        </span>
      </h1>

      <p className="mt-7 max-w-[44rem] text-[17px] leading-8 text-[#5c6178] md:text-[19px] md:leading-9">
        We turn messy growth challenges into measurable wins through marketing, creative,
        development, and automation that moves at the speed of your ambition.
      </p>

      {/* Socials, then the two buttons. Kept small and unfilled so they read as
          a footnote to the CTA rather than a competing row of things to click. */}
      <div className="mt-9 flex items-center gap-2">
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

      <div className="mt-7 flex flex-col items-center gap-3.5 sm:flex-row">
        <Button href="#contact" variant="brand" className="px-7 py-4 text-[15px]">
          Book a Strategy Call <ArrowRight size={16} />
        </Button>
        <Button href="#work" variant="outline" className="px-7 py-4 text-[15px]">
          View Our Work
        </Button>
      </div>

      <p className="mt-6 text-[13px] text-[#7a8199]">
        45 minutes. A written plan you keep either way.
      </p>
    </section>
  );
}

export default Hero;
