import Link from "next/link";
import { footerColumns, footerPrimaryLinks, youtubeUrl, linkedinUrl } from "@/data/navigation";
import { complianceBadges } from "@/data/security";
import { Badge } from "@/components/ui/Badge";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* The three standalone doors, above the column grid. A visitor who
            reads nothing else in the footer should still leave knowing there
            is a platform, a fleet, and a way in by industry. */}
        <nav aria-label="Primary destinations" className="mb-12 flex flex-wrap gap-3 border-b border-line pb-12">
          {footerPrimaryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-display text-sm font-semibold text-navy transition-colors duration-150 hover:border-cardinal-500 hover:bg-cardinal-50 hover:text-cardinal-700"
            >
              {l.label}
              <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
            </Link>
          ))}
        </nav>

        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="space-y-4">
            <img src="/brand/logo-navy.png" alt="Cardinal Robotics" className="h-9 w-auto" />
            <p className="max-w-xs text-sm leading-relaxed">
              Robotic adoption made easy. Sourcing, deployment, training, servicing, and financing for commercial robots.
            </p>
            <div className="flex flex-wrap gap-2">
              {complianceBadges.map((b) => <Badge key={b}>{b}</Badge>)}
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={
                        l.children
                          ? "text-sm font-semibold text-navy transition-colors duration-150 hover:text-cardinal-700"
                          : "text-sm text-body transition-colors duration-150 hover:text-navy"
                      }
                    >
                      {l.label}
                    </Link>
                    {l.children && (
                      <ul className="mt-3 space-y-3 border-l border-line pl-4">
                        {l.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="text-sm text-body transition-colors duration-150 hover:text-navy">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="text-xs text-muted">© {new Date().getFullYear()} Cardinal Robotics. All rights reserved.</p>
            <p className="text-xs text-muted">
              Field service delivered by Cardinal Robot Services, Inc.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted transition-colors duration-150 hover:text-navy">
              LinkedIn ↗
            </a>
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted transition-colors duration-150 hover:text-navy">
              YouTube ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
