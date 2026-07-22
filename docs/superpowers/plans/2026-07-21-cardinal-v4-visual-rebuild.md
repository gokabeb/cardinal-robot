# Cardinal v4 Visual Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Cardinal Robotics site's visual system site-wide — Inter-only typography, a verified-legible full-bleed-photo hero pattern, and removal of the three patterns that read as AI-template (blueprint-grid texture, numbered mono eyebrows, the fake dashboard-console mockup) — while keeping the white+blue palette, IA, and fact vault untouched.

**Architecture:** Two new shared components (`PhotoHero` for pages with a real photo, reused hairline-border sections for pages without) replace 13 pages' near-identical hero markup. A blanket font sweep retires Space Grotesk everywhere. `DashboardMock` is deleted and its two usages become plain stat-card grids.

**Tech Stack:** Next.js App Router (static export), Tailwind CSS v4, Framer Motion, Vitest.

## Global Constraints

- **Typography:** Inter only, everywhere, all weights. No `font-mono`, no `Space_Grotesk`/`space-grotesk` anywhere in `src/`.
- **Palette:** unchanged — white+blue role tokens only (`paper/panel/line/muted/body/navy`, `cardinal-*`). No new colors.
- **No blueprint-grid texture** anywhere in `src/` by the end of the plan.
- **No numbered mono eyebrows** — `SectionHeading`/`Eyebrow`'s `index` prop is removed entirely.
- **No fake dashboard mockup** — `DashboardMock.tsx` is deleted; both usages become plain data cards.
- **Buttons unchanged** — `Button.tsx` already renders `rounded-full` in `font-display` (Inter). No component change.
- **Hero legibility must be verified against the real photo, not just trusted from gradient CSS** — a single diagonal wash is not sufficient; use the two-layer (text-anchored radial + light diagonal wash) pattern from the spec, and screenshot-check the text zone before considering a hero done.
- **Photo-less pages stay photo-less** — do not re-run an exhaustive image search for `/data-collection` or any other page; a plain white hero with hairline-border rhythm is the correct fallback, not a defect.
- Run `npm test` and `npm run build` before every commit that touches `src/`.

---

### Task 1: Font system — Inter only

**Files:**
- Modify: `src/components/diagrams/LifecycleDiagram.tsx:36,39`
- Modify: `src/components/diagrams/SecurityFlowDiagram.tsx:27,30`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify (blanket sweep): every other file returned by `grep -rl "font-mono" src/` (about 20 files — pages, `Header.tsx`, `Footer.tsx`, `Badge.tsx`, `Eyebrow.tsx`, `LogoWall.tsx`, `SpecTable.tsx`, `StatCounter.tsx`, `RobotsCatalog.tsx`, `ContactForm.tsx`, `RoadmapTimeline.tsx`, `DashboardMock.tsx`)
- Test: `tests/data.test.ts`

**Interfaces:**
- Produces: no `--font-mono` CSS custom property, no `Space_Grotesk` import anywhere. Every later task's "before" code in this plan already assumes `font-mono` is gone from any file it touches — because line counts don't change (see Step 4), later tasks' line-number references stay accurate.

- [ ] **Step 1: Write the failing test.** Open `tests/data.test.ts` and add this inside the `describe("fact vault integrity", ...)` block, immediately after the existing `"never reintroduces the superseded 1,000/2,000 technician counts"` test:

```ts
  it("uses Inter as the only typeface — no Space Grotesk, no font-mono", () => {
    for (const f of sourceFiles("src")) {
      const content = readFileSync(f, "utf8");
      expect(content, f).not.toContain("font-mono");
      expect(content, f).not.toContain("Space_Grotesk");
      expect(content, f).not.toContain("space-grotesk");
    }
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — the new test reports `font-mono` present in ~24 files and `Space_Grotesk`/`space-grotesk` present in `src/app/layout.tsx` and `src/app/globals.css`.

- [ ] **Step 3: Fix the two SVG diagrams that reference the font via inline `fontFamily`, not a Tailwind class.** These need the *value* swapped, not the text deleted — a blind sed would leave `fontFamily="var(--)"`, an invalid reference that silently falls back to the browser default font once the CSS variable is removed in Step 5.

In `src/components/diagrams/LifecycleDiagram.tsx`, change both occurrences of `fontFamily="var(--font-mono)"` to `fontFamily="var(--font-inter)"`:

```tsx
            <text x={x} y="62" textAnchor="middle" fill="#414868" fontSize="13" fontFamily="var(--font-mono)">
```
→
```tsx
            <text x={x} y="62" textAnchor="middle" fill="#414868" fontSize="13" fontFamily="var(--font-inter)">
```

```tsx
            <text x={x} y="78" textAnchor="middle" fill="#6a7194" fontSize="9" fontFamily="var(--font-mono)">
```
→
```tsx
            <text x={x} y="78" textAnchor="middle" fill="#6a7194" fontSize="9" fontFamily="var(--font-inter)">
```

In `src/components/diagrams/SecurityFlowDiagram.tsx`, change both occurrences the same way:

```tsx
          <text x={n.x} y="66" textAnchor="middle" fill="#0c1033" fontSize="10" fontFamily="var(--font-mono)">
```
→
```tsx
          <text x={n.x} y="66" textAnchor="middle" fill="#0c1033" fontSize="10" fontFamily="var(--font-inter)">
```

```tsx
          <text x={n.x} y="105" textAnchor="middle" fill="#6a7194" fontSize="9" fontFamily="var(--font-mono)">
```
→
```tsx
          <text x={n.x} y="105" textAnchor="middle" fill="#6a7194" fontSize="9" fontFamily="var(--font-inter)">
```

- [ ] **Step 4: Blanket-remove `font-mono` from every remaining Tailwind class string.** The two files just fixed no longer contain the literal string `font-mono` (they now say `font-inter`), so a repo-wide string removal is safe — it can only match class-list occurrences now:

```bash
grep -rl "font-mono" src/ | xargs sed -i '' 's/font-mono //g; s/ font-mono//g'
```

Run `grep -rn "font-mono" src/` afterward — expected: zero results. This command only edits text within existing lines (deleting a token, not a line), so no file's line numbers shift — every line-number reference in later tasks of this plan stays accurate.

- [ ] **Step 5: Remove the font-mono theme token and the Space Grotesk loader.**

In `src/app/globals.css`, delete this line from the `@theme inline` block:
```css
  --font-mono: var(--font-space-grotesk);
```
so the block reads:
```css
@theme inline {
  --font-display: var(--font-inter);
  --font-body: var(--font-inter);
}
```

In `src/app/layout.tsx`, change:
```tsx
import { Inter, Space_Grotesk } from "next/font/google";
```
to:
```tsx
import { Inter } from "next/font/google";
```

Change:
```tsx
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
```
to:
```tsx
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
```

Change:
```tsx
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
```
to:
```tsx
    <html lang="en" className={inter.variable}>
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test`
Expected: PASS, all tests green.

- [ ] **Step 7: Verify the build**

Run: `npm run build`
Expected: static export succeeds, no errors, no font-loading warnings.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: Inter-only typography, retire Space Grotesk and font-mono"
```

---

### Task 2: Remove the numbered-eyebrow index prop

**Files:**
- Modify: `src/components/ui/Eyebrow.tsx`
- Modify: `src/components/ui/SectionHeading.tsx`
- Modify: `src/app/page.tsx` (6 call sites)
- Modify: `src/app/platform/page.tsx` (1 call site)

**Interfaces:**
- Consumes: nothing new.
- Produces: `Eyebrow({ children })` — no `index` prop. `SectionHeading({ eyebrow, title, lede, className })` — no `index` prop. Every later task's `SectionHeading`/`Eyebrow` usage in this plan omits `index` because it no longer exists.

- [ ] **Step 1: Update `Eyebrow.tsx`.** Current content (after Task 1's sed already stripped `font-mono`):

```tsx
import type { ReactNode } from "react";

export function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-cardinal-600">
      <span aria-hidden className="h-1.5 w-1.5 bg-cardinal-600" />
      {index ? `${index} — ` : ""}{children}
    </p>
  );
}
```

Replace with:

```tsx
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-cardinal-600">
      <span aria-hidden className="h-1.5 w-1.5 bg-cardinal-600" />
      {children}
    </p>
  );
}
```

- [ ] **Step 2: Update `SectionHeading.tsx`.** Current content:

```tsx
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({ index, eyebrow, title, lede, className }: {
  index?: string; eyebrow?: string; title: string; lede?: string; className?: string;
}) {
  return (
    <div className={cn("max-w-2xl space-y-4", className)}>
      {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-5xl">{title}</h2>
      {lede && <p className="text-lg leading-relaxed">{lede}</p>}
    </div>
  );
}
```

Replace with:

```tsx
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({ eyebrow, title, lede, className }: {
  eyebrow?: string; title: string; lede?: string; className?: string;
}) {
  return (
    <div className={cn("max-w-2xl space-y-4", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-5xl">{title}</h2>
      {lede && <p className="text-lg leading-relaxed">{lede}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Update the 6 call sites in `src/app/page.tsx`.** Each just drops the `index="0N" ` token — nothing else on these lines changes:

`index="01" eyebrow="At scale"` → `eyebrow="At scale"`
`<SectionHeading index="02" eyebrow="Two ways in" title="One platform. Two ways to use it." />` → `<SectionHeading eyebrow="Two ways in" title="One platform. Two ways to use it." />`
`index="03" eyebrow="How it works"` → `eyebrow="How it works"`
`index="04" eyebrow="Platform"` → `eyebrow="Platform"`
`index="05" eyebrow="The fleet"` → `eyebrow="The fleet"`
`<SectionHeading index="06" eyebrow="Outcomes" title="Measured on the floor, not in the pitch." />` → `<SectionHeading eyebrow="Outcomes" title="Measured on the floor, not in the pitch." />`

- [ ] **Step 4: Update the call site in `src/app/platform/page.tsx`.**

```tsx
              <Eyebrow index={String(i + 1).padStart(2, "0")}>{phase.title}</Eyebrow>
```
→
```tsx
              <Eyebrow>{phase.title}</Eyebrow>
```

- [ ] **Step 5: Verify**

Run: `npm test && npm run build`
Expected: both pass. TypeScript will fail to compile if any call site still passes `index` to either component — that's the safety net confirming every usage was caught.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: remove numbered-eyebrow index prop from SectionHeading and Eyebrow"
```

---

### Task 3: Remove the fake dashboard mockup

**Files:**
- Delete: `src/components/diagrams/DashboardMock.tsx`
- Modify: `src/app/page.tsx` (the "Fleet console in a device frame" section, and its import list)
- Modify: `src/app/platform/page.tsx` (the "Every robot, one console" section, and its import list)

**Interfaces:**
- Consumes: `Stagger`/`StaggerItem` from `@/components/motion/Stagger` (already imported in `page.tsx`).
- Produces: nothing new — both sections become inline stat-card markup, no shared component needed for two call sites.

- [ ] **Step 1: Delete `DashboardMock.tsx`.**

```bash
rm src/components/diagrams/DashboardMock.tsx
```

- [ ] **Step 2: Replace the section in `src/app/page.tsx`.** Current content (after Tasks 1–2, `font-mono` already stripped and `index` already removed):

```tsx
      {/* 8 — Fleet console in a device frame */}
      <section className="blueprint-grid border-t border-line/70 bg-panel/40 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Platform"
              title="The whole fleet, one console."
              lede="Every deployment reports into a single dashboard — KPIs, scheduling, ROI, and operational visibility."
            />
          </Reveal>
          <Reveal delay={0.15} className="mx-auto mt-14 max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl shadow-navy/10">
              <div className="flex items-center gap-1.5 border-b border-line/70 bg-panel px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="mx-auto rounded-full border border-line/60 bg-paper px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
                  Cardinal Fleet Console
                </span>
                <span className="w-[54px]" aria-hidden />
              </div>
              <div className="p-4 sm:p-6">
                <DashboardMock />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 text-center">
            <Button href="/platform" variant="outline" className="bg-paper">See the platform</Button>
          </Reveal>
        </div>
      </section>
```

Replace with:

```tsx
      {/* 8 — Platform: real numbers, no fake screenshot */}
      <section className="border-t border-line/70 bg-panel/40 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Platform"
              title="The whole fleet, one view."
              lede="Every deployment reports into a single system — KPIs, scheduling, ROI, and operational visibility."
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "24", l: "Robots active" },
              { n: "148k", l: "Sq ft covered" },
              { n: "99.2%", l: "Uptime" },
              { n: "0", l: "Open tickets" },
            ].map((s) => (
              <StaggerItem key={s.l}>
                <div className="rounded-2xl border border-line bg-paper p-7 text-center">
                  <p className="tabular text-4xl font-bold tracking-tight text-navy">{s.n}</p>
                  <p className="mt-2 text-xs text-muted">{s.l}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.15} className="mt-10 text-center">
            <Button href="/platform" variant="outline" className="bg-paper">See the platform</Button>
          </Reveal>
        </div>
      </section>
```

Note this also removes `blueprint-grid` from this section's className — folded in here since the section is already being rewritten.

Remove the now-unused import from the top of the file:
```tsx
import { DashboardMock } from "@/components/diagrams/DashboardMock";
```

- [ ] **Step 3: Replace the section in `src/app/platform/page.tsx`.** Current content:

```tsx
      <section className="mx-auto max-w-4xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Visibility"
            title="Every robot, one console."
            lede="Operational KPIs, scheduling, ROI reports, and remote diagnostics — across every site and every model."
            className="mx-auto text-center"
          />
        </Reveal>
        <Reveal delay={0.15} className="mt-12"><DashboardMock /></Reveal>
      </section>
```

Replace with:

```tsx
      <section className="mx-auto max-w-4xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Visibility"
            title="Every robot, one view."
            lede="Operational KPIs, scheduling, ROI reports, and remote diagnostics — across every site and every model."
            className="mx-auto text-center"
          />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "24", l: "Robots active" },
            { n: "148k", l: "Sq ft covered" },
            { n: "99.2%", l: "Uptime" },
            { n: "0", l: "Open tickets" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-line bg-paper p-7 text-center">
              <p className="tabular text-4xl font-bold tracking-tight text-navy">{s.n}</p>
              <p className="mt-2 text-xs text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
```

Remove the now-unused import from the top of the file:
```tsx
import { DashboardMock } from "@/components/diagrams/DashboardMock";
```

- [ ] **Step 4: Verify**

Run: `npm test && npm run build`
Expected: both pass. The build will fail with "module not found" if either page still imports the deleted `DashboardMock.tsx` — confirming both usages were caught.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: replace fake dashboard mockup with plain data cards"
```

---

### Task 4: Home hero rebuild

**Files:**
- Modify: `src/app/page.tsx` (hero section, imports, and the bento financing cell's `blueprint-grid` class)
- Test: manual screenshot verification (no automated test — this is a visual/legibility check, per the spec's testing requirement)

**Interfaces:**
- Consumes: `WordReveal`, `Reveal`, `Button` (all already imported in `page.tsx`). The hero's eyebrow is written inline (see Step 1's note) — `Eyebrow` the component is untouched and still imported/used elsewhere in this file.
- Produces: nothing new for other tasks — home's hero is intentionally bespoke, not shared with interior pages (it has extra elements — `WordReveal`'s word-by-word animation and two floating stat chips — that interior pages don't need).

- [ ] **Step 1: Replace the hero section.** Current content (lines 44–86, unaffected by Tasks 1–3 since they touched different regions of this file):

```tsx
      {/* 1 — Hero: one sentence, then the picture does the talking */}
      <section className="relative overflow-hidden">
        <div className="blueprint-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 sm:pt-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <WordReveal
              text="The robotic workforce, fully operational."
              className="font-display text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-navy sm:text-6xl lg:text-7xl"
            />
            <Reveal delay={0.45} className="flex flex-col items-center">
              <p className="mt-6 max-w-xl text-lg leading-relaxed">
                Cardinal sources, deploys, trains, services, and finances commercial robots — so your team doesn&apos;t have to.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button href="/robots">Explore the fleet</Button>
                <Button href="/contact" variant="outline">Talk to us</Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative mt-16 sm:mt-20">
            <div className="relative overflow-hidden rounded-2xl border border-line shadow-2xl shadow-navy/10">
              <Parallax className="h-[420px] sm:h-[560px]" range={8}>
                <img
                  src={IMG.hero}
                  alt="Autonomous mobile robots moving parts racks in a logistics facility"
                  className="img-tone h-[112%] w-full object-cover"
                />
              </Parallax>
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 sm:p-6">
                <div className="flex items-baseline gap-2.5 rounded-full border border-line bg-paper px-5 py-2.5 shadow-sm">
                  <span className="tabular text-sm font-medium text-navy">35,000+</span>
                  <span className="text-xs text-body">robots deployed</span>
                </div>
                <div className="hidden items-baseline gap-2.5 rounded-full border border-line bg-paper px-5 py-2.5 shadow-sm sm:flex">
                  <span className="tabular text-sm font-medium text-navy">3,000+</span>
                  <span className="text-xs text-body">technicians nationwide</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
```

Replace with:

```tsx
      {/* 1 — Hero: full-bleed photo, text-anchored scrim */}
      <section className="relative overflow-hidden">
        <div className="relative flex min-h-[640px] items-end sm:min-h-[720px]">
          <img
            src={IMG.hero}
            alt="Autonomous mobile robots moving parts racks in a bright logistics facility"
            className="img-tone absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(620px 460px at 8% 100%, rgba(12,16,51,0.92) 0%, rgba(12,16,51,0.92) 38%, rgba(12,16,51,0.55) 62%, rgba(12,16,51,0) 85%), linear-gradient(115deg, rgba(12,16,51,0.35) 0%, rgba(12,16,51,0.12) 30%, rgba(12,16,51,0) 55%)",
            }}
          />
          <Reveal className="relative w-full px-6 pb-16 pt-24 sm:px-10 sm:pb-20">
            <p className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-white/80">
              <span aria-hidden className="h-1.5 w-1.5 bg-white" />
              Cardinal Robotics
            </p>
            <WordReveal
              text="The robotic workforce, fully operational."
              className="mt-5 block max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-6xl"
            />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/90">
              Cardinal sources, deploys, trains, services, and finances commercial robots — so your team doesn&apos;t have to.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Button href="/robots">Explore the fleet →</Button>
              <Link href="/contact" className="text-sm font-semibold text-white underline underline-offset-4">
                Talk to us
              </Link>
            </div>
          </Reveal>
          <div className="absolute bottom-6 right-6 hidden flex-col items-end gap-2 sm:flex sm:bottom-10 sm:right-10">
            <div className="flex items-baseline gap-2.5 rounded-full bg-white/95 px-5 py-2.5">
              <span className="tabular text-sm font-bold text-navy">35,000+</span>
              <span className="text-xs text-body">robots deployed</span>
            </div>
            <div className="flex items-baseline gap-2.5 rounded-full bg-white/95 px-5 py-2.5">
              <span className="tabular text-sm font-bold text-navy">3,000+</span>
              <span className="text-xs text-body">technicians nationwide</span>
            </div>
          </div>
        </div>
      </section>
```

Note the eyebrow above is written inline rather than via the shared `Eyebrow` component — `Eyebrow` hardcodes `text-cardinal-600`/`bg-cardinal-600` for light backgrounds, which would be low-contrast on this dark scrim, and overriding a child component's own utility classes from outside is fragile (relies on descendant-selector specificity winning against the component's own classes, which isn't guaranteed). Writing the eyebrow markup inline — matching the same pattern used in `PhotoHero.tsx` (Task 5) — is simpler and avoids that risk entirely. `Eyebrow` itself is untouched and still used correctly elsewhere in this file (the "Why Cardinal" section, on a white background).

- [ ] **Step 2: Remove the now-unused `Parallax` import.** Home's hero no longer wraps the photo in `Parallax` (the new hero uses a plain absolutely-positioned `<img>`), and `Parallax` isn't used anywhere else in this file. Remove:

```tsx
import { Parallax } from "@/components/motion/Parallax";
```

- [ ] **Step 3: Remove `blueprint-grid` from the bento financing cell.** In the same file, find:

```tsx
            <BentoCell href="/financing" className="blueprint-grid h-full min-h-[240px] bg-cardinal-50">
```

Replace with:

```tsx
            <BentoCell href="/financing" className="h-full min-h-[240px] bg-cardinal-50">
```

- [ ] **Step 4: Verify build and tests**

Run: `npm test && npm run build`
Expected: both pass.

- [ ] **Step 5: Verify hero legibility against the actual photo — do not skip this.** Start the dev server, screenshot the hero, and crop directly to the text zone to confirm real contrast (not just trust the gradient math):

```bash
npm run dev &
sleep 5
```

Using the gstack browse binary (or any headless-browser tool available in your environment) — navigate to `http://localhost:3000/`, take a full-viewport screenshot, then a cropped screenshot of just the headline+subhead+CTA region. Visually confirm: the headline, subhead, and both CTAs are clearly legible against whatever part of the photo sits behind them. If any text is hard to read, widen the radial gradient's opacity/reach (the `0.92`/`0.55` stops and `620px 460px`/`85%` reach in the `backgroundImage` style) until it passes, then re-screenshot and re-check. Stop the dev server when done:

```bash
kill %1
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: rebuild home hero as full-bleed photo with text-anchored scrim"
```

---

### Task 5: Photo-hero interior pages — US Assembly, Research, Insurance & Shipping, Servicing

**Files:**
- Create: `src/components/ui/PhotoHero.tsx`
- Modify: `src/app/us-assembly/page.tsx`
- Modify: `src/app/research/page.tsx`
- Modify: `src/app/insurance-shipping/page.tsx`
- Modify: `src/app/servicing/page.tsx`

**Interfaces:**
- Produces: `PhotoHero({ image, imageAlt, eyebrow, title, lede, minHeight? })` — a full-bleed-photo hero section using the same verified two-layer scrim pattern as home's hero, rendering the heading as `<h2>` (matching the existing `SectionHeading` convention every other page already uses — home is the site's only `<h1>`, via `WordReveal`). No CTA slot: none of these four pages currently has a CTA inside its hero (they rely on the page-bottom `CTAPanel`), and this task is a visual change only — it does not add new interactive elements pages didn't already have.

- [ ] **Step 1: Create `src/components/ui/PhotoHero.tsx`.**

```tsx
import { Reveal } from "@/components/motion/Reveal";

export function PhotoHero({
  image, imageAlt, eyebrow, title, lede, minHeight = "min-h-[420px] sm:min-h-[520px]",
}: {
  image: string; imageAlt: string; eyebrow: string; title: string; lede: string; minHeight?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className={`relative flex ${minHeight} items-end`}>
        <img src={image} alt={imageAlt} className="img-tone absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(620px 460px at 8% 100%, rgba(12,16,51,0.92) 0%, rgba(12,16,51,0.92) 38%, rgba(12,16,51,0.55) 62%, rgba(12,16,51,0) 85%), linear-gradient(115deg, rgba(12,16,51,0.35) 0%, rgba(12,16,51,0.12) 30%, rgba(12,16,51,0) 55%)",
          }}
        />
        <Reveal className="relative w-full px-6 py-16 sm:px-10 sm:py-20">
          <p className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-white/80">
            <span aria-hidden className="h-1.5 w-1.5 bg-white" />
            {eyebrow}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/90">{lede}</p>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `src/app/us-assembly/page.tsx`.** This promotes the photo already used just below the hero (`assembly.jpg`) up into the hero itself, and removes the now-redundant standalone image block. Full new file:

```tsx
import type { Metadata } from "next";
import { assemblyPillars, assemblyNote } from "@/data/assembly";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "US Assembly" };

export default function UsAssemblyPage() {
  return (
    <main>
      <PhotoHero
        image="/images/assembly.jpg"
        imageAlt="Blue robotic arm positioned at an automated manufacturing station on a bright factory production line"
        eyebrow="US Assembly"
        title="Assembled in the USA."
        lede="Onshore assembly and U.S. manufacturing, with secure systems and supply-chain assurance behind every robot we deploy."
      />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Stagger className="grid gap-4 md:grid-cols-2">
          {assemblyPillars.map((p) => (
            <StaggerItem key={p.title}>
              <Card className="h-full">
                <h3 className="font-display text-xl font-semibold tracking-tight text-navy">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed">{p.body}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-16 border-t border-line/70 pt-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Engineering pedigree</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed">
            {assemblyNote.text}
          </p>
        </Reveal>
      </section>

      <CTAPanel
        title="Built here. Serviced here."
        body="Talk to us about onshore assembly, DFM, and design-for-service for your fleet."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
```

- [ ] **Step 3: Rewrite `src/app/research/page.tsx`.** Same treatment, promoting `research.jpg` into the hero. Full new file:

```tsx
import type { Metadata } from "next";
import { researchStats, researchNote, researchClosing } from "@/data/research";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Research & Development" };

export default function ResearchPage() {
  return (
    <main>
      <PhotoHero
        image="/images/research.jpg"
        imageAlt="White robotic arm reaching toward a wall of storage cubbies in a robotics lab"
        eyebrow="Research & Development"
        title="Research that ships."
        lede={researchNote.text}
      />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Stagger className="grid gap-4 md:grid-cols-3">
          {researchStats.map((s) => (
            <StaggerItem key={s.label}>
              <Card className="h-full text-center">
                <p className="tabular text-5xl font-medium tracking-tight text-cardinal-700">{s.value}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">{s.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-16 border-t border-line/70 pt-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">In-house, end to end</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed">
            {researchClosing.text}
          </p>
        </Reveal>
      </section>

      <CTAPanel
        title="Build with our R&D team."
        body="In-house design, engineering, and integrations for partners and OEMs."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
```

- [ ] **Step 4: Rewrite `src/app/insurance-shipping/page.tsx`.** This page has no existing dedicated hero photo (its three body photos — `insurance.jpg`, `shipping.jpg`, `parts.jpg` — are each already spoken for by the zigzag rows below). Use `warehouse.jpg`, which isn't used anywhere else on this page. Full new file:

```tsx
import type { Metadata } from "next";
import { logisticsSections } from "@/data/logistics";
import { Reveal } from "@/components/motion/Reveal";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { CTAPanel } from "@/components/ui/CTAPanel";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Insurance & Shipping" };

export default function InsuranceShippingPage() {
  return (
    <main>
      <PhotoHero
        image="/images/warehouse.jpg"
        imageAlt="Tall warehouse aisle with stocked racking"
        eyebrow="Insurance & Shipping"
        title="Covered from dock to deployment."
        lede="Insurance, freight, warehousing, and integrations — the unglamorous half of robotics, handled."
      />

      <section className="mx-auto max-w-6xl space-y-24 px-6 py-24">
        {logisticsSections.map((s, i) => (
          <Reveal key={s.title}>
            <div className={cn("grid items-center gap-10 lg:grid-cols-2", i % 2 === 1 && "lg:[direction:rtl]")}>
              <div className="lg:[direction:ltr]">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">{s.title}</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed">{s.body}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-line shadow-xl shadow-navy/[0.06] lg:[direction:ltr]">
                <img src={s.image} alt={s.imageAlt} loading="lazy" className="img-tone aspect-[4/3] w-full object-cover" />
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <CTAPanel
        title="Ship it. Insure it. Run it."
        body="Tell us where your robots need to be — we handle everything in between."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
```

- [ ] **Step 5: Rewrite `src/app/servicing/page.tsx`.** This page's hero previously held the `servicingHighlights` stat trio inline — `PhotoHero` has no stats slot (by design: don't build an unused capability), so the stat trio moves to its own section directly below the hero. Use `engineer.jpg` (not currently used as any page's dedicated hero). Full new file:

```tsx
import type { Metadata } from "next";
import { servicePillars, technicianCerts, servicingHighlights } from "@/data/servicing";
import { USCoverageMap } from "@/components/diagrams/USCoverageMap";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Servicing" };

export default function ServicingPage() {
  return (
    <main>
      <PhotoHero
        image="/images/engineer.jpg"
        imageAlt="Engineer working on robotics hardware in a lab"
        eyebrow="Servicing"
        title="Enhance your robot workforce uptime."
        lede="Break-fix and preventative maintenance across the US — a 24/7 support line and 3,000+ service delivery professionals through Cardinal and partner networks."
      />

      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Stagger className="grid gap-4 md:grid-cols-3">
            {servicingHighlights.map((h) => (
              <StaggerItem key={h.label}>
                <Card className="h-full text-center">
                  <p className="tabular text-5xl font-medium tracking-tight text-cardinal-700">{h.value}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">{h.label}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted">
            Nationwide coverage
          </p>
          <div className="mt-10"><USCoverageMap /></div>
          <p className="mt-6 text-center text-xs text-muted">
            3,000+ certified technicians. Onsite and periodic maintenance.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-line bg-panel/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading eyebrow="What's covered" title="Three layers of support." />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {servicePillars.map((p) => (
              <StaggerItem key={p.title}>
                <Card className="h-full">
                  <h3 className="font-display text-xl font-medium text-navy">{p.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm leading-relaxed">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cardinal-500" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Technician certifications</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {technicianCerts.map((c) => <Badge key={c}>{c}</Badge>)}
          </div>
          <p className="mt-8 text-xs text-muted">ISO 27001 information security, globally certified.</p>
          <p className="mt-4 text-sm leading-relaxed">
            Cardinal upskills U.S. veterans into certified robot technicians — service careers, not gig work.
          </p>
        </Reveal>
      </section>

      <CTAPanel
        title="Keep every unit running."
        body="24/7 help desk, remote diagnostics, and technicians where you operate."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
```

- [ ] **Step 6: Verify build and tests**

Run: `npm test && npm run build`
Expected: both pass.

- [ ] **Step 7: Verify hero legibility for all four pages — do not skip this.**

```bash
npm run dev &
sleep 5
```

Screenshot each of `/us-assembly`, `/research`, `/insurance-shipping`, `/servicing`, cropping to the hero text zone on each. Confirm eyebrow, title, and lede are all clearly legible against their respective photos. If any fails, widen that page's `PhotoHero` gradient reach the same way as Task 4 Step 5 — since all four share the one component, a fix to `PhotoHero.tsx` itself should be checked against all four photos before moving on.

```bash
kill %1
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: photo-hero pattern for US Assembly, Research, Insurance & Shipping, Servicing"
```

---

### Task 6: Photo-less hero pages — batch 1

**Files:**
- Modify: `src/app/data-collection/page.tsx:14`
- Modify: `src/app/financing/page.tsx:14`
- Modify: `src/app/about/page.tsx:16`
- Modify: `src/app/security/page.tsx:15`

**Interfaces:** none — this is a one-token removal repeated across four files, no new components or props.

These four pages don't have (and per the spec, don't need) a hero photo — per §3.2's explicit fallback rule, they stay plain white with hairline-border rhythm. The only change is dropping the grid-texture class; everything else about each hero (the `SectionHeading`, any stat trio, any `border-b`) is unchanged.

- [ ] **Step 1: `src/app/data-collection/page.tsx`.**

```tsx
      <section className="blueprint-grid border-b border-line py-24">
```
→
```tsx
      <section className="border-b border-line py-24">
```

- [ ] **Step 2: `src/app/financing/page.tsx`.** Same change:

```tsx
      <section className="blueprint-grid border-b border-line py-24">
```
→
```tsx
      <section className="border-b border-line py-24">
```

- [ ] **Step 3: `src/app/about/page.tsx`.** Same change:

```tsx
      <section className="blueprint-grid border-b border-line py-24">
```
→
```tsx
      <section className="border-b border-line py-24">
```

- [ ] **Step 4: `src/app/security/page.tsx`.** Same change:

```tsx
      <section className="blueprint-grid border-b border-line py-24">
```
→
```tsx
      <section className="border-b border-line py-24">
```

- [ ] **Step 5: Verify**

Run: `npm test && npm run build`
Expected: both pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "style: remove grid texture from data-collection, financing, about, security heroes"
```

---

### Task 7: Photo-less hero pages — batch 2

**Files:**
- Modify: `src/app/platform/page.tsx:24`
- Modify: `src/app/industries/page.tsx:18`
- Modify: `src/app/robots/page.tsx:12`
- Modify: `src/app/robots/[category]/page.tsx:35`
- Modify: `src/app/contact/page.tsx:12`
- Modify: `src/app/not-found.tsx:6`

**Interfaces:** none — same one-token removal pattern as Task 6, finishing the remaining pages.

- [ ] **Step 1: `src/app/platform/page.tsx`.**

```tsx
      <section className="blueprint-grid border-b border-line py-24">
```
→
```tsx
      <section className="border-b border-line py-24">
```

- [ ] **Step 2: `src/app/industries/page.tsx`.** Same change:

```tsx
      <section className="blueprint-grid border-b border-line py-24">
```
→
```tsx
      <section className="border-b border-line py-24">
```

- [ ] **Step 3: `src/app/robots/page.tsx`.** Same change:

```tsx
      <section className="blueprint-grid border-b border-line py-24">
```
→
```tsx
      <section className="border-b border-line py-24">
```

- [ ] **Step 4: `src/app/robots/[category]/page.tsx`.** Same change:

```tsx
      <section className="blueprint-grid border-b border-line py-24">
```
→
```tsx
      <section className="border-b border-line py-24">
```

- [ ] **Step 5: `src/app/contact/page.tsx`.** This one is on `<main>`, not a `<section>`, with no other classes — drop the attribute entirely:

```tsx
    <main className="blueprint-grid">
```
→
```tsx
    <main>
```

- [ ] **Step 6: `src/app/not-found.tsx`.** This one has other classes alongside it:

```tsx
    <main className="blueprint-grid flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
```
→
```tsx
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
```

- [ ] **Step 7: Verify**

Run: `npm test && npm run build`
Expected: both pass.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "style: remove grid texture from platform, industries, robots, contact, 404 heroes"
```

---

### Task 8: Final cleanup — remove the CSS rule, add the drift guard, full QA

**Files:**
- Modify: `src/app/globals.css` (remove the `.blueprint-grid` rule)
- Modify: `tests/data.test.ts` (add the drift-guard test)

**Interfaces:** none — this is the closing verification task.

- [ ] **Step 1: Write the failing test.** Add to `tests/data.test.ts`, inside `describe("fact vault integrity", ...)`, after the Task 1 typography test:

```ts
  it("has no blueprint-grid decorative texture left in the codebase", () => {
    for (const f of sourceFiles("src")) {
      expect(readFileSync(f, "utf8"), f).not.toContain("blueprint-grid");
    }
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — every page-level usage should already be gone (Tasks 3–7), but the CSS rule definition itself is still in `globals.css`, and `sourceFiles()` matches `.css` files too.

- [ ] **Step 3: Remove the `.blueprint-grid` rule from `src/app/globals.css`.** Find and delete this block (including its preceding comment):

```css
/* Fine blue drafting grid for panel backgrounds */
.blueprint-grid {
  background-image:
    linear-gradient(to right, rgb(33 54 204 / 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(33 54 204 / 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
}
```

Leave the surrounding rules (`.glass`, `@keyframes marquee`, etc.) untouched.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS, all tests green — including both drift guards from this plan (Task 1's font check and this task's grid-texture check).

- [ ] **Step 5: Full build verification**

Run: `npm run build`
Expected: static export succeeds, all routes generated, no errors.

- [ ] **Step 6: Full-site visual QA pass.** Start the dev server and check every route for console errors and a correct render:

```bash
npm run dev &
sleep 5
```

Visit `/`, `/us-assembly`, `/data-collection`, `/research`, `/insurance-shipping`, `/security`, `/servicing`, `/financing`, `/about`, `/platform`, `/industries`, `/contact`, `/robots`, and one category page (e.g. `/robots/vacuuming`). For each: confirm no console errors, confirm the page renders (no blank sections, no broken images), and for the five photo-hero pages specifically, confirm the hero text is still legible (this re-confirms Tasks 4 and 5's per-page checks now that everything is assembled together). Stop the server when done:

```bash
kill %1
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove blueprint-grid CSS rule, add drift-guard test, final QA pass"
```

---

## Self-review notes

- **Spec coverage:** §3.1 (Inter-only) → Task 1. §3.1 (drop numbered eyebrows) → Task 2. §3.2 (hero pattern, all 13 pages, photo-less fallback) → Tasks 4, 5, 6, 7. §3.3 (fake dashboard) → Task 3. §3.4 (hairline rhythm) → already satisfied by existing code across the surveyed pages (every section boundary already uses `border-t`/`border-b`/`border-y border-line`); no dedicated task needed, verified in Task 8's QA pass instead. §3.5 (buttons unchanged) → confirmed via code read, no task. §3.6 (remaining sections inherit the system) → covered automatically by Task 1's blanket sweep. §5 (testing) → drift-guard tests in Tasks 1 and 8, per-hero legibility screenshots in Tasks 4 and 5, build verification throughout.
- **Gap found during survey, addressed:** the spec's hero-legibility gradient values assume white text over `SectionHeading`/`Eyebrow`, which hardcode navy/cardinal-600 for light backgrounds. Resolved by scoping `PhotoHero` (Task 5) to `<h2>` + bespoke white-text markup rather than reusing `SectionHeading` unmodified, and by an explicit color override for home's `Eyebrow` usage in Task 4.
- **Type consistency:** `PhotoHero`'s prop names (`image`, `imageAlt`, `eyebrow`, `title`, `lede`, `minHeight`) are used identically across all 4 call sites in Task 5. `Eyebrow`'s and `SectionHeading`'s post-Task-2 signatures (no `index`) are what every subsequent task's code assumes.
- **Placeholder scan:** no TBD/TODO, no "similar to Task N" — every task's JSX is the complete file or a complete, copy-pasteable block.
