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
