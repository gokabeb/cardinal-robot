/**
 * The six platform pillars, rendered as the homepage's 3×2 overview grid.
 *
 * Source: founder-supplied website spec, 2026-10-12. This section is what the
 * hero's primary CTA anchors to — "Explore the Platform" scrolls here rather
 * than navigating away, so the grid has to stand on its own as an answer to
 * "what is this company".
 *
 * One deliberate wording change from the spec. It writes Security as "DoD
 * certified"; the site ships "DoD-compliant", and `dataResidency` in
 * security.ts records that this phrasing was deliberately softened and
 * approved. Upgrading "compliant" to "certified" is a materially stronger
 * claim about a government standard, so the softened form stands until someone
 * confirms the certification exists.
 */
const SRC = "founder-provided 2026-10-12 (website spec)";

export interface Pillar {
  title: string;
  body: string;
  href: string;
}

export const platformPillars: Pillar[] = [
  {
    title: "Robots",
    body: "The right robot for every job, sourced from whichever vendor builds it best.",
    href: "/robots",
  },
  {
    title: "Financing",
    body: "Non-dilutive capital for robotics and IoT companies, from $500K to $50M per deployment.",
    href: "/financing",
  },
  {
    title: "Servicing",
    body: "Certified technicians keep every robot running, nationwide.",
    href: "/servicing",
  },
  {
    title: "Security",
    body: "US-hosted, no Wi-Fi dependency, DoD-compliant, SOC 2 and HIPAA aligned.",
    href: "/security",
  },
  {
    title: "US Assembly",
    body: "Assembled on US soil, designed and engineered for custom applications.",
    href: "/us-assembly",
  },
  {
    title: "Solutions",
    body: "Logistics, insurance, and fleet data — the operational layer behind every deployment.",
    href: "/solutions",
  },
];

export const pillarsIntro = {
  title: "A platform with any starting point. Choose what you need.",
  lede: "Every component works on its own as a point solution, or as a unified platform: source, finance, deploy, train, service, report, without switching vendors.",
  source: SRC,
};

/**
 * The three principles, homepage treatment — short form. The longer form on
 * /why-cardinal is in about.ts; both come from the same spec and must not
 * drift apart.
 */
export const principles = [
  {
    title: "People-first",
    headline: "Robots don't replace our people. We train them to do more.",
    body: "Safer work, skilled jobs, and a workforce built alongside unions and retrained for what's coming next.",
  },
  {
    title: "Vendor-agnostic",
    headline: "We don't just sell robots. We provide solutions.",
    body: "Cardinal evaluates the market and selects the best-in-class solution for each category.",
  },
  {
    title: "US-secured, US-hosted",
    headline: "Paranoid, on purpose.",
    body: "No Wi-Fi dependency, U.S.-only servers, and controls aligned to SOC 2, ISO 27001, HIPAA, and DoD deployments. The same protection standard as any other critical infrastructure.",
  },
];

export const proofStatement = {
  title: "The largest commercial robot deployment platform in the country.",
  lede: "Robot operators and OEMs trust Cardinal alike.",
  source: SRC,
};
