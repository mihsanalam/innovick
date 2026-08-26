import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Logo } from '@/components/common/Logo';
import { navLinks } from '@/data/site';
import { services } from '@/data/services';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * Frosted glass, the whole way down the page: translucent white over a heavy
 * backdrop blur with a hairline bottom edge. The only thing scrolling changes is
 * how solid it gets — the type stays ink either way, because the hero is white.
 *
 * The hairline progress bar is written straight to the DOM on scroll rather than
 * through state, so dragging the scrollbar doesn't re-render the header on
 * every frame.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ${
        scrolled
          ? 'border-[#151a35]/[.08] bg-white/80 shadow-[0_8px_30px_rgba(21,26,53,.06)]'
          : 'border-[#151a35]/[.05] bg-white/65'
      }`}
    >
      <div className="container-wide flex h-[92px] items-center justify-between">
        <Logo size="lg" />
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map(([label, href]) =>
            href === '#services' ? (
              <ServicesMenu key={href} />
            ) : (
              <a
                key={href}
                href={href}
                className="text-[13px] font-semibold text-[#5c6178] transition-colors hover:text-[#8e31b5]"
                data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}
              >
                {label}
              </a>
            ),
          )}
        </nav>
        <div className="hidden md:block">
          <Button href="#contact" variant="brand">
            Book a Strategy Call <ArrowRight size={15} />
          </Button>
        </div>
        <button
          className="rounded-full p-2 text-[#151a35] md:hidden"
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
            className="overflow-hidden border-t border-[#e6e8f0] bg-white/95 px-5 py-4 backdrop-blur-xl md:hidden"
          >
            {navLinks.map(([label, href]) =>
              href === '#services' ? (
                /* Mobile has no hover, so Services becomes a tap-to-expand
                    group: the header toggles the six routes + overview link. */
                <div key={href} className="border-b border-[#eceef5]">
                  <button
                    onClick={() => setServicesOpen(o => !o)}
                    aria-expanded={servicesOpen}
                    data-testid="link-mobile-services"
                    className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm font-semibold text-[#5c6178]"
                  >
                    Services
                    <ChevronDown
                      size={15}
                      className={`shrink-0 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {servicesOpen && (
                    <div className="pb-3">
                      {services.map(service => (
                        <a
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2 text-[13px] font-medium text-[#5c6178]"
                        >
                          {service.short ?? service.title}
                        </a>
                      ))}
                      <a
                        href="/services"
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-[13px] font-bold text-[#151a35]"
                      >
                        View All Services →
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={href}
                  // The remaining entries are homepage anchors except Contact,
                  // which is already a real route.
                  href={href === '#faqs' || href === '#founder' || href === '#work' || href === '#diagnose' || href === '#reviews' ? href : href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-[#eceef5] py-3 text-sm font-semibold text-[#5c6178] last:border-0"
                  data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}
                >
                  {label}
                </a>
              ),
            )}
            <Button href="#contact" variant="brand" className="mt-4 w-full">
              Book a Strategy Call
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;

/**
 * The "Services" nav item as a hover-open dropdown.
 *
 * Built on the existing shadcn DropdownMenu primitive, whose open/close
 * transition (fade + 95% zoom via tw-animate-css) is the same animation every
 * other popover in the codebase uses — nothing new introduced here.
 *
 * The label itself stays a real link to /services, so clicking the word still
 * navigates; the menu opens on hover (with a small grace timer so moving the
 * pointer down into the panel doesn't close it). On touch devices there is no
 * hover — tapping navigates to /services, which lists everything anyway.
 */
function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(0);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <a
          href="/services"
          onMouseEnter={() => {
            cancelClose();
            setOpen(true);
          }}
          onMouseLeave={scheduleClose}
          className="flex items-center gap-1 text-[13px] font-semibold text-[#5c6178] outline-none transition-colors hover:text-[#8e31b5] data-[state=open]:text-[#8e31b5]"
          data-testid="link-nav-services"
        >
          Services
          <ChevronDown
            size={13}
            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </a>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={18}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        className="min-w-60 rounded-xl border-[#e6e8f0] bg-white p-1.5 shadow-[0_24px_60px_rgba(21,26,53,.14)]"
      >
        {services.map(service => (
          <DropdownMenuItem
            key={service.slug}
            asChild
            className="cursor-pointer rounded-lg px-3 py-2 text-[13px] font-semibold text-[#5c6178] focus:bg-[#8e31b5]/[.07] focus:text-[#8e31b5]"
          >
            <a href={`/services/${service.slug}`}>{service.short ?? service.title}</a>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="bg-[#eceef5]" />

        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-lg px-3 py-2 text-[13px] font-bold text-[#151a35] focus:bg-[#8e31b5]/[.07] focus:text-[#8e31b5]"
        >
          <a href="/services">View All Services →</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
