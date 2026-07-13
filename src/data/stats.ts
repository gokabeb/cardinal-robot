import type { Stat } from "./types";

// Sources: cardinalrobot.com home, finance.php, servicing.php, RaaS.php.
// Conflicts resolved per spec §9: 3,000+ technicians (servicing page wins).
export const heroStats: Stat[] = [
  { value: 35000, suffix: "+", label: "Robots deployed" },
  { value: 3000, suffix: "+", label: "Certified technicians nationwide" },
  { value: 500, suffix: "+", label: "Hospitals using Cardinal UV-C" },
  { value: 800, prefix: "$", suffix: "M", label: "Dedicated financing facility" },
];

export const outcomes = [
  {
    stat: "Under 10 minutes",
    context: "Room disinfection time with Cardinal UV-C robots, down from over 20 minutes.",
    source: "cardinalrobot.com home (client testimonials)",
  },
  {
    stat: "560+ hours saved monthly",
    context: "Labor hours returned to staff by the Room Delivery System.",
    source: "cardinalrobot.com/RaaS.php",
  },
  {
    stat: "No upfront costs",
    context: "Rentals from $2.99/hr with unlimited servicing included.",
    source: "cardinalrobot.com home",
  },
];
