import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Reveal } from '@/components/common/Reveal';
import { ServiceArt } from '@/components/visuals/ServiceArt';
import { services } from '@/data/services';
import { serifAccent } from '@/lib/theme';

/** How much of the buried card's top edge peeks out, in px. */
const STACK_OFFSET = 22;
/** Closest the pinned stack ever sits to the viewport top (the header is 92px). */
const MIN_PIN_TOP = 104;

/**
 * Services, dealt out as a stack of full-width cards.
 *
 * Hand-rolled GSAP — no inner scroller, no Lenis. A single ScrollTrigger pins the
 * stage and the *page* scroll scrubs a timeline that slides each card up over the
 * last one. Because the pin uses `pinSpacing`, the scroll picks straight back up
 * on the next section once the sixth card lands: there is nothing to get trapped
 * inside. (The older ScrollStack approach scrolled a nested Lenis element, which
 * is exactly what stuck at the last card.)
 *
 * The cards are written as a plain vertical list in the JSX. `layout()` is what
 * turns them into an overlapping pile, so no-JS and reduced-motion visitors get a
 * readable stack of six cards and nothing else has to change.
 *
 * Card 0 deliberately stays in normal flow — it alone defines the stage height, so
 * nothing has to measure a height back onto the stage. The other five are lifted
 * out with `position: absolute` and offset downward by `STACK_OFFSET` each, which
 * is what leaves the previous card's top edge showing above the incoming one.
 *
 * Tuning: `STACK_OFFSET` above for the peek, and `segment()` below for how much
 * scroll each card costs.
 */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const stage = stageRef.current;
    if (!stage) return;
    // Reduced motion: leave the JSX list exactly as it renders.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = gsap.utils.toArray<HTMLElement>('.services-card', stage);
    if (cards.length < 2) return;

    /** Where the stage parks while pinned. Centred when there's room to centre. */
    let pinTop = MIN_PIN_TOP;

    const layout = () => {
      // Drop back into flow first, so the natural heights stay honest across
      // resizes and font loads rather than compounding a stale measurement.
      cards.forEach(card => {
        card.style.cssText = '';
      });

      // One height for all six, so the pile reads as a pile and no buried card
      // pokes out of the bottom of the one on top of it.
      const cardHeight = Math.max(...cards.map(card => card.offsetHeight));
      const stackHeight = cardHeight + (cards.length - 1) * STACK_OFFSET;

      cards.forEach((card, i) => {
        card.style.height = `${cardHeight}px`;
        card.style.zIndex = String(i + 1);
        // Scale from the top edge, so nudging a buried card never eats its peek.
        card.style.transformOrigin = 'top center';
        if (i === 0) return;
        card.style.position = 'absolute';
        card.style.left = '0';
        card.style.right = '0';
        card.style.top = `${i * STACK_OFFSET}px`;
        // The flow list's gap class still applies once absolute, and would add
        // itself on top of `top` — zero it out or the peek comes out wrong.
        card.style.marginTop = '0';
      });

      pinTop = Math.max(MIN_PIN_TOP, Math.round((window.innerHeight - stackHeight) / 2));
    };

    layout();
    // Re-measure before ScrollTrigger takes its measurements, not after.
    ScrollTrigger.addEventListener('refreshInit', layout);

    /** Scroll distance spent bringing in each card. */
    const segment = () => Math.max(320, Math.round(window.innerHeight * 0.55));

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage,
        start: () => `top ${pinTop}px`,
        end: () => `+=${(cards.length - 1) * segment()}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    cards.forEach((card, i) => {
      if (i === 0) return;
      // Starts with its top edge exactly on the viewport bottom, ends in its slot.
      tl.fromTo(
        card,
        { y: () => window.innerHeight - pinTop - i * STACK_OFFSET },
        { y: 0, duration: 1 },
        i - 1
      );
      // The card being covered settles back a touch — cheap depth.
      tl.to(cards[i - 1], { scale: 0.985, duration: 1 }, i - 1);
    });

    // Every distance here comes from a measured card height, and the display font
    // can swap in after the first refresh — which would leave the pin length stale.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ScrollTrigger.removeEventListener('refreshInit', layout);
      cards.forEach(card => {
        card.style.cssText = '';
      });
    };
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
            The right blend of strategy, craft, and technical muscle to take your brand from
            “we should” to “we did.” Six disciplines — they arrive one at a time.
          </p>
        </Reveal>

        {/*
          The stage. `padding-bottom` reserves room for the lowest card in the
          pile, since the five stacked cards are absolute and contribute no height.
        */}
        <div
          ref={stageRef}
          className="services-stage relative mt-14"
          style={{ paddingBottom: (services.length - 1) * STACK_OFFSET }}
        >
          {services.map((service, i) => {
            const words = service.title.split(' ');
            const last = words.pop() ?? service.title;
            const lead = words.join(' ');

            return (
              <article
                key={service.title}
                className="services-card flex items-center rounded-[2.25rem] border border-[#e6e8f0] bg-white p-7 shadow-[0_40px_90px_-40px_rgba(21,26,53,.3)] md:p-11 [&:not(:first-child)]:mt-6"
                data-testid={`card-service-${i}`}
              >
                <div className="grid w-full items-center gap-9 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,.88fr)] lg:gap-14">
                  <div>
                    <span className="font-mono-custom text-[11px] font-bold tracking-[.16em] text-[#a6abbd]">
                      {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                    </span>

                    <h3 className="mt-4 font-display text-[clamp(2rem,4.2vw,3.35rem)] font-extrabold leading-[1] tracking-[-.055em] text-[#151a35]">
                      {lead && <>{lead} </>}
                      <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>
                        {last}
                      </span>
                    </h3>

                    <p className="mt-5 max-w-[46ch] text-[16px] leading-8 text-[#5c6178]">{service.desc}</p>

                    <div className="mt-7 flex flex-wrap gap-2.5">
                      {service.tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#dfe2ec] bg-white px-4 py-2 text-[13px] font-semibold text-[#4a5068]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* One link, drawn as the reference's pill + circle pair. */}
                    <a
                      href="#contact"
                      className="group mt-9 inline-flex items-center gap-2.5"
                      data-testid={`link-service-${i}`}
                    >
                      <span className="rounded-full bg-[#151a35] px-6 py-3.5 text-sm font-bold text-white transition-colors duration-300 group-hover:bg-[#8e31b5]">
                        Know More
                      </span>
                      <span
                        aria-hidden="true"
                        className="grid h-[46px] w-[46px] place-items-center rounded-full bg-[#151a35] text-white transition-all duration-300 group-hover:bg-[#8e31b5]"
                      >
                        <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  </div>

                  {/* Art column. Hidden below `lg` — a phone-width card is tall
                      enough already, and the text is what has to be readable. */}
                  <div className="hidden lg:block">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="aspect-[5/4] w-full rounded-[1.6rem] object-cover"
                      />
                    ) : (
                      <ServiceArt icon={service.icon} />
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <Reveal>
          <a
            href="#contact"
            className="mx-auto mt-14 flex w-fit items-center gap-2 rounded-full border border-[#cfabdb] bg-white px-5 py-3 text-sm font-bold text-[#8e31b5] transition hover:border-[#8e31b5] hover:bg-[#faf4fc]"
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
