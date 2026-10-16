import type { Metadata } from "next";
import { aboutFacts, whyCardinal, whyCardinalPrinciples } from "@/data/about";
import { heroStats } from "@/data/stats";
import { RoadmapTimeline } from "@/components/diagrams/RoadmapTimeline";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { LogoWall } from "@/components/ui/LogoWall";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = {
  title: "Why Cardinal",
  description:
    "Building the robotic workforce the right way: investing in people, the best ROI on every deployment, and data that never leaves U.S. soil.",
};

export default function WhyCardinalPage() {
  return (
    <main>
      {/* Dark rung at the top (DESIGN.md §3.1). */}
      <section className="surface-dark section">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading tone="dark" title={whyCardinal.hero} lede={whyCardinal.lede} />
          </Reveal>
        </div>
      </section>

      {/* The three principles are the page now — the spec asks for the company
          values to lead and the team details to follow, rather than the team
          details standing alone as they did on /about. */}
      <section className="mx-auto max-w-6xl px-6 section">
        <p className="text-lede max-w-3xl">{whyCardinal.framing}</p>
        <p className="text-copy mt-6 max-w-3xl font-medium text-navy">
          Cardinal is built around three principles.
        </p>
        <div className="mt-16 space-y-16">
          {whyCardinalPrinciples.map((pr, i) => (
            <div key={pr.title} className="grid gap-8 border-t border-line pt-8 lg:grid-cols-[220px_1fr]">
              <div>
                <p className="tabular text-label text-muted">{String(i + 1).padStart(2, "0")}</p>
                <p className="text-subtitle mt-2 font-display font-semibold text-cardinal-700">{pr.title}</p>
              </div>
              <div>
                <h2 className="text-subtitle font-display font-semibold text-navy">{pr.headline}</h2>
                <p className="text-copy mt-4 max-w-2xl">{pr.body}</p>
                {pr.detail && <p className="text-copy mt-4 max-w-2xl text-muted">{pr.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-panel border-y border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-16 lg:grid-cols-4">
          {heroStats.map((s) => <StatCounter key={s.label} stat={s} />)}
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
        <div className="mt-16 border-t border-line pt-10">
          <h2 className="font-display text-2xl font-semibold text-navy">Our team</h2>
          <p className="mt-4 max-w-3xl leading-relaxed">{aboutFacts.veterans}</p>
        </div>
      </section>

      <section className="surface-panel section">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            title="What we&apos;re automating next."
            lede="The development roadmap, straight from the lab."
          />
          <div className="mt-16"><RoadmapTimeline /></div>
        </div>
      </section>

      <section className="section border-t border-line/70">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-label text-center text-muted">
            We proudly serve some of the world&apos;s most prominent organizations
          </p>
          <LogoWall compact className="mt-10" />
        </div>
      </section>

      <CTAPanel
        title="Augment your workforce."
        body="Best-in-class robots, tailored to your operation."
        cta={{ label: "Talk to us", href: "/contact" }}
      />
    </main>
  );
}
