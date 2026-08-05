import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAPanel } from "@/components/ui/CTAPanel";
import { RobotsCatalog } from "./RobotsCatalog";

export const metadata: Metadata = { title: "The Fleet" };

export default function RobotsPage() {
  return (
    <main>
      <section className="surface-dark section">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              tone="dark"
              title="24 robots, ready to deploy."
              lede="Every unit is rented, installed, serviced, and reported on by Cardinal — from $2.99/hr with no upfront costs."
            />
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <RobotsCatalog />
      </section>
      <CTAPanel
        title="Not sure which unit fits?"
        body="Describe the space and the task. We'll match the model."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
