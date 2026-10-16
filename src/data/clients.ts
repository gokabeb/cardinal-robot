export type ClientKind = "operator" | "oem";

export interface Client {
  name: string;
  domain: string; // used by LogoWall to fetch the mark from the logo CDN
  /**
   * Robot operators run fleets; OEMs build the machines. The website spec asks
   * for the wall to be split by the two.
   *
   * UNCONFIRMED — only Pudu and Gausium are unambiguously robot OEMs from the
   * source material. Everything else defaults to "operator", which is correct
   * for the hospitality, healthcare, facilities, and university names but is a
   * guess for GA Capital, Voltai, and MKS. Confirm before rendering the split:
   * putting a company in the wrong bucket publicly is worse than not splitting.
   */
  kind: ClientKind;
  source: string;
}

const SRC = "founder-provided 2026-07-18";
const SRC_AUG = "founder-provided 2026-08-25";

// Unified "Trusted by" wall (single list, per approved spec §4).
// "Cuarvo" intentionally excluded until the exact name is confirmed.
export const clients: Client[] = [
  { name: "Apple", domain: "apple.com", kind: "operator", source: SRC },
  { name: "Disney", domain: "disney.com", kind: "operator", source: SRC },
  { name: "Bank of America", domain: "bankofamerica.com", kind: "operator", source: SRC },
  { name: "American Express", domain: "americanexpress.com", kind: "operator", source: SRC_AUG },
  { name: "Marriott", domain: "marriott.com", kind: "operator", source: SRC },
  { name: "Hilton", domain: "hilton.com", kind: "operator", source: SRC },
  { name: "MGM Resorts", domain: "mgmresorts.com", kind: "operator", source: SRC },
  { name: "Caesars Entertainment", domain: "caesars.com", kind: "operator", source: SRC },
  { name: "Hard Rock Hotel", domain: "hardrockhotels.com", kind: "operator", source: SRC_AUG },
  { name: "Sutter Health", domain: "sutterhealth.org", kind: "operator", source: SRC },
  { name: "Stanford Hospital", domain: "stanfordhealthcare.org", kind: "operator", source: SRC },
  { name: "Adventist Health", domain: "adventisthealth.org", kind: "operator", source: SRC_AUG },
  { name: "Princeton University", domain: "princeton.edu", kind: "operator", source: SRC_AUG },
  { name: "University of Florida", domain: "ufl.edu", kind: "operator", source: SRC_AUG },
  // "IRS" held back pending confirmation that a federal agency is cleared for
  // public reference — agencies generally do not permit their name or seal to
  // be used as a commercial endorsement. Re-add with the wall count guard.
  { name: "CBRE", domain: "cbre.com", kind: "operator", source: SRC },
  { name: "Cushman & Wakefield", domain: "cushmanwakefield.com", kind: "operator", source: SRC },
  { name: "Compass Group", domain: "compass-group.com", kind: "operator", source: SRC },
  { name: "Marsden Services", domain: "marsdenservices.com", kind: "operator", source: SRC },
  { name: "Velociti Services", domain: "velocitiservices.com", kind: "operator", source: SRC_AUG },
  { name: "Pudu Robotics", domain: "pudurobotics.com", kind: "oem", source: SRC },
  { name: "Gausium", domain: "gausium.com", kind: "oem", source: SRC },
  { name: "GA Capital", domain: "gacapital.com", kind: "operator", source: SRC },
  { name: "Voltai", domain: "voltai.com", kind: "operator", source: SRC },
  { name: "MKS", domain: "mks.com", kind: "operator", source: SRC },
];
