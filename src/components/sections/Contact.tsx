import { ArrowRight, Globe2, Mail, MessageCircle, Phone } from 'lucide-react';
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
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0d1128] text-white">
      <div className="pointer-events-none absolute -left-28 -top-28 h-[400px] w-[400px] rounded-full bg-[#8e31b5]/14 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.04]" style={darkGrid} />

      <div className="container-wide relative grid gap-12 py-20 md:grid-cols-[1.15fr_.85fr] md:gap-16 md:py-24">
        <Reveal>
          <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-white/40">NEXT STEP</span>
          <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4.2vw,3.3rem)] font-extrabold leading-[1.04] tracking-[-.06em] text-white">
            Tell us what isn’t working.{' '}
            <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>
              We’ll tell you what we’d do about it.
            </span>
          </h2>
          <p className="mt-5 max-w-md leading-8 text-white/50">
            One call, forty-five minutes, and a written plan you keep whether or not you hire us.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={`mailto:${contact.email}`} variant="white">
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

        <Reveal delay={0.1} className="grid content-center gap-3">
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
              <a
                key={row.label}
                href={row.href}
                className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[.03] p-4 transition hover:border-white/20 hover:bg-white/[.06]"
                data-testid={`link-contact-${row.label.toLowerCase()}`}
              >
                {body}
              </a>
            ) : (
              <div key={row.label} className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[.03] p-4">
                {body}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;
