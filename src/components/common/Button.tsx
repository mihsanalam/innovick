import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { purpleGradient } from '@/lib/theme';
import { Magnetic } from '@/components/common/Magnetic';

/**
 * `brand`   — the purple gradient. Used sparingly; purple is an accent now.
 * `ink`     — deep navy fill. The default CTA on light sections.
 * `white`   — for dark sections, where white is the loudest thing available.
 * `outline` — secondary action on light sections.
 * `ghost`   — secondary action on dark sections.
 */
export type ButtonVariant = 'brand' | 'outline' | 'ink' | 'white' | 'ghost';

const buttonStyles: Record<ButtonVariant, string> = {
  brand: 'text-white shadow-[0_12px_28px_rgba(142,49,181,.22)]',
  outline: 'border border-[#d8dbe6] bg-white/70 text-[#151a35] hover:bg-white',
  ink: 'bg-[#151a35] text-white shadow-[0_12px_28px_rgba(21,26,53,.22)]',
  white: 'bg-white text-[#151a35] shadow-[0_14px_34px_rgba(0,0,0,.32)]',
  ghost: 'border border-white/15 text-white/70 hover:border-white/40 hover:text-white',
};

export function Button({
  children,
  href = '#contact',
  outline = false,
  variant,
  className = '',
  newTab = false,
}: {
  children: ReactNode;
  href?: string;
  /** Shorthand kept for readability at call sites: `<Button outline>`. */
  outline?: boolean;
  variant?: ButtonVariant;
  className?: string;
  /** Opens the link in a new tab — used for off-site destinations (wa.me, cal.com). */
  newTab?: boolean;
}) {
  const kind: ButtonVariant = variant ?? (outline ? 'outline' : 'brand');
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-transform duration-300 hover:scale-[1.03] ${buttonStyles[kind]} ${className}`;
  const style = kind === 'brand' ? { background: purpleGradient } : undefined;
  const testId = `link-cta-${href.replace('#', '')}`;

  // Internal routes (e.g. /contact) navigate client-side through wouter so the
  // app never does a full page reload; hash anchors and external URLs stay as
  // plain anchors. Both are wrapped in `Magnetic` (G1) — every CTA on the site
  // drifts toward the cursor when it hovers nearby. Touch devices and reduced-
  // motion users get the plain button; the wrapper only activates for fine
  // pointers without a reduce request.
  if (href.startsWith('/')) {
    return (
      <Magnetic>
        <Link href={href} className={classes} style={style} data-testid={testId}>
          {children}
        </Link>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <a
        href={href}
        className={classes}
        style={style}
        data-testid={testId}
        {...(newTab ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    </Magnetic>
  );
}

export default Button;
