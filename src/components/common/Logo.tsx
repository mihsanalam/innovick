import { Link } from 'wouter';

/**
 * Mark + wordmark.
 *
 * `dark` flips the wordmark to white for use on dark sections. `size` exists so
 * the navbar can carry a confident mark while the footer stays a sign-off — the
 * footer is deliberately tiny, so it keeps the small size.
 */
const sizes = {
  sm: { box: 'h-8 w-8 rounded-lg', word: 'text-[16px]', gap: 'gap-2' },
  lg: { box: 'h-14 w-14 rounded-2xl', word: 'text-[22px]', gap: 'gap-3' },
};

export function Logo({ dark = false, size = 'sm' }: { dark?: boolean; size?: keyof typeof sizes }) {
  const s = sizes[size];
  return (
    // wouter Link — clicking the logo navigates client-side instead of reloading.
    // Clicking it again while already on the homepage won't change the route, so
    // we also force the window back to the top of the hero on every click.
    <Link
      href="/"
      onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
      className={`flex items-center ${s.gap} pl-1`}
      data-testid="link-logo"
    >
      <span className={`flex ${s.box} shrink-0 items-center justify-center overflow-hidden bg-[#f2edf5]`}>
        <img src="/logo.png" alt="Innovick mark" className="h-full w-full object-contain" style={{ aspectRatio: '1 / 1' }} />
      </span>
      <span className={`font-display ${s.word} font-extrabold leading-none tracking-[-.04em] ${dark ? 'text-white' : 'text-[#151a35]'}`}>
        Innovick
      </span>
    </Link>
  );
}

export default Logo;
