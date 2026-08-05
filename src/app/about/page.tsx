import type { Metadata } from "next";
import { aboutFacts } from "@/data/about";
import { heroStats } from "@/data/stats";
import { RoadmapTimeline } from "@/components/diagrams/RoadmapTimeline";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { LogoWall } from "@/components/ui/LogoWall";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      {/* Dark rung at the top (DESIGN.md §3.1). Pages with a PhotoHero already
          open on a dark mass; text-hero pages were opening white-on-white under
          a white nav, which is the weakest possible first screen. */}
      <section className="surface-dark section">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              tone="dark"
              title={aboutFacts.headline}
              lede={aboutFacts.origin}
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 section">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-navy">Headquarters</h2>
            <p className="mt-4 leading-relaxed">{aboutFacts.hq}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-semibold text-navy">Who we are</h2>
            <p className="mt-4 leading-relaxed">{aboutFacts.founders}</p>
          </Reveal>
        </div>
      </section>

      <section className="surface-panel border-y border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-16 lg:grid-cols-4">
          {heroStats.map((s) => <StatCounter key={s.label} stat={s} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 section">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-navy">Our team</h2>
          <p className="mt-4 max-w-3xl leading-relaxed">{aboutFacts.veterans}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 section">
        <Reveal>
          <SectionHeading
            title="What we're automating next."
            lede="The development roadmap, straight from the lab."
          />
        </Reveal>
        <div className="mt-16"><RoadmapTimeline /></div>
      </section>

      <section className="section border-t border-line/70">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-center text-xs uppercase tracking-[0.2em] text-muted">
              We proudly serve some of the world&apos;s most prominent organizations
            </p>
            <LogoWall compact className="mt-10" />
          </Reveal>
        </div>
      </section>

      <CTAPanel
        title="Augment your workforce."
        body="Best-in-class robots, tailored to your operation."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
