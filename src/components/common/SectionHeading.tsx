import { Reveal } from '@/components/common/Reveal';
import { serifAccent } from '@/lib/theme';

/**
 * The heading block every section opens with: a mono eyebrow, a display title
 * whose second half is set in serif italic, and an optional blurb.
 *
 * Splitting `lead` and `accent` keeps that italic treatment consistent instead
 * of re-hand-rolling the `<span>` in a dozen places.
 */
export function SectionHeading({
  eyebrow,
  lead,
  accent,
  blurb,
  tone = 'light',
  breakBefore = false,
  className = '',
}: {
  eyebrow: string;
  lead: string;
  /** Rendered in serif italic after `lead`. */
  accent?: string;
  blurb?: string;
  tone?: 'light' | 'dark';
  /** Put the accent on its own line. */
  breakBefore?: boolean;
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <Reveal className={className}>
      <span className={`font-mono-custom text-[10px] font-bold tracking-[.18em] ${dark ? 'text-[#c27cdf]' : 'text-[#8e31b5]'}`}>
        {eyebrow}
      </span>
      <h2 className={`mt-5 max-w-3xl font-display text-[clamp(2.1rem,5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-.065em] ${dark ? 'text-white' : 'text-[#151a35]'}`}>
        {lead}
        {accent && (
          <>
            {breakBefore ? <br /> : ' '}
            <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>
              {accent}
            </span>
          </>
        )}
      </h2>
      {blurb && (
        <p className={`mt-5 max-w-xl text-[17px] leading-8 ${dark ? 'text-white/50' : 'text-[#5c6178]'}`}>{blurb}</p>
      )}
    </Reveal>
  );
}

export default SectionHeading;
