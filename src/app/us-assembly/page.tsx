import type { Metadata } from "next";
import { assemblyPillars, assemblyNote } from "@/data/assembly";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "US Assembly" };

export default function UsAssemblyPage() {
  return (
    <main>
      <PhotoHero
        image="/images/assembly.jpg"
        imageAlt="Blue robotic arm positioned at an automated manufacturing station on a bright factory production line"
        eyebrow="US Assembly"
        title="Assembled in the USA."
        lede="Onshore assembly and U.S. manufacturing, with secure systems and supply-chain assurance behind every robot we deploy."
      />

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
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Engineering pedigree</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed">
            {assemblyNote.text}
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
