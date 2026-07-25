import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { robots } from "@/data/robots";
import type { CategorySlug } from "@/data/types";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecTable } from "@/components/ui/SpecTable";
import { Badge } from "@/components/ui/Badge";
import { CTAPanel } from "@/components/ui/CTAPanel";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  return { title: cat ? `${cat.name} Robots` : "Robots" };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const models = robots.filter((r) => r.category === (cat.slug as CategorySlug));
  const related = categories.filter((c) => c.slug !== cat.slug).slice(0, 3);

  return (
    <main>
      <section className="blueprint-grid border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs text-muted">
              <Link href="/robots" className="hover:text-navy">The fleet</Link> / {cat.name}
            </p>
            <SectionHeading className="mt-6" eyebrow={cat.name} title={cat.name} lede={cat.blurb} />
          </Reveal>
        </div>
      </section>

      {models.map((r, i) => (
        <section key={r.slug} id={r.slug} className={i % 2 === 1 ? "border-y border-line bg-panel/40" : ""}>
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs text-muted">{String(i + 1).padStart(2, "0")} / {cat.name.toUpperCase()}</p>
              <h2 className="mt-3 font-display text-4xl font-medium text-navy">{r.name}</h2>
              <p className="mt-4 text-lg leading-relaxed">{r.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {r.idealFor.map((tag) => <Badge key={tag}>{tag}</Badge>)}
              </div>
            </Reveal>
            <Reveal delay={0.1}><SpecTable specs={r.specs} /></Reveal>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Related categories</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {related.map((c) => (
            <Link key={c.slug} href={`/robots/${c.slug}`} className="rounded border border-line px-5 py-3 font-display text-sm text-navy transition-colors duration-150 hover:border-cardinal-500">
              {c.name} →
            </Link>
          ))}
        </div>
      </section>

      <CTAPanel
        title={`Deploy ${cat.name.toLowerCase()} robots.`}
        body="Rentals from $2.99/hr. No upfront costs. Unlimited servicing."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
