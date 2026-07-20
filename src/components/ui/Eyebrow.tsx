import type { ReactNode } from "react";

export function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-cardinal-600">
      <span aria-hidden className="h-1.5 w-1.5 bg-cardinal-600" />
      {index ? `${index} — ` : ""}{children}
    </p>
  );
}
