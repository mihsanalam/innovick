/**
 * The work gallery — one tile per image.
 *
 * ## Swapping in your own screenshots
 *
 * The eight images below are Unsplash placeholders, so the section doesn't look
 * empty. Replace them with your real work:
 *
 * 1. Create `public/work/` and drop the file in.
 * 2. Point `image` at it and **drop the `fit` line**:
 *    `image: '/work/meta-ads-roas.png'`
 * 3. Update `alt` to describe your screenshot, and `result` to the real number.
 *
 * ## `fit` — the one thing worth understanding
 *
 * - **`'contain'` (the default) — use this for screenshots.** The image is scaled
 *   to sit *inside* the tile, never cropped, with the tile colour as its frame.
 *   A wide Ads Manager grab and a tall phone screenshot both land correctly and
 *   no numbers get cut off the edge.
 * - **`'cover'` — use this for photos.** The image fills the tile edge to edge and
 *   gets cropped to fit, with a scrim behind the text. That's what the
 *   placeholders below use, because a photo looks better full-bleed and has no
 *   numbers to lose.
 *
 * Leave `image` off entirely and the tile falls back to a neutral results mock.
 *
 * Add or remove entries freely: the grid is 2-up on phones and 4-up from `md`, and
 * wraps to as many rows as you need. Multiples of four fill the last row neatly.
 *
 * TODO: replace all eight images, alt strings, and results with your own.
 */
export type WorkTile = {
  /** Path under `public/`, e.g. '/work/meta-ads.png'. Optional — see above. */
  image?: string;
  /** How the image sits in the tile. Defaults to 'contain'. See above. */
  fit?: 'cover' | 'contain';
  /** What the image shows. This is the alt text, so write it for a screen reader. */
  alt: string;
  /** Small caps label — the platform or discipline. */
  label: string;
  /** The one number worth reading. */
  result: string;
  /** Tile background. Also the colour behind a 'contain' image, and the load-time
   *  backdrop for a 'cover' one. Alternate light and dark for rhythm. */
  bg: string;
};

/** Tile backgrounds, alternating light and dark the way the reference layout does. */
const tile = {
  purple: '#e7dff2',
  ink: '#151a35',
  cool: '#e2e7f2',
  deep: '#0d1128',
} as const;

/**
 * Placeholder image helper — an Unsplash photo cropped to the tile's 4:5 portrait
 * at 2× the rendered width. Delete this once you're on your own screenshots.
 */
const stock = (id: string) =>
  `https://images.unsplash.com/${id}?w=600&h=750&q=72&auto=format&fit=crop`;

export const workShowcase: WorkTile[] = [
  {
    image: stock('photo-1611926653458-09294b3142bf'),
    fit: 'cover',
    alt: 'A phone screen showing a folder of social media apps',
    label: 'Meta Ads',
    result: '3.2× ROAS in 60 days',
    bg: tile.purple,
  },
  {
    image: stock('photo-1551288049-bebda4e38f71'),
    fit: 'cover',
    alt: 'A dark analytics dashboard filled with performance charts',
    label: 'Google Ads',
    result: 'Cost per lead down 41%',
    bg: tile.ink,
  },
  {
    image: stock('photo-1467232004584-a241de8bcf5d'),
    fit: 'cover',
    alt: 'A two-monitor desk setup, code on one screen and a page design on the other',
    label: 'Web Build',
    result: '6.0s → 1.6s load time',
    bg: tile.cool,
  },
  {
    image: stock('photo-1460925895917-afdab827c52f'),
    fit: 'cover',
    alt: 'A laptop showing a traffic dashboard with rising graphs',
    label: 'SEO',
    result: 'Organic traffic up 180%',
    bg: tile.deep,
  },
  {
    image: stock('photo-1493421419110-74f4e85ba126'),
    fit: 'cover',
    alt: 'A designer sketching layout ideas in a notebook beside a laptop and camera',
    label: 'Creative',
    result: 'Rebrand + content engine',
    bg: tile.cool,
  },
  {
    image: stock('photo-1563986768609-322da13575f3'),
    fit: 'cover',
    alt: 'Someone working across a laptop and a phone at a café counter',
    label: 'Short-Form',
    result: '1.4M organic views',
    bg: tile.deep,
  },
  {
    image: stock('photo-1611162617213-7d7a39e9b1d7'),
    fit: 'cover',
    alt: 'Brand and app icons rendered as 3D blocks on a dark background',
    label: 'Landing Page',
    result: '18% conversion rate',
    bg: tile.purple,
  },
  {
    image: stock('photo-1533750349088-cd871a92f312'),
    fit: 'cover',
    alt: 'A desk flatlay with a note reading "Marketing Strategy"',
    label: 'Automation',
    result: 'Replies inside 4 minutes',
    bg: tile.ink,
  },
];
