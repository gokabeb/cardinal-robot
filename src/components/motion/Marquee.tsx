import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Infinite horizontal marquee. Content is rendered twice and translated
 * -50% on loop; reduced-motion users get a static strip (see globals.css).
 */
export function Marquee({ children, className, duration = 40, pauseOnHover = false }: {
  children: ReactNode;
  className?: string;
  /** Seconds per full loop. */
  duration?: number;
  /** Freeze the loop while the cursor is over it (so items stay clickable). */
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("marquee-mask overflow-hidden", pauseOnHover && "marquee-pause", className)}>
      <div className="animate-marquee flex w-max items-center" style={{ animationDuration: `${duration}s` }}>
        <div className="flex items-center">{children}</div>
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  );
}
