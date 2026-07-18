# Cardinal Website v3 — Polish Pass + Page Expansion

**Date:** 2026-07-18
**Status:** Approved by Karan (conversation, 2026-07-18)
**Builds on:** `2026-07-11-cardinal-robot-website-design.md` (fact table §9 remains authoritative for pre-existing claims)

## 1. Goal

Bring the site to Palantir/Anduril/medra.ai-level polish — cleaner, smoother, more
professional — and expand the information architecture to nine content pages. The
existing white + blue institutional system, the home bento grid, and the section
order of the landing page are keepers; everything else may be refined.

## 2. Non-negotiable constraints (carried forward)

- **Fonts:** Inter (display + body), Space Grotesk (technical accents), JetBrains
  Mono (code-like UI) — no other typeface may render anywhere, including consoles,
  dashboard mocks, and chart labels.
- **Palette:** white + blue only, role tokens in `globals.css`
  (`paper/panel/line/muted/body/navy`, `cardinal-*` scale from logo ink `#141F7A`).
- **Verified facts only:** every stat/claim lives in `src/data/` and traces to a
  source. New claims from this project are sourced "founder-provided 2026-07-18".
  The data-integrity tests (fact vault) must be extended, not weakened.
- **Static export:** the site remains a Next.js static export; no server code.

## 3. Visual system changes

### 3.1 Gradient & transparency reduction
- Remove the full-bleed image + white gradient wash treatment ("Why Cardinal"
  section). Replace with: pure white section, text column left, photo right in a
  crisp bordered frame that slides in with a short (~350 ms) ease-out. No parallax
  haze, no overlay.
- Site-wide audit: the only remaining translucent surface is the glass header
  (and its dropdown). Floating stat chips over the hero image become solid
  white-on-border chips. Marquee edge masks may stay (they are masks, not
  gradients on content).

### 3.2 Typography lockdown
- Audit every component for stray font stacks; `DashboardMock` and any
  console/interface chrome get explicit `font-mono` (Space Grotesk /
  JetBrains Mono) + `tabular-nums` on all numerals.
- Type scale is unified: one display scale (Inter, tracking −0.02/−0.03em),
  one body size per context, mono eyebrows at a single tracking value
  (0.2em) everywhere.

### 3.3 Imagery
- Replace all hotlinked Unsplash URLs with curated, self-hosted stock photos in
  `public/images/` showing actual commercial service robots (delivery robots in
  restaurants/hotels, floor scrubbers in lobbies, UV-C in hospitals, warehouse
  AMRs). No AI-generated imagery. Consistent `img-tone` treatment.
- Every page gets at least one real photo; diagrams remain in-house SVG/JSX.

### 3.4 Motion vocabulary
- One shared easing/duration set (fast: 150 ms, standard: 350 ms ease-out,
  reveal: existing `Reveal`/`Stagger` timings) — no bespoke curves per section.
- `prefers-reduced-motion` support preserved everywhere.

### 3.5 Brand presence
- Cardinal mark: header (slightly larger), footer, CTA band, console chrome,
  category ticker (existing). Favicons already in `public/brand/`.

## 4. Trusted-by logo wall (new)

- **Data:** `src/data/clients.ts` — one unified list (per Karan: single
  "Trusted by" wall), each entry `{ name, domain }`. Names (corrections
  applied): SoftBank, Pudu Robotics, Gausium, GA Capital, Apple, Sutter Health,
  Stanford Hospital, Bank of America, CBRE, Compass Group, Voltai, MKS,
  Marriott, Hilton, Disney, MGM Resorts, Caesars Entertainment, Marsden
  Services, Cushman & Wakefield. **"Cuarvo" is held out** until Karan confirms
  the exact name. Source: founder-provided 2026-07-18.
- **Rendering:** `LogoWall` component fetches real logos from logo.dev
  (`NEXT_PUBLIC_LOGO_DEV_TOKEN` publishable key; README documents setup).
  Per-cell `onError` fallback renders the brand name as a clean Inter wordmark —
  the wall never shows a broken image, and works without the token.
- **Interaction:** resting state grayscale ~55 % opacity; hover pops the logo to
  full color with a slight scale-up and a floating brand-name label. Mobile:
  slow two-row marquee.
- **Placement:** home section 2 (hero → trusted-by → bento), and a compact reprise
  at the end of About ("We proudly serve…").

## 5. Information architecture

**Header nav:** Robots · Financing · Services ▾ (Servicing, Insurance & Shipping) ·
Trust ▾ (Cyber Security, US Assembly) · Technology ▾ (Data Collection, Research &
Development, Platform) · About · **Contact** (button).

**Industries** remains a page, linked from the footer and the Robots page only.

### Pages and content (new claims → `src/data/`, founder-provided)

| Page | Route | Content |
|---|---|---|
| Robots | `/robots` (+ categories) | Existing catalog, restyled; the complete robot reference. |
| Financing | `/financing` | Stat trio: **$800 M capital · <5 % annualized rate · 0 % dilution**. |
| Servicing | `/servicing` | 24/7 support line; veterans upskilled into robot technicians; **3,000+ technicians** (canonical count site-wide — supersedes the 1,000/2,000 figures); unlimited servicing. |
| US Assembly | `/us-assembly` (new) | Assembled in the USA; onshore manufacturing; secure systems & supply-chain assurance; engineers from Rivian, Intel, Tesla, JCI; DFM + DFS capabilities offered to all OEMs. |
| Cyber Security | `/security` (rebuilt) | SOC 2 + ISO 27001 certified; "robots operate without Wi-Fi — all data stays on U.S. servers, 100 % audited" (softened wording, approved). |
| Data Collection | `/data-collection` (new) | 400+ engineers in India; 24/7 data operations; global presence. |
| Research & Development | `/research` (new) | Stanford PhDs; 5+ patents granted; three Stanford spinouts; 25 R&D engineers; in-house design, engineering, integrations. |
| Insurance & Shipping | `/insurance-shipping` (new) | Three alternating text/image sections per Karan's mock: **Dedicated Insurance**, **US Shipping of Robots**, **Warehousing & Parts** (elevator/IoT/door/API integrations). Copy written fresh (mock copy was placeholder); no invented stats. |
| About | `/about` (rebuilt) | "The nation's largest robotics deployment company" (softened, approved); Stanford spinout; Palo Alto HQ; founders with PhDs from Stanford, MIT, Berkeley; 400+ engineers in India; 3,000+ U.S. technicians, many disabled veterans; closes with client wall reprise. |
| Platform | `/platform` | Kept, restyled only. |
| Industries | `/industries` | Kept, restyled only; footer-linked. |
| Contact | `/contact` | Kept, restyled only. |

## 6. Components

- `src/data/clients.ts` — brand list (name, domain, source).
- `src/components/ui/LogoWall.tsx` — CDN logo grid + wordmark fallback + hover pop; marquee variant for mobile.
- New pages follow existing composition: `Eyebrow`/`SectionHeading`/`Card`/
  `CTAPanel`/`Reveal`/`Stagger` — no parallel component systems.
- `src/data/navigation.ts` — grouped dropdown structure (Header already supports
  a dropdown; extend to multiple).

## 7. Error handling

- Logo CDN failure → wordmark fallback per cell (no layout shift: fixed cell size).
- Missing `NEXT_PUBLIC_LOGO_DEV_TOKEN` → wall renders entirely as wordmarks.
- Contact-form behavior unchanged (visible error + mailto fallback).

## 8. Testing

- Extend data-integrity tests to cover `clients.ts` and each new data module
  (every claim has `source`; technician count asserted equal everywhere it appears).
- `npm run build` (static export) passes; no hotlinked images remain
  (test greps `src/` for `images.unsplash.com`).
- Manual QA pass: 375 px/1440 px, reduced motion, keyboard nav on the new
  grouped dropdowns.

## 9. Out of scope

- "Cuarvo" logo (pending name confirmation).
- Self-hosting decision for logo CDN images (revisit before launch).
- Pricing sign-off and Web3Forms key (tracked in launch flags memory).
