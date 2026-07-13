import { roadmap } from "@/data/roadmap";
import { Reveal } from "@/components/motion/Reveal";

export function RoadmapTimeline() {
  return (
    <div className="relative space-y-12 border-l border-ink-800 pl-8">
      {roadmap.map((era, i) => (
        <Reveal key={era.year} delay={i * 0.1}>
          <div className="relative">
            <span className="absolute -left-[37px] top-1 h-2.5 w-2.5 rounded-full border-2 border-cardinal-500 bg-ink-950" />
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-cardinal-500">{era.year}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {era.items.map((item) => (
                <li key={item} className="rounded border border-ink-800 bg-ink-900 px-4 py-3 text-sm text-ink-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
