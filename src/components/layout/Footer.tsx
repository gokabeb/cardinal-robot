import Link from "next/link";
import { footerColumns, youtubeUrl, linkedinUrl } from "@/data/navigation";
import { complianceBadges } from "@/data/security";
import { Badge } from "@/components/ui/Badge";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
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
                    <Link href={l.href} className="text-sm text-body transition-colors duration-150 hover:text-navy">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">© {new Date().getFullYear()} Cardinal Robotics. All rights reserved.</p>
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
