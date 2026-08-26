import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Globe2, Mail, MessageCircle, Phone } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/common/Reveal';
import { contact } from '@/data/site';
import { darkGrid, serifAccent } from '@/lib/theme';

/**
 * Lifted out of the footer on purpose: every CTA on the page points at
 * `#contact`, and the footer itself is now a single thin sign-off row.
 * Edit the email / phone / WhatsApp values in `src/data/site.ts`.
 */
const contactRows = [
  { icon: Mail, label: 'EMAIL', value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: 'PHONE', value: contact.phoneLabel, href: contact.phoneHref },
  { icon: Globe2, label: 'STUDIO', value: `${contact.location} · serving 12+ countries`, href: '' },
];

export function Contact() {
  const contactRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    /*
      The three rows deal in from the right, and each icon tile pops a beat behind
      its own row — the overshoot on `back.out` is what makes them feel placed
      rather than faded. One timeline, so the two staggers stay locked together.

      Scale and opacity are split into separate tweens on purpose: `back.out`
      overshoots past its end value, which is the point for a scale but sends
      opacity to 1.15. Same duration and position, so they still land together, and
      only the scale tween clears props — whichever finishes first would otherwise
      strip the other's inline style mid-flight.
    */
    gsap.timeline({ scrollTrigger: { trigger: '.contact-rows', start: 'top 82%', once: true } })
      .fromTo('.contact-row',
        { x: 28, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.09, clearProps: 'all' })
      .fromTo('.contact-row-icon',
        { scale: 0.72 },
        { scale: 1, duration: 0.5, ease: 'back.out(2.2)', stagger: 0.09, clearProps: 'all' },
        0.14)
      .fromTo('.contact-row-icon',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.09 },
        0.14);

    /*
      The purple bloom drifts against the scroll. The section is `overflow-hidden`,
      so it can travel freely without widening anything.
    */
    gsap.fromTo('.contact-glow',
      { y: -70 },
      {
        y: 70, ease: 'none',
        scrollTrigger: { trigger: contactRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
  }, { scope: contactRef });

  return (
    <section ref={contactRef} id="contact" className="relative overflow-hidden bg-[#0d1128] text-white">
      <div className="contact-glow pointer-events-none absolute -left-28 -top-28 h-[400px] w-[400px] rounded-full bg-[#8e31b5]/14 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.04]" style={darkGrid} />

      {/*
        `minmax(0,…)` on both tracks, and `min-w-0` on both children. Without them
        the contact rows' min-content (~376px) forced the .85fr track past its share
        and squeezed the heading column down to 273px — the columns came out the
        wrong way round at every width from 768px up, and overflowed the page below
        it. Any column added here needs the same two guards.
      */}
      <div className="container-wide relative grid gap-12 py-20 md:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] md:gap-16 md:py-24">
        <Reveal className="min-w-0">
          <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-white/40">NEXT STEP</span>
          <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4.2vw,3.3rem)] font-semibold leading-[1.04] tracking-[-.06em] text-white">
            Tell us what isn’t working.{' '}
            <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>
              We’ll tell you what we’d do about it.
            </span>
          </h2>
          <p className="mt-5 max-w-md leading-8 text-white/50">
            One call, forty-five minutes, and a written plan you keep whether or not you hire us.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={`mailto:${contact.email}`} variant="brand">
              Book a Strategy Call <ArrowRight size={15} />
            </Button>
            <a
              href={contact.whatsapp}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/65 transition hover:border-white/35 hover:text-white"
              data-testid="link-whatsapp"
            >
              <MessageCircle size={15} /> WhatsApp us
            </a>
          </div>
        </Reveal>

        <div className="contact-rows grid min-w-0 content-center gap-3">
          {contactRows.map(row => {
            const Icon = row.icon;
            const body = (
              <>
                <span className="contact-row-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70">
                  <Icon size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono-custom text-[9px] font-bold tracking-[.16em] text-white/35">{row.label}</span>
                  {/* Wraps rather than truncates: the studio line is longer than a
                      phone-width row, and half an address plus an ellipsis is worse
                      than two short lines. `truncate` here was also what fed the
                      grid blowout above — `nowrap` makes min-content the full
                      string width. */}
                  <span className="mt-1 block break-words text-sm font-semibold text-white/85">{row.value}</span>
                </span>
              </>
            );
            return row.href ? (
              <a
                key={row.label}
                href={row.href}
                className="contact-row flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[.06]"
                data-testid={`link-contact-${row.label.toLowerCase()}`}
              >
                {body}
              </a>
            ) : (
              <div key={row.label} className="contact-row flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[.03] p-4">
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Contact;
