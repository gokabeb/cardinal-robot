import Link from "next/link";
import { outcomes } from "@/data/stats";
import { categories } from "@/data/categories";
import { complianceBadges } from "@/data/security";
import { LifecycleDiagram } from "@/components/diagrams/LifecycleDiagram";
import { USCoverageMap } from "@/components/diagrams/USCoverageMap";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Marquee } from "@/components/motion/Marquee";
import { CountUp } from "@/components/motion/CountUp";
import { Photo } from "@/components/ui/Photo";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";
import { LogoWall } from "@/components/ui/LogoWall";

function BentoCell({ href, className, children }: {
  href: string; className?: string; children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between rounded-xl border border-line/70 bg-paper p-8 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-cardinal-500/40 hover:shadow-lg hover:shadow-navy/[0.04] ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <main>
      {/* 1 — Hero: full-bleed photo, text-anchored scrim.
          Fills the viewport minus the 4rem header so it commits to the fold
          instead of leaving a dead sliver of white below it. */}
      <section className="relative overflow-hidden">
        <div className="relative flex min-h-[640px] items-end sm:min-h-[calc(100svh-4rem)]">
          {/* The still is frame 0 of the clip above it, not a different
              photograph. That keeps three things in agreement: what a reduced-
              motion visitor sees, what the alt text says, and what the video
              fades into. A logistics-facility still under a hospital-corridor
              clip would have described one scene and shown another. */}
          <Photo
            name="hero-corridor"
            alt="An autonomous floor-scrubbing robot working an empty hospital corridor at night"
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <HeroVideo
            src="/video/hero-corridor"
            className="img-tone absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              /* Three layers, because the text block is anchored left and runs
                 tall. The radial alone was bottom-weighted: it protected the
                 CTA row but had fallen off by the eyebrow, leaving the top of
                 the block at 2.1:1 against the bright corridor wall — under the
                 4.5:1 DESIGN.md §8 requires, and worse still under the previous
                 hero photograph. The `to right` layer is the fix: it guards the
                 left column at every height rather than only near the floor.
                 Measured across the whole loop, not just one frame. */
              backgroundImage:
                "radial-gradient(900px 780px at 4% 100%, rgba(12,16,51,0.95) 0%, rgba(12,16,51,0.92) 40%, rgba(12,16,51,0.72) 66%, rgba(12,16,51,0) 92%), linear-gradient(to right, rgba(12,16,51,0.88) 0%, rgba(12,16,51,0.66) 32%, rgba(12,16,51,0.18) 56%, rgba(12,16,51,0) 74%), linear-gradient(to top, rgba(12,16,51,0.82) 0%, rgba(12,16,51,0.45) 32%, rgba(12,16,51,0.08) 60%, rgba(12,16,51,0) 100%)",
            }}
          />
          {/* CSS-only entrance: the LCP headline must not wait on hydration. */}
          <div className="relative w-full px-6 pb-16 pt-24 sm:px-10 sm:pb-20">
            <h1 className="text-display hero-rise hero-rise-1 max-w-2xl font-display font-semibold text-white">
              The robotic workforce, fully operational.
            </h1>
            <p className="text-lede hero-rise hero-rise-2 mt-6 max-w-lg text-white/90">
              Cardinal sources, deploys, trains, services, and finances commercial robots — so your team doesn&apos;t have to.
            </p>
            {/* Two doors in the fold, not one. The platform section sits eight
                sections down, so a visitor who bounced above the fold never
                learned it existed. Outline variant is overridden to white-on-
                dark per DESIGN.md §3.1 — the default navy-on-line border is
                invisible against the scrim. */}
            <div className="hero-rise hero-rise-3 mt-9 flex flex-wrap items-center gap-4">
              <Button href="/robots">Explore the fleet →</Button>
              <Button
                href="/platform"
                variant="outline"
                className="border-white/40 text-white hover:border-white hover:bg-white hover:text-navy"
              >
                Explore the platform →
              </Button>
              <Link href="/contact" className="ml-2 text-sm font-semibold text-white underline underline-offset-4">
                Talk to us
              </Link>
            </div>
          </div>
          {/* Shared grid so the two chips share an edge instead of sitting ragged. */}
          <div className="absolute bottom-6 right-6 hidden gap-2 sm:bottom-10 sm:right-10 sm:grid">
            {[
              { v: "35,000+", l: "robots deployed" },
              { v: "3,000+", l: "technicians nationwide" },
            ].map((s) => (
              <div key={s.l} className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 rounded-full bg-white/95 px-5 py-2.5">
                <span className="tabular text-sm font-semibold text-navy">{s.v}</span>
                <span className="text-xs text-body">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — Trusted by. Connective tissue, so it stays tight. */}
      <section className="section-tight mx-auto max-w-7xl px-6">
        <p className="text-label text-center text-muted">
          Trusted by the world&apos;s leading operators
        </p>
        <LogoWall className="mt-10" />
      </section>

      {/* 3 — Category ticker */}
      <section className="surface-panel border-y border-line/70 py-5">
        <Marquee pauseOnHover>
          {categories.map((c) => (
            <span key={c.slug} className="flex items-center">
              <span className="text-label px-6 text-muted">{c.name}</span>
              <img src="/brand/mark-navy.png" alt="" aria-hidden className="h-3.5 w-auto opacity-20" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* 4 — Bento: the numbers are the artwork. This is the section that
          carries the argument, so it gets the page's one loose rhythm slot
          and one of the three scroll-motion slots. */}
      <section className="section-loose mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Adoption, measured."
          lede="Cardinal operates the largest commercial robot deployment platform in the country."
        />
        <Stagger className="mt-14 grid gap-4 md:grid-cols-6">
          <StaggerItem className="md:col-span-4">
            <BentoCell href="/financing" className="h-full min-h-[240px] bg-cardinal-50">
              <p className="text-label text-muted">Dedicated financing facility</p>
              <div>
                <p className="tabular text-7xl font-medium tracking-tight text-cardinal-700 sm:text-8xl">
                  $<CountUp to={800} />M
                </p>
                <p className="text-fine mt-3 max-w-sm">
                  Non-dilutive deployment capital for robotics companies, from $500K to $50M.
                </p>
              </div>
            </BentoCell>
          </StaggerItem>
          <StaggerItem className="md:col-span-2">
            <BentoCell href="/robots" className="h-full min-h-[240px]">
              <p className="text-label text-muted">Robots deployed</p>
              <p className="tabular text-6xl font-medium tracking-tight text-navy">
                <CountUp to={35000} suffix="+" />
              </p>
            </BentoCell>
          </StaggerItem>
          <StaggerItem className="md:col-span-3">
            <BentoCell href="/servicing" className="h-full">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-label text-muted">Certified technicians</p>
                <p className="tabular text-3xl font-medium tracking-tight text-navy">
                  <CountUp to={3000} suffix="+" />
                </p>
              </div>
              <div className="mt-6 opacity-90">
                <USCoverageMap />
              </div>
              <p className="mt-4 text-sm">Nationwide service coverage, on call for every deployment.</p>
            </BentoCell>
          </StaggerItem>
          <StaggerItem className="md:col-span-3">
            <div className="grid h-full gap-4">
              <BentoCell href="/robots/disinfection">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-label text-muted">Hospitals using Cardinal UV-C</p>
                  <p className="tabular text-3xl font-medium tracking-tight text-navy">
                    <CountUp to={500} suffix="+" />
                  </p>
                </div>
              </BentoCell>
              <BentoCell href="/robots">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-label text-muted">Rentals from</p>
                  <p className="tabular text-3xl font-medium tracking-tight text-navy">$2.99/hr</p>
                </div>
                <p className="mt-3 text-sm">No upfront costs. Unlimited servicing included.</p>
              </BentoCell>
            </div>
          </StaggerItem>
          <StaggerItem className="md:col-span-6">
            <BentoCell href="/robots" className="flex-row items-center justify-between gap-6">
              <div className="flex items-baseline gap-4">
                <p className="tabular text-3xl font-medium tracking-tight text-navy">24</p>
                <p className="text-sm">robots across</p>
                <p className="tabular text-3xl font-medium tracking-tight text-navy">8</p>
                <p className="text-sm">categories</p>
              </div>
              <p className="hidden text-xs uppercase tracking-[0.2em] text-cardinal-600 transition-transform duration-150 group-hover:translate-x-1 sm:block">
                View the fleet →
              </p>
            </BentoCell>
          </StaggerItem>
        </Stagger>
      </section>

      {/* 5 — Two doors */}
      <section className="surface-panel border-t border-line/70">
        <div className="section mx-auto max-w-7xl px-6">
          <SectionHeading title="One platform. Two ways to use it." />
          <Stagger className="mt-14 grid gap-4 md:grid-cols-2">
            <StaggerItem>
              <Link href="/robots" className="group block h-full">
                <Card className="flex h-full flex-col overflow-hidden p-0">
                  <div className="h-60 overflow-hidden">
                    <Photo
                      name="warehouse"
                      alt="Tall warehouse aisle with stocked racking"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-8">
                    <div>
                      <p className="text-label text-muted">For operators</p>
                      <h3 className="text-subtitle mt-3 font-display font-semibold text-navy">
                        Deploy robots in your facility
                      </h3>
                      <p className="text-fine mt-3">
                        Rent application-specific robots from $2.99/hr with no upfront costs and unlimited servicing included.
                      </p>
                    </div>
                    <p className="mt-6 text-sm text-cardinal-600 transition-transform duration-150 group-hover:translate-x-1">
                      Explore the fleet →
                    </p>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/financing" className="group block h-full">
                <Card className="flex h-full flex-col overflow-hidden p-0">
                  <div className="h-60 overflow-hidden">
                    <Photo
                      name="engineer"
                      alt="Engineer working on robotics hardware in a lab"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-8">
                    <div>
                      <p className="text-label text-muted">For robotics companies</p>
                      <h3 className="text-subtitle mt-3 font-display font-semibold text-navy">
                        Scale your robotics company
                      </h3>
                      <p className="text-fine mt-3">
                        Non-dilutive deployment capital from $500K to $50M, backed by 3,000+ technicians nationwide.
                      </p>
                    </div>
                    <p className="mt-6 text-sm text-cardinal-600 transition-transform duration-150 group-hover:translate-x-1">
                      See financing →
                    </p>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* 6 — Why Cardinal: white, split, snappy */}
      <section className="border-y border-line/70">
        <div className="section mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-title font-display font-semibold text-navy">
              Robots don&apos;t fail at the demo. They fail at deployment.
            </h2>
            <p className="text-copy mt-5 max-w-xl">
              That&apos;s the part we own: installation, integration, training, and 3,000+ certified technicians on call nationwide.
            </p>
            <div className="mt-8">
              <Button href="/servicing" variant="outline">How servicing works</Button>
            </div>
          </div>
          {/* Was a second copy of warehouse.jpg carrying alt text describing a
              robot that is not in that frame. Parts depot is both accurate and
              on-topic for a section about servicing. */}
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

      {/* 7 — Lifecycle. The page's dark rung (DESIGN.md §3.1): one full-bleed
          navy section at the midpoint, so the scroll has an event instead of
          fading through ten white bands on its way to the CTA. The diagram is
          artwork here rather than a footnote — white line on navy carries far
          more than navy line on white did.

          Also the third and last scroll-motion slot: the line draws itself,
          which is motion that shows something rather than motion that just
          delays something. */}
      <section className="surface-dark">
        <div className="section mx-auto max-w-7xl px-6">
          <SectionHeading
            tone="dark"
            title="The full deployment cycle, handled."
            lede="From sourcing to financing, Cardinal covers installation, integration, service, and support — optimized for ROI."
          />
          <Reveal delay={0.1} className="mt-16">
            <LifecycleDiagram tone="dark" />
          </Reveal>
        </div>
      </section>

      {/* 8 — Platform: real numbers, no fake screenshot.

          These were four identical bordered boxes, centre-aligned, sitting
          under a left-aligned heading — the page's clearest template tell. They
          read as hairline baselines now: rule, label, figure. Deliberately not
          a second bank of giant numerals, because $800M in §4 is the page's one
          big number and a rival would flatten it. */}
      <section className="surface-panel section">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="The whole fleet, one view."
            lede="Every deployment reports into a single system — KPIs, scheduling, ROI, and operational visibility."
          />
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {[
              { n: "24", l: "Robots active" },
              { n: "148k", l: "Sq ft covered" },
              { n: "99.2%", l: "Uptime" },
              { n: "0", l: "Open tickets" },
            ].map((s) => (
              <div key={s.l} className="border-t border-line pt-5">
                <dt className="text-label text-muted">{s.l}</dt>
                <dd className="tabular mt-3 text-4xl font-medium tracking-tight text-navy">{s.n}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12">
            <Button href="/platform" variant="outline" className="bg-paper">See the platform</Button>
          </div>
        </div>
      </section>

      {/* 9 — Fleet strip: auto-looping, pauses on hover */}
      <section className="section">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="24 robots. 8 categories. One partner."
            lede="Application-task-specific robots, matched to the job and covered end to end."
          />
        </div>
        <div className="mt-14">
          <Marquee pauseOnHover duration={64} className="pb-4">
            {categories.map((c, i) => (
              <Link key={c.slug} href={`/robots/${c.slug}`} className="group mx-2 block w-72">
                <Card className="h-56">
                  <p className="tabular text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="text-subtitle mt-3 font-display font-semibold text-navy">{c.name}</h3>
                  <p className="text-fine mt-3 line-clamp-3">{c.blurb}</p>
                  <p className="mt-4 text-xs text-cardinal-600 transition-transform duration-150 group-hover:translate-x-1">
                    View robots →
                  </p>
                </Card>
              </Link>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 10 — Outcomes. On panel so the tail doesn't run three white sections
          straight into the CTA. The cards are bg-paper, so on this ground they
          actually lift; on white they were white-on-white with a hairline. */}
      <section className="surface-panel border-y border-line/70">
        <div className="section mx-auto max-w-7xl px-6">
          <SectionHeading title="Measured on the floor, not in the pitch." />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {outcomes.map((o) => (
              <Card key={o.stat} className="h-full">
                <p className="text-subtitle font-medium text-cardinal-700">{o.stat}</p>
                <p className="text-fine mt-4">{o.context}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Trust band */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="flex flex-col items-center gap-5 border-t border-line/70 pt-12 text-center">
          <p className="text-label text-muted">
            DoD-compliant data security
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {complianceBadges.map((b) => <Badge key={b}>{b}</Badge>)}
          </div>
        </div>
      </section>

      {/* 12 — Final CTA */}
      <CTAPanel
        title="Put robots to work."
        body="Tell us about your facility, your fleet, or your robotics company."
        cta={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "Explore the fleet", href: "/robots" }}
      />
    </main>
  );
}
