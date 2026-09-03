import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Gauge, Wallet } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/common/Reveal';
import { darkGrid } from '@/lib/theme';

/**
 * Slot-machine digit counter — the digits "spin" to land whenever `value`
 * changes. Exported because the contact page's live preview (C1) reuses it.
 *
 * Each change tweens a plain object and writes `textContent` directly, so a
 * fast slider drag never queues React renders. Reduced motion snaps straight
 * to the value.
 */
const bdt = (n: number) => Math.round(n).toLocaleString('en-US');

export function SlotNumber({ value, className = '' }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = bdt(value);
      shown.current = value;
      return;
    }
    const obj = { v: shown.current };
    const tween = gsap.to(obj, {
      v: value,
      duration: 0.9,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = bdt(obj.v);
        shown.current = obj.v;
      },
    });
    return () => {
      tween.kill();
      shown.current = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {bdt(value)}
    </span>
  );
}

/** Label + live value above a native range slider (accent-coloured via Tailwind). */
function SliderRow({
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="font-mono-custom text-[10px] font-bold uppercase tracking-[.16em] text-white/45">{label}</span>
        <span className="font-display text-lg font-semibold tracking-[-.02em] text-white">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="mt-3 w-full cursor-pointer accent-[#c27cdf]"
        aria-label={label}
      />
    </label>
  );
}

/**
 * S2 · ROI calculator — the "play with it for minutes" moment.
 *
 * Two sliders (monthly ad budget, target ROAS) feed a live revenue estimate
 * rendered through the slot-machine `SlotNumber`. Every touch produces an
 * instant number reward; the CTA converts the play into a lead.
 */
export function RoiCalculator() {
  const [budget, setBudget] = useState(60000);
  const [roas, setRoas] = useState(3.2);
  const revenue = budget * roas;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-wide">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-[#0d1128] p-7 text-white md:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#8e31b5]/20 blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 opacity-[.04]" style={darkGrid} />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-14">
              {/* Left — inputs */}
              <div>
                <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#c27cdf]">
                  ROI CALCULATOR
                </span>
                <h2 className="mt-4 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-.04em]">
                  Drag the sliders. <span className="font-normal italic tracking-[-.02em]">Watch the money move.</span>
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-7 text-white/50">
                  Set a realistic monthly ad budget and the return you'd need — see what Innovick-managed
                  spend could produce every month.
                </p>

                <div className="mt-8 space-y-7">
                  <SliderRow
                    label="Monthly ad budget"
                    display={`৳${bdt(budget)}`}
                    min={20000}
                    max={500000}
                    step={10000}
                    value={budget}
                    onChange={setBudget}
                  />
                  <SliderRow
                    label="Target ROAS"
                    display={`${roas.toFixed(1)}×`}
                    min={1.5}
                    max={6}
                    step={0.1}
                    value={roas}
                    onChange={setRoas}
                  />
                </div>
              </div>

              {/* Right — the live reward */}
              <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[.04] p-7 md:p-9">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[.05] px-3.5 py-1 font-mono-custom text-[10px] font-bold uppercase tracking-[.16em] text-[#c27cdf]">
                  <Gauge size={13} /> Projected monthly revenue
                </span>

                <p
                  className="mt-5 font-display text-[clamp(2.6rem,6vw,4.2rem)] font-semibold leading-none tracking-[-.05em]"
                  style={{
                    background: 'linear-gradient(115deg, #b565d6 0%, #e9d5ff 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  ৳<SlotNumber value={revenue} />
                </p>

                <p className="mt-4 text-sm leading-6 text-white/50">
                  from a ৳{bdt(budget)}/mo spend at {roas.toFixed(1)}× return on ad spend.
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#8e31b5]/25 text-[#c27cdf]">
                    <Wallet size={17} strokeWidth={1.8} />
                  </span>
                  <p className="text-sm leading-6 text-white/65">
                    That's <span className="font-semibold text-white">৳{bdt(revenue - budget)}</span> of gross
                    return above spend — before we optimise a thing.
                  </p>
                </div>

                <div className="mt-7">
                  <Button href="/contact" variant="brand" className="px-6 py-3.5">
                    Turn this into a real plan <ArrowRight size={15} />
                  </Button>
                </div>

                <p className="mt-4 text-[11px] leading-5 text-white/35">
                  Back-of-napkin estimate. Real projections come from your numbers — book the call.
                </p>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default RoiCalculator;
