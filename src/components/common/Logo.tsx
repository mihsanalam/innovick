/** Mark + wordmark. `dark` flips the wordmark to white for use on dark sections. */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2 pl-1" data-testid="link-logo">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f2edf5]">
        <img src="/logo.png" alt="Innovick mark" className="h-full w-full object-contain" style={{ aspectRatio: '1 / 1' }} />
      </span>
      <span className={`font-display text-[16px] font-extrabold leading-none tracking-[-.04em] ${dark ? 'text-white' : 'text-[#151a35]'}`}>
        Innovick
      </span>
    </a>
  );
}

export default Logo;
