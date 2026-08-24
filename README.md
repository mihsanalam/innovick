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
    common/                    Reveal, Logo, Button, SectionHeading
    visuals/                   MiniChart, PhoneMock, SearchMock, BrowserMock, CampaignFlow
    ui/                        shadcn/ui component library
  data/                        All copy and figures (see below)
  lib/
    theme.ts                   The colour palette, in one place
    gsap.ts                    Registers ScrollTrigger once
public/
  logo.png                     Brand mark (navbar + footer)
  founder.jpg                  Founder portrait — add your own
  favicon.svg, robots.txt
```

### Where to edit what

**Changing words or numbers?** Everything is in `src/data/` — no JSX to wade through.

| File | Holds |
| --- | --- |
| `data/site.ts` | Email, phone, WhatsApp, location, nav links, footer links, socials |
| `data/services.ts` | The six service cards and the four sticky capabilities |
| `data/projects.ts` | The stacked project cards |
| `data/founder.ts` | Founder name, role, photo path, headline, proof figures |
| `data/proof.ts` | Headline stats, hero ticker, comparison table, FAQs |
| `data/reviews.ts` | Video review cards — paste embed URLs into `videoUrl` |
| `data/diagnose.ts` | The five symptoms in the Diagnose section |
| `data/team.ts` | Team pills and the three gallery photos |

**Changing colours?** `src/lib/theme.ts` is the single source of truth: `#151a35`
ink, `#0d1128` for dark sections, `#8e31b5` brand purple used sparingly.

**Reordering sections?** Move a line in `src/pages/Home.tsx`. Each section owns
its own background and padding, so nothing else needs to change.

### Section order

```
Hero (dark) → Stats → Services → Founder (dark) → Capabilities → Work
→ Diagnose (dark) → Team → VideoReviews → WhyUs (dark) → FAQ → Contact (dark) → Footer
```

The rhythm is deliberate: two light sections, then a dark one. The dark bands
are where the important buttons and claims sit, so they land harder.

## Before you go live

- [ ] Save the founder portrait to `public/founder.jpg` (until then the frame
      shows an initials placeholder — nothing breaks)
- [ ] Real email, phone, and WhatsApp number in `src/data/site.ts`
- [ ] Real social profile URLs in `src/data/site.ts`
- [ ] Video embed URLs in `src/data/reviews.ts` (empty `videoUrl` shows a
      "coming soon" state on press)
- [ ] Confirm the stat figures in `src/data/proof.ts` and `src/data/founder.ts`

Every one of these is marked with a `// TODO:` comment in the source.

## Backups

`src/App.tsx.bak` and `src/index.css.bak` are snapshots from before the
multi-file refactor. This project isn't in git, so they're the only way back to
the previous version — delete them once you're happy with the current site.
