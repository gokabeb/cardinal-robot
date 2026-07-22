# Cardinal Website v4 — Visual System Rebuild

**Date:** 2026-07-21
**Status:** Approved by Karan (brainstorming session, 2026-07-21, via visual companion)
**Supersedes:** typography/hero/section-chrome decisions in `2026-07-18-cardinal-v3-polish-and-expansion-design.md` §3.2–3.5 where they conflict. The white+blue palette and fact-vault rules from that spec and `2026-07-11-cardinal-robot-website-design.md` remain in force.

## 1. Why

A design-review audit (2026-07-19/20) scored the v3 site A/A on a standard hierarchy/typography/spacing/AI-slop checklist. The user's own reaction to seeing it live was the opposite: "feels AI generated, not very simple, doesn't use spacing correctly, overall not designed well and professionally." The gap: the checklist caught decorative clichés (purple gradients, icon-circle grids) but missed **compositional** clichés — patterns common to the "serious engineering startup" flavor of AI-generated site rather than the "consumer SaaS" flavor:

1. The hero formula — giant centered headline, one-line subhead, two pill buttons, faint blueprint-grid texture behind it all.
2. A fake product screenshot — a hand-built "Cardinal Fleet Console" wrapped in fake browser chrome, manufacturing credibility for software that isn't being shown.
3. Numbered mono eyebrows ("01 — AT SCALE") — a specific, recognizable technical-startup signature.

This spec is the fix: a site-wide visual rebuild that removes these three patterns and tightens the typography and spacing system, while keeping everything that already worked (white+blue palette, the fact vault, the bento-grid signature element, the IA from v3).

## 2. Non-negotiable constraints (carried forward)

- **Palette:** white + blue role tokens only, unchanged from `globals.css` (`paper/panel/line/muted/body/navy`, `cardinal-*` scale). No new colors.
- **Facts:** every claim still traces to `src/data/` with a source; fact-vault tests (`tests/data.test.ts`) stay green throughout.
- **Static export:** the site remains a Next.js static export.
- **Scope:** site-wide — all 13 routes get the new system in one pass, not homepage-first.

## 3. What changes

### 3.1 Typography — Inter only, drop Space Grotesk entirely

Confirmed via the visual companion (`typography.html`, option A) against real Cardinal copy. Rationale: the user's own principle ("1–2 typefaces max") plus an explicit standing dislike of mixed font families — a second/third typeface is a font-*pairing* decision, and font pairing is itself one of the most template-recognizable choices a site can make. One confident family, multiple weights, reads as more deliberate than any pairing would.

- Remove `Space_Grotesk` import and `--font-space-grotesk` variable from `src/app/layout.tsx` and `src/app/globals.css`.
- `--font-mono: var(--font-space-grotesk)` (`globals.css:25`) is retired. There is no third face either (JetBrains Mono was previously reserved for "console/interface" chrome — the console chrome itself is being removed in §3.3, so there's nothing left that needs a monospace face). One typeface: Inter, at weights 400/500/600/700/800.
- **What replaces mono treatments (89 call sites of `font-mono` across the codebase):**
  - Numeric/stat readouts (bento numbers, spec tables, KPI cards): Inter with `font-variant-numeric: tabular-nums` (already a `.tabular` utility in `globals.css:84` — keep it, just drop the paired `font-mono`).
  - Eyebrows/labels/badges/tracking-wide chip text: Inter, weight 600, same `tracking-[0.2em]`/`tracking-[0.15em]` values already normalized in the v3 polish pass — just swap the font family.
  - Any literal "console" styling: removed along with the dashboard mock (§3.3) — nothing left needs to look like a terminal.
- `Eyebrow.tsx:5` (`font-mono text-xs uppercase tracking-[0.2em] text-cardinal-600`) → same classes minus `font-mono` (inherits Inter as the body default).
- Section eyebrows drop their numbered index. `SectionHeading`'s `index` prop and `Eyebrow`'s `index ? \`${index} — \` : ""}` logic (`SectionHeading.tsx:4-9`, `Eyebrow.tsx:3-8`) are removed; the 6 call sites passing `index="01"` etc. in `src/app/page.tsx` drop the prop. Section labels become plain text ("At scale", "Platform") with no numeric prefix.

### 3.2 Hero — full-bleed photo, text-anchored scrim, no grid texture

Confirmed via the visual companion across five rounds (`hero-composition.html` → `hero-gradient-variations.html` → `hero-d-legible*.html` → `hero-d2-fixed.html`). Final pattern, verified for legibility against the actual hero photo pixels (not just CSS math):

- **Layout:** full-bleed real photograph, content block bottom-left, left-aligned (not centered). Single eyebrow (plain text, no index), headline, one-line subhead, one primary CTA (pill button, per §3.4) — the current two-button hero simplifies to whichever single CTA fits the page's primary goal; a secondary link may appear as a plain text link rather than a second pill if the page needs one.
- **Legibility (the part that took real iteration — do not simplify away):** a single diagonal wash is not sufficient on its own — it fails wherever the text block happens to fall over a bright region of the photo, and where that failure point lands depends on the diagonal angle's geometry versus the text block's actual position, which is not reliably predictable from the gradient stops alone. The verified pattern is **two layered backgrounds**:
  1. A radial gradient anchored at the text block's position (bottom-left), sized generously to fully contain the eyebrow + headline + subhead + CTA with margin, opaque enough (~0.9 near the text, fading past the block's edge) that legibility is guaranteed regardless of what's in the photo underneath.
  2. A much lighter diagonal linear-gradient wash across the rest of the photo for overall mood/depth, low opacity, that doesn't fight the radial zone.
  - Reference values (tune per photo, verify with an actual screenshot crop of the text zone before shipping each hero — do not trust the gradient math without a visual check):
    ```css
    background:
      radial-gradient(620px 460px at 8% 100%, rgba(12,16,51,0.92) 0%, rgba(12,16,51,0.92) 38%, rgba(12,16,51,0.55) 62%, rgba(12,16,51,0) 85%),
      linear-gradient(115deg, rgba(12,16,51,0.35) 0%, rgba(12,16,51,0.12) 30%, rgba(12,16,51,0) 55%);
    ```
- **No blueprint-grid.** The `.blueprint-grid` class (`globals.css:46`) and every usage (17 files — every page hero, plus the home bento's financing cell) is removed. Backgrounds are plain white or the photo itself; nothing decorative behind text.
- **Applies to all 13 pages'** hero/intro sections, not just home — the scrim pattern and layout rule stay constant across pages. Which photo each page uses is an implementation-plan decision (curated the same way v3's Task 11 did: search, view every candidate, reject anything that fails the bar).
- **Pages without a suitable photo degrade gracefully — do not force one.** `/data-collection` was deliberately left photo-less in the v3 pass after a genuine search turned up nothing that met the curation bar (see `cardinal-website-launch-flags` memory). For any page in that position, the hero drops to plain white with the same left-aligned type/eyebrow/CTA layout and hairline-border rhythm (§3.4), no photo, no scrim. Re-running an exhaustive photo search is explicitly out of scope for this rebuild — if a good photo surfaces later, swapping it in is a small follow-up, not part of this plan.

### 3.3 Platform/console section — plain data cards, not a fake screenshot

Confirmed via the visual companion (`platform-section.html`, option A). `DashboardMock.tsx` (used at `src/app/page.tsx` and `src/app/platform/page.tsx`) and its surrounding fake-browser-chrome wrapper (traffic-light dots, "Cardinal Fleet Console" title bar) are deleted. Replaced with a plain stat grid — real numbers as large Inter typography in bordered cells, no chrome, continuing the same bento-grid visual language already established elsewhere on the site. Nothing on the page claims to be a product screenshot that isn't one.

### 3.4 Section rhythm — hairline borders, no grid texture, no tint bands

Confirmed via the visual companion (`section-rhythm.html`, option C). With the blueprint-grid texture gone, section boundaries are marked by a single 1px `border-line` top border between sections — not alternating background tints, not pure unbroken whitespace. Sections stay white throughout (existing `bg-panel/40` tints on specific sections like the "two doors" and lifecycle sections from v3 are unaffected — this rule governs the plain content-section separator pattern specifically, not every background treatment already in use).

### 3.5 Buttons — unchanged

Confirmed via the visual companion (`button-system.html`, option A — full pill, i.e. the status quo). `Button.tsx` needs no change: it already renders `rounded-full` in `font-display` (which already maps to Inter). The pill shape was part of the original template-formula critique only in combination with the centered/grid-texture/fake-dashboard hero; with those three removed, pills in isolation don't reproduce that pattern. No button-component work in the implementation plan.

### 3.6 Everything not listed above

Fleet category marquee, outcomes stat grid, the navy CTA band, the logo wall, footer: confirmed via direct question — these inherit the new system automatically (Inter-only type, hairline-border rhythm where they're plain content sections, pill buttons) with no dedicated redesign. They only change insofar as they currently reference `font-mono` or `blueprint-grid`, which get swapped per §3.1/§3.2 like everywhere else.

## 4. Out of scope

- Palette (stays white+blue, untouched).
- IA/navigation/page content (stays as shipped in v3 — this is a visual system pass, not a content pass).
- The logo wall's CDN/wordmark-fallback mechanism, the fact-vault data modules, and the contact form — untouched.

## 5. Testing

- Fact-vault tests (`tests/data.test.ts`) must stay green — this is a styling/component pass, no data changes.
- Add a test asserting no `font-mono` / `Space_Grotesk` / `blueprint-grid` references remain anywhere in `src/` (mirrors the existing hotlink-guard pattern in the test file) — a single source of truth that the rebuild is actually complete, not partially applied.
- Manual verification: every hero's text zone screenshotted and visually checked for legibility against its actual photo (per §3.2 — gradient math alone is not sufficient evidence) before a hero is considered done.
- `npm run build` must keep succeeding as a static export throughout.
