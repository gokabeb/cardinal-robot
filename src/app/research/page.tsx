import type { Metadata } from "next";
import { researchStats, researchNote, researchClosing } from "@/data/research";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Research & Development" };

export default function ResearchPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Research & Development"
              title="Research that ships."
              lede={researchNote.text}
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Stagger className="grid gap-4 md:grid-cols-3">
          {researchStats.map((s) => (
            <StaggerItem key={s.label}>
              <Card className="h-full text-center">
                <p className="font-mono tabular text-5xl font-medium tracking-tight text-cardinal-700">{s.value}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">{s.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-16 border-t border-line/70 pt-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">In-house, end to end</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed">
            {researchClosing.text}
          </p>
        </Reveal>
      </section>

      <CTAPanel
        title="Build with our R&D team."
        body="In-house design, engineering, and integrations for partners and OEMs."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
