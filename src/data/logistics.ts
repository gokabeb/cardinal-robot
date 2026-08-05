import type manifest from "@/lib/image-manifest.json";

type ImageName = keyof typeof manifest.images;

const SRC = "founder-provided 2026-07-18 (headings); copy drafted, no numeric claims";

export const logisticsSections: {
  title: string;
  body: string;
  /** Base image name resolved by <Photo>, not a path. */
  image: ImageName;
  imageAlt: string;
  source: string;
}[] = [
  {
    title: "Dedicated Insurance",
    body: "Every deployment is covered by dedicated insurance arranged for the robot, the facility, and the work it performs — handled by Cardinal, not left to the operator.",
    image: "insurance",
    imageAlt: "Service robot working in a restaurant dining room",
    source: SRC,
  },
  {
    title: "US Shipping of Robots",
    body: "Nationwide white-glove freight: crating, transport, and delivery to your dock, scheduled around installation so robots arrive ready to work.",
    image: "shipping",
    imageAlt: "Logistics crates staged in a warehouse",
    source: SRC,
  },
  {
    title: "Warehousing & Parts",
    body: "Elevator, IoT, powered-door, and API-based integrations, backed by warehoused parts — we integrate with any environment, software, and platform as required.",
    image: "parts",
    imageAlt: "Warehouse racking with stocked parts",
    source: SRC,
  },
];
