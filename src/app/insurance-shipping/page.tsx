import type { Metadata } from "next";
import { logisticsSections } from "@/data/logistics";
import { Reveal } from "@/components/motion/Reveal";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { CTAPanel } from "@/components/ui/CTAPanel";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Insurance & Shipping" };

export default function InsuranceShippingPage() {
  return (
    <main>
      <PhotoHero
        image="warehouse"
        imageAlt="Tall warehouse aisle with stocked racking"
        title="Covered from dock to deployment."
        lede="Insurance, freight, warehousing, and integrations — the unglamorous half of robotics, handled."
      />

      <section className="mx-auto max-w-6xl space-y-24 px-6 section">
        {logisticsSections.map((s, i) => (
          <Reveal key={s.title}>
            <div className={cn("grid items-center gap-10 lg:grid-cols-2", i % 2 === 1 && "lg:[direction:rtl]")}>
              <div className="lg:[direction:ltr]">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">{s.title}</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed">{s.body}</p>
              </div>
              <div className="overflow-hidden rounded-xl border border-line shadow-xl shadow-navy/[0.06] lg:[direction:ltr]">
                <Photo
                  name={s.image}
                  alt={s.imageAlt}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <CTAPanel
        title="Ship it. Insure it. Run it."
        body="Tell us where your robots need to be — we handle everything in between."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
