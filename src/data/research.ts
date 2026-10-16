const SRC = "founder-provided 2026-07-18";
const SRC_SPEC = "founder-provided 2026-10-12 (website spec)";

export const researchHero = {
  title: "Built in America for the real world.",
  lede: "Led by Stanford PhDs, Cardinal's R&D team develops advanced robotic systems and prototypes in California, keeping core development and engineering expertise in-house.",
  source: SRC_SPEC,
};

/** The three capability areas the spec breaks R&D into. */
export const researchCapabilities = [
  { title: "Robotics & prototyping", body: "Advanced systems designed and built in California.", source: SRC_SPEC },
  { title: "Hardware integrations", body: "Elevators, IoT systems, power doors, and other physical infrastructure.", source: SRC_SPEC },
  { title: "Software & APIs", body: "Integration with the software, platforms, and environments your operation already uses.", source: SRC_SPEC },
];

export const researchStats = [
  { value: "5+", label: "Patents granted", source: SRC },
  { value: "3", label: "Stanford spinouts", source: SRC },
  { value: "25", label: "R&D engineers", source: SRC },
];

export const researchNote = {
  text: "Stanford PhDs building the future of robotics design — in-house engineering and integrations, end to end.",
  source: SRC,
};

export const researchClosing = {
  text: "Robotics design, engineering, and integrations happen under one roof — from prototype to production deployment, with three Stanford spinouts to show for it.",
  source: SRC,
};
