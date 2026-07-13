"use client";
import Link from "next/link";
import { useState } from "react";
import { robots } from "@/data/robots";
import { categories } from "@/data/categories";
import type { CategorySlug } from "@/data/types";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";

export function RobotsCatalog() {
  const [filter, setFilter] = useState<CategorySlug | "all">("all");
  const shown = filter === "all" ? robots : robots.filter((r) => r.category === filter);
  const catName = (slug: CategorySlug) => categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {[{ slug: "all" as const, name: "All" }, ...categories].map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setFilter(c.slug as CategorySlug | "all")}
            className={cn(
              "rounded border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-150",
              filter === c.slug
                ? "border-cardinal-500 bg-cardinal-500/10 text-cardinal-400"
                : "border-ink-800 text-ink-300 hover:border-ink-400",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p className="mt-6 font-mono text-xs text-ink-400">{shown.length} of {robots.length} units</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((r) => (
          <Link key={r.slug} href={`/robots/${r.category}#${r.slug}`} className="group block">
            <Card className="flex h-full flex-col">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">{catName(r.category)}</p>
              <h3 className="mt-2 font-display text-xl font-medium text-ink-50">{r.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed">{r.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-ink-800 pt-4">
                {r.headlineSpecs.map((s) => (
                  <span key={s} className="font-mono text-xs text-cardinal-500">{s}</span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
