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
import { clients } from "@/data/clients";
import { assemblyPillars } from "@/data/assembly";
import { dataOpsStats } from "@/data/dataops";
import { researchStats, researchNote } from "@/data/research";
import { logisticsSections } from "@/data/logistics";
import { aboutFacts } from "@/data/about";
import { financingHighlights } from "@/data/financing";
import { servicingHighlights } from "@/data/servicing";
import { dataResidency } from "@/data/security";

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
});
