import type { ReactNode } from "react";

export function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-cardinal-500">
      {"// "}{index ? `${index} — ` : ""}{children}
    </p>
  );
}
