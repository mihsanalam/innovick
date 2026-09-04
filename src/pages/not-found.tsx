import { Button } from '@/components/common/Button';

/**
 * The 404. Deliberately calm and on-brand: a short apology, the two routes
 * that matter, and nothing else. (The animated "growth rescue" 404 from the
 * motion roadmap can replace this later.)
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-white px-5 text-center">
      <span className="font-mono-custom text-[11px] font-bold uppercase tracking-[.18em] text-[#8e31b5]">
        Error 404
      </span>
      <h1 className="font-display text-[clamp(2.4rem,6vw,4.2rem)] font-semibold leading-[1.04] tracking-tighter text-[#151a35]">
        This page took a wrong turn.
      </h1>
      <p className="max-w-md text-[15px] leading-7 text-[#5c6178]">
        The link is broken or the page has moved — but your growth plan is
        still one click away.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button href="/" variant="brand">
          Back to Home
        </Button>
        <Button href="/contact" variant="outline">
          Book a Strategy Call
        </Button>
      </div>
    </div>
  );
}
