import Link from "next/link";
import { footerColumns, youtubeUrl } from "@/data/navigation";
import { complianceBadges } from "@/data/security";
import { Badge } from "@/components/ui/Badge";

export function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <p className="font-display text-lg font-semibold text-ink-50">Cardinal<span className="text-cardinal-500">.</span></p>
            <p className="max-w-xs text-sm leading-relaxed">
              Robotic adoption made easy. Sourcing, deployment, training, servicing, and financing for commercial robots.
            </p>
            <div className="flex flex-wrap gap-2">
              {complianceBadges.map((b) => <Badge key={b}>{b}</Badge>)}
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink-300 transition-colors duration-150 hover:text-ink-50">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink-800 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-ink-400">© {new Date().getFullYear()} Cardinal Robotics. All rights reserved.</p>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-ink-400 transition-colors duration-150 hover:text-ink-50">
            YouTube ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
