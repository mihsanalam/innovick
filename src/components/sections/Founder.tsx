import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/common/Reveal';
import { founder, founderProof } from '@/data/founder';
import { darkGrid } from '@/lib/theme';

const initials = founder.name.split(' ').map(part => part[0]).join('');

/**
 * Portrait frame. If `public/founder.jpg` isn't there yet the frame falls back
 * to an initials block, so a missing file never leaves a broken-image icon in
 * the middle of the page.
 */
function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#131836] shadow-[0_30px_70px_-20px_rgba(0,0,0,.85)]">
      {failed ? (
        <div className="grid aspect-[4/5] place-items-center bg-gradient-to-br from-[#1a2044] to-[#2a1a3c]">
          <span className="font-display text-5xl font-extrabold tracking-[-.05em] text-white/25">{initials}</span>
        </div>
      ) : (
        <img
          src={founder.photo}
          alt={`${founder.name}, ${founder.role.toLowerCase()} at Innovick`}
          width="720" height="900" loading="lazy" decoding="async"
          onError={() => setFailed(true)}
          className="aspect-[4/5] h-full w-full object-cover"
        />
      )}
    </div>
  );
}

/** Deliberately compact — a credibility block, not a biography. */
export function Founder() {
  const founderRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.founder-portrait',
      { y: 34, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: founderRef.current, start: 'top 78%', toggleActions: 'play none none none' } }
    );
    gsap.fromTo('.founder-proof',
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: '.founder-proof-grid', start: 'top 92%', toggleActions: 'play none none none' } }
    );
  }, { scope: founderRef });

  return (
    <section ref={founderRef} id="founder" className="relative overflow-hidden bg-[#0d1128] py-16 text-white md:py-20">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[360px] w-[360px] rounded-full bg-[#8e31b5]/12 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.04]" style={darkGrid} />

      <div className="container-wide relative grid items-center gap-10 md:grid-cols-[190px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <div className="founder-portrait mx-auto w-full max-w-[240px] md:mx-0">
          <Portrait />
          <p className="mt-4 font-display text-[17px] font-extrabold tracking-[-.03em] text-white">{founder.name}</p>
          <p className="mt-1 font-mono-custom text-[9px] font-bold tracking-[.16em] text-white/35">{founder.role}</p>
        </div>

        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 font-mono-custom text-[10px] font-bold tracking-[.16em] text-white/55">
              <BadgeCheck size={12} className="text-[#c27cdf]" /> MEET THE FOUNDER
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.55rem,3.1vw,2.45rem)] font-extrabold leading-[1.1] tracking-[-.045em] text-white">
              {founder.headline}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/50">{founder.blurb}</p>
          </Reveal>

          <div className="founder-proof-grid mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {founderProof.map(item => (
              <div key={item.label} className="founder-proof border-t border-white/10 pt-3">
                <p className="font-display text-xl font-extrabold tracking-[-.05em] text-white">{item.value}</p>
                <p className="mt-1 text-[12px] leading-snug text-white/40">{item.label}</p>
              </div>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#contact" variant="white">Book a Meeting <ArrowRight size={15} /></Button>
              <a
                href="#work"
                className="text-sm font-bold text-white/50 underline decoration-white/20 underline-offset-4 transition hover:text-white"
                data-testid="link-founder-work"
              >
                Or see the receipts first
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Founder;
