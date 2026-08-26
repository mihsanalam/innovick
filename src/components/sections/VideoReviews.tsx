import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { Reveal } from '@/components/common/Reveal';
import { videoReviews } from '@/data/reviews';
import { serifAccent } from '@/lib/theme';

/**
 * Video-only cards, on purpose: no rating, no name plate, no pull quote. The
 * clip is the testimonial. Paste an embed URL into `videoUrl` in
 * `src/data/reviews.ts` and the card plays it inline; until then a press shows
 * a "coming soon" state rather than silently doing nothing.
 */
export function VideoReviews() {
  const reviewsRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.review-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          delay: (i % 2) * 0.1,
        }
      );
    });
  }, { scope: reviewsRef });

  return (
    <section ref={reviewsRef} id="reviews" className="bg-[#f5f6fa] py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#8e31b5]">RESULTS</span>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5.2vw,4.2rem)] font-semibold leading-[1.02] tracking-[-.07em] text-[#151a35]">
            What clients <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>say.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-8 text-[#5c6178]">
            Not paraphrased into a pull quote by us. Press play and hear it in their own words.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {videoReviews.map((item, i) => {
            const isOpen = open === i;
            return (
              <article
                key={item.name}
                className="review-card group relative rounded-[1.75rem] border border-[#e6e8f0] bg-white p-3 shadow-[0_26px_60px_-30px_rgba(21,26,53,.3)]"
                data-testid={`card-review-${i}`}
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-[1.35rem] bg-[#151a35]">
                  {isOpen && item.videoUrl ? (
                    <iframe
                      src={item.videoUrl}
                      title={`${item.name} video review`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  ) : (
                    <>
                      <img
                        src={item.thumb}
                        alt={`${item.name}, ${item.role}`}
                        width="900" height="620" loading="lazy" decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151a35]/70 via-transparent to-[#151a35]/10" />

                      {/* Folded corner, straight off the reference */}
                      <span className="pointer-events-none absolute right-0 top-0 h-11 w-11 bg-white" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                      <ArrowUpRight size={13} className="pointer-events-none absolute right-2 top-2 text-[#151a35]" />

                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="absolute inset-0 grid place-items-center"
                        aria-label={`Play the video review from ${item.name}`}
                        data-testid={`button-play-review-${i}`}
                      >
                        <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white/95 text-[#151a35] shadow-[0_18px_44px_rgba(0,0,0,.45)] transition-transform duration-300 group-hover:scale-110">
                          <Play size={25} fill="currentColor" strokeWidth={0} className="ml-[3px]" />
                        </span>
                      </button>

                      <span className="pointer-events-none absolute bottom-4 left-5 font-mono-custom text-[11px] font-bold text-white/75">{item.length}</span>

                      <AnimatePresence>
                        {isOpen && !item.videoUrl && (
                          <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 grid place-items-center gap-3 bg-[#151a35]/95 p-6 text-center backdrop-blur-sm"
                          >
                            <div>
                              <p className="font-mono-custom text-[10px] font-bold tracking-[.16em] text-[#c27cdf]">VIDEO COMING SOON</p>
                              <button
                                onClick={() => setOpen(null)}
                                className="mt-3 font-mono-custom text-[10px] font-bold tracking-[.14em] text-white/45 transition hover:text-white"
                              >
                                CLOSE âœ•
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default VideoReviews;
