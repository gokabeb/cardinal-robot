"use client";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { headerNav } from "@/data/navigation";
import { categories } from "@/data/categories";
import { cn } from "@/lib/cn";

function Chevron() {
  return (
    <svg
      viewBox="0 0 10 6" aria-hidden
      className="h-1.5 w-2.5 stroke-current transition-transform duration-200 ease-out group-hover:rotate-180"
      fill="none" strokeWidth="1.5" strokeLinecap="round"
    >
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

const panelCn = cn(
  "invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0",
  "origin-top scale-[0.97] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
  "group-hover:visible group-hover:scale-100 group-hover:opacity-100",
);

function NavDropdown({ label, children }: { label: string; children: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  return (
    <div
      className="group relative"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 py-3 text-sm text-body transition-colors duration-150 hover:text-navy"
      >
        {label}
        <Chevron />
      </button>
      <div id={panelId} className={cn(panelCn, open && "visible scale-100 opacity-100")}>
        <div className="glass w-56 rounded-xl border border-line/70 p-2 shadow-xl shadow-navy/[0.07]">
          {children.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3.5 py-2.5 text-sm text-body transition-colors duration-100 hover:bg-cardinal-50 hover:text-cardinal-700">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-line/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center" aria-label="Cardinal Robotics home">
          <img src="/brand/logo-navy.png" alt="Cardinal Robotics" className="h-8 w-auto" />
        </Link>

        {/* gap-5 at lg: promoting Platform and Industries to top level took the
            bar from 6 items to 7, which overflowed at 1024px on gap-7. */}
        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          <div className="group relative">
            <Link
              href="/robots"
              className="inline-flex items-center gap-1.5 py-3 text-sm text-body transition-colors duration-150 hover:text-navy"
            >
              Robots
              <svg
                viewBox="0 0 10 6" aria-hidden
                className="h-1.5 w-2.5 stroke-current transition-transform duration-200 ease-out group-hover:rotate-180"
                fill="none" strokeWidth="1.5" strokeLinecap="round"
              >
                <path d="M1 1l4 4 4-4" />
              </svg>
            </Link>
            <div
              className={cn(
                "invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0",
                "origin-top scale-[0.97] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "group-hover:visible group-hover:scale-100 group-hover:opacity-100",
                "group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100",
              )}
            >
              <div className="glass w-[460px] rounded-xl border border-line/70 p-2 shadow-xl shadow-navy/[0.07]">
                <div className="grid grid-cols-2 gap-0.5">
                  {categories.map((c, i) => (
                    <Link
                      key={c.slug}
                      href={`/robots/${c.slug}`}
                      className="group/item flex items-baseline gap-2.5 rounded-lg px-3.5 py-2.5 transition-colors duration-100 hover:bg-cardinal-50"
                    >
                      <span className="text-[10px] tabular text-muted">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm text-body transition-colors duration-100 group-hover/item:text-cardinal-700">
                        {c.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/robots"
                  className="mt-1 flex items-center justify-between rounded-lg border-t border-line/60 px-3.5 py-2.5 text-xs uppercase tracking-[0.15em] text-cardinal-600 transition-colors duration-100 hover:bg-cardinal-50"
                >
                  View all 24 robots
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
          {headerNav.map((item) =>
            item.children ? (
              <NavDropdown key={item.label} label={item.label} children={item.children} />
            ) : (
              <Link key={item.href} href={item.href!} className="py-3 text-sm text-body transition-colors duration-150 hover:text-navy">
                {item.label}
              </Link>
            ),
          )}
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-full bg-cardinal-600 px-5 font-display text-sm font-semibold text-white transition-colors duration-150 hover:bg-cardinal-700"
          >
            Get in Touch
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={cn("h-px w-5 bg-navy transition-transform duration-150", mobileOpen && "translate-y-[3.5px] rotate-45")} />
          <span className={cn("h-px w-5 bg-navy transition-transform duration-150", mobileOpen && "-translate-y-[3.5px] -rotate-45")} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-line/60 bg-paper px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link href="/robots" onClick={() => setMobileOpen(false)} className="py-3 text-navy">Robots</Link>
            {headerNav.map((item) =>
              item.children ? (
                <div key={item.label} className="py-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{item.label}</p>
                  <div className="mt-2 flex flex-col border-l border-line pl-4">
                    {item.children.map((l) => (
                      <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="py-2.5 text-body">{l.label}</Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href!} onClick={() => setMobileOpen(false)} className="py-3 text-body">{item.label}</Link>
              ),
            )}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-cardinal-600 px-4 py-3 text-center font-display text-sm font-semibold text-white"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
