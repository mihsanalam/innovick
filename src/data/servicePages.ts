/**
 * Full page content for the six /services/:slug detail pages.
 *
 * One dynamic route (`src/pages/ServiceDetail.tsx`) renders all six from this
 * object, so copy lives here and structure lives in exactly one place. Keys
 * must match the `slug` values in `services.ts`.
 */

export type ServiceProcessStep = { title: string; desc: string };
export type ServiceFaq = { q: string; a: string };

export type ServicePage = {
  name: string;
  tagline: string;
  headline: string;
  subheadline: string;
  price: string;
  duration: string;
  /** Hero illustration shown next to the copy. Swap for a real render in `public/services/`. */
  image: string;
  /** Accesible description of the hero image. */
  imageAlt: string;
  painPoints: string[];
  included: string[];
  process: ServiceProcessStep[];
  faqs: ServiceFaq[];
};

export const servicePages: Record<string, ServicePage> = {
  'strategic-marketing': {
    name: 'Strategic Marketing',
    tagline: 'Paid Growth',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Marketing analytics dashboard with conversion charts and graphs',
    headline: 'Ad Campaigns Built to Convert, Not Just Impress',
    subheadline:
      'We manage Meta and Google Ads with one goal: turning your budget into predictable, measurable revenue.',
    price: '৳25,000/month + ad spend',
    duration: 'Ongoing, monthly',
    painPoints: [
      'Ad spend going up, but sales staying flat',
      'No clear idea which campaigns actually drive revenue',
      'Agencies that report vanity metrics instead of ROI',
      'Creative and targeting decisions made by guesswork',
    ],
    included: [
      'Full Meta & Google Ads account management',
      'Weekly performance reports with real ROAS numbers',
      'A/B tested ad creative and audience targeting',
      'Monthly strategy review call',
    ],
    process: [
      { title: 'Audit & Setup', desc: 'We audit your current ad accounts and rebuild tracking so every taka is measurable.' },
      { title: 'Launch & Test', desc: 'We launch structured campaigns and test creative, audience, and offers systematically.' },
      { title: 'Scale What Works', desc: 'We double down on winning campaigns and cut what isn\'t performing.' },
    ],
    faqs: [
      { q: 'What\'s the minimum ad budget to work with you?', a: 'We typically recommend a minimum of ৳30,000/month in ad spend to gather enough data to optimize effectively.' },
      { q: 'How soon will I see results?', a: 'Most clients see clearer performance data within 2-3 weeks, with meaningful optimization by month two.' },
    ],
  },

  'creative-design': {
    name: 'Creative Design',
    tagline: 'Brand & Visual Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Designer workspace with brand color swatches and creative tools',
    headline: 'Design That Makes Your Competitors Nervous',
    subheadline:
      'Branding, ad creatives, and content design built to stop the scroll and build brand trust.',
    price: '৳20,000/month',
    duration: 'Ongoing, monthly',
    painPoints: [
      'Ad creatives that look the same as everyone else\'s',
      'Inconsistent branding across platforms',
      'Slow turnaround on design requests',
      'Content that doesn\'t match your brand\'s actual positioning',
    ],
    included: [
      'Ad creative design for active campaigns',
      'Social media post design and templates',
      'Brand guideline consistency across all assets',
      'Unlimited revision rounds within scope',
    ],
    process: [
      { title: 'Brand Discovery', desc: 'We learn your brand voice, audience, and visual direction.' },
      { title: 'Design Sprints', desc: 'We deliver design batches on a predictable weekly or biweekly cadence.' },
      { title: 'Refine & Repeat', desc: 'We track what performs and refine future design direction accordingly.' },
    ],
    faqs: [
      { q: 'Do you design for both Bengali and English audiences?', a: 'Yes, we design and write for both, tailored to how each audience actually engages.' },
      { q: 'Can this be a one-time project instead of monthly?', a: 'Yes, we also offer one-time branding packages — ask about project-based pricing on your strategy call.' },
    ],
  },

  'social-media-management': {
    name: 'Social Media Management',
    tagline: 'Content & Community',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Hand holding a smartphone with social media apps open',
    headline: 'Hands-Off Social Media That Actually Grows',
    subheadline:
      'Full content planning, posting, and community management so your brand stays consistently present.',
    price: '৳20,000/month',
    duration: 'Ongoing, monthly',
    painPoints: [
      'Inconsistent posting schedule hurting reach',
      'No time to reply to comments and DMs',
      'Content that doesn\'t match trends or platform behavior',
      'No clear content strategy tied to business goals',
    ],
    included: [
      'Monthly content calendar and copywriting',
      'Daily posting across your active platforms',
      'Community management (comments & DMs)',
      'Monthly performance report',
    ],
    process: [
      { title: 'Content Planning', desc: 'We build a monthly calendar aligned with your goals and key dates.' },
      { title: 'Create & Publish', desc: 'We produce and schedule content consistently across platforms.' },
      { title: 'Engage & Report', desc: 'We manage community engagement and report on what\'s working.' },
    ],
    faqs: [
      { q: 'Which platforms do you manage?', a: 'Facebook, Instagram, and LinkedIn as standard — TikTok and YouTube available on request.' },
      { q: 'Do you handle paid boosting too?', a: 'Organic management is included here; paid promotion falls under Strategic Marketing, which pairs well with this service.' },
    ],
  },

  'web-development': {
    name: 'Web Development',
    tagline: 'Websites & Landing Pages',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Laptop showing lines of code on screen for web development',
    headline: 'Websites Built to Convert, Not Just Look Good',
    subheadline:
      'Fast, modern websites and landing pages built in React and Next.js, designed around your customer journey.',
    price: '৳40,000/project',
    duration: 'Typically 2-4 weeks',
    painPoints: [
      'A website that looks outdated compared to competitors',
      'Slow load times losing visitors before they convert',
      'No clear path from visitor to customer on the site',
      'A site your marketing team can\'t easily update',
    ],
    included: [
      'Custom design and development (no generic templates)',
      'Mobile-first, fast-loading build',
      'Basic SEO setup and analytics integration',
      '30 days of post-launch support',
    ],
    process: [
      { title: 'Discovery & Design', desc: 'We map your site structure and design each page around your customer journey.' },
      { title: 'Build & Test', desc: 'We develop the site and test performance, responsiveness, and functionality.' },
      { title: 'Launch & Support', desc: 'We launch your site and support you through the first month live.' },
    ],
    faqs: [
      { q: 'Do you build e-commerce sites?', a: 'Yes, we build both marketing sites and e-commerce builds depending on your needs.' },
      { q: 'Will I be able to edit content myself after launch?', a: 'Yes, we can build in a simple CMS or admin panel so your team can update content without needing a developer.' },
    ],
  },

  'seo': {
    name: 'SEO',
    tagline: 'Organic Growth',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Person working on a laptop with search and ranking notes visible',
    headline: 'Rank Higher, Compound Your Traffic',
    subheadline:
      'Technical and content SEO that builds organic traffic month over month, not just a one-time audit.',
    price: '৳20,000/month',
    duration: 'Ongoing, monthly',
    painPoints: [
      'Your website barely shows up on Google',
      'Competitors ranking above you for obvious keywords',
      'Past SEO work that never showed measurable results',
      'No clear content strategy tied to search intent',
    ],
    included: [
      'Technical SEO audit and fixes',
      'Monthly keyword-targeted content',
      'On-page optimization across key pages',
      'Monthly ranking and traffic reports',
    ],
    process: [
      { title: 'Audit & Fix', desc: 'We resolve technical issues holding your site back in search rankings.' },
      { title: 'Build Authority', desc: 'We create content and optimize pages around keywords your customers actually search.' },
      { title: 'Track & Refine', desc: 'We monitor rankings and refine strategy based on real search data.' },
    ],
    faqs: [
      { q: 'How long until I see ranking improvements?', a: 'Typically 2-4 months for measurable movement, as SEO compounds rather than delivers instant results.' },
      { q: 'Do you write the content yourselves?', a: 'Yes, our team handles keyword research, writing, and on-page optimization end to end.' },
    ],
  },

  'automation-services': {
    name: 'Automation Services',
    tagline: 'CRM & Workflow Automation',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Rendered robotic automation concept representing workflow systems',
    headline: 'Automation That Works While You Sleep',
    subheadline:
      'CRM setup, lead capture, and follow-up automation so no lead ever falls through the cracks.',
    price: '৳30,000/project',
    duration: 'Typically 1-2 weeks setup',
    painPoints: [
      'Leads going cold because follow-up is manual and slow',
      'No CRM, or a CRM nobody actually uses',
      'Hours spent weekly on repetitive manual tasks',
      'No visibility into where leads are in the sales process',
    ],
    included: [
      'CRM setup and configuration',
      'Automated lead capture from ads/forms/WhatsApp',
      'Automated follow-up sequences (email/SMS/WhatsApp)',
      'Team training on the new system',
    ],
    process: [
      { title: 'Map the Workflow', desc: 'We map your current lead and sales process to identify what should be automated.' },
      { title: 'Build & Integrate', desc: 'We set up your CRM and connect it to your ad forms, website, and messaging channels.' },
      { title: 'Train & Launch', desc: 'We train your team and launch the automated system fully.' },
    ],
    faqs: [
      { q: 'Which CRM do you use?', a: 'We work with HubSpot, and lightweight options for smaller teams depending on your budget and needs.' },
      { q: 'Can this integrate with WhatsApp?', a: 'Yes, WhatsApp automation for lead follow-up is one of our most requested setups.' },
    ],
  },
};
