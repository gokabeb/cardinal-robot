"use client";
import Link from "next/link";
import { useState } from "react";
import { headerLinks } from "@/data/navigation";
import { categories } from "@/data/categories";
import { cn } from "@/lib/cn";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-800/60 bg-ink-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-ink-50">
          Cardinal<span className="text-cardinal-500">.</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <div className="group relative">
            <Link href="/robots" className="text-sm text-ink-300 transition-colors duration-150 hover:text-ink-50">
              Robots
            </Link>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid w-[420px] grid-cols-2 gap-1 rounded-lg border border-ink-800 bg-ink-900 p-3">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/robots/${c.slug}`} className="rounded px-3 py-2 text-sm text-ink-300 transition-colors duration-150 hover:bg-ink-800 hover:text-ink-50">
                    {c.name}
                  </Link>
                ))}
                <Link href="/robots" className="col-span-2 rounded px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] text-cardinal-500 hover:bg-ink-800">
                  View all 24 robots →
                </Link>
              </div>
            </div>
          </div>
          {headerLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-ink-300 transition-colors duration-150 hover:text-ink-50">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="rounded bg-cardinal-500 px-4 py-2 font-display text-sm font-medium text-ink-50 transition-colors duration-150 hover:bg-cardinal-400">
            Get in Touch
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={cn("h-px w-5 bg-ink-50 transition-transform duration-150", mobileOpen && "translate-y-[3.5px] rotate-45")} />
          <span className={cn("h-px w-5 bg-ink-50 transition-transform duration-150", mobileOpen && "-translate-y-[3.5px] -rotate-45")} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-ink-800 bg-ink-950 px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/robots" onClick={() => setMobileOpen(false)} className="text-ink-50">Robots</Link>
            {headerLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-ink-300">
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-2 rounded bg-cardinal-500 px-4 py-3 text-center font-display text-sm font-medium text-ink-50">
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
