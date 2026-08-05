# Cardinal Robotics — Design System

The source of truth for visual decisions on this site. Tokens live in
`src/app/globals.css`; this file explains what they mean and when to use them.

Drift guards in `tests/data.test.ts` enforce the non-negotiable rules. If you
change a rule here, change the guard in the same commit.

---

## 1. Thesis

**Institutional, not startup. Evidence, not adjectives.**

Cardinal deploys 35,000+ robots and runs 3,000+ technicians. The design job is
to look like the company that already operates at that scale, not the company
raising money to try. That means: white space used with confidence, one blue
used sparingly and at full strength, real photography of real hardware, and
numbers presented as the artwork rather than decorated with it.

The memorable thing: **the number, set large, in the blue.** `$800M` on the home
page is the site's signature move. Everything else exists to make that moment
land.

**Anti-goals.** No purple. No gradient meshes. No decorative blobs. No
three-column icon grid where the icons are generic glyphs. No centered
everything. No second accent color introduced to "add energy."

---

## 2. Typography

### Family: Inter only

Inter is the display face and the body face. This is a deliberate,
previously-litigated decision (commit `e7a1ace`, "Inter-only typography, retire
Space Grotesk and font-mono") and it is guarded by a test.

Because there is no family contrast, **all typographic hierarchy must come from
size, weight, tracking, and color.** That raises the bar on getting the scale
right, which is what section 2.2 is for.

> **Guarded:** no `Space_Grotesk`, no `space-grotesk`, no `font-mono` anywhere
> in `src/`.

### 2.1 One heading weight

Every heading is **600 (`font-semibold`)**. No exceptions.

The site previously shipped headings at 700, 600, and 500 simultaneously, which
made the hero and the section headings look like they came from different sites.
At large optical sizes Inter 600 reads more institutional than 700 anyway; 700
at 72px reads loud.

Body text is 400. Numerals and stat values are 500 (`font-medium`) so they hold
weight without competing with headings.

### 2.2 Scale

| Token | Size | Line height | Tracking | Use |
|---|---|---|---|---|
| `text-display` | `clamp(2.75rem, 6vw, 4.5rem)` | 1.04 | `-0.035em` | Hero H1, CTA panel H2. One per page. |
| `text-title` | `clamp(1.875rem, 3.4vw, 3rem)` | 1.1 | `-0.028em` | Section headings. |
| `text-subtitle` | `1.375rem` | 1.25 | `-0.02em` | Card headings, sub-sections. |
| `text-lede` | `1.125rem` | 1.6 | `0` | Paragraph under a section heading. |
| `text-copy` | `1rem` | 1.65 | `0` | Default body. |
| `text-fine` | `0.9375rem` | 1.6 | `0` | Card body, dense lists. **Never below this for reading copy.** |
| `text-label` | `0.75rem` | 1.4 | `0.18em` | Uppercase eyebrows, column headers. |

**15px is the floor for anything a person reads in a sentence.** The site
previously set most card copy at 14px, which is why it read thin and
documentation-like. 12px is for labels only.

### 2.2.1 Never compose a type-scale class through `cn()`

`cn()` runs `twMerge`, and tailwind-merge treats everything matching `text-*` as
one conflict group. It cannot tell a custom font-size class from a colour, so

```
cn("text-title", "text-white")   // → "text-white". text-title is dropped.
```

The heading then falls back to inherited 16px, silently, with no build error and
no failing test. Compose type-scale classes with a template literal and keep
`cn()` for layout classes and incoming `className` props.

### 2.3 Numerals

Anything numeric that sits next to other numerals gets `.tabular`
(`font-variant-numeric: tabular-nums`) so columns align and `CountUp` does not
jitter while animating.

---

## 3. Color

### Palette

| Token | Hex | Role |
|---|---|---|
| `paper` | `#ffffff` | Page background. |
| `panel` | `#f6f8fd` | Alternating section background. |
| `line` | `#e3e8f5` | Hairlines, card borders. |
| `muted` | `#6a7194` | Labels, de-emphasized text. |
| `body` | `#414868` | Default body text. |
| `navy` | `#0c1033` | Headings, dark panels. |
| `cardinal-700` | `#141f7a` | Logo ink. Large display numerals. |
| `cardinal-600` | `#2136cc` | Primary action, links. |
| `cardinal-500` | `#3d52e8` | Hover, focus ring. |
| `cardinal-100` | `#dfe5fb` | Tint fills. |
| `cardinal-50` | `#f2f5ff` | Lightest tint, feature cell backgrounds. |
| `status` | `#0e9f6e` | Operational/success only. Never decorative. |

### The commitment rule

The failure mode of a white-and-blue system is that it becomes a white-and-grey
system with blue confined to 12px eyebrows and link text. That is what was
happening.

**Every page must have at least two and at most four moments where blue or navy
owns a full block**, not a text fragment. Candidates: a tinted bento cell, a
navy CTA panel, a large display numeral in `cardinal-700`, a filled diagram.
Between those moments the page stays quiet. Quiet is the point; the blue only
reads as strong if most of the page is not.

Corollary: diagrams and data artwork get real ink weight. A coverage map at 20%
opacity is not restraint, it is an unreadable artifact.

### 3.1 The surface ladder

Section rhythm (§4) fixes *vertical* rhythm. Tonal rhythm had the same
metronome problem and a worse symptom.

Sections were alternating with `bg-panel/40`. That composites `#f6f8fd` at 40%
over white to `#fbfcfe` — **1.03:1 against paper**, below the threshold where an
edge registers at all. Eleven of the home page's twelve sections were optically
one continuous white field. The alternation existed in the class list and
nowhere else.

Three rungs. Panel is used at full strength or not at all.

| Class | Value | Use |
|---|---|---|
| `.surface-paper` | `#ffffff` | Default ground. |
| `.surface-panel` | `#f6f8fd` | Connective sections, zebra lists — anything that needs a boundary rather than a statement. |
| `.surface-dark` | `#0c1033` | The one section per page that carries the argument. |

**Every page opens on a dark mass.** Pages with a `PhotoHero` already did. Pages
with a text hero take `.surface-dark` on the hero itself: eight of them were
opening white-on-white under a white nav, which is the weakest first screen this
system can produce.

**At most one `.surface-dark` per page**, and never adjacent to the CTA panel,
which is itself navy. A page long enough to earn a second dark moment takes it at
the midpoint rather than the top. The home page is the only one that qualifies
and it spends it on the lifecycle diagram, where white line on navy carries
what navy line on white could not.

`/contact` is the documented exception. A dark ground behind form inputs costs
more legibility than the rhythm is worth, and the form is the page.

Text and line-work on `.surface-dark` do not simply invert:

- Headings go white; lede and body go `white/70`.
- Eyebrows step from `cardinal-600` to `cardinal-100`. `#2136cc` on navy is
  about 1.8:1.
- Diagram lines go white, not blue. `cardinal-500` on navy is about 2.7:1, under
  the 3:1 WCAG 2.2 asks of a graphic object. Blue moves to the nodes, where a
  white stroke holds it off the ground.
- Buttons go `bg-white text-navy`. A solid `cardinal-600` button on navy is the
  same 1.8:1 problem.

> **Guarded:** no `bg-panel/<n>` fractional opacity anywhere in `src/`; at most
> one `.surface-dark` per page; every page but `/contact` carries a dark anchor.

---

## 4. Space

### Section rhythm

Three sizes, not one. A page that uses a single vertical padding value for every
section scrolls like a metronome, and uniform rhythm is the single strongest
"machine-generated" signal a layout can carry. Variance is where editorial
judgment shows.

| Class | Padding | Use |
|---|---|---|
| `.section-tight` | `py-16 sm:py-20` | Bands, tickers, trust strips, anything that is connective tissue. |
| `.section` | `py-20 sm:py-28` | Default. Most sections. |
| `.section-loose` | `py-28 sm:py-40` | The one or two sections per page that carry the argument. |

**At most one `.section-loose` per page**, two if the page is long. If
everything is loose, nothing is.

### Containers

- `max-w-7xl` (1280px): grids, bento, catalogs.
- `max-w-6xl` (1152px): CTA panel, footer.
- `max-w-2xl` (672px): section heading blocks and any measure of reading text.

Reading copy never exceeds ~72 characters.

### Radius scale

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `8px` | Badges, chips, dropdown rows. |
| `--radius-md` | `12px` | Cards, images, most surfaces. |
| `--radius-lg` | `20px` | CTA panel and full-width feature panels only. |
| `rounded-full` | — | Buttons, pills, stat chips. |

`rounded-2xl` on every surface is a template tell. The large radius is a
signal, so it has to be rare to mean anything.

---

## 5. Motion

The primitives (`Reveal`, `Stagger`, `WordReveal`, `CountUp`, `Parallax`) all
respect `prefers-reduced-motion`. Keep it that way.

### The motion budget

**At most 3 scroll-triggered reveals per page.** The site previously wrapped
nearly every section in `Reveal`, which turns entrance animation into wallpaper.
When everything animates, nothing is emphasized. Spend the budget on the
sections that carry the argument and let the rest render immediately.

Prefer motion that *shows something* over motion that just delays something:
a lifecycle line drawing itself, coverage dots populating, and a counter
counting all communicate. A generic 20px fade-up does not.

### Hero copy renders without JS

The hero headline must not start at `opacity: 0` waiting on hydration. On a slow
connection that shows a bare photograph as the largest contentful paint. Hero
entrance is CSS-only; JS-driven entrance is for below-the-fold content that has
time to hydrate.

### Durations

- Micro-interactions (hover, color): 120-150ms.
- Entrances and transforms: 400-550ms, `easeOut` or `cubic-bezier(0.16,1,0.3,1)`.
- Marquees: 40-64s per loop, always `pauseOnHover` when the contents are links.

---

## 6. Imagery

### Rules

1. **Never reuse the same photograph twice on one page.** Alt text describes
   what is actually in the frame; if two placements need different alt text,
   they need different photographs.
2. **No legible third-party branding.** Hero and section photography must not
   show another company's marks, facility signage, or asset tags. Retouch or
   re-source.
3. **Every robot in the catalog gets a product image.** `/robots` is the
   commercial page. A 24-item text grid is a spreadsheet, not a catalog.
   Consistent crop (1:1), consistent background, consistent lighting.
4. **Tone treatment is `img-tone`**: `saturate(0.85) contrast(1.03)`. Enough to
   sit in the palette, not so much that hardware reads as grey. (Was 0.72, which
   drained the photography.)

### Delivery

The site is a static export (`output: "export"`, `images.unoptimized: true`), so
`next/image` provides no runtime optimization. Responsive variants are generated
at **build time**:

```
npm run images     # sharp → public/images/opt/{name}-{w}.{avif,webp}
```

Use the `<Photo>` component, which emits `<picture>` with AVIF/WebP/JPEG
sources, explicit `width`/`height` to reserve layout, and `loading="lazy"` by
default. The hero passes `priority` to get `fetchpriority="high"` and eager
loading.

Source JPEGs stay in `public/images/`. Generated variants in
`public/images/opt/` are build output and are gitignored.

### Video

A muted looping clip of hardware actually operating outperforms any static
section on a robotics site. When adding video:

- Under 3MB, H.264 MP4 plus WebM.
- `autoplay muted loop playsinline`, `poster` set to the equivalent still.
- Under `prefers-reduced-motion: reduce`, render the poster and do not autoplay.
- Never carries audio, never blocks content behind a load.

### Implementation

`<HeroVideo>` layers the clip **over** the hero `<Photo>` rather than replacing
it. The still stays the largest contentful paint, so §5 still holds: the
headline never waits on a video download. Under reduced motion the `<video>` is
not mounted at all, which is stronger than mounting and pausing.

**The still must be a frame of the clip**, not a different photograph. Otherwise
the alt text, what a reduced-motion visitor sees, and what the video fades into
describe three different scenes. Use frame 0 so the fade-in and the loop restart
are both seamless.

Generator output is not shippable as-is — the 5s 1080p source for the current
hero arrived at 4.88MB *with an AAC track*, despite a silent prompt. Re-encode:

```
ffmpeg -y -i src.mp4 -an -c:v libx264 -preset slow -crf 27 \
  -maxrate 3600k -bufsize 7200k -pix_fmt yuv420p -movflags +faststart out.mp4
ffmpeg -y -i src.mp4 -an -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 out.webm
ffmpeg -y -ss 0 -i src.mp4 -frames:v 1 -q:v 2 poster.jpg
```

That produced 0.54MB and 0.24MB. `-an` is not optional: check with
`ffprobe -select_streams a`, because `mdls` reports no audio even when a track
is present.

### Scrim contrast is measured, not eyeballed

Text over video must clear 4.5:1 **at every frame of the loop**, not just the
poster. Measure the backdrop with the copy hidden — antialiased glyph edges over
a dark ground read as ~2:1 mid-greys and will produce a false failure.

The home hero's original bottom-anchored radial measured **1.56:1** at the top
of the text block. A left-anchored text block that runs tall needs a `to right`
gradient guarding the left column at every height, not only a bottom-left
radial. It now measures 11.86:1 across the loop.

---

## 7. Components

| Component | Rule |
|---|---|
| `Button` | Two variants only: `solid` (cardinal-600 fill) and `outline`. Always `rounded-full`. Never a third variant; use a plain link for tertiary actions. |
| `Card` | `--radius-md`, `border-line/70`, `bg-paper`. Hover changes border color only. Cards do not lift and glow at the same time. |
| `Eyebrow` | `text-label` + a 6px square bullet in `cardinal-600`. One per section, above the heading. Takes `tone="dark"` on `.surface-dark`. |
| `SectionHeading` | Eyebrow, `text-title` heading, optional `text-lede`. Max width `2xl`. Left-aligned by default; centered only inside the CTA panel. Pass `tone="dark"` on `.surface-dark` rather than hand-rolling white text classes at the call site. |
| `IconCheck` | Schematic line-work: 24px grid, 1.5px stroke, square caps, mitred joins, `currentColor`, no fill. Inline marks *inside* lists only — never a glyph heading a card, which is the §1 anti-goal. The set stays minimal on purpose: a library of unused glyphs is how that anti-goal gets back in. |
| `CTAPanel` | Navy fill, `--radius-lg`, one per page, always last. |
| `Badge` | `--radius-sm`, compliance and spec chips only. Not a decorative element. |
| `PhotoHero` | Full-bleed photo, scrim anchored to the text corner, `text-display` heading. Interior pages use `h2`; only the home page hero is `h1`. |

---

## 8. Accessibility

- Focus ring is `2px solid cardinal-500` at `2px` offset. Never remove it.
- Body text on `paper` meets 4.5:1 (`#414868` on white is 8.6:1). `muted`
  (`#6a7194`, 5.1:1) is for labels and never for paragraph copy.
- Text over photography requires a scrim that guarantees 4.5:1 across the whole
  text block, not just its center.
- Marquees stop under `prefers-reduced-motion` and remain horizontally
  scrollable so their contents stay reachable.
- Every decorative image is `alt=""` with `aria-hidden`; every meaningful image
  describes its actual contents.

---

## 9. Enforced rules

`tests/data.test.ts` fails the build on:

- Any use of `Space_Grotesk`, `space-grotesk`, or `font-mono`.
- Hotlinked stock imagery (`images.unsplash.com`).
- `blueprint-grid` decorative texture.
- Superseded technician counts (1,000 / 2,000).
- `bg-panel/<n>` fractional opacity (§3.1).
- More than one `.surface-dark` per page (§3.1).
- Any page but `/contact` without a dark anchor — `PhotoHero` or `.surface-dark` (§3.1).

All factual claims live in `src/data/` and must trace to the Fact Source Table
in `docs/superpowers/specs/2026-07-11-cardinal-robot-website-design.md` §9.

---

## 10. Decisions log

| Date | Decision | Rationale |
|---|---|---|
| 2026-07-11 | White + blue institutional, Inter only | Evidence over adjectives; the number set large in the blue is the signature move. |
| 2026-07-19 | Retire Space Grotesk and `font-mono` (`e7a1ace`) | Two families were producing hierarchy by family rather than by size and weight. Guarded. |
| 2026-07-30 | Surface ladder: paper / panel / navy, panel at full strength only (§3.1) | `bg-panel/40` rendered at 1.03:1 against paper. The site had tonal alternation in its class lists and none on screen. |
| 2026-07-30 | Every page opens on a dark mass; one `.surface-dark` per page | Eight text-hero pages were opening white-on-white under a white nav. |
| 2026-07-30 | Platform stat bands set on hairline baselines, not bordered boxes | Four identical centred cards under a left-aligned heading was the clearest template tell on the home page. Also keeps `$800M` as the one big number. |
| 2026-07-30 | Schematic icons scoped to inline list marks (§7) | Honours the "no three-column grid of generic glyphs" anti-goal while giving lists a real mark. |
| 2026-07-30 | Home hero carries a generated 5s hospital-corridor loop; still swapped from `hero.jpg` to frame 0 of that clip | Poster, alt text, and video must describe one scene. Keeps `hero.jpg` in the repo — reverting is a two-line change in `page.tsx`. |
| 2026-07-30 | Home hero scrim rebuilt as three layers including a `to right` pass (§6) | The shipped scrim measured 1.56:1 behind the eyebrow. Pre-existing, and worse under the previous photograph. |
