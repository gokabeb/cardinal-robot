import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { robots } from "@/data/robots";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = {
  title: "The Fleet",
  description:
    "Cardinal is outcome obsessed and OEM-agnostic. Eight robot categories, 24 units, from $2.99/hr with no upfront cost.",
};

/**
 * Eight category tiles rather than the 24-unit filterable list (spec §Robots:
 * "8 tiles with the main robot categories ... instead of the current
 * exhaustive list"). Nothing is lost — /robots/[category] already lists every
 * unit in that category with its specs, so this becomes the overview and the
 * category page becomes the catalogue.
 *
 * The spec also asks each tile to carry "an adjoining image". There are no
 * category photographs in the repo — DESIGN.md §6.3 already flags the missing
 * catalogue imagery as an open violation — so the tiles are typographic for
 * now: the unit count does the work the image would have done. The markup is
 * shaped so a <Photo> slots in above the heading without a rebuild.
 */
export default function RobotsPage() {
  const unitCount = (slug: string) => robots.filter((r) => r.category === slug).length;

  return (
    <main>
      <section className="surface-dark section">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              tone="dark"
              title="Get the right robot for the job."
              lede="Cardinal is outcome obsessed and OEM-agnostic. We find and deploy the best-in-class robot for your specific application, starting at $2.99/hr with no upfront cost."
            />
          </Reveal>
        </div>
      </section>

      <section className="section mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Eight categories. Twenty-four units."
          lede="Application-task-specific robots, matched to the job and covered end to end."
        />
        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <StaggerItem key={c.slug}>
              <Link href={`/robots/${c.slug}`} className="group block h-full">
                <Card className="flex h-full flex-col justify-between gap-8 p-7">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="tabular text-label text-muted">{String(i + 1).padStart(2, "0")}</p>
                      <p className="tabular text-label text-muted">
                        {unitCount(c.slug)} {unitCount(c.slug) === 1 ? "unit" : "units"}
                      </p>
                    </div>
                    <h2 className="text-subtitle mt-4 font-display font-semibold text-navy">{c.name}</h2>
                    <p className="text-fine mt-3">{c.blurb}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cardinal-600 transition-transform duration-150 group-hover:translate-x-1">
                    View robots →
                  </p>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTAPanel
        title="Not sure which robot to pick?"
        body="Tell us what you need to accomplish. We'll help you find the best robotic solution for your operation."
        cta={{ label: "Talk to us", href: "/contact" }}
      />
    </main>
  );
}
