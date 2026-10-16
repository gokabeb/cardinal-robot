import type { Metadata } from "next";
import { securityFeatures, complianceBadges, dataResidency } from "@/data/security";
import { redTeam, redTeamSurfaces, evidenceGrades, redTeamGuarantees, redTeamModes } from "@/data/cyber";
import { SecurityFlowDiagram } from "@/components/diagrams/SecurityFlowDiagram";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconCheck } from "@/components/icons";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Security built into every deployment: encrypted connections, U.S.-only hosting, and offensive testing of the fleet before it goes live.",
};

export default function SecurityPage() {
  return (
    <main>
      {/* Spec §Security. Previous hero led with the SDK's feature list, which
          is an implementation detail; the promise comes first now and the
          mechanism follows further down the page. */}
      <section className="surface-dark section">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              tone="dark"
              title="Security built into every deployment."
              lede="Every robot, every connection, and every byte of data is protected from day one, not as an afterthought."
            />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-cardinal-50 py-16">
        <div className="section mx-auto max-w-6xl px-6 text-center">
          <p className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">{dataResidency.headline}</p>
          <p className="mx-auto mt-4 max-w-2xl text-fine">{dataResidency.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 section">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted">Data path</p>
          <div className="mt-10"><SecurityFlowDiagram /></div>
        </Reveal>
      </section>

      <section className="surface-panel section border-y border-line">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title="Defense at every layer." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((f) => (
              <Card key={f.title} className="h-full">
                <h3 className="font-display text-lg font-semibold text-navy">{f.title}</h3>
                <p className="text-fine mt-3 leading-relaxed">{f.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offensive security. Defensive controls say what we built; this says
          we try to break it before anyone else does, which is the harder and
          more credible claim. Scope language is held to what the source
          capability documents actually support — see the header comment in
          data/cyber.ts for what was deliberately left out. */}
      <section className="section mx-auto max-w-6xl px-6">
        <SectionHeading title={redTeam.title} lede={redTeam.lede} />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {redTeamSurfaces.map((s) => (
            <StaggerItem key={s.title}>
              <Card className="h-full">
                <h3 className="font-display text-lg font-semibold text-navy">{s.title}</h3>
                <p className="text-fine mt-3 leading-relaxed">{s.body}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="surface-panel section border-y border-line">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            title="Proof, not a list of maybes."
            lede="A scanner reports a weakness. A red team proves whether it can actually be exploited — and every finding carries the grade of evidence behind it."
          />

          <dl className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {evidenceGrades.map((g) => (
              <div key={g.grade} className="border-t border-line pt-5">
                <dt className="text-subtitle font-display font-semibold text-navy">{g.grade}</dt>
                <dd className="text-fine mt-3">{g.body}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-20 grid gap-4 md:grid-cols-2">
            {redTeamModes.map((m) => (
              <Card key={m.name} className="flex h-full flex-col justify-between gap-8">
                <div>
                  <h3 className="text-subtitle font-display font-semibold text-navy">{m.name}</h3>
                  <p className="text-fine mt-2 text-muted">{m.summary}</p>
                  <ul className="mt-6 space-y-3">
                    {m.points.map((pt) => (
                      <li key={pt} className="text-fine flex gap-3 leading-relaxed">
                        <IconCheck className="mt-1 h-4 w-4 shrink-0 text-cardinal-600" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-label border-t border-line pt-4 text-muted">Best for: {m.bestFor}</p>
              </Card>
            ))}
          </div>

          <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {redTeamGuarantees.map((g) => (
              <div key={g.title} className="border-t border-line pt-5">
                <p className="text-label text-muted">{g.title}</p>
                <p className="text-fine mt-3">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Compliance</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {complianceBadges.map((b) => (
            <div key={b} className="rounded-lg border border-line bg-panel py-8">
              <p className="font-display text-xl font-medium text-navy">{b}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted">DoD-compliant data security.</p>
      </section>

      <CTAPanel
        title="Deploy robotics with confidence."
        body="From one robot to an entire fleet, Cardinal keeps every connection protected and secure."
        cta={{ label: "Talk to us", href: "/contact" }}
      />
    </main>
  );
}
