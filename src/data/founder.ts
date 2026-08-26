/**
 * Founder block content.
 *
 * NOTE ON THE PHOTO: save the portrait you sent to `public/founder.jpg`
 * (a 3:4 portrait crop fits the frame best). Until that file exists the frame
 * falls back to an initials block, so the layout never breaks.
 */
export const founder = {
  name: 'Shahjahan Reza',
  role: 'FOUNDER & CEO',
  photo: '/founder.jpg',
  eyebrow: 'ABOUT ME',
  headline: 'I’m Shahjahan. I build marketing departments that run without founders.',
  blurb: 'I work with mid-size companies to install a Marketing Operating System in 90 days.',
  /**
   * The pull quote. `quoteEmphasis` must appear verbatim inside `quote` — that
   * phrase gets underlined. If it doesn't match, the quote simply renders plain.
   */
  quote:
    'Most importantly, I’ve been a founder myself, so I understand the pressure, the trade-offs, and the reality behind the numbers.',
  quoteEmphasis: 'founder myself',
};

// TODO: confirm these six figures. They fill a 2-column grid, so keep the count even.
export const founderProof = [
  { value: '135+', label: 'Companies Advised' },
  { value: '500+', label: 'Marketers Hired' },
  { value: '2', label: 'Businesses Founded' },
  { value: '1', label: 'Successful Exit' },
  { value: '2M+', label: 'Monthly Content Views' },
  { value: '16+', label: 'Years in Marketing' },
];
