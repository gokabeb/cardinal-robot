const SRC = "founder-provided 2026-07-18";
const SRC_SPEC = "founder-provided 2026-10-12 (website spec)";

export const aboutFacts = {
  headline: "The nation's largest robotics deployment company.",
  origin: "Spun out of Stanford, redefining automation across industries with advanced robotic solutions.",
  hq: "Headquartered in Palo Alto, California.",
  founders: "Founded by PhDs from Stanford, MIT, and Berkeley — world-class research combined with industry expertise.",
  veterans: "400+ engineers in India and 3,000+ U.S. service technicians, many of them veterans upskilled into top-tier robotics service careers.",
  source: SRC,
};

/**
 * /why-cardinal — the renamed About page. The spec asks for the company's
 * values to sit alongside the team details rather than the team details alone,
 * so the page now leads with the three principles and closes on who we are.
 */
export const whyCardinal = {
  hero: "Building the robotic workforce the right way.",
  lede: "That means investing in its people, delivering the best ROI on every deployment, and never letting data leave U.S. soil, backed by a team that treats all three as non-negotiable.",
  framing:
    "The future of robotics isn't only about what machines can do. It's about how we deploy them, who benefits from them, and who we trust to build the infrastructure around them.",
  source: SRC_SPEC,
};

/**
 * Long-form principles for /why-cardinal. The short homepage form lives in
 * pillars.ts as `principles`; the two are the same three ideas at different
 * lengths and must not drift apart.
 */
export const whyCardinalPrinciples = [
  {
    title: "People-first",
    headline: "Automate the work. Invest in the worker.",
    body: "Cardinal deploys robotics where automation removes the most dangerous, repetitive, and physically demanding work, and creates new roles for the people who operate, maintain, and manage the fleet that replaces it.",
    detail:
      "We don't just hire technicians. We build them. Many of Cardinal's technicians are U.S. military veterans, including veterans with disabilities, who are upskilled and retrained into robotics careers, certified through Cardinal's own workforce program.",
  },
  {
    title: "Agnostic by design",
    headline: "Cardinal evaluates every category, so you get the best ROI each time.",
    body: "We evaluate the market and select the best-in-class robot for each application, giving you the choice to deploy whichever one delivers the best return for your operation.",
    detail: null,
  },
  {
    title: "US-secured, US-hosted",
    headline: "Secure by design. American by choice.",
    body: "Every robot Cardinal deploys is a physical machine on your network, carrying your operational data that deserves the same protection as any other critical infrastructure.",
    detail:
      "We ensure every connection is encrypted, access-controlled, hosted only on U.S. soil, and audited against SOC 2, ISO 27001, HIPAA, and DoD standards.",
  },
];
