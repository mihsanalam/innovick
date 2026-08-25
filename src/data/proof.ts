/**
 * The four headline proof points under the hero — the numbers a marketing
 * agency gets judged on: money managed, brands moved, return produced, reach.
 *
 * Each counts up from zero when it scrolls into view. `value` must be a number;
 * put currency in `prefix`, units in `suffix`, and set `decimals` for anything
 * that isn't whole.
 *
 * TODO: confirm these against your real numbers before going live.
 */
export const headlineStats = [
  { prefix: '৳', value: 65, suffix: 'Cr+', label: 'Ad Spend Managed' },
  { value: 135, suffix: '+', label: 'Brands Scaled' },
  { value: 3.4, suffix: '×', decimals: 1, label: 'Average ROAS' },
  { value: 12, suffix: '+', label: 'Countries Served' },
];

/**
 * The FAQ accordion. The first two carry the "why us" argument that used to have
 * its own comparison section — keep them near the top.
 */
export const faqs: [string, string][] = [
  ['Why should I choose Innovick over other agencies?', 'We combine marketing, creative, and development under one roof, with transparent, real-time reporting.'],
  ['What sets Innovick apart from the competition?', "Speed, honesty, and an in-house dev team most agencies don't have."],
  ['How can Innovick guarantee accurate reporting?', 'We give clients direct dashboard access instead of static monthly PDFs.'],
  ['Do you work with brands outside Bangladesh?', 'Yes, we currently serve clients across 12+ countries.'],
  ["What's the minimum commitment to start?", 'Most engagements start with a 3-month strategy cycle.'],
];
