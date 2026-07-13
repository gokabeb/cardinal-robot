export type CategorySlug =
  | "vacuuming" | "scrubbing" | "delivery" | "disinfection"
  | "security" | "outdoor" | "food-beverage" | "specialty";

export interface RobotSpec { label: string; value: string }

export interface Robot {
  slug: string;
  name: string;
  category: CategorySlug;
  tagline: string;
  headlineSpecs: [string, string];
  specs: RobotSpec[];
  idealFor: string[];
  source: string;
}

export interface Category { slug: CategorySlug; name: string; blurb: string }

export interface Stat { value: number; prefix?: string; suffix?: string; label: string }

export interface Industry {
  slug: string;
  name: string;
  narrative: string;
  robotSlugs: string[];
  metric: { value: string; label: string };
}
