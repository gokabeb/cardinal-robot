import type { Metadata } from "next";
import { researchStats, researchHero, researchCapabilities, researchClosing } from "@/data/research";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Research & Development" };

export default function ResearchPage() {
  return (
    <main>
      <PhotoHero
        image="research"
        imageAlt="White robotic arm reaching toward a wall of storage cubbies in a robotics lab"
        title={researchHero.title}
        lede={researchHero.lede}
      />

      <section className="mx-auto max-w-6xl px-6 section">
        <Stagger className="grid gap-4 md:grid-cols-3">
          {researchStats.map((s) => (
            <StaggerItem key={s.label}>
              <Card className="h-full text-center">
                <p className="tabular text-5xl font-medium tracking-tight text-cardinal-700">{s.value}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">{s.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* The three capability areas the spec breaks R&D into. On panel so the
          page alternates rather than running one continuous white field. */}
      <section className="surface-panel section border-y border-line">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title="What the team builds." />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {researchCapabilities.map((c) => (
              <div key={c.title} className="border-t border-line pt-5">
                <h3 className="text-subtitle font-display font-semibold text-navy">{c.title}</h3>
                <p className="text-fine mt-3">{c.body}</p>
              </div>
            ))}
          </div>
          <Reveal className="mt-16 border-t border-line pt-10">
            <p className="text-label text-muted">In-house, end to end</p>
            <p className="text-copy mt-4 max-w-2xl">{researchClosing.text}</p>
          </Reveal>
        </div>
      </section>

      <CTAPanel
        title="Build with our R&D team."
        body="In-house design, engineering, and integrations for partners and OEMs."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
