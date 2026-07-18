import type { Metadata } from "next";
import { securityFeatures, complianceBadges } from "@/data/security";
import { SecurityFlowDiagram } from "@/components/diagrams/SecurityFlowDiagram";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Security" };

export default function SecurityPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Security"
              title="Connected robots, locked down."
              lede="The Cardinal SDK encrypts device status, charge levels, and usage data — with dashboarding, remote diagnostics with permission, firmware updates, asset immobilization, and device logging."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-muted">Data path</p>
          <div className="mt-10"><SecurityFlowDiagram /></div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-panel/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading eyebrow="Controls" title="Defense at every layer." />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((f) => (
              <StaggerItem key={f.title}>
                <Card className="h-full">
                  <h3 className="font-display text-lg font-medium text-navy">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{f.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Compliance</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {complianceBadges.map((b) => (
              <div key={b} className="rounded-lg border border-line bg-panel py-8">
                <p className="font-display text-xl font-medium text-navy">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-xs text-muted">DoD-compliant data security.</p>
        </Reveal>
      </section>

      <CTAPanel
        title="Security review, on request."
        body="On-premises options, customizable retention, and multi-tenant isolation."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
