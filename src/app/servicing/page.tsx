import type { Metadata } from "next";
import { servicePillars, technicianCerts, servicingHighlights } from "@/data/servicing";
import { USCoverageMap } from "@/components/diagrams/USCoverageMap";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCheck } from "@/components/icons";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Servicing" };

export default function ServicingPage() {
  return (
    <main>
      <PhotoHero
        image="engineer"
        imageAlt="Engineer working on robotics hardware in a lab"
        title="Enhance your robot workforce uptime."
        lede="Break-fix and preventative maintenance across the US — a 24/7 support line and 3,000+ service delivery professionals through Cardinal and partner networks."
      />

      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Stagger className="grid gap-4 md:grid-cols-3">
            {servicingHighlights.map((h) => (
              <StaggerItem key={h.label}>
                <Card className="h-full text-center">
                  <p className="tabular text-5xl font-medium tracking-tight text-cardinal-700">{h.value}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">{h.label}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 section">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted">
            Nationwide coverage
          </p>
          <div className="mt-10"><USCoverageMap /></div>
          <p className="mt-6 text-center text-xs text-muted">
            3,000+ certified technicians. Onsite and periodic maintenance.
          </p>
        </Reveal>
      </section>

      <section className="surface-panel section border-y border-line">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading title="Three layers of support." />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {servicePillars.map((p) => (
              <StaggerItem key={p.title}>
                <Card className="h-full">
                  <h3 className="font-display text-xl font-semibold text-navy">{p.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm leading-relaxed">
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-cardinal-600" />
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

      <section className="section mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Technician certifications</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {technicianCerts.map((c) => <Badge key={c}>{c}</Badge>)}
          </div>
          <p className="mt-8 text-xs text-muted">ISO 27001 information security, globally certified.</p>
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
