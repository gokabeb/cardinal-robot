import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Button({ href, variant = "solid", children, className }: {
  href: string; variant?: "solid" | "outline"; children: ReactNode; className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded px-6 py-3 font-display text-sm font-medium transition-colors duration-150",
        variant === "solid"
          ? "bg-cardinal-500 text-ink-50 hover:bg-cardinal-400"
          : "border border-ink-800 text-ink-50 hover:border-cardinal-500",
        className,
      )}
    >
      {children}
    </Link>
  );
}
