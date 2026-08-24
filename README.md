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
index.html            App entry
src/
  main.tsx            React root
  App.tsx             The full landing page (all sections)
  index.css           Tailwind + design tokens + custom styles
  components/ui/      shadcn/ui component library
  hooks/, lib/, pages/
public/
  logo.png            Brand logo (used in the navbar/footer)
  favicon.svg, robots.txt
```

The whole page lives in `src/App.tsx`, composed of section components:
`Navbar → Hero → Stats → Services → ServiceDetails → Work → Process → WhyUs → Team → FAQ → Footer`.

> A `Testimonials` section is defined but commented out in `Home()`. Uncomment
> `<Testimonials />` in `src/App.tsx` to enable it.
