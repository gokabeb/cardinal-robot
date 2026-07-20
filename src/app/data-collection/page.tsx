import type { Metadata } from "next";
import { dataOpsStats } from "@/data/dataops";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Data Collection" };

export default function DataCollectionPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Data Collection"
              title="Data operations that never sleep."
              lede="A global data operation behind every deployed robot — labeling, quality, and analytics running around the clock."
            />
          </Reveal>
        </div>
      </section>

      <Reveal delay={0.1} className="mx-auto mt-16 max-w-6xl px-6">
        <div className="overflow-hidden rounded-2xl border border-line shadow-xl shadow-navy/[0.06]">
          <img
            src="/images/dataops.jpg"
            alt="Close-up of a bright network patch panel with numbered ports and blue ethernet cables"
            loading="lazy"
            className="img-tone aspect-[21/9] w-full object-cover"
          />
        </div>
      </Reveal>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Stagger className="grid gap-4 md:grid-cols-3">
          {dataOpsStats.map((s) => (
            <StaggerItem key={s.label}>
              <Card className="h-full text-center">
                <p className="font-mono tabular text-5xl font-medium tracking-tight text-cardinal-700">{s.value}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">{s.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTAPanel
        title="Put your fleet's data to work."
        body="24/7 data operations with a global presence, feeding measurable ROI."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
