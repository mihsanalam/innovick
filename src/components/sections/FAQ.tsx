import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Reveal } from '@/components/common/Reveal';
import { faqs } from '@/data/proof';
import { serifAccent } from '@/lib/theme';

export function FAQ() {
  const faqRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(0);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    /*
      The rows drop in one after another and the divider lines draw themselves out
      from the left underneath. Scaling `scaleX` from a `left` origin is what makes
      a 1px rule look drawn rather than faded — and it costs nothing, since a
      transform doesn't touch layout.
    */
    gsap.timeline({ scrollTrigger: { trigger: '.faq-list', start: 'top 84%', once: true } })
      .fromTo('.faq-row',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07, clearProps: 'all' })
      .fromTo('.faq-rule',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07, clearProps: 'all' },
        0.1);
  }, { scope: faqRef });

  return (
    <section ref={faqRef} id="faqs" className="bg-white py-24 md:py-32">
      {/* `minmax(0,…)`: the accordion row needs ~414px of content but a bare `1.3fr`
          track resolved to 401px at 768px, so the un-shrinkable plus circle spilled
          7px past the container. */}
      <div className="container-wide grid gap-14 md:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] md:gap-24">
        <Reveal className="min-w-0">
          <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#8e31b5]">QUESTIONS, ANSWERED</span>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.2vw,4.2rem)] font-semibold tracking-[-.07em] text-[#151a35]">
            Need<br />
            <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>help?</span>
          </h2>
          <p className="mt-6 max-w-xs leading-7 text-[#5c6178]">
            Still curious? Bring the question to a strategy call. We’ll bring the useful answer.
          </p>
          <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#8e31b5]" data-testid="link-faq-contact">
            Ask us directly <ArrowRight size={15} />
          </a>
        </Reveal>

        <div className="faq-list min-w-0">
          {faqs.map(([question, answer], i) => (
            <div key={question} className="faq-row relative">
              {/* Was `divide-y` + `border-y` on the wrapper. Split into one rule per
                  row so each line can draw itself in; visually identical. */}
              <span aria-hidden="true" className="faq-rule absolute inset-x-0 top-0 h-px origin-left bg-[#e6e8f0]" />
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
                aria-expanded={active === i}
                data-testid={`button-faq-${i}`}
              >
                {/* `min-w-0` lets the question shrink past its longest word, so the
                    `shrink-0` circle beside it can never be pushed off the edge. */}
                <span className="min-w-0 break-words font-display text-lg font-semibold tracking-[-.03em] text-[#151a35]">{question}</span>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d8dbe6] text-[#8e31b5] transition-transform duration-300 ${active === i ? 'rotate-45' : ''}`}>
                  <Plus size={17} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-xl pb-6 pr-4 leading-7 text-[#5c6178] md:pr-10">{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {/* Closes the list off, the way the old `border-y` did. */}
          <span aria-hidden="true" className="faq-rule block h-px origin-left bg-[#e6e8f0]" />
        </div>
      </div>
    </section>
  );
}

export default FAQ;
