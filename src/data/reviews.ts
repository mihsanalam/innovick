/**
 * Testimonials data — one file serving both surfaces:
 *
 * - `videoReviews` powers the homepage's 4-card teaser (`sections/VideoReviews`)
 *   AND the full 12-card grid on `/success`.
 * - `writtenTestimonials` is the quote grid on `/success` only.
 *
 * UPLOADING REAL VIDEOS — paste any platform link straight into `videoUrl`,
 * no manual embed conversion needed (`VideoReviewCard` handles it):
 *
 *   videoUrl: 'https://youtube.com/watch?v=XXXXXXXXXXX'      // YouTube
 *   videoUrl: 'https://youtu.be/XXXXXXXXXXX'                 // YouTube short link
 *   videoUrl: 'https://facebook.com/yourpage/videos/123/'    // Facebook
 *   videoUrl: 'https://fb.watch/XXXXXX/'                     // Facebook
 *   videoUrl: 'https://instagram.com/reel/XXXXXXXX/'         // Instagram
 *   videoUrl: 'https://vimeo.com/123456789'                  // Vimeo
 *
 * The card then swaps its thumbnail for that platform's own player, which
 * carries the title and branding itself — nothing else to configure.
 * While `videoUrl` is empty the card shows a "coming soon" state.
 *
 * - `caption`        — optional hook text; currently not rendered (cards are
 *   video-only). Kept in the data in case a text overlay is wanted later.
 * - `thumbnailColor` — CSS background shown behind/under the thumbnail while
 *   it loads. Curated brand palette: three purple tones + ink navy, plus warm
 *   terracotta/amber and cool teal accents for variety without noise.
 */

export type VideoReview = {
  name: string;
  role: string;
  length: string;
  thumb: string;
  videoUrl: string;
  caption: string;
  thumbnailColor: string;
};

export const videoReviews: VideoReview[] = [
  {
    name: 'Rafiul Karim', role: 'Founder, Loom & Thread', length: '2:14',
    thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
    caption: 'Doubled Our ROAS in 60 Days',
    thumbnailColor: 'linear-gradient(135deg, #8e31b5, #5c1e78)',
  },
  {
    name: 'Sadia Afrin', role: 'Marketing Lead, GreenLeaf Organics', length: '1:48',
    thumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
    caption: 'Finally, A Team That Ships',
    thumbnailColor: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
  },
  {
    name: 'Tanvir Hasan', role: 'CEO, UrbanNest Furniture', length: '3:02',
    thumb: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
    caption: 'Our Website Finally Converts',
    thumbnailColor: 'linear-gradient(135deg, #0d1128, #2b2350)',
  },
  {
    name: 'Nusrat Jahan', role: 'Co-founder, Pinnacle Skincare', length: '2:27',
    thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
    caption: 'Cost Per Lead Cut in Half',
    thumbnailColor: 'linear-gradient(135deg, #b4552d, #e07b45)',
  },
  {
    name: 'Imran Hossain', role: 'Director, Chowdhury Electronics', length: '2:41',
    thumb: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
    caption: 'From Invisible to Page One',
    thumbnailColor: 'linear-gradient(135deg, #8e31b5, #c27cdf)',
  },
  {
    name: 'Farhana Akter', role: 'Head of Growth, Nexora Tech', length: '1:56',
    thumb: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
    caption: 'A Pipeline We Can Actually Predict',
    thumbnailColor: 'linear-gradient(135deg, #0f766e, #14b8a6)',
  },
  {
    name: 'Arif Chowdhury', role: 'Owner, Bengal Roasters', length: '2:33',
    thumb: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
    caption: 'Reporting We Can Trust at Last',
    thumbnailColor: 'linear-gradient(135deg, #b7791f, #e0a83e)',
  },
  {
    name: 'Mehjabin Noor', role: 'Brand Manager, Zenith Wellness', length: '2:08',
    thumb: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
    caption: 'Consistent Content, Zero Scramble',
    thumbnailColor: 'linear-gradient(135deg, #4c1d95, #8e31b5)',
  },
  {
    name: 'Shakib Rahman', role: 'Founder, CraftBox Bangladesh', length: '3:19',
    thumb: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
    caption: 'Automation Replaced Our Spreadsheets',
    thumbnailColor: 'linear-gradient(135deg, #0d1128, #3b2f66)',
  },
  {
    name: 'Tasnim Alam', role: 'CMO, Padma Fresh', length: '2:52',
    thumb: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
    caption: 'Ad Spend That Actually Converts',
    thumbnailColor: 'linear-gradient(135deg, #b4552d, #d97b3f)',
  },
  {
    name: 'Rezaul Karim', role: 'MD, Meghna Apparel', length: '2:21',
    thumb: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
    caption: 'One Team for Ads, Web & SEO',
    thumbnailColor: 'linear-gradient(135deg, #0f766e, #2dd4bf)',
  },
  {
    name: 'Anika Tabassum', role: 'Founder, Skyline Interiors', length: '1:44',
    thumb: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85',
    videoUrl: '',
    caption: 'Leads Every Week, Not Every Blue Moon',
    thumbnailColor: 'linear-gradient(135deg, #8e31b5, #b565d6)',
  },
];

/**
 * Written testimonials for `/success` — direct quotes from founders and
 * marketing leads across the service spread (ads, web dev, SEO, automation,
 * social media), so the grid doesn't read like nine copies of the same win.
 *
 * TODO: swap these for verbatim client quotes before going live.
 */
export type WrittenTestimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};

export const writtenTestimonials: WrittenTestimonial[] = [
  {
    name: 'Tanvir Hasan',
    role: 'CEO',
    company: 'UrbanNest Furniture',
    rating: 5,
    quote: 'Our old site got traffic and sold nothing. Innovick rebuilt it in five weeks and conversions tripled the first month. They even argued us out of features we didn\'t need — that\'s when I knew they were serious about results.',
  },
  {
    name: 'Sadia Afrin',
    role: 'Marketing Lead',
    company: 'GreenLeaf Organics',
    rating: 5,
    quote: 'We\'d burned through two agencies before this. Innovick rebuilt our Meta campaigns around contribution margin instead of clicks, and ROAS went from 1.4 to 3.1 in a quarter. The weekly reports are brutally honest.',
  },
  {
    name: 'Imran Hossain',
    role: 'Director',
    company: 'Chowdhury Electronics',
    rating: 5,
    quote: 'Six months of SEO work took us from nowhere to page one for our main categories. What sold me was the roadmap — they explained exactly what they\'d ship each month and actually shipped it.',
  },
  {
    name: 'Shakib Rahman',
    role: 'Founder',
    company: 'CraftBox Bangladesh',
    rating: 5,
    quote: 'Their automation setup replaced three spreadsheets and a part-time hire. Leads from ads now get a WhatsApp follow-up within two minutes, automatically. Our response rate went through the roof.',
  },
  {
    name: 'Mehjabin Noor',
    role: 'Brand Manager',
    company: 'Zenith Wellness',
    rating: 4,
    quote: 'We used to post whenever someone remembered. Now there\'s a content engine: calendar, creatives, captions, community replies — all handled. Engagement doubled and my team finally has time to think.',
  },
  {
    name: 'Rafiul Karim',
    role: 'Founder',
    company: 'Loom & Thread',
    rating: 5,
    quote: 'What I appreciate most is the dashboard access. I can check spend, ROAS, and lead quality any hour of the day instead of waiting for a monthly PDF. Transparency like this is rare in this market.',
  },
  {
    name: 'Tasnim Alam',
    role: 'CMO',
    company: 'Padma Fresh',
    rating: 5,
    quote: 'Innovick took over our Google Ads mid-disaster — a competitor had bid up our brand terms. Within six weeks our cost per acquisition dropped 40% while volume held steady. They treat the budget like their own money.',
  },
  {
    name: 'Anika Tabassum',
    role: 'Founder',
    company: 'Skyline Interiors',
    rating: 5,
    quote: 'As a small studio we couldn\'t afford a full marketing department. For less than one salary we got strategy, ads, and a website that books consultations while we sleep. Best money we\'ve spent on the business.',
  },
  {
    name: 'Rezaul Karim',
    role: 'Managing Director',
    company: 'Meghna Apparel',
    rating: 4,
    quote: 'The first month felt slow because they insisted on research before spending. Then everything compounded: better targeting, faster site, cleaner funnel. Eight months in, online sales are our biggest channel.',
  },
];
