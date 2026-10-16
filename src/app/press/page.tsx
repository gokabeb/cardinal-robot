import type { Metadata } from "next";
import { aboutFacts } from "@/data/about";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = {
  title: "Press",
  description: "Press resources, company boilerplate, and brand assets for Cardinal Robotics.",
};

/**
 * The spec's footer asks for "Current + Press". There is no coverage list or
 * press-release archive to publish yet, and a page of placeholders would be
 * worse than none — so this ships as the two things a journalist on deadline
 * actually needs: approved boilerplate they can paste, and logo files they can
 * use without asking.
 *
 * No press@ address is published here: inventing a mailbox that may not exist
 * sends enquiries nowhere. Press routes through the contact form until a real
 * address is confirmed.
 */
const ASSETS = [
  { label: "Wordmark, navy (PNG)", href: "/brand/logo-navy.png" },
  { label: "Wordmark, white (PNG)", href: "/brand/logo-white.png" },
  { label: "Mark, navy (PNG)", href: "/brand/mark-navy.png" },
  { label: "Mark, white (PNG)", href: "/brand/mark-white.png" },
];

export default function PressPage() {
  return (
    <main>
      <section className="surface-dark section">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              tone="dark"
              title="Press."
              lede="Boilerplate, brand assets, and a direct line for media enquiries."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 section">
        <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-subtitle font-display font-semibold text-navy">About Cardinal Robotics</h2>
            <p className="text-copy mt-5 max-w-2xl">
              {aboutFacts.headline} {aboutFacts.origin} {aboutFacts.hq}
            </p>
            <p className="text-copy mt-4 max-w-2xl">
              Cardinal sources, finances, deploys, trains, services, and reports on commercial
              robots for operators and robotics manufacturers — {aboutFacts.veterans.toLowerCase()}
            </p>
            <div className="mt-10">
              <Button href="/contact">Media enquiries</Button>
            </div>
          </div>

          <div className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-label text-muted">Brand assets</p>
            <ul className="mt-5 space-y-3">
              {ASSETS.map((a) => (
                <li key={a.href}>
                  <a
                    href={a.href}
                    download
                    className="inline-flex min-h-11 items-center text-fine text-cardinal-600 underline underline-offset-4 transition-colors duration-150 hover:text-cardinal-700"
                  >
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-fine mt-6 text-muted">
              Please use the marks as supplied, without recolouring or alteration.
            </p>
          </div>
        </div>
      </section>

      <CTAPanel
        title="Writing about robotics?"
        body="We can provide deployment data, site visits, and technical background."
        cta={{ label: "Talk to us", href: "/contact" }}
      />
    </main>
  );
}
