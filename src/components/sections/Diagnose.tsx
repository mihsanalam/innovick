import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/common/Reveal';
import { diagnoses } from '@/data/diagnose';
import { darkGrid, serifAccent } from '@/lib/theme';

/**
 * The section that isn't on a thousand other agency sites.
 *
 * Every agency page has "our process". Nobody has *this*: the visitor picks the
 * symptom they actually walked in with, and gets the likely cause, the first
 * three things we'd change, what lands in week one, and the one number we'd be
 * judged on. No invented figures, no fake dashboard — it just answers the
 * question a buyer is already asking.
 */
export function Diagnose() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const current = diagnoses[active];

  useGSAP(() => {
    gsap.fromTo('.diagnose-symptom',
      { x: -18, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out', clearProps: 'all',
        scrollTrigger: { trigger: '.diagnose-list', start: 'top 82%', toggleActions: 'play none none none' },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="diagnose" className="relative overflow-hidden bg-[#0d1128] py-24 text-white md:py-32">
      <div className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-[#8e31b5]/14 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.045]" style={darkGrid} />

      <div className="container-wide relative">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 font-mono-custom text-[10px] font-bold tracking-[.16em] text-white/55">
            <Stethoscope size={12} className="text-[#c27cdf]" /> THE DIAGNOSIS
          </span>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.1rem,4.8vw,3.9rem)] font-semibold leading-[1.02] tracking-[-.06em] text-white">
            Tell us what’s broken.<br />
            <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>See what we’d do about it.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-8 text-white/50">
            Pick the one that sounds most like your last quarter. This is the same first read
            you’d get on a call — we just put it on the page.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] lg:gap-8">
          {/* The picker */}
          <div className="diagnose-list">
            <p className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-white/30">SELECT A SYMPTOM</p>
            <div className="mt-5 space-y-2">
              {diagnoses.map((item, i) => {
                const open = active === i;
                return (
                  <button
                    key={item.short}
                    onClick={() => setActive(i)}
                    aria-pressed={open}
                    className={`diagnose-symptom group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300 ${
                      open ? 'border-white/25 bg-white/[.08]' : 'border-white/8 bg-white/[.025] hover:border-white/16 hover:bg-white/[.05]'
                    }`}
                    data-testid={`button-diagnose-${i}`}
                  >
                    <span className={`font-mono-custom text-[11px] font-bold tabular-nums transition-colors ${open ? 'text-[#c27cdf]' : 'text-white/25'}`}>
                      0{i + 1}
                    </span>
                    <span className={`flex-1 text-[15px] font-semibold leading-snug transition-colors ${open ? 'text-white' : 'text-white/55'}`}>
                      “{item.symptom}”
                    </span>
                    <ArrowRight
                      size={15}
                      className={`shrink-0 transition-all duration-300 ${open ? 'translate-x-0 text-[#c27cdf] opacity-100' : '-translate-x-1 text-white/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* The read-out */}
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[.035] p-7 md:p-9">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <p className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-white/30">
                CASE NOTE · 0{active + 1} / 0{diagnoses.length}
              </p>
              <span className="rounded-full bg-[#c27cdf]/12 px-3 py-1 font-mono-custom text-[9px] font-bold tracking-[.14em] text-[#c27cdf]">
                {current.owner.toUpperCase()}
              </span>
            </div>

            {/* Keyed on `active`, so the whole read-out cross-fades on every pick. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 0.8, 0.25, 1] }}
              >
                <p className="mt-6 font-mono-custom text-[10px] font-bold tracking-[.18em] text-white/30">USUALLY MEANS</p>
                <p className="mt-3 text-[15px] leading-7 text-white/70">{current.cause}</p>

                <p className="mt-8 font-mono-custom text-[10px] font-bold tracking-[.18em] text-white/30">FIRST THREE MOVES</p>
                <ol className="mt-4 space-y-3">
                  {current.moves.map((move, i) => (
                    <li key={move} className="flex gap-3.5">
                      <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 font-mono-custom text-[10px] font-bold text-[#c27cdf]">
                        {i + 1}
                      </span>
                      <span className="text-[15px] leading-6 text-white/80">{move}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-[#0a0d1f] px-5 py-4">
                    <p className="font-mono-custom text-[9px] font-bold tracking-[.14em] text-white/30">IN WEEK ONE</p>
                    <p className="mt-2.5 text-[13px] leading-6 text-white/65">{current.firstWeek}</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-[#0a0d1f] px-5 py-4">
                    <p className="font-mono-custom text-[9px] font-bold tracking-[.14em] text-white/30">WHAT WE’RE JUDGED ON</p>
                    <p className="mt-2.5 text-[13px] leading-6 text-white/65">{current.metric}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-7">
              <Button href="/contact" variant="white">
                Get this on my real number <ArrowRight size={15} />
              </Button>
              <span className="font-mono-custom text-[11px] text-white/30">One call. No deck.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Diagnose;
