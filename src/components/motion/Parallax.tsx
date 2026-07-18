"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll-linked parallax. Children should be slightly taller than the
 * clipping container (e.g. an image at 115% height) so the drift never
 * exposes edges.
 */
export function Parallax({ children, className, range = 8 }: {
  children: ReactNode;
  className?: string;
  /** Total drift as a percentage of element height. */
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range / 2}%`, `${range / 2}%`]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={reduce ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
