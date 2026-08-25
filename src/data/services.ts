import type { LucideIcon } from 'lucide-react';
import { Code2, Palette, Search, Settings2, Target, Users } from 'lucide-react';

/**
 * The six services, dealt out as a stack of full-width cards.
 *
 * Each card's title renders with its **last word** in serif italic, so phrase the
 * title with the word you want emphasised last ("Strategic Marketing" →
 * "Strategic *Marketing*"). `tags` fill the pill rows — 4–6 reads best.
 *
 * `image` is optional: drop a render into `public/services/` and point to it
 * (`image: '/services/seo.png'`) to replace the generated <ServiceArt /> tile
 * cluster on that card.
 */
export type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
  image?: string;
};

export const services: Service[] = [
  {
    icon: Target,
    title: 'Strategic Marketing',
    desc: 'Data-led campaign strategy across Meta and Google Ads that turns ad spend into predictable, trackable profit — not guesswork.',
    tags: ['Facebook Ads', 'Google Ads', 'Funnel Strategy', 'Retargeting', 'A/B Testing'],
  },
  {
    icon: Palette,
    title: 'Creative Design',
    desc: 'Scroll-stopping visuals and video ad creatives built to convert, engineered around your brand — not a stock template.',
    tags: ['Ad Creatives', 'Branding', 'Motion', 'Short-form Video', 'Design Systems'],
  },
  {
    icon: Users,
    title: 'Social Media Management',
    desc: 'Full-service content, community, and posting management so your brand stays consistently present where your buyers already are.',
    tags: ['Content', 'Community', 'Calendar', 'Copywriting', 'Analytics'],
  },
  {
    icon: Code2,
    title: 'Web Development',
    desc: 'Fast, conversion-focused websites and landing pages built in React and Next.js, tuned around your customer journey.',
    tags: ['Next.js', 'Landing Pages', 'React', 'Performance', 'Analytics'],
  },
  {
    icon: Search,
    title: 'Search SEO',
    desc: 'Technical and content SEO that compounds your organic traffic month over month, long after the ad budget stops.',
    tags: ['Technical SEO', 'Content SEO', 'Audits', 'Keyword Intent', 'Schema'],
  },
  {
    icon: Settings2,
    title: 'Automation Services',
    desc: 'CRM, lead capture, and follow-up automation that keeps working while you sleep — every lead answered, nothing dropped.',
    tags: ['CRM', 'Automation', 'Lead Capture', 'Email Flows', 'Integrations'],
  },
];

/**
 * The four disciplines behind the sticky rail. `visual` is resolved in the
 * Capabilities section rather than stored here, so this file stays JSX-free.
 */
export type CapabilityVisual = 'chart' | 'phone' | 'website' | 'search';

export const capabilities: { title: string; blurb: string; bullets: string[]; visual: CapabilityVisual }[] = [
  {
    title: 'Strategic Marketing',
    blurb: 'The right message in front of the right audience, connected into a growth system you can watch working in real time.',
    bullets: ['Meta and Google campaign architecture', 'Offer, audience, and creative testing', 'Budget reallocated every single week'],
    visual: 'chart',
  },
  {
    title: 'Eye-Catching Design',
    blurb: 'Creative that feels unmistakably yours, then does the hard work of turning a curious scroll into a confident click.',
    bullets: ['Ad creatives built for the feed', 'Brand identity and guidelines', 'Short-form video and motion'],
    visual: 'phone',
  },
  {
    title: 'Web Development',
    blurb: 'High-performing digital experiences built around your customer journey instead of around a template.',
    bullets: ['React and Next.js builds', 'Landing pages tuned to convert', 'Speed, schema, and analytics baked in'],
    visual: 'website',
  },
  {
    title: 'Robust SEO',
    blurb: 'A considered technical and content foundation that keeps compounding long after the campaign budget stops.',
    bullets: ['Technical audits and real fixes', 'Content mapped to buying intent', 'Reporting that ties back to revenue'],
    visual: 'search',
  },
];
