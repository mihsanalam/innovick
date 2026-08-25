import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { CircleCheck } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { Reveal } from '@/components/common/Reveal';
import { founder, founderProof } from '@/data/founder';

const initials = founder.name.split(' ').map(part => part[0]).join('');

/**
 * Portrait frame with the name plate floating over the bottom of the photo.
 *
 * If `public/founder.jpg` isn't there yet the frame falls back to an initials
 * block, so a missing file never leaves a broken-image icon mid-page.
 */
function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="founder-portrait relative">
      <div className="overflow-hidden rounded-[2rem] bg-[#eef0f6] shadow-[0_30px_80px_-30px_rgba(21,26,53,.35)]">
        {failed ? (
          <div className="grid aspect-[3/4] place-items-center bg-gradient-to-br from-[#eceef5] to-[#e4e0ef]">
            <span className="font-display text-6xl font-extrabold tracking-[-.05em] text-[#151a35]/15">{initials}</span>
          </div>
        ) : (
          <img
            src={founder.photo}
            alt={`${founder.name}, ${founder.role.toLowerCase()} at Innovick`}
            width="720" height="960" loading="lazy" decoding="async"
            onError={() => setFailed(true)}
            className="aspect-[3/4] h-full w-full object-cover"
          />
        )}
      </div>

      {/* Name plate — frosted glass so the photo reads through it. */}
      <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/60 bg-white/85 px-6 py-4 shadow-[0_18px_40px_-18px_rgba(21,26,53,.35)] backdrop-blur-xl backdrop-saturate-150">
        <p className="font-mono-custom text-[10px] font-bold uppercase tracking-[.16em] text-[#7a8199]">{founder.role}</p>
        <p className="mt-1.5 font-display text-[19px] font-extrabold tracking-[-.035em] text-[#151a35]">{founder.name}</p>
      </div>
    </div>
  );
}

/** Splits the quote so the emphasised phrase can carry an underline. */
function Quote() {
  const [before, ...rest] = founder.quote.split(founder.quoteEmphasis);
  const after = rest.join(founder.quoteEmphasis);

  return (
    <blockquote className="mt-10 rounded-2xl bg-[#f5f6fa] px-7 py-6 text-[15px] italic leading-8 text-[#4a4f66] md:text-[16px]">
      “{before}
      {rest.length > 0 && (
        <strong className="font-semibold not-italic text-[#151a35] underline decoration-[#151a35]/30 decoration-1 underline-offset-[3px]">
          {founder.quoteEmphasis}
        </strong>
      )}
      {after}”
    </blockquote>
  );
}

export function Founder() {
  const founderRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.founder-portrait',
      { y: 34, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: founderRef.current, start: 'top 78%', toggleActions: 'play none none none' } }
    );
    gsap.fromTo('.founder-proof',
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: '.founder-proof-grid', start: 'top 92%', toggleActions: 'play none none none' } }
    );
  }, { scope: founderRef });

  return (
    <section
      ref={founderRef}
      id="founder"
      className="border-b border-[#eceef5] bg-white py-20 md:py-24"
    >
      <div className="container-wide grid items-center gap-12 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] md:gap-14 lg:gap-20">
        <div className="mx-auto w-full max-w-[440px] md:mx-0">
          <Portrait />
        </div>

        <div>
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-[#fbf1fd] px-4 py-2 font-mono-custom text-[10px] font-bold uppercase tracking-[.18em] text-[#8e31b5]">
              {founder.eyebrow}
            </span>
            <h2 className="mt-7 max-w-[24ch] font-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-extrabold leading-[1.08] tracking-[-.045em] text-[#151a35]">
              {founder.headline}
            </h2>
            <p className="mt-6 max-w-[38rem] text-[17px] leading-8 text-[#7a8199] md:text-[18px]">{founder.blurb}</p>
          </Reveal>

          <div className="founder-proof-grid mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {founderProof.map(item => (
              <div key={item.label} className="founder-proof flex items-center gap-3">
                <CircleCheck size={17} strokeWidth={1.7} className="shrink-0 text-[#8e31b5]" />
                <p className="text-[15px] leading-snug text-[#4a4f66]">
                  <span className="font-bold text-[#151a35]">{item.value}</span> {item.label}
                </p>
              </div>
            ))}
          </div>

          <Reveal delay={0.1}>
            <Quote />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Founder;
