# Cardinal Robotics Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Cardinal Robotics marketing site per the approved spec at `docs/superpowers/specs/2026-07-11-cardinal-robot-website-design.md` — 10 routes, dark cinematic design, all facts sourced from the existing cardinalrobot.com.

**Architecture:** Next.js App Router with `output: 'export'` (fully static). All factual content lives in typed files under `src/data/` (the "fact vault"), verified by vitest data-integrity tests. Pages compose shared UI/motion/diagram components; diagrams are SVG/canvas React components, no raster images.

**Tech Stack:** Next.js 15+, React 19, TypeScript strict, Tailwind CSS v4, Framer Motion, vitest. Fonts via `next/font/google`: Space Grotesk (display), Inter (body), JetBrains Mono (technical).

## Global Constraints

- **Verified facts only.** Every stat/spec/claim must come from the spec's Fact Source Table (§9). Never invent numbers, customers, or quotes. Resolved values: **3,000+ technicians**, **Stanford & Berkeley**, **3–5% discount rates**, **from $2.99/hr (vacuuming)**.
- **Colors:** bg `#0A0A0B`, raised `#111114`, borders `#1A1A1F`, headings `#F5F5F4`, body `#A1A1AA`, captions `#63636B`, cardinal `#D6453D`, hover/glow `#F05941`, status green `#3ECF8E` (online indicators only).
- **Copy voice:** short declarative sentences, no exclamation marks, specifics over adjectives.
- **Motion:** reveals = fade + 20px rise, 0.5s, 80ms stagger; hovers 150ms; one hero moment per page; `prefers-reduced-motion` collapses everything to fades/static.
- **Static export must always pass:** `npm run build` produces `out/`. No server features. `images.unoptimized: true`.
- **TypeScript strict; every internal link derived from `navigation.ts`/`categories.ts` data where possible.**
- Working directory: `/Users/karangupta/Projects/cardinal-robot`. Commit after every task.

## File Map (what exists when done)

```
next.config.ts, tsconfig.json, postcss.config.mjs, vitest.config.ts, package.json, .gitignore
src/app/            layout.tsx, page.tsx, globals.css, not-found.tsx,
                    platform/page.tsx, robots/page.tsx, robots/RobotsCatalog.tsx,
                    robots/[category]/page.tsx, industries/page.tsx, servicing/page.tsx,
                    security/page.tsx, financing/page.tsx, about/page.tsx,
                    contact/page.tsx, contact/ContactForm.tsx
src/components/layout/   Header.tsx (incl. internal MobileMenu), Footer.tsx
src/components/ui/       Eyebrow.tsx, SectionHeading.tsx, Button.tsx, Badge.tsx, Card.tsx,
                         StatCounter.tsx, SpecTable.tsx, CTAPanel.tsx
src/components/motion/   Reveal.tsx, Stagger.tsx, CountUp.tsx
src/components/diagrams/ FleetGridCanvas.tsx, LifecycleDiagram.tsx, SecurityFlowDiagram.tsx,
                         USCoverageMap.tsx, DashboardMock.tsx, RoadmapTimeline.tsx, us-dots.ts
src/data/           types.ts, categories.ts, robots.ts, stats.ts, industries.ts,
                    roadmap.ts, navigation.ts, security.ts, servicing.ts, financing.ts
src/lib/            cn.ts
tests/              data.test.ts
```

---

### Task 1: Project scaffold, theme, and build gate

**Files:**
- Create: `package.json` (via npm), `.gitignore`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `vitest.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/lib/cn.ts`

**Interfaces:**
- Produces: theme tokens usable as Tailwind classes (`bg-ink-950`, `text-ink-300`, `text-cardinal-500`, `bg-cardinal-500`, `text-status`, `font-display`, `font-body`, `font-mono`), global CSS utilities `.blueprint-grid` and `.glow-cardinal`, `cn(...inputs: ClassValue[]): string` from `@/lib/cn`.

- [ ] **Step 1: Install dependencies**

```bash
cd /Users/karangupta/Projects/cardinal-robot
npm install next@latest react@latest react-dom@latest framer-motion clsx tailwind-merge
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss vitest
```

- [ ] **Step 2: Create config files**

`.gitignore`:
```
node_modules/
.next/
out/
.env.local
next-env.d.ts
*.tsbuildinfo
```

Add scripts to `package.json` (keep npm-generated dependency entries):
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "test": "vitest run"
}
```

`next.config.ts`:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`postcss.config.mjs`:
```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
```

- [ ] **Step 3: Create globals.css, root layout, placeholder home, cn util**

`src/app/globals.css`:
```css
@import "tailwindcss";

@theme {
  --color-ink-950: #0a0a0b;
  --color-ink-900: #111114;
  --color-ink-800: #1a1a1f;
  --color-ink-400: #63636b;
  --color-ink-300: #a1a1aa;
  --color-ink-50: #f5f5f4;
  --color-cardinal-500: #d6453d;
  --color-cardinal-400: #f05941;
  --color-status: #3ecf8e;
}

@theme inline {
  --font-display: var(--font-space-grotesk);
  --font-body: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono);
}

body {
  background: var(--color-ink-950);
  color: var(--color-ink-300);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

.blueprint-grid {
  background-image:
    linear-gradient(to right, rgb(255 255 255 / 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(255 255 255 / 0.03) 1px, transparent 1px);
  background-size: 48px 48px;
}

.glow-cardinal {
  box-shadow: 0 0 120px -20px rgb(214 69 61 / 0.35);
}

@media (prefers-reduced-motion: reduce) {
  .motion-pulse { display: none; }
}
```

`src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: {
    default: "Cardinal Robotics — Robotic Adoption Made Easy",
    template: "%s — Cardinal Robotics",
  },
  description:
    "Cardinal Robotics sources, deploys, trains, services, and finances commercial robots. 35,000+ robots deployed, 3,000+ technicians nationwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

`src/app/page.tsx` (placeholder, replaced in Task 7):
```tsx
export default function Home() {
  return <main className="p-24 font-display text-4xl text-ink-50">Cardinal Robotics</main>;
}
```

`src/lib/cn.ts`:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds, `out/index.html` exists. Verify: `ls out/index.html`

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js static-export site with dark theme tokens"
```

---

### Task 2: Data layer — the fact vault (TDD)

**Files:**
- Create: `src/data/types.ts`, `src/data/categories.ts`, `src/data/robots.ts`, `src/data/stats.ts`, `src/data/industries.ts`, `src/data/roadmap.ts`, `src/data/navigation.ts`, `src/data/security.ts`, `src/data/servicing.ts`, `src/data/financing.ts`
- Test: `tests/data.test.ts`

**Interfaces:**
- Produces (all later tasks consume these exact exports):
  - `types.ts`: `CategorySlug`, `RobotSpec {label,value}`, `Robot {slug,name,category,tagline,headlineSpecs:[string,string],specs:RobotSpec[],idealFor:string[],source}`, `Category {slug,name,blurb}`, `Stat {value:number,prefix?,suffix?,label}`, `Industry {slug,name,narrative,robotSlugs:string[],metric:{value,label}}`
  - `categories.ts`: `categories: Category[]` (8 entries)
  - `robots.ts`: `robots: Robot[]` (24 entries)
  - `stats.ts`: `heroStats: Stat[]`, `outcomes: {stat:string;context:string;source:string}[]`
  - `industries.ts`: `industries: Industry[]`, `casinoFteTable: {application:string;impact:string}[]`
  - `roadmap.ts`: `roadmap: {year:string;items:string[]}[]`
  - `navigation.ts`: `headerLinks: {label:string;href:string}[]`, `footerColumns: {title:string;links:{label:string;href:string}[]}[]`, `youtubeUrl: string`
  - `security.ts`: `securityFeatures: {title:string;body:string}[]`, `complianceBadges: string[]`
  - `servicing.ts`: `servicePillars: {title:string;points:string[]}[]`, `technicianCerts: string[]`
  - `financing.ts`: `financeTerms: {label:string;value:string}[]`, `financeEligibility: string[]`, `financeProcess: {step:string;title:string;body:string}[]`, `financeEmail: string`

**Every `source` field cites the cardinalrobot.com page the fact came from. Do not add facts that lack a source.**

- [ ] **Step 1: Write the failing data-integrity test**

`tests/data.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { robots } from "@/data/robots";
import { categories } from "@/data/categories";
import { heroStats, outcomes } from "@/data/stats";
import { industries, casinoFteTable } from "@/data/industries";
import { roadmap } from "@/data/roadmap";
import { headerLinks, footerColumns } from "@/data/navigation";
import { securityFeatures, complianceBadges } from "@/data/security";
import { servicePillars, technicianCerts } from "@/data/servicing";
import { financeTerms, financeProcess } from "@/data/financing";

const ROUTES = [
  "/", "/platform", "/robots", "/industries", "/servicing",
  "/security", "/financing", "/about", "/contact",
  ...categories.map((c) => `/robots/${c.slug}`),
];

describe("fact vault integrity", () => {
  it("has exactly 8 categories and 24 robots", () => {
    expect(categories).toHaveLength(8);
    expect(robots).toHaveLength(24);
  });

  it("has unique slugs", () => {
    expect(new Set(robots.map((r) => r.slug)).size).toBe(robots.length);
    expect(new Set(categories.map((c) => c.slug)).size).toBe(categories.length);
  });

  it("every robot references an existing category and cites a source", () => {
    const catSlugs = new Set(categories.map((c) => c.slug));
    for (const r of robots) {
      expect(catSlugs.has(r.category), `${r.slug} category`).toBe(true);
      expect(r.source, `${r.slug} source`).toMatch(/cardinalrobot\.com/);
      expect(r.specs.length, `${r.slug} specs`).toBeGreaterThan(0);
    }
  });

  it("every category has at least one robot", () => {
    for (const c of categories) {
      expect(robots.some((r) => r.category === c.slug), c.slug).toBe(true);
    }
  });

  it("industry robot references resolve", () => {
    const robotSlugs = new Set(robots.map((r) => r.slug));
    for (const ind of industries) {
      for (const s of ind.robotSlugs) expect(robotSlugs.has(s), `${ind.slug}: ${s}`).toBe(true);
    }
  });

  it("navigation links point at real routes", () => {
    const links = [...headerLinks, ...footerColumns.flatMap((c) => c.links)];
    for (const l of links) {
      const internal = l.href.startsWith("/");
      if (internal) expect(ROUTES.includes(l.href.split("#")[0]), l.href).toBe(true);
    }
  });

  it("reconciled facts use the approved values", () => {
    expect(heroStats.find((s) => s.label.includes("technicians"))?.value).toBe(3000);
    expect(financeTerms.find((t) => t.label === "Discount rate")?.value).toBe("3–5% annually");
  });

  it("non-empty content everywhere", () => {
    expect(heroStats.length).toBe(4);
    expect(outcomes.length).toBe(3);
    expect(industries.length).toBe(5);
    expect(casinoFteTable.length).toBe(5);
    expect(roadmap.length).toBe(2);
    expect(securityFeatures.length).toBeGreaterThanOrEqual(9);
    expect(complianceBadges).toEqual(["SOC 2", "ISO 27001", "HIPAA", "GDPR"]);
    expect(servicePillars.length).toBe(3);
    expect(technicianCerts.length).toBe(6);
    expect(financeProcess.length).toBe(3);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/data/robots` (files don't exist yet).

- [ ] **Step 3: Create the data files**

`src/data/types.ts`:
```ts
export type CategorySlug =
  | "vacuuming" | "scrubbing" | "delivery" | "disinfection"
  | "security" | "outdoor" | "food-beverage" | "specialty";

export interface RobotSpec { label: string; value: string }

export interface Robot {
  slug: string;
  name: string;
  category: CategorySlug;
  tagline: string;
  headlineSpecs: [string, string];
  specs: RobotSpec[];
  idealFor: string[];
  source: string;
}

export interface Category { slug: CategorySlug; name: string; blurb: string }

export interface Stat { value: number; prefix?: string; suffix?: string; label: string }

export interface Industry {
  slug: string;
  name: string;
  narrative: string;
  robotSlugs: string[];
  metric: { value: string; label: string };
}
```

`src/data/categories.ts`:
```ts
import type { Category } from "./types";

export const categories: Category[] = [
  { slug: "vacuuming", name: "Vacuuming", blurb: "Autonomous vacuums for every floor plan — from under-furniture units to large-area machines with LiDAR navigation." },
  { slug: "scrubbing", name: "Scrubbing & Sweeping", blurb: "Floor scrubbers and sweepers covering 8,000 to 30,000+ sq ft per hour, from quiet compact units to rideable machines." },
  { slug: "delivery", name: "Delivery", blurb: "Indoor delivery systems from tableside service to 1,000 lb payloads, elevator-compatible and running up to 24 hours per charge." },
  { slug: "disinfection", name: "UV-C Disinfection", blurb: "Autonomous ultraviolet disinfection deployed across 500+ hospitals." },
  { slug: "security", name: "Security", blurb: "Autonomous aerial patrol covering 4 acres in 30 seconds, in all weather." },
  { slug: "outdoor", name: "Outdoor & Facade", blurb: "Window-washing and pressure-washing drones for building exteriors, plus trash-sorting systems that cut landfill volume." },
  { slug: "food-beverage", name: "Food & Beverage", blurb: "Automated food preparation — smoothies in 60 seconds, salads, poke bowls, ice cream, and ramen." },
  { slug: "specialty", name: "Specialty", blurb: "Pool cleaning, indoor window cleaning, robotic massage, and front-of-house marketing robots." },
];
```

`src/data/robots.ts`:
```ts
import type { Robot } from "./types";

const SRC = "cardinalrobot.com/RaaS.php";

export const robots: Robot[] = [
  // ── Vacuuming ──────────────────────────────────────────────
  {
    slug: "v40", name: "V40", category: "vacuuming",
    tagline: "Built for large areas with autonomous mapping and controls.",
    headlineSpecs: ["~6,500 sq ft/hr", "3–4 hr battery"],
    specs: [
      { label: "Cleaning efficiency", value: "~6,500 sq ft/hr" },
      { label: "Battery life", value: "3–4 hours" },
      { label: "Charge time", value: "1.5 hours" },
      { label: "Weight", value: "176 lbs" },
      { label: "Navigation", value: "2D LiDAR, 3D camera, ultrasonic sensors" },
      { label: "Capabilities", value: "Floor-type identification, edge cleaning, obstacle avoidance" },
    ],
    idealFor: ["Hotels", "Casinos", "Offices"], source: SRC,
  },
  {
    slug: "whiz", name: "Whiz", category: "vacuuming",
    tagline: "Small, quiet, and reliable. Ideal for use during the day.",
    headlineSpecs: ["Daytime-quiet", "Compact footprint"],
    specs: [
      { label: "Profile", value: "Small, quiet, reliable" },
      { label: "Best use", value: "Daytime operation around guests and staff" },
    ],
    idealFor: ["Hotels", "Offices", "Schools"], source: SRC,
  },
  {
    slug: "v20", name: "V20", category: "vacuuming",
    tagline: "Designed for hallways and lobbies.",
    headlineSpecs: ["Hallways & lobbies", "Autonomous"],
    specs: [{ label: "Best use", value: "Hallways and lobbies" }],
    idealFor: ["Hotels", "Senior living"], source: SRC,
  },
  {
    slug: "v10", name: "V10", category: "vacuuming",
    tagline: "Cleans smaller spaces and fits under furniture.",
    headlineSpecs: ["Small spaces", "Under-furniture reach"],
    specs: [{ label: "Best use", value: "Smaller spaces; fits under furniture" }],
    idealFor: ["Offices", "Senior living"], source: SRC,
  },
  {
    slug: "mini-vacuum", name: "Mini Vacuum", category: "vacuuming",
    tagline: "Under 20 pounds, cleaning 2,600 sq ft per hour.",
    headlineSpecs: ["2,600 sq ft/hr", "Under 20 lbs"],
    specs: [
      { label: "Cleaning speed", value: "2,600 sq ft/hr" },
      { label: "Weight", value: "Under 20 lbs" },
    ],
    idealFor: ["Offices", "Schools"], source: SRC,
  },

  // ── Scrubbing & Sweeping ───────────────────────────────────
  {
    slug: "s50-pro", name: "S50 Pro", category: "scrubbing",
    tagline: "Intelligent mapping scrubber covering up to 12,000 sq ft per hour.",
    headlineSpecs: ["8,000–12,000 sq ft/hr", "~80% less water"],
    specs: [
      { label: "Cleaning efficiency", value: "8,000–12,000 sq ft/hr" },
      { label: "Battery life", value: "2–4 hours" },
      { label: "Charge time", value: "1.5 hours" },
      { label: "Weight", value: "330 lbs" },
      { label: "Filtration", value: "5-stage, ~80% water reduction" },
      { label: "Modes", value: "Intelligent mapping; manual mode available" },
    ],
    idealFor: ["Casinos", "Hospitals", "Convention floors"], source: SRC,
  },
  {
    slug: "scrubber", name: "Scrubber", category: "scrubbing",
    tagline: "Perfect for smaller areas. Quiet, autonomous, small footprint.",
    headlineSpecs: ["Small footprint", "Quiet operation"],
    specs: [{ label: "Profile", value: "Quiet, autonomous, small footprint" }],
    idealFor: ["Offices", "Schools"], source: SRC,
  },
  {
    slug: "sweeper", name: "Sweeper", category: "scrubbing",
    tagline: "Ideal for larger areas. Reliable coverage, and it can be ridden.",
    headlineSpecs: ["Large-area coverage", "Rideable"],
    specs: [
      { label: "Best use", value: "Larger areas" },
      { label: "Operation", value: "Autonomous or ridden" },
    ],
    idealFor: ["Casinos", "Convention floors"], source: SRC,
  },
  {
    slug: "s75", name: "S75", category: "scrubbing",
    tagline: "Garage sweeping at production scale.",
    headlineSpecs: ["30,000+ sq ft/hr", "Garage-rated"],
    specs: [{ label: "Production rate", value: "30,000+ sq ft/hr" }],
    idealFor: ["Parking garages", "Casinos"], source: SRC,
  },

  // ── Delivery ───────────────────────────────────────────────
  {
    slug: "d10", name: "D10", category: "delivery",
    tagline: "Delivers food and dishes from back-of-house to front-of-house.",
    headlineSpecs: ["BoH → FoH delivery", "Guest favorite"],
    specs: [{ label: "Use case", value: "Food and dish delivery, back-of-house to front-of-house" }],
    idealFor: ["Hotels", "Casinos", "Senior living"], source: SRC,
  },
  {
    slug: "d20", name: "D20", category: "delivery",
    tagline: "The D10's larger-capacity sibling.",
    headlineSpecs: ["Higher capacity", "BoH → FoH delivery"],
    specs: [{ label: "Use case", value: "Larger-capacity food and dish delivery" }],
    idealFor: ["Hotels", "Casinos"], source: SRC,
  },
  {
    slug: "room-delivery", name: "Room Delivery System", category: "delivery",
    tagline: "Saves 560+ labor hours every month on room delivery.",
    headlineSpecs: ["560+ labor hrs/mo saved", "12–24 hr battery"],
    specs: [
      { label: "Payload", value: "~88 lbs" },
      { label: "Carrying capacity", value: "20 gallons" },
      { label: "Battery life", value: "12–24 hours" },
      { label: "Charge time", value: "4 hours" },
      { label: "Impact", value: "Saves 560+ labor hours monthly" },
    ],
    idealFor: ["Hotels", "Casinos", "Hospitals"], source: SRC,
  },
  {
    slug: "titan", name: "Titan", category: "delivery",
    tagline: "Heavy payload delivery, elevator-compatible.",
    headlineSpecs: ["330–1,000 lbs payload", "Elevator-compatible"],
    specs: [
      { label: "Payload", value: "330–1,000 lbs" },
      { label: "Battery life", value: "10–24 hours" },
      { label: "Charge time", value: "5.5 hours" },
      { label: "Speed", value: "3.9 ft/second" },
      { label: "Access", value: "Elevator-compatible" },
    ],
    idealFor: ["Hospitals", "Casinos", "Hotels"], source: SRC,
  },

  // ── UV-C Disinfection ──────────────────────────────────────
  {
    slug: "uvc-robot", name: "UV-C Robot", category: "disinfection",
    tagline: "Autonomous ultraviolet disinfection, used across 500+ hospitals.",
    headlineSpecs: ["500+ hospitals", "Autonomous UV-C"],
    specs: [
      { label: "Deployment", value: "Used across 500+ hospitals" },
      { label: "Design", value: "Ergonomic, reliable, cost-effective" },
      { label: "Impact", value: "Disinfection in under 10 minutes, down from over 20" },
    ],
    idealFor: ["Hospitals", "Senior living", "Schools"], source: SRC,
  },

  // ── Security ───────────────────────────────────────────────
  {
    slug: "security-drone", name: "Security Drone", category: "security",
    tagline: "Covers 4 acres in 30 seconds, in all weather.",
    headlineSpecs: ["4 acres in 30 sec", "All-weather"],
    specs: [
      { label: "Flight time", value: "20 minutes" },
      { label: "Coverage", value: "4 acres in 30 seconds" },
      { label: "Conditions", value: "All-weather operation" },
    ],
    idealFor: ["Casinos", "Campuses", "Parking"], source: SRC,
  },

  // ── Outdoor & Facade ───────────────────────────────────────
  {
    slug: "window-drone", name: "Window-Washing Drone", category: "outdoor",
    tagline: "Pressure-washes building exteriors without lifts or scaffolding.",
    headlineSpecs: ["Facade cleaning", "Pressure washing"],
    specs: [{ label: "Use case", value: "Window washing and exterior pressure washing" }],
    idealFor: ["Hotels", "Offices"], source: SRC,
  },
  {
    slug: "trash-sorter", name: "Trash Sorting Robot", category: "outdoor",
    tagline: "Automated sorting that reduces landfill volume.",
    headlineSpecs: ["Automated sorting", "Landfill reduction"],
    specs: [{ label: "Use case", value: "Trash sorting for landfill reduction" }],
    idealFor: ["Casinos", "Campuses"], source: SRC,
  },

  // ── Food & Beverage ────────────────────────────────────────
  {
    slug: "smoothie-robot", name: "Smoothie Robot", category: "food-beverage",
    tagline: "A smoothie every 60 seconds, $2 profit per unit.",
    headlineSpecs: ["60-sec production", "$2 profit/unit"],
    specs: [
      { label: "Capacity", value: "84 smoothies" },
      { label: "Production time", value: "60 seconds" },
      { label: "Unit economics", value: "$2 profit per smoothie" },
    ],
    idealFor: ["Casinos", "Hotels", "Campuses"], source: SRC,
  },
  {
    slug: "salad-robot", name: "Salad Robot", category: "food-beverage",
    tagline: "Prepares salads, poke bowls, ice cream, and ramen.",
    headlineSpecs: ["4 menu formats", "Automated prep"],
    specs: [{ label: "Menu", value: "Salads, poke bowls, ice cream, ramen" }],
    idealFor: ["Casinos", "Campuses"], source: SRC,
  },

  // ── Specialty ──────────────────────────────────────────────
  {
    slug: "pool-120", name: "Pool Cleaner (120 ft)", category: "specialty",
    tagline: "Floor, waterline, and walls for pools up to 120 feet.",
    headlineSpecs: ["120 ft pools", "Floor + walls + waterline"],
    specs: [
      { label: "Pool size", value: "Up to 120 ft" },
      { label: "Cable", value: "138 ft" },
      { label: "Coverage", value: "Floor, waterline, and walls" },
    ],
    idealFor: ["Hotels", "Casinos"], source: SRC,
  },
  {
    slug: "pool-50", name: "Pool Cleaner (50 ft)", category: "specialty",
    tagline: "Full pool coverage for medium pools.",
    headlineSpecs: ["50 ft pools", "78 ft cable"],
    specs: [
      { label: "Pool size", value: "Up to 50 ft" },
      { label: "Cable", value: "78 ft" },
    ],
    idealFor: ["Hotels", "Senior living"], source: SRC,
  },
  {
    slug: "indoor-window", name: "Indoor Window Cleaner", category: "specialty",
    tagline: "Wet mop and microfiber window cleaning on a 110-minute battery.",
    headlineSpecs: ["110-min battery", "Wet mop + microfiber"],
    specs: [
      { label: "Cable", value: "24 ft" },
      { label: "Battery life", value: "110 minutes" },
      { label: "Attachments", value: "Wet mop and microfiber" },
    ],
    idealFor: ["Offices", "Hotels"], source: SRC,
  },
  {
    slug: "masseuse", name: "Robotic Masseuse", category: "specialty",
    tagline: "Back, shoulder, and leg massage generating $50–80 per hour.",
    headlineSpecs: ["$50–80/hr revenue", "300% ROI"],
    specs: [
      { label: "Revenue", value: "$50–80 per hour" },
      { label: "ROI", value: "300%" },
      { label: "Coverage", value: "Back, shoulder, and leg massage" },
    ],
    idealFor: ["Spas", "Casinos", "Hotels"], source: SRC,
  },
  {
    slug: "kettybot", name: "KettyBot", category: "specialty",
    tagline: "Front-of-house marketing and delivery with an 18.5-inch display.",
    headlineSpecs: ["18.5\" display", "66 lbs capacity"],
    specs: [
      { label: "Display", value: "18.5 inches" },
      { label: "Capacity", value: "66 lbs" },
      { label: "Use case", value: "Marketing, greeting, light delivery" },
    ],
    idealFor: ["Hotels", "Casinos", "Conventions"], source: SRC,
  },
];
```

`src/data/stats.ts`:
```ts
import type { Stat } from "./types";

// Sources: cardinalrobot.com home, finance.php, servicing.php, RaaS.php.
// Conflicts resolved per spec §9: 3,000+ technicians (servicing page wins).
export const heroStats: Stat[] = [
  { value: 35000, suffix: "+", label: "Robots deployed" },
  { value: 3000, suffix: "+", label: "Certified technicians nationwide" },
  { value: 500, suffix: "+", label: "Hospitals using Cardinal UV-C" },
  { value: 800, prefix: "$", suffix: "M", label: "Dedicated financing facility" },
];

export const outcomes = [
  {
    stat: "Under 10 minutes",
    context: "Room disinfection time with Cardinal UV-C robots, down from over 20 minutes.",
    source: "cardinalrobot.com home (client testimonials)",
  },
  {
    stat: "560+ hours saved monthly",
    context: "Labor hours returned to staff by the Room Delivery System.",
    source: "cardinalrobot.com/RaaS.php",
  },
  {
    stat: "No upfront costs",
    context: "Rentals from $2.99/hr with unlimited servicing included.",
    source: "cardinalrobot.com home",
  },
];
```

`src/data/industries.ts`:
```ts
import type { Industry } from "./types";

// Industries listed on cardinalrobot.com/RaaS.php: hospitals, senior living,
// hotels, schools, casinos, spas, conventions. Spas & conventions folded into
// Hotels & Resorts per spec §6. Casino FTE table used verbatim.
export const industries: Industry[] = [
  {
    slug: "hotels", name: "Hotels & Resorts",
    narrative: "From lobby vacuuming to room delivery, spa services, and conventions, robots keep service standards constant while your staff focuses on guests. The Room Delivery System alone returns 560+ labor hours to your team every month.",
    robotSlugs: ["room-delivery", "v40", "whiz", "pool-120", "masseuse", "kettybot"],
    metric: { value: "560+ hrs", label: "labor saved monthly by Room Delivery" },
  },
  {
    slug: "hospitals", name: "Hospitals & Healthcare",
    narrative: "Cardinal UV-C robots run medical-grade disinfection across 500+ hospitals, cutting room turnaround from over 20 minutes to under 10. Titan handles heavy logistics between floors, elevator-compatible and running up to 24 hours per charge.",
    robotSlugs: ["uvc-robot", "titan", "s50-pro"],
    metric: { value: "500+", label: "hospitals using Cardinal UV-C" },
  },
  {
    slug: "casinos", name: "Casinos & Gaming",
    narrative: "Casino floors never close, and neither do robots. Cardinal deployments across delivery, pool cleaning, vacuuming, and garage sweeping produce measurable FTE reductions per application — including a flat 20% cost reduction on garage cleaning.",
    robotSlugs: ["room-delivery", "sweeper", "s75", "security-drone", "smoothie-robot"],
    metric: { value: "20%", label: "flat cost reduction, garage cleaning" },
  },
  {
    slug: "senior-living", name: "Senior Living",
    narrative: "Labor shortages hit senior living hardest. Robots cover vacuuming, delivery, and disinfection so caregivers spend their hours on residents — with rentals from $2.99/hr and unlimited servicing included.",
    robotSlugs: ["v20", "d10", "uvc-robot"],
    metric: { value: "$2.99/hr", label: "rentals from, no upfront costs" },
  },
  {
    slug: "schools-offices", name: "Schools & Offices",
    narrative: "Quiet daytime-safe robots like Whiz work around occupants, while scrubbers cover up to 12,000 sq ft per hour after hours. One operator can run the whole fleet from a single dashboard.",
    robotSlugs: ["whiz", "scrubber", "s50-pro", "mini-vacuum"],
    metric: { value: "12,000 sq ft/hr", label: "peak scrubbing coverage (S50 Pro)" },
  },
];

export const casinoFteTable = [
  { application: "Room delivery", impact: "1–1.5 FTEs" },
  { application: "Linen delivery", impact: "1–2 FTEs" },
  { application: "Pool cleaning", impact: "0.25–0.5 FTE" },
  { application: "Guest room vacuuming", impact: "0.25 FTE" },
  { application: "Garage cleaning", impact: "Flat 20% cost reduction" },
];
```

`src/data/roadmap.ts`:
```ts
// Source: cardinalrobot.com/RaaS.php development roadmap.
export const roadmap = [
  {
    year: "2025",
    items: ["Garage cleaning automation", "Automated wok", "Outdoor window cleaning", "Automated forklift"],
  },
  {
    year: "2026+",
    items: ["Bed making (teleoperated)", "Bathroom cleaning (teleoperated)", "High dusting (teleoperated)", "Trash sorting"],
  },
];
```

`src/data/navigation.ts`:
```ts
export const headerLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Industries", href: "/industries" },
  { label: "Servicing", href: "/servicing" },
  { label: "Security", href: "/security" },
  { label: "Financing", href: "/financing" },
  { label: "About", href: "/about" },
];

export const footerColumns = [
  {
    title: "Fleet",
    links: [
      { label: "All robots", href: "/robots" },
      { label: "Vacuuming", href: "/robots/vacuuming" },
      { label: "Scrubbing & Sweeping", href: "/robots/scrubbing" },
      { label: "Delivery", href: "/robots/delivery" },
      { label: "UV-C Disinfection", href: "/robots/disinfection" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "How it works", href: "/platform" },
      { label: "Industries", href: "/industries" },
      { label: "Servicing", href: "/servicing" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Financing", href: "/financing" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const youtubeUrl = "https://www.youtube.com/@cardinalrobotics4147";
```

`src/data/security.ts`:
```ts
// Source: cardinalrobot.com/security.php.
export const securityFeatures = [
  { title: "Mutual TLS", body: "Two-way authentication and data encryption on every connection." },
  { title: "Authorized servers only", body: "Robots communicate with authorized servers by default — nothing else." },
  { title: "Dynamic access control", body: "Dynamic access control lists govern every data stream." },
  { title: "Verified actions", body: "Checksum and signature verification on all incoming actions." },
  { title: "Role-based access", body: "RBAC with least-privilege defaults and SSO options." },
  { title: "Encryption everywhere", body: "Data classified and encrypted at rest and in transit." },
  { title: "On-premises option", body: "Optional on-prem deployment for sensitive environments." },
  { title: "Multi-tenancy", body: "Tenant isolation with customizable data retention." },
  { title: "Network defense", body: "Firewalls, intrusion detection and prevention, continuous monitoring." },
  { title: "Fleet controls", body: "Remote diagnostics with permission, firmware updates, asset immobilization, device logging." },
];

export const complianceBadges = ["SOC 2", "ISO 27001", "HIPAA", "GDPR"];
```

`src/data/servicing.ts`:
```ts
// Source: cardinalrobot.com/servicing.php.
export const servicePillars = [
  {
    title: "Preventative maintenance & break-fix",
    points: [
      "Nationwide coverage through Cardinal and partner networks",
      "Onsite and periodic maintenance schedules",
      "SLAs matched to your operating requirements",
    ],
  },
  {
    title: "24/7 help desk",
    points: [
      "Level 1 and Level 2 support",
      "Remote diagnostics and management",
      "Call center coverage for every deployment",
    ],
  },
  {
    title: "Training & upskilling",
    points: [
      "Staff upskilled into robot operator roles",
      "End-user and customer training programs",
      "Centralized dashboard: KPIs, scheduling, ROI reports",
    ],
  },
];

export const technicianCerts = ["A+", "Net+", "MCSE", "Mobility+", "CompTIA", "Security+"];
```

`src/data/financing.ts`:
```ts
// Source: cardinalrobot.com/finance.php. Rate conflict resolved per spec §9
// (finance page's 3–5% wins over home page's 5%).
export const financeTerms = [
  { label: "Dedicated capital", value: "$800M" },
  { label: "Check size", value: "$500K–$50M per deployment" },
  { label: "Discount rate", value: "3–5% annually" },
  { label: "Equity dilution", value: "0%" },
  { label: "Structure", value: "Non-dilutive, non-debt capital" },
  { label: "Encumbrances", value: "No liens, personal guarantees, or balance-sheet restrictions" },
  { label: "Decision time", value: "Within 2 business days" },
];

export const financeEligibility = [
  "US-based robotics and IoT companies",
  "Growth-stage, with robots deployed or deployment-ready",
  "RaaS or HaaS business models",
];

export const financeProcess = [
  { step: "01", title: "Apply", body: "Submit through the online portal or email finance@cardinalrobot.com with your deployment pipeline." },
  { step: "02", title: "Decision in 2 business days", body: "Terms designed by roboticists who understand RaaS and HaaS economics." },
  { step: "03", title: "Deploy capital", body: "$500K to $50M per deployment, with Cardinal's 3,000+ technicians available for installation and support." },
];

export const financeEmail = "finance@cardinalrobot.com";
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all 8 tests green.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add typed fact-vault data layer with integrity tests"
```

---

### Task 3: Motion primitives and UI kit

**Files:**
- Create: `src/components/motion/Reveal.tsx`, `src/components/motion/Stagger.tsx`, `src/components/motion/CountUp.tsx`, `src/components/ui/Eyebrow.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/StatCounter.tsx`, `src/components/ui/SpecTable.tsx`, `src/components/ui/CTAPanel.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/cn`, theme tokens from Task 1, `RobotSpec` from `@/data/types`.
- Produces (exact props):
  - `Reveal {children, delay?: number, className?: string}`
  - `Stagger {children, className?}` + `StaggerItem {children, className?}`
  - `CountUp {to: number, prefix?: string, suffix?: string, duration?: number, className?: string}`
  - `Eyebrow {index?: string, children}` — renders `// 01 — LABEL` in mono red
  - `SectionHeading {index?: string, eyebrow?: string, title: string, lede?: string, className?}`
  - `Button {href: string, variant?: "solid" | "outline", children, className?}`
  - `Badge {children}` · `Card {children, className?}`
  - `StatCounter {stat: Stat}` (from `@/data/types`)
  - `SpecTable {specs: RobotSpec[]}`
  - `CTAPanel {title: string, body?: string, cta: {label: string, href: string}, secondary?: {label: string, href: string}}`

- [ ] **Step 1: Create motion primitives**

`src/components/motion/Reveal.tsx`:
```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

`src/components/motion/Stagger.tsx`:
```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
}
```

`src/components/motion/CountUp.tsx`:
```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function CountUp({ to, prefix = "", suffix = "", duration = 1.6, className }: {
  to: number; prefix?: string; suffix?: string; duration?: number; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setValue(to); return; }
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, to, duration]);

  return <span ref={ref} className={className}>{prefix}{value.toLocaleString("en-US")}{suffix}</span>;
}
```

- [ ] **Step 2: Create UI kit**

`src/components/ui/Eyebrow.tsx`:
```tsx
import type { ReactNode } from "react";

export function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-cardinal-500">
      {"// "}{index ? `${index} — ` : ""}{children}
    </p>
  );
}
```

`src/components/ui/SectionHeading.tsx`:
```tsx
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({ index, eyebrow, title, lede, className }: {
  index?: string; eyebrow?: string; title: string; lede?: string; className?: string;
}) {
  return (
    <div className={cn("max-w-2xl space-y-4", className)}>
      {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-medium tracking-tight text-ink-50 sm:text-5xl">{title}</h2>
      {lede && <p className="text-lg leading-relaxed">{lede}</p>}
    </div>
  );
}
```

`src/components/ui/Button.tsx`:
```tsx
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Button({ href, variant = "solid", children, className }: {
  href: string; variant?: "solid" | "outline"; children: ReactNode; className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded px-6 py-3 font-display text-sm font-medium transition-colors duration-150",
        variant === "solid"
          ? "bg-cardinal-500 text-ink-50 hover:bg-cardinal-400"
          : "border border-ink-800 text-ink-50 hover:border-cardinal-500",
        className,
      )}
    >
      {children}
    </Link>
  );
}
```

`src/components/ui/Badge.tsx`:
```tsx
import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded border border-ink-800 bg-ink-900 px-3 py-1.5 font-mono text-xs text-ink-300">
      {children}
    </span>
  );
}
```

`src/components/ui/Card.tsx`:
```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-ink-800 bg-ink-900 p-6 transition-colors duration-150 hover:border-cardinal-500/50", className)}>
      {children}
    </div>
  );
}
```

`src/components/ui/StatCounter.tsx`:
```tsx
import type { Stat } from "@/data/types";
import { CountUp } from "@/components/motion/CountUp";

export function StatCounter({ stat }: { stat: Stat }) {
  return (
    <div className="space-y-2">
      <div className="font-display text-4xl font-medium text-ink-50 sm:text-5xl">
        <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-400">{stat.label}</p>
    </div>
  );
}
```

`src/components/ui/SpecTable.tsx`:
```tsx
import type { RobotSpec } from "@/data/types";

export function SpecTable({ specs }: { specs: RobotSpec[] }) {
  return (
    <dl className="divide-y divide-ink-800 border-y border-ink-800">
      {specs.map((s) => (
        <div key={s.label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[200px_1fr] sm:gap-6">
          <dt className="text-sm text-ink-400">{s.label}</dt>
          <dd className="font-mono text-sm text-ink-50">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
```

`src/components/ui/CTAPanel.tsx`:
```tsx
import { Button } from "./Button";

export function CTAPanel({ title, body, cta, secondary }: {
  title: string; body?: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="glow-cardinal blueprint-grid rounded-lg border border-ink-800 bg-ink-900 px-8 py-16 text-center sm:px-16">
        <h2 className="font-display text-4xl font-medium tracking-tight text-ink-50 sm:text-6xl">{title}</h2>
        {body && <p className="mx-auto mt-4 max-w-xl text-lg">{body}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={cta.href}>{cta.label}</Button>
          {secondary && <Button href={secondary.href} variant="outline">{secondary.label}</Button>}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build and tests**

Run: `npm run build && npm test`
Expected: build succeeds (components compile, not yet used); data tests still PASS.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add motion primitives and UI kit"
```

---

### Task 4: Header, Footer, 404, wired into root layout

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/app/not-found.tsx`
- Modify: `src/app/layout.tsx` (add Header/Footer around children)

**Interfaces:**
- Consumes: `headerLinks`, `footerColumns`, `youtubeUrl` from `@/data/navigation`; `categories` from `@/data/categories`; `complianceBadges` from `@/data/security`; `Badge` from ui.
- Produces: `Header` (no props), `Footer` (no props). All pages render inside `<Header/>…<Footer/>` via layout.

- [ ] **Step 1: Create Header (client component with Robots dropdown + mobile menu)**

`src/components/layout/Header.tsx`:
```tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { headerLinks } from "@/data/navigation";
import { categories } from "@/data/categories";
import { cn } from "@/lib/cn";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-800/60 bg-ink-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-ink-50">
          Cardinal<span className="text-cardinal-500">.</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <div className="group relative">
            <Link href="/robots" className="text-sm text-ink-300 transition-colors duration-150 hover:text-ink-50">
              Robots
            </Link>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid w-[420px] grid-cols-2 gap-1 rounded-lg border border-ink-800 bg-ink-900 p-3">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/robots/${c.slug}`} className="rounded px-3 py-2 text-sm text-ink-300 transition-colors duration-150 hover:bg-ink-800 hover:text-ink-50">
                    {c.name}
                  </Link>
                ))}
                <Link href="/robots" className="col-span-2 rounded px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] text-cardinal-500 hover:bg-ink-800">
                  View all 24 robots →
                </Link>
              </div>
            </div>
          </div>
          {headerLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-ink-300 transition-colors duration-150 hover:text-ink-50">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="rounded bg-cardinal-500 px-4 py-2 font-display text-sm font-medium text-ink-50 transition-colors duration-150 hover:bg-cardinal-400">
            Get in Touch
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={cn("h-px w-5 bg-ink-50 transition-transform duration-150", mobileOpen && "translate-y-[3.5px] rotate-45")} />
          <span className={cn("h-px w-5 bg-ink-50 transition-transform duration-150", mobileOpen && "-translate-y-[3.5px] -rotate-45")} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-ink-800 bg-ink-950 px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/robots" onClick={() => setMobileOpen(false)} className="text-ink-50">Robots</Link>
            {headerLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-ink-300">
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-2 rounded bg-cardinal-500 px-4 py-3 text-center font-display text-sm font-medium text-ink-50">
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Create Footer and 404**

`src/components/layout/Footer.tsx`:
```tsx
import Link from "next/link";
import { footerColumns, youtubeUrl } from "@/data/navigation";
import { complianceBadges } from "@/data/security";
import { Badge } from "@/components/ui/Badge";

export function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <p className="font-display text-lg font-semibold text-ink-50">Cardinal<span className="text-cardinal-500">.</span></p>
            <p className="max-w-xs text-sm leading-relaxed">
              Robotic adoption made easy. Sourcing, deployment, training, servicing, and financing for commercial robots.
            </p>
            <div className="flex flex-wrap gap-2">
              {complianceBadges.map((b) => <Badge key={b}>{b}</Badge>)}
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink-300 transition-colors duration-150 hover:text-ink-50">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink-800 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-ink-400">© {new Date().getFullYear()} Cardinal Robotics. All rights reserved.</p>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-ink-400 transition-colors duration-150 hover:text-ink-50">
            YouTube ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
```

`src/app/not-found.tsx`:
```tsx
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="blueprint-grid flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Eyebrow>Signal lost</Eyebrow>
      <h1 className="font-display text-6xl font-medium text-ink-50 sm:text-8xl">404</h1>
      <p className="max-w-md">This route is not in the fleet map. The page may have moved or never existed.</p>
      <Button href="/">Return home</Button>
    </main>
  );
}
```

- [ ] **Step 3: Wire into root layout**

Modify `src/app/layout.tsx` — add imports and wrap children:
```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
```
and change the body to:
```tsx
<body>
  <Header />
  <div className="pt-16">{children}</div>
  <Footer />
</body>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds. Then `npm run dev`, open http://localhost:3000 — header dropdown lists 8 categories, footer renders 3 columns + badges, /nonsense shows branded 404.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add site header, footer, and branded 404"
```

---

### Task 5: Diagrams I — shared US dot grid, FleetGridCanvas, LifecycleDiagram

**Files:**
- Create: `src/components/diagrams/us-dots.ts`, `src/components/diagrams/FleetGridCanvas.tsx`, `src/components/diagrams/LifecycleDiagram.tsx`

**Interfaces:**
- Produces:
  - `us-dots.ts`: `US_DOT_GRID: string[]` (`#` = dot, `.` = empty) and `HUBS: [number, number][]` (col,row of red hub dots)
  - `FleetGridCanvas` (no props) — absolutely-positioned canvas backdrop; parent must be `relative`
  - `LifecycleDiagram {phases?: string[]}` — defaults to the six lifecycle phases

- [ ] **Step 1: Create the shared stylized US dot grid**

`src/components/diagrams/us-dots.ts`:
```ts
// Stylized dot-density silhouette of the contiguous US (not geographic data).
export const US_DOT_GRID: string[] = [
  "....######################....",
  "..##########################..",
  ".############################.",
  ".############################.",
  ".############################.",
  "..##########################..",
  "..#########################...",
  "...###########..##########....",
  "....#########....########.....",
  ".....###..###......######.....",
  "......#....##........####.....",
  ".....................###......",
];

// Red "service hub" dots (col, row) — visual accents only.
export const HUBS: [number, number][] = [
  [4, 3], [8, 6], [13, 4], [17, 2], [21, 5], [25, 3], [24, 8], [10, 8],
];
```

- [ ] **Step 2: Create FleetGridCanvas (homepage hero backdrop)**

`src/components/diagrams/FleetGridCanvas.tsx`:
```tsx
"use client";
import { useEffect, useRef } from "react";
import { US_DOT_GRID, HUBS } from "./us-dots";

export function FleetGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();

    const hubSet = new Set(HUBS.map(([c, r]) => `${c},${r}`));
    const rows = US_DOT_GRID.length;
    const cols = US_DOT_GRID[0].length;

    const draw = (t: number) => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      const cell = Math.min(w / (cols + 4), h / (rows + 4));
      const ox = (w - cols * cell) / 2;
      const oy = (h - rows * cell) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (US_DOT_GRID[r][c] !== "#") continue;
          const x = ox + c * cell + cell / 2;
          const y = oy + r * cell + cell / 2;
          const isHub = hubSet.has(`${c},${r}`);
          const phase = (c * 7 + r * 13) % 100;
          const pulse = reduce ? 0.5 : 0.35 + 0.35 * Math.sin(t / 900 + phase);
          ctx.beginPath();
          ctx.arc(x, y, isHub ? cell * 0.14 : cell * 0.08, 0, Math.PI * 2);
          ctx.fillStyle = isHub
            ? `rgba(214, 69, 61, ${0.5 + pulse * 0.5})`
            : `rgba(245, 245, 244, ${0.06 + pulse * 0.12})`;
          ctx.fill();
        }
      }
      if (!reduce && running) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running && !reduce) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full opacity-70" />;
}
```

- [ ] **Step 3: Create LifecycleDiagram (self-drawing horizontal SVG)**

`src/components/diagrams/LifecycleDiagram.tsx`:
```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";

const DEFAULT_PHASES = ["Source", "Deploy", "Train", "Service", "Report", "Finance"];

export function LifecycleDiagram({ phases = DEFAULT_PHASES }: { phases?: string[] }) {
  const reduce = useReducedMotion();
  const step = 100 / (phases.length - 1);

  return (
    <svg viewBox="0 0 640 90" className="w-full" role="img" aria-label={`Lifecycle: ${phases.join(", ")}`}>
      <motion.line
        x1="20" y1="30" x2="620" y2="30"
        stroke="#1a1a1f" strokeWidth="2"
      />
      <motion.line
        x1="20" y1="30" x2="620" y2="30"
        stroke="#d6453d" strokeWidth="2"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      {phases.map((p, i) => {
        const x = 20 + (600 * (i * step)) / 100;
        return (
          <g key={p}>
            <motion.circle
              cx={x} cy="30" r="6"
              fill="#0a0a0b" stroke="#d6453d" strokeWidth="2"
              initial={{ opacity: reduce ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: reduce ? 0 : 0.2 + i * 0.25 }}
            />
            <text x={x} y="62" textAnchor="middle" fill="#a1a1aa" fontSize="13" fontFamily="var(--font-mono)">
              {p}
            </text>
            <text x={x} y="78" textAnchor="middle" fill="#63636b" fontSize="9" fontFamily="var(--font-mono)">
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add fleet grid canvas and lifecycle diagram"
```

---

### Task 6: Diagrams II — SecurityFlowDiagram, USCoverageMap, DashboardMock, RoadmapTimeline

**Files:**
- Create: `src/components/diagrams/SecurityFlowDiagram.tsx`, `src/components/diagrams/USCoverageMap.tsx`, `src/components/diagrams/DashboardMock.tsx`, `src/components/diagrams/RoadmapTimeline.tsx`

**Interfaces:**
- Consumes: `US_DOT_GRID`, `HUBS` from `./us-dots`; `roadmap` from `@/data/roadmap`; `Reveal` from `@/components/motion/Reveal`.
- Produces: `SecurityFlowDiagram` (no props), `USCoverageMap` (no props), `DashboardMock` (no props), `RoadmapTimeline` (no props).

- [ ] **Step 1: Create SecurityFlowDiagram (SMIL pulses along the data path)**

`src/components/diagrams/SecurityFlowDiagram.tsx`:
```tsx
const NODES = [
  { x: 40, label: "Robot fleet", sub: "SDK on device" },
  { x: 220, label: "Mutual TLS", sub: "2-way auth + encryption" },
  { x: 400, label: "Cardinal cloud", sub: "or on-premises" },
  { x: 580, label: "Operator dashboard", sub: "RBAC + SSO" },
];

export function SecurityFlowDiagram() {
  return (
    <svg viewBox="0 0 660 140" className="w-full" role="img"
      aria-label="Data flow: robot fleet, over mutual TLS, to Cardinal cloud, to operator dashboard">
      {NODES.slice(0, -1).map((n, i) => (
        <line key={i} x1={n.x + 40} y1="60" x2={NODES[i + 1].x - 40} y2="60" stroke="#1a1a1f" strokeWidth="2" />
      ))}
      {NODES.slice(0, -1).map((n, i) => (
        <circle key={`p${i}`} r="3" fill="#d6453d" className="motion-pulse">
          <animateMotion
            dur="2.4s" repeatCount="indefinite" begin={`${i * 0.8}s`}
            path={`M ${n.x + 40} 60 L ${NODES[i + 1].x - 40} 60`}
          />
        </circle>
      ))}
      {NODES.map((n) => (
        <g key={n.label}>
          <rect x={n.x - 40} y="35" width="80" height="50" rx="6" fill="#111114" stroke="#1a1a1f" />
          <circle cx={n.x - 28} cy="47" r="2.5" fill="#3ecf8e" />
          <text x={n.x} y="66" textAnchor="middle" fill="#f5f5f4" fontSize="10" fontFamily="var(--font-mono)">
            {n.label}
          </text>
          <text x={n.x} y="105" textAnchor="middle" fill="#63636b" fontSize="9" fontFamily="var(--font-mono)">
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
```

- [ ] **Step 2: Create USCoverageMap (static SVG from shared dot grid)**

`src/components/diagrams/USCoverageMap.tsx`:
```tsx
import { US_DOT_GRID, HUBS } from "./us-dots";

export function USCoverageMap() {
  const rows = US_DOT_GRID.length;
  const cols = US_DOT_GRID[0].length;
  const cell = 20;
  const hubSet = new Set(HUBS.map(([c, r]) => `${c},${r}`));

  return (
    <svg viewBox={`0 0 ${cols * cell} ${rows * cell}`} className="w-full" role="img"
      aria-label="Stylized map of nationwide US service coverage">
      {US_DOT_GRID.flatMap((row, r) =>
        row.split("").map((ch, c) => {
          if (ch !== "#") return null;
          const isHub = hubSet.has(`${c},${r}`);
          return (
            <circle
              key={`${c}-${r}`}
              cx={c * cell + cell / 2} cy={r * cell + cell / 2}
              r={isHub ? 5 : 2.5}
              fill={isHub ? "#d6453d" : "#2a2a30"}
            />
          );
        }),
      )}
    </svg>
  );
}
```

- [ ] **Step 3: Create DashboardMock (illustrative fleet interface)**

Values here are **decorative UI illustration**, clearly captioned as such — they are not published as company facts.

`src/components/diagrams/DashboardMock.tsx`:
```tsx
const FLEET_ROWS = [
  { name: "S50-PRO / FLOOR 2", status: "Cleaning", pct: 72 },
  { name: "TITAN-04 / DOCK B", status: "Delivering", pct: 45 },
  { name: "UVC-11 / ROOM 214", status: "Disinfecting", pct: 88 },
  { name: "V40-02 / LOBBY", status: "Charging", pct: 31 },
];

export function DashboardMock() {
  return (
    <figure>
      <div className="overflow-hidden rounded-lg border border-ink-800 bg-ink-900">
        <div className="flex items-center justify-between border-b border-ink-800 px-5 py-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400">Cardinal Fleet Console</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-status" />
            <span className="font-mono text-xs text-status">LIVE</span>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-ink-800 border-b border-ink-800 text-center">
          {[["Units online", "24"], ["Coverage today", "148k sq ft"], ["Open tickets", "0"]].map(([k, v]) => (
            <div key={k} className="px-4 py-5">
              <p className="font-display text-2xl text-ink-50">{v}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-400">{k}</p>
            </div>
          ))}
        </div>
        <ul className="divide-y divide-ink-800">
          {FLEET_ROWS.map((r) => (
            <li key={r.name} className="flex items-center gap-4 px-5 py-3.5">
              <span className="h-1.5 w-1.5 rounded-full bg-status" />
              <span className="flex-1 font-mono text-xs text-ink-50">{r.name}</span>
              <span className="font-mono text-xs text-ink-400">{r.status}</span>
              <span className="hidden h-1 w-24 overflow-hidden rounded bg-ink-800 sm:block">
                <span className="block h-full bg-cardinal-500" style={{ width: `${r.pct}%` }} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 text-center font-mono text-xs text-ink-400">
        Illustrative interface. Dashboards report KPIs, scheduling, ROI, and operational visibility.
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 4: Create RoadmapTimeline**

`src/components/diagrams/RoadmapTimeline.tsx`:
```tsx
import { roadmap } from "@/data/roadmap";
import { Reveal } from "@/components/motion/Reveal";

export function RoadmapTimeline() {
  return (
    <div className="relative space-y-12 border-l border-ink-800 pl-8">
      {roadmap.map((era, i) => (
        <Reveal key={era.year} delay={i * 0.1}>
          <div className="relative">
            <span className="absolute -left-[37px] top-1 h-2.5 w-2.5 rounded-full border-2 border-cardinal-500 bg-ink-950" />
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-cardinal-500">{era.year}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {era.items.map((item) => (
                <li key={item} className="rounded border border-ink-800 bg-ink-900 px-4 py-3 text-sm text-ink-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Verify build, commit**

Run: `npm run build`
Expected: success.

```bash
git add -A && git commit -m "feat: add security flow, coverage map, dashboard mock, roadmap timeline"
```

---

### Task 7: Home page

**Files:**
- Modify: `src/app/page.tsx` (replace placeholder entirely)

**Interfaces:**
- Consumes: `heroStats`, `outcomes` from `@/data/stats`; `categories`; `complianceBadges`; `FleetGridCanvas`, `LifecycleDiagram`; `Reveal`, `Stagger`, `StaggerItem`; `Eyebrow`, `SectionHeading`, `Button`, `Badge`, `Card`, `StatCounter`, `CTAPanel`.

- [ ] **Step 1: Replace `src/app/page.tsx` with the full home page**

```tsx
import Link from "next/link";
import { heroStats, outcomes } from "@/data/stats";
import { categories } from "@/data/categories";
import { complianceBadges } from "@/data/security";
import { FleetGridCanvas } from "@/components/diagrams/FleetGridCanvas";
import { LifecycleDiagram } from "@/components/diagrams/LifecycleDiagram";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { StatCounter } from "@/components/ui/StatCounter";
import { CTAPanel } from "@/components/ui/CTAPanel";

export default function Home() {
  return (
    <main>
      {/* 1 — Hero */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
        <FleetGridCanvas />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
          <Reveal>
            <Eyebrow>Robotic adoption made easy</Eyebrow>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink-50 sm:text-7xl lg:text-8xl">
              The robotic workforce, fully operational.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">
              Cardinal sources, deploys, trains, services, and finances commercial robots — so your team doesn&apos;t have to.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/robots">Explore the fleet</Button>
              <Button href="/contact" variant="outline">Talk to us</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — Stat band */}
      <section className="border-y border-ink-800 bg-ink-900/40">
        <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-16 lg:grid-cols-4">
          {heroStats.map((s) => (
            <StaggerItem key={s.label}><StatCounter stat={s} /></StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 3 — Two doors */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading index="01" eyebrow="Two ways in" title="One platform. Two ways to use it." />
        </Reveal>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
          <StaggerItem>
            <Link href="/robots" className="group block h-full">
              <Card className="flex h-full flex-col justify-between p-10">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-400">For operators</p>
                  <h3 className="mt-4 font-display text-3xl font-medium text-ink-50">Deploy robots in your facility</h3>
                  <p className="mt-4 leading-relaxed">
                    Rent application-specific robots from $2.99/hr with no upfront costs and unlimited servicing included.
                  </p>
                </div>
                <p className="mt-8 font-mono text-sm text-cardinal-500 transition-transform duration-150 group-hover:translate-x-1">
                  Explore the fleet →
                </p>
              </Card>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link href="/financing" className="group block h-full">
              <Card className="flex h-full flex-col justify-between p-10">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-400">For robotics companies</p>
                  <h3 className="mt-4 font-display text-3xl font-medium text-ink-50">Scale your robotics company</h3>
                  <p className="mt-4 leading-relaxed">
                    Non-dilutive deployment capital from $500K to $50M, backed by 3,000+ technicians nationwide.
                  </p>
                </div>
                <p className="mt-8 font-mono text-sm text-cardinal-500 transition-transform duration-150 group-hover:translate-x-1">
                  See financing →
                </p>
              </Card>
            </Link>
          </StaggerItem>
        </Stagger>
      </section>

      {/* 4 — Fleet showcase */}
      <section className="border-y border-ink-800 bg-ink-900/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              index="02" eyebrow="The fleet"
              title="24 robots. 8 categories. One partner."
              lede="Application-task-specific robots, matched to the job and covered end to end."
            />
          </Reveal>
        </div>
        <div className="mt-12 overflow-x-auto pb-4">
          <div className="mx-auto flex w-max gap-4 px-6">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <Link href={`/robots/${c.slug}`} className="group block w-72">
                  <Card className="h-56">
                    <p className="font-mono text-xs text-ink-400">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 font-display text-xl font-medium text-ink-50">{c.name}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed">{c.blurb}</p>
                    <p className="mt-4 font-mono text-xs text-cardinal-500 transition-transform duration-150 group-hover:translate-x-1">
                      View robots →
                    </p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Lifecycle teaser */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading
            index="03" eyebrow="How it works"
            title="The full deployment cycle, handled."
            lede="From sourcing to financing, Cardinal covers installation, integration, service, and support — optimized for ROI."
          />
        </Reveal>
        <Reveal delay={0.15} className="mt-16">
          <LifecycleDiagram />
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <Button href="/platform" variant="outline">See the platform</Button>
        </Reveal>
      </section>

      {/* 6 — Outcomes */}
      <section className="border-y border-ink-800 bg-ink-900/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading index="04" eyebrow="Outcomes" title="Measured on the floor, not in the pitch." />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {outcomes.map((o) => (
              <StaggerItem key={o.stat}>
                <Card className="h-full">
                  <p className="font-display text-2xl font-medium text-cardinal-500">{o.stat}</p>
                  <p className="mt-4 text-sm leading-relaxed">{o.context}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 7 — Trust band */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-400">
            DoD-compliant data security
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {complianceBadges.map((b) => <Badge key={b}>{b}</Badge>)}
          </div>
        </Reveal>
      </section>

      {/* 8 — Final CTA */}
      <CTAPanel
        title="Put robots to work."
        body="Tell us about your facility, your fleet, or your robotics company."
        cta={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "Explore the fleet", href: "/robots" }}
      />
    </main>
  );
}
```

- [ ] **Step 2: Verify build + visual check**

Run: `npm run build`
Expected: success. Then `npm run dev` → home shows animated hero dots, counting stats, horizontal fleet scroller, self-drawing lifecycle line.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: build cinematic home page with 8 sections"
```

---

### Task 8: Platform page

**Files:**
- Create: `src/app/platform/page.tsx`

**Interfaces:**
- Consumes: `LifecycleDiagram`, `DashboardMock`, `Reveal`, `Eyebrow`, `SectionHeading`, `CTAPanel`.

- [ ] **Step 1: Create `src/app/platform/page.tsx`**

```tsx
import type { Metadata } from "next";
import { LifecycleDiagram } from "@/components/diagrams/LifecycleDiagram";
import { DashboardMock } from "@/components/diagrams/DashboardMock";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Platform" };

// All claims sourced from cardinalrobot.com home, servicing.php, finance.php.
const PHASES = [
  { title: "Source", body: "Robots are commoditized and application-task specific. We match models from a 24-robot fleet to the job — floor type, footprint, payload, and duty cycle — instead of forcing one machine to do everything." },
  { title: "Deploy", body: "Installation and integration are part of the deployment cycle, not an extra line item. Cardinal handles site mapping, network setup, and commissioning, optimized for ROI from day one." },
  { title: "Train", body: "Upskilling every janitor to robot operator. Your existing staff learn to run the fleet through end-user and customer training programs — the robots augment your workforce, they don't replace it." },
  { title: "Service", body: "Preventative maintenance and break-fix support nationwide through 3,000+ certified technicians, with SLAs matched to your operation, 24/7 Level 1 and 2 help desk, and remote diagnostics." },
  { title: "Report", body: "A centralized dashboard for every deployment: operational KPIs, scheduling, ROI reports, and full operational visibility across sites." },
  { title: "Finance", body: "No upfront costs for operators — rentals from $2.99/hr with unlimited servicing. For robotics companies, an $800M facility funds deployments from $500K to $50M, non-dilutive." },
];

export default function PlatformPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-ink-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Platform"
              title="Six phases. One accountable partner."
              lede="Most robot deployments fail between purchase and adoption. Cardinal owns the entire lifecycle so yours doesn't."
            />
          </Reveal>
          <Reveal delay={0.15} className="mt-16"><LifecycleDiagram /></Reveal>
        </div>
      </section>

      {PHASES.map((phase, i) => (
        <section key={phase.title} className={i % 2 === 1 ? "border-y border-ink-800 bg-ink-900/40" : ""}>
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-[220px_1fr]">
            <Reveal>
              <Eyebrow index={String(i + 1).padStart(2, "0")}>{phase.title}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-medium text-ink-50">{phase.title}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed">{phase.body}</p>
            </Reveal>
          </div>
        </section>
      ))}

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

      <CTAPanel
        title="See it on your floor plan."
        body="Walk us through your facility and we'll map the deployment."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
```

- [ ] **Step 2: Verify build, commit**

Run: `npm run build` — expected: success, `/platform` in output.

```bash
git add -A && git commit -m "feat: add platform lifecycle page"
```

---

### Task 9: Robots catalog + 8 category pages

**Files:**
- Create: `src/app/robots/page.tsx`, `src/app/robots/RobotsCatalog.tsx`, `src/app/robots/[category]/page.tsx`

**Interfaces:**
- Consumes: `robots`, `categories`, types; `SpecTable`, `Card`, `Badge`, `Eyebrow`, `SectionHeading`, `Button`, `CTAPanel`, `Reveal`, `Stagger`, `StaggerItem`.
- Produces: route `/robots` and `/robots/{slug}` for all 8 category slugs (`dynamicParams = false`).

- [ ] **Step 1: Create the client catalog component**

`src/app/robots/RobotsCatalog.tsx`:
```tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { robots } from "@/data/robots";
import { categories } from "@/data/categories";
import type { CategorySlug } from "@/data/types";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";

export function RobotsCatalog() {
  const [filter, setFilter] = useState<CategorySlug | "all">("all");
  const shown = filter === "all" ? robots : robots.filter((r) => r.category === filter);
  const catName = (slug: CategorySlug) => categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {[{ slug: "all" as const, name: "All" }, ...categories].map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setFilter(c.slug as CategorySlug | "all")}
            className={cn(
              "rounded border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-150",
              filter === c.slug
                ? "border-cardinal-500 bg-cardinal-500/10 text-cardinal-400"
                : "border-ink-800 text-ink-300 hover:border-ink-400",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p className="mt-6 font-mono text-xs text-ink-400">{shown.length} of {robots.length} units</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((r) => (
          <Link key={r.slug} href={`/robots/${r.category}#${r.slug}`} className="group block">
            <Card className="flex h-full flex-col">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">{catName(r.category)}</p>
              <h3 className="mt-2 font-display text-xl font-medium text-ink-50">{r.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed">{r.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-ink-800 pt-4">
                {r.headlineSpecs.map((s) => (
                  <span key={s} className="font-mono text-xs text-cardinal-500">{s}</span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create the catalog page**

`src/app/robots/page.tsx`:
```tsx
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAPanel } from "@/components/ui/CTAPanel";
import { RobotsCatalog } from "./RobotsCatalog";

export const metadata: Metadata = { title: "The Fleet" };

export default function RobotsPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-ink-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="The fleet"
              title="24 robots, ready to deploy."
              lede="Every unit is rented, installed, serviced, and reported on by Cardinal — from $2.99/hr with no upfront costs."
            />
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <RobotsCatalog />
      </section>
      <CTAPanel
        title="Not sure which unit fits?"
        body="Describe the space and the task. We'll match the model."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
```

- [ ] **Step 3: Create the category detail page**

`src/app/robots/[category]/page.tsx`:
```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { robots } from "@/data/robots";
import type { CategorySlug } from "@/data/types";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecTable } from "@/components/ui/SpecTable";
import { Badge } from "@/components/ui/Badge";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  return { title: cat ? `${cat.name} Robots` : "Robots" };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const models = robots.filter((r) => r.category === (cat.slug as CategorySlug));
  const related = categories.filter((c) => c.slug !== cat.slug).slice(0, 3);

  return (
    <main>
      <section className="blueprint-grid border-b border-ink-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="font-mono text-xs text-ink-400">
              <Link href="/robots" className="hover:text-ink-50">The fleet</Link> / {cat.name}
            </p>
            <SectionHeading className="mt-6" eyebrow={cat.name} title={cat.name} lede={cat.blurb} />
          </Reveal>
        </div>
      </section>

      {models.map((r, i) => (
        <section key={r.slug} id={r.slug} className={i % 2 === 1 ? "border-y border-ink-800 bg-ink-900/40" : ""}>
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2">
            <Reveal>
              <p className="font-mono text-xs text-ink-400">{String(i + 1).padStart(2, "0")} / {cat.name.toUpperCase()}</p>
              <h2 className="mt-3 font-display text-4xl font-medium text-ink-50">{r.name}</h2>
              <p className="mt-4 text-lg leading-relaxed">{r.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {r.idealFor.map((tag) => <Badge key={tag}>{tag}</Badge>)}
              </div>
            </Reveal>
            <Reveal delay={0.1}><SpecTable specs={r.specs} /></Reveal>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-400">Related categories</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {related.map((c) => (
            <Link key={c.slug} href={`/robots/${c.slug}`} className="rounded border border-ink-800 px-5 py-3 font-display text-sm text-ink-50 transition-colors duration-150 hover:border-cardinal-500">
              {c.name} →
            </Link>
          ))}
        </div>
      </section>

      <CTAPanel
        title={`Deploy ${cat.name.toLowerCase()} robots.`}
        body="Rentals from $2.99/hr. No upfront costs. Unlimited servicing."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
```

- [ ] **Step 4: Verify build + tests**

Run: `npm run build && npm test`
Expected: build lists `/robots` and all 8 `/robots/[category]` paths; data tests PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add fleet catalog with filters and 8 category detail pages"
```

---

### Task 10: Industries page

**Files:**
- Create: `src/app/industries/page.tsx`

**Interfaces:**
- Consumes: `industries`, `casinoFteTable` from `@/data/industries`; `robots` from `@/data/robots`; `Reveal`, `SectionHeading`, `Badge`, `CTAPanel`.

- [ ] **Step 1: Create `src/app/industries/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { industries, casinoFteTable } from "@/data/industries";
import { robots } from "@/data/robots";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Industries" };

export default function IndustriesPage() {
  const robotName = (slug: string) => robots.find((r) => r.slug === slug)?.name ?? slug;
  const robotCategory = (slug: string) => robots.find((r) => r.slug === slug)?.category ?? "";

  return (
    <main>
      <section className="blueprint-grid border-b border-ink-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Industries"
              title="Built for floors that never close."
              lede="Hospitals, hotels, casinos, senior living, schools — wherever labor is short and standards aren't."
            />
          </Reveal>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr]">
        <nav className="top-24 hidden self-start lg:sticky lg:block" aria-label="Industries">
          <ul className="space-y-1 border-l border-ink-800">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <a href={`#${ind.slug}`} className="block border-l-2 border-transparent px-4 py-2 text-sm text-ink-400 transition-colors duration-150 hover:border-cardinal-500 hover:text-ink-50">
                  {ind.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-24">
          {industries.map((ind, i) => (
            <section key={ind.slug} id={ind.slug} className="scroll-mt-24">
              <Reveal>
                <p className="font-mono text-xs text-ink-400">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 font-display text-3xl font-medium text-ink-50">{ind.name}</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed">{ind.narrative}</p>
                <div className="mt-6 rounded-lg border border-ink-800 bg-ink-900 p-6">
                  <p className="font-display text-3xl font-medium text-cardinal-500">{ind.metric.value}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-ink-400">{ind.metric.label}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {ind.robotSlugs.map((slug) => (
                    <Link key={slug} href={`/robots/${robotCategory(slug)}#${slug}`}>
                      <Badge>{robotName(slug)}</Badge>
                    </Link>
                  ))}
                </div>
                {ind.slug === "casinos" && (
                  <div className="mt-8 overflow-hidden rounded-lg border border-ink-800">
                    <table className="w-full text-left text-sm">
                      <caption className="border-b border-ink-800 bg-ink-900 px-5 py-3 text-left font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
                        Measured impact per application
                      </caption>
                      <thead className="border-b border-ink-800 bg-ink-900 font-mono text-xs uppercase tracking-[0.1em] text-ink-400">
                        <tr>
                          <th className="px-5 py-3 font-normal">Application</th>
                          <th className="px-5 py-3 font-normal">Labor impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink-800">
                        {casinoFteTable.map((row) => (
                          <tr key={row.application}>
                            <td className="px-5 py-3 text-ink-300">{row.application}</td>
                            <td className="px-5 py-3 font-mono text-ink-50">{row.impact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Reveal>
            </section>
          ))}
        </div>
      </div>

      <CTAPanel
        title="Your industry, your floor plan."
        body="Tell us where robots should be working. We'll bring the deployment plan."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
```

- [ ] **Step 2: Verify build, commit**

Run: `npm run build` — expected: success, `/industries` present.

```bash
git add -A && git commit -m "feat: add industries page with casino impact table"
```

---

### Task 11: Servicing and Security pages

**Files:**
- Create: `src/app/servicing/page.tsx`, `src/app/security/page.tsx`

**Interfaces:**
- Consumes: `servicePillars`, `technicianCerts` from `@/data/servicing`; `securityFeatures`, `complianceBadges` from `@/data/security`; `USCoverageMap`, `SecurityFlowDiagram`; ui/motion kit.

- [ ] **Step 1: Create `src/app/servicing/page.tsx`**

```tsx
import type { Metadata } from "next";
import { servicePillars, technicianCerts } from "@/data/servicing";
import { USCoverageMap } from "@/components/diagrams/USCoverageMap";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Servicing" };

export default function ServicingPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-ink-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Servicing"
              title="Enhance your robot workforce uptime."
              lede="Break-fix and preventative maintenance across the US — 3,000+ service delivery professionals through Cardinal and partner networks, with SLAs matched to your operation."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-ink-400">
            Nationwide coverage
          </p>
          <div className="mt-10"><USCoverageMap /></div>
          <p className="mt-6 text-center font-mono text-xs text-ink-400">
            3,000+ certified technicians. Onsite and periodic maintenance.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-ink-800 bg-ink-900/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading eyebrow="What's covered" title="Three layers of support." />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {servicePillars.map((p) => (
              <StaggerItem key={p.title}>
                <Card className="h-full">
                  <h3 className="font-display text-xl font-medium text-ink-50">{p.title}</h3>
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

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-400">Technician certifications</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {technicianCerts.map((c) => <Badge key={c}>{c}</Badge>)}
          </div>
          <p className="mt-8 font-mono text-xs text-ink-400">ISO 27001 information security, globally certified.</p>
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

- [ ] **Step 2: Create `src/app/security/page.tsx`**

```tsx
import type { Metadata } from "next";
import { securityFeatures, complianceBadges } from "@/data/security";
import { SecurityFlowDiagram } from "@/components/diagrams/SecurityFlowDiagram";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Security" };

export default function SecurityPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-ink-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Security"
              title="Connected robots, locked down."
              lede="The Cardinal SDK encrypts device status, charge levels, and usage data — with dashboarding, remote diagnostics with permission, firmware updates, asset immobilization, and device logging."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-ink-400">Data path</p>
          <div className="mt-10"><SecurityFlowDiagram /></div>
        </Reveal>
      </section>

      <section className="border-y border-ink-800 bg-ink-900/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading eyebrow="Controls" title="Defense at every layer." />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((f) => (
              <StaggerItem key={f.title}>
                <Card className="h-full">
                  <h3 className="font-display text-lg font-medium text-ink-50">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{f.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-400">Compliance</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {complianceBadges.map((b) => (
              <div key={b} className="rounded-lg border border-ink-800 bg-ink-900 py-8">
                <p className="font-display text-xl font-medium text-ink-50">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-xs text-ink-400">DoD-compliant data security.</p>
        </Reveal>
      </section>

      <CTAPanel
        title="Security review, on request."
        body="On-premises options, customizable retention, and multi-tenant isolation."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
```

- [ ] **Step 3: Verify build, commit**

Run: `npm run build` — expected: success, `/servicing` and `/security` present.

```bash
git add -A && git commit -m "feat: add servicing and security pages"
```

---

### Task 12: Financing and About pages

**Files:**
- Create: `src/app/financing/page.tsx`, `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `financeTerms`, `financeEligibility`, `financeProcess`, `financeEmail` from `@/data/financing`; `heroStats` from `@/data/stats`; `RoadmapTimeline`; ui/motion kit.

- [ ] **Step 1: Create `src/app/financing/page.tsx`**

```tsx
import type { Metadata } from "next";
import { financeTerms, financeEligibility, financeProcess, financeEmail } from "@/data/financing";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Financing" };

export default function FinancingPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-ink-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Cardinal Finance"
              title="$800M. Non-dilutive. Built by roboticists."
              lede="Deployment capital specifically designed for RaaS and HaaS business models — for US-based, growth-stage robotics and IoT companies."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionHeading eyebrow="Terms" title="The spec sheet." />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <dl className="divide-y divide-ink-800 border-y border-ink-800">
            {financeTerms.map((t) => (
              <div key={t.label} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[280px_1fr] sm:gap-6">
                <dt className="text-sm text-ink-400">{t.label}</dt>
                <dd className="font-mono text-sm text-ink-50">{t.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="border-y border-ink-800 bg-ink-900/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading eyebrow="Process" title="Three steps to capital." />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {financeProcess.map((p) => (
              <StaggerItem key={p.step}>
                <Card className="h-full">
                  <p className="font-mono text-xs text-cardinal-500">{p.step}</p>
                  <h3 className="mt-3 font-display text-xl font-medium text-ink-50">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{p.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionHeading eyebrow="Eligibility" title="Who this is for." />
          <ul className="mt-8 max-w-xl space-y-4">
            {financeEligibility.map((e) => (
              <li key={e} className="flex gap-4 text-lg">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cardinal-500" />
                {e}
              </li>
            ))}
          </ul>
          <p className="mt-10 font-mono text-sm text-ink-400">
            Direct line: <a href={`mailto:${financeEmail}`} className="text-cardinal-500 hover:text-cardinal-400">{financeEmail}</a>
          </p>
        </Reveal>
      </section>

      <CTAPanel
        title="Request funding."
        body="Decisions within 2 business days."
        cta={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: `Email ${financeEmail}`, href: `mailto:${financeEmail}` }}
      />
    </main>
  );
}
```

- [ ] **Step 2: Create `src/app/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import { heroStats } from "@/data/stats";
import { RoadmapTimeline } from "@/components/diagrams/RoadmapTimeline";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-ink-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="About Cardinal"
              title="Unleashing human potential."
              lede="Robots are here to make our lives easier. We are here to help you get there."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-ink-50">The problem we work on</h2>
            <p className="mt-4 leading-relaxed">
              Clients are struggling to hire and retain their staff. Labor shortages keep growing, and the work still has to get done.
              Cardinal exists to augment your existing workforce with best-in-class robots — solving the problem financially,
              operationally, and technologically.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-medium text-ink-50">Who we are</h2>
            <p className="mt-4 leading-relaxed">
              A team of PhDs, MBAs, and robotic experts from Stanford and Berkeley, with experience both building robots and
              deploying them. We work closely with every client to tailor-make solutions that work for them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink-800 bg-ink-900/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-16 lg:grid-cols-4">
          {heroStats.map((s) => <StatCounter key={s.label} stat={s} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Roadmap"
            title="What we're automating next."
            lede="The development roadmap, straight from the lab."
          />
        </Reveal>
        <div className="mt-16"><RoadmapTimeline /></div>
      </section>

      <CTAPanel
        title="Augment your workforce."
        body="Best-in-class robots, tailored to your operation."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
```

- [ ] **Step 3: Verify build, commit**

Run: `npm run build` — expected: success, `/financing` and `/about` present.

```bash
git add -A && git commit -m "feat: add financing and about pages"
```

---

### Task 13: Contact page with form

**Files:**
- Create: `src/app/contact/page.tsx`, `src/app/contact/ContactForm.tsx`

**Interfaces:**
- Consumes: `financeEmail`, `youtubeUrl`; ui/motion kit.
- Note: form posts to Web3Forms using `NEXT_PUBLIC_WEB3FORMS_KEY` from `.env.local`. Without the key, submissions take the visible error path with a `mailto:` fallback — never a silent failure. Document the env var in the README (Task 14).

- [ ] **Step 1: Create `src/app/contact/ContactForm.tsx`**

```tsx
"use client";
import { useState } from "react";
import { financeEmail } from "@/data/financing";

const INTERESTS = ["Rent robots", "Servicing", "Financing", "Other"];
const inputCls =
  "w-full rounded border border-ink-800 bg-ink-900 px-4 py-3 text-sm text-ink-50 placeholder:text-ink-400 focus:border-cardinal-500 focus:outline-none transition-colors duration-150";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-ink-800 bg-ink-900 p-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-status">Message received</p>
        <p className="mt-4 text-ink-50">Thanks. We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <input name="name" required placeholder="Name" aria-label="Name" className={inputCls} />
        <input name="company" required placeholder="Company" aria-label="Company" className={inputCls} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <input name="email" type="email" required placeholder="Work email" aria-label="Work email" className={inputCls} />
        <input name="role" placeholder="Role" aria-label="Role" className={inputCls} />
      </div>
      <select name="interest" required defaultValue="" aria-label="I'm interested in" className={inputCls}>
        <option value="" disabled>I&apos;m interested in…</option>
        {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
      </select>
      <textarea name="message" required rows={5} placeholder="Tell us about your facility, fleet, or company." aria-label="Message" className={inputCls} />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded bg-cardinal-500 px-6 py-3.5 font-display text-sm font-medium text-ink-50 transition-colors duration-150 hover:bg-cardinal-400 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-cardinal-400">
          Something went wrong sending your message. Email us directly at{" "}
          <a href={`mailto:${financeEmail}`} className="underline">{financeEmail}</a>.
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 2: Create `src/app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import { financeEmail } from "@/data/financing";
import { youtubeUrl } from "@/data/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="blueprint-grid">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Start the deployment."
            lede="Facility operators, robotics companies, and everyone in between — tell us what you're working with."
          />
          <div className="mt-12 space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400">Financing inquiries</p>
              <a href={`mailto:${financeEmail}`} className="mt-1 block font-mono text-sm text-cardinal-500 hover:text-cardinal-400">
                {financeEmail}
              </a>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400">Watch the fleet</p>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block font-mono text-sm text-ink-300 hover:text-ink-50">
                YouTube ↗
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}><ContactForm /></Reveal>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify build, commit**

Run: `npm run build` — expected: success, `/contact` present.

```bash
git add -A && git commit -m "feat: add contact page with fail-visible form"
```

---

### Task 14: Final QA pass and README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Full gate**

Run: `npm test && npm run build`
Expected: all tests PASS; build emits all 17 static routes (9 top-level + 8 category pages) plus 404.

- [ ] **Step 2: Route + link sweep**

Run `npm run dev` and verify each route renders with no console errors: `/`, `/platform`, `/robots`, all 8 `/robots/<category>`, `/industries`, `/servicing`, `/security`, `/financing`, `/about`, `/contact`, and an unknown URL (404). Click through header dropdown, footer columns, and every CTA panel. Check at 375px and 1440px widths. Verify reduced-motion via DevTools emulation (animations collapse to fades/static).

- [ ] **Step 3: Create `README.md`**

```markdown
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

## Content rules

All factual claims (stats, specs, prices, credentials) live in `src/data/` and must trace to the
Fact Source Table in `docs/superpowers/specs/2026-07-11-cardinal-robot-website-design.md` (§9).
Do not add claims without a source.
```

- [ ] **Step 4: Lighthouse check**

Run: `npm run build && npx serve out` (or any static server), then Lighthouse in Chrome DevTools against `http://localhost:3000`.
Expected: Performance ≥ 90 desktop and mobile. If below: verify fonts use `next/font` (self-hosted), canvas pauses off-screen, no layout shift from images.

- [ ] **Step 5: Final commit**

```bash
git add -A && git commit -m "docs: add README and complete QA pass"
```
