import type { Metadata } from "next";
import { assemblyPillars } from "@/data/assembly";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "US Assembly" };

export default function UsAssemblyPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="US Assembly"
              title="Assembled in the USA."
              lede="Onshore assembly and U.S. manufacturing, with secure systems and supply-chain assurance behind every robot we deploy."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Stagger className="grid gap-4 md:grid-cols-2">
          {assemblyPillars.map((p) => (
            <StaggerItem key={p.title}>
              <Card className="h-full">
                <h3 className="font-display text-xl font-semibold tracking-tight text-navy">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed">{p.body}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-16 border-t border-line/70 pt-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Engineering pedigree</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed">
            Our manufacturing and service engineering team draws on experience from Rivian, Intel, Tesla, and JCI —
            bringing automotive-grade rigor to commercial robotics.
          </p>
        </Reveal>
      </section>

      <CTAPanel
        title="Built here. Serviced here."
        body="Talk to us about onshore assembly, DFM, and design-for-service for your fleet."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
