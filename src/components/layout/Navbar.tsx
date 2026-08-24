import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Logo } from '@/components/common/Logo';
import { navLinks } from '@/data/site';

/**
 * The hero is dark, so at the top of the page the bar is transparent with white
 * type. Once you scroll past it the bar turns into white glass and the type
 * flips to ink. A hairline progress bar sits along the bottom edge — it is
 * written straight to the DOM on scroll rather than through state, so dragging
 * the scrollbar doesn't re-render the whole header on every frame.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      const bar = progressRef.current;
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-[0_8px_30px_rgba(21,26,53,.08)] backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="container-wide flex h-[76px] items-center justify-between">
        <Logo dark={!scrolled} />
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`text-[13px] font-semibold transition-colors ${scrolled ? 'text-[#5c6178] hover:text-[#8e31b5]' : 'text-white/60 hover:text-white'}`}
              data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="#contact" variant={scrolled ? 'ink' : 'white'}>
            Book a Strategy Call <ArrowRight size={15} />
          </Button>
        </div>
        <button
          className={`rounded-full p-2 md:hidden ${scrolled ? 'text-[#151a35]' : 'text-white'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          data-testid="button-mobile-menu"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Reading progress — 1px, easy to miss, hard to unsee. */}
      <span
        ref={progressRef}
        aria-hidden="true"
        className="block h-px origin-left scale-x-0 bg-gradient-to-r from-[#8e31b5] to-[#c27cdf]"
      />

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[#e6e8f0] bg-white px-5 py-4 md:hidden"
          >
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block border-b border-[#eceef5] py-3 text-sm font-semibold text-[#5c6178] last:border-0"
                data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}
              >
                {label}
              </a>
            ))}
            <Button href="#contact" variant="ink" className="mt-4 w-full">
              Book a Strategy Call
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
