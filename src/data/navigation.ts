export interface NavLink { label: string; href: string }
export interface NavItem { label: string; href?: string; children?: NavLink[] }

/** A footer link that may own a nested, indented group beneath it. */
export interface FooterColumn { title: string; links: FooterLink[] }
export interface FooterLink extends NavLink { children?: NavLink[] }

/**
 * IA per the founder website spec, 2026-10-12:
 *   Robots · Financing · Servicing · Security · US Assembly · Solutions · Why Cardinal
 *
 * Robots is not listed below because the Header hardcodes it as a category
 * mega-menu ahead of these items.
 *
 * This supersedes the previous IA, and two of its decisions are deliberately
 * reversed, so the reasoning is worth recording rather than silently dropping:
 *
 *   - Platform leaves the nav. It is not buried — the spec replaces it with a
 *     six-pillar section on the homepage, and the hero's primary CTA is an
 *     in-page anchor to it. The page survives at /platform for deep links.
 *   - Industries leaves the nav, reachable from the footer. The previous IA
 *     promoted it specifically because it had been footer-only; the spec puts
 *     it back. Flagged to the founder rather than quietly overridden.
 *
 * Solutions groups the two operational pages under the spec's own labels.
 * The routes are unchanged so existing links keep working: "Logistics &
 * Insurance" is /insurance-shipping, "Data & Intelligence" is
 * /data-collection.
 */
export const headerNav: NavItem[] = [
  { label: "Financing", href: "/financing" },
  { label: "Servicing", href: "/servicing" },
  { label: "Security", href: "/security" },
  {
    label: "US Assembly",
    children: [
      { label: "US Assembly", href: "/us-assembly" },
      { label: "Research & Development", href: "/research" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "Logistics & Insurance", href: "/insurance-shipping" },
      { label: "Data & Intelligence", href: "/data-collection" },
      { label: "Industries", href: "/industries" },
    ],
  },
  { label: "Why Cardinal", href: "/why-cardinal" },
];

/**
 * Standalone destinations, rendered as a row above the footer column grid.
 * These are the three "where do I start" doors.
 */
export const footerPrimaryLinks: NavLink[] = [
  { label: "Explore the Platform", href: "/platform" },
  { label: "Explore the Fleet", href: "/robots" },
  { label: "Explore Industries", href: "/industries" },
];

export const footerColumns: FooterColumn[] = [
  {
    // Platform leads, and the individual services indent beneath it: no single
    // service is the product. The platform is what you get when all of them
    // run against the same fleet, and the hierarchy should say so.
    title: "Services",
    links: [
      {
        label: "Platform",
        href: "/platform",
        children: [
          { label: "Servicing", href: "/servicing" },
          { label: "Logistics & Insurance", href: "/insurance-shipping" },
          { label: "Financing", href: "/financing" },
          { label: "Data & Intelligence", href: "/data-collection" },
        ],
      },
    ],
  },
  {
    title: "Fleet",
    links: [
      { label: "All robots", href: "/robots" },
      { label: "Industries", href: "/industries" },
      { label: "Vacuuming", href: "/robots/vacuuming" },
      { label: "UV-C Disinfection", href: "/robots/disinfection" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security", href: "/security" },
      { label: "US Assembly", href: "/us-assembly" },
      { label: "Research & Development", href: "/research" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why Cardinal", href: "/why-cardinal" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const youtubeUrl = "https://www.youtube.com/@cardinalrobotics4147";
export const linkedinUrl = "https://www.linkedin.com/in/karanguptasf/";
