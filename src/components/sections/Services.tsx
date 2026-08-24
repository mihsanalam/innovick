import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { Reveal } from '@/components/common/Reveal';
import { services } from '@/data/services';
import { serifAccent } from '@/lib/theme';

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const grid = sectionRef.current?.querySelector('.services-grid') as HTMLElement | null;
    if (grid) gsap.set(grid, { perspective: 900 });

    // Cards swing in from their own side of the grid as you scroll through it.
    gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, i) => {
      const isLeft = i % 2 === 0;
      gsap.fromTo(card,
        { x: isLeft ? -120 : 120, rotationY: isLeft ? -14 : 14, opacity: 0, transformOrigin: 'center center' },
        { x: 0, rotationY: 0, opacity: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 42%', scrub: 1.2 } }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="services" className="bg-[#f5f6fa] py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="inline-flex -rotate-2 rounded-md border border-dashed border-[#a85bc5] px-3 py-1 font-mono-custom text-[10px] font-bold text-[#8e31b5]">
            NEW / LET'S GROW
          </span>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.4rem)] font-extrabold tracking-[-.065em] text-[#151a35]">
            Our <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>Services.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#5c6178]">
            The right blend of strategy, craft, and technical muscle to take your brand from “we should” to “we did.”
          </p>
        </Reveal>

        <div className="services-grid mt-14 grid gap-4 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="service-card group rounded-3xl border border-[#e6e8f0] bg-white p-7 soft-shadow" data-testid={`card-service-${i}`}>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0dff6] text-[#8e31b5] transition-colors group-hover:bg-[#8e31b5] group-hover:text-white">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <span className="font-mono-custom text-xs text-[#a6abbd]">0{i + 1}</span>
                </div>
                <h3 className="mt-7 font-display text-2xl font-extrabold tracking-[-.04em] text-[#151a35]">{service.title}</h3>
                <p className="mt-3 max-w-md leading-7 text-[#5c6178]">{service.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-[#f7f1fa] px-3 py-1 text-xs font-semibold text-[#8e31b5]">{tag}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <Reveal>
          <a
            href="#contact"
            className="mx-auto mt-12 flex w-fit items-center gap-2 rounded-full border border-[#cfabdb] bg-white px-5 py-3 text-sm font-bold text-[#8e31b5] transition hover:border-[#8e31b5] hover:bg-[#faf4fc]"
            data-testid="link-schedule-call"
          >
            Want to discuss? Let's Schedule a Call <ArrowRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default Services;
