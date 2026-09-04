import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Button } from '@/components/common/Button';
import { contact, socialLinks } from '@/data/site';
import { serifAccent } from '@/lib/theme';

/**
 * Split hero — marketing message left, team photograph right.
 *
 * The headline is written as two explicit block lines ("Dominate Your" /
 * "Market With Precision.") so it always reads in exactly two lines instead
 * of re-wrapping unpredictably between breakpoints.
 *
 * The left column is deliberately compact: eyebrow, headline, one paragraph,
 * then a single CTA row with the socials and the footnote merged into one
 * quiet line underneath — nothing stacked that doesn't earn its height.
 *
 * Entrance animation plays once on mount (the hero is above the fold), scoped
 * to the `hero-` classes. Reduced-motion visitors get the static layout.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

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
        0.55)
      .fromTo('.hero-photo',
        { y: 34, opacity: 0, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, duration: 1, clearProps: 'all' },
        0.35);
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative isolate flex min-h-[88svh] items-center bg-white px-5 pb-16 pt-35 md:pb-20 lg:min-h-[92svh]"
    >
      <div className="container-wide grid w-full items-center gap-12 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:gap-16 xl:gap-20">

        {/* ---------------------------------------------------------------
            Left column — the message. Compact by design: every margin below
            is one step tighter than the old stacked heroes.
        ---------------------------------------------------------------- */}
        <div className="text-left">
          {/* Letterhead line — small mark, name, discipline in mono caps. */}
          <p className="hero-eyebrow flex items-center gap-2.5 text-[#7a8199]">
            <img src="/logo.png" alt="" className="h-5 w-5 shrink-0 object-contain" style={{ aspectRatio: '1 / 1' }} />
            <span className="font-display text-[14px] font-semibold tracking-[-.02em] text-[#151a35]">Innovick</span>
            <span aria-hidden="true" className="h-3 w-px bg-[#151a35]/20" />
            <span className="font-mono-custom text-[10px] font-bold uppercase tracking-[.22em]">Marketing Agency</span>
          </p>

          {/* Two fixed lines — no unpredictable re-wrapping. Each word keeps its
              own span so the entrance can still stagger them. */}
          <h1 className="hero-title mt-6 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-tighter text-[#151a35]">
            <span className="block">
              <span className="hero-word inline-block">Dominate</span>{' '}
              <span className="hero-word inline-block">Your</span>
            </span>
            <span className="block">
              <span className="hero-word inline-block">Market</span>{' '}
              <span className="hero-word inline-block">With</span>{' '}
              <span
                className="hero-word inline-block font-normal italic tracking-[-.015em] text-[#8e31b5]"
                style={{ fontFamily: serifAccent }}
              >
                Precision.
              </span>
            </span>
          </h1>

          <p className="hero-rise mt-5 max-w-136 text-[17px] leading-8 text-[#5c6178]">
            We turn messy growth challenges into measurable wins through marketing, creative,
            development, and automation that moves at the speed of your ambition.
          </p>

          <div className="hero-rise mt-7 flex flex-col gap-3.5 sm:flex-row">
            <Button href="/contact" variant="brand" className="px-7 py-4 text-[15px]">
              Book a Strategy Call <ArrowRight size={16} />
            </Button>
            <Button href={contact.whatsapp} variant="outline" newTab className="px-7 py-4 text-[15px]">
              <MessageCircle size={16} /> WhatsApp Us
            </Button>
          </div>

          {/* Socials + footnote share one line — a footnote to the CTA rather
              than two more stacked rows eating vertical space. */}
          <div className="hero-rise mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#151a35]/12 text-[#5c6178] transition-colors duration-300 hover:border-[#8e31b5]/50 hover:bg-[#8e31b5]/6 hover:text-[#8e31b5]"
                  data-testid={`link-hero-${label.toLowerCase()}`}
                >
                  <Icon size={16} strokeWidth={1.9} />
                </a>
              ))}
            </div>
            <p className="text-[13px] text-[#7a8199]">
              45 minutes. A written plan you keep either way.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------------
            Right column — the team photograph, in the same frame language as
            the Founder portrait (large radius, hairline border, deep navy
            shadow). Hover lift only on genuine fine-pointer devices.
        ---------------------------------------------------------------- */}
        <div className="hero-photo group relative">
          <div className="overflow-hidden rounded-4xl border border-[#e6e8f0] bg-[#eef0f6] shadow-[0_30px_80px_-30px_rgba(21,26,53,.32)] transition-shadow duration-500 [@media(hover:hover)_and_(pointer:fine)]:group-hover:shadow-[0_42px_90px_-32px_rgba(21,26,53,.40)]">
            <img
              src="/team-hero.jpg"
              alt="The Innovick marketing team collaborating around a table in a bright studio"
              width="1600" height="1200"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="aspect-4/3 w-full object-cover transition-[filter,transform] duration-400 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.025] [@media(hover:hover)_and_(pointer:fine)]:group-hover:brightness-[1.04]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
