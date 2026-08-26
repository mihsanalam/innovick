import {
  ArrowRight,
  LayoutDashboard,
  TrendingUp,
  Unlock,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CursorFollower } from '@/components/common/CursorFollower';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/common/Button';
import { serviceBySlug } from '@/data/services';

/**
 * /services — the index/overview. Deliberately a short, scannable directory:
 * pricing anchors, one guidance note, what's always included, three FAQs, and
 * one CTA. The selling happens on the individual service detail pages.
 */

/** Card copy + pricing, keyed to the services in `src/data/services.ts`. */
const offerings: { slug: string; oneLiner: string; price: string }[] = [
  {
    slug: 'strategic-marketing',
    oneLiner: 'Paid ad campaigns across Meta & Google built for ROI, not just reach.',
    price: '৳25,000/month + ad spend',
  },
  {
    slug: 'creative-design',
    oneLiner: 'Branding, ad creatives, and content design that stops the scroll.',
    price: '৳20,000/month',
  },
  {
    slug: 'social-media-management',
    oneLiner: 'Full-service content, posting, and community management.',
    price: '৳20,000/month',
  },
  {
    slug: 'web-development',
    oneLiner: 'Fast, conversion-focused websites built in React/Next.js.',
    price: '৳40,000/project',
  },
  {
    slug: 'seo',
    oneLiner: 'Technical and content SEO that compounds your organic traffic.',
    price: '৳20,000/month',
  },
  {
    slug: 'automation-services',
    oneLiner: 'CRM, lead capture, and follow-up automation that runs itself.',
    price: '৳30,000/project',
  },
];

/** What every engagement includes, regardless of which services are picked. */
const includes: { icon: LucideIcon; text: string }[] = [
  { icon: TrendingUp, text: 'Weekly reporting, not vague monthly PDFs' },
  { icon: UserCheck, text: 'A dedicated point of contact, not a rotating support queue' },
  { icon: LayoutDashboard, text: 'Real dashboards you can check anytime' },
  { icon: Unlock, text: 'No lock-in beyond a 1-month minimum' },
];

const faqs: { q: string; a: string }[] = [
  {
    q: 'Can I combine multiple services?',
    a: 'Yes — most clients start with one and add others as their marketing engine grows.',
  },
  {
    q: 'Do you require long-term contracts?',
    a: 'No. Most engagements run month-to-month after an initial 1-month setup period.',
  },
  {
    q: 'How fast can we start?',
    a: 'Most engagements kick off within a week of your strategy call.',
  },
];

export function Services() {
  return (
    <div className="page-shell">
      <CursorFollower />
      <Navbar />
      <main className="bg-white">
        {/* -------------------------------------------------------------- */}
        {/* Header                                                          */}
        {/* -------------------------------------------------------------- */}
        <section className="relative isolate bg-white px-5 pb-14 pt-[calc(92px+4rem)] md:pb-16">
          <Reveal className="container-wide mx-auto max-w-3xl text-center">
            <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#8e31b5]">
              SERVICES
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.3rem,5vw,4.2rem)] font-semibold leading-[1.04] tracking-[-.05em] text-[#151a35]">
              What We Do
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-8 text-[#5c6178]">
              Six services. One team. Everything your brand needs to grow,
              in-house.
            </p>
          </Reveal>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Services grid                                                   */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-white pb-16 md:pb-20">
          <div className="container-wide grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((offering, i) => {
              const service = serviceBySlug(offering.slug)!;
              return (
                <Reveal key={offering.slug} delay={(i % 3) * 0.08}>
                  <a
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-[#e6e8f0] bg-white p-7 soft-shadow transition-transform duration-300 hover:-translate-y-1.5"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[#8e31b5]/10 text-[#8e31b5]">
                      <service.icon size={20} strokeWidth={1.8} />
                    </span>
                    <h2 className="mt-5 font-display text-lg font-semibold tracking-[-.02em] text-[#151a35]">
                      {service.short ?? service.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-7 text-[#5c6178]">
                      {offering.oneLiner}
                    </p>

                    {/* Price anchor — small caps label, bold figure. */}
                    <div className="mt-5 border-t border-[#eceef5] pt-4">
                      <span className="block font-mono-custom text-[9px] font-bold uppercase tracking-[.18em] text-[#7a8199]">
                        Starting at
                      </span>
                      <span className="mt-1 block font-display text-[15px] font-semibold text-[#151a35]">
                        {offering.price}
                      </span>
                    </div>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#8e31b5] transition-colors group-hover:text-[#151a35]">
                      Explore
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Which one do you need?                                          */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-white pb-16 md:pb-20">
          <Reveal className="container-wide max-w-2xl">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-[-.03em] text-[#151a35]">
              Not sure where to start?
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-[#5c6178]">
              Most brands start with{' '}
              <span className="font-semibold text-[#151a35]">Strategic Marketing</span>{' '}
              if they need customers now, or{' '}
              <span className="font-semibold text-[#151a35]">Web Development</span>{' '}
              if their site can't convert the traffic marketing sends it. Those
              two are the engine — everything else attaches to them. Creative
              Design, Social Media, SEO, and Automation are usually added once
              that core is running; on their own they tend to spend budget with
              nowhere to send it.
            </p>
          </Reveal>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* What every engagement includes                                  */}
        {/* -------------------------------------------------------------- */}
        <section style={{ backgroundColor: '#f5f6fa' }}>
          <div className="container-wide py-16 md:py-20">
            <Reveal>
              <h2 className="max-w-xl font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-[-.03em] text-[#151a35]">
                What every engagement includes
              </h2>
            </Reveal>
            <div className="mt-9 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {includes.map(({ icon: Icon, text }, i) => (
                <Reveal key={text} delay={i * 0.06}>
                  <div className="flex items-center gap-3.5 rounded-2xl border border-[#e6e8f0] bg-white px-5 py-4 soft-shadow">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#8e31b5]/10 text-[#8e31b5]">
                      <Icon size={17} strokeWidth={1.9} />
                    </span>
                    <p className="text-sm font-medium leading-6 text-[#151a35]">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Compact FAQ                                                     */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-white py-16 md:py-20">
          <Reveal className="container-wide max-w-2xl">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-[-.03em] text-[#151a35]">
              Quick questions
            </h2>
            <dl className="mt-6 divide-y divide-[#eceef5] border-t border-[#eceef5]">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-5">
                  <dt className="text-[15px] font-semibold text-[#151a35]">{q}</dt>
                  <dd className="mt-1.5 text-sm leading-7 text-[#5c6178]">{a}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* CTA band                                                        */}
        {/* -------------------------------------------------------------- */}
        <section className="relative isolate noise bg-[#0d1128] px-5 py-20 text-center md:py-24">
          <div className="pointer-events-none absolute -right-28 -top-28 h-[400px] w-[400px] rounded-full bg-[#8e31b5]/14 blur-[130px]" />
          <Reveal className="container-wide relative mx-auto max-w-2xl">
            <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-.04em] text-white">
              Ready to find the right fit?
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

export default Services;

