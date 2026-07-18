# Cardinal v3 Polish + Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the Cardinal Robotics site to Palantir/Anduril-level polish and expand it to the approved nine-page information architecture with a trusted-by logo wall.

**Architecture:** Static-export Next.js App Router site. All facts live in `src/data/` modules guarded by `tests/data.test.ts` (the "fact vault"). Pages compose a fixed kit: `Eyebrow`, `SectionHeading`, `Card`, `Badge`, `CTAPanel`, `Button` + motion wrappers `Reveal`, `Stagger`/`StaggerItem`, `Marquee`. New pages reuse this kit — no parallel systems.

**Tech Stack:** Next.js (App Router, `output: "export"`), Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`), Framer Motion, Vitest.

## Global Constraints

- **Fonts:** only Inter (`font-display`, `font-body`), Space Grotesk (`font-mono`), JetBrains Mono. No other typeface anywhere, including console mocks.
- **Palette:** white + blue role tokens only (`paper/panel/line/muted/body/navy`, `cardinal-50/100/500/600/700`). No new colors.
- **Facts:** every new claim carries `source: "founder-provided 2026-07-18"` in `src/data/` and is asserted in `tests/data.test.ts`. Canonical technician count is **3,000+** everywhere.
- **Approved wording:** "the nation's largest robotics deployment company"; "Robots operate without Wi-Fi — all data stays on U.S. servers, 100% audited."
- **Transparency rule:** the only translucent surfaces are the glass header + its dropdowns. No gradient washes over photos.
- **"Cuarvo" is excluded** (unconfirmed name).
- Run `npm test` and `npm run build` before every commit that touches `src/`.
- Plain `<img>` tags (static export), `loading="lazy"` below the fold.

---

### Task 1: Client data module + fact-vault coverage

**Files:**
- Create: `src/data/clients.ts`
- Modify: `tests/data.test.ts`

**Interfaces:**
- Produces: `Client { name: string; domain: string; source: string }`, `clients: Client[]` (19 entries), consumed by Task 2's `LogoWall`.

- [ ] **Step 1: Write the failing test** — append to `tests/data.test.ts` inside the `describe` block, and add the import at the top:

```ts
import { clients } from "@/data/clients";
```

```ts
  it("client wall entries are complete, unique, and sourced", () => {
    expect(clients).toHaveLength(19);
    for (const c of clients) {
      expect(c.name, c.name).toBeTruthy();
      expect(c.domain, c.name).toMatch(/^[a-z0-9-]+(\.[a-z0-9-]+)+$/);
      expect(c.source, c.name).toContain("founder-provided 2026-07-18");
    }
    expect(new Set(clients.map((c) => c.domain)).size).toBe(clients.length);
    expect(clients.map((c) => c.name)).not.toContain("Cuarvo");
  });
```

- [ ] **Step 2: Run test to verify it fails** — `npm test` → FAIL: cannot resolve `@/data/clients`.

- [ ] **Step 3: Create `src/data/clients.ts`**

```ts
export interface Client {
  name: string;
  domain: string; // used by LogoWall to fetch the mark from the logo CDN
  source: string;
}

const SRC = "founder-provided 2026-07-18";

// Unified "Trusted by" wall (single list, per approved spec §4).
// "Cuarvo" intentionally excluded until the exact name is confirmed.
export const clients: Client[] = [
  { name: "Apple", domain: "apple.com", source: SRC },
  { name: "Disney", domain: "disney.com", source: SRC },
  { name: "Bank of America", domain: "bankofamerica.com", source: SRC },
  { name: "SoftBank", domain: "softbank.jp", source: SRC },
  { name: "Marriott", domain: "marriott.com", source: SRC },
  { name: "Hilton", domain: "hilton.com", source: SRC },
  { name: "MGM Resorts", domain: "mgmresorts.com", source: SRC },
  { name: "Caesars Entertainment", domain: "caesars.com", source: SRC },
  { name: "Sutter Health", domain: "sutterhealth.org", source: SRC },
  { name: "Stanford Hospital", domain: "stanfordhealthcare.org", source: SRC },
  { name: "CBRE", domain: "cbre.com", source: SRC },
  { name: "Cushman & Wakefield", domain: "cushmanwakefield.com", source: SRC },
  { name: "Compass Group", domain: "compass-group.com", source: SRC },
  { name: "Marsden Services", domain: "marsden.com", source: SRC },
  { name: "Pudu Robotics", domain: "pudurobotics.com", source: SRC },
  { name: "Gausium", domain: "gausium.com", source: SRC },
  { name: "GA Capital", domain: "gacapital.com", source: SRC },
  { name: "Voltai", domain: "voltai.com", source: SRC },
  { name: "MKS", domain: "mks.com", source: SRC },
];
```

- [ ] **Step 4: Verify domains resolve on the CDN** (wordmark fallback covers misses, but check anyway): for each domain run `curl -s -o /dev/null -w "%{http_code} " "https://img.logo.dev/<domain>?token=test"` — a 401/403 means the CDN knows the route (fine); only replace a domain if DNS-style guesswork was wrong and you can verify the correct one (e.g. GA Capital, Voltai, MKS are guesses — if unverifiable, keep the entry; the wall renders its wordmark).

- [ ] **Step 5: Run tests** — `npm test` → PASS.

- [ ] **Step 6: Commit** — `git add src/data/clients.ts tests/data.test.ts && git commit -m "feat: client wall data with fact-vault coverage"`

---

### Task 2: LogoWall component

**Files:**
- Create: `src/components/ui/LogoWall.tsx`
- Modify: `README.md` (document the env var)

**Interfaces:**
- Consumes: `clients`, `Client` from `@/data/clients`; `Marquee` from `@/components/motion/Marquee`; `cn` from `@/lib/cn`.
- Produces: `<LogoWall />` (full grid + mobile marquee) and `<LogoWall compact />` (single-row marquee reprise for About). Reads `process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN`.

- [ ] **Step 1: Create `src/components/ui/LogoWall.tsx`**

```tsx
"use client";
import { useState } from "react";
import { clients, type Client } from "@/data/clients";
import { Marquee } from "@/components/motion/Marquee";
import { cn } from "@/lib/cn";

const TOKEN = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;

function logoUrl(domain: string): string | null {
  if (!TOKEN) return null;
  return `https://img.logo.dev/${domain}?token=${TOKEN}&format=png&size=160`;
}

/** One brand cell: CDN logo (grayscale at rest, color pop on hover) with a
 *  wordmark fallback so the wall never shows a broken image. Fixed height
 *  prevents layout shift when a logo fails. */
function LogoCell({ client }: { client: Client }) {
  const [failed, setFailed] = useState(false);
  const url = logoUrl(client.domain);
  return (
    <div className="group relative flex h-20 items-center justify-center px-8">
      {url && !failed ? (
        <img
          src={url}
          alt={client.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-8 w-auto max-w-[128px] object-contain opacity-55 grayscale transition-all duration-200 ease-out group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : (
        <span className="whitespace-nowrap font-display text-sm font-semibold tracking-tight text-muted transition-all duration-200 ease-out group-hover:scale-105 group-hover:text-navy">
          {client.name}
        </span>
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-navy opacity-0 shadow-sm transition-all duration-200 ease-out group-hover:-translate-y-3 group-hover:opacity-100"
      >
        {client.name}
      </span>
    </div>
  );
}

export function LogoWall({ compact = false, className }: { compact?: boolean; className?: string }) {
  if (compact) {
    return (
      <Marquee pauseOnHover duration={48} className={className}>
        {clients.map((c) => <LogoCell key={c.domain} client={c} />)}
      </Marquee>
    );
  }
  const mid = Math.ceil(clients.length / 2);
  return (
    <div className={className}>
      {/* Desktop: static grid — a wall, not a carnival */}
      <div className="hidden flex-wrap items-center justify-center gap-x-2 gap-y-4 sm:flex">
        {clients.map((c) => <LogoCell key={c.domain} client={c} />)}
      </div>
      {/* Mobile: two slow counter-rows */}
      <div className={cn("space-y-2 sm:hidden")}>
        <Marquee pauseOnHover duration={56}>
          {clients.slice(0, mid).map((c) => <LogoCell key={c.domain} client={c} />)}
        </Marquee>
        <Marquee pauseOnHover duration={64}>
          {clients.slice(mid).map((c) => <LogoCell key={c.domain} client={c} />)}
        </Marquee>
      </div>
    </div>
  );
}
```

Note: check `src/components/motion/Marquee.tsx` for its actual props (`pauseOnHover`, `duration`, `className` are used elsewhere in `src/app/page.tsx:89,336` — match them exactly).

- [ ] **Step 2: Document the token in `README.md`** under the contact-form section:

```markdown
## Client logos

The trusted-by wall fetches brand marks from logo.dev. Set a publishable key in `.env.local`:

    NEXT_PUBLIC_LOGO_DEV_TOKEN=pk_...

Without the key (or when a logo 404s), each cell falls back to a styled text wordmark.
```

- [ ] **Step 3: Verify** — `npm test && npm run build` → both pass (component compiles; not yet rendered).

- [ ] **Step 4: Commit** — `git add src/components/ui/LogoWall.tsx README.md && git commit -m "feat: LogoWall with CDN marks, wordmark fallback, hover pop"`

---

### Task 3: Home — trusted-by section, gradient-free "Why Cardinal", solid chips

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `LogoWall` from Task 2.

- [ ] **Step 1: Insert the trusted-by section** in `src/app/page.tsx` between the hero (section 1, ends ~line 85) and the category ticker (section 2). The ticker's `mt-20 sm:mt-28` moves onto the new section; remove it from the ticker:

```tsx
      {/* 2 — Trusted by */}
      <section className="mx-auto mt-20 max-w-7xl px-6 sm:mt-28">
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Trusted by the world&apos;s leading operators
          </p>
          <LogoWall className="mt-10" />
        </Reveal>
      </section>
```

Add `import { LogoWall } from "@/components/ui/LogoWall";`. Final margins: trusted-by section `mt-20 sm:mt-28` (as above); ticker section becomes `mt-16 border-y border-line/70 bg-panel/50 py-5 sm:mt-20`.

- [ ] **Step 2: Rebuild section 5 ("Why Cardinal", `src/app/page.tsx:246-276`)** — replace the entire full-bleed block with a white split section, no overlay, no parallax:

```tsx
      {/* 5 — Why Cardinal: white, split, snappy */}
      <section className="border-y border-line/70">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 sm:py-32 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Why Cardinal</Eyebrow>
            <p className="mt-6 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-navy sm:text-5xl">
              Robots don&apos;t fail at the demo. They fail at deployment.
            </p>
            <p className="mt-5 max-w-xl leading-relaxed">
              That&apos;s the part we own: installation, integration, training, and 3,000+ certified technicians on call nationwide.
            </p>
            <div className="mt-8">
              <Button href="/servicing" variant="outline">How servicing works</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-line shadow-xl shadow-navy/[0.06]">
              <img
                src={IMG.warehouse}
                alt="Commercial robot operating on a facility floor"
                loading="lazy"
                className="img-tone aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
```

(`Parallax` import stays — the hero still uses it.)

- [ ] **Step 3: Make the hero stat chips solid** — in the hero (lines 72-81), replace both chips' `glass` class with `bg-paper` so they read as crisp white chips: `className="flex items-baseline gap-2.5 rounded-full border border-line bg-paper px-5 py-2.5 shadow-sm"` (second chip keeps its `hidden sm:flex`).

- [ ] **Step 4: Verify** — `npm test && npm run build`; then `npm run dev`, load `/`, confirm: logo wall renders (wordmarks if no token), hover pops a label, Why-Cardinal has zero gradient.

- [ ] **Step 5: Commit** — `git add src/app/page.tsx && git commit -m "feat: trusted-by wall on home; gradient-free Why Cardinal"`

---

### Task 4: New-page fact modules (assembly, data ops, research, logistics, about)

**Files:**
- Create: `src/data/assembly.ts`, `src/data/dataops.ts`, `src/data/research.ts`, `src/data/logistics.ts`, `src/data/about.ts`
- Modify: `src/data/financing.ts`, `src/data/servicing.ts`, `src/data/security.ts`, `tests/data.test.ts`

**Interfaces:**
- Produces (consumed by Tasks 6–9 pages):
  - `assemblyPillars: { title: string; body: string; source: string }[]`
  - `dataOpsStats`, `researchStats`, `financingHighlights`, `servicingHighlights: { value: string; label: string; source: string }[]`
  - `researchNote: { text: string; source: string }`
  - `logisticsSections: { title: string; body: string; image: string; imageAlt: string; source: string }[]`
  - `aboutFacts: { headline, origin, hq, founders, veterans, source: string }` (all strings)
  - `dataResidency: { headline: string; body: string; source: string }` from `security.ts`

- [ ] **Step 1: Write the failing tests** — append to `tests/data.test.ts` (add imports for every new export):

```ts
import { assemblyPillars } from "@/data/assembly";
import { dataOpsStats } from "@/data/dataops";
import { researchStats, researchNote } from "@/data/research";
import { logisticsSections } from "@/data/logistics";
import { aboutFacts } from "@/data/about";
import { financingHighlights } from "@/data/financing";
import { servicingHighlights } from "@/data/servicing";
import { dataResidency } from "@/data/security";
```

```ts
  it("expansion facts are present and founder-sourced", () => {
    const sourced = [
      ...assemblyPillars, ...dataOpsStats, ...researchStats,
      ...logisticsSections, ...financingHighlights, ...servicingHighlights,
      researchNote, aboutFacts, dataResidency,
    ];
    for (const f of sourced) expect(f.source).toContain("founder-provided 2026-07-18");
    expect(assemblyPillars).toHaveLength(4);
    expect(dataOpsStats).toHaveLength(3);
    expect(researchStats).toHaveLength(3);
    expect(logisticsSections.map((s) => s.title)).toEqual([
      "Dedicated Insurance", "US Shipping of Robots", "Warehousing & Parts",
    ]);
    expect(financingHighlights.map((h) => h.value)).toEqual(["$800M", "<5%", "0%"]);
  });

  it("the canonical technician count is 3,000+ wherever it appears", () => {
    expect(servicingHighlights.find((h) => h.label.includes("technicians"))?.value).toBe("3,000+");
    expect(aboutFacts.veterans).toContain("3,000+");
  });
```

- [ ] **Step 2: Run tests** — `npm test` → FAIL (modules missing).

- [ ] **Step 3: Create the modules.** `const SRC = "founder-provided 2026-07-18";` in each.

`src/data/assembly.ts`:

```ts
const SRC = "founder-provided 2026-07-18";

export const assemblyPillars = [
  { title: "Assembled in the USA", body: "Robots assembled onshore, with U.S. manufacturing at the core of every build.", source: SRC },
  { title: "Supply chain assurance", body: "Secure systems and supply-chain assurance from component sourcing to final assembly.", source: SRC },
  { title: "Industry veterans", body: "Built by engineers from Rivian, Intel, Tesla, and JCI.", source: SRC },
  { title: "DFM + DFS for OEMs", body: "Comprehensive design-for-manufacturing and design-for-service capabilities, offered to all OEMs.", source: SRC },
];
```

`src/data/dataops.ts`:

```ts
const SRC = "founder-provided 2026-07-18";

export const dataOpsStats = [
  { value: "400+", label: "Engineers in India", source: SRC },
  { value: "24/7", label: "Data operations", source: SRC },
  { value: "Global", label: "Operational presence", source: SRC },
];
```

`src/data/research.ts`:

```ts
const SRC = "founder-provided 2026-07-18";

export const researchStats = [
  { value: "5+", label: "Patents granted", source: SRC },
  { value: "3", label: "Stanford spinouts", source: SRC },
  { value: "25", label: "R&D engineers", source: SRC },
];

export const researchNote = {
  text: "Stanford PhDs building the future of robotics design — in-house engineering and integrations, end to end.",
  source: SRC,
};
```

`src/data/logistics.ts` (copy is fresh — the mock's body text was placeholder; no invented stats):

```ts
const SRC = "founder-provided 2026-07-18 (headings); copy drafted, no numeric claims";

export const logisticsSections = [
  {
    title: "Dedicated Insurance",
    body: "Every deployment is covered by dedicated insurance arranged for the robot, the facility, and the work it performs — handled by Cardinal, not left to the operator.",
    image: "/images/insurance.jpg",
    imageAlt: "Service robot operating in a hotel lobby",
    source: SRC,
  },
  {
    title: "US Shipping of Robots",
    body: "Nationwide white-glove freight: crating, transport, and delivery to your dock, scheduled around installation so robots arrive ready to work.",
    image: "/images/shipping.jpg",
    imageAlt: "Logistics crates staged in a warehouse",
    source: SRC,
  },
  {
    title: "Warehousing & Parts",
    body: "Elevator, IoT, powered-door, and API-based integrations, backed by warehoused parts — we integrate with any environment, software, and platform as required.",
    image: "/images/parts.jpg",
    imageAlt: "Warehouse racking with stocked parts",
    source: SRC,
  },
];
```

`src/data/about.ts` (approved softened headline; 3,000+ supersedes the 2,000 figure):

```ts
const SRC = "founder-provided 2026-07-18";

export const aboutFacts = {
  headline: "The nation's largest robotics deployment company.",
  origin: "Spun out of Stanford, redefining automation across industries with advanced robotic solutions.",
  hq: "Headquartered in Palo Alto, California.",
  founders: "Founded by PhDs from Stanford, MIT, and Berkeley — world-class research combined with industry expertise.",
  veterans: "400+ engineers in India and 3,000+ U.S. service technicians, many of them veterans upskilled into top-tier robotics service careers.",
  source: SRC,
};
```

- [ ] **Step 4: Extend the existing modules.**

Append to `src/data/financing.ts`:

```ts
export const financingHighlights = [
  { value: "$800M", label: "Dedicated capital facility", source: "founder-provided 2026-07-18" },
  { value: "<5%", label: "Annualized rate", source: "founder-provided 2026-07-18" },
  { value: "0%", label: "Dilution", source: "founder-provided 2026-07-18" },
];
```

Append to `src/data/servicing.ts`:

```ts
export const servicingHighlights = [
  { value: "24/7", label: "Support line", source: "founder-provided 2026-07-18" },
  { value: "3,000+", label: "Certified technicians nationwide", source: "founder-provided 2026-07-18" },
  { value: "Veterans", label: "Upskilled into robot technicians", source: "founder-provided 2026-07-18" },
];
```

Append to `src/data/security.ts`:

```ts
export const dataResidency = {
  headline: "No Wi-Fi. U.S. servers. 100% audited.",
  body: "Cardinal robots operate without Wi-Fi — all fleet data stays on U.S. data servers, and every system is fully audited.",
  source: "founder-provided 2026-07-18 (softened wording, approved)",
};
```

- [ ] **Step 5: Run tests** — `npm test` → PASS (existing assertions untouched: `financeTerms` "3–5% annually" remains).

- [ ] **Step 6: Commit** — `git add src/data tests/data.test.ts && git commit -m "feat: founder-provided fact modules for expansion pages"`

---

### Task 5: Navigation — grouped dropdowns, footer, route registry

**Files:**
- Modify: `src/data/navigation.ts`, `src/components/layout/Header.tsx`, `tests/data.test.ts` (ROUTES + nav test)

**Interfaces:**
- Produces: `NavItem { label: string; href?: string; children?: { label: string; href: string }[] }`, `headerNav: NavItem[]`; updated `footerColumns`. Header renders `headerNav`; `headerLinks` export is **removed** (update the test import).

- [ ] **Step 1: Rewrite `src/data/navigation.ts`:**

```ts
export interface NavLink { label: string; href: string }
export interface NavItem { label: string; href?: string; children?: NavLink[] }

// Approved IA: Robots keeps its category mega-menu (special-cased in Header).
export const headerNav: NavItem[] = [
  { label: "Financing", href: "/financing" },
  {
    label: "Services",
    children: [
      { label: "Servicing", href: "/servicing" },
      { label: "Insurance & Shipping", href: "/insurance-shipping" },
    ],
  },
  {
    label: "Trust",
    children: [
      { label: "Cyber Security", href: "/security" },
      { label: "US Assembly", href: "/us-assembly" },
    ],
  },
  {
    label: "Technology",
    children: [
      { label: "Data Collection", href: "/data-collection" },
      { label: "Research & Development", href: "/research" },
      { label: "Platform", href: "/platform" },
    ],
  },
  { label: "About", href: "/about" },
];

export const footerColumns = [
  {
    title: "Fleet",
    links: [
      { label: "All robots", href: "/robots" },
      { label: "Industries", href: "/industries" },
      { label: "Vacuuming", href: "/robots/vacuuming" },
      { label: "Delivery", href: "/robots/delivery" },
      { label: "UV-C Disinfection", href: "/robots/disinfection" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Servicing", href: "/servicing" },
      { label: "Insurance & Shipping", href: "/insurance-shipping" },
      { label: "Financing", href: "/financing" },
      { label: "Platform", href: "/platform" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Cyber Security", href: "/security" },
      { label: "US Assembly", href: "/us-assembly" },
      { label: "Data Collection", href: "/data-collection" },
      { label: "Research & Development", href: "/research" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const youtubeUrl = "https://www.youtube.com/@cardinalrobotics4147";
export const linkedinUrl = "https://www.linkedin.com/in/karanguptasf/";
```

- [ ] **Step 2: Update `tests/data.test.ts`** — replace the `headerLinks` import with `headerNav`, extend `ROUTES`, and rewrite the nav test:

```ts
const ROUTES = [
  "/", "/platform", "/robots", "/industries", "/servicing",
  "/security", "/financing", "/about", "/contact",
  "/us-assembly", "/data-collection", "/research", "/insurance-shipping",
  ...categories.map((c) => `/robots/${c.slug}`),
];
```

```ts
  it("navigation links point at real routes", () => {
    const links = [
      ...headerNav.flatMap((i) => (i.children ? i.children : [{ label: i.label, href: i.href! }])),
      ...footerColumns.flatMap((c) => c.links),
    ];
    for (const l of links) {
      if (l.href.startsWith("/")) expect(ROUTES.includes(l.href.split("#")[0]), l.href).toBe(true);
    }
  });
```

- [ ] **Step 3: Run tests** — `npm test` → the nav test PASSES against data, but the build will fail until Header is updated and routes exist (Tasks 6–9 add routes; test only checks the registry). `npm run build` FAILS now (Header imports `headerLinks`) — expected; fix next.

- [ ] **Step 4: Rewrite `src/components/layout/Header.tsx`** — generalize the existing dropdown pattern (keep the exact glass/scale/cubic-bezier treatment from the current Robots dropdown at `Header.tsx:33-40`) into a `NavDropdown` used for Services/Trust/Technology, keep the Robots mega-menu as-is, render flat items as plain links, and mirror groups in the mobile panel:

```tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { headerNav } from "@/data/navigation";
import { categories } from "@/data/categories";
import { cn } from "@/lib/cn";

function Chevron() {
  return (
    <svg viewBox="0 0 10 6" aria-hidden className="h-1.5 w-2.5 stroke-current transition-transform duration-200 ease-out group-hover:rotate-180" fill="none" strokeWidth="1.5" strokeLinecap="round">
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

const panelCn = cn(
  "invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0",
  "origin-top scale-[0.97] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
  "group-hover:visible group-hover:scale-100 group-hover:opacity-100",
  "group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100",
);

function NavDropdown({ label, children }: { label: string; children: { label: string; href: string }[] }) {
  return (
    <div className="group relative">
      <button type="button" className="inline-flex items-center gap-1.5 text-sm text-body transition-colors duration-150 hover:text-navy">
        {label}
        <Chevron />
      </button>
      <div className={panelCn}>
        <div className="glass w-56 rounded-2xl border border-line/70 p-2 shadow-xl shadow-navy/[0.07]">
          {children.map((l) => (
            <Link key={l.href} href={l.href} className="block rounded-lg px-3.5 py-2.5 text-sm text-body transition-colors duration-100 hover:bg-cardinal-50 hover:text-cardinal-700">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

The component body keeps the current structure (`Header.tsx:11-111`): logo link, then desktop nav = Robots mega-menu (unchanged JSX) followed by `headerNav.map((item) => item.children ? <NavDropdown .../> : <Link .../>)`, then the Contact button. Mobile panel: Robots link, then for each `headerNav` item either the link or a mono-eyebrow group label with its children indented:

```tsx
            {headerNav.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{item.label}</p>
                  <div className="mt-2 flex flex-col gap-3 border-l border-line pl-4">
                    {item.children.map((l) => (
                      <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-body">{l.label}</Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href!} onClick={() => setMobileOpen(false)} className="text-body">{item.label}</Link>
              ),
            )}
```

- [ ] **Step 5: Verify** — `npm test` passes; `npm run build` still fails on missing routes only if a `Link` prerender check trips — Next static export does not fail on unknown hrefs, so build should PASS. Manually check dropdown keyboard access (Tab into group → panel opens via `focus-within`).

- [ ] **Step 6: Commit** — `git add src/data/navigation.ts src/components/layout/Header.tsx tests/data.test.ts && git commit -m "feat: grouped dropdown navigation for expanded IA"`

---

### Task 6: US Assembly page

**Files:**
- Create: `src/app/us-assembly/page.tsx`

**Interfaces:**
- Consumes: `assemblyPillars` from `@/data/assembly`; UI kit (`SectionHeading`, `Card`, `CTAPanel`, `Reveal`, `Stagger`, `StaggerItem`).

- [ ] **Step 1: Create the page:**

```tsx
import type { Metadata } from "next";
import { assemblyPillars } from "@/data/assembly";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "US Assembly" };

export default function UsAssemblyPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="US Assembly"
              title="Assembled in the USA."
              lede="Onshore assembly and U.S. manufacturing, with secure systems and supply-chain assurance behind every robot we deploy."
            />
          </Reveal>
        </div>
      </section>

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
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Engineering pedigree</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed">
            Our manufacturing and service engineering team draws on experience from Rivian, Intel, Tesla, and JCI —
            bringing automotive-grade rigor to commercial robotics.
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

- [ ] **Step 2: Verify** — `npm test && npm run build`; `/us-assembly` renders in dev.
- [ ] **Step 3: Commit** — `git add src/app/us-assembly && git commit -m "feat: US Assembly page"`

---

### Task 7: Data Collection page

**Files:**
- Create: `src/app/data-collection/page.tsx`

**Interfaces:**
- Consumes: `dataOpsStats` from `@/data/dataops`; UI kit as in Task 6.

- [ ] **Step 1: Create the page** (stat trio as the hero artwork, matching the bento/metric aesthetic):

```tsx
import type { Metadata } from "next";
import { dataOpsStats } from "@/data/dataops";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Data Collection" };

export default function DataCollectionPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Data Collection"
              title="Data operations that never sleep."
              lede="A global data operation behind every deployed robot — labeling, quality, and analytics running around the clock."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Stagger className="grid gap-4 md:grid-cols-3">
          {dataOpsStats.map((s) => (
            <StaggerItem key={s.label}>
              <Card className="h-full text-center">
                <p className="font-mono tabular text-5xl font-medium tracking-tight text-cardinal-700">{s.value}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">{s.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTAPanel
        title="Put your fleet's data to work."
        body="24/7 data operations with a global presence, feeding measurable ROI."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
```

- [ ] **Step 2: Verify + commit** — `npm test && npm run build`; `git add src/app/data-collection && git commit -m "feat: Data Collection page"`

---

### Task 8: Research & Development page

**Files:**
- Create: `src/app/research/page.tsx`

**Interfaces:**
- Consumes: `researchStats`, `researchNote` from `@/data/research`.

- [ ] **Step 1: Create the page:**

```tsx
import type { Metadata } from "next";
import { researchStats, researchNote } from "@/data/research";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Research & Development" };

export default function ResearchPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Research & Development"
              title="Research that ships."
              lede={researchNote.text}
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Stagger className="grid gap-4 md:grid-cols-3">
          {researchStats.map((s) => (
            <StaggerItem key={s.label}>
              <Card className="h-full text-center">
                <p className="font-mono tabular text-5xl font-medium tracking-tight text-cardinal-700">{s.value}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">{s.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-16 border-t border-line/70 pt-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">In-house, end to end</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed">
            Robotics design, engineering, and integrations happen under one roof — from prototype to
            production deployment, with three Stanford spinouts to show for it.
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

- [ ] **Step 2: Verify + commit** — `npm test && npm run build`; `git add src/app/research && git commit -m "feat: Research & Development page"`

---

### Task 9: Insurance & Shipping page (zigzag per approved mock)

**Files:**
- Create: `src/app/insurance-shipping/page.tsx`

**Interfaces:**
- Consumes: `logisticsSections` from `@/data/logistics` (images arrive in Task 11; until then cells show the bordered frame with the image 404ing in dev — acceptable inside this branch, resolved before the imagery commit).

- [ ] **Step 1: Create the page** — alternating text/image rows exactly like the mock (text left/image right, then flipped):

```tsx
import type { Metadata } from "next";
import { logisticsSections } from "@/data/logistics";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAPanel } from "@/components/ui/CTAPanel";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Insurance & Shipping" };

export default function InsuranceShippingPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Insurance & Shipping"
              title="Covered from dock to deployment."
              lede="Insurance, freight, warehousing, and integrations — the unglamorous half of robotics, handled."
            />
          </Reveal>
        </div>
      </section>

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

- [ ] **Step 2: Verify + commit** — `npm test && npm run build`; `git add src/app/insurance-shipping && git commit -m "feat: Insurance & Shipping page"`

---

### Task 10: Rebuild existing pages — Financing trio, Servicing highlights, Cyber Security, About

**Files:**
- Modify: `src/app/financing/page.tsx`, `src/app/servicing/page.tsx`, `src/app/security/page.tsx`, `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `financingHighlights`, `servicingHighlights`, `dataResidency`, `aboutFacts` (Task 4), `LogoWall` (Task 2).

- [ ] **Step 1: Financing** — read the current page first; insert a stat trio directly under the hero `SectionHeading`, same Card treatment as Task 7's trio:

```tsx
        <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
          {financingHighlights.map((h) => (
            <StaggerItem key={h.label}>
              <Card className="h-full text-center">
                <p className="font-mono tabular text-5xl font-medium tracking-tight text-cardinal-700">{h.value}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">{h.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
```

- [ ] **Step 2: Servicing** — in `src/app/servicing/page.tsx`, add the same trio pattern with `servicingHighlights` under the hero, and add a veterans line to the certifications section (`page.tsx:65-73`): after the certs badges, `<p className="mt-4 text-sm leading-relaxed">Cardinal upskills U.S. veterans into certified robot technicians — service careers, not gig work.</p>`. Update the hero `lede` to mention the 24/7 support line: "Break-fix and preventative maintenance across the US — a 24/7 support line and 3,000+ service delivery professionals through Cardinal and partner networks."

- [ ] **Step 3: Cyber Security** — in `src/app/security/page.tsx`: retitle metadata + hero to "Cyber Security"; hero title becomes `dataResidency.headline` context: add a full-width statement band after the hero:

```tsx
      <section className="border-b border-line bg-cardinal-50 py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <p className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">{dataResidency.headline}</p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed">{dataResidency.body}</p>
          </Reveal>
        </div>
      </section>
```

Keep the existing `securityFeatures` grid and compliance badges (SOC 2 / ISO 27001 already lead `complianceBadges`).

- [ ] **Step 4: About** — rebuild `src/app/about/page.tsx` around `aboutFacts`: hero = `aboutFacts.headline` with `origin` as lede; a two-column section for `hq` + `founders`; a team section for `veterans`; close with the client reprise before the CTA:

```tsx
      <section className="border-t border-line/70 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-muted">
              We proudly serve some of the world&apos;s most prominent organizations
            </p>
            <LogoWall compact className="mt-10" />
          </Reveal>
        </div>
      </section>
```

Read the current About page before editing and preserve any sourced content that doesn't conflict (roadmap, timeline, etc.).

- [ ] **Step 5: Verify** — `npm test && npm run build`; click through all four pages in dev.
- [ ] **Step 6: Commit** — `git add src/app && git commit -m "feat: financing trio, servicing 24/7+veterans, cyber security band, about rebuild"`

---

### Task 11: Self-hosted imagery

**Files:**
- Create: `public/images/*.jpg` (hero, warehouse, engineer, insurance, shipping, parts — ~6 files)
- Modify: `src/app/page.tsx` (IMG map), any other file with `images.unsplash.com` (grep), `tests/data.test.ts` (hotlink guard)

- [ ] **Step 1: Write the failing hotlink-guard test** — append to `tests/data.test.ts`:

```ts
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return sourceFiles(p);
    return /\.(tsx?|css)$/.test(name) ? [p] : [];
  });
}

  it("no hotlinked stock imagery in src", () => {
    for (const f of sourceFiles("src")) {
      expect(readFileSync(f, "utf8"), f).not.toContain("images.unsplash.com");
    }
  });
```

Run `npm test` → FAIL (page.tsx hotlinks).

- [ ] **Step 2: Source the photos.** Search Unsplash for *commercial service robots in context* — delivery robots in restaurants/hotels, floor scrubbers in lobbies, warehouse logistics, parts racking. Download candidates with `curl -L -o public/images/<name>.jpg "https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=1600&q=80"` (start from the three IDs already in `src/app/page.tsx:22-24`), then **view every file with the Read tool** and keep only images that actually show relevant subject matter (real robots/facilities, no people-as-subject stock clichés, no AI-generated look). Required files: `hero.jpg` (robot in facility, 2400w), `warehouse.jpg`, `engineer.jpg`, `insurance.jpg` (robot in hospitality/lobby), `shipping.jpg` (freight/crates), `parts.jpg` (racking/parts). Target < 400 KB each (`q=80`, appropriate `w`).

- [ ] **Step 3: Point the site at local files** — in `src/app/page.tsx` replace the `IMG` map values with `/images/hero.jpg`, `/images/warehouse.jpg`, `/images/engineer.jpg`; grep `grep -rn "images.unsplash.com" src/` and replace any other occurrences with local paths.

- [ ] **Step 4: Verify** — `npm test` (hotlink guard passes) `&& npm run build`; confirm `/insurance-shipping` images now render.

- [ ] **Step 5: Commit** — `git add public/images src tests && git commit -m "feat: self-hosted curated robot imagery"`

---

### Task 12: Typography, motion, and spacing audit + final QA

**Files:**
- Modify: `src/components/diagrams/DashboardMock.tsx` (+ any component failing the audit), `src/app/globals.css` (only if a token is missing)

- [ ] **Step 1: Console font audit** — read `src/components/diagrams/DashboardMock.tsx` and every file in `src/components/diagrams/`; every text node must carry an explicit font class (`font-mono` for data/labels/chrome, `font-display` for headings). Add `tabular` to every numeric readout. Same check for `SpecTable.tsx`, `StatCounter.tsx`, and the fleet-console chrome in `src/app/page.tsx:304-312`.

- [ ] **Step 2: Transparency audit** — `grep -rn "glass\|backdrop-blur\|/85\|/70\|/20\b" src/app src/components | grep -v Header` — the only permitted hits after this step: Header/dropdowns, border opacity modifiers (`border-line/60,70`), `bg-panel/40,50` section tints. Remove any remaining gradient washes over images (`bg-gradient-to-*` over photos).

- [ ] **Step 3: Eyebrow/tracking consistency** — `grep -rn "tracking-\[0\." src | sort` — normalize mono eyebrows to `tracking-[0.2em]` and small chips/labels to `tracking-[0.15em]`; no third value.

- [ ] **Step 4: Spacing rhythm** — every page's sections use `py-24` (or `py-24 sm:py-32` for majors); heroes `py-24`; no odd one-off paddings (`grep -rn "py-2[0-9]\|py-3[0-9]" src/app`).

- [ ] **Step 5: Full verification** — `npm test && npm run build`; dev click-through of all 13 routes; keyboard-tab the three new dropdowns; toggle `prefers-reduced-motion` in devtools and confirm marquees stop and reveals render statically.

- [ ] **Step 6: Commit** — `git add -A src && git commit -m "polish: typography, transparency, and spacing audit"`

---

## Self-review notes

- Spec §3.1 (gradient removal) → Tasks 3, 12. §3.2 (typography) → Task 12. §3.3 (imagery) → Task 11. §3.5 (brand presence) → logo already in header/footer/ticker; console chrome check in Task 12. §4 (logo wall) → Tasks 1–3, About reprise Task 10. §5 (IA) → Tasks 5–10. §7 (error handling) → Task 2 fallback. §8 (testing) → Tasks 1, 4, 5, 11.
- Type check: `Client` (Task 1) matches LogoWall usage (Task 2); `headerNav`/`NavItem` (Task 5) matches Header rewrite; all Task 4 export names match page imports in Tasks 6–10.
