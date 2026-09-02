import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Code2, Palette, Rocket, Search, Settings2, Star, Target, TrendingUp, Users, Zap, type LucideIcon } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { SectionHeading } from '@/components/common/SectionHeading';

/**
 * The "momentum" band — a field of brand cards that flow slowly past each
 * other as the section passes.
 *
 * Every card moves on two layers at once:
 *   • an idle bob (each card yoyos up/down at its own speed, amplitude, and
 *     delay, so the field never locks into a mechanical step), and
 *   • a scrubbed parallax (each card drifts at a different rate relative to
 *     the section's travel through the viewport, so they pass each other).
 *
 * GSAP composes `y` (px, the bob) with `yPercent` (the parallax) on the same
 * element, so the layers never fight. Reduced-motion visitors get the static
 * field exactly as the JSX renders it — no animation at all.
 */
type FloatItem = {
  icon: LucideIcon;
  label: string;
  pos: string;
  speed: number;
  bob: number;
  drift: number;
  hideMobile?: boolean;
};

const floats: FloatItem[] = [
  { icon: Target, label: 'Paid Ads', pos: 'left-[4%] top-[2%]', speed: 3.8, bob: 22, drift: 18, hideMobile: true },
  { icon: TrendingUp, label: '+38% ROAS', pos: 'left-[18%] top-[24%]', speed: 3.2, bob: 16, drift: -14 },
  { icon: Rocket, label: 'Ship fast', pos: 'left-[36%] top-[8%]', speed: 4.4, bob: 24, drift: -18, hideMobile: true },
  { icon: Palette, label: 'Brand Design', pos: 'right-[8%] top-[4%]', speed: 4.6, bob: 26, drift: 20 },
  { icon: Code2, label: 'Web & Landing', pos: 'right-[24%] top-[26%]', speed: 3.6, bob: 20, drift: 16, hideMobile: true },
  { icon: Search, label: 'Organic SEO', pos: 'left-[2%] bottom-[14%]', speed: 3.4, bob: 20, drift: -16 },
  { icon: Users, label: 'Community', pos: 'left-[34%] bottom-[6%]', speed: 3.9, bob: 18, drift: 12 },
  { icon: Star, label: '98% happy', pos: 'right-[2%] bottom-[18%]', speed: 4.2, bob: 22, drift: -12, hideMobile: true },
  { icon: Settings2, label: 'Automation', pos: 'right-[30%] bottom-[2%]', speed: 3.5, bob: 24, drift: 14 },
  { icon: Zap, label: '24/7 support', pos: 'right-[8%] top-[42%]', speed: 3.7, bob: 18, drift: 12 },
];

export function Flow() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const field = sectionRef.current?.querySelectorAll<HTMLElement>('[data-float]');
    if (!field) return;

    field.forEach((el, i) => {
      const config = floats[i];
      if (!config) return;

      // Idle bob — each card rides its own rhythm.
      gsap.to(el, {
        y: config.bob,
        duration: config.speed,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.35,
      });

      // Scroll parallax — cards drift past each other as the section passes.
      gsap.fromTo(
        el,
        { yPercent: -config.drift },
        {
          yPercent: config.drift,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-white px-5 py-24 md:py-32">
      {/* Soft purple glows — the same language every light band uses. */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[#8e31b5]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[380px] w-[380px] rounded-full bg-[#c27cdf]/12 blur-[130px]" />

      <div className="container-wide relative">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="IN CONSTANT MOTION"
            lead="Built to move,"
            accent="in one direction."
            breakBefore
            blurb="Strategy, design, and code on the same clock — every part of the engine flowing together, compounding as it goes."
          />
        </div>

        {/* The flowing field — decorative, so it's hidden from screen readers. */}
        <div aria-hidden="true" className="relative mx-auto mt-14 h-[420px] max-w-4xl sm:mt-20 sm:h-[540px]">
          {floats.map(({ icon: Icon, label, pos, hideMobile }) => (
            <div key={label} className={`absolute ${pos} ${hideMobile ? 'hidden sm:block' : ''}`}>
              <div
                data-float
                className="flex select-none items-center gap-3 rounded-2xl border border-[#e6e8f0] bg-white/90 px-4 py-3 shadow-[0_18px_50px_rgba(21,26,53,.1)] backdrop-blur-md will-change-transform"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#8e31b5]/10 text-[#8e31b5]">
                  <Icon size={17} strokeWidth={1.9} />
                </span>
                <span className="whitespace-nowrap text-[13px] font-semibold text-[#151a35]">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Flow;