const SRC = "founder-provided 2026-07-18";
const SRC_SPEC = "founder-provided 2026-10-12 (website spec)";

/**
 * The engineering pedigree list changed in the 2026-10-12 spec: it now reads
 * "Rivian, Apple, Tesla, SpaceX and JCI", where the 2026-07-18 version said
 * "Rivian, Intel, Tesla, and JCI". Intel is out, Apple and SpaceX are in.
 *
 * Followed because the spec is the newer founder document, but flagged: these
 * are named third-party employers and the two versions disagree, so one of
 * them is wrong. Worth a confirmation before launch.
 */
export const assemblyIntro = {
  title: "From assembly to custom build.",
  lede: "Cardinal keeps critical robotics capabilities in the United States, giving you greater control over how your systems are built, secured, serviced, and integrated.",
  source: SRC_SPEC,
};

export const assemblyPillars = [
  { title: "Assembled in the USA", body: "Robots assembled onshore, with U.S. manufacturing at the core of every build.", source: SRC },
  { title: "Supply chain assurance", body: "Secure systems and supply-chain assurance from component sourcing to final assembly.", source: SRC },
  { title: "Industry veterans", body: "Built by engineers from Rivian, Apple, Tesla, SpaceX, and JCI.", source: SRC_SPEC },
  { title: "DFM + DFS for OEMs", body: "Comprehensive design-for-manufacturing and design-for-service capabilities, offered to all OEMs.", source: SRC },
];

export const assemblyDetail = {
  headline: "Built to our standards. On U.S. soil.",
  body: "Cardinal robots are assembled in the United States by Cardinal employees, giving us direct oversight of the hardware that enters customer environments.",
  source: SRC_SPEC,
};

export const assemblyNote = {
  text: "Our engineers bring experience from Rivian, Apple, Tesla, SpaceX, and JCI, with capabilities spanning Design for Manufacturing (DFM) and Design for Service (DFS) for OEM partners.",
  source: SRC_SPEC,
};
