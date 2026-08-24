import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight, BadgeCheck, Check, CirclePlay, Code2,
  Globe2, Instagram, Layers3, Linkedin, Mail, Menu, MessageCircle, Minus,
  Palette, Phone, Play, Plus, Quote, Search, Settings2, Sparkles, Star, Target, TrendingUp, User, Users, X, Zap,
} from 'lucide-react';

const queryClient = new QueryClient();
const purpleGradient = 'linear-gradient(115deg, #8E31B5 0%, #B565D6 100%)';
// Serif italic accent used in the stacked project cards — system stack, nothing to load.
const serifAccent = "Georgia, 'Times New Roman', serif";
gsap.registerPlugin(ScrollTrigger);

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 0.8, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2 pl-1" data-testid="link-logo">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f2edf5]">
        <img src="/logo.png" alt="Innovick mark" className="h-full w-full object-contain" style={{ aspectRatio: '1 / 1' }} />
      </span>
      <span className={`font-display text-[16px] font-extrabold tracking-[-.04em] leading-none ${dark ? 'text-white' : 'text-[#0a0a0c]'}`}>
        Innovick
      </span>
    </a>
  );
}

// `brand` = the purple gradient (used sparingly now), `ink` = near-black, `white` = for dark sections.
type ButtonVariant = 'brand' | 'outline' | 'ink' | 'white';

const buttonStyles: Record<ButtonVariant, string> = {
  brand: 'text-white shadow-[0_12px_28px_rgba(142,49,181,.22)]',
  outline: 'border border-[#d9d9e2] bg-white/70 text-[#0a0a0c] hover:bg-white',
  ink: 'bg-[#0a0a0c] text-white shadow-[0_12px_28px_rgba(10,10,12,.22)]',
  white: 'bg-white text-[#0a0a0c] shadow-[0_14px_34px_rgba(0,0,0,.32)]',
};

function Button({ children, href = '#contact', outline = false, variant, className = '' }: { children: ReactNode; href?: string; outline?: boolean; variant?: ButtonVariant; className?: string }) {
  const kind: ButtonVariant = variant ?? (outline ? 'outline' : 'brand');
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-transform duration-300 hover:scale-[1.03] ${buttonStyles[kind]} ${className}`}
      style={kind === 'brand' ? { background: purpleGradient } : undefined}
      data-testid={`link-cta-${href.replace('#', '')}`}
    >
      {children}
    </a>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    ['Services', '#services'],
    ['Founder', '#founder'],
    ['Work', '#work'],
    ['Growth Room', '#growth-room'],
    ['Reviews', '#reviews'],
    ['FAQs', '#faqs'],
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-[0_8px_30px_rgba(67,31,86,.08)] backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="container-wide flex h-[76px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-[13px] font-semibold text-[#5d5d69] transition-colors hover:text-[#8e31b5]" data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="#contact" variant="ink">
            Book a Strategy Call <ArrowRight size={15} />
          </Button>
        </div>
        <button className="rounded-full p-2 text-[#0a0a0c] md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation" data-testid="button-mobile-menu">
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-[#eadcf0] bg-white px-5 py-4 md:hidden">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-[#f0e6f3] py-3 text-sm font-semibold text-[#5d4b6c]" data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}>
                {label}
              </a>
            ))}
            <Button href="#contact" variant="ink" className="mt-4 w-full">
              Book a Strategy Call
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

const flowSteps = [
  'AUDIT THE AD ACCOUNT',
  'MAP THE BUYER JOURNEY',
  'SHARPEN THE OFFER',
  'SPLIT BUDGET BY CHANNEL',
  'BRIEF THE CREATIVE TEAM',
  'LAUNCH ON META + GOOGLE',
];

const flowSegments = [
  { name: 'FIRST-TIME VISITOR', meta: 'Browsed 3+ products, no order yet', active: false },
  { name: 'LOYAL REPEAT BUYER', meta: '4 orders in 90 days, high basket', active: true },
  { name: 'LAPSED CUSTOMER', meta: 'Last order 6 months ago, price led', active: false },
];

function FlowNode({ label, className }: { label: string; className: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-[#e6d8ec] bg-white px-3 py-[6px] font-mono-custom text-[10px] font-bold tracking-[.12em] text-[#6d328b] shadow-[0_6px_16px_rgba(90,49,121,.09)] ${className}`}>
      <Zap size={11} className="text-[#8e31b5]" fill="currentColor" strokeWidth={0} />
      {label}
    </span>
  );
}

/**
 * The pipeline diagram above the headline. The connector and its four stage
 * labels are drawn once and then stay on screen; a brighter segment sweeps along
 * the line each cycle and the panel under each label reveals, holds, clears, and
 * comes back. Desktop only — below `lg` the four columns have nowhere to go, so
 * the hero falls back to the headline alone.
 */
const flowCorner = 'M0 1 H8 Q17 1 17 10 V42 Q17 51 26 51 H28';

function CampaignFlow() {
  return (
    <div className="hero-flow pointer-events-none relative hidden h-[350px] w-full select-none lg:block" aria-hidden="true">
      {/* Connector: viewport edge → stage 1, a rounded step down, then on to the right edge.
          Each run is a muted base track with a brighter sweep layered on top of it. */}
      <span className="absolute left-0 top-[28px] h-px w-[32%] bg-gradient-to-r from-[#8e31b5]/0 via-[#8e31b5]/20 to-[#8e31b5]/30" />
      <span className="flow-sweep-a absolute left-0 top-[28px] h-px w-[32%] bg-gradient-to-r from-[#8e31b5]/0 via-[#8e31b5]/55 to-[#8e31b5]/85" />
      <svg className="absolute left-[32%] top-[27px]" width="28" height="52" viewBox="0 0 28 52" fill="none">
        <path d={flowCorner} stroke="#8e31b5" strokeOpacity=".3" strokeWidth="1" />
      </svg>
      <svg className="flow-sweep-corner absolute left-[32%] top-[27px]" width="28" height="52" viewBox="0 0 28 52" fill="none">
        <path d={flowCorner} stroke="#8e31b5" strokeOpacity=".85" strokeWidth="1" />
      </svg>
      <span className="absolute top-[78px] h-px bg-[#8e31b5]/30" style={{ left: 'calc(32% + 27px)', right: 0 }} />
      <span className="flow-sweep-b absolute top-[78px] h-px bg-[#8e31b5]/85" style={{ left: 'calc(32% + 27px)', right: 0 }} />

      {/* 01 — the brief that starts everything */}
      <div className="absolute left-[17.5%] top-[14px]">
        <FlowNode label="CLIENT BRIEF" className="flow-n1" />
        <div className="flow-c1 mt-[16px] w-[252px] rounded-2xl border border-[#ece0f1] bg-white p-4 shadow-[0_18px_38px_rgba(90,49,121,.13)]">
          <p className="text-[13px] leading-[1.45] text-[#3f2d4e]">
            Our Meta ads are burning budget and repeat orders have stalled. Find the leaks and fix them.
          </p>
          <span className="mt-3 ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-white" style={{ background: purpleGradient }}>
            <ArrowUp size={14} strokeWidth={2.5} />
          </span>
        </div>
      </div>

      {/* 02 — how we work the brief */}
      <div className="absolute left-[34.5%] top-[64px]">
        <FlowNode label="STRATEGY SPRINT" className="flow-n2" />
        <div className="mt-[20px] space-y-[6px]">
          {flowSteps.map(step => (
            <span key={step} className="flow-i2 flex w-fit items-center gap-2 rounded-md border border-[#e8dced] bg-white/70 px-2.5 py-[5px] font-mono-custom text-[10px] font-bold tracking-[.05em] text-[#5c4a68]">
              <Check size={11} className="shrink-0 text-[#8e31b5]" strokeWidth={3} />
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* 03 — who each message is actually for */}
      <div className="absolute left-[51%] top-[64px]">
        <FlowNode label="AUDIENCE SPLIT" className="flow-n3" />
        <div className="mt-[20px] w-[215px] space-y-[14px]">
          {flowSegments.map(segment => (
            <div key={segment.name} className="flow-i3">
              <div className={`flex gap-2 ${segment.active ? '' : 'opacity-40'}`}>
                <User size={12} className={`mt-[3px] shrink-0 ${segment.active ? 'text-[#8e31b5]' : 'text-[#b3a3bc]'}`} />
                <p className="font-mono-custom text-[10px] font-bold leading-[1.5] tracking-[.05em] text-[#5c4a68]">
                  {segment.name}
                  <span className="block font-normal normal-case tracking-normal text-[#8d7b97]">{segment.meta}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 04 — the creative that ships */}
      <div className="absolute left-[67.5%] top-[64px]">
        <FlowNode label="CAMPAIGN LIVE" className="flow-n4" />
        <div
          className="flow-c4 relative mt-[20px] h-[220px] w-[244px] overflow-hidden rounded-2xl p-5 shadow-[0_26px_50px_rgba(58,25,73,.28)]"
          style={{ background: 'linear-gradient(160deg,#0a0a0c 0%,#5b1f7d 46%,#8e31b5 100%)' }}
        >
          <span className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[#d79dea]/25 blur-2xl" />
          <span className="absolute -left-10 bottom-14 h-32 w-32 rounded-full bg-[#f6c871]/15 blur-2xl" />
          <span className="relative font-mono-custom text-[9px] font-bold tracking-[.16em] text-white/60">AD · META FEED</span>
          <div className="absolute inset-x-5 bottom-5">
            <p className="font-display text-[21px] font-extrabold leading-[1.08] tracking-[-.04em] text-white">
              Winter Drop,<br />40% Off
            </p>
            <p className="mt-2 text-[11px] leading-[1.4] text-white/70">Free delivery across Dhaka. Offer ends Sunday night.</p>
            <span className="mt-3 inline-flex rounded-lg bg-white/15 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">Shop now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// The connector and the stage labels persist once drawn; only the panels cycle.
const flowBadges = '.flow-n1, .flow-n2, .flow-n3, .flow-n4';
const flowPanels = '.flow-c1, .flow-i2, .flow-i3, .flow-c4';
const flowSweeps = '.flow-sweep-a, .flow-sweep-b';

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

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

    // No ScrollTrigger — fires immediately on mount so hero is never invisible
    gsap.fromTo('.hero-orb',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out', clearProps: 'opacity,scale' }
    );
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.fromTo('.hero-eyebrow-row', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1, clearProps: 'all' })
      .fromTo('.hero-title', { opacity: 0, y: 60, skewY: 1.5 }, { opacity: 1, y: 0, skewY: 0, duration: 1.1, clearProps: 'all' }, '-=0.65')
      .fromTo('.hero-body-col', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, clearProps: 'all' }, '-=0.65')
      .fromTo('.hero-btns', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8, clearProps: 'all' }, '-=0.55');
  }, { scope: heroRef });

  return (
    <section ref={heroRef} id="top" className="noise relative overflow-hidden bg-[#f7f6f9] pt-20 md:pt-28 lg:pt-24">
      <div
        className="hero-orb pointer-events-none absolute"
        style={{
          position: 'absolute',
          left: '-14rem', top: '-10rem', width: '52rem', height: '52rem',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(181,101,214,0.38) 0%, rgba(142,49,181,0.18) 45%, transparent 72%)',
          maskImage: 'radial-gradient(circle at 30% 30%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 30% 30%, black 30%, transparent 70%)',
        }}
      />
      <CampaignFlow />
      <div className="container-wide relative pb-20 md:pb-28 lg:pb-12 pt-8 md:pt-12 lg:pt-0">
        <div className="hero-eyebrow-row mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-[#8e31b5]" />
          <span className="eyebrow">MARKETING · WEB DEVELOPMENT · AUTOMATION</span>
        </div>
        <h1 className="hero-title font-display max-w-[900px] text-[clamp(2.5rem,5.4vw,4.5rem)] font-extrabold leading-[.98] tracking-[-.065em] text-[#0a0a0c]">
          Dominate Your<br />
          <span className="gradient-text">Market With Precision.</span>
        </h1>
        <div className="mt-7 grid max-w-4xl items-end gap-7 md:grid-cols-[1fr_auto]">
          <div className="hero-body-col">
            <p className="max-w-[540px] text-base leading-7 text-[#5d5d69]">We turn messy growth challenges into measurable wins through marketing, creative, development, and automation that moves at the speed of your ambition.</p>
            <p className="mt-4 flex items-center gap-2 font-mono-custom text-xs font-bold text-[#8e31b5]">
              <ArrowRight size={15} /> We plan it, build it, and scale it.
            </p>
          </div>
          <div className="hero-btns flex flex-wrap gap-3">
            <Button href="#contact">Book a Strategy Call <ArrowRight size={15} /></Button>
            <Button href="#work" outline>View Our Work</Button>
          </div>
        </div>
      </div>
      <div className="border-y border-[#ecdef1] bg-[#f8f1fb] py-5">
        <div className="container-wide overflow-hidden">
          <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[.2em] text-[#9b88a7]">Trusted by growing brands across Bangladesh.</p>
          <div className="marquee flex w-max items-center gap-10 opacity-55 md:w-full md:justify-between md:gap-4">
            {['Loom & Thread', 'GreenLeaf Organics', 'UrbanNest Furniture', 'Pinnacle Skincare', 'Chowdhury Electronics', 'Zenith Wellness', 'CraftBox Bangladesh', 'Nexora Tech', 'Loom & Thread', 'GreenLeaf Organics'].map((name, i) => (
              <span key={`${name}-${i}`} className="whitespace-nowrap font-display text-xs font-bold tracking-[-.03em] text-[#5d5d69]">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, prefix = '', suffix = '' }: { value: number; label: string; prefix?: string; suffix?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !numberRef.current) return;
    const targetEl = numberRef.current;
    const counter = { val: 0 };

    gsap.to(counter, {
      val: value,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        if (targetEl) {
          targetEl.textContent = `${prefix}${Math.round(counter.val)}${suffix}`;
        }
      },
      onComplete: () => {
        if (targetEl) {
          targetEl.textContent = `${prefix}${value}${suffix}`;
        }
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="stat-item border-l border-[#e2d3e9] px-5 first:border-l-0 first:pl-0 md:px-7" data-testid={`stat-${label.toLowerCase().replaceAll(' ', '-')}`}>
      <p ref={numberRef} className="stat-number font-display text-3xl font-extrabold tracking-[-.06em] text-[#0a0a0c]">
        {prefix}{value}{suffix}
      </p>
      <p className="mt-1 text-xs font-medium text-[#867692]">{label}</p>
    </div>
  );
}

function Stats() {
  return (
    <section className="gsap-stats bg-white py-16 md:py-20">
      <div className="container-wide grid grid-cols-2 gap-y-7 md:grid-cols-5">
        <Stat value={6} suffix="+" label="Years" />
        <Stat value={520} suffix="+" label="Brands Served" />
        <Stat value={65} prefix="৳" suffix="+ Cr" label="Ad Spend Managed" />
        <Stat value={12} suffix="+" label="Countries Served" />
        <Stat value={40} suffix="+" label="Team Specialists" />
      </div>
    </section>
  );
}

const services = [
  { icon: Target, title: 'Strategic Marketing', desc: 'Data-led campaign strategy across Meta and Google Ads that turns spend into predictable profit.', tags: ['Facebook Ads', 'Google Ads'] },
  { icon: Palette, title: 'Creative Design', desc: 'Scroll-stopping visuals and video ad creatives built to convert, not just look good.', tags: ['Ad Creatives', 'Branding'] },
  { icon: Users, title: 'Social Media Management', desc: 'Full-service content, community, and posting management so your brand stays consistently present.', tags: ['Content', 'Community'] },
  { icon: Code2, title: 'Web Development', desc: 'Fast, conversion-focused websites and landing pages built in React and Next.js.', tags: ['Next.js', 'Landing Pages'] },
  { icon: Search, title: 'SEO', desc: 'Technical and content SEO that compounds your organic traffic month over month.', tags: ['Technical SEO', 'Content SEO'] },
  { icon: Settings2, title: 'Automation Services', desc: 'CRM, lead capture, and follow-up automation that runs while you sleep.', tags: ['CRM', 'Automation'] },
];

function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const grid = sectionRef.current?.querySelector('.services-grid') as HTMLElement | null;
    if (grid) gsap.set(grid, { perspective: 900 });

    gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, i) => {
      const isLeft = i % 2 === 0;
      gsap.fromTo(card,
        { x: isLeft ? -120 : 120, rotationY: isLeft ? -14 : 14, opacity: 0, transformOrigin: 'center center' },
        {
          x: 0, rotationY: 0, opacity: 1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 42%', scrub: 1.2 }
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="services" className="bg-[#f7f6f9] py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="inline-flex -rotate-2 rounded-md border border-dashed border-[#a85bc5] px-3 py-1 font-mono-custom text-[10px] font-bold text-[#8e31b5]">
            NEW / LET'S GROW
          </span>
          <h2 className="mt-5 font-display text-5xl font-extrabold tracking-[-.06em] text-[#0a0a0c] md:text-7xl">
            Our <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>Services.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#5d5d69]">The right blend of strategy, craft, and technical muscle to take your brand from “we should” to “we did.”</p>
        </Reveal>
        <div className="services-grid mt-14 grid gap-4 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="service-card group rounded-3xl border border-[#e8ddef] bg-white p-7 soft-shadow" data-testid={`card-service-${i}`}>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0dff6] text-[#8e31b5] transition-colors group-hover:bg-[#8e31b5] group-hover:text-white">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <span className="font-mono-custom text-xs text-[#ad9ab7]">0{i + 1}</span>
                </div>
                <h3 className="mt-7 font-display text-2xl font-extrabold tracking-[-.04em] text-[#0a0a0c]">{service.title}</h3>
                <p className="mt-3 max-w-md leading-7 text-[#5d5d69]">{service.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-[#f9f3fb] px-3 py-1 text-xs font-semibold text-[#8e31b5]">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        <Reveal>
          <a href="#contact" className="mx-auto mt-12 flex w-fit items-center gap-2 rounded-full border border-[#cfabdb] bg-white px-5 py-3 text-sm font-bold text-[#8e31b5] transition hover:border-[#8e31b5] hover:bg-[#f9f0fc]" data-testid="link-schedule-call">
            Want to discuss? Let's Schedule a Call <ArrowRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// TODO: swap the name, photo, and numbers below for the real founder before launch.
const founder = {
  name: 'Nazmul Ahmed',
  role: 'FOUNDER & LEAD STRATEGIST',
  photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85',
};

const founderProof = [
  { value: '520+', label: 'Brands advised' },
  { value: '৳65Cr+', label: 'Ad spend managed' },
  { value: '16+', label: 'Years in marketing' },
  { value: '40+', label: 'Specialists hired' },
  { value: '12+', label: 'Countries served' },
  { value: '2', label: 'Businesses founded' },
];

function Founder() {
  const founderRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.founder-portrait',
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: founderRef.current, start: 'top 76%', toggleActions: 'play none none none' } }
    );
    gsap.fromTo('.founder-proof',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: '.founder-proof-grid', start: 'top 90%', toggleActions: 'play none none none' } }
    );
  }, { scope: founderRef });

  return (
    <section ref={founderRef} id="founder" className="relative overflow-hidden bg-[#08080a] py-24 text-white md:py-32">
      {/* Near-black surface with one restrained brand glow — the accent, not the theme. */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[#8e31b5]/14 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.045] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:46px_46px]" />

      <div className="container-wide relative grid items-center gap-14 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:gap-20">
        {/* Portrait with the floating credential plate */}
        <div className="founder-portrait relative mx-auto w-full max-w-[400px]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111116] shadow-[0_40px_90px_-20px_rgba(0,0,0,.9)]">
            <img
              src={founder.photo}
              alt={`${founder.name}, ${founder.role.toLowerCase()} at Innovick`}
              width="900" height="1120" loading="lazy" decoding="async"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-5 right-8 rounded-2xl border border-white/10 bg-[#14141a]/95 px-5 py-4 backdrop-blur-md">
            <p className="font-mono-custom text-[10px] font-bold tracking-[.16em] text-white/45">{founder.role}</p>
            <p className="mt-1.5 font-display text-xl font-extrabold tracking-[-.04em] text-white">{founder.name}</p>
          </div>
        </div>

        {/* Story column */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 font-mono-custom text-[10px] font-bold tracking-[.16em] text-white/60">
              <BadgeCheck size={12} className="text-[#c27cdf]" /> MEET THE FOUNDER
            </span>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-.055em] text-white">
              I don’t sell theory. I’ve built the marketing department I’m asking you to trust.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/55">
              Sixteen years, one agency built from a single laptop to a forty-person team, and a very
              long list of ad accounts I have personally pulled out of the fire. Innovick runs on
              systems I had to invent because nobody handed them to me.
            </p>
          </Reveal>

          <div className="founder-proof-grid mt-10 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
            {founderProof.map(item => (
              <div key={item.label} className="founder-proof border-t border-white/10 pt-4">
                <p className="font-display text-2xl font-extrabold tracking-[-.05em] text-white">{item.value}</p>
                <p className="mt-1 text-[13px] text-white/45">{item.label}</p>
              </div>
            ))}
          </div>

          <Reveal delay={0.1}>
            <figure className="mt-10 max-w-xl rounded-2xl border border-white/10 bg-white/[.035] p-6">
              <Quote size={18} className="text-[#c27cdf]" />
              <blockquote className="mt-3 text-[15px] italic leading-8 text-white/70">
                “I have been the founder staring at a dashboard at 2am wondering where the money went.
                That is exactly why we build the reporting first and the campaign second.”
              </blockquote>
            </figure>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="#contact" variant="white">
                Book a Meeting <ArrowRight size={15} />
              </Button>
              <a href="#work" className="text-sm font-bold text-white/55 underline decoration-white/20 underline-offset-4 transition hover:text-white" data-testid="link-founder-work">
                Or see the receipts first
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MiniChart() {
  return (
    <div className="relative h-[340px] overflow-hidden rounded-[2rem] bg-[#352044] p-5 text-white shadow-[0_25px_55px_rgba(58,25,73,.2)]">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#b565d6]/40 blur-3xl" />
      <div className="relative flex items-center justify-between text-xs text-white/60">
        <span>CAMPAIGN OVERVIEW</span>
        <span className="rounded-full bg-white/10 px-2 py-1">Last 60 days</span>
      </div>
      <div className="relative mt-8 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/10 p-3">
          <p className="text-[10px] text-white/60">Net Orders</p>
          <b className="mt-2 block text-lg">22,145</b>
          <span className="text-[10px] text-[#d79dea]">+38.4%</span>
        </div>
        <div className="rounded-2xl bg-white/10 p-3">
          <p className="text-[10px] text-white/60">Revenue</p>
          <b className="mt-2 block text-lg">$213,291</b>
          <span className="text-[10px] text-[#f6c871]">+24.8%</span>
        </div>
      </div>
      <div className="line-chart relative mt-8 h-32 rounded-2xl p-3">
        <svg viewBox="0 0 400 120" className="h-full w-full overflow-visible">
          <path d="M0 98 C45 88, 65 94, 96 70 S145 84, 171 52 S215 64, 246 38 S290 54, 322 20 S366 30, 400 5" fill="none" stroke="#d79dea" strokeWidth="4" strokeLinecap="round" />
          <path d="M0 98 C45 88, 65 94, 96 70 S145 84, 171 52 S215 64, 246 38 S290 54, 322 20 S366 30, 400 5 V120 H0Z" fill="url(#fill)" opacity=".18" />
          <defs>
            <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#d79dea" />
              <stop offset="1" stopColor="#d79dea" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function PhoneMock({ website = false }: { website?: boolean }) {
  return (
    <div className="phone mx-auto w-[210px] rounded-[2.2rem] border-[7px] border-[#412650] bg-[#412650] p-1">
      <div className="phone-screen min-h-[340px] overflow-hidden rounded-[1.7rem] p-3">
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#dac9df]" />
        <div className="flex items-center justify-between">
          <div className="h-7 w-7 rounded-xl bg-[#8e31b5]" />
          <div className="flex gap-1">
            <i className="h-2 w-2 rounded-full bg-[#d8c7df]" />
            <i className="h-2 w-2 rounded-full bg-[#d8c7df]" />
          </div>
        </div>
        {website ? (
          <>
            <div className="mt-7 rounded-2xl bg-[#e9d1f2] p-4">
              <div className="h-2 w-16 rounded-full bg-[#8e31b5]" />
              <div className="mt-3 h-2 w-full rounded-full bg-white/90" />
              <div className="mt-2 h-2 w-4/5 rounded-full bg-white/90" />
              <button className="mt-5 rounded-full bg-[#8e31b5] px-3 py-1 text-[8px] font-bold text-white">Start today</button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="h-16 rounded-xl bg-white shadow-sm" />
              <div className="h-16 rounded-xl bg-[#f7dfbc] shadow-sm" />
            </div>
          </>
        ) : (
          <>
            <div className="mt-7 h-32 rounded-2xl bg-gradient-to-br from-[#a950c8] to-[#e4a8ec] p-3">
              <span className="text-[9px] font-bold text-white">NEW ARRIVAL</span>
              <div className="mt-12 h-2 w-14 rounded bg-white/60" />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="h-2 w-20 rounded bg-[#c9b3d1]" />
                <div className="mt-2 h-2 w-12 rounded bg-[#e6ddec]" />
              </div>
              <b className="text-sm text-[#8e31b5]">$42.00</b>
            </div>
            <button className="mt-6 w-full rounded-xl bg-[#0a0a0c] py-3 text-[10px] font-bold text-white">Shop now</button>
          </>
        )}
      </div>
    </div>
  );
}

function SearchMock() {
  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-[0_25px_55px_rgba(58,25,73,.12)]">
      <div className="flex items-center gap-3 rounded-full border border-[#e9deed] px-4 py-3 text-xs text-[#987fa2]">
        <Search size={14} /> best wellness studio in Dhaka <span className="ml-auto text-[#8e31b5]">⌕</span>
      </div>
      <div className="mt-6 rounded-2xl border border-[#e9deed] p-4">
        <div className="flex items-center gap-2 text-[10px] text-[#7c6688]">
          <div className="h-5 w-5 rounded-full bg-[#d8b0e7]" /> zenithwellness.com
        </div>
        <h4 className="mt-3 font-display text-lg font-bold text-[#6f2a8b]">Zenith Wellness | Feel better, live brighter</h4>
        <p className="mt-2 text-xs leading-5 text-[#76667d]">Find a calmer, stronger version of yourself with expert care...</p>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-[#f1e1f6] px-2 py-1 text-[9px] text-[#8e31b5]">4.9 rating</span>
          <span className="rounded-full bg-[#f1e1f6] px-2 py-1 text-[9px] text-[#8e31b5]">Open today</span>
        </div>
      </div>
      <div className="mt-3 h-2 w-2/3 rounded bg-[#eee6f1]" />
      <div className="mt-2 h-2 w-1/2 rounded bg-[#eee6f1]" />
    </div>
  );
}

const detailRows = [
  { title: 'Strategic Marketing', kicker: '01 / TURN SPEND INTO MOMENTUM', text: 'The right message, audience, and offer — connected into a growth system you can see working in real time.', tags: ['Meta Ads', 'Google Ads', 'Growth Strategy'], visual: <MiniChart /> },
  { title: 'Eye-Catching Designs', kicker: '02 / MAKE THE SCROLL STOP', text: 'Creative that feels unmistakably you, then does the hard work of moving a curious person toward a confident click.', tags: ['Ad Creatives', 'Brand Identity', 'Video'], visual: <PhoneMock /> },
  { title: 'Web Development', kicker: '03 / BUILD TO CONVERT', text: 'High-performing digital experiences built around your customer journey, not around a template.', tags: ['React', 'Next.js', 'Landing Pages'], visual: <PhoneMock website /> },
  { title: 'Robust SEO', kicker: '04 / GET FOUND BY THE RIGHT PEOPLE', text: 'A considered technical and content foundation that keeps compounding after the campaign ends.', tags: ['Technical SEO', 'Content', 'Analytics'], visual: <SearchMock /> },
];

function ServiceDetails() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-wide">
        {detailRows.map((row, i) => (
          <div key={row.title} className="grid items-center gap-12 py-14 md:grid-cols-2 md:gap-24">
            <Reveal className={`service-detail-visual ${i % 2 ? 'md:order-2' : ''}`}>
              {row.visual}
            </Reveal>
            <Reveal delay={0.08} className={`service-detail-copy ${i % 2 ? 'md:order-1' : ''}`}>
              <span className="eyebrow">{row.kicker}</span>
              <h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-.06em] text-[#0a0a0c] md:text-6xl">{row.title}</h2>
              <p className="mt-5 max-w-md text-lg leading-8 text-[#5d5d69]">{row.text}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {row.tags.map(tag => (
                  <span key={tag} className="rounded-full border border-[#dec5e6] px-3 py-1.5 text-xs font-semibold text-[#8e31b5]">
                    {tag}
                  </span>
                ))}
              </div>
              <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#8e31b5]" data-testid={`link-detail-${i}`}>
                Explore this service <ArrowRight size={15} />
              </a>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

const capabilities = [
  {
    title: 'Strategic Marketing',
    blurb: 'The right message in front of the right audience, connected into a growth system you can watch working in real time.',
    bullets: ['Meta and Google campaign architecture', 'Offer, audience, and creative testing', 'Budget reallocated every single week'],
    visual: <MiniChart />,
  },
  {
    title: 'Eye-Catching Design',
    blurb: 'Creative that feels unmistakably yours, then does the hard work of turning a curious scroll into a confident click.',
    bullets: ['Ad creatives built for the feed', 'Brand identity and guidelines', 'Short-form video and motion'],
    visual: <PhoneMock />,
  },
  {
    title: 'Web Development',
    blurb: 'High-performing digital experiences built around your customer journey instead of around a template.',
    bullets: ['React and Next.js builds', 'Landing pages tuned to convert', 'Speed, schema, and analytics baked in'],
    visual: <PhoneMock website />,
  },
  {
    title: 'Robust SEO',
    blurb: 'A considered technical and content foundation that keeps compounding long after the campaign budget stops.',
    bullets: ['Technical audits and real fixes', 'Content mapped to buying intent', 'Reporting that ties back to revenue'],
    visual: <SearchMock />,
  },
];

// Left column is sticky, so it never moves — a ScrollTrigger per visual just swaps
// which entry is open while the right column scrolls past underneath it.
function StickyServices() {
  const stickyRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.cap-panel').forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 62%',
        end: 'bottom 62%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      });
    });
  }, { scope: stickyRef });

  return (
    <section ref={stickyRef} id="capabilities" className="bg-white py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">WHAT WE RUN FOR YOU</span>
          <h2 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-.07em] text-[#0a0a0c] md:text-7xl">
            Four disciplines,<br />one operating system.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20">
          {/* The rail — pinned in place, only the open entry changes */}
          <div className="hidden lg:block">
            <div className="sticky top-[116px]">
              {capabilities.map((item, i) => {
                const open = active === i;
                return (
                  <div key={item.title} className={`border-l-2 pl-6 transition-colors duration-500 ${open ? 'border-[#0a0a0c]' : 'border-[#eaeaf0]'}`}>
                    <button
                      onClick={() => document.getElementById(`cap-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                      className="block w-full py-4 text-left"
                      data-testid={`button-capability-${i}`}
                    >
                      <span className={`font-display text-2xl font-extrabold tracking-[-.05em] transition-colors duration-500 ${open ? 'text-[#0a0a0c]' : 'text-[#b6b6c2]'}`}>
                        {item.title}
                      </span>
                    </button>
                    <div className={`grid transition-all duration-500 ease-out ${open ? 'grid-rows-[1fr] pb-7 opacity-100' : 'grid-rows-[0fr] pb-0 opacity-0'}`}>
                      <div className="overflow-hidden">
                        <p className="max-w-sm text-sm leading-7 text-[#5d5d69]">{item.blurb}</p>
                        <ul className="mt-4 space-y-2.5">
                          {item.bullets.map(bullet => (
                            <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#3a3a44]">
                              <Check size={15} className="mt-1 shrink-0 text-[#8e31b5]" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0a0a0c] transition hover:gap-3" data-testid={`link-capability-${i}`}>
                          Explore this service <ArrowRight size={15} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* The visuals — these are what scrolls */}
          <div>
            {capabilities.map((item, i) => (
              <div key={item.title} id={`cap-${i}`} className="cap-panel pb-10 lg:pb-24">
                <div className="mb-6 lg:hidden">
                  <span className="font-mono-custom text-xs font-bold text-[#8e31b5]">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-3xl font-extrabold tracking-[-.05em] text-[#0a0a0c]">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#5d5d69]">{item.blurb}</p>
                </div>
                <div className="flex min-h-[380px] items-center justify-center rounded-[2rem] border border-[#edecf1] bg-[#f7f6f9] p-6 md:min-h-[440px] md:p-12">
                  <div className="w-full">{item.visual}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Gradients are near-black now, with only a trace of brand in the second stop.
const projects = [
  {
    name: 'Loom & Thread', result: '3.2x ROAS in 60 days', category: 'Meta Ads + Landing Page',
    bg: 'from-[#0b0b0e] to-[#2c1b38]', icon: TrendingUp,
    blurb: 'A denim label burning budget on broad targeting. We rebuilt the funnel around three offers and let the winner take the spend.',
    tags: ['Meta Ads', 'Funnel Rebuild', 'Landing Page', 'Creative Testing'],
  },
  {
    name: 'UrbanNest Furniture', result: 'Full website rebuild + automation', category: 'Web Development',
    bg: 'from-[#0c0c10] to-[#1f2436]', icon: Layers3,
    blurb: 'Six-second load times and a lead inbox nobody checked. New Next.js build, new CRM routing, same team — now answering in minutes.',
    tags: ['Next.js', 'CRM Automation', 'Site Speed', 'Lead Routing'],
  },
  {
    name: 'Zenith Wellness', result: 'Organic traffic up 180%', category: 'SEO + Content',
    bg: 'from-[#0b0b0e] to-[#24322c]', icon: Search,
    blurb: 'Ranking for nothing anyone searched. We mapped real intent, fixed the technical debt, and let the content compound.',
    tags: ['Technical SEO', 'Content Strategy', 'Local Search', 'Schema'],
  },
  {
    name: 'Pinnacle Skincare', result: 'Rebrand + social growth', category: 'Creative + Social Media',
    bg: 'from-[#0c0b0f] to-[#33203a]', icon: Sparkles,
    blurb: 'A good product wearing a forgettable brand. New identity, a proper content engine, and a feed people actually stop on.',
    tags: ['Brand Identity', 'Short-Form Video', 'Social Management', 'UGC'],
  },
];

function BrowserMock({ project, bg, icon: Icon }: { project: string; bg: string; icon: typeof TrendingUp }) {
  return (
    <div className={`portfolio-visual relative h-60 overflow-hidden rounded-[1.35rem] bg-gradient-to-br ${bg} p-4`}>
      <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full border-[24px] border-white/15" />
      <div className="browser-window relative mx-auto max-w-[340px] overflow-hidden rounded-xl bg-white shadow-[0_18px_35px_rgba(43,27,61,.24)]">
        <div className="flex items-center gap-1.5 border-b border-[#eee7f1] bg-[#faf8fb] px-3 py-2">
          <i className="h-1.5 w-1.5 rounded-full bg-[#e48c96]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#e9c77b]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#93c894]" />
          <span className="ml-3 h-2 w-24 rounded-full bg-[#e9e1ed]" />
        </div>
        <div className="grid grid-cols-[52px_1fr] gap-3 p-3">
          <div className="space-y-2 rounded-lg bg-[#3a214b] p-2">
            <span className="block h-2 w-7 rounded bg-[#c98bdd]" />
            <span className="block h-1.5 w-6 rounded bg-white/30" />
            <span className="block h-1.5 w-6 rounded bg-white/30" />
            <span className="block h-1.5 w-6 rounded bg-white/30" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="h-2.5 w-24 rounded bg-[#0a0a0c]" />
              <Icon size={17} className="text-[#8e31b5]" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[1, 2, 3].map(n => (
                <span key={n} className="h-10 rounded-lg bg-[#f1e3f5]" />
              ))}
            </div>
            <div className="mt-3 flex items-end gap-1.5">
              {[22, 34, 27, 44, 39, 54, 47, 68].map((height, n) => (
                <i key={n} className="flex-1 rounded-t bg-[#b565d6]" style={{ height }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="absolute bottom-4 left-5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {project} · Active
      </span>
    </div>
  );
}

function Work() {
  const workRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.work-card').forEach((card, i) => {
      gsap.fromTo(card,
        { scale: 0.88, opacity: 0, y: 40 },
        {
          scale: 1, opacity: 1, y: 0, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: card, start: 'top 80%', end: 'top 30%', scrub: false, toggleActions: 'play none none none' },
          delay: i * 0.12
        }
      );
      const visual = card.querySelector<HTMLElement>('.portfolio-visual');
      if (visual) {
        gsap.fromTo(visual,
          { clipPath: 'inset(0 100% 0 0 round 1.35rem)' },
          {
            clipPath: 'inset(0 0% 0 0 round 1.35rem)', duration: 0.85, ease: 'power3.inOut', clearProps: 'clipPath',
            scrollTrigger: { trigger: card, start: 'top 78%', toggleActions: 'play none none none' }
          }
        );
      }
    });
  }, { scope: workRef });

  return (
    <section ref={workRef} id="work" className="bg-[#f7f6f9] py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">DELIVERED WORK</span>
          <h2 className="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-.07em] text-[#0a0a0c] md:text-7xl">
            A track record of results,<br />
            <span className="gradient-text">delivered.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#5d5d69]">For brands who trusted us with the messy middle — and left with numbers worth talking about.</p>
        </Reveal>
        <div className="portfolio-grid mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <article key={project.name} className="work-card card-lift overflow-hidden rounded-3xl border border-[#e8ddef] bg-white p-3 soft-shadow" data-testid={`card-project-${i}`}>
                <BrowserMock project={project.name} bg={project.bg} icon={Icon} />
                <div className="flex items-end justify-between p-4">
                  <div>
                    <h3 className="font-display text-xl font-extrabold tracking-[-.04em] text-[#0a0a0c]">{project.name}</h3>
                    <p className="mt-2 text-sm font-semibold text-[#8e31b5]">{project.result}</p>
                    <p className="mt-1 text-xs text-[#877892]">{project.category}</p>
                  </div>
                  <ArrowDownRight className="text-[#cba5da]" size={22} />
                </div>
              </article>
            );
          })}
        </div>
        <Reveal>
          <a href="#contact" className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-[#8e31b5]" data-testid="link-all-projects">
            See all projects <ArrowRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// Each card is its own sticky element with a slightly lower offset than the one before,
// so scrolling deals them into a pile instead of moving the page past them.
function StackedWork() {
  const stackRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.stack-inner').forEach((card, i) => {
      if (i === projects.length - 1) return; // the last card is never covered
      gsap.to(card, {
        scale: 0.94, opacity: 0.35, ease: 'none',
        scrollTrigger: { trigger: card, start: 'bottom 84%', end: 'bottom 26%', scrub: 0.5 },
      });
    });
  }, { scope: stackRef });

  return (
    <section ref={stackRef} id="work" className="bg-[#f7f6f9] py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">DELIVERED WORK</span>
          <h2 className="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-.07em] text-[#0a0a0c] md:text-7xl">
            A track record of results,<br />delivered.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#5d5d69]">
            Four brands who handed us the messy middle and left with numbers worth repeating.
            Keep scrolling — the cards move, the page holds still.
          </p>
        </Reveal>

        <div className="mt-14">
          {projects.map((project, i) => {
            const Icon = project.icon;
            const [lead, ...rest] = project.name.split(' ');
            return (
              <div key={project.name} className="stack-card sticky mb-6" style={{ top: `${96 + i * 18}px` }}>
                <article className="stack-inner overflow-hidden rounded-[2rem] border border-[#e9e8ee] bg-white p-7 shadow-[0_30px_70px_-30px_rgba(10,10,12,.3)] md:p-10" data-testid={`card-project-${i}`}>
                  <div className="grid items-center gap-9 md:grid-cols-[1.05fr_.95fr] md:gap-12">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono-custom text-[11px] font-bold tracking-[.14em] text-[#a6a6b2]">0{i + 1}</span>
                        <span className="h-px w-8 bg-[#dededf]" />
                        <span className="font-mono-custom text-[11px] font-bold tracking-[.14em] text-[#0a0a0c]">{project.category.toUpperCase()}</span>
                      </div>
                      <h3 className="mt-5 font-display text-4xl font-extrabold tracking-[-.055em] text-[#0a0a0c] md:text-5xl">
                        {lead}{' '}
                        <span className="font-normal italic tracking-[-.01em]" style={{ fontFamily: serifAccent }}>{rest.join(' ')}</span>
                      </h3>
                      <p className="mt-4 max-w-md leading-7 text-[#5d5d69]">{project.blurb}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="rounded-full border border-[#dededf] px-3.5 py-1.5 text-xs font-semibold text-[#3a3a44]">{tag}</span>
                        ))}
                      </div>
                      <div className="mt-8 flex items-center gap-2.5">
                        <a href="#contact" className="inline-flex items-center rounded-full bg-[#0a0a0c] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#26262e]" data-testid={`link-project-${i}`}>
                          Know More
                        </a>
                        <a href="#contact" aria-label={`Open the ${project.name} case study`} className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#0a0a0c] text-white transition hover:bg-[#26262e]">
                          <ArrowUpRight size={17} />
                        </a>
                      </div>
                    </div>
                    <div>
                      <BrowserMock project={project.name} bg={project.bg} icon={Icon} />
                      <p className="mt-5 flex items-center gap-2 font-display text-lg font-extrabold tracking-[-.03em] text-[#0a0a0c]">
                        <Icon size={17} className="text-[#8e31b5]" /> {project.result}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DashboardMock() {
  return (
    <div className="phone mx-auto w-[235px] rounded-[2.2rem] border-[7px] border-[#412650] bg-[#412650] p-1">
      <div className="phone-screen min-h-[390px] overflow-hidden rounded-[1.7rem] p-4">
        <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-[#dac9df]" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] text-[#9b86a5]">Good morning</p>
            <b className="font-display text-sm text-[#0a0a0c]">Your growth dashboard</b>
          </div>
          <div className="h-7 w-7 rounded-full bg-[#d7a9e6]" />
        </div>
        <div className="mt-6 rounded-2xl bg-[#8e31b5] p-4 text-white">
          <p className="text-[9px] text-white/70">TOTAL REVENUE</p>
          <b className="mt-1 block text-xl">$48,290</b>
          <div className="mt-5 flex items-end gap-1">
            {[25, 45, 32, 55, 42, 72, 62, 90, 75].map((height, i) => (
              <i key={i} className="flex-1 rounded-t bg-white/50" style={{ height }} />
            ))}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-[8px] text-[#9b86a5]">LEADS</p>
            <b className="mt-2 block text-sm text-[#0a0a0c]">1,248</b>
          </div>
          <div className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-[8px] text-[#9b86a5]">CONVERSION</p>
            <b className="mt-2 block text-sm text-[#0a0a0c]">18.6%</b>
          </div>
        </div>
      </div>
    </div>
  );
}

function Process() {
  const processRef = useRef<HTMLElement>(null);
  const steps = [
    ['01', 'Plan Your Growth', 'Dream big, strategize with us, and turn plans into profit.'],
    ['02', 'Handover the Project', "We're your project navigators, turning plans into reality."],
    ['03', 'Count the Profit', 'Sit back, relax, and let the profits roll in.'],
  ];

  useGSAP(() => {
    // Line draws itself as you scroll through the section
    gsap.fromTo('.process-line',
      { scaleY: 0 },
      {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.process-steps', start: 'top 70%', end: 'bottom 60%', scrub: true }
      }
    );
    // Badges pop in with power1.out as line reaches them
    gsap.utils.toArray<HTMLElement>('.process-badge').forEach((badge, i) => {
      gsap.fromTo(badge,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, ease: 'power1.out', clearProps: 'all',
          scrollTrigger: { trigger: badge, start: 'top 72%', toggleActions: 'play none none none' }
        }
      );
    });
  }, { scope: processRef });

  return (
    <section ref={processRef} id="process" className="bg-white py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow text-center">ONBOARDING</p>
          <h2 className="mt-5 text-center font-display text-5xl font-extrabold tracking-[-.07em] text-[#0a0a0c] md:text-7xl">
            How It <span className="gradient-text">Starts?</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid items-center gap-16 md:grid-cols-[1fr_.8fr] md:gap-24">
          <div className="process-steps relative space-y-9">
            <span className="process-line absolute left-[19px] top-12 h-[calc(100%-48px)] w-px origin-top bg-gradient-to-b from-[#8e31b5] to-[#d8b5e3]" />
            {steps.map(([num, title, text]) => (
              <div key={num} className="process-step relative flex gap-5">
                <span className="process-badge relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: purpleGradient }}>
                  {num}
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold tracking-[-.03em] text-[#0a0a0c]">{title}</h3>
                  <p className="mt-2 max-w-sm leading-6 text-[#5d5d69]">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <Reveal delay={0.1}>
            <DashboardMock />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const whyRef = useRef<HTMLElement>(null);
  const rows = [
    ['Long turnaround times', 'Fast, same-week execution'],
    ['Vague, delayed reporting', 'Real-time, transparent reporting'],
    ['One-size-fits-all strategy', 'Custom strategy per brand'],
    ['Generic ad creatives', 'In-house creative + dev team'],
  ];

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.comparison-row').forEach((row, i) => {
      gsap.fromTo(row,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
        {
          clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'clipPath,opacity',
          scrollTrigger: { trigger: row, start: 'top 82%', toggleActions: 'play none none none' },
          delay: i * 0.1
        }
      );
    });
  }, { scope: whyRef });

  return (
    <section ref={whyRef} id="why-us" className="bg-[#f7f6f9] py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">THE INNOVICK DIFFERENCE</span>
          <h2 className="mt-5 font-display text-5xl font-extrabold tracking-[-.07em] text-[#0a0a0c] md:text-7xl">
            What makes us <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>different.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="comparison-table mt-14 overflow-hidden rounded-3xl border border-[#e8ddef] bg-white soft-shadow">
            <div className="grid grid-cols-[1fr_1fr] border-b border-[#eee5f1] bg-[#fcf9fd] px-5 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#9a84a5] md:px-9">
              <span>Others</span>
              <span className="text-[#8e31b5]">Innovick</span>
            </div>
            {rows.map(([other, us]) => (
              <div key={other} className="comparison-row grid grid-cols-[1fr_1fr] gap-4 border-b border-[#eee5f1] px-5 py-6 last:border-0 md:px-9">
                <span className="flex items-start gap-3 text-sm text-[#8d7d95]">
                  <Minus className="mt-0.5 shrink-0 text-[#c9b9ce]" size={16} />
                  {other}
                </span>
                <span className="flex items-start gap-3 text-sm font-bold text-[#0a0a0c]">
                  <Check className="comparison-check mt-0.5 shrink-0 rounded-full bg-[#e5f2df] p-0.5 text-[#57944d]" size={17} />
                  {us}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Bangladeshi money reads in lakh and crore — worth getting right.
function formatTaka(amount: number) {
  if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)} L`;
  return `৳${Math.round(amount).toLocaleString('en-IN')}`;
}

// Tweens between the old and new value whenever a lever moves.
function LiveNumber({ value, render }: { value: number; render: (n: number) => string }) {
  const proxy = useRef({ v: value });
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const tween = gsap.to(proxy.current, {
      v: value, duration: 0.5, ease: 'power2.out',
      onUpdate: () => setShown(proxy.current.v),
    });
    return () => { tween.kill(); };
  }, [value]);

  return <>{render(shown)}</>;
}

const opsFeed = [
  'Budget moved off Advantage+ into a manual ROAS campaign · CTR +18%',
  'Creative variant B beat control on cost per add-to-cart · promoted',
  'Landing page LCP cut from 4.1s to 1.6s after the image pipeline fix',
  'Abandoned-cart flow rewritten · 6.4% of recovered carts converted',
  'Search terms report pruned · 34 wasted keywords negated',
  'Weekly numbers pushed to the client dashboard · no PDF involved',
];

const CPC = 12;          // ৳ per click, blended across Meta and Google
const CPC_GAIN = 0.84;   // what tighter targeting does to click cost
const CVR_GAIN = 1.75;   // what a rebuilt funnel does to conversion rate

function GrowthRoom() {
  const roomRef = useRef<HTMLElement>(null);
  const [spend, setSpend] = useState(400000);
  const [aov, setAov] = useState(2400);
  const [cvr, setCvr] = useState(1.4);
  const [feedIndex, setFeedIndex] = useState(0);
  const [dhakaTime, setDhakaTime] = useState('--:--:--');

  useEffect(() => {
    const id = window.setInterval(() => setFeedIndex(n => (n + 1) % opsFeed.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const paint = () => setDhakaTime(
      new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );
    paint();
    const id = window.setInterval(paint, 1000);
    return () => window.clearInterval(id);
  }, []);

  const todayOrders = (spend / CPC) * (cvr / 100);
  const todayRevenue = todayOrders * aov;
  const nextOrders = (spend / (CPC * CPC_GAIN)) * ((cvr * CVR_GAIN) / 100);
  const nextRevenue = nextOrders * aov;
  const roas = nextRevenue / spend;
  const costPerOrder = nextOrders > 0 ? spend / nextOrders : 0;
  const lift = todayRevenue > 0 ? ((nextRevenue - todayRevenue) / todayRevenue) * 100 : 0;

  const levers = [
    { key: 'spend', label: 'Monthly ad spend', value: spend, min: 50000, max: 2000000, step: 25000, set: setSpend, read: formatTaka },
    { key: 'aov', label: 'Average order value', value: aov, min: 500, max: 12000, step: 100, set: setAov, read: formatTaka },
    { key: 'cvr', label: 'Conversion rate today', value: cvr, min: 0.3, max: 5, step: 0.1, set: setCvr, read: (v: number) => `${v.toFixed(1)}%` },
  ];

  const tiles = [
    { label: 'BLENDED ROAS', value: roas, read: (v: number) => `${v.toFixed(2)}x` },
    { label: 'ORDERS / MONTH', value: nextOrders, read: (v: number) => Math.round(v).toLocaleString('en-IN') },
    { label: 'COST PER ORDER', value: costPerOrder, read: formatTaka },
  ];

  return (
    <section ref={roomRef} id="growth-room" className="relative overflow-hidden bg-[#08080a] py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[.05] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="pointer-events-none absolute -right-32 top-10 h-[440px] w-[440px] rounded-full bg-[#8e31b5]/12 blur-[140px]" />

      <div className="container-wide relative">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 font-mono-custom text-[10px] font-bold tracking-[.16em] text-white/60">
                <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#4ade80]" /> THE GROWTH ROOM
              </span>
              <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.1rem,4.6vw,3.9rem)] font-extrabold leading-[1.02] tracking-[-.06em] text-white">
                Move the levers. See what your budget<br className="hidden md:block" /> is actually capable of.
              </h2>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.03] px-5 py-4 text-right">
              <p className="font-mono-custom text-[10px] font-bold tracking-[.16em] text-white/40">DHAKA · GMT+6</p>
              <p className="mt-1.5 font-mono-custom text-2xl font-bold tabular-nums text-white">{dhakaTime}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)]">
          {/* Levers */}
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[.035] p-7 md:p-9">
            <p className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-white/40">01 / YOUR NUMBERS TODAY</p>
            <div className="mt-8 space-y-9">
              {levers.map(lever => {
                const pct = ((lever.value - lever.min) / (lever.max - lever.min)) * 100;
                return (
                  <div key={lever.key}>
                    <div className="flex items-end justify-between">
                      <label htmlFor={`lever-${lever.key}`} className="text-[13px] font-semibold text-white/55">{lever.label}</label>
                      <span className="font-display text-xl font-extrabold tracking-[-.04em] text-white">{lever.read(lever.value)}</span>
                    </div>
                    <input
                      id={`lever-${lever.key}`}
                      type="range"
                      className="lever mt-4"
                      min={lever.min} max={lever.max} step={lever.step} value={lever.value}
                      onChange={e => lever.set(Number(e.target.value))}
                      style={{ backgroundImage: `linear-gradient(to right, #ffffff ${pct}%, rgba(255,255,255,.14) ${pct}%)` }}
                      data-testid={`input-lever-${lever.key}`}
                    />
                  </div>
                );
              })}
            </div>
            <p className="mt-9 border-t border-white/10 pt-6 text-xs leading-6 text-white/35">
              Illustrative model, not a promise. Built on a ৳{CPC} blended click cost and the median
              lift across the accounts we have rebuilt. Week one, we audit yours properly.
            </p>
          </div>

          {/* Projection */}
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[.035] p-7 md:p-9">
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-white/40">02 / WITH INNOVICK RUNNING IT</p>
              <span className="shrink-0 rounded-full bg-[#4ade80]/12 px-2.5 py-1 font-mono-custom text-[10px] font-bold text-[#6ee7a0]">
                +<LiveNumber value={lift} render={n => n.toFixed(0)} />% REVENUE
              </span>
            </div>

            <p className="mt-7 font-display text-[clamp(2.3rem,5vw,3.4rem)] font-extrabold leading-none tracking-[-.06em] text-white">
              <LiveNumber value={nextRevenue} render={formatTaka} />
            </p>
            <p className="mt-2.5 text-[13px] text-white/40">Projected monthly revenue from the same budget.</p>

            {/* Today vs. with-us bars */}
            <div className="mt-8 space-y-4">
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-white/40">
                  <span>WHERE YOU ARE TODAY</span>
                  <span className="tabular-nums">{formatTaka(todayRevenue)}</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full rounded-full bg-white/25 transition-[width] duration-500 ease-out" style={{ width: `${(todayRevenue / nextRevenue) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-white/70">
                  <span>WITH THE FUNNEL REBUILT</span>
                  <span className="tabular-nums">{formatTaka(nextRevenue)}</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full w-full rounded-full" style={{ background: purpleGradient }} />
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {tiles.map(tile => (
                <div key={tile.label} className="rounded-2xl border border-white/8 bg-[#0e0e13] px-4 py-4">
                  <p className="font-mono-custom text-[9px] font-bold tracking-[.14em] text-white/35">{tile.label}</p>
                  <p className="mt-2.5 font-display text-lg font-extrabold tracking-[-.04em] text-white">
                    <LiveNumber value={tile.value} render={tile.read} />
                  </p>
                </div>
              ))}
            </div>

            {/* Ops feed — a sample day, cycling */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/8 bg-[#0e0e13] px-4 py-3.5">
              <div className="flex items-center gap-2 font-mono-custom text-[9px] font-bold tracking-[.14em] text-white/35">
                <Activity size={11} className="text-[#6ee7a0]" /> SAMPLE DAY IN THE ROOM
              </div>
              <p key={feedIndex} className="mt-2.5 animate-in fade-in slide-in-from-bottom-2 font-mono-custom text-[11px] leading-5 text-white/60 duration-500">
                {opsFeed[feedIndex]}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#contact" variant="white">
                Model this on my real numbers <ArrowRight size={15} />
              </Button>
              <span className="font-mono-custom text-[11px] text-white/30">Takes one call. No deck.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const teamRef = useRef<HTMLElement>(null);
  const pills = ['One Team, One Mission', 'Always Learning', 'Built To Ship', 'Remote Friendly', 'Client First'];

  useGSAP(() => {
    const speeds = [-40, -20, -60]; // px each photo drifts as section scrolls past
    gsap.utils.toArray<HTMLElement>('.team-photo').forEach((photo, i) => {
      gsap.to(photo,
        {
          y: speeds[i], ease: 'none',
          scrollTrigger: { trigger: teamRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
        }
      );
    });
  }, { scope: teamRef });

  return (
    <section ref={teamRef} className="bg-white py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">INSIDE INNOVICK</span>
          <h2 className="mt-5 max-w-3xl font-display text-5xl font-extrabold tracking-[-.07em] text-[#0a0a0c] md:text-7xl">
            The team behind<br />
            <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>the work.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#5d5d69]">One team across marketing, design, and development — close enough to move quickly, experienced enough to know what matters.</p>
          <div className="team-pills mt-8 flex max-w-3xl flex-wrap gap-2">
            {pills.map(pill => (
              <span key={pill} className="rounded-full border border-[#dfc9e7] bg-[#fcf9fd] px-4 py-2 text-xs font-semibold text-[#6d328b]">{pill}</span>
            ))}
          </div>
        </Reveal>
        <div className="team-gallery mt-14 grid gap-4 md:grid-cols-[1.1fr_.9fr_.9fr]">
          <Reveal className="h-full" delay={0.05}>
            <div className="team-photo relative h-80 overflow-hidden rounded-3xl bg-[#352044] shadow-[0_20px_40px_-10px_rgba(142,49,181,.2)]">
              <img width="1000" height="640" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85" alt="Innovick team collaborating around a table" className="h-full w-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#352044]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-7">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">MAKE IT REAL</p>
                <p className="mt-2 max-w-xs font-display text-2xl font-extrabold leading-tight tracking-[-.06em] text-white">Ideas are only useful when they ship.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="team-photo relative h-80 overflow-hidden rounded-3xl bg-[#a758b7] shadow-[0_20px_40px_-10px_rgba(142,49,181,.2)]">
              <img width="800" height="640" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=85" alt="Creative team working together" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6d328b]/60 to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full bg-white/80 px-3 py-1 text-[9px] font-bold text-[#6d328b]">DHAKA ↔ WORLD</span>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="team-photo relative h-80 overflow-hidden rounded-3xl bg-[#7461ae] shadow-[0_20px_40px_-10px_rgba(142,49,181,.2)]">
              <img width="800" height="640" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=85" alt="Team meeting in a bright office" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/70 to-transparent" />
              <span className="absolute bottom-5 left-5 font-mono-custom text-[10px] text-white/80">CREATIVE / DEV / GROWTH</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: 'Rafiul Karim', role: 'Founder, Loom & Thread', quote: 'Innovick rebuilt our ad funnel from scratch and our ROAS nearly doubled in eight weeks.', video: true },
  { name: 'Sadia Afrin', role: 'Marketing Lead, GreenLeaf Organics', quote: 'We went from a messy ad account to a clean, profitable one in under a month.', video: false },
  { name: 'Tanvir Hasan', role: 'CEO, UrbanNest Furniture', quote: 'They rebuilt our website and automated our lead follow-up. Felt like an extension of our team.', video: true },
  { name: 'Nusrat Jahan', role: 'Co-founder, Pinnacle Skincare', quote: 'Every report actually makes sense. Clear numbers and a real plan for the month ahead.', video: false },
];
const avatars = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=85',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=85',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=85',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=85',
];

function Testimonials() {
  const testimonialsRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.testimonial-card').forEach((card, i) => {
      const fromLeft = i % 2 === 0;
      gsap.fromTo(card,
        { x: fromLeft ? -70 : 70, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none none' },
          delay: Math.floor(i / 2) * 0.12
        }
      );
    });
  }, { scope: testimonialsRef });

  return (
    <section ref={testimonialsRef} id="reviews" className="bg-[#f7f6f9] py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">CLIENT NOTES</span>
          <h2 className="mt-5 font-display text-5xl font-extrabold tracking-[-.07em] text-[#0a0a0c] md:text-7xl">
            Hear from <span className="gradient-text">them.</span>
          </h2>
        </Reveal>
        <div className="testimonial-grid mt-14 grid gap-4 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <article key={item.name} className="testimonial-card card-lift relative rounded-3xl border border-[#e8ddef] bg-white p-7 soft-shadow" data-testid={`card-testimonial-${i}`}>
              {item.video && (
                <span className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#f1ddf6] text-[#8e31b5]">
                  <CirclePlay size={17} fill="currentColor" />
                </span>
              )}
              <div className="flex items-center gap-3">
                <img src={avatars[i]} alt={`${item.name} portrait`} width="44" height="44" loading="lazy" className="h-11 w-11 rounded-full object-cover ring-2 ring-[#eddbf3]" />
                <div>
                  <p className="font-display text-sm font-bold text-[#0a0a0c]">{item.name}</p>
                  <p className="text-xs text-[#8d7b95]">{item.role}</p>
                </div>
              </div>
              <div className="testimonial-stars mt-7 flex gap-1 text-[#e8a72c]">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" strokeWidth={1.5} />)}
              </div>
              <p className="mt-5 max-w-md font-display text-xl font-bold leading-8 tracking-[-.03em] text-[#493556]">“{item.quote}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const videoReviews = [
  {
    name: 'Rafiul Karim', role: 'Founder, Loom & Thread', metric: '3.2x ROAS', length: '2:14',
    quote: 'Innovick rebuilt our ad funnel from scratch and our ROAS nearly doubled in eight weeks. The weekly calls were short because the numbers already said everything.',
    thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
    // Paste a YouTube/Vimeo *embed* URL here and the card plays it inline.
    videoUrl: '',
  },
  {
    name: 'Sadia Afrin', role: 'Marketing Lead, GreenLeaf Organics', metric: '−41% CPA', length: '1:48',
    quote: 'We went from a messy ad account to a clean, profitable one in under a month. I finally understand where every taka goes.',
    thumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
  },
  {
    name: 'Tanvir Hasan', role: 'CEO, UrbanNest Furniture', metric: '6s → 1.6s', length: '3:02',
    quote: 'They rebuilt our website and automated our lead follow-up. It stopped feeling like an agency and started feeling like an extension of our team.',
    thumb: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
  },
  {
    name: 'Nusrat Jahan', role: 'Co-founder, Pinnacle Skincare', metric: '+180% organic', length: '2:27',
    quote: 'Every report actually makes sense. Clear numbers, a real plan for the month ahead, and nobody hiding behind jargon.',
    thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
  },
];

function VideoReviews() {
  const reviewsRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.review-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          delay: (i % 2) * 0.1,
        }
      );
    });
  }, { scope: reviewsRef });

  return (
    <section ref={reviewsRef} id="reviews" className="bg-[#f7f6f9] py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">RESULTS</span>
          <h2 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-.07em] text-[#0a0a0c] md:text-7xl">
            What clients say.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-[#5d5d69]">
            Not paraphrased into a pull quote by us. Press play and hear it in their own words.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {videoReviews.map((item, i) => {
            const isOpen = open === i;
            return (
              <article key={item.name} className="review-card group relative rounded-[1.75rem] border border-[#e9e8ee] bg-white p-3 shadow-[0_26px_60px_-30px_rgba(10,10,12,.3)]" data-testid={`card-review-${i}`}>
                <div className="relative aspect-[16/11] overflow-hidden rounded-[1.35rem] bg-[#0a0a0c]">
                  {isOpen && item.videoUrl ? (
                    <iframe
                      src={item.videoUrl}
                      title={`${item.name} video review`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  ) : (
                    <>
                      <img
                        src={item.thumb}
                        alt={`${item.name}, ${item.role}`}
                        width="900" height="620" loading="lazy" decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/85 via-[#0a0a0c]/10 to-[#0a0a0c]/15" />

                      {/* Folded corner, straight off the reference */}
                      <span className="pointer-events-none absolute right-0 top-0 h-11 w-11 bg-white" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                      <ArrowUpRight size={13} className="pointer-events-none absolute right-2 top-2 text-[#0a0a0c]" />

                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="absolute inset-0 grid place-items-center"
                        aria-label={`Play the review from ${item.name}`}
                        data-testid={`button-play-review-${i}`}
                      >
                        <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white/95 text-[#0a0a0c] shadow-[0_18px_44px_rgba(0,0,0,.45)] transition-transform duration-300 group-hover:scale-110">
                          <Play size={25} fill="currentColor" strokeWidth={0} className="ml-[3px]" />
                        </span>
                      </button>

                      <span className="pointer-events-none absolute bottom-4 left-5 font-mono-custom text-[11px] font-bold text-white/75">{item.length}</span>
                      <span className="pointer-events-none absolute bottom-4 right-5 rounded-full bg-white/15 px-2.5 py-1 font-mono-custom text-[10px] font-bold text-white backdrop-blur-sm">{item.metric}</span>

                      {/* No embed URL yet? Show the written version instead of doing nothing. */}
                      <AnimatePresence>
                        {isOpen && !item.videoUrl && (
                          <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col justify-between bg-[#0a0a0c]/95 p-6 backdrop-blur-sm"
                          >
                            <Quote size={18} className="text-[#c27cdf]" />
                            <p className="font-display text-[15px] font-bold leading-7 tracking-[-.02em] text-white md:text-base">“{item.quote}”</p>
                            <button onClick={() => setOpen(null)} className="self-start font-mono-custom text-[10px] font-bold tracking-[.14em] text-white/45 transition hover:text-white">
                              CLOSE ✕
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>

                <div className="flex items-start justify-between gap-4 px-4 pt-5">
                  <div>
                    <p className="font-display text-lg font-extrabold tracking-[-.035em] text-[#0a0a0c]">{item.name}</p>
                    <p className="mt-1 text-[13px] text-[#7b7b88]">{item.role}</p>
                  </div>
                  <div className="mt-1 flex shrink-0 gap-0.5 text-[#0a0a0c]">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={12} fill="currentColor" strokeWidth={0} />)}
                  </div>
                </div>
                <p className="px-4 pb-3 pt-3 text-sm leading-7 text-[#5d5d69]">“{item.quote}”</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// function FAQs() {
//   const faqsRef = useRef<HTMLElement>(null);
//   const [activeIndex, setActiveIndex] = useState<number | null>(0);

//   return (
//     <section ref={faqsRef} id="faqs" className="bg-white py-24 md:py-32">
//       <div className="container-wide">
//         <Reveal>
//           <span className="eyebrow">ANSWERS, NOT HEADSTONES</span>
//           <h2 className="mt-5 max-w-2xl font-display text-5xl font-extrabold tracking-[-.07em] text-[#0a0a0c] md:text-7xl">
//             Common questions.
//           </h2>
//         </Reveal>
//         <div className="faq-grid mt-10 max-w-4xl">
//           {faqs.map(([q, a], i) => (
//             <div key={i} className={`border-b border-[#e8ddef] py-7 ${i === activeIndex ? 'pb-9' : ''}`}>
//               <button onClick={() => setActiveIndex(activeIndex === i ? null : i)} className="group flex w-full items-start justify-between gap-6 text-left" data-testid={`faq-toggle-${i}`}>
//                 <span className="mt-0.5 font-display text-xl font-bold tracking-[-.05em] text-[#0a0a0c] group-hover:text-[#8e31b5] transition-colors">{q}</span>
//                 <div className="relative h-6 w-6 shrink-0">
//                   <Plus size={24} strokeWidth={1.5} className={`absolute top-0 left-0 text-[#0a0a0c] group-hover:opacity-0 transition-opacity duration-200 ${activeIndex === i ? 'opacity-0 rotate-45' : ''}`} />
//                   <Minus size={24} strokeWidth={1.5} className={`absolute top-0 left-0 text-[#8e31b5] transition-opacity duration-200 ${activeIndex === i ? 'opacity-100' : 'opacity-0'}`} />
//                 </div>
//               </button>
//               {activeIndex === i && (
//                 <div className="faq-answer mt-5 max-w-2xl font-sans text-base leading-8 text-[#493556] animate-in fade-in slide-in-from-top-2 duration-200">
//                   <p>{a}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }   

const faqs = [
  ['Why should I choose Innovick over other agencies?', 'We combine marketing, creative, and development under one roof, with transparent, real-time reporting.'],
  ['What sets Innovick apart from the competition?', "Speed, honesty, and an in-house dev team most agencies don't have."],
  ['How can Innovick guarantee accurate reporting?', 'We give clients direct dashboard access instead of static monthly PDFs.'],
  ['Do you work with brands outside Bangladesh?', 'Yes, we currently serve clients across 12+ countries.'],
  ["What's the minimum commitment to start?", 'Most engagements start with a 3-month strategy cycle.'],
];

function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <section id="faqs" className="bg-white py-24 md:py-32">
      <div className="container-wide grid gap-14 md:grid-cols-[.7fr_1.3fr] md:gap-24">
        <Reveal>
          <span className="eyebrow">QUESTIONS, ANSWERED</span>
          <h2 className="mt-5 font-display text-5xl font-extrabold tracking-[-.07em] text-[#0a0a0c] md:text-7xl">
            Need<br />
            <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>help?</span>
          </h2>
          <p className="mt-6 max-w-xs leading-7 text-[#5d5d69]">Still curious? Bring the question to a strategy call. We’ll bring the useful answer.</p>
          <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#8e31b5]" data-testid="link-faq-contact">
            Ask us directly <ArrowRight size={15} />
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-[#eee5f1] border-y border-[#eee5f1]">
            {faqs.map(([question, answer], i) => (
              <div key={question}>
                <button onClick={() => setActive(active === i ? null : i)} className="flex w-full items-center justify-between gap-5 py-6 text-left" aria-expanded={active === i} data-testid={`button-faq-${i}`}>
                  <span className="font-display text-lg font-bold tracking-[-.03em] text-[#0a0a0c]">{question}</span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d9c0e2] text-[#8e31b5] transition-transform duration-300 ${active === i ? 'rotate-45' : ''}`}>
                    <Plus size={17} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="max-w-xl pb-6 pr-10 leading-7 text-[#5d5d69]">{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// TODO: replace the placeholder email, phone, and WhatsApp number with the real ones.
const contactRows = [
  { icon: Mail, label: 'EMAIL', value: 'hello@innovick.com', href: 'mailto:hello@innovick.com' },
  { icon: Phone, label: 'PHONE', value: '+880 1000 000000', href: 'tel:+8801000000000' },
  { icon: Globe2, label: 'STUDIO', value: 'Dhaka, Bangladesh · serving 12+ countries', href: '' },
];

function Footer() {
  return (
    <footer className="bg-[#08080a] text-white">
      {/* Contact band — gives every CTA on the page somewhere to actually land */}
      <div id="contact" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-28 -top-28 h-[400px] w-[400px] rounded-full bg-[#8e31b5]/14 blur-[130px]" />
        <div className="container-wide relative grid gap-12 py-20 md:grid-cols-[1.15fr_.85fr] md:gap-16 md:py-24">
          <div>
            <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-white/40">NEXT STEP</span>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4.2vw,3.3rem)] font-extrabold leading-[1.04] tracking-[-.06em] text-white">
              Tell us what isn’t working. We’ll tell you what we’d do about it.
            </h2>
            <p className="mt-5 max-w-md leading-8 text-white/50">
              One call, forty-five minutes, and a written plan you keep whether or not you hire us.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="mailto:hello@innovick.com" variant="white">
                Book a Strategy Call <ArrowRight size={15} />
              </Button>
              <a href="https://wa.me/8801000000000" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/65 transition hover:border-white/35 hover:text-white" data-testid="link-whatsapp">
                <MessageCircle size={15} /> WhatsApp us
              </a>
            </div>
          </div>
          <div className="grid content-center gap-3">
            {contactRows.map(row => {
              const Icon = row.icon;
              const body = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70">
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono-custom text-[9px] font-bold tracking-[.16em] text-white/35">{row.label}</span>
                    <span className="mt-1 block truncate text-sm font-semibold text-white/85">{row.value}</span>
                  </span>
                </>
              );
              return row.href ? (
                <a key={row.label} href={row.href} className="flex items-center gap-3.5 rounded-2xl border border-white/8 bg-white/[.03] p-4 transition hover:border-white/20 hover:bg-white/[.06]" data-testid={`link-contact-${row.label.toLowerCase()}`}>
                  {body}
                </a>
              ) : (
                <div key={row.label} className="flex items-center gap-3.5 rounded-2xl border border-white/8 bg-white/[.03] p-4">{body}</div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-wide border-t border-white/10 py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <Logo dark />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/55">
            {[
              ['Services', '#services'],
              ['Founder', '#founder'],
              ['Work', '#work'],
              ['Growth Room', '#growth-room'],
              ['Reviews', '#reviews'],
              ['FAQs', '#faqs'],
            ].map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-white" data-testid={`link-footer-${label.toLowerCase().replace(' ', '-')}`}>
                {label}
              </a>
            ))}
          </div>
          <div className="flex gap-2">
            <a href="https://linkedin.com" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white" data-testid="link-linkedin">
              <Linkedin size={15} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white" data-testid="link-instagram">
              <Instagram size={15} />
            </a>
            <a href="https://x.com" aria-label="Twitter X" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white" data-testid="link-twitter">
              <X size={15} />
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-white/35 md:flex-row">
          <span>© 2026 Innovick. All rights reserved.</span>
          <span>Made for brands with somewhere to go.</span>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Continuous background animations managed with ScrollTrigger viewport bounds
    const orbDrift = gsap.to('.hero-orb', { x: -18, y: 22, scale: 1.08, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true });
    ScrollTrigger.create({
      trigger: '.hero-orb',
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => orbDrift.play(),
      onEnterBack: () => orbDrift.play(),
      onLeave: () => orbDrift.pause(),
      onLeaveBack: () => orbDrift.pause(),
    });

    // Card hover micro-animations
    gsap.utils.toArray<HTMLElement>('.card-lift').forEach((card) => {
      card.addEventListener('mouseenter', () => gsap.to(card, { y: -7, boxShadow: '0 24px 60px rgba(83,37,117,.16)', duration: 0.35, ease: 'power2.out' }));
      card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, boxShadow: '0 18px 50px rgba(90,49,121,.10)', duration: 0.35, ease: 'power2.out' }));
    });

    // Project card hover — lift the browser mock inside the stacked cards
    gsap.utils.toArray<HTMLElement>('.stack-inner .portfolio-visual').forEach((visual) => {
      const browser = visual.querySelector<HTMLElement>('.browser-window');
      if (!browser) return;
      visual.addEventListener('mouseenter', () => gsap.to(browser, { scale: 1.05, duration: 0.5, ease: 'power2.out' }));
      visual.addEventListener('mouseleave', () => gsap.to(browser, { scale: 1, duration: 0.5, ease: 'power2.out' }));
    });
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="page-shell">
      <Navbar />
      <main>
        {/* Rhythm: two light sections, then a near-black one to make its CTA land. */}
        <Hero />
        <Stats />
        <Services />
        <Founder />         {/* dark */}
        <StickyServices />
        <StackedWork />
        <GrowthRoom />      {/* dark */}
        <WhyUs />
        <Team />
        <VideoReviews />
        <FAQ />
        {/* <ServiceDetails /> — superseded by StickyServices */}
        {/* <Work /> — superseded by StackedWork */}
        {/* <Process /> */}
        {/* <Testimonials /> — superseded by VideoReviews */}
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;