import type { ReactNode } from 'react';
import { purpleGradient } from '@/lib/theme';

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
}: {
  children: ReactNode;
  href?: string;
  /** Shorthand kept for readability at call sites: `<Button outline>`. */
  outline?: boolean;
  variant?: ButtonVariant;
  className?: string;
}) {
  const kind: ButtonVariant = variant ?? (outline ? 'outline' : 'brand');
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-transform duration-300 hover:scale-[1.03] ${buttonStyles[kind]} ${className}`}
      style={kind === 'brand' ? { background: purpleGradient } : undefined}
      data-testid={`link-cta-${href.replace('#', '')}`}
    >
      {children}
    </a>
  );
}

export default Button;
