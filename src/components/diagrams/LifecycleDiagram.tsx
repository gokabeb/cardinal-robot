"use client";
import { motion, useReducedMotion } from "framer-motion";

const DEFAULT_PHASES = ["Source", "Deploy", "Train", "Service", "Report", "Finance"];

export function LifecycleDiagram({ phases = DEFAULT_PHASES }: { phases?: string[] }) {
  const reduce = useReducedMotion();
  const step = 100 / (phases.length - 1);

  return (
    <svg viewBox="-40 0 720 90" className="w-full" role="img" aria-label={`Lifecycle: ${phases.join(", ")}`}>
      <motion.line
        x1="20" y1="30" x2="620" y2="30"
        stroke="#e3e8f5" strokeWidth="2"
      />
      <motion.line
        x1="20" y1="30" x2="620" y2="30"
        stroke="#3d52e8" strokeWidth="2"
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
              fill="#ffffff" stroke="#3d52e8" strokeWidth="2"
              initial={{ opacity: reduce ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: reduce ? 0 : 0.2 + i * 0.25 }}
            />
            <text x={x} y="62" textAnchor="middle" fill="#414868" fontSize="13" fontFamily="var(--font-mono)">
              {p}
            </text>
            <text x={x} y="78" textAnchor="middle" fill="#6a7194" fontSize="9" fontFamily="var(--font-mono)">
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
