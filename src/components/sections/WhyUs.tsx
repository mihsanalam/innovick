import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/common/Reveal';
import { comparisonRows } from '@/data/proof';
import { darkGrid, serifAccent } from '@/lib/theme';

export function WhyUs() {
  const whyRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Each row wipes in from the left, one after another.
    gsap.utils.toArray<HTMLElement>('.comparison-row').forEach((row, i) => {
      gsap.fromTo(row,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
        {
          clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'clipPath,opacity',
          scrollTrigger: { trigger: row, start: 'top 82%', toggleActions: 'play none none none' },
          delay: i * 0.1,
        }
      );
    });
  }, { scope: whyRef });

  return (
    <section ref={whyRef} id="why-us" className="relative overflow-hidden bg-[#0d1128] py-24 text-white md:py-32">
      <div className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-[#8e31b5]/16 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.045]" style={darkGrid} />

      <div className="container-wide relative">
        <Reveal>
          <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#c27cdf]">THE INNOVICK DIFFERENCE</span>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.2vw,4.2rem)] font-extrabold tracking-[-.07em] text-white">
            What makes us <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>different.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="comparison-table mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[.03]">
            <div className="grid grid-cols-[1fr_1fr] border-b border-white/10 bg-white/[.04] px-5 py-4 text-xs font-bold uppercase tracking-[.14em] text-white/35 md:px-9">
              <span>Others</span>
              <span className="text-[#c27cdf]">Innovick</span>
            </div>
            {comparisonRows.map(([other, us]) => (
              <div key={other} className="comparison-row grid grid-cols-[1fr_1fr] gap-4 border-b border-white/[.07] px-5 py-6 last:border-0 md:px-9">
                <span className="flex items-start gap-3 text-sm text-white/40">
                  <Minus className="mt-0.5 shrink-0 text-white/20" size={16} />
                  {other}
                </span>
                <span className="flex items-start gap-3 text-sm font-bold text-white">
                  <Check className="comparison-check mt-0.5 shrink-0 rounded-full bg-[#4ade80]/15 p-0.5 text-[#6ee7a0]" size={17} />
                  {us}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button variant="white">Book a Strategy Call <ArrowRight size={15} /></Button>
            <span className="text-sm text-white/40">Forty-five minutes. A written plan you keep either way.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default WhyUs;
