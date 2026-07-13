import type { Robot } from "./types";

const SRC = "cardinalrobot.com/RaaS.php";

export const robots: Robot[] = [
  // ── Vacuuming ──────────────────────────────────────────────
  {
    slug: "v40", name: "V40", category: "vacuuming",
    tagline: "Built for large areas with autonomous mapping and controls.",
    headlineSpecs: ["~6,500 sq ft/hr", "3–4 hr battery"],
    specs: [
      { label: "Cleaning efficiency", value: "~6,500 sq ft/hr" },
      { label: "Battery life", value: "3–4 hours" },
      { label: "Charge time", value: "1.5 hours" },
      { label: "Weight", value: "176 lbs" },
      { label: "Navigation", value: "2D LiDAR, 3D camera, ultrasonic sensors" },
      { label: "Capabilities", value: "Floor-type identification, edge cleaning, obstacle avoidance" },
    ],
    idealFor: ["Hotels", "Casinos", "Offices"], source: SRC,
  },
  {
    slug: "whiz", name: "Whiz", category: "vacuuming",
    tagline: "Small, quiet, and reliable. Ideal for use during the day.",
    headlineSpecs: ["Daytime-quiet", "Compact footprint"],
    specs: [
      { label: "Profile", value: "Small, quiet, reliable" },
      { label: "Best use", value: "Daytime operation around guests and staff" },
    ],
    idealFor: ["Hotels", "Offices", "Schools"], source: SRC,
  },
  {
    slug: "v20", name: "V20", category: "vacuuming",
    tagline: "Designed for hallways and lobbies.",
    headlineSpecs: ["Hallways & lobbies", "Autonomous"],
    specs: [{ label: "Best use", value: "Hallways and lobbies" }],
    idealFor: ["Hotels", "Senior living"], source: SRC,
  },
  {
    slug: "v10", name: "V10", category: "vacuuming",
    tagline: "Cleans smaller spaces and fits under furniture.",
    headlineSpecs: ["Small spaces", "Under-furniture reach"],
    specs: [{ label: "Best use", value: "Smaller spaces; fits under furniture" }],
    idealFor: ["Offices", "Senior living"], source: SRC,
  },
  {
    slug: "mini-vacuum", name: "Mini Vacuum", category: "vacuuming",
    tagline: "Under 20 pounds, cleaning 2,600 sq ft per hour.",
    headlineSpecs: ["2,600 sq ft/hr", "Under 20 lbs"],
    specs: [
      { label: "Cleaning speed", value: "2,600 sq ft/hr" },
      { label: "Weight", value: "Under 20 lbs" },
    ],
    idealFor: ["Offices", "Schools"], source: SRC,
  },

  // ── Scrubbing & Sweeping ───────────────────────────────────
  {
    slug: "s50-pro", name: "S50 Pro", category: "scrubbing",
    tagline: "Intelligent mapping scrubber covering up to 12,000 sq ft per hour.",
    headlineSpecs: ["8,000–12,000 sq ft/hr", "~80% less water"],
    specs: [
      { label: "Cleaning efficiency", value: "8,000–12,000 sq ft/hr" },
      { label: "Battery life", value: "2–4 hours" },
      { label: "Charge time", value: "1.5 hours" },
      { label: "Weight", value: "330 lbs" },
      { label: "Filtration", value: "5-stage, ~80% water reduction" },
      { label: "Modes", value: "Intelligent mapping; manual mode available" },
    ],
    idealFor: ["Casinos", "Hospitals", "Convention floors"], source: SRC,
  },
  {
    slug: "scrubber", name: "Scrubber", category: "scrubbing",
    tagline: "Perfect for smaller areas. Quiet, autonomous, small footprint.",
    headlineSpecs: ["Small footprint", "Quiet operation"],
    specs: [{ label: "Profile", value: "Quiet, autonomous, small footprint" }],
    idealFor: ["Offices", "Schools"], source: SRC,
  },
  {
    slug: "sweeper", name: "Sweeper", category: "scrubbing",
    tagline: "Ideal for larger areas. Reliable coverage, and it can be ridden.",
    headlineSpecs: ["Large-area coverage", "Rideable"],
    specs: [
      { label: "Best use", value: "Larger areas" },
      { label: "Operation", value: "Autonomous or ridden" },
    ],
    idealFor: ["Casinos", "Convention floors"], source: SRC,
  },
  {
    slug: "s75", name: "S75", category: "scrubbing",
    tagline: "Garage sweeping at production scale.",
    headlineSpecs: ["30,000+ sq ft/hr", "Garage-rated"],
    specs: [{ label: "Production rate", value: "30,000+ sq ft/hr" }],
    idealFor: ["Parking garages", "Casinos"], source: SRC,
  },

  // ── Delivery ───────────────────────────────────────────────
  {
    slug: "d10", name: "D10", category: "delivery",
    tagline: "Delivers food and dishes from back-of-house to front-of-house.",
    headlineSpecs: ["BoH → FoH delivery", "Guest favorite"],
    specs: [{ label: "Use case", value: "Food and dish delivery, back-of-house to front-of-house" }],
    idealFor: ["Hotels", "Casinos", "Senior living"], source: SRC,
  },
  {
    slug: "d20", name: "D20", category: "delivery",
    tagline: "The D10's larger-capacity sibling.",
    headlineSpecs: ["Higher capacity", "BoH → FoH delivery"],
    specs: [{ label: "Use case", value: "Larger-capacity food and dish delivery" }],
    idealFor: ["Hotels", "Casinos"], source: SRC,
  },
  {
    slug: "room-delivery", name: "Room Delivery System", category: "delivery",
    tagline: "Saves 560+ labor hours every month on room delivery.",
    headlineSpecs: ["560+ labor hrs/mo saved", "12–24 hr battery"],
    specs: [
      { label: "Payload", value: "~88 lbs" },
      { label: "Carrying capacity", value: "20 gallons" },
      { label: "Battery life", value: "12–24 hours" },
      { label: "Charge time", value: "4 hours" },
      { label: "Impact", value: "Saves 560+ labor hours monthly" },
    ],
    idealFor: ["Hotels", "Casinos", "Hospitals"], source: SRC,
  },
  {
    slug: "titan", name: "Titan", category: "delivery",
    tagline: "Heavy payload delivery, elevator-compatible.",
    headlineSpecs: ["330–1,000 lbs payload", "Elevator-compatible"],
    specs: [
      { label: "Payload", value: "330–1,000 lbs" },
      { label: "Battery life", value: "10–24 hours" },
      { label: "Charge time", value: "5.5 hours" },
      { label: "Speed", value: "3.9 ft/second" },
      { label: "Access", value: "Elevator-compatible" },
    ],
    idealFor: ["Hospitals", "Casinos", "Hotels"], source: SRC,
  },

  // ── UV-C Disinfection ──────────────────────────────────────
  {
    slug: "uvc-robot", name: "UV-C Robot", category: "disinfection",
    tagline: "Autonomous ultraviolet disinfection, used across 500+ hospitals.",
    headlineSpecs: ["500+ hospitals", "Autonomous UV-C"],
    specs: [
      { label: "Deployment", value: "Used across 500+ hospitals" },
      { label: "Design", value: "Ergonomic, reliable, cost-effective" },
      { label: "Impact", value: "Disinfection in under 10 minutes, down from over 20" },
    ],
    idealFor: ["Hospitals", "Senior living", "Schools"], source: SRC,
  },

  // ── Security ───────────────────────────────────────────────
  {
    slug: "security-drone", name: "Security Drone", category: "security",
    tagline: "Covers 4 acres in 30 seconds, in all weather.",
    headlineSpecs: ["4 acres in 30 sec", "All-weather"],
    specs: [
      { label: "Flight time", value: "20 minutes" },
      { label: "Coverage", value: "4 acres in 30 seconds" },
      { label: "Conditions", value: "All-weather operation" },
    ],
    idealFor: ["Casinos", "Campuses", "Parking"], source: SRC,
  },

  // ── Outdoor & Facade ───────────────────────────────────────
  {
    slug: "window-drone", name: "Window-Washing Drone", category: "outdoor",
    tagline: "Pressure-washes building exteriors without lifts or scaffolding.",
    headlineSpecs: ["Facade cleaning", "Pressure washing"],
    specs: [{ label: "Use case", value: "Window washing and exterior pressure washing" }],
    idealFor: ["Hotels", "Offices"], source: SRC,
  },
  {
    slug: "trash-sorter", name: "Trash Sorting Robot", category: "outdoor",
    tagline: "Automated sorting that reduces landfill volume.",
    headlineSpecs: ["Automated sorting", "Landfill reduction"],
    specs: [{ label: "Use case", value: "Trash sorting for landfill reduction" }],
    idealFor: ["Casinos", "Campuses"], source: SRC,
  },

  // ── Food & Beverage ────────────────────────────────────────
  {
    slug: "smoothie-robot", name: "Smoothie Robot", category: "food-beverage",
    tagline: "A smoothie every 60 seconds, $2 profit per unit.",
    headlineSpecs: ["60-sec production", "$2 profit/unit"],
    specs: [
      { label: "Capacity", value: "84 smoothies" },
      { label: "Production time", value: "60 seconds" },
      { label: "Unit economics", value: "$2 profit per smoothie" },
    ],
    idealFor: ["Casinos", "Hotels", "Campuses"], source: SRC,
  },
  {
    slug: "salad-robot", name: "Salad Robot", category: "food-beverage",
    tagline: "Prepares salads, poke bowls, ice cream, and ramen.",
    headlineSpecs: ["4 menu formats", "Automated prep"],
    specs: [{ label: "Menu", value: "Salads, poke bowls, ice cream, ramen" }],
    idealFor: ["Casinos", "Campuses"], source: SRC,
  },

  // ── Specialty ──────────────────────────────────────────────
  {
    slug: "pool-120", name: "Pool Cleaner (120 ft)", category: "specialty",
    tagline: "Floor, waterline, and walls for pools up to 120 feet.",
    headlineSpecs: ["120 ft pools", "Floor + walls + waterline"],
    specs: [
      { label: "Pool size", value: "Up to 120 ft" },
      { label: "Cable", value: "138 ft" },
      { label: "Coverage", value: "Floor, waterline, and walls" },
    ],
    idealFor: ["Hotels", "Casinos"], source: SRC,
  },
  {
    slug: "pool-50", name: "Pool Cleaner (50 ft)", category: "specialty",
    tagline: "Full pool coverage for medium pools.",
    headlineSpecs: ["50 ft pools", "78 ft cable"],
    specs: [
      { label: "Pool size", value: "Up to 50 ft" },
      { label: "Cable", value: "78 ft" },
    ],
    idealFor: ["Hotels", "Senior living"], source: SRC,
  },
  {
    slug: "indoor-window", name: "Indoor Window Cleaner", category: "specialty",
    tagline: "Wet mop and microfiber window cleaning on a 110-minute battery.",
    headlineSpecs: ["110-min battery", "Wet mop + microfiber"],
    specs: [
      { label: "Cable", value: "24 ft" },
      { label: "Battery life", value: "110 minutes" },
      { label: "Attachments", value: "Wet mop and microfiber" },
    ],
    idealFor: ["Offices", "Hotels"], source: SRC,
  },
  {
    slug: "masseuse", name: "Robotic Masseuse", category: "specialty",
    tagline: "Back, shoulder, and leg massage generating $50–80 per hour.",
    headlineSpecs: ["$50–80/hr revenue", "300% ROI"],
    specs: [
      { label: "Revenue", value: "$50–80 per hour" },
      { label: "ROI", value: "300%" },
      { label: "Coverage", value: "Back, shoulder, and leg massage" },
    ],
    idealFor: ["Spas", "Casinos", "Hotels"], source: SRC,
  },
  {
    slug: "kettybot", name: "KettyBot", category: "specialty",
    tagline: "Front-of-house marketing and delivery with an 18.5-inch display.",
    headlineSpecs: ["18.5\" display", "66 lbs capacity"],
    specs: [
      { label: "Display", value: "18.5 inches" },
      { label: "Capacity", value: "66 lbs" },
      { label: "Use case", value: "Marketing, greeting, light delivery" },
    ],
    idealFor: ["Hotels", "Casinos", "Conventions"], source: SRC,
  },
];
