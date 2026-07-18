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
        "inline-flex items-center gap-2 rounded-full px-7 py-3 font-display text-sm font-semibold transition-colors duration-150",
        variant === "solid"
          ? "bg-cardinal-600 text-white hover:bg-cardinal-700"
          : "border border-line text-navy hover:border-cardinal-500 hover:bg-cardinal-50",
        className,
      )}
    >
      {children}
    </Link>
  );
}
