import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { gsap } from '@/lib/gsap';
import { Reveal } from '@/components/common/Reveal';
import { VideoReviewCard } from '@/components/common/VideoReviewCard';
import { videoReviews } from '@/data/reviews';
import { serifAccent } from '@/lib/theme';

/**
 * The homepage's 4-card teaser for the video testimonials.
 *
 * The card itself lives in `components/common/VideoReviewCard` so `/success`
 * renders the identical thing in a full 12-card grid; this section just shows
 * the first four from `src/data/reviews.ts` and points deeper with a
 * "See All Results →" link.
 */
export function VideoReviews() {
  const reviewsRef = useRef<HTMLElement>(null);

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
          {videoReviews.slice(0, 4).map((item, i) => (
            <VideoReviewCard key={item.name} review={item} index={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/success"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#8e31b5] transition-colors hover:text-[#151a35]"
              data-testid="link-see-all-results"
            >
              See All Results
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default VideoReviews;
