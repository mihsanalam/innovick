import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { VideoReview } from '@/data/reviews';

/**
 * Converts a pasted social/video URL into whatever embeddable player URL its
 * platform needs, so non-developers can paste the link they copied straight
 * into `videoUrl` in `src/data/reviews.ts` — no manual embed fiddling:
 *
 * - YouTube   `youtube.com/watch?v=…`, `youtu.be/…`, `youtube.com/shorts/…`
 * - Vimeo     `vimeo.com/123456`
 * - Facebook  `facebook.com/.../videos/...`, `fb.watch/...` (via the FB video plugin)
 * - Instagram `instagram.com/reel/...`, `/p/...`, `/tv/...`
 * - anything else is passed through untouched, so an already-embeddable URL
 *   (or another platform that allows plain iframes) works as-is.
 */
export function toEmbedUrl(raw: string): string {
  const url = raw.trim();
  let m: RegExpMatchArray | null;

  if ((m = url.match(/(?:youtube\.com\/(?:watch\?.*?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/))) {
    return `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`;
  }
  if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/))) {
    return `https://player.vimeo.com/video/${m[1]}?autoplay=1`;
  }
  if ((m = url.match(/instagram\.com\/(?:p|reel|tv)\/([\w-]+)/))) {
    return `https://www.instagram.com/${m[1]}/embed`;
  }
  if (/facebook\.com|fb\.watch/.test(url)) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true`;
  }
  return url;
}

/**
 * One video testimonial card — video-only, on purpose: no caption, no name
 * plates, no chips. Once a real clip is uploaded the platform's own player
 * carries the title and branding; until then the thumbnail sits behind a play
 * button, and a press shows a "coming soon" state rather than doing nothing.
 *
 * Shared by the homepage's 4-card teaser and `/success`'s 3-across grid.
 */
export function VideoReviewCard({ review, index = 0 }: { review: VideoReview; index?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className="review-card group relative overflow-hidden rounded-[1.75rem] border border-[#e6e8f0] bg-white shadow-[0_26px_60px_-30px_rgba(21,26,53,.3)]"
      data-testid={`card-review-${index}`}
    >
      <div
        className="relative aspect-video w-full overflow-hidden bg-[#151a35]"
        style={{ background: review.thumbnailColor }}
      >
        {open && review.videoUrl ? (
          <iframe
            src={toEmbedUrl(review.videoUrl)}
            title={`${review.name} video review`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            <img
              src={review.thumb}
              alt={`${review.name}, ${review.role}`}
              width="900" height="506" loading="lazy" decoding="async"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151a35]/55 via-transparent to-transparent" />

            <button
              onClick={() => setOpen(true)}
              className="absolute inset-0 grid place-items-center"
              aria-label={`Play the video review from ${review.name}`}
              data-testid={`button-play-review-${index}`}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#151a35] shadow-[0_18px_44px_rgba(0,0,0,.45)] transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                <Play size={26} fill="currentColor" strokeWidth={0} className="ml-[3px]" />
              </span>
            </button>

            <AnimatePresence>
              {open && !review.videoUrl && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 grid place-items-center gap-3 bg-[#151a35]/95 p-6 text-center backdrop-blur-sm"
                >
                  <div>
                    <p className="font-mono-custom text-[10px] font-bold tracking-[.16em] text-[#c27cdf]">VIDEO COMING SOON</p>
                    <button
                      onClick={() => setOpen(false)}
                      className="mt-3 font-mono-custom text-[10px] font-bold tracking-[.14em] text-white/45 transition hover:text-white"
                    >
                      CLOSE ✕
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
}

export default VideoReviewCard;