import { useRef, type CSSProperties } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

/**
 * G2 · Word-by-word headline reveal.
 *
 * Splits `text` into words; each word sits inside an `overflow-hidden` mask and
 * slides up out of it (with a whisper of rotation) on a staggered GSAP tween
 * the first time the block scrolls into view — the Apple-style "clip-blinds"
 * assembly. Words stay real text in the JSX, so SEO and no-JS rendering are
 * untouched; the tween is a `fromTo`, so skipping it (reduced motion) leaves
 * the heading exactly as rendered.
 *
 * The `pb/-mb` pair on the mask keeps descenders (g, y, p) from being clipped
 * by the tight leading the display headings use.
 */
export function WordReveal({
  text,
  className = '',
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current.querySelectorAll('.wr-inner'),
        { yPercent: 118, rotate: 3 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.055,
          transformOrigin: '0% 100%',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        },
      );
    },
    { scope: ref },
  );

  const words = text.split(' ');

  return (
    <span ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
        >
          <span className="wr-inner inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
      {/* Screen readers get the plain sentence once instead of chopped words. */}
      <span className="sr-only">{text}</span>
    </span>
  );
}

export default WordReveal;
