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
import {
  serviceProgram, serviceCallSteps, technicianCerts,
  crsEntity, serviceCallNote, coverageFacts, workforceNote, roiStatement,
} from "@/data/servicing";
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
  "/security", "/financing", "/why-cardinal", "/contact",
  "/us-assembly", "/data-collection", "/research", "/insurance-shipping",
  "/solutions", "/press",
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
    expect(clients).toHaveLength(24); // SoftBank removed per the 2026-10-12 spec
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
    // legibility than the rhythm is worth. /about only forwards to /why-cardinal.
    const EXEMPT = ["contact", "app/about/"];
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
  // --- Servicing rebrand + mobile design findings (this ship) --------------

  it("never composes a type-scale class through cn() (DESIGN.md §2.2.1)", () => {
    // cn() runs twMerge, which groups everything matching `text-*` into one
    // conflict bucket. It cannot tell a custom font-size class from a colour,
    // so cn("text-title", "text-white") resolves to "text-white" and the
    // heading silently falls back to inherited 16px — no build error, no
    // failing render. Type-scale classes go in a template literal; cn() keeps
    // the layout classes and the incoming className prop.
    const SCALE = /\btext-(display|title|subtitle|lede|copy|fine|label)\b/;
    for (const f of sourceFiles("src")) {
      if (!/\.tsx?$/.test(f)) continue;
      for (const args of cnCallArgs(stripComments(readFileSync(f, "utf8")))) {
        expect(SCALE.test(args), `${f}: cn(${args.trim().slice(0, 80)}…) swallows a type-scale class`).toBe(false);
      }
    }
  });

  it("keeps -webkit-backdrop-filter ahead of the standard property in .glass", () => {
    // Standard-last is load-bearing: in the other order the CSS minifier folds
    // the pair into the -webkit- form alone, and Chrome and Firefox (Android
    // included) render a 72%-white nav bar with no blur at all — body copy
    // stays legible straight through the header.
    const css = readFileSync("src/app/globals.css", "utf8");
    const block = css.match(/\.glass\s*\{[^}]*\}/)?.[0];
    expect(block, ".glass rule is missing from globals.css").toBeTruthy();
    const webkit = block!.indexOf("-webkit-backdrop-filter");
    const standard = block!.search(/(?<!-webkit-)backdrop-filter/);
    expect(webkit, ".glass has no -webkit-backdrop-filter fallback").toBeGreaterThan(-1);
    expect(standard, ".glass has no standard backdrop-filter").toBeGreaterThan(-1);
    expect(webkit, ".glass must declare -webkit-backdrop-filter BEFORE backdrop-filter").toBeLessThan(standard);
  });

  it("holds every page to the 3-reveal motion budget, or to its recorded debt", () => {
    // DESIGN.md §5 caps scroll-triggered entrances at 3 per page: when every
    // section animates, entrance animation is wallpaper and nothing is
    // emphasised. Two pages predate the rule and still exceed it (/about and /security paid theirs off in the 2026-10-12 content pass). They are
    // pinned at their current count rather than exempted, so the debt can only
    // shrink; everything else gets the real budget.
    const BUDGET = 3;
    const DEBT: Record<string, number> = {
      "src/app/financing/page.tsx": 7,
      "src/app/platform/page.tsx": 5,
    };
    const seen = new Set<string>();
    for (const f of sourceFiles("src/app")) {
      if (!f.endsWith("page.tsx")) continue;
      const content = readFileSync(f, "utf8");
      const count = (content.match(/<(Reveal|Stagger|WordReveal|Parallax)\b/g) ?? []).length;
      const cap = DEBT[f] ?? BUDGET;
      if (f in DEBT) seen.add(f);
      expect(count, `${f} spends ${count} reveals against a cap of ${cap}`).toBeLessThanOrEqual(cap);
    }
    // If a debt entry stops matching a real page, the ratchet has rotted.
    expect([...seen].sort(), "a DEBT entry no longer matches a page").toEqual(Object.keys(DEBT).sort());
  });

  it("keeps / and /servicing reading copy at or above the 15px floor", () => {
    // DESIGN.md §2.2 puts the floor for anything read in a sentence at 15px
    // (.text-fine); 12px is for labels only. These are the two pages this ship
    // rebuilt — the rest of the site still carries sub-floor body copy and is
    // deliberately out of scope here.
    //
    // This guard used to require `text-sm` AND `leading-relaxed` on the same
    // <p>. That was the shape of the one defect FINDING-003 fixed, not the
    // rule: once leading-relaxed left both files the pair could never co-occur
    // and the guard passed unconditionally, while a bare `text-xs` sentence
    // shipped on /servicing. Match the rule instead — a sub-floor <p> fails
    // when it carries literal prose. Labels legitimately sit at 12px: the
    // zero-padded indices, the uppercase eyebrows, the hover-arrow CTAs and
    // the interpolated entity name all render an expression or a fragment,
    // not a sentence, so they stay legal without needing an exemption list.
    const subFloorP = /<p[^>]*\bclassName="[^"]*\btext-(?:xs|sm)\b[^"]*"[^>]*>([\s\S]*?)<\/p>/g;
    const sentence = /[A-Za-z]{2,}[^<>{}]*[.!?](?:\s|$)/;
    for (const f of ["src/app/page.tsx", "src/app/servicing/page.tsx"]) {
      for (const m of readFileSync(f, "utf8").matchAll(subFloorP)) {
        const text = m[1].replace(/\{[^{}]*\}/g, "").trim();
        expect(
          sentence.test(text),
          `${f}: sub-floor <p> carries reading copy — "${text.slice(0, 60)}"`,
        ).toBe(false);
      }
    }
  });

  it("draws the lifecycle diagram at both phone and desktop sizes", () => {
    // The horizontal rail is a 720-unit viewBox scaled to fit, so at 375px its
    // 13px labels land near 6px. The phone build is a separate vertical svg at
    // 1:1 pixel size. Deleting either branch silently returns the diagram to
    // unreadable-on-mobile, which is what FINDING-006 fixed.
    const src = readFileSync("src/components/diagrams/LifecycleDiagram.tsx", "utf8");
    expect(src, "the phone (vertical) lifecycle svg is gone").toMatch(/<svg[^>]*className="sm:hidden"/s);
    expect(src, "the desktop (horizontal) lifecycle svg is gone").toMatch(/<svg[^>]*className="hidden w-full sm:block"/s);
    // Both branches must label themselves for screen readers, not just the one.
    expect((src.match(/role="img" aria-label=/g) ?? []).length).toBe(2);
  });

  it("never hands LifecycleDiagram fewer than two phases", () => {
    // step = 100 / (phases.length - 1). One phase divides by zero and every
    // node x becomes NaN; zero phases gives the phone svg a negative height.
    const src = readFileSync("src/components/diagrams/LifecycleDiagram.tsx", "utf8");
    const defaults = src.match(/DEFAULT_PHASES\s*=\s*\[([^\]]*)\]/)?.[1] ?? "";
    expect(defaults.split(",").filter((x) => x.trim()).length, "DEFAULT_PHASES needs >= 2 entries").toBeGreaterThanOrEqual(2);
    for (const f of sourceFiles("src")) {
      if (!/\.tsx$/.test(f)) continue;
      for (const call of readFileSync(f, "utf8").match(/<LifecycleDiagram[^>]*>/g) ?? []) {
        const arr = call.match(/phases=\{\[([^\]]*)\]\}/)?.[1];
        if (arr === undefined) continue; // uses DEFAULT_PHASES
        expect(arr.split(",").filter((x) => x.trim()).length, `${f}: ${call}`).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("keeps the header bar at or under seven top-level items", () => {
    // Promoting Platform and Industries took the bar from 6 to 7. At gap-7 the
    // seventh item overflowed the container at 1024px, which is why the lg gap
    // dropped to 5. An eighth item overflows again at any gap.
    expect(headerNav.length, `headerNav has ${headerNav.length} top-level items`).toBeLessThanOrEqual(7);
    const header = readFileSync("src/components/layout/Header.tsx", "utf8");
    expect(header, "the lg nav gap must stay at 5 with xl:gap-7 above it").toContain("lg:flex xl:gap-7");
  });

  // --- CRS servicing data module ------------------------------------------

  it("CRS facts are founder-sourced", () => {
    // The servicing rebrand introduced five new sourced exports that the
    // original expansion-facts guard does not reach.
    const sourced = [crsEntity, serviceCallNote, workforceNote, roiStatement, ...coverageFacts];
    for (const f of sourced) expect(f.source, JSON.stringify(f).slice(0, 60)).toMatch(/^founder-provided \d{4}-\d{2}-\d{2}/);
    expect(crsEntity.legalName).toBe("Cardinal Robot Services, Inc.");
    expect(crsEntity.shortName).toBe("CRS");
  });

  it("serviceProgram is four complete, distinctly-titled services", () => {
    expect(serviceProgram).toHaveLength(4);
    for (const s of serviceProgram) {
      expect(s.title, "title").toBeTruthy();
      expect(s.summary, s.title).toBeTruthy();
      expect(s.points.length, `${s.title} points`).toBeGreaterThan(0);
      for (const p of s.points) expect(p, s.title).toBeTruthy();
    }
    expect(new Set(serviceProgram.map((s) => s.title)).size).toBe(serviceProgram.length);
  });

  it("serviceCallSteps are sequential, zero-padded, and complete", () => {
    // The step number is rendered as the card's own eyebrow, so a gap or a
    // duplicate reads as a broken process rather than a data error.
    expect(serviceCallSteps).toHaveLength(4);
    serviceCallSteps.forEach((s, i) => {
      expect(s.step, `step ${i}`).toBe(String(i + 1).padStart(2, "0"));
      expect(s.title, s.step).toBeTruthy();
      expect(s.body, s.step).toBeTruthy();
    });
  });

  it("servicingHighlights and coverageFacts are complete, unique stat bands", () => {
    // Both render as 2-up hairline baseline grids keyed on label.
    for (const band of [servicingHighlights, coverageFacts]) {
      expect(band).toHaveLength(4);
      for (const h of band) {
        expect(h.value, h.label).toBeTruthy();
        expect(h.label, h.value).toBeTruthy();
      }
      expect(new Set(band.map((h) => h.label)).size, "duplicate label breaks the React key").toBe(band.length);
    }
  });

  it("publishes no pricing figure on /servicing", () => {
    // The CRS one pager quotes an annual base fee and an hourly rate. Both are
    // public price commitments and neither has marketing or legal sign-off.
    // The SLA is published; the rates are not.
    const page = readFileSync("src/app/servicing/page.tsx", "utf8");
    expect(page, "a currency figure reached /servicing without pricing sign-off").not.toMatch(/\$\s?\d/);
    expect(page, "a rate reached /servicing without pricing sign-off").not.toMatch(/\d\s*\/\s*(hr|hour|mo|month|yr|year)\b/i);
  });

  // --- Navigation IA ------------------------------------------------------

  it("never lists the same route twice in the header bar", () => {
    // Platform was promoted to top level and removed from the Technology
    // dropdown. Leaving both would give the bar two doors to one page.
    const hrefs = headerNav.flatMap((i) => (i.children ? i.children.map((c) => c.href) : [i.href!]));
    expect(new Set(hrefs).size, `duplicate header route in ${hrefs.join(", ")}`).toBe(hrefs.length);
  });

  it("footerPrimaryLinks are three distinct doors", () => {
    expect(footerPrimaryLinks).toHaveLength(3);
    expect(new Set(footerPrimaryLinks.map((l) => l.href)).size).toBe(3);
    expect(new Set(footerPrimaryLinks.map((l) => l.label)).size).toBe(3);
    for (const l of footerPrimaryLinks) expect(l.label, l.href).toMatch(/^Explore /);
  });

  it("keeps footer nesting one level deep", () => {
    // Footer renders link -> children and stops. A grandchild would be dropped
    // silently, shipping an unreachable route with a green suite.
    for (const col of footerColumns) {
      expect(col.title, "column title").toBeTruthy();
      expect(col.links.length, col.title).toBeGreaterThan(0);
      for (const l of col.links) {
        for (const c of l.children ?? []) {
          expect("children" in c, `${col.title} > ${l.label} > ${c.label} is nested too deep`).toBe(false);
        }
      }
    }
  });

  it("client names are unique and the August additions are dated", () => {
    // Domains were already guarded; names are what the logo wall renders and
    // what a duplicate would show twice.
    expect(new Set(clients.map((c) => c.name)).size).toBe(clients.length);
    // "IRS" is deliberately absent: held pending confirmation that a federal
    // agency is cleared for public reference. Compared as a sorted set so
    // reordering the wall for visual balance is not a test failure.
    const august = clients.filter((c) => c.source === "founder-provided 2026-08-25");
    expect(august).toHaveLength(6);
    expect(august.map((c) => c.name).sort()).toEqual([
      "Adventist Health", "American Express", "Hard Rock Hotel",
      "Princeton University", "University of Florida", "Velociti Services",
    ].sort());
    expect(clients.map((c) => c.name), "IRS needs publicity sign-off").not.toContain("IRS");
  });

});

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return sourceFiles(p);
    return /\.(tsx?|css)$/.test(name) ? [p] : [];
  });
}

/** Strip block and line comments so a guard does not fire on prose about it. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

/** Every cn(...) argument list in `src`, paren-balanced so nesting is safe. */
function cnCallArgs(src: string): string[] {
  const out: string[] = [];
  const re = /\bcn\(/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    let depth = 1;
    let i = m.index + m[0].length;
    const start = i;
    while (i < src.length && depth > 0) {
      const ch = src[i];
      if (ch === "(") depth++;
      else if (ch === ")") depth--;
      i++;
    }
    out.push(src.slice(start, i - 1));
  }
  return out;
}
