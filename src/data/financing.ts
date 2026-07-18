// Source: cardinalrobot.com/finance.php. Rate conflict resolved per spec §9
// (finance page's 3–5% wins over home page's 5%).
export const financeTerms = [
  { label: "Dedicated capital", value: "$800M" },
  { label: "Check size", value: "$500K–$50M per deployment" },
  { label: "Discount rate", value: "3–5% annually" },
  { label: "Equity dilution", value: "0%" },
  { label: "Structure", value: "Non-dilutive, non-debt capital" },
  { label: "Encumbrances", value: "No liens, personal guarantees, or balance-sheet restrictions" },
  { label: "Decision time", value: "Within 2 business days" },
];

export const financeEligibility = [
  "US-based robotics and IoT companies",
  "Growth-stage, with robots deployed or deployment-ready",
  "RaaS or HaaS business models",
];

export const financeProcess = [
  { step: "01", title: "Apply", body: "Submit through the online portal or email finance@cardinalrobot.com with your deployment pipeline." },
  { step: "02", title: "Decision in 2 business days", body: "Terms designed by roboticists who understand RaaS and HaaS economics." },
  { step: "03", title: "Deploy capital", body: "$500K to $50M per deployment, with Cardinal's 3,000+ technicians available for installation and support." },
];

export const financeEmail = "finance@cardinalrobot.com";

export const financingHighlights = [
  { value: "$800M", label: "Dedicated capital facility", source: "founder-provided 2026-07-18" },
  { value: "<5%", label: "Annualized rate", source: "founder-provided 2026-07-18" },
  { value: "0%", label: "Dilution", source: "founder-provided 2026-07-18" },
];
