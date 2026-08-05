"use client";
import { motion, useReducedMotion } from "framer-motion";

const DEFAULT_PHASES = ["Source", "Deploy", "Train", "Service", "Report", "Finance"];

/* The diagram is drawn for whichever rung of the surface ladder it sits on
   (DESIGN.md §3.1). The node treatment inverts between the two — white fill
   with a blue stroke on paper, blue fill with a white stroke on navy — so the
   drawing keeps the same language rather than becoming a different mark.

   Blue is not used for the *line* on navy: cardinal-500 against navy is about
   2.7:1, under the 3:1 that a graphic element needs to stay legible. On dark
   the line carries in white and blue moves to the nodes, where it has a white
   stroke to hold it off the background. */
const TONES = {
  light: {
    rail: "#e3e8f5",
    draw: "#3d52e8",
    nodeFill: "#ffffff",
    nodeStroke: "#3d52e8",
    label: "#414868",
    index: "#6a7194",
  },
  dark: {
    rail: "rgb(255 255 255 / 0.16)",
    draw: "#ffffff",
    nodeFill: "#3d52e8",
    nodeStroke: "#ffffff",
    label: "rgb(255 255 255 / 0.92)",
    index: "rgb(255 255 255 / 0.55)",
  },
} as const;

export function LifecycleDiagram({
  phases = DEFAULT_PHASES,
  tone = "light",
}: {
  phases?: string[];
  tone?: keyof typeof TONES;
}) {
  const reduce = useReducedMotion();
  const step = 100 / (phases.length - 1);
  const c = TONES[tone];

  return (
    <svg viewBox="-40 0 720 90" className="w-full" role="img" aria-label={`Lifecycle: ${phases.join(", ")}`}>
      <motion.line
        x1="20" y1="30" x2="620" y2="30"
        stroke={c.rail} strokeWidth="2"
      />
      <motion.line
        x1="20" y1="30" x2="620" y2="30"
        stroke={c.draw} strokeWidth="2"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      {phases.map((p, i) => {
        const x = 20 + (600 * (i * step)) / 100;
        return (
          <g key={p}>
            <motion.circle
              cx={x} cy="30" r="6"
              fill={c.nodeFill} stroke={c.nodeStroke} strokeWidth="2"
              initial={{ opacity: reduce ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: reduce ? 0 : 0.2 + i * 0.25 }}
            />
            <text x={x} y="62" textAnchor="middle" fill={c.label} fontSize="13" fontFamily="var(--font-inter)">
              {p}
            </text>
            <text x={x} y="78" textAnchor="middle" fill={c.index} fontSize="9" fontFamily="var(--font-inter)">
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
