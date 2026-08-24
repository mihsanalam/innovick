/**
 * Single source of truth for the brand palette.
 *
 * The page runs on a deep navy-indigo ink rather than true black — it reads
 * more expensive next to the purple accent, and pure black made the dark
 * sections look flat. Purple is now an *accent* only: eyebrows, icons, glows.
 */
export const ink = {
  /** Headings, primary buttons, dark type on light backgrounds. */
  base: '#151a35',
  /** Dark section + footer background. Deeper than `base` so type still pops. */
  deep: '#0d1128',
  /** Deepest — used for the hero gradient floor. */
  well: '#0a0d1f',
  /** Body copy on light backgrounds. */
  muted: '#5c6178',
  /** Small caps labels, meta text. */
  faint: '#7a8199',
} as const;

export const surface = {
  /** Alternating light section background. */
  tint: '#f5f6fa',
  /** Hairlines and card borders on light backgrounds. */
  line: '#e6e8f0',
  /** Slightly softer hairline, for dividers inside cards. */
  lineSoft: '#eceef5',
} as const;

export const brand = {
  purple: '#8e31b5',
  purpleLight: '#b565d6',
  /** Purple that stays legible on the dark sections. */
  purpleOnDark: '#c27cdf',
} as const;

export const purpleGradient = 'linear-gradient(115deg, #8E31B5 0%, #B565D6 100%)';

/** Serif italic accent used for the second half of most headings. Nothing to load. */
export const serifAccent = "Georgia, 'Times New Roman', serif";

/** Faint white grid used on top of the dark sections. */
export const darkGrid = {
  backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
  backgroundSize: '46px 46px',
} as const;
