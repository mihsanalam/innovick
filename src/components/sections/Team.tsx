import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Reveal } from '@/components/common/Reveal';
import { teamPills, teamShots } from '@/data/team';
import { serifAccent } from '@/lib/theme';

export function Team() {
  const teamRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Each photo drifts at its own rate as the section passes — a gentle parallax.
    const speeds = [-40, -20, -60];
    gsap.utils.toArray<HTMLElement>('.team-photo').forEach((photo, i) => {
      gsap.to(photo, {
        y: speeds[i], ease: 'none',
        scrollTrigger: { trigger: teamRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  }, { scope: teamRef });

  return (
    <section ref={teamRef} id="team" className="bg-white py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#8e31b5]">INSIDE INNOVICK</span>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5.2vw,4.2rem)] font-extrabold tracking-[-.07em] text-[#151a35]">
            The team behind<br />
            <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>the work.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-8 text-[#5c6178]">
            One team across marketing, design, and development — close enough to move quickly,
            experienced enough to know what matters.
          </p>
          <div className="team-pills mt-8 flex max-w-3xl flex-wrap gap-2">
            {teamPills.map(pill => (
              <span key={pill} className="rounded-full border border-[#e6e8f0] bg-[#f8f9fc] px-4 py-2 text-xs font-semibold text-[#5c6178]">
                {pill}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="team-gallery mt-14 grid gap-4 md:grid-cols-[1.1fr_.9fr_.9fr]">
          {teamShots.map((shot, i) => (
            <Reveal key={shot.src} className={i === 0 ? 'h-full' : undefined} delay={0.05 + i * 0.05}>
              <div className="team-photo relative h-80 overflow-hidden rounded-3xl bg-[#151a35] shadow-[0_20px_40px_-10px_rgba(21,26,53,.22)]">
                <img
                  width="1000" height="640" loading="lazy" decoding="async"
                  src={shot.src} alt={shot.alt}
                  className="h-full w-full object-cover opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1128]/80 via-transparent to-transparent" />
                {shot.caption ? (
                  <div className="absolute bottom-6 left-7">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">{shot.kicker}</p>
                    <p className="mt-2 max-w-xs font-display text-2xl font-extrabold leading-tight tracking-[-.06em] text-white">
                      {shot.caption}
                    </p>
                  </div>
                ) : (
                  <span className="absolute bottom-5 left-5 font-mono-custom text-[10px] font-bold tracking-[.12em] text-white/75">
                    {shot.chip}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
