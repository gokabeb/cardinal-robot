import type { Metadata } from "next";
import { logisticsSections } from "@/data/logistics";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAPanel } from "@/components/ui/CTAPanel";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Insurance & Shipping" };

export default function InsuranceShippingPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Insurance & Shipping"
              title="Covered from dock to deployment."
              lede="Insurance, freight, warehousing, and integrations — the unglamorous half of robotics, handled."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-24 px-6 py-24">
        {logisticsSections.map((s, i) => (
          <Reveal key={s.title}>
            <div className={cn("grid items-center gap-10 lg:grid-cols-2", i % 2 === 1 && "lg:[direction:rtl]")}>
              <div className="lg:[direction:ltr]">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">{s.title}</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed">{s.body}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-line shadow-xl shadow-navy/[0.06] lg:[direction:ltr]">
                <img src={s.image} alt={s.imageAlt} loading="lazy" className="img-tone aspect-[4/3] w-full object-cover" />
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
