import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Reveal } from '@/components/common/Reveal';
import { teamPills, teamImage } from '@/data/team';
import { darkGrid, serifAccent } from '@/lib/theme';

/**
 * The team, as one wide shot rather than a grid of headshots.
 *
 * Dark band. The photo sits in a single cinematic frame with printer's crop
 * marks in the corners, a mono location chip, and a frosted caption plate that
 * echoes the founder name plate — an editorial "contact sheet" treatment rather
 * than the usual gallery. The image drifts on a scrubbed parallax as the section
 * passes; the frame clips it, so the movement never shows an edge.
 */
export function Team() {
  const teamRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.team-parallax',
      { yPercent: -8 },
      {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: '.team-frame', start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  }, { scope: teamRef });

  return (
    <section
      ref={teamRef}
      id="team"
      className="relative overflow-hidden bg-[#0d1128] py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-[#8e31b5]/16 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.045]" style={darkGrid} />

      <div className="container-wide relative">
        {/* Asymmetric header: heading left, blurb bottom-aligned to its right. */}
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[1.15fr_.85fr] md:items-end">
            <div>
              <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#c27cdf]">INSIDE INNOVICK</span>
              <h2 className="mt-5 font-display text-[clamp(2.2rem,5.2vw,4.2rem)] font-extrabold leading-[.98] tracking-[-.07em] text-white">
                The team behind<br />
                <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>the work.</span>
              </h2>
            </div>
            <p className="max-w-md text-[16px] leading-8 text-white/55 md:pb-2">
              One team across marketing, design, and development — close enough to move quickly,
              experienced enough to know what matters.
            </p>
          </div>
        </Reveal>

        {/* The wide shot, framed. */}
        <Reveal delay={0.1}>
          <figure className="team-frame relative mt-14 h-[440px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_50px_130px_-50px_rgba(0,0,0,.85)] md:h-[600px]">
            {/* Oversized wrapper so the parallax drift never reveals an edge. */}
            <div className="team-parallax absolute inset-x-0 -top-[12%] h-[124%] will-change-transform">
              <img
                src={teamImage.src}
                alt={teamImage.alt}
                width="2000" height="1120" loading="lazy" decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Scrim — anchors the caption and blends the base into the section. */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1128] via-[#0d1128]/15 to-[#0d1128]/45" />

            {/* Crop marks — the editorial tell. */}
            <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4 h-6 w-6 rounded-tl-md border-l-2 border-t-2 border-white/25 md:left-6 md:top-6" />
            <span aria-hidden="true" className="pointer-events-none absolute right-4 top-4 h-6 w-6 rounded-tr-md border-r-2 border-t-2 border-white/25 md:right-6 md:top-6" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 rounded-bl-md border-b-2 border-l-2 border-white/25 md:bottom-6 md:left-6" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 rounded-br-md border-b-2 border-r-2 border-white/25 md:bottom-6 md:right-6" />

            {/* Location chip, top-right. */}
            <span className="absolute right-8 top-8 rounded-full border border-white/15 bg-[#0d1128]/60 px-3.5 py-1.5 font-mono-custom text-[10px] font-bold tracking-[.16em] text-white/70 backdrop-blur-md md:right-10 md:top-10">
              {teamImage.location}
            </span>

            {/* Caption plate, bottom-left — mirrors the founder name plate. */}
            <figcaption className="absolute inset-x-8 bottom-8 max-w-md rounded-2xl border border-white/15 bg-[#0d1128]/70 px-6 py-4 backdrop-blur-xl backdrop-saturate-150 md:inset-x-10 md:bottom-10">
              <p className="font-mono-custom text-[10px] font-bold uppercase tracking-[.18em] text-[#c27cdf]">{teamImage.kicker}</p>
              <p className="mt-1.5 font-display text-[20px] font-extrabold leading-tight tracking-[-.04em] text-white md:text-[24px]">
                {teamImage.caption}
              </p>
            </figcaption>
          </figure>
        </Reveal>

        {/* Culture tags. */}
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-2">
            {teamPills.map(pill => (
              <span key={pill} className="rounded-full border border-white/12 bg-white/[.04] px-4 py-2 text-xs font-semibold text-white/60">
                {pill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Team;
