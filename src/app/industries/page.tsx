import type { Metadata } from "next";
import Link from "next/link";
import { industries, casinoFteTable } from "@/data/industries";
import { robots } from "@/data/robots";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const metadata: Metadata = { title: "Industries" };

export default function IndustriesPage() {
  const robotName = (slug: string) => robots.find((r) => r.slug === slug)?.name ?? slug;
  const robotCategory = (slug: string) => robots.find((r) => r.slug === slug)?.category ?? "";

  return (
    <main>
      <section className="surface-dark section">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              tone="dark"
              title="Built for floors that never close."
              lede="Hospitals, hotels, casinos, senior living, schools — wherever labor is short and standards aren't."
            />
          </Reveal>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr]">
        <nav className="top-24 hidden self-start lg:sticky lg:block" aria-label="Industries">
          <ul className="space-y-1 border-l border-line">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <a href={`#${ind.slug}`} className="block border-l-2 border-transparent px-4 py-2.5 text-fine text-muted transition-colors duration-150 hover:border-cardinal-500 hover:text-navy">
                  {ind.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-24">
          {industries.map((ind, i) => (
            <section key={ind.slug} id={ind.slug} className="scroll-mt-24">
              <Reveal>
                <p className="text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-navy">{ind.name}</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed">{ind.narrative}</p>
                <div className="mt-6 rounded-lg border border-line bg-panel p-6">
                  <p className="font-display text-3xl font-medium text-cardinal-600">{ind.metric.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted">{ind.metric.label}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {ind.robotSlugs.map((slug) => (
                    <Link key={slug} href={`/robots/${robotCategory(slug)}#${slug}`} className="inline-flex min-h-11 items-center">
                      <Badge>{robotName(slug)}</Badge>
                    </Link>
                  ))}
                </div>
                {ind.slug === "casinos" && (
                  <div className="mt-8 overflow-hidden rounded-lg border border-line">
                    <table className="w-full text-left text-sm">
                      <caption className="border-b border-line bg-panel px-5 py-3 text-left text-xs uppercase tracking-[0.2em] text-muted">
                        Measured impact per application
                      </caption>
                      <thead className="border-b border-line bg-panel text-xs uppercase tracking-[0.15em] text-muted">
                        <tr>
                          <th scope="col" className="px-5 py-3 font-normal">Application</th>
                          <th scope="col" className="px-5 py-3 font-normal">Labor impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {casinoFteTable.map((row) => (
                          <tr key={row.application}>
                            <td className="px-5 py-3 text-body">{row.application}</td>
                            <td className="px-5 py-3 text-navy">{row.impact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Reveal>
            </section>
          ))}
        </div>
      </div>

      <CTAPanel
        title="Your industry, your floor plan."
        body="Tell us where robots should be working. We'll bring the deployment plan."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
