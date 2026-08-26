import { useParams } from 'wouter';
import { AlertCircle, ArrowRight, Check } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CursorFollower } from '@/components/common/CursorFollower';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/common/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { servicePages } from '@/data/servicePages';
import NotFound from '@/pages/not-found';

/**
 * The single dynamic service detail page, rendered for /services/:slug.
 *
 * All copy comes from `src/data/servicePages.ts`; this file only owns
 * structure. Six tight sections: hero → problem → what you get → process →
 * FAQ → CTA. Unknown slugs fall through to the 404 page.
 */
export function ServiceDetail() {
  const { slug } = useParams();
  const page = slug ? servicePages[slug] : undefined;

  if (!page) return <NotFound />;

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

          <div className="container-wide relative max-w-3xl">
            <Reveal>
              {/* Tagline tag */}
              <span className="inline-flex items-center rounded-full border border-[#8e31b5]/25 bg-[#8e31b5]/[.07] px-3.5 py-1 font-mono-custom text-[10px] font-bold uppercase tracking-[.16em] text-[#8e31b5]">
                {page.tagline}
              </span>

              <h1 className="mt-6 max-w-2xl font-display text-[clamp(2.1rem,4.8vw,3.7rem)] font-semibold leading-[1.05] tracking-[-.045em] text-[#151a35]">
                {page.headline}
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#5c6178]">
                {page.subheadline}
              </p>

              {/* Price + duration inline */}
              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
                <div>
                  <span className="block font-mono-custom text-[9px] font-bold uppercase tracking-[.18em] text-[#7a8199]">
                    Starting at
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-[#151a35]">
                    {page.price}
                  </span>
                </div>
                <span aria-hidden="true" className="hidden h-8 w-px bg-[#e6e8f0] sm:block" />
                <div>
                  <span className="block font-mono-custom text-[9px] font-bold uppercase tracking-[.18em] text-[#7a8199]">
                    Timeline
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-[#151a35]">
                    {page.duration}
                  </span>
                </div>
              </div>

              <div className="mt-9">
                <Button href="/contact" variant="brand" className="px-7 py-4 text-[15px]">
                  Book a Strategy Call <ArrowRight size={16} />
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 2. Problem — "Sound Familiar?"                                  */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-white pb-16 md:pb-20">
          <div className="container-wide max-w-4xl">
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-.03em] text-[#151a35]">
                Sound Familiar?
              </h2>
            </Reveal>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {page.painPoints.map((pain, i) => (
                <Reveal key={pain} delay={(i % 2) * 0.06}>
                  <div className="flex h-full items-center gap-3.5 rounded-2xl border border-[#e6e8f0] bg-white px-5 py-4 soft-shadow">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#8e31b5]/10 text-[#8e31b5]">
                      <AlertCircle size={15} strokeWidth={1.9} />
                    </span>
                    <p className="text-sm font-medium leading-6 text-[#151a35]">{pain}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 3. What You Get                                                 */}
        {/* -------------------------------------------------------------- */}
        <section style={{ backgroundColor: '#f5f6fa' }}>
          <div className="container-wide max-w-2xl py-16 md:py-20">
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-.03em] text-[#151a35]">
                What You Get
              </h2>
            </Reveal>
            <ul className="mt-7 divide-y divide-[#e6e8f0]">
              {page.included.map((item, i) => (
                <Reveal key={item} delay={i * 0.05}>
                  <li className="flex items-center gap-3.5 py-4">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#8e31b5] text-white">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <p className="text-[15px] font-medium leading-6 text-[#151a35]">{item}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 4. Process — "How It Works"                                     */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-white py-16 md:py-20">
          <div className="container-wide max-w-4xl">
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-.03em] text-[#151a35]">
                How It Works
              </h2>
            </Reveal>
            <ol className="mt-9 grid gap-8 md:grid-cols-3 md:gap-6">
              {page.process.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <li className="relative">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-full font-display text-sm font-bold text-white shadow-[0_10px_24px_rgba(142,49,181,.28)]"
                      style={{ background: 'linear-gradient(115deg, #8E31B5 0%, #B565D6 100%)' }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold tracking-[-.01em] text-[#151a35]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#5c6178]">{step.desc}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 5. FAQ — "Common Questions"                                     */}
        {/* -------------------------------------------------------------- */}
        <section style={{ backgroundColor: '#f5f6fa' }}>
          <div className="container-wide max-w-2xl py-16 md:py-20">
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-.03em] text-[#151a35]">
                Common Questions
              </h2>
              <Accordion type="single" collapsible className="mt-6 space-y-3">
                {page.faqs.map(({ q, a }) => (
                  <AccordionItem
                    key={q}
                    value={q}
                    className="rounded-2xl border border-[#e6e8f0] bg-white px-5 shadow-none last:border-b"
                  >
                    <AccordionTrigger className="py-4 text-left text-[15px] font-semibold text-[#151a35] hover:no-underline hover:text-[#8e31b5]">
                      {q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-[#5c6178]">
                      {a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
              Ready to get started with {page.name}?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-white/50">
              45 minutes. A written plan you keep either way.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" variant="white" className="px-7 py-4 text-[15px]">
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

export default ServiceDetail;
