# Innovick — Landing Page

A single-page marketing landing page for **Innovick**, built with React 19, Vite 7, Tailwind CSS v4, GSAP, and Framer Motion.

## Requirements

- Node.js 20+ (tested on Node 24)

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production into `dist/` |
| `npm run serve` | Preview the production build |
| `npm run typecheck` | Run the TypeScript type checker |

## Structure

```
index.html                     App entry
src/
  main.tsx                     React root
  App.tsx                      Providers + routing only
  index.css                    Tailwind, design tokens, custom classes
  pages/
    Home.tsx                   The landing page — section order lives here
    not-found.tsx
  components/
    sections/                  One file per page section (see below)
    layout/                    Navbar, Footer
    common/                    Reveal, Logo, Button, SectionHeading, CursorFollower
    visuals/                   MiniChart, PhoneMock, SearchMock, ServiceArt
    ui/                        shadcn/ui component library
  data/                        All copy and figures (see below)
  lib/
    theme.ts                   The colour palette, in one place
    gsap.ts                    Registers ScrollTrigger once
public/
  logo.png                     Brand mark (navbar + footer)
  founder.jpg                  Founder portrait — add your own
  team.jpg                     Wide team shot
  work/                        Your work screenshots — create this, see below
  favicon.svg, robots.txt
```

### Where to edit what

**Changing words or numbers?** Everything is in `src/data/` — no JSX to wade through.

| File | Holds |
| --- | --- |
| `data/site.ts` | Email, phone, WhatsApp, location, nav links, footer links, socials (label + URL + icon) |
| `data/services.ts` | The six stacked service cards (title, blurb, pills, optional `image`) and the four sticky capabilities |
| `data/work.ts` | The work gallery tiles — screenshot path, label, headline result, tile colour |
| `data/founder.ts` | Founder name, role, photo path, headline, proof figures |
| `data/proof.ts` | Headline stats and FAQs |
| `data/reviews.ts` | Video review cards — paste embed URLs into `videoUrl` |
| `data/diagnose.ts` | The five symptoms in the Diagnose section |
| `data/team.ts` | Team pills and the wide team photo (path, alt, caption) |

**Changing colours?** `src/lib/theme.ts` is the single source of truth: `#151a35`
ink, `#0d1128` for dark sections, `#8e31b5` brand purple used sparingly.

**Reordering sections?** Move a line in `src/pages/Home.tsx`. Each section owns
its own background and padding, so nothing else needs to change.

### Section order

```
Hero (white) → Stats → Services (tinted) → Founder → Capabilities
→ Work (tinted) → Diagnose (dark) → Team (dark) → VideoReviews (tinted)
→ FAQ → Contact (dark) → Footer
```

The dark bands are where the important buttons and claims sit, so they land
harder. The first six sections are light, so `Diagnose` carries the first switch
to dark — if you want it sooner, giving `Capabilities` the `#0d1128` treatment is
the natural place. `Team` runs dark too, right after `Diagnose`, and shows the
wide studio shot as a single framed photo rather than a grid.

The hero is white and completely static — no entrance animation, no ticker. The
one purple button is the only saturated thing above the fold, which is what makes
it read as the single next step. The glass header sits over it: translucent white
plus a heavy backdrop blur, going from 65% to 80% opaque once you scroll past 48px.

### The service stack (hand-rolled GSAP)

`Our services` pins itself and slides each card up over the last one. It's plain
GSAP — one `ScrollTrigger` with `pin: true` on `.services-stage`, scrubbing a
timeline of six `fromTo` tweens — and it runs on the **page** scroll. There is no
nested scroller, so the scroll can't get trapped: `pinSpacing` reserves the pin
distance, and once the sixth card lands the page carries straight on to `Founder`.

The cards are written as an ordinary vertical list in the JSX. `layout()` inside
the component is what turns them into a pile:

- measures the tallest card and gives all six that height, so the pile reads as a
  pile and no buried card pokes out from under the one on top of it
- leaves **card 0 in normal flow** — it alone defines the stage height, so nothing
  has to measure a height back onto the stage
- lifts cards 1–5 out with `position: absolute` and steps each one down by
  `STACK_OFFSET`, which is what leaves the previous card's top edge peeking above
  the incoming one

Two knobs at the top of `Services.tsx`: `STACK_OFFSET` (22px) for how much of each
buried card shows, and `segment()` for how much scroll each card costs
(`55vh`, floored at 320px). `MIN_PIN_TOP` keeps the pile clear of the 92px header;
above that the stack centres itself in the viewport.

Because every distance is derived from a measured height, the section re-measures
on `ScrollTrigger`'s `refreshInit` and once more after `document.fonts.ready` — a
late webfont swap would otherwise leave the pin length stale. Reduced-motion
visitors skip the hook entirely and get the plain vertical list.

Card copy, pills, and artwork all come from `src/data/services.ts`. The title's
**last word** is rendered in serif italic, so phrase titles with the word you want
emphasised last. Add `image: '/services/foo.png'` to an entry to replace the
generated `<ServiceArt />` tile cluster on that card.

### The work gallery — adding your screenshots

`Proven output` is a plain grid of tiles, one per screenshot: 2-up on phones,
4-up from `md`, wrapping to as many rows as you have work. No animation beyond the
scroll-in fade, because the screenshots are the content.

It ships filled with **eight Unsplash placeholder photos** so the section doesn't
look empty. They're hotlinked from `images.unsplash.com` — fine while you're
building, but replace them with your real work before you launch.

To add your own:

1. Create `public/work/` and drop the image in.
2. Add or edit an entry in `src/data/work.ts`, pointing `image` at it and
   **dropping the `fit` line**:

```ts
{
  image: '/work/meta-ads-roas.png',
  alt: 'Meta Ads Manager showing ROAS climbing over 60 days',
  label: 'Meta Ads',
  result: '3.2× ROAS in 60 days',
  bg: '#e7dff2',
}
```

Anything works — Meta or Google Ads Manager grabs, GA4 and Search Console
dashboards, ad creatives, finished sites, reels.

`fit` is the one field worth understanding:

- **`'contain'` (the default) — for screenshots.** The image is scaled to sit
  *inside* the tile and is **never cropped**, so a wide dashboard and a tall phone
  screenshot both sit correctly and no numbers get cut off the edge. The tile
  colour becomes the frame around them. This is why step 2 says to drop the line.
- **`'cover'` — for photos.** The image fills the tile edge to edge and gets
  cropped to fit, with a scrim behind the caption and the text forced white. It's
  what the placeholders use, because a photo looks better full-bleed and has no
  numbers to lose.

A tile with no `image` at all falls back to a neutral results mock, so a
half-finished row still looks deliberate. Nothing breaks either way.

`bg` takes any hex. The label chip and result caption pick their own colour from
it via a relative-luminance check in `Work.tsx`, so a tile stays readable whether
you give it `#e7dff2` or `#0d1128` — alternate light and dark for rhythm.

### The cursor follower

`src/components/common/CursorFollower.tsx` is the purple puck that trails the
mouse. It eases toward the pointer rather than tracking it — the lag is the
effect. Over anything clickable it swells and empties out, leaving just a ring
around what you're about to click.

It's mounted once in `src/pages/Home.tsx`. Tune it from the top of the file:
`FILL` is the resting gradient, `TARGETS` the selector list that triggers the
hover state, and the `0.15` / `0.12` inside `tick()` set how far behind the
pointer it runs. Pass `src` (`<CursorFollower src="/logo.png" />`) to put an
image inside it instead of the gradient.

It never runs on touch devices or for visitors who ask for reduced motion, and
it re-checks both — plugging in a mouse starts it without a reload.

## Before you go live

- [ ] Save the founder portrait to `public/founder.jpg` (until then the frame
      shows an initials placeholder — nothing breaks)
- [ ] Replace the eight Unsplash placeholder photos in `src/data/work.ts`: drop
      your screenshots into `public/work/`, point each tile's `image` at them, and
      remove the `fit: 'cover'` line so they're contained rather than cropped
- [ ] Real email, phone, and WhatsApp number in `src/data/site.ts`
- [ ] Real social profile URLs in `src/data/site.ts`
- [ ] Video embed URLs in `src/data/reviews.ts` (empty `videoUrl` shows a
      "coming soon" state on press)
- [ ] Confirm the stat figures in `src/data/proof.ts` and `src/data/founder.ts`,
      and the eight results in `src/data/work.ts`

Every one of these is marked with a `// TODO:` comment in the source.

## Backups

`src/App.tsx.bak` and `src/index.css.bak` are snapshots from before the
multi-file refactor. This project isn't in git, so they're the only way back to
the previous version — delete them once you're happy with the current site.
