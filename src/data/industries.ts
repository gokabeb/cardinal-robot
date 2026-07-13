import type { Industry } from "./types";

// Industries listed on cardinalrobot.com/RaaS.php: hospitals, senior living,
// hotels, schools, casinos, spas, conventions. Spas & conventions folded into
// Hotels & Resorts per spec §6. Casino FTE table used verbatim.
export const industries: Industry[] = [
  {
    slug: "hotels", name: "Hotels & Resorts",
    narrative: "From lobby vacuuming to room delivery, spa services, and conventions, robots keep service standards constant while your staff focuses on guests. The Room Delivery System alone returns 560+ labor hours to your team every month.",
    robotSlugs: ["room-delivery", "v40", "whiz", "pool-120", "masseuse", "kettybot"],
    metric: { value: "560+ hrs", label: "labor saved monthly by Room Delivery" },
  },
  {
    slug: "hospitals", name: "Hospitals & Healthcare",
    narrative: "Cardinal UV-C robots run medical-grade disinfection across 500+ hospitals, cutting room turnaround from over 20 minutes to under 10. Titan handles heavy logistics between floors, elevator-compatible and running up to 24 hours per charge.",
    robotSlugs: ["uvc-robot", "titan", "s50-pro"],
    metric: { value: "500+", label: "hospitals using Cardinal UV-C" },
  },
  {
    slug: "casinos", name: "Casinos & Gaming",
    narrative: "Casino floors never close, and neither do robots. Cardinal deployments across delivery, pool cleaning, vacuuming, and garage sweeping produce measurable FTE reductions per application — including a flat 20% cost reduction on garage cleaning.",
    robotSlugs: ["room-delivery", "sweeper", "s75", "security-drone", "smoothie-robot"],
    metric: { value: "20%", label: "flat cost reduction, garage cleaning" },
  },
  {
    slug: "senior-living", name: "Senior Living",
    narrative: "Labor shortages hit senior living hardest. Robots cover vacuuming, delivery, and disinfection so caregivers spend their hours on residents — with rentals from $2.99/hr and unlimited servicing included.",
    robotSlugs: ["v20", "d10", "uvc-robot"],
    metric: { value: "$2.99/hr", label: "rentals from, no upfront costs" },
  },
  {
    slug: "schools-offices", name: "Schools & Offices",
    narrative: "Quiet daytime-safe robots like Whiz work around occupants, while scrubbers cover up to 12,000 sq ft per hour after hours. One operator can run the whole fleet from a single dashboard.",
    robotSlugs: ["whiz", "scrubber", "s50-pro", "mini-vacuum"],
    metric: { value: "12,000 sq ft/hr", label: "peak scrubbing coverage (S50 Pro)" },
  },
];

export const casinoFteTable = [
  { application: "Room delivery", impact: "1–1.5 FTEs" },
  { application: "Linen delivery", impact: "1–2 FTEs" },
  { application: "Pool cleaning", impact: "0.25–0.5 FTE" },
  { application: "Guest room vacuuming", impact: "0.25 FTE" },
  { application: "Garage cleaning", impact: "Flat 20% cost reduction" },
];
