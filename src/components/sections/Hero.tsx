import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/common/Button';
import { CampaignFlow, flowBadges, flowPanels, flowSweeps } from '@/components/visuals/CampaignFlow';
import { heroTicker } from '@/data/proof';
import { serifAccent } from '@/lib/theme';

/** Live Dhaka wall clock — small, but it makes the page feel staffed. */
function useDhakaClock() {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const paint = () =>
      setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    paint();
    const id = window.setInterval(paint, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const dhakaTime = useDhakaClock();

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      // Skip the loop entirely and just show the finished diagram.
      gsap.set(`${flowBadges}, ${flowPanels}`, { opacity: 1, y: 0 });
      gsap.set(flowSweeps, { scaleX: 1 });
      gsap.set('.flow-sweep-corner', { clipPath: 'inset(0 0% 0 0)' });
    } else {
      // Applied in a layout effect, so nothing flashes before the loop starts.
      gsap.set(`${flowBadges}, ${flowPanels}`, { opacity: 0, y: 12 });
      gsap.set(flowSweeps, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('.flow-sweep-corner', { clipPath: 'inset(0 100% 0 0)' });

      const enter = { duration: 0.4, opacity: 1, y: 0, ease: 'power2.out' };
      // Absolute positions so each stage lands exactly as the sweep passes it.
      // Labels are only ever tweened *to* visible, so cycle two onward leaves
      // them alone while the panels below them clear and come back.
      gsap.timeline({ repeat: -1, repeatDelay: 0.5, delay: 0.3 })
        .set(flowSweeps, { scaleX: 0, transformOrigin: 'left center' }, 0)
        .set('.flow-sweep-corner', { clipPath: 'inset(0 100% 0 0)', opacity: 1 }, 0)
        .set(flowPanels, { opacity: 0, y: 12 }, 0)
        .to('.flow-sweep-a', { scaleX: 1, duration: 0.7, ease: 'none' }, 0)
        .to('.flow-n1', enter, 0.38)
        .to('.flow-c1', { ...enter, duration: 0.5 }, 0.5)
        .to('.flow-sweep-corner', { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'none' }, 0.7)
        .to('.flow-sweep-b', { scaleX: 1, duration: 1.2, ease: 'none' }, 1)
        .to('.flow-n2', enter, 1.05)
        .to('.flow-i2', { ...enter, stagger: 0.08 }, 1.18)
        .to('.flow-n3', enter, 1.35)
        .to('.flow-i3', { ...enter, stagger: 0.13 }, 1.5)
        .to('.flow-n4', enter, 1.68)
        .to('.flow-c4', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 1.85)
        // Hold, then clear only the panels — the line and its labels stay on screen.
        .to(flowPanels, { opacity: 0, y: -10, duration: 0.45, stagger: 0.03, ease: 'power2.in' }, 5.2)
        .to(flowSweeps, { scaleX: 0, transformOrigin: 'right center', duration: 0.6, ease: 'power2.inOut' }, 5.8)
        .to('.flow-sweep-corner', { opacity: 0, duration: 0.4, ease: 'power2.in' }, 5.9);
    }

    // No ScrollTrigger — fires on mount, so the hero is never invisible.
    gsap.fromTo('.hero-orb', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out', clearProps: 'opacity,scale' });

    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .fromTo('.hero-rail', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.8, clearProps: 'all' })
      .fromTo('.hero-eyebrow-row', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, clearProps: 'all' }, '-=0.5')
      // Each headline line wipes up from behind its own edge — the reason the
      // lines sit in `overflow-hidden` wrappers.
      .fromTo('.hero-line', { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: 0.09, clearProps: 'all' }, '-=0.5')
      .fromTo('.hero-body-col', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, clearProps: 'all' }, '-=0.7')
      .fromTo('.hero-btns', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, clearProps: 'all' }, '-=0.6')
      .fromTo('.hero-ticker-band', { opacity: 0 }, { opacity: 1, duration: 0.9, clearProps: 'all' }, '-=0.4');
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      id="top"
      className="noise relative flex min-h-[92svh] flex-col overflow-hidden bg-[#0a0d1f] pt-[76px] text-white"
      style={{ backgroundImage: 'radial-gradient(120% 90% at 12% -10%, #17204a 0%, #0d1128 42%, #0a0d1f 100%)' }}
    >
      {/* One restrained brand glow. Purple is the accent here, not the theme. */}
      <div
        className="hero-orb pointer-events-none absolute"
        style={{
          left: '-16rem', top: '-14rem', width: '54rem', height: '54rem',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(181,101,214,0.30) 0%, rgba(142,49,181,0.14) 45%, transparent 72%)',
        }}
      />
      {/* Four-column hairline grid. Architectural, almost subliminal. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden justify-between lg:flex" style={{ paddingInline: 'max(20px, calc((100% - 1180px) / 2))' }}>
        {[0, 1, 2, 3, 4].map(n => <span key={n} className="w-px bg-white/[.045]" />)}
      </div>

      {/* Status rail — availability, place, and a clock that actually ticks. */}
      <div className="hero-rail relative border-b border-white/[.07]">
        <div className="container-wide flex h-11 items-center justify-between gap-4 font-mono-custom text-[10px] font-bold tracking-[.16em] text-white/40">
          <span className="flex items-center gap-2.5 whitespace-nowrap">
            <i className="pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80]" />
            <span className="text-white/65">ACCEPTING 2 NEW CLIENTS</span>
          </span>
          <span className="hidden md:block">DHAKA · SERVING 12+ COUNTRIES</span>
          <span className="whitespace-nowrap tabular-nums">
            <span className="hidden sm:inline">GMT+6 </span>{dhakaTime}
          </span>
        </div>
      </div>

      <CampaignFlow />

      <div className="container-wide relative flex flex-1 flex-col justify-center pb-10 pt-12 md:pt-14 lg:flex-none lg:pb-8 lg:pt-0">
        <div className="hero-eyebrow-row mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-[#c27cdf]" />
          <span className="font-mono-custom text-[10px] font-bold tracking-[.2em] text-[#c27cdf]">
            MARKETING · WEB DEVELOPMENT · AUTOMATION
          </span>
        </div>

        <h1 className="hero-title font-display max-w-[15ch] text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-[.94] tracking-[-.06em] text-white">
          <span className="block overflow-hidden pb-[.06em]"><span className="hero-line block">Dominate Your Market</span></span>
          <span className="block overflow-hidden pb-[.06em]">
            <span className="hero-line block">
              With{' '}
              <span className="gradient-text font-normal italic tracking-[-.015em]" style={{ fontFamily: serifAccent }}>Precision.</span>
            </span>
          </span>
        </h1>

        <div className="mt-9 grid max-w-5xl items-end gap-8 md:grid-cols-[1fr_auto] md:gap-14">
          <div className="hero-body-col">
            <p className="max-w-[540px] text-[17px] leading-8 text-white/55">
              We turn messy growth challenges into measurable wins through marketing, creative,
              development, and automation that moves at the speed of your ambition.
            </p>
            <p className="mt-5 flex items-center gap-2 font-mono-custom text-[11px] font-bold tracking-[.1em] text-[#c27cdf]">
              <ArrowRight size={14} /> WE PLAN IT, BUILD IT, AND SCALE IT.
            </p>
          </div>
          <div className="hero-btns">
            <div className="flex flex-wrap gap-3">
              <Button href="#contact" variant="white">Book a Strategy Call <ArrowRight size={15} /></Button>
              <Button href="#work" variant="ghost">View Our Work</Button>
            </div>
            <p className="mt-4 text-right text-[12px] text-white/35 max-md:text-left">
              45 minutes. A written plan you keep either way.
            </p>
          </div>
        </div>
      </div>

      {/* Outcomes ticker along the bottom edge — receipts, not adjectives. */}
      <div className="hero-ticker-band relative mt-auto overflow-hidden border-t border-white/[.07] py-3.5">
        <div className="marquee flex w-max items-center gap-9 whitespace-nowrap font-mono-custom text-[11px] tracking-[.08em] text-white/35">
          {[...heroTicker, ...heroTicker].map((item, i) => (
            <span key={i} className="flex items-center gap-9">
              {item}
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#c27cdf]/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
