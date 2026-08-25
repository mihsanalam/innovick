import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { headlineStats } from '@/data/proof';

/** One figure, counted up the first time it scrolls into view. */
function Stat({ value, label, prefix = '', suffix = '', decimals = 0 }: { value: number; label: string; prefix?: string; suffix?: string; decimals?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !numberRef.current) return;
    const targetEl = numberRef.current;
    const counter = { val: 0 };

    gsap.to(counter, {
      val: value,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 90%', once: true },
      // toFixed(0) rounds, so whole-number stats need no special casing.
      onUpdate: () => { targetEl.textContent = `${prefix}${counter.val.toFixed(decimals)}${suffix}`; },
      onComplete: () => { targetEl.textContent = `${prefix}${value}${suffix}`; },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="stat-item text-center" data-testid={`stat-${label.toLowerCase().replaceAll(' ', '-')}`}>
      <p ref={numberRef} className="stat-number font-display text-[clamp(2.1rem,5vw,3.5rem)] font-extrabold leading-none tracking-[-.055em] text-[#151a35]">
        {prefix}{value}{suffix}
      </p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[.16em] text-[#7a8199]">{label}</p>
    </div>
  );
}

/** Centred, no dividers, one hairline across the top. */
export function Stats() {
  return (
    <section className="gsap-stats border-t border-[#eceef5] bg-white py-20 md:py-24">
      <div className="container-wide grid grid-cols-2 gap-y-14 md:grid-cols-4 md:gap-y-0">
        {headlineStats.map(stat => (
          <Stat key={stat.label} value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} label={stat.label} />
        ))}
      </div>
    </section>
  );
}

export default Stats;
