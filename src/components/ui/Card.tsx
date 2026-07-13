import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-ink-800 bg-ink-900 p-6 transition-colors duration-150 hover:border-cardinal-500/50", className)}>
      {children}
    </div>
  );
}
