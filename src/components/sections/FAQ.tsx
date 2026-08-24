import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';
import { faqs } from '@/data/proof';
import { serifAccent } from '@/lib/theme';

export function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="faqs" className="bg-white py-24 md:py-32">
      <div className="container-wide grid gap-14 md:grid-cols-[.7fr_1.3fr] md:gap-24">
        <Reveal>
          <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#8e31b5]">QUESTIONS, ANSWERED</span>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.2vw,4.2rem)] font-extrabold tracking-[-.07em] text-[#151a35]">
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

        <Reveal delay={0.1}>
          <div className="divide-y divide-[#e6e8f0] border-y border-[#e6e8f0]">
            {faqs.map(([question, answer], i) => (
              <div key={question}>
                <button
                  onClick={() => setActive(active === i ? null : i)}
                  className="flex w-full items-center justify-between gap-5 py-6 text-left"
                  aria-expanded={active === i}
                  data-testid={`button-faq-${i}`}
                >
                  <span className="font-display text-lg font-bold tracking-[-.03em] text-[#151a35]">{question}</span>
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
                      <p className="max-w-xl pb-6 pr-10 leading-7 text-[#5c6178]">{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FAQ;
