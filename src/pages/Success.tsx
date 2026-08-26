import {
  ArrowRight,
  CalendarCheck2,
  Gauge,
  Layers3,
  Repeat,
  Target,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CursorFollower } from '@/components/common/CursorFollower';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/common/Button';
import { StarRating } from '@/components/common/StarRating';
import { VideoReviewCard } from '@/components/common/VideoReviewCard';
import { Stat } from '@/components/sections/Stats';
import { clientNames } from '@/data/site';
import { successStats } from '@/data/proof';
import { videoReviews, writtenTestimonials } from '@/data/reviews';
import { darkGrid } from '@/lib/theme';

/**
 * /success — the proof page. Real clients, real numbers: an outcome stat row,
 * a curated client-logo band, the full video-testimonial grid, nine written
 * quotes, what working together typically changes, and one CTA.
 *
 * Everything reusable comes from shared sources — stats count up through the
 * homepage's `Stat`, video cards are the exact component the homepage teaser
 * uses, and both logo lists pull from `data/site.ts` so About and this page
 * can never drift apart. Copy unique to this page lives here only.
 */

/** Section 5 — outcomes clients typically see, mapped to Innovick's services. */
const resultCards: { icon: LucideIcon; label: string; text: string }[] = [
  { icon: TrendingUp, label: 'Higher ROAS', text: 'Ad spend that actually converts, not just impressions.' },
  { icon: Target, label: 'Lower Cost Per Lead', text: 'Smarter targeting means cheaper, better-qualified leads.' },
  { icon: Gauge, label: 'Faster, Higher-Converting Websites', text: 'Sites built to turn visitors into customers, not just look good.' },
  { icon: Repeat, label: 'Predictable Lead Pipeline', text: 'A steady flow of leads instead of feast-or-famine months.' },
  { icon: CalendarCheck2, label: 'Consistent Content Output', text: 'No more inconsistent posting or last-minute scrambling.' },
  { icon: Layers3, label: 'Systems That Scale', text: 'Automation and processes that keep working as you grow.' },
];

export function Success() {
  return (
    <div className="page-shell">
      <CursorFollower />
      <Navbar />
      <main className="bg-white">
        {/* -------------------------------------------------------------- */}
        {/* 1. Header — claim + inline count-up stats                       */}
        {/* -------------------------------------------------------------- */}
        <section className="relative isolate bg-white px-5 pb-16 pt-[calc(92px+4rem)] md:pb-20">
          <div className="pointer-events-none absolute -left-32 -top-24 h-[380px] w-[380px] rounded-full bg-[#8e31b5]/10 blur-[130px]" />

          <div className="container-wide relative mx-auto max-w-4xl text-center">
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-[#8e31b5]/25 bg-[#8e31b5]/[.07] px-3.5 py-1 font-mono-custom text-[10px] font-bold uppercase tracking-[.16em] text-[#8e31b5]">
                Client Results
              </span>

              <h1 className="mt-6 font-display text-[clamp(2.3rem,5vw,4.3rem)] font-semibold leading-[1.04] tracking-[-.05em] text-[#151a35]">
                Real Clients. <span className="gradient-text">Real Growth.</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-8 text-[#5c6178]">
                See how growing Bangladeshi brands turned scattered marketing into
                predictable, measurable results.
              </p>
            </Reveal>

            {/* Same count-up figures as the homepage band — reuse, not rebuild. */}
            <Reveal delay={0.12}>
              <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
                {successStats.map(stat => (
                  <Stat key={stat.label} value={stat.value} suffix={stat.suffix} decimals={stat.decimals} label={stat.label} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 2. Trusted by Growing Brands — curated, not a wall              */}
        {/* -------------------------------------------------------------- */}
        <section className="border-t border-[#eceef5] bg-[#f8f1fb] py-14 md:py-16">
          <div className="container-wide">
            <Reveal>
              <p className="text-center font-mono-custom text-[10px] font-bold uppercase tracking-[.2em] text-[#9b88a7]">
                Trusted By Growing Brands
              </p>

              {/* Exactly twelve wordmarks, generously spaced — selective and
                  premium rather than exhaustive. Grayscale at rest. */}
              <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-5 md:gap-x-16">
                {clientNames.map(name => (
                  <span
                    key={name}
                    className="whitespace-nowrap font-display text-lg font-bold tracking-[-.03em] text-[#151a35]/35 transition-colors duration-300 hover:text-[#8e31b5] md:text-xl"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 3. Hear From Our Clients — full video grid                      */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-white py-20 md:py-24">
          <div className="container-wide">
            <Reveal className="text-center [&>span]:inline-flex">
              <span className="justify-center font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#8e31b5]">TESTIMONIALS</span>
              <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.04] tracking-[-.055em] text-[#151a35]">
                Hear From Our Clients
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[17px] leading-8 text-[#5c6178]">
                Watch how brands describe working with us, in their own words.
              </p>
            </Reveal>

            {/* The same card the homepage teaser renders — big and clean:
                1-across on phones, 2-across from small tablets up. The grid
                spans the full container so the cards use all the width. */}
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
              {videoReviews.map((item, i) => (
                <Reveal key={item.name} delay={(i % 2) * 0.07}>
                  <VideoReviewCard review={item} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 4. What Clients Are Saying — written testimonials               */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-[#f5f6fa] py-20 md:py-24">
          <div className="container-wide">
            <Reveal className="text-center [&>span]:inline-flex">
              <span className="justify-center font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#8e31b5]">IN THEIR WORDS</span>
              <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.04] tracking-[-.055em] text-[#151a35]">
                What Clients Are Saying
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[17px] leading-8 text-[#5c6178]">
                Direct feedback from founders and marketing leads we've worked with.
              </p>
            </Reveal>

            {/* 3 columns on desktop, one stack on mobile. Avatar is the same
                initials-block pattern the About roster falls back to. */}
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {writtenTestimonials.map((t, i) => (
                <Reveal key={t.name} delay={(i % 3) * 0.07}>
                  <figure className="flex h-full flex-col rounded-2xl border border-[#e6e8f0] bg-white p-6 soft-shadow">
                    <StarRating rating={t.rating} />

                    <blockquote className="mt-4 flex-1 text-sm leading-7 text-[#4a4f66]">
                      “{t.quote}”
                    </blockquote>

                    <figcaption className="mt-6 flex items-center gap-3 border-t border-[#eceef5] pt-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #8e31b5, #b565d6)' }}>
                        {t.name.split(' ').map(part => part[0]).join('')}
                      </span>
                      <span>
                        <span className="block font-display text-[15px] font-semibold tracking-[-.02em] text-[#151a35]">{t.name}</span>
                        <span className="block text-xs text-[#7a8199]">{t.role}, {t.company}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 5. Common Results — dark band                                   */}
        {/* -------------------------------------------------------------- */}
        <section className="relative isolate noise bg-[#0d1128] py-20 text-white md:py-28">
          <div className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-[#8e31b5]/16 blur-[130px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[.045]" style={darkGrid} />

          <div className="container-wide relative">
            <Reveal className="text-center [&>span]:inline-flex">
              <span className="justify-center rounded-full border border-white/15 bg-white/[.05] px-4 py-2 font-mono-custom text-[10px] font-bold uppercase tracking-[.18em] text-[#c27cdf]">
                What To Expect
              </span>
              <h2 className="mx-auto mt-8 max-w-2xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-.05em] text-white">
                Common Results After We Get Started
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {resultCards.map(({ icon: Icon, label, text }, i) => (
                <Reveal key={label} delay={(i % 3) * 0.08}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[.04] px-6 py-6 transition-colors duration-300 hover:border-white/25">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#8e31b5]/25 text-[#c27cdf]">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="block font-display text-[16px] font-semibold tracking-[-.02em] text-white">{label}</span>
                      <span className="mt-1.5 block text-[13px] leading-6 text-white/55">{text}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 6. Final CTA                                                    */}
        {/* -------------------------------------------------------------- */}
        <section className="relative isolate noise border-t border-white/[.06] bg-[#0d1128] px-5 py-20 text-center md:py-24">
          <div className="pointer-events-none absolute -right-28 -top-28 h-[400px] w-[400px] rounded-full bg-[#8e31b5]/14 blur-[130px]" />
          <Reveal className="container-wide relative mx-auto max-w-2xl">
            <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-.04em] text-white">
              Ready to Get Results Like These?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-white/50">
              Let's talk about what's actually holding your growth back.
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

export default Success;