import type { Metadata } from "next";
import { LifecycleDiagram } from "@/components/diagrams/LifecycleDiagram";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Platform" };

// All claims sourced from cardinalrobot.com home, servicing.php, finance.php.
const PHASES = [
  { title: "Source", body: "Robots are commoditized and application-task specific. We match models from a 24-robot fleet to the job — floor type, footprint, payload, and duty cycle — instead of forcing one machine to do everything." },
  { title: "Deploy", body: "Installation and integration are part of the deployment cycle, not an extra line item. Cardinal handles site mapping, network setup, and commissioning, optimized for ROI from day one." },
  { title: "Train", body: "Upskilling every janitor to robot operator. Your existing staff learn to run the fleet through end-user and customer training programs — the robots augment your workforce, they don't replace it." },
  { title: "Service", body: "Preventative maintenance and break-fix support nationwide through 3,000+ certified technicians, with SLAs matched to your operation, 24/7 Level 1 and 2 help desk, and remote diagnostics." },
  { title: "Report", body: "A centralized dashboard for every deployment: operational KPIs, scheduling, ROI reports, and full operational visibility across sites." },
  { title: "Finance", body: "No upfront costs for operators — rentals from $2.99/hr with unlimited servicing. For robotics companies, an $800M facility funds deployments from $500K to $50M, non-dilutive." },
];

export default function PlatformPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Platform"
              title="Six phases. One accountable partner."
              lede="Most robot deployments fail between purchase and adoption. Cardinal owns the entire lifecycle so yours doesn't."
            />
          </Reveal>
          <Reveal delay={0.15} className="mt-16"><LifecycleDiagram /></Reveal>
        </div>
      </section>

      {PHASES.map((phase, i) => (
        <section key={phase.title} className={i % 2 === 1 ? "border-y border-line bg-panel/40" : ""}>
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-24 md:grid-cols-[220px_1fr]">
            <Reveal>
              <Eyebrow>{phase.title}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-medium text-navy">{phase.title}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed">{phase.body}</p>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-4xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Visibility"
            title="Every robot, one view."
            lede="Operational KPIs, scheduling, ROI reports, and remote diagnostics — across every site and every model."
            className="mx-auto text-center"
          />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "24", l: "Robots active" },
            { n: "148k", l: "Sq ft covered" },
            { n: "99.2%", l: "Uptime" },
            { n: "0", l: "Open tickets" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-line bg-paper p-7 text-center">
              <p className="tabular text-4xl font-bold tracking-tight text-navy">{s.n}</p>
              <p className="mt-2 text-xs text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <CTAPanel
        title="See it on your floor plan."
        body="Walk us through your facility and we'll map the deployment."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
