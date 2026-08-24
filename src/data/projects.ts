import { Layers3, Search, Sparkles, TrendingUp } from 'lucide-react';

/** Gradients are deep navy now, with only a trace of brand in the second stop. */
export const projects = [
  {
    name: 'Loom & Thread', result: '3.2x ROAS in 60 days', category: 'Meta Ads + Landing Page',
    bg: 'from-[#0a0d1f] to-[#2c1b38]', icon: TrendingUp,
    blurb: 'A denim label burning budget on broad targeting. We rebuilt the funnel around three offers and let the winner take the spend.',
    tags: ['Meta Ads', 'Funnel Rebuild', 'Landing Page', 'Creative Testing'],
  },
  {
    name: 'UrbanNest Furniture', result: 'Full website rebuild + automation', category: 'Web Development',
    bg: 'from-[#0a0d1f] to-[#1f2436]', icon: Layers3,
    blurb: 'Six-second load times and a lead inbox nobody checked. New Next.js build, new CRM routing, same team — now answering in minutes.',
    tags: ['Next.js', 'CRM Automation', 'Site Speed', 'Lead Routing'],
  },
  {
    name: 'Zenith Wellness', result: 'Organic traffic up 180%', category: 'SEO + Content',
    bg: 'from-[#0a0d1f] to-[#24322c]', icon: Search,
    blurb: 'Ranking for nothing anyone searched. We mapped real intent, fixed the technical debt, and let the content compound.',
    tags: ['Technical SEO', 'Content Strategy', 'Local Search', 'Schema'],
  },
  {
    name: 'Pinnacle Skincare', result: 'Rebrand + social growth', category: 'Creative + Social Media',
    bg: 'from-[#0a0d1f] to-[#33203a]', icon: Sparkles,
    blurb: 'A good product wearing a forgettable brand. New identity, a proper content engine, and a feed people actually stop on.',
    tags: ['Brand Identity', 'Short-Form Video', 'Social Management', 'UGC'],
  },
];
