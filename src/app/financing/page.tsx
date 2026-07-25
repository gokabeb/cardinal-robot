import type { Metadata } from "next";
import { financeTerms, financeEligibility, financeProcess, financeEmail, financingHighlights } from "@/data/financing";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Financing" };

export default function FinancingPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Cardinal Finance"
              title="$800M. Non-dilutive. Built by roboticists."
              lede="Deployment capital specifically designed for RaaS and HaaS business models — for US-based, growth-stage robotics and IoT companies."
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
            {financingHighlights.map((h) => (
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

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading eyebrow="Terms" title="The spec sheet." />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <dl className="divide-y divide-line border-y border-line">
            {financeTerms.map((t) => (
              <div key={t.label} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[280px_1fr] sm:gap-6">
                <dt className="text-sm text-muted">{t.label}</dt>
                <dd className="text-sm text-navy">{t.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="border-y border-line bg-panel/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading eyebrow="Process" title="Three steps to capital." />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {financeProcess.map((p) => (
              <StaggerItem key={p.step}>
                <Card className="h-full">
                  <p className="text-xs text-cardinal-600">{p.step}</p>
                  <h3 className="mt-3 font-display text-xl font-medium text-navy">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{p.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading eyebrow="Eligibility" title="Who this is for." />
          <ul className="mt-8 max-w-xl space-y-4">
            {financeEligibility.map((e) => (
              <li key={e} className="flex gap-4 text-lg">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cardinal-500" />
                {e}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted">
            Direct line: <a href={`mailto:${financeEmail}`} className="text-cardinal-600 hover:text-cardinal-700">{financeEmail}</a>
          </p>
        </Reveal>
      </section>

      <CTAPanel
        title="Request funding."
        body="Decisions within 2 business days."
        cta={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: `Email ${financeEmail}`, href: `mailto:${financeEmail}` }}
      />
    </main>
  );
}
