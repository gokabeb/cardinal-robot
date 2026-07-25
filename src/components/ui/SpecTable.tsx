import type { RobotSpec } from "@/data/types";

export function SpecTable({ specs }: { specs: RobotSpec[] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {specs.map((s) => (
        <div key={s.label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[200px_1fr] sm:gap-6">
          <dt className="text-sm text-muted">{s.label}</dt>
          <dd className="tabular text-sm text-navy">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
