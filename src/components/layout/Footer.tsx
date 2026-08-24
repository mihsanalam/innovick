import { Logo } from '@/components/common/Logo';
import { contact, footerLinks, socialLinks } from '@/data/site';

/**
 * Deliberately tiny. Everything a visitor might actually want to *do* lives in
 * the Contact section directly above this, so the footer is only a sign-off:
 * one row on desktop, three stacked lines on mobile.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1128]">
      <div className="container-wide flex flex-col items-center gap-5 py-7 text-[12px] md:flex-row md:justify-between md:gap-8">
        <Logo dark />

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {footerLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-semibold text-white/45 transition hover:text-white"
              data-testid={`link-footer-${label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {label}
            </a>
          ))}
          <span aria-hidden="true" className="hidden h-3 w-px bg-white/12 md:block" />
          {socialLinks.map(social => (
            <a
              key={social.label}
              href={social.href}
              className="text-white/30 transition hover:text-white"
              data-testid={`link-${social.label.toLowerCase()}`}
            >
              {social.label}
            </a>
          ))}
        </nav>

        <p className="text-center text-white/30 md:text-right">
          © {new Date().getFullYear()} Innovick · {contact.location}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
