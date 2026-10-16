/**
 * Offensive security — robot and IoT fleet red teaming.
 *
 * Sourced from two partner capability documents (a RoboSec engagement brief and
 * an autonomous-pentest datasheet, both founder-supplied 2026-10-12). Per
 * founder instruction the partner is NOT named anywhere in shipped copy, and
 * neither are its product names. The capability is described in Cardinal's own
 * voice using the source documents' own scope.
 *
 * Scope discipline matters more here than anywhere else on the site. The source
 * brief is explicit that coverage is "supported robot and IoT command planes",
 * that enterprise reachability testing runs "without assuming broad
 * industrial-protocol coverage", that SCADA/ICS coverage is "vision, not
 * shipping", and that this is "not default SKU — engagement / SOW". Cardinal
 * sells into hospitals and DoD environments where an overstated security claim
 * is a disqualifier, so nothing below promises more than the source supports.
 *
 * Deliberately omitted:
 *   - The partner's name, and its two product names.
 *   - The partner's acceptance into Anthropic's Cyber Verification Program.
 *     That credential belongs to the partner, not to Cardinal; republishing it
 *     here would claim a third party's vetting as our own.
 */
const SRC = "founder-provided 2026-10-12 (partner RoboSec brief + pentest datasheet)";

export const redTeam = {
  eyebrow: "Offensive security",
  title: "Attack connected systems before attackers do.",
  lede:
    "A connected robot is a computer on your network with wheels. Cardinal red teams the fleet before it goes live — not after an incident — and proves what an attacker could actually reach.",
  source: SRC,
};

/**
 * What gets tested. These are the source brief's "supported surfaces", kept at
 * its level of specificity: command planes and the paths back into enterprise
 * infrastructure, not a blanket claim over every robot ever built.
 */
export const redTeamSurfaces = [
  {
    title: "Messaging and middleware",
    body: "MQTT broker authentication bypass, topic enumeration, and retained-message exfiltration. ROS2 and DDS node discovery and unauthenticated actuator commands.",
  },
  {
    title: "Fleet cloud and APIs",
    body: "Fleet-management API object-level authorization flaws, tenant isolation, unsigned update-promotion paths, and credential harvests that pivot into the fleet.",
  },
  {
    title: "Firmware and supply chain",
    body: "Firmware supply-chain analysis, call-home and backdoor detection, boot-chain integrity, and automated CVE matching against fleet components.",
  },
  {
    title: "Radio and wireless",
    body: "BLE, RF, and Zigbee scanning, sniff-and-replay, and command-replay testing. Cellular and eSIM exposure across multi-carrier fleets.",
  },
  {
    title: "Physical and debug ports",
    body: "UART, JTAG, and USB debug surfaces. Robot local-admin consoles, default credentials, and undocumented debug endpoints.",
  },
  {
    title: "Identity and attestation",
    body: "Enrollment and attestation auditing, update-downgrade testing, and device trust-signal spoofing against the trust chain.",
  },
];

/**
 * The evidence grades. This is the part worth putting on a marketing page: it
 * is the difference between a scanner's list of maybes and a finding you can
 * act on. Only the top grade can be rated critical.
 */
export const evidenceGrades = [
  { grade: "Exploited", body: "Captured output from the target proves the exploit worked. Only this grade can be rated critical." },
  { grade: "Observed", body: "The condition is confirmed, but exploitation was not completed." },
  { grade: "Attack path identified", body: "A reachable chain is proven, even where the exploit itself was gated." },
  { grade: "Simulated", body: "Modeled only. Never presented as proof of exploitation." },
];

/** The guarantees that make this safe to run against live hardware. */
export const redTeamGuarantees = [
  {
    title: "Hardware-safe",
    body: "Bounded, reversible probes. Destructive classes are default-deny and need explicit approval.",
  },
  {
    title: "Scoped and governed",
    body: "A signed authorization envelope names every target and expires. A kill switch halts the run on scope drift.",
  },
  {
    title: "Your infrastructure",
    body: "Testing runs inside your environment. Findings are delivered to you, and a fully deterministic mode keeps data from leaving at all.",
  },
  {
    title: "Retested, not just reported",
    body: "Every path is reported as blocked or reachable with evidence, then retested after you remediate.",
  },
];

/**
 * Two engagement modes. The source documents distinguish a deterministic,
 * byte-identical core from an optional reasoning layer on top. Both are
 * described without naming the partner's products.
 */
export const redTeamModes = [
  {
    name: "Deterministic",
    summary: "Repeatable and fully auditable.",
    points: [
      "Byte-identical runs — the same plan every time, so a result can be replayed",
      "No model output anywhere in the exploit path; every action attributable for audit",
      "Nothing leaves your environment, which suits regulated and air-gapped fleets",
    ],
    bestFor: "Repeatability and audit certainty",
  },
  {
    name: "Deterministic plus adaptive",
    summary: "The same core, with a reasoning layer that hunts novel paths.",
    points: [
      "Wider coverage — reasons about chained paths across surfaces a fixed ruleset misses",
      "The exploit core stays deterministic; the reasoning layer directs, it never becomes the proof",
      "Closest to a human red team, run continuously rather than once a year",
    ],
    bestFor: "Maximum depth and novel-path discovery",
  },
];

/**
 * FLAGGED FOR SIGN-OFF — not currently rendered.
 *
 * Founder-stated: Cardinal is "one of 200 companies/orgs in the world" with
 * early access to the partner's LLM-directed mode. Held back from shipped copy
 * for three reasons: there is no document behind the number; with the partner
 * unnamed the claim becomes "early access to" something the reader cannot
 * identify; and an unverifiable exclusivity number is the easiest claim on a
 * security page for a procurement reviewer to challenge.
 *
 * Wire it into the red-team section if you want it public and can stand behind
 * the figure.
 */
export const earlyAccessClaim = {
  text: "Among roughly 200 organizations worldwide with early access to LLM-directed autonomous red teaming.",
  source: "founder-provided 2026-10-12",
  status: "held — needs a verifiable source before publication",
};
