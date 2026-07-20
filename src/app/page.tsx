import Link from "next/link";
import { outcomes } from "@/data/stats";
import { categories } from "@/data/categories";
import { complianceBadges } from "@/data/security";
import { LifecycleDiagram } from "@/components/diagrams/LifecycleDiagram";
import { USCoverageMap } from "@/components/diagrams/USCoverageMap";
import { DashboardMock } from "@/components/diagrams/DashboardMock";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Parallax } from "@/components/motion/Parallax";
import { Marquee } from "@/components/motion/Marquee";
import { WordReveal } from "@/components/motion/WordReveal";
import { CountUp } from "@/components/motion/CountUp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTAPanel } from "@/components/ui/CTAPanel";
import { LogoWall } from "@/components/ui/LogoWall";

const IMG = {
  hero: "/images/hero.jpg",
  warehouse: "/images/warehouse.jpg",
  engineer: "/images/engineer.jpg",
};

function BentoCell({ href, className, children }: {
  href: string; className?: string; children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between rounded-2xl border border-line/70 bg-paper p-8 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-cardinal-500/40 hover:shadow-lg hover:shadow-navy/[0.04] ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <main>
      {/* 1 — Hero: one sentence, then the picture does the talking */}
      <section className="relative overflow-hidden">
        <div className="blueprint-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 sm:pt-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <WordReveal
              text="The robotic workforce, fully operational."
              className="font-display text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-navy sm:text-6xl lg:text-7xl"
            />
            <Reveal delay={0.45} className="flex flex-col items-center">
              <p className="mt-6 max-w-xl text-lg leading-relaxed">
                Cardinal sources, deploys, trains, services, and finances commercial robots — so your team doesn&apos;t have to.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button href="/robots">Explore the fleet</Button>
                <Button href="/contact" variant="outline">Talk to us</Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative mt-16 sm:mt-20">
            <div className="relative overflow-hidden rounded-2xl border border-line shadow-2xl shadow-navy/10">
              <Parallax className="h-[420px] sm:h-[560px]" range={8}>
                <img
                  src={IMG.hero}
                  alt="Autonomous mobile robots moving parts racks in a logistics facility"
                  className="img-tone h-[112%] w-full object-cover"
                />
              </Parallax>
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 sm:p-6">
                <div className="flex items-baseline gap-2.5 rounded-full border border-line bg-paper px-5 py-2.5 shadow-sm">
                  <span className="font-mono tabular text-sm font-medium text-navy">35,000+</span>
                  <span className="text-xs text-body">robots deployed</span>
                </div>
                <div className="hidden items-baseline gap-2.5 rounded-full border border-line bg-paper px-5 py-2.5 shadow-sm sm:flex">
                  <span className="font-mono tabular text-sm font-medium text-navy">3,000+</span>
                  <span className="text-xs text-body">technicians nationwide</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — Trusted by */}
      <section className="mx-auto mt-20 max-w-7xl px-6 sm:mt-28">
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Trusted by the world&apos;s leading operators
          </p>
          <LogoWall className="mt-10" />
        </Reveal>
      </section>

      {/* 3 — Category ticker */}
      <section className="mt-16 border-y border-line/70 bg-panel/50 py-5 sm:mt-20">
        <Marquee pauseOnHover>
          {categories.map((c) => (
            <span key={c.slug} className="flex items-center">
              <span className="px-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">{c.name}</span>
              <img src="/brand/mark-navy.png" alt="" aria-hidden className="h-3.5 w-auto opacity-20" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* 4 — Bento: the numbers are the artwork */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <Reveal>
          <SectionHeading
            index="01" eyebrow="At scale"
            title="Adoption, measured."
            lede="Cardinal operates the largest commercial robot deployment platform in the country."
          />
        </Reveal>
        <Stagger className="mt-14 grid gap-4 md:grid-cols-6">
          <StaggerItem className="md:col-span-4">
            <BentoCell href="/financing" className="blueprint-grid h-full min-h-[240px] bg-cardinal-50">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Dedicated financing facility</p>
              <div>
                <p className="font-mono tabular text-7xl font-medium tracking-tight text-cardinal-700 sm:text-8xl">
                  $<CountUp to={800} />M
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed">
                  Non-dilutive deployment capital for robotics companies, from $500K to $50M.
                </p>
              </div>
            </BentoCell>
          </StaggerItem>
          <StaggerItem className="md:col-span-2">
            <BentoCell href="/robots" className="h-full min-h-[240px]">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Robots deployed</p>
              <p className="font-mono tabular text-6xl font-medium tracking-tight text-navy">
                <CountUp to={35000} suffix="+" />
              </p>
            </BentoCell>
          </StaggerItem>
          <StaggerItem className="md:col-span-3">
            <BentoCell href="/servicing" className="h-full">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Certified technicians</p>
                <p className="font-mono tabular text-3xl font-medium tracking-tight text-navy">
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
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Hospitals using Cardinal UV-C</p>
                  <p className="font-mono tabular text-3xl font-medium tracking-tight text-navy">
                    <CountUp to={500} suffix="+" />
                  </p>
                </div>
              </BentoCell>
              <BentoCell href="/robots">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Rentals from</p>
                  <p className="font-mono tabular text-3xl font-medium tracking-tight text-navy">$2.99/hr</p>
                </div>
                <p className="mt-3 text-sm">No upfront costs. Unlimited servicing included.</p>
              </BentoCell>
            </div>
          </StaggerItem>
          <StaggerItem className="md:col-span-6">
            <BentoCell href="/robots" className="flex-row items-center justify-between gap-6">
              <div className="flex items-baseline gap-4">
                <p className="font-mono tabular text-3xl font-medium tracking-tight text-navy">24</p>
                <p className="text-sm">robots across</p>
                <p className="font-mono tabular text-3xl font-medium tracking-tight text-navy">8</p>
                <p className="text-sm">categories</p>
              </div>
              <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-cardinal-600 transition-transform duration-150 group-hover:translate-x-1 sm:block">
                View the fleet →
              </p>
            </BentoCell>
          </StaggerItem>
        </Stagger>
      </section>

      {/* 5 — Two doors */}
      <section className="border-t border-line/70 bg-panel/40">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <Reveal>
            <SectionHeading index="02" eyebrow="Two ways in" title="One platform. Two ways to use it." />
          </Reveal>
          <Stagger className="mt-14 grid gap-4 md:grid-cols-2">
            <StaggerItem>
              <Link href="/robots" className="group block h-full">
                <Card className="flex h-full flex-col overflow-hidden p-0">
                  <div className="h-60 overflow-hidden">
                    <img
                      src={IMG.warehouse}
                      alt="Tall warehouse aisle with stocked racking"
                      loading="lazy"
                      className="img-tone h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-8">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">For operators</p>
                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-navy">
                        Deploy robots in your facility
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed">
                        Rent application-specific robots from $2.99/hr with no upfront costs and unlimited servicing included.
                      </p>
                    </div>
                    <p className="mt-6 font-mono text-sm text-cardinal-600 transition-transform duration-150 group-hover:translate-x-1">
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
                    <img
                      src={IMG.engineer}
                      alt="Engineer working on robotics hardware in a lab"
                      loading="lazy"
                      className="img-tone h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-8">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">For robotics companies</p>
                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-navy">
                        Scale your robotics company
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed">
                        Non-dilutive deployment capital from $500K to $50M, backed by 3,000+ technicians nationwide.
                      </p>
                    </div>
                    <p className="mt-6 font-mono text-sm text-cardinal-600 transition-transform duration-150 group-hover:translate-x-1">
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
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 sm:py-32 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Why Cardinal</Eyebrow>
            <p className="mt-6 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-navy sm:text-5xl">
              Robots don&apos;t fail at the demo. They fail at deployment.
            </p>
            <p className="mt-5 max-w-xl leading-relaxed">
              That&apos;s the part we own: installation, integration, training, and 3,000+ certified technicians on call nationwide.
            </p>
            <div className="mt-8">
              <Button href="/servicing" variant="outline">How servicing works</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-line shadow-xl shadow-navy/[0.06]">
              <img
                src={IMG.warehouse}
                alt="Commercial robot operating on a facility floor"
                loading="lazy"
                className="img-tone aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7 — Lifecycle */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
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
      </section>

      {/* 8 — Fleet console in a device frame */}
      <section className="blueprint-grid border-t border-line/70 bg-panel/40 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              index="04" eyebrow="Platform"
              title="The whole fleet, one console."
              lede="Every deployment reports into a single dashboard — KPIs, scheduling, ROI, and operational visibility."
            />
          </Reveal>
          <Reveal delay={0.15} className="mx-auto mt-14 max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl shadow-navy/10">
              <div className="flex items-center gap-1.5 border-b border-line/70 bg-panel px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="mx-auto rounded-full border border-line/60 bg-paper px-4 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Cardinal Fleet Console
                </span>
                <span className="w-[54px]" aria-hidden />
              </div>
              <div className="p-4 sm:p-6">
                <DashboardMock />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 text-center">
            <Button href="/platform" variant="outline" className="bg-paper">See the platform</Button>
          </Reveal>
        </div>
      </section>

      {/* 9 — Fleet strip: auto-looping, pauses on hover */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              index="05" eyebrow="The fleet"
              title="24 robots. 8 categories. One partner."
              lede="Application-task-specific robots, matched to the job and covered end to end."
            />
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mt-14">
          <Marquee pauseOnHover duration={64} className="pb-4">
            {categories.map((c, i) => (
              <Link key={c.slug} href={`/robots/${c.slug}`} className="group mx-2 block w-72">
                <Card className="h-56">
                  <p className="font-mono tabular text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-navy">{c.name}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed">{c.blurb}</p>
                  <p className="mt-4 font-mono text-xs text-cardinal-600 transition-transform duration-150 group-hover:translate-x-1">
                    View robots →
                  </p>
                </Card>
              </Link>
            ))}
          </Marquee>
        </Reveal>
      </section>

      {/* 10 — Outcomes */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <SectionHeading index="06" eyebrow="Outcomes" title="Measured on the floor, not in the pitch." />
        </Reveal>
        <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
          {outcomes.map((o) => (
            <StaggerItem key={o.stat}>
              <Card className="h-full">
                <p className="font-mono text-2xl font-medium tracking-tight text-cardinal-700">{o.stat}</p>
                <p className="mt-4 text-sm leading-relaxed">{o.context}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 11 — Trust band */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <Reveal className="flex flex-col items-center gap-5 border-t border-line/70 pt-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            DoD-compliant data security
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {complianceBadges.map((b) => <Badge key={b}>{b}</Badge>)}
          </div>
        </Reveal>
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
