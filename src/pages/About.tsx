import { useState } from 'react';
import { ArrowRight, CircleCheck } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CursorFollower } from '@/components/common/CursorFollower';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/common/Button';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Stats } from '@/components/sections/Stats';
import { founder } from '@/data/founder';
import { teamMembers, type TeamMember } from '@/data/team';
import { clientNames } from '@/data/site';

/**
 * /about — who Innovick is, in six moves: hero with the founder's face, the
 * same proof strip the homepage leads with, six reasons brands stay, a
 * philosophy band, the team roster, and one CTA.
 *
 * Copy that already lives in `src/data/` is imported, never re-declared:
 * the founder comes from `data/founder.ts`, stats from `data/proof.ts` via the
 * shared `sections/Stats` section, teammates from `data/team.ts`. Only copy
 * unique to this page (the "why" cards and pillars) lives here.
 */

/** The "why brands love us" grid. Photos are stand-ins until real ones exist. */
const whyCards = [
  {
    tag: 'FOUNDERS',
    title: 'Built a Team From Zero',
    description: 'We didn’t start as an agency with a template. We built our own systems first, then packaged what worked.',
    bullets: ['Started with one client, scaled to 500+ brands.', 'Every process here has been battle-tested.'],
    quote: 'We don’t advise from theory. We advise from doing.',
    photo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    alt: 'A small team working together at one table',
  },
  {
    tag: 'OPERATORS',
    title: 'We Execute, Not Just Advise',
    description: 'Strategy without execution is just a slide deck. Our team runs the campaigns, builds the sites, and ships the work.',
    bullets: ['In-house creative, dev, and marketing under one roof.', 'No handoffs lost between departments.'],
    quote: 'If we recommend it, we can build it ourselves.',
    photo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    alt: 'The team executing a plan around a meeting table',
  },
  {
    tag: 'SPECIALISTS',
    title: 'Deep, Not Just Broad',
    description: 'Every service has a dedicated specialist behind it, not one generalist juggling six disciplines.',
    bullets: ['Dedicated strategists, designers, and developers.', 'Real expertise, not a jack-of-all-trades approach.'],
    quote: 'Specialization is what makes execution fast.',
    photo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    alt: 'A specialist focused on their craft at a desk',
  },
  {
    tag: 'TRANSPARENT',
    title: 'Numbers You Can Actually Trust',
    description: 'No vague monthly PDFs. Clients get real dashboard access to see exactly what’s working.',
    bullets: ['Real-time reporting, not delayed summaries.', 'Clear ROI, not vanity metrics.'],
    quote: 'If we can’t show the number, we don’t claim it.',
    photo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    alt: 'A live performance dashboard open on a laptop',
  },
  {
    tag: 'STRUCTURED',
    title: 'Systems Over Guesswork',
    description: 'We install repeatable systems, not one-off tactics that stop working the moment we look away.',
    bullets: ['Documented processes for every service.', 'Consistency that survives team changes.'],
    quote: 'Good marketing shouldn’t depend on luck.',
    photo: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
    alt: 'A documented process mapped out on a whiteboard',
  },
  {
    tag: 'COMMITTED',
    title: 'We Stay Close to the Work',
    description: 'Every account has a real point of contact — not a rotating account manager who’s never seen your brand.',
    bullets: ['Direct access to the people doing the work.', 'No disappearing after the contract is signed.'],
    quote: 'Relationships compound just like results do.',
    photo: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    alt: 'Two people in a committed one-on-one conversation',
  },
];

const philosophyPillars = [
  { title: 'Strategy First', text: 'Every dollar spent must have a clear purpose.' },
  { title: 'Execution Over Ideas', text: 'The best plan is useless without the discipline to run it.' },
  { title: 'Consistency Compounds', text: 'One good month means nothing. We build for the twelfth month.' },
];

/**
 * The founder portrait for the hero — the exact frame language of
 * `sections/Founder.tsx` (large radius, hairline border, deep shadow, frosted
 * name plate) with the gentle tilt this hero calls for. Falls back to an
 * initials block while `public/founder.jpg` doesn't exist, same as Founder.tsx.
 */
function FounderPortrait() {
  const [failed, setFailed] = useState(false);
  const initials = founder.name.split(' ').map(part => part[0]).join('');

  return (
    // Gentle tilt at rest (lg up); straightens back to level while hovered,
    // desktop pointers only — touch devices never see a stuck mid-hover state.
    <div className="relative mx-auto w-full max-w-[420px] transition-transform duration-500 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:rotate-0 lg:rotate-2">
      <div className="overflow-hidden rounded-[2rem] border border-[#e6e8f0] bg-[#eef0f6] shadow-[0_30px_80px_-30px_rgba(21,26,53,.35)]">
        {failed ? (
          <div className="grid aspect-[3/4] place-items-center bg-gradient-to-br from-[#eceef5] to-[#e4e0ef]">
            <span className="font-display text-6xl font-semibold tracking-[-.05em] text-[#151a35]/15">{initials}</span>
          </div>
        ) : (
          <img
            src={founder.photo}
            alt={`${founder.name}, ${founder.role.toLowerCase()} at Innovick `}
            width="720" height="960"
            onError={() => setFailed(true)}
            className="aspect-[3/4] h-full w-full object-cover"
          />
        )}
      </div>

      {/* Name plate — same frosted-glass treatment as the founder section. */}
      <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/60 bg-white/85 px-6 py-4 shadow-[0_18px_40px_-18px_rgba(21,26,53,.35)] backdrop-blur-xl backdrop-saturate-150">
        <p className="font-mono-custom text-[10px] font-bold uppercase tracking-[.16em] text-[#7a8199]">{founder.role}</p>
        <p className="mt-1.5 font-display text-[19px] font-semibold tracking-[-.035em] text-[#151a35]">{founder.name}</p>
      </div>
    </div>
  );
}

/** One "why us" card: badge over a B&W photo, copy, bullets, pull-quote. */
function WhyCard({ card }: { card: (typeof whyCards)[number] }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e6e8f0] bg-white soft-shadow">
      <div className="relative shrink-0">
        <img
          src={card.photo}
          alt={card.alt}
          loading="lazy"
          decoding="async"
          className="h-40 w-full object-cover grayscale transition-transform duration-500 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono-custom text-[9px] font-bold uppercase tracking-[.16em] text-[#8e31b5] shadow-sm backdrop-blur-md">
          {card.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[19px] font-semibold tracking-[-.035em] text-[#151a35]">{card.title}</h3>
        <p className="mt-2.5 text-sm leading-7 text-[#5c6178]">{card.description}</p>

        <ul className="mt-4 space-y-2">
          {card.bullets.map(bullet => (
            <li key={bullet} className="flex items-start gap-2.5">
              <CircleCheck size={15} strokeWidth={1.8} className="mt-1 shrink-0 text-[#8e31b5]" />
              <span className="text-[13px] leading-6 text-[#4a4f66]">{bullet}</span>
            </li>
          ))}
        </ul>

        <p className="mt-auto pt-5 text-sm italic leading-6 text-[#7a8199]">“{card.quote}”</p>
      </div>
    </article>
  );
}

/**
 * One roster portrait: grayscale by default, colour + slight scale on hover
 * (desktop), tap/focus (mobile & keyboard) — with the name plate sliding up
 * from behind a dark scrim so it stays legible on any photo.
 */
function TeamMemberCard({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);
  const initials = member.name.split(' ').map(part => part[0]).join('');

  return (
    // Even spacing instead of the old overlap: rows are always full sets of
    // cards (2-up below md, 4-up at md and wider) separated by a real flex
    // gap, and each card's width subtracts its share of that gap so every row
    // lines up flush at both edges and scales smoothly on phones. :focus (tap)
    // as well as :focus-visible (keyboard) trigger the colour reveal.
    <div
      tabIndex={0}
      aria-label={`${member.name}, ${member.role}`}
      className="group relative z-0 w-[calc(50%-.5rem)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#8e31b5]/50 md:w-[calc(25%-1.125rem)]"
    >
      <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#eef0f6] shadow-[0_18px_50px_rgba(21,26,53,.12)] transition-[transform,filter] duration-[400ms] ease-out grayscale group-hover:scale-105 group-hover:grayscale-0 group-focus-visible:scale-105 group-focus-visible:grayscale-0 group-focus:scale-105 group-focus:grayscale-0">
        {failed ? (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#eceef5] to-[#e4e0ef]">
            <span className="font-display text-4xl font-semibold tracking-[-.05em] text-[#151a35]/15">{initials}</span>
          </div>
        ) : (
          <img
            src={member.photo}
            alt={member.name}
            width="600" height="800"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top"
          />
        )}

        {/* Name plate — hidden until hover/tap/focus, sliding up from below. */}
        <figcaption className="absolute inset-x-0 bottom-0 translate-y-4 bg-gradient-to-t from-[#0d1128]/90 via-[#0d1128]/45 to-transparent px-3 pb-4 pt-12 opacity-0 transition-[opacity,transform] duration-[400ms] ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 sm:px-4">
          <p className="font-display text-sm font-semibold leading-tight text-white">{member.name}</p>
          <p className="mt-1 font-mono-custom text-[9px] font-bold uppercase tracking-[.14em] text-white/75">{member.role}</p>
          <p className="mt-1.5 text-[11px] leading-snug text-white/60">{member.oneLiner}</p>
        </figcaption>
      </figure>
    </div>
  );
}

/**
 * The page, assembled. Section rhythm follows the homepage: light → tinted
 * strip → stats → light → dark → tinted → dark CTA.
 */
export function About() {
  return (
    <div className="page-shell">
      <CursorFollower />
      <Navbar />
      <main className="bg-white">
        {/* -------------------------------------------------------------- */}
        {/* 1. Hero                                                         */}
        {/* -------------------------------------------------------------- */}
        <section className="relative isolate bg-white px-5 pb-16 pt-[calc(92px+4rem)] md:pb-20">
          <div className="pointer-events-none absolute -left-32 -top-24 h-[380px] w-[380px] rounded-full bg-[#8e31b5]/10 blur-[130px]" />

          <div className="container-wide relative grid items-center gap-12 lg:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] lg:gap-16">
            <div>
              <Reveal>
                <span className="inline-flex items-center rounded-full border border-[#8e31b5]/25 bg-[#8e31b5]/[.07] px-3.5 py-1 font-mono-custom text-[10px] font-bold uppercase tracking-[.16em] text-[#8e31b5]">
                  About
                </span>

                <h1 className="mt-6 font-display text-[clamp(2.3rem,5vw,4.3rem)] font-semibold leading-[1.04] tracking-[-.05em] text-[#151a35]">
                  Hi! We’re<br />
                  <span className="gradient-text">Innovick.</span>
                </h1>

                <p className="mt-5 max-w-[34rem] text-[17px] leading-8 text-[#5c6178]">
                  We help growing Bangladeshi brands build marketing, design, and web systems that
                  actually compound — not just campaigns that spike and fade.
                </p>

                <blockquote className="mt-7 max-w-[36rem] rounded-2xl bg-[#f5f6fa] px-7 py-6 text-[15px] italic leading-8 text-[#4a4f66] md:text-[16px]">
                  “Built by people who’ve run the ads, built the sites, and shipped the work ourselves.”
                </blockquote>

                <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
                  <Button href="/contact" variant="brand" className="px-7 py-4 text-[15px]">
                    Book a Strategy Call <ArrowRight size={16} />
                  </Button>
                  <Button href="/services" variant="outline" className="px-7 py-4 text-[15px]">
                    Explore Our Work
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Founder portrait — data straight from `data/founder.ts`. */}
            <Reveal delay={0.15} className="mx-auto w-full max-w-[420px] lg:max-w-none">
              <FounderPortrait />
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 2. Trust bar + headline stats                                   */}
        {/* -------------------------------------------------------------- */}
        <section className="border-t border-[#eceef5] bg-[#f8f1fb] py-6 md:py-7">
          <div className="container-wide">
            <p className="mb-4 text-center font-mono-custom text-[10px] font-bold uppercase tracking-[.2em] text-[#9b88a7]">
              Preferred by brands who want results, not noise.
            </p>
            {/* First eight of the shared roster in data/site.ts — /success
                shows all twelve from the same source. */}
            <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 opacity-70 grayscale md:justify-between">
              {clientNames.slice(0, 8).map(name => (
                <span key={name} className="whitespace-nowrap font-display text-xs font-bold tracking-[-.03em] text-[#5c6178]">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Same four count-up numbers as the homepage — reused, not rebuilt. */}
        <Stats />

        {/* -------------------------------------------------------------- */}
        {/* 3. Why brands love working with us                              */}
        {/* -------------------------------------------------------------- */}
        <section className="border-t border-[#eceef5] bg-white py-16 md:py-24">
          <div className="container-wide">
            <SectionHeading
              eyebrow="WHY US"
              lead="Why Brands Love Working With Us"
              blurb="We're not theorists. Every strategy we run has been tested on our own growth first."
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whyCards.map((card, i) => (
                <Reveal key={card.tag} delay={(i % 3) * 0.07}>
                  <WhyCard card={card} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 4. Philosophy — dark quote band                                 */}
        {/* -------------------------------------------------------------- */}
        <section className="relative isolate noise bg-[#0d1128] px-5 py-20 text-center md:py-28">
          <div className="pointer-events-none absolute -right-28 -top-28 h-[400px] w-[400px] rounded-full bg-[#8e31b5]/14 blur-[130px]" />

          <div className="container-wide relative mx-auto max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[.05] px-4 py-2 font-mono-custom text-[10px] font-bold uppercase tracking-[.18em] text-[#c27cdf]">
                Our Philosophy
              </span>

              <p className="mt-8 font-display text-[clamp(2rem,5vw,3.8rem)] font-semibold leading-[1.06] tracking-[-.05em] text-white">
                Marketing is not about guesswork.<br />
                It’s about <span className="gradient-text">systems.</span>
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {philosophyPillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[.04] px-6 py-6 text-left">
                    <p className="font-display text-[16px] font-semibold tracking-[-.02em] text-white">{pillar.title}</p>
                    <p className="mt-2 text-[13px] leading-6 text-white/55">{pillar.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 flex justify-center">
                <Button href="/services" variant="brand">See Our Services</Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 5. Team — B&W-to-colour hover roster                            */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-[#f5f6fa] py-20 md:py-24">
          <div className="container-wide">
            <SectionHeading
              eyebrow="THE PEOPLE BEHIND THE WORK"
              lead="Meet The Team"
              blurb="One team across strategy, design, development, and growth."
            />

            {/* Overlapping lineup: 4 per row from md up, 2 per row below that.
                Hover/tap a portrait and it lifts to colour above its neighbours
                while its name plate slides up. Entrance matches the site's
                Reveal pattern. */}
            {/* Flex-wrap lineup with real gutters: 2-up on phones, 4-up from
                md up. Each card's width is `calc(<per-card> - <gap share>)`,
                matching the gap classes here, so rows fill edge-to-edge with
                even spacing at every breakpoint. */}
            <Reveal delay={0.1}>
              <div className="mt-14 flex flex-wrap items-start justify-center gap-x-4 gap-y-8 md:gap-x-6">
                {teamMembers.map(member => (
                  <TeamMemberCard key={member.name} member={member} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 6. CTA band                                                     */}
        {/* -------------------------------------------------------------- */}
        <section className="relative isolate noise bg-[#0d1128] px-5 py-20 text-center md:py-24">
          <div className="pointer-events-none absolute -right-28 -top-28 h-[400px] w-[400px] rounded-full bg-[#8e31b5]/14 blur-[130px]" />
          <Reveal className="container-wide relative mx-auto max-w-2xl">
            <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-.04em] text-white">
              Ready to Build Your Growth Engine?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-white/50">
              If your marketing feels scattered, let’s fix that. It starts with one conversation.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" variant="brand" className="px-7 py-4 text-[15px]">
                Book a Strategy Call <ArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;