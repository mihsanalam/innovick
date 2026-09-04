/**
 * Everything a non-developer is most likely to want to change lives here:
 * contact details, nav labels, and the social links.
 */
import { Instagram, Linkedin, Twitter, type LucideIcon } from 'lucide-react';

// TODO: replace the placeholder email with the real one.
export const contact = {
  email: 'hello@innovick.com',
  phoneLabel: '+880 1796-118651',
  phoneHref: 'tel:+8801796118651',
  whatsapp: 'https://wa.me/8801796118651',
  location: 'Dhaka, Bangladesh',
} as const;

/**
 * Cal.com booking page — the paid / priority strategy-call scheduling link.
 * The embed popup only needs the path portion (everything after cal.com),
 * e.g. "mihsanalam/30min".
 */
export const calBookingLink = 'https://cal.com/mihsanalam/30min';

/**
 * Web3Forms access key (https://web3forms.com). Safe to ship in frontend code —
 * it only routes submissions to the inbox the key was created with.
 *
 * Currently unused: the Contact page's "Request a Meeting" form now hands off
 * to a prefilled Cal.com embed instead of posting here. Kept on purpose in
 * case a simple form shows up later (e.g. a newsletter signup or the "Get
 * Support" card).
 */
export const web3FormsAccessKey = '87da962f-d9da-41c2-a288-555f2874951b';

export const navLinks: [string, string][] = [
  ['Services', '#services'],
  ['Success', '/success'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

/** Kept deliberately short — the footer is a sign-off, not a sitemap. */
export const footerLinks: [string, string][] = [
  ['Services', '#services'],
  ['Work', '#work'],
  ['Founder', '#founder'],
  ['Reviews', '#reviews'],
  ['FAQs', '#faqs'],
];

// TODO: point these at the real Innovick profiles.
// `icon` is a lucide-react component — swap it if you change the network.
export const socialLinks: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'Twitter', href: 'https://x.com', icon: Twitter },
];

/**
 * The client roster, defined once and pulled from everywhere.
 *
 * - `/about` trust strip shows the first eight (`.slice(0, 8)`).
 * - `/success` logo band shows all twelve — the same list, just wider.
 *
 * Add new clients here and both pages pick them up automatically.
 */
export const clientNames = [
  'Loom & Thread',
  'GreenLeaf Organics',
  'UrbanNest Furniture',
  'Pinnacle Skincare',
  'Chowdhury Electronics',
  'Zenith Wellness',
  'CraftBox Bangladesh',
  'Nexora Tech',
  'Padma Fresh',
  'Meghna Apparel',
  'Bengal Roasters',
  'Skyline Interiors',
];
