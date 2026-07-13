import type { RobotSpec } from "@/data/types";

export function SpecTable({ specs }: { specs: RobotSpec[] }) {
  return (
    <dl className="divide-y divide-ink-800 border-y border-ink-800">
      {specs.map((s) => (
        <div key={s.label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[200px_1fr] sm:gap-6">
          <dt className="text-sm text-ink-400">{s.label}</dt>
          <dd className="font-mono text-sm text-ink-50">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
