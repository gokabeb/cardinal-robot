import { describe, it, expect } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { robots } from "@/data/robots";
import { categories } from "@/data/categories";
import { heroStats, outcomes } from "@/data/stats";
import { industries, casinoFteTable } from "@/data/industries";
import { roadmap } from "@/data/roadmap";
import { headerNav, footerColumns, footerPrimaryLinks } from "@/data/navigation";
import { securityFeatures, complianceBadges } from "@/data/security";
import { serviceProgram, serviceCallSteps, technicianCerts } from "@/data/servicing";
import { financeTerms, financeProcess } from "@/data/financing";
import { clients } from "@/data/clients";
import { assemblyPillars } from "@/data/assembly";
import { dataOpsStats } from "@/data/dataops";
import { researchStats, researchNote } from "@/data/research";
import { logisticsSections } from "@/data/logistics";
import { aboutFacts } from "@/data/about";
import { assemblyNote } from "@/data/assembly";
import { researchClosing } from "@/data/research";
import { financingHighlights } from "@/data/financing";
import { servicingHighlights } from "@/data/servicing";
import { dataResidency } from "@/data/security";

const ROUTES = [
  "/", "/platform", "/robots", "/industries", "/servicing",
  "/security", "/financing", "/about", "/contact",
  "/us-assembly", "/data-collection", "/research", "/insurance-shipping",
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
    const links = [
      ...headerNav.flatMap((i) => (i.children ? i.children : [{ label: i.label, href: i.href! }])),
      // Nested one level: a footer link may own an indented child group
      // (Services -> Platform -> its capabilities). Flattening only the top
      // level would let a typo in a nested href ship a 404 with a green suite.
      ...footerColumns.flatMap((c) => c.links.flatMap((l) => [l, ...(l.children ?? [])])),
      ...footerPrimaryLinks,
    ];
    for (const l of links) {
      if (l.href.startsWith("/")) expect(ROUTES.includes(l.href.split("#")[0]), l.href).toBe(true);
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
    expect(serviceProgram.length).toBe(4);
    expect(serviceCallSteps.length).toBe(4);
    expect(technicianCerts.length).toBe(6);
    expect(financeProcess.length).toBe(3);
  });

  it("client wall entries are complete, unique, and sourced", () => {
    expect(clients).toHaveLength(26);
    for (const c of clients) {
      expect(c.name, c.name).toBeTruthy();
      expect(c.domain, c.name).toMatch(/^[a-z0-9-]+(\.[a-z0-9-]+)+$/);
      expect(c.source, c.name).toMatch(/^founder-provided \d{4}-\d{2}-\d{2}$/);
    }
    expect(new Set(clients.map((c) => c.domain)).size).toBe(clients.length);
    expect(clients.map((c) => c.name)).not.toContain("Cuarvo");
  });

  it("expansion facts are present and founder-sourced", () => {
    const sourced = [
      ...assemblyPillars, ...dataOpsStats, ...researchStats,
      ...logisticsSections, ...financingHighlights, ...servicingHighlights,
      researchNote, aboutFacts, dataResidency, assemblyNote, researchClosing,
    ];
    // Date-prefixed rather than pinned to one date: facts arrive over time and
    // a hardcoded date makes this guard fail on every new founder document.
    for (const f of sourced) expect(f.source).toMatch(/^founder-provided \d{4}-\d{2}-\d{2}/);
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

  it("no hotlinked stock imagery in src", () => {
    for (const f of sourceFiles("src")) {
      expect(readFileSync(f, "utf8"), f).not.toContain("images.unsplash.com");
    }
  });

  it("never reintroduces the superseded 1,000/2,000 technician counts", () => {
    const driftPattern = /\b[12],000\+?\s+(certified\s+)?technicians/i;
    for (const f of sourceFiles("src")) {
      expect(readFileSync(f, "utf8"), f).not.toMatch(driftPattern);
    }
  });

  it("uses Inter as the only typeface — no Space Grotesk, no font-mono", () => {
    for (const f of sourceFiles("src")) {
      const content = readFileSync(f, "utf8");
      expect(content, f).not.toContain("font-mono");
      expect(content, f).not.toContain("Space_Grotesk");
      expect(content, f).not.toContain("space-grotesk");
    }
  });

  it("has no blueprint-grid decorative texture left in the codebase", () => {
    for (const f of sourceFiles("src")) {
      expect(readFileSync(f, "utf8"), f).not.toContain("blueprint-grid");
    }
  });

  // --- Design system guards (DESIGN.md §9) ---------------------------------

  it("uses the section rhythm scale, never a bare py-24/py-32", () => {
    // A single vertical padding value everywhere is what made the page scroll
    // like a metronome. Sections must opt into .section-tight/.section/.section-loose.
    for (const f of sourceFiles("src/app")) {
      if (f.endsWith("globals.css")) continue;
      expect(readFileSync(f, "utf8"), f).not.toMatch(/\bpy-(24|32)\b/);
    }
  });

  it("spends at most one .section-loose per page", () => {
    for (const f of sourceFiles("src/app")) {
      if (!f.endsWith("page.tsx")) continue;
      const count = (readFileSync(f, "utf8").match(/section-loose/g) ?? []).length;
      expect(count, `${f} has ${count} section-loose`).toBeLessThanOrEqual(1);
    }
  });

  it("sets every font-display heading at weight 600", () => {
    // Headings previously shipped at 700/600/500 simultaneously, so the hero
    // and the section headings looked like they came from different sites.
    const heading = /<h[123][^>]*font-display[^>]*font-(bold|medium|normal|light|extrabold)\b/;
    for (const f of sourceFiles("src")) {
      expect(readFileSync(f, "utf8"), f).not.toMatch(heading);
    }
  });

  it("routes photography through <Photo>, not a raw <img>", () => {
    // Raw <img> is still fine for brand marks and the logo-wall CDN cells;
    // anything out of public/images must go through the responsive pipeline.
    for (const f of sourceFiles("src")) {
      expect(readFileSync(f, "utf8"), f).not.toMatch(/<img[^>]*src=["'][^"']*\/images\//);
    }
  });

  it("never reintroduces fractional panel opacity", () => {
    // #f6f8fd at 40% over white composites to #fbfcfe — 1.03:1 against paper,
    // below the threshold where an edge registers at all. Panel is used at full
    // strength or not at all (DESIGN.md §3.1). globals.css is exempt because it
    // documents the defect it replaced.
    for (const f of sourceFiles("src")) {
      if (f.endsWith("globals.css")) continue;
      expect(readFileSync(f, "utf8"), f).not.toMatch(/bg-panel\/\d/);
    }
  });

  it("spends at most one .surface-dark per page", () => {
    // The CTA panel is already navy. A second full-bleed dark section is the
    // page's one argument-carrying moment; a third makes it wallpaper.
    for (const f of sourceFiles("src/app")) {
      if (!f.endsWith("page.tsx")) continue;
      const count = (readFileSync(f, "utf8").match(/surface-dark/g) ?? []).length;
      expect(count, `${f} has ${count} surface-dark`).toBeLessThanOrEqual(1);
    }
  });

  it("opens every page on a dark anchor", () => {
    // Either a PhotoHero or a .surface-dark hero. /contact is the documented
    // exception (DESIGN.md §3.1): a dark ground behind form inputs costs more
    // legibility than the rhythm is worth.
    const EXEMPT = ["contact"];
    for (const f of sourceFiles("src/app")) {
      if (!f.endsWith("page.tsx")) continue;
      if (EXEMPT.some((e) => f.includes(e))) continue;
      const content = readFileSync(f, "utf8");
      expect(/surface-dark|PhotoHero/.test(content), `${f} has no dark anchor`).toBe(true);
    }
  });

  it("keeps video silent, looping, and inline (DESIGN.md §6)", () => {
    for (const f of sourceFiles("src")) {
      const content = readFileSync(f, "utf8");
      if (!content.includes("<video")) continue;
      for (const attr of ["muted", "loop", "playsInline"]) {
        expect(content, `${f} <video> is missing ${attr}`).toContain(attr);
      }
      // Background video is decorative. Controls would make it focusable
      // furniture in the middle of the hero.
      expect(content, `${f} <video> must not expose controls`).not.toMatch(/\bcontrols\b/);
    }
  });

  it("keeps every shipped video under the 3MB budget", () => {
    if (!existsSync("public/video")) return;
    for (const name of readdirSync("public/video")) {
      const bytes = statSync(join("public/video", name)).size;
      const mb = (bytes / 1048576).toFixed(2);
      expect(bytes, `public/video/${name} is ${mb}MB, over the 3MB cap`).toBeLessThan(3 * 1048576);
    }
  });

  it("ships both an MP4 and a WebM for every video", () => {
    if (!existsSync("public/video")) return;
    const stems = new Set(readdirSync("public/video").map((n) => n.replace(/\.[^.]+$/, "")));
    for (const stem of stems) {
      expect(existsSync(`public/video/${stem}.mp4`), `${stem} is missing its .mp4`).toBe(true);
      expect(existsSync(`public/video/${stem}.webm`), `${stem} is missing its .webm`).toBe(true);
    }
  });

  it("keeps the radius scale to lg / xl / full / 20px", () => {
    for (const f of sourceFiles("src")) {
      expect(readFileSync(f, "utf8"), f).not.toMatch(/\brounded-(2xl|3xl|md|sm)\b/);
    }
  });
});

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return sourceFiles(p);
    return /\.(tsx?|css)$/.test(name) ? [p] : [];
  });
}
