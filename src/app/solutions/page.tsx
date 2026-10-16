import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Photo } from "@/components/ui/Photo";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Logistics, insurance, and fleet data — the operational layer behind every Cardinal deployment.",
};

/**
 * The hub the spec asks for: "This can include the Logistics & Insurance as
 * well as the Data & Intelligence pages."
 *
 * Deliberately a router, not a third content page. Both destinations already
 * carry their own full copy, so duplicating it here would create two places to
 * keep in sync. Industries rides along because the nav groups it under
 * Solutions and it would otherwise be footer-only.
 */
const AREAS = [
  {
    title: "Logistics & Insurance",
    href: "/insurance-shipping",
    body: "Dedicated robotics insurance, US shipping, and warehousing with parts depots across the country — the physical layer that keeps a fleet moving.",
    photo: "shipping" as const,
    alt: "Robots crated and staged for shipment in a logistics warehouse",
  },
  {
    title: "Data & Intelligence",
    href: "/data-collection",
    body: "A global data operation behind every deployed robot: labeling, quality, and analytics running around the clock.",
    photo: "research" as const,
    alt: "Engineers reviewing robotics data on monitors in a research lab",
  },
  {
    title: "Industries",
    href: "/industries",
    body: "Hospitals, hotels, casinos, senior living, and schools — where labor is short and standards aren't.",
    photo: "warehouse" as const,
    alt: "Tall warehouse aisle with stocked racking",
  },
];

export default function SolutionsPage() {
  return (
    <main>
      <section className="surface-dark section">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              tone="dark"
              title="The operational layer behind every deployment."
              lede="Logistics, insurance, and fleet data. The parts of a robotics program that decide whether it survives contact with a real building."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 section">
        <div className="grid gap-4 md:grid-cols-3">
          {AREAS.map((a) => (
            <Link key={a.href} href={a.href} className="group block h-full">
              <Card className="flex h-full flex-col overflow-hidden p-0">
                <div className="h-52 overflow-hidden">
                  <Photo
                    name={a.photo}
                    alt={a.alt}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-8">
                  <div>
                    <h2 className="text-subtitle font-display font-semibold text-navy">{a.title}</h2>
                    <p className="text-fine mt-3">{a.body}</p>
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-[0.2em] text-cardinal-600 transition-transform duration-150 group-hover:translate-x-1">
                    Explore →
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <CTAPanel
        title="Deploy with the whole stack behind you."
        body="Tell us about your facility, your fleet, or your robotics company."
        cta={{ label: "Talk to us", href: "/contact" }}
        secondary={{ label: "Explore the platform", href: "/platform" }}
      />
    </main>
  );
}
