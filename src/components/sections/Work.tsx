import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { Reveal } from '@/components/common/Reveal';
import { BrowserMock } from '@/components/visuals/BrowserMock';
import { projects } from '@/data/projects';
import { serifAccent } from '@/lib/theme';

/**
 * Each card is its own sticky element with a slightly lower offset than the one
 * before it, so scrolling deals them into a pile instead of moving the page past
 * them. The GSAP tween only shrinks and dims a card once the next one starts
 * covering it — the last card is never covered, so it is skipped.
 */
export function Work() {
  const stackRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.stack-inner').forEach((card, i) => {
      if (i === projects.length - 1) return;
      gsap.to(card, {
        scale: 0.94, opacity: 0.35, ease: 'none',
        scrollTrigger: { trigger: card, start: 'bottom 84%', end: 'bottom 26%', scrub: 0.5 },
      });
    });
  }, { scope: stackRef });

  return (
    <section ref={stackRef} id="work" className="bg-[#f5f6fa] py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#8e31b5]">DELIVERED WORK</span>
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.2rem,5.2vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-.07em] text-[#151a35]">
            A track record of results,<br />
            <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>delivered.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#5c6178]">
            Four brands who handed us the messy middle and left with numbers worth repeating.
            Keep scrolling — the cards move, the page holds still.
          </p>
        </Reveal>

        <div className="mt-14">
          {projects.map((project, i) => {
            const Icon = project.icon;
            const [lead, ...rest] = project.name.split(' ');
            return (
              <div key={project.name} className="stack-card sticky mb-6" style={{ top: `${96 + i * 18}px` }}>
                <article className="stack-inner overflow-hidden rounded-[2rem] border border-[#e6e8f0] bg-white p-7 shadow-[0_30px_70px_-30px_rgba(21,26,53,.3)] md:p-10" data-testid={`card-project-${i}`}>
                  <div className="grid items-center gap-9 md:grid-cols-[1.05fr_.95fr] md:gap-12">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono-custom text-[11px] font-bold tracking-[.14em] text-[#a6abbd]">0{i + 1}</span>
                        <span className="h-px w-8 bg-[#d8dbe6]" />
                        <span className="font-mono-custom text-[11px] font-bold tracking-[.14em] text-[#151a35]">{project.category.toUpperCase()}</span>
                      </div>
                      <h3 className="mt-5 font-display text-4xl font-extrabold tracking-[-.055em] text-[#151a35] md:text-5xl">
                        {lead}{' '}
                        <span className="font-normal italic tracking-[-.01em]" style={{ fontFamily: serifAccent }}>{rest.join(' ')}</span>
                      </h3>
                      <p className="mt-4 max-w-md leading-7 text-[#5c6178]">{project.blurb}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="rounded-full border border-[#d8dbe6] px-3.5 py-1.5 text-xs font-semibold text-[#3a4055]">{tag}</span>
                        ))}
                      </div>
                      <div className="mt-8 flex items-center gap-2.5">
                        <a href="#contact" className="inline-flex items-center rounded-full bg-[#151a35] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#232a4d]" data-testid={`link-project-${i}`}>
                          Know More
                        </a>
                        <a
                          href="#contact"
                          aria-label={`Open the ${project.name} case study`}
                          className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#151a35] text-white transition hover:bg-[#232a4d]"
                        >
                          <ArrowUpRight size={17} />
                        </a>
                      </div>
                    </div>
                    <div>
                      <BrowserMock project={project.name} bg={project.bg} icon={Icon} />
                      <p className="mt-5 flex items-center gap-2 font-display text-lg font-extrabold tracking-[-.03em] text-[#151a35]">
                        <Icon size={17} className="text-[#8e31b5]" /> {project.result}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Work;
