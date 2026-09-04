import { Link } from 'wouter';
import { Logo } from '@/components/common/Logo';
import { contact, footerLinks, socialLinks } from '@/data/site';

/**
 * Deliberately tiny: logo, the four page routes, the socials, and a sign-off.
 * One row on desktop, three stacked lines on mobile.
 *
 * The page links go through wouter `Link` so they navigate client-side instead
 * of reloading the whole app; the socials are off-site, so they stay plain
 * anchors and open in a new tab.
 *
 * The single-row switch is at `lg`, not `md`. Eight links plus the logo plus the
 * copyright need about 900px; forcing them into a row at 768px wrapped the nav
 * onto two lines and pushed the footer to 101px tall — taller than the stacked
 * version it was replacing. Below `lg` it stacks, which stays short.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1128]">
      <div className="container-wide flex flex-col items-center gap-4 py-6 text-[12px] lg:flex-row lg:justify-between lg:gap-8 lg:py-7">
        <Logo dark />

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {footerLinks.map(([label, href]) =>
            href.startsWith('/') ? (
              /* Route links go through wouter so the page never reloads. */
              <Link
                key={label}
                href={href}
                className="font-semibold text-white/45 transition hover:text-white"
                data-testid={`link-footer-${label.toLowerCase().replaceAll(' ', '-')}`}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                className="font-semibold text-white/45 transition hover:text-white"
                data-testid={`link-footer-${label.toLowerCase().replaceAll(' ', '-')}`}
              >
                {label}
              </a>
            ),
          )}
          <span aria-hidden="true" className="hidden h-3 w-px bg-white/12 lg:block" />
          {socialLinks.map(social => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-white/30 transition hover:text-white"
              data-testid={`link-footer-${social.label.toLowerCase()}`}
            >
              {social.label}
            </a>
          ))}
        </nav>

        {/* `text-balance` so the sign-off breaks into even lines on a narrow phone
            instead of leaving one orphaned word. */}
        <p className="text-balance text-center text-white/30 lg:text-right">
          © {new Date().getFullYear()} Innovick · {contact.location}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
