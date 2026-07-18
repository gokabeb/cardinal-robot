"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Headline entrance: each word rises out of its own clip box on load.
 * Renders a single accessible string; only the visual spans animate.
 */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className={cn("inline-block overflow-hidden align-top", i < words.length - 1 && "mr-[0.24em]")}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" },
              show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
