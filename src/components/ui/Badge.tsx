import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded border border-line bg-panel px-3 py-1.5 text-xs text-body">
      {children}
    </span>
  );
}
