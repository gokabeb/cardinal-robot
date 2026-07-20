import type { Metadata } from "next";
import { servicePillars, technicianCerts, servicingHighlights } from "@/data/servicing";
import { USCoverageMap } from "@/components/diagrams/USCoverageMap";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Servicing" };

export default function ServicingPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Servicing"
              title="Enhance your robot workforce uptime."
              lede="Break-fix and preventative maintenance across the US — a 24/7 support line and 3,000+ service delivery professionals through Cardinal and partner networks."
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
            {servicingHighlights.map((h) => (
              <StaggerItem key={h.label}>
                <Card className="h-full text-center">
                  <p className="font-mono tabular text-5xl font-medium tracking-tight text-cardinal-700">{h.value}</p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">{h.label}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Nationwide coverage
          </p>
          <div className="mt-10"><USCoverageMap /></div>
          <p className="mt-6 text-center font-mono text-xs text-muted">
            3,000+ certified technicians. Onsite and periodic maintenance.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-line bg-panel/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading eyebrow="What's covered" title="Three layers of support." />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {servicePillars.map((p) => (
              <StaggerItem key={p.title}>
                <Card className="h-full">
                  <h3 className="font-display text-xl font-medium text-navy">{p.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm leading-relaxed">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cardinal-500" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Technician certifications</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {technicianCerts.map((c) => <Badge key={c}>{c}</Badge>)}
          </div>
          <p className="mt-8 font-mono text-xs text-muted">ISO 27001 information security, globally certified.</p>
          <p className="mt-4 text-sm leading-relaxed">
            Cardinal upskills U.S. veterans into certified robot technicians — service careers, not gig work.
          </p>
        </Reveal>
      </section>

      <CTAPanel
        title="Keep every unit running."
        body="24/7 help desk, remote diagnostics, and technicians where you operate."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
