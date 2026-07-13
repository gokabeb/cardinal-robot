import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded border border-ink-800 bg-ink-900 px-3 py-1.5 font-mono text-xs text-ink-300">
      {children}
    </span>
  );
}
