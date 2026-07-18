import type { Stat } from "@/data/types";
import { CountUp } from "@/components/motion/CountUp";

export function StatCounter({ stat }: { stat: Stat }) {
  return (
    <div className="space-y-2">
      <div className="font-mono tabular text-4xl font-medium tracking-tight text-navy sm:text-5xl">
        <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{stat.label}</p>
    </div>
  );
}
