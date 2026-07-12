# Cardinal Robotics Website — Design Spec

**Date:** 2026-07-11
**Status:** Approved pending user review
**Replaces:** https://www.cardinalrobot.com/ (current PHP-template site)

## 1. Overview

A complete rebuild of the Cardinal Robotics marketing website as a modern, dark, cinematic, multi-page site in the caliber of medra.ai / palantir.com. The site presents Cardinal's full Robots-as-a-Service business: sourcing, deploying, training, servicing, securing, and financing commercial robots.

**Hard constraint — verified facts only.** Every stat, spec, price, credential, and claim on the new site must trace back to content on the existing cardinalrobot.com. No invented numbers, customers, or testimonials. Where the current site contradicts itself, the version from the most authoritative page wins (recorded in the Fact Source Table, §9). All facts live in typed data files with source annotations so they are auditable in one place.

## 2. Goals & Success Criteria

- Convert two audiences equally: **facility operators** (rent/deploy robots) and **robotics companies** (financing + nationwide service network).
- Look professionally art-directed — "took weeks to build" — while staying snappy: Lighthouse performance 90+ desktop and mobile.
- Comprehensive: ~10 routes covering everything the company does, with real spec depth.
- Fully responsive, `prefers-reduced-motion` respected, branded 404, no dead links (unlike the current site).

## 3. Architecture

- **Stack:** Next.js (App Router) + Tailwind CSS + Framer Motion. TypeScript strict.
- **Output:** `output: 'export'` static export — hostable on Vercel/Netlify/S3/anything.
- **Content:** all copy-facts centralized in `src/data/*.ts` typed files; pages render from data. `robots/[category]` pages generated via `generateStaticParams` from `categories.ts`.
- **Diagrams:** built as SVG/canvas React components (no raster images) — crisp, animatable, theme-aware.
- **Imagery:** no photography. Custom diagrams, stylized robot silhouette illustrations, CSS-built dashboard mocks, blueprint-grid textures.
- **Forms:** contact form posts to Web3Forms; on failure, visible error state + `mailto:` fallback. Finance CTA also exposes finance@cardinalrobot.com directly.

### Project structure

```
src/
  app/                    # 10 routes + not-found.tsx, static export
  components/
    layout/               # Header (sticky translucent nav + Robots dropdown), Footer, MobileMenu
    ui/                   # Button, SectionHeading, Eyebrow, StatCounter, Badge,
                          # SpecTable, Card, CTAPanel
    diagrams/             # FleetGridCanvas, LifecycleDiagram, SecurityFlowDiagram,
                          # USCoverageMap, DashboardMock, RoadmapTimeline
    motion/               # Reveal, Stagger, CountUp (Framer Motion wrappers)
  data/                   # robots.ts, categories.ts, industries.ts, stats.ts,
                          # roadmap.ts, navigation.ts, security.ts, servicing.ts, financing.ts
  lib/                    # cn(), formatters
```

## 4. Sitemap & Information Architecture

| Route | Purpose |
|---|---|
| `/` | Cinematic hero, stat band, dual-track "two doors," fleet showcase, lifecycle teaser, outcomes, trust band, CTA |
| `/platform` | The RaaS lifecycle: Source → Deploy → Train → Service → Report → Finance; ends with fleet-dashboard mock |
| `/robots` | Filterable catalog of 24 models across 8 categories |
| `/robots/[category]` | 8 category pages with model spec tables (vacuuming, scrubbing, delivery, disinfection, security, outdoor, food-beverage, specialty) |
| `/industries` | Anchored sections w/ sticky side-nav: hotels, hospitals, casinos (with FTE table), senior living, schools & offices |
| `/servicing` | Nationwide network: 3,000+ techs, coverage dot-map, SLA/maintenance/help-desk columns, cert badges |
| `/security` | SDK data-flow diagram, security feature grid, compliance wall |
| `/financing` | Cardinal Finance: $800M facility as spec sheet, eligibility, 3-step process |
| `/about` | Mission/vision, team credentials, 2025–2026 roadmap timeline |
| `/contact` | Split layout: pitch + links left, form right (interest dropdown: rent robots / servicing / financing / other) |

**Navigation:** sticky dark translucent header — Platform, Robots (dropdown of 8 categories), Industries, Servicing, Security, Financing, About + "Get in Touch" button. Mega-footer with full sitemap, compliance badges, YouTube (@cardinalrobotics4147), © Cardinal Robotics.

**Dual-track:** homepage "two doors" panels — *Deploy robots in your facility* → /robots and *Scale your robotics company* → /financing.

## 5. Visual Design System

**Color**
- Backgrounds: `#0A0A0B` base, `#111114` raised, `#1A1A1F` borders
- Text: `#F5F5F4` headings, `#A1A1AA` body, `#63636B` captions
- Accent: cardinal red `#D6453D` (hover/glow `#F05941`) — CTAs, diagram highlights, live-data points only
- Status green `#3ECF8E` — reserved for "operational/online" indicators

**Type** (self-hosted Google Fonts)
- Space Grotesk — display/headings (hero sizes 80–120px desktop)
- Inter — body/UI
- JetBrains Mono — stat labels, spec values, eyebrows (`// 01 — DEPLOYMENT`), diagram annotations

**Texture:** faint blueprint grid backgrounds, 1px borders over shadows, red glow only behind hero elements, scan-line/crosshair diagram decorations. Backdrop blur only on sticky nav.

**Motion:** fade + 20px rise reveals (0.5s, 80ms stagger); CountUp stats on scroll-into-view; SVG line-draw via stroke-dashoffset; 150ms hovers (border→red, slight lift); max one "hero moment" per page; `prefers-reduced-motion` collapses everything to fades.

**Voice:** confident, compressed enterprise copy. Short declarative sentences. No exclamation marks. Specifics over adjectives.

## 6. Page-by-Page Content Plan

### Home (8 sections)
1. **Hero** — full viewport; canvas fleet-grid backdrop (pulsing US deployment dot-map). Headline: "The robotic workforce, fully operational." Sub: "Cardinal sources, deploys, services, and finances commercial robots — so your team doesn't have to." CTAs: *Explore the fleet* / *Talk to us*.
2. **Stat band** — animated counters: 35,000+ robots deployed · 3,000+ certified technicians · 500+ hospitals served (UV-C) · $800M financing facility.
3. **Two doors** — dual-track panels (see §4).
4. **Fleet showcase** — horizontal-scroll category cards (8), each with silhouette illustration + headline spec.
5. **Lifecycle teaser** — 6-step self-drawing horizontal SVG → /platform.
6. **Outcomes strip** — 3 proof cards from existing site claims only: disinfection time cut from 20+ min to under 10 min; Room Delivery System saves 560+ labor hours/month; workforce support during labor shortages.
7. **Trust band** — SOC2 · ISO 27001 · HIPAA · GDPR badges + "DoD-compliant data security."
8. **Final CTA panel** — "Put robots to work."

### Platform
Vertical scroll narrative; each lifecycle phase (Source, Deploy, Train, Service, Report, Finance) is a numbered full-width block with a small diagram. Train phase carries the "Upskilling every janitor to robot operator" story. Ends with **DashboardMock**: stylized CSS dashboard (uptime, coverage, KPIs, ROI reports — capabilities listed on current servicing page).

### Robots + 8 category pages
Catalog: filter bar (by category), 24 model cards (name, category, one-liner, 2 headline specs). Category pages: hero, SpecTable per model with real extracted specs, "ideal for" industry chips, related categories. Models per category:
- **Vacuuming:** V40, Whiz, V20, V10, Mini Vacuum
- **Scrubbing:** S50 Pro, Sweeper, Scrubber, S75 (garage)
- **Delivery:** D10, D20, Room Delivery System, Titan
- **Disinfection:** UV-C robot (500+ hospitals)
- **Security:** patrol/security drone
- **Outdoor:** window-washing/pressure-washing drone, trash sorting
- **Food & Beverage:** Smoothie Robot, Salad Robot
- **Specialty:** Pool cleaning (120 ft & 50 ft), Indoor window cleaning, Robotic Masseuse, KettyBot

### Industries
Sticky side-nav, 5 anchored sections: Hotels, Hospitals, Casinos, Senior Living, Schools & Offices (industries listed on current site; spas/conventions folded into hotels section copy). Casino section: restyled dark data table of FTE reductions (room delivery 1–1.5 FTE; linen 1–2 FTE; pool 0.25–0.5 FTE; guest-room vacuuming 0.25 FTE; garage flat 20% cost reduction). Each section: narrative + relevant robot chips + metric callout.

### Servicing
Hero: "Enhance your robot workforce uptime." Stylized US coverage dot-map (3,000+ service professionals). Three columns: Preventative Maintenance & Break-Fix / 24-7 Help Desk (Level 1 & 2) / Training & Upskilling. Technician cert badges: A+, Net+, MCSE, Mobility+, CompTIA, Security+. Remote diagnostics & monitoring feature row. ISO 27001 note.

### Security
**SecurityFlowDiagram:** robot → mTLS → Cardinal cloud → operator dashboard, animated data-flow pulses. Feature grid from current security page: mutual TLS 2-way auth + encryption; authorized-servers-only communication; dynamic ACLs; checksum/signature verification of actions; RBAC + least privilege; SSO options; encryption at rest & in transit; on-prem deployment option; multi-tenancy with data isolation; firewalls + IDS/IPS; customizable data retention; remote diagnostics with permission; firmware updates; asset immobilization; device logging. Compliance wall: SOC2, ISO 27001, HIPAA, GDPR.

### Financing
Headline: "$800M. Non-dilutive. Built by roboticists." Terms as spec sheet: fund $800M · check size $500K–$50M per deployment · discount rate 3–5% annually · 0% equity dilution · no liens, personal guarantees, or balance-sheet restrictions · decisions within 2 business days · for US growth-stage robotics & IoT companies · designed for RaaS/HaaS models. 3-step process. CTA: form + finance@cardinalrobot.com.

### About
Mission: "Augmenting your existing workforce with best-in-class robots to solve your problems and needs." Vision: "Robots are here to make our lives easier. We are here to help you get there." Team: PhDs, MBAs, and robotic experts from Stanford and Berkeley with build + deploy experience. Problem framing: labor shortage / hiring & retention. **RoadmapTimeline** (vertical): 2025 — garage cleaning, automated wok, outdoor window cleaning, automated forklift; 2026+ — teleoperated bed making, bathroom cleaning, high dusting; trash sorting.

### Contact
Split layout. Left: pitch + finance@cardinalrobot.com + YouTube. Right: form (name, company, role, interest dropdown [rent robots / servicing / financing / other], message) → Web3Forms.

### 404
Branded not-found: mono eyebrow `// SIGNAL LOST`, link home.

## 7. Key Components

| Component | Behavior |
|---|---|
| `FleetGridCanvas` | Homepage hero backdrop; canvas US dot-map, dots pulse; pauses off-screen; static under reduced-motion |
| `LifecycleDiagram` | Horizontal 6-node SVG, stroke-draw on scroll |
| `SecurityFlowDiagram` | 4-stage flow with animated pulses along paths |
| `USCoverageMap` | Static dot-density map with red service-hub markers |
| `DashboardMock` | Pure CSS/JSX fleet dashboard; green status dots, mono KPI figures |
| `RoadmapTimeline` | Vertical timeline, year markers, reveal on scroll |
| `StatCounter` | Counts up on first scroll-into-view |
| `SpecTable` | Mono values, unit-aligned, responsive collapse to cards |
| `Reveal`/`Stagger` | Framer Motion wrappers implementing the motion language |

## 8. Error Handling & Testing

- **Form:** explicit success and error states; error state shows mailto fallback. No silent failures.
- **Build gate:** `next build` (static export + TS strict) must pass; broken internal links are compile-time errors where derived from `navigation.ts`/`categories.ts` data.
- **Manual pass:** every route at 375px and 1440px; keyboard nav through header/footer/form.
- **Performance:** Lighthouse 90+ performance target; fonts self-hosted + `font-display: swap`; canvas animation capped and paused off-screen.
- **Reduced motion:** verified via emulation.

## 9. Fact Source Table (conflicts resolved)

| Claim used | Source page | Conflict resolution |
|---|---|---|
| 35,000+ robots deployed | Home, Finance | — |
| 3,000+ technicians/service professionals | Home, Servicing | Finance page says 2,600+; Servicing page (authoritative for service network) says 3,000 → use 3,000+ |
| Team: Stanford & Berkeley PhDs/MBAs | About | Finance page says Stanford & MIT; About page is authoritative for team → Stanford & Berkeley |
| Rentals from $2.99/hr (vacuuming) | Home | RaaS page says from $5/hr; use Home's "as low as $2.99/hr" scoped to vacuuming/cleaning, as originally stated |
| Financing: $800M, $500K–$50M, 3–5%, 0% dilution, 2-day decisions, non-dilutive/non-debt, no liens/guarantees | Finance | Home says "5% annualized interest"; Finance page (authoritative) says 3–5% |
| UV-C used across 500+ hospitals | RaaS | — |
| SOC2, ISO 27001, HIPAA, GDPR | Home, Security | — |
| DoD-compliant data security | RaaS | — |
| All robot model specs (V40, S50 Pro, Titan, Room Delivery, drone, smoothie, masseuse, pool, etc.) | RaaS | Used verbatim from product listings |
| Casino FTE table | RaaS | Used verbatim |
| Cert badges A+, Net+, MCSE, Mobility+, CompTIA, Security+ | Servicing | — |
| 24/7 support, L1/L2 help desk, remote diagnostics, KPIs/ROI reporting | Servicing | — |
| Security feature list (mTLS, ACLs, RBAC, on-prem, multi-tenancy, etc.) | Security | — |
| Mission/vision quotes, labor-shortage framing | About | — |
| Disinfection under 10 min (vs 20+), 560+ labor hrs/mo saved | Home testimonials, RaaS | Presented as outcome claims, not attributed quotes |
| Roadmap 2025/2026+ items | RaaS | — |
| finance@cardinalrobot.com, YouTube @cardinalrobotics4147 | Finance, Footer | — |
| Industries: hospitals, senior living, hotels, schools, casinos, spas, conventions | RaaS | Spas/conventions folded into Hotels section |
| No upfront costs; unlimited servicing | Home | — |

Anything not in this table does not appear as a factual claim on the site.

## 10. Out of Scope

- CMS, blog, careers pages, per-model detail pages (beyond category pages)
- Real photography, 3D/WebGL
- Backend services beyond the third-party form endpoint
- Analytics, cookie banners, legal pages (Terms/Privacy — current site's are placeholder links; needs real legal copy from the company later)
