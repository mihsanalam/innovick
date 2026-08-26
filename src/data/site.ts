/**
 * Everything a non-developer is most likely to want to change lives here:
 * contact details, nav labels, and the social links.
 */
import { Instagram, Linkedin, Twitter, type LucideIcon } from 'lucide-react';

// TODO: replace the placeholder email, phone, and WhatsApp number with the real ones.
export const contact = {
  email: 'hello@innovick.com',
  phoneLabel: '+880 1000 000000',
  phoneHref: 'tel:+8801000000000',
  whatsapp: 'https://wa.me/8801000000000',
  location: 'Dhaka, Bangladesh',
} as const;

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
