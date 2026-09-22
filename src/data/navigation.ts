export interface NavLink { label: string; href: string }
export interface NavItem { label: string; href?: string; children?: NavLink[] }

/** A footer link that may own a nested, indented group beneath it. */
export interface FooterLink extends NavLink { children?: NavLink[] }
export interface FooterColumn { title: string; links: FooterLink[] }

// Approved IA: Robots keeps its category mega-menu (special-cased in Header).
//
// Platform and Industries are top-level rather than dropdown children. Both
// were buried — Platform sat third inside "Technology", Industries was footer-
// only — so a visitor had to go looking for the two pages that frame everything
// else. Financing stays top-level: it is a distinct audience (robotics
// companies), not a capability of the platform.
export const headerNav: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Industries", href: "/industries" },
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
    ],
  },
  { label: "About", href: "/about" },
];

/**
 * Standalone destinations, rendered as a row above the footer column grid.
 *
 * These are the three "where do I start" doors. Sitting them inside a column
 * of sibling links flattened them against the category lists — Industries in
 * particular read as a peer of "Vacuuming", which it is not.
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
          { label: "Insurance & Shipping", href: "/insurance-shipping" },
          { label: "Financing", href: "/financing" },
          { label: "Data Collection", href: "/data-collection" },
        ],
      },
    ],
  },
  {
    // Industries moved out: it is a way of entering the catalogue, not an
    // entry in it.
    title: "Fleet",
    links: [
      { label: "All robots", href: "/robots" },
      { label: "Vacuuming", href: "/robots/vacuuming" },
      { label: "Delivery", href: "/robots/delivery" },
      { label: "UV-C Disinfection", href: "/robots/disinfection" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Cyber Security", href: "/security" },
      { label: "US Assembly", href: "/us-assembly" },
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
