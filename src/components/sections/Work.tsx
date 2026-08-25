import { Reveal } from '@/components/common/Reveal';
import { workShowcase, type WorkTile } from '@/data/work';
import { serifAccent } from '@/lib/theme';

/**
 * The work gallery — a wall of screenshots.
 *
 * Centred heading over a grid of tiles, each holding one piece of proof: an ad
 * manager grab, a dashboard, a finished site, a creative. This replaced a stack of
 * four abstract project cards — a prospective client is trying to see the actual
 * output, so the actual output is what's on the page.
 *
 * All copy and images live in `src/data/work.ts` — drop files into `public/work/`
 * and point each tile's `image` at them. A tile with no image renders a neutral
 * results mock, so the section looks complete before anything's uploaded.
 */
export function Work() {
  return (
    <section id="work" className="bg-[#f5f6fa] py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#8e31b5]">PROVEN OUTPUT</span>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5.4vw,4.2rem)] font-extrabold leading-[1.04] tracking-[-.07em] text-[#151a35]">
              The receipts,{' '}
              <span className="text-[#9aa0b4]">not just the</span>{' '}
              <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>
                promises<span className="text-[#8e31b5]">.</span>
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-8 text-[#5c6178]">
              Screenshots straight from the ad managers, dashboards, and launches —
              real campaigns we've run, and the numbers our clients kept.
            </p>
          </div>
        </Reveal>

        {/* 2-up on phones, 4-up from md. Add or remove tiles in the data file;
            the grid just wraps. */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-5">
          {workShowcase.map((tile, i) => (
            <Reveal key={tile.alt} delay={(i % 4) * 0.06}>
              <WorkCard tile={tile} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * One tile.
 *
 * Two modes, set per tile by `fit` in the data file. A `'contain'` image is scaled
 * to sit inside the tile and never cropped — that's the mode for screenshots, where
 * cropping would cut off the numbers, and the tile colour becomes its frame. A
 * `'cover'` image fills the tile edge to edge, which is what photos want; that mode
 * adds a scrim and forces the text white, since there's no telling what colour the
 * photo is behind the caption.
 */
function WorkCard({ tile }: { tile: WorkTile }) {
  const cover = tile.fit === 'cover' && !!tile.image;
  // A cover photo dictates its own text colour; otherwise the tile colour does.
  const light = cover ? false : isLight(tile.bg);
  const strong = light ? '#151a35' : '#ffffff';
  const soft = light ? 'rgba(21,26,53,.62)' : 'rgba(255,255,255,.68)';

  return (
    <figure
      className="group relative flex aspect-[4/5] flex-col overflow-hidden rounded-[1.5rem]"
      style={{ backgroundColor: tile.bg }}
    >
      {cover ? (
        <>
          <img
            src={tile.image}
            alt={tile.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
          {/* Top-and-bottom scrim — the label and the result both sit over the
              photo, so both ends need something to sit on. */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1128]/55 via-[#0d1128]/10 to-[#0d1128]/85" />
        </>
      ) : (
        /* The screenshot — padded off the label and caption so nothing overlaps. */
        <div className="absolute inset-0 flex items-center justify-center px-5 pb-16 pt-14">
          {tile.image ? (
            <img
              src={tile.image}
              alt={tile.alt}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full rounded-lg object-contain shadow-[0_18px_40px_-16px_rgba(10,13,31,.5)] ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <ResultMock light={isLight(tile.bg)} />
          )}
        </div>
      )}

      {/* Platform label, top-left. */}
      <figcaption
        className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 font-mono-custom text-[10px] font-bold uppercase tracking-[.14em] backdrop-blur-sm"
        style={{ color: strong, backgroundColor: light ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.14)' }}
      >
        {tile.label}
      </figcaption>

      {/* The one number, bottom-left. */}
      <p
        className="absolute inset-x-5 bottom-5 z-10 font-display text-[15px] font-extrabold leading-tight tracking-[-.03em]"
        style={{ color: strong }}
      >
        {tile.result}
        <span className="mt-1 block font-mono-custom text-[10px] font-bold uppercase tracking-[.12em]" style={{ color: soft }}>
          Innovick · Result
        </span>
      </p>
    </figure>
  );
}

/**
 * Placeholder shown until a real screenshot is dropped in. A small neutral
 * "dashboard" card that reads on both the light and dark tile colours.
 */
function ResultMock({ light }: { light: boolean }) {
  return (
    <div className="w-full max-w-[190px] rounded-xl bg-white p-3 shadow-[0_18px_40px_-16px_rgba(10,13,31,.5)] ring-1 ring-black/5">
      <div className="flex items-center gap-1.5">
        <i className="h-1.5 w-1.5 rounded-full bg-[#e48c96]" />
        <i className="h-1.5 w-1.5 rounded-full bg-[#e9c77b]" />
        <i className="h-1.5 w-1.5 rounded-full bg-[#93c894]" />
      </div>
      <div className="mt-3 flex items-end gap-1.5">
        {[26, 38, 30, 50, 44, 62, 55, 78].map((h, n) => (
          <i key={n} className="flex-1 rounded-t bg-[#b565d6]" style={{ height: h, opacity: 0.35 + n * 0.08 }} />
        ))}
      </div>
      <div className="mt-3 h-2 w-3/4 rounded-full bg-[#e6e8f0]" />
      <div className="mt-1.5 h-2 w-1/2 rounded-full bg-[#eef0f6]" />
      {/* `light` only nudges the footprint tint so the mock never floats on the tile. */}
      <div className="mt-3 h-6 rounded-md" style={{ backgroundColor: light ? '#f4eefb' : '#f0f1f6' }} />
    </div>
  );
}

/** Relative-luminance check, so a tile's overlay text flips to suit any bg hex. */
function isLight(hex: string): boolean {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return true;
  const [r, g, b] = [m[1], m[2], m[3]].map(h => parseInt(h, 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.5;
}

export default Work;
