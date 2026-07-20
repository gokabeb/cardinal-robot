export interface Client {
  name: string;
  domain: string; // used by LogoWall to fetch the mark from the logo CDN
  source: string;
}

const SRC = "founder-provided 2026-07-18";

// Unified "Trusted by" wall (single list, per approved spec §4).
// "Cuarvo" intentionally excluded until the exact name is confirmed.
export const clients: Client[] = [
  { name: "Apple", domain: "apple.com", source: SRC },
  { name: "Disney", domain: "disney.com", source: SRC },
  { name: "Bank of America", domain: "bankofamerica.com", source: SRC },
  { name: "SoftBank", domain: "softbank.jp", source: SRC },
  { name: "Marriott", domain: "marriott.com", source: SRC },
  { name: "Hilton", domain: "hilton.com", source: SRC },
  { name: "MGM Resorts", domain: "mgmresorts.com", source: SRC },
  { name: "Caesars Entertainment", domain: "caesars.com", source: SRC },
  { name: "Sutter Health", domain: "sutterhealth.org", source: SRC },
  { name: "Stanford Hospital", domain: "stanfordhealthcare.org", source: SRC },
  { name: "CBRE", domain: "cbre.com", source: SRC },
  { name: "Cushman & Wakefield", domain: "cushmanwakefield.com", source: SRC },
  { name: "Compass Group", domain: "compass-group.com", source: SRC },
  { name: "Marsden Services", domain: "marsdenservices.com", source: SRC },
  { name: "Pudu Robotics", domain: "pudurobotics.com", source: SRC },
  { name: "Gausium", domain: "gausium.com", source: SRC },
  { name: "GA Capital", domain: "gacapital.com", source: SRC },
  { name: "Voltai", domain: "voltai.com", source: SRC },
  { name: "MKS", domain: "mks.com", source: SRC },
];
