import type { Metadata } from "next";
import {
  crsEntity, servicingHighlights, serviceProgram, serviceCallSteps,
  serviceCallNote, crsDifferentiators, coverageFacts, workforceCommitments,
  workforceNote, roiStatement, technicianCerts,
} from "@/data/servicing";
import { USCoverageMap } from "@/components/diagrams/USCoverageMap";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCheck } from "@/components/icons";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Photo } from "@/components/ui/Photo";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = {
  title: "Cardinal Robot Services",
  description:
    "Cardinal Robot Services, Inc. maintains, deploys, and teleoperates commercial robots in the field — national coverage, 24/7 remote support, and parts depots across the country.",
};

export default function ServicingPage() {
  return (
    <main>
      <PhotoHero
        image="engineer"
        imageAlt="Engineer working on robotics hardware in a lab"
        title="Cardinal Robot Services."
        lede="We maintain, deploy, and teleoperate robots in the field so you don't have to — national coverage, 24/7 remote support, and parts and robot depots across the country."
      />

      {/* Entity band. The page is a distinct company's page and should say so
          in the first thing below the fold, not in the footer fine print. */}
      <section className="surface-panel border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-display text-sm font-semibold text-navy">{crsEntity.legalName}</p>
          <p className="text-fine text-muted">{crsEntity.tagline}</p>
        </div>
      </section>

      {/* Hairline baselines, 2-up on phones — the same stat treatment as
          /platform and home (DESIGN.md §10, 2026-07-30). Four bordered,
          centred cards stacked to ~700px of scroll at 375px for four numbers.
          Value sits above its label here because this is the lead band. */}
      <section className="section-tight border-b border-line">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 px-6 lg:grid-cols-4">
          {servicingHighlights.map((h) => (
            <div key={h.label} className="flex flex-col border-t border-line pt-5">
              <dt className="text-fine mt-2 text-muted">{h.label}</dt>
              <dd className="tabular order-first text-4xl font-medium tracking-tight text-cardinal-700 sm:text-5xl">{h.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Who we are */}
      <section className="border-b border-line">
        <div className="section mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-title font-display font-semibold text-navy">
              The independent support layer.
            </h2>
            <p className="text-copy mt-5">
              {crsEntity.legalName} is a commercial robotics infrastructure company specializing in
              onsite technical support, fleet management, and field services for robotics operators
              across the United States — for the operators who run fleets and the manufacturers who
              build them.
            </p>
            <p className="text-copy mt-4">
              Your team focuses on the product and the sale; we keep the machines running. CRS
              technicians are embedded with our clients — stationed, dispatched, or on call —
              delivering repeatable, measurable outcomes and documented proof of performance at
              every site. Flat, transparent rates, with expenses passed through at cost.
            </p>
            <p className="text-fine mt-6 text-muted">
              Backed by Cardinal Robotics Corporation&apos;s operational expertise.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-line shadow-xl shadow-navy/[0.06]">
            <Photo
              name="parts"
              alt="Shelved spare parts and components in a Cardinal service depot"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* One program, four services */}
      <section className="surface-panel section border-b border-line">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              title="One program, four services."
              lede="Flat-rate programs and total-cost-of-ownership pricing, with expenses passed through at cost against the work order."
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
            {serviceProgram.map((s) => (
              <StaggerItem key={s.title}>
                <Card className="h-full">
                  <h3 className="text-subtitle font-display font-semibold text-navy">{s.title}</h3>
                  <p className="text-fine mt-3">{s.summary}</p>
                  <ul className="mt-5 space-y-3 border-t border-line/70 pt-5">
                    {s.points.map((pt) => (
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

      {/* National coverage */}
      <section className="section mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            title="National coverage."
            lede="CRS deploys field technicians across the continental United States, with active operations in key metro markets and fulfillment corridors."
            className="mx-auto text-center"
          />
          <div className="mt-12"><USCoverageMap /></div>
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {coverageFacts.map((f) => (
              <div key={f.label} className="border-t border-line pt-5">
                <dt className="text-label text-muted">{f.label}</dt>
                <dd className="tabular mt-3 text-4xl font-medium tracking-tight text-navy">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* How a service call runs — the page's one dark rung (DESIGN.md §3.1).
          This is the section that carries the argument: the process is the
          product, so it gets the tonal event rather than another white band. */}
      <section className="surface-dark">
        <div className="section mx-auto max-w-6xl px-6">
          <SectionHeading
            tone="dark"
            title="How a service call runs."
            lede="Every call follows the same four steps, whether it closes remotely or ends with a technician on site."
          />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-xl bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCallSteps.map((s) => (
              <StaggerItem key={s.step} className="bg-navy p-7">
                <p className="tabular text-sm font-semibold text-cardinal-100">{s.step}</p>
                <h3 className="text-subtitle mt-3 font-display font-semibold text-white">{s.title}</h3>
                <p className="text-fine mt-3 text-white/70">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="text-fine mt-10 max-w-3xl text-white/70">{serviceCallNote.text}</p>
        </div>
      </section>

      {/* What sets us apart */}
      <section className="section mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading title="What sets us apart." />
        </Reveal>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {crsDifferentiators.map((d) => (
            <StaggerItem key={d.title}>
              <Card className="h-full">
                <h3 className="text-subtitle font-display font-semibold text-navy">{d.title}</h3>
                <p className="text-fine mt-4">{d.body}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Workforce */}
      <section className="surface-panel section border-y border-line">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              title="Workforce excellence — upskilling America's veterans."
              lede="The best robotics technicians are built, not just hired. Our workforce development program retrains and upskills U.S. military veterans, channeling their discipline, technical aptitude, and mission-driven mindset into high-demand robotics careers."
            />
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <ul className="space-y-4">
              {workforceCommitments.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-cardinal-600" />
                  {c}
                </li>
              ))}
            </ul>
            <div className="space-y-6">
              <p className="text-fine">{workforceNote.text}</p>
              <div>
                <p className="text-label text-muted">Technician certifications</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {technicianCerts.map((c) => <Badge key={c}>{c}</Badge>)}
                </div>
              </div>
              <p className="text-xs text-muted">ISO 27001 information security, globally certified.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The ROI argument, as a single held statement rather than a card. */}
      {/* The page's one loose rhythm slot (DESIGN.md §4) — the closing
          argument earns the extra air. */}
      <section className="section-loose mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-label text-muted">The ROI of professional robotics support</p>
          <p className="text-title mt-6 font-display font-semibold text-navy">
            {roiStatement.text}
          </p>
          <p className="text-copy mx-auto mt-6 max-w-2xl">
            CRS exists to close that gap. Our programs are engineered to reduce dependence on
            inconsistent manual labor, deliver repeatable and measurable outcomes, and provide
            documented proof of performance for every robot in your fleet.
          </p>
        </Reveal>
      </section>

      <CTAPanel
        title="Keep every unit running."
        body="24/7 help desk, remote diagnostics, and certified technicians wherever you operate."
        cta={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "See the platform", href: "/platform" }}
      />
    </main>
  );
}
