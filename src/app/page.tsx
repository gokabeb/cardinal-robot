import Link from "next/link";
import { heroStats, outcomes } from "@/data/stats";
import { categories } from "@/data/categories";
import { complianceBadges } from "@/data/security";
import { FleetGridCanvas } from "@/components/diagrams/FleetGridCanvas";
import { LifecycleDiagram } from "@/components/diagrams/LifecycleDiagram";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { StatCounter } from "@/components/ui/StatCounter";
import { CTAPanel } from "@/components/ui/CTAPanel";

export default function Home() {
  return (
    <main>
      {/* 1 — Hero */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
        <FleetGridCanvas />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
          <Reveal>
            <Eyebrow>Robotic adoption made easy</Eyebrow>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink-50 sm:text-7xl lg:text-8xl">
              The robotic workforce, fully operational.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">
              Cardinal sources, deploys, trains, services, and finances commercial robots — so your team doesn&apos;t have to.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/robots">Explore the fleet</Button>
              <Button href="/contact" variant="outline">Talk to us</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — Stat band */}
      <section className="border-y border-ink-800 bg-ink-900/40">
        <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-16 lg:grid-cols-4">
          {heroStats.map((s) => (
            <StaggerItem key={s.label}><StatCounter stat={s} /></StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 3 — Two doors */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading index="01" eyebrow="Two ways in" title="One platform. Two ways to use it." />
        </Reveal>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
          <StaggerItem>
            <Link href="/robots" className="group block h-full">
              <Card className="flex h-full flex-col justify-between p-10">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-400">For operators</p>
                  <h3 className="mt-4 font-display text-3xl font-medium text-ink-50">Deploy robots in your facility</h3>
                  <p className="mt-4 leading-relaxed">
                    Rent application-specific robots from $2.99/hr with no upfront costs and unlimited servicing included.
                  </p>
                </div>
                <p className="mt-8 font-mono text-sm text-cardinal-500 transition-transform duration-150 group-hover:translate-x-1">
                  Explore the fleet →
                </p>
              </Card>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link href="/financing" className="group block h-full">
              <Card className="flex h-full flex-col justify-between p-10">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-400">For robotics companies</p>
                  <h3 className="mt-4 font-display text-3xl font-medium text-ink-50">Scale your robotics company</h3>
                  <p className="mt-4 leading-relaxed">
                    Non-dilutive deployment capital from $500K to $50M, backed by 3,000+ technicians nationwide.
                  </p>
                </div>
                <p className="mt-8 font-mono text-sm text-cardinal-500 transition-transform duration-150 group-hover:translate-x-1">
                  See financing →
                </p>
              </Card>
            </Link>
          </StaggerItem>
        </Stagger>
      </section>

      {/* 4 — Fleet showcase */}
      <section className="border-y border-ink-800 bg-ink-900/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              index="02" eyebrow="The fleet"
              title="24 robots. 8 categories. One partner."
              lede="Application-task-specific robots, matched to the job and covered end to end."
            />
          </Reveal>
        </div>
        <div className="mt-12 overflow-x-auto pb-4">
          <div className="mx-auto flex w-max gap-4 px-6">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <Link href={`/robots/${c.slug}`} className="group block w-72">
                  <Card className="h-56">
                    <p className="font-mono text-xs text-ink-400">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 font-display text-xl font-medium text-ink-50">{c.name}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed">{c.blurb}</p>
                    <p className="mt-4 font-mono text-xs text-cardinal-500 transition-transform duration-150 group-hover:translate-x-1">
                      View robots →
                    </p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Lifecycle teaser */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading
            index="03" eyebrow="How it works"
            title="The full deployment cycle, handled."
            lede="From sourcing to financing, Cardinal covers installation, integration, service, and support — optimized for ROI."
          />
        </Reveal>
        <Reveal delay={0.15} className="mt-16">
          <LifecycleDiagram />
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <Button href="/platform" variant="outline">See the platform</Button>
        </Reveal>
      </section>

      {/* 6 — Outcomes */}
      <section className="border-y border-ink-800 bg-ink-900/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading index="04" eyebrow="Outcomes" title="Measured on the floor, not in the pitch." />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {outcomes.map((o) => (
              <StaggerItem key={o.stat}>
                <Card className="h-full">
                  <p className="font-display text-2xl font-medium text-cardinal-500">{o.stat}</p>
                  <p className="mt-4 text-sm leading-relaxed">{o.context}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 7 — Trust band */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-400">
            DoD-compliant data security
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {complianceBadges.map((b) => <Badge key={b}>{b}</Badge>)}
          </div>
        </Reveal>
      </section>

      {/* 8 — Final CTA */}
      <CTAPanel
        title="Put robots to work."
        body="Tell us about your facility, your fleet, or your robotics company."
        cta={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "Explore the fleet", href: "/robots" }}
      />
    </main>
  );
}
