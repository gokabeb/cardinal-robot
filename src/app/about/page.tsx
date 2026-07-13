import type { Metadata } from "next";
import { heroStats } from "@/data/stats";
import { RoadmapTimeline } from "@/components/diagrams/RoadmapTimeline";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <section className="blueprint-grid border-b border-ink-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="About Cardinal"
              title="Unleashing human potential."
              lede="Robots are here to make our lives easier. We are here to help you get there."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-ink-50">The problem we work on</h2>
            <p className="mt-4 leading-relaxed">
              Clients are struggling to hire and retain their staff. Labor shortages keep growing, and the work still has to get done.
              Cardinal exists to augment your existing workforce with best-in-class robots — solving the problem financially,
              operationally, and technologically.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-medium text-ink-50">Who we are</h2>
            <p className="mt-4 leading-relaxed">
              A team of PhDs, MBAs, and robotic experts from Stanford and Berkeley, with experience both building robots and
              deploying them. We work closely with every client to tailor-make solutions that work for them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink-800 bg-ink-900/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-16 lg:grid-cols-4">
          {heroStats.map((s) => <StatCounter key={s.label} stat={s} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Roadmap"
            title="What we're automating next."
            lede="The development roadmap, straight from the lab."
          />
        </Reveal>
        <div className="mt-16"><RoadmapTimeline /></div>
      </section>

      <CTAPanel
        title="Augment your workforce."
        body="Best-in-class robots, tailored to your operation."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
