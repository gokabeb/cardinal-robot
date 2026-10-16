import type { Metadata } from "next";
import { assemblyPillars, assemblyNote, assemblyIntro, assemblyDetail } from "@/data/assembly";
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
        image="assembly"
        imageAlt="Blue robotic arm positioned at an automated manufacturing station on a bright factory production line"
        title={assemblyIntro.title}
        lede={assemblyIntro.lede}
      />

      <section className="mx-auto max-w-6xl px-6 section">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-title font-display font-semibold text-navy">{assemblyDetail.headline}</h2>
          <p className="text-copy mt-5">{assemblyDetail.body}</p>
        </div>
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
        <Reveal className="mt-16 border-t border-line pt-10">
          <p className="text-label text-muted">Engineering pedigree</p>
          <p className="text-copy mt-4 max-w-2xl">{assemblyNote.text}</p>
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
