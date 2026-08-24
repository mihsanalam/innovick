import { Code2, Palette, Search, Settings2, Target, Users } from 'lucide-react';

/** The six-card services grid. */
export const services = [
  { icon: Target, title: 'Strategic Marketing', desc: 'Data-led campaign strategy across Meta and Google Ads that turns spend into predictable profit.', tags: ['Facebook Ads', 'Google Ads'] },
  { icon: Palette, title: 'Creative Design', desc: 'Scroll-stopping visuals and video ad creatives built to convert, not just look good.', tags: ['Ad Creatives', 'Branding'] },
  { icon: Users, title: 'Social Media Management', desc: 'Full-service content, community, and posting management so your brand stays consistently present.', tags: ['Content', 'Community'] },
  { icon: Code2, title: 'Web Development', desc: 'Fast, conversion-focused websites and landing pages built in React and Next.js.', tags: ['Next.js', 'Landing Pages'] },
  { icon: Search, title: 'SEO', desc: 'Technical and content SEO that compounds your organic traffic month over month.', tags: ['Technical SEO', 'Content SEO'] },
  { icon: Settings2, title: 'Automation Services', desc: 'CRM, lead capture, and follow-up automation that runs while you sleep.', tags: ['CRM', 'Automation'] },
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
