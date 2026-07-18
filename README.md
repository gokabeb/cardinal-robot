# Cardinal Robotics Website

Static marketing site built with Next.js (App Router, static export), Tailwind CSS v4, and Framer Motion.

## Develop

    npm install
    npm run dev

## Test & build

    npm test        # data-integrity tests (the "fact vault")
    npm run build   # static export to out/

## Contact form

The contact form posts to Web3Forms. Set the key in `.env.local`:

    NEXT_PUBLIC_WEB3FORMS_KEY=your-key

Without the key, submissions show a visible error with a mailto fallback.

## Client logos

The trusted-by wall fetches brand marks from logo.dev. Set a publishable key in `.env.local`:

    NEXT_PUBLIC_LOGO_DEV_TOKEN=pk_...

Without the key (or when a logo 404s), each cell falls back to a styled text wordmark.

## Content rules

All factual claims (stats, specs, prices, credentials) live in `src/data/` and must trace to the
Fact Source Table in `docs/superpowers/specs/2026-07-11-cardinal-robot-website-design.md` (§9).
Do not add claims without a source.
