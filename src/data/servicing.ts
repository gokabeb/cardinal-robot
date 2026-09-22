// Cardinal Robot Services, Inc. (CRS) — the field-service entity.
//
// CRS is a distinct company ("backed by Cardinal Robotics Corporation's
// operational expertise", per the onsite-support one pager), so this page
// carries its own name, its own positioning, and its own proof. Everything
// below traces to the two founder-supplied documents dated in `SRC_CRS`.
//
// Pricing is deliberately absent. The one pager quotes an annual base fee and
// an hourly rate; both are public price commitments and neither has marketing
// or legal sign-off yet. The SLA is published, the rates are not.
const SRC = "founder-provided 2026-07-18";
const SRC_CRS = "founder-provided 2026-09-16 (CRS one pager + 2026 overview deck)";

export const crsEntity = {
  legalName: "Cardinal Robot Services, Inc.",
  shortName: "CRS",
  tagline: "Onsite technical support · Fleet management · Workforce excellence",
  positioning: "America's trusted partner for robotics field services",
  source: SRC_CRS,
};

export const servicingHighlights = [
  { value: "48 hrs", label: "SLA commitment, most locations", source: SRC_CRS },
  { value: "24/7", label: "Support line", source: SRC },
  { value: "3,000+", label: "Certified technicians nationwide", source: SRC },
  { value: "48", label: "Contiguous states covered", source: SRC_CRS },
];

/**
 * "One program, four services" — the deck's own framing, which supersedes the
 * older three-pillar split. The pillars described the same work but cut it by
 * department rather than by what a customer actually buys.
 */
export const serviceProgram = [
  {
    title: "Reactive maintenance",
    summary: "Triage, troubleshooting, and standard or emergency on-site repair.",
    points: [
      "Standard and emergency dispatch",
      "SLAs matched to your operating requirements",
      "Nationwide coverage through Cardinal and partner networks",
    ],
  },
  {
    title: "Scheduled service",
    summary: "Preventative maintenance, installations, operator training, and fleet audits.",
    points: [
      "Quarterly preventative maintenance schedules",
      "Installation and integration at new sites",
      "Staff upskilled into robot operator roles",
    ],
  },
  {
    title: "Remote and teleservice",
    summary: "24/7 monitoring, remote diagnosis, and teleoperation — many calls close without a truck.",
    points: [
      "Level 1 and Level 2 support",
      "Remote diagnostics and escalation management",
      "Teleoperation oversight for live fleets",
    ],
  },
  {
    title: "Asset management",
    summary: "Warranty tracking, parts, logistics, warehousing, refurbishment, and spend reporting.",
    points: [
      "Parts logistics and depot warehousing",
      "Refurbishment and end-of-life handling",
      "Centralized dashboard: KPIs, scheduling, ROI reports",
    ],
  },
];

/** How a service call runs, end to end. */
export const serviceCallSteps = [
  {
    step: "01",
    title: "Call entry",
    body: "Phone, email, or app, 24/7. Make, model, serial; standard or emergency.",
  },
  {
    step: "02",
    title: "Remote triage",
    body: "Teleservice diagnosis, guided fixes, parts shipped from the nearest depot.",
  },
  {
    step: "03",
    title: "Dispatch",
    body: "Capability-based assignment to a certified technician; ETA confirmed with the site.",
  },
  {
    step: "04",
    title: "Completion",
    body: "ETA monitored, progression notices sent, resolution summarized and classified.",
  },
];

export const serviceCallNote = {
  text: "Every request lands in the portal: real-time dashboards, asset and warranty history, spend reporting, and quarterly review.",
  source: SRC_CRS,
};

/** Why CRS rather than an OEM contract or a generic field-service firm. */
export const crsDifferentiators = [
  {
    title: "Robots, not equipment",
    body: "OEMs sell swaps; field-service firms treat robots as a side business. Robots are the whole business here.",
  },
  {
    title: "Software-run operations",
    body: "Proprietary dispatch and work-order management, with real-time reporting on every call.",
  },
  {
    title: "Services others can't offer",
    body: "Remote monitoring, teleoperation, parts shipping, warehousing, and refurbishment under one contract.",
  },
];

export const coverageFacts = [
  { value: "50+", label: "Onsite service metros", source: SRC_CRS },
  { value: "10", label: "Parts and robot depots", source: SRC_CRS },
  { value: "200+", label: "Robots under service", source: SRC_CRS },
  { value: "60+", label: "Sites supported", source: SRC_CRS },
];

/** The workforce program — CRS builds technicians rather than hiring them. */
export const workforceCommitments = [
  "Partnerships with technical schools and community colleges for robotics technician certification",
  "Collaboration with government workforce agencies and VA-aligned programs to funnel veterans into robotics careers",
  "Formal credentialing pathways so every technician meets industry certification standards",
  "Ongoing retraining and upskilling as robot platforms evolve",
  "A growing roster of credentialed technicians ready for immediate deployment",
];

export const workforceNote = {
  text: "Technicians are certified per robot model and dispatched on capability, not proximity alone — then measured on time to site, days to complete, and recall rate. Many are retrained from displaced custodial staff and U.S. veterans, including disabled veterans.",
  source: SRC_CRS,
};

export const roiStatement = {
  text: "Robots don't fail because of technology — they fail because of poor deployment, lack of control, and no measurable outcomes.",
  source: SRC_CRS,
};

export const technicianCerts = ["A+", "Net+", "MCSE", "Mobility+", "CompTIA", "Security+"];
