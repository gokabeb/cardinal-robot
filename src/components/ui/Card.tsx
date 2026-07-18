import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-line/70 bg-paper p-6 transition-colors duration-150 hover:border-cardinal-500/40", className)}>
      {children}
    </div>
  );
}
