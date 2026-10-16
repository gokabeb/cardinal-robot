import { roadmap } from "@/data/roadmap";
import { Reveal } from "@/components/motion/Reveal";

export function RoadmapTimeline() {
  return (
    <div className="relative space-y-12 border-l border-line pl-8">
      {roadmap.map((era, i) => (
        <Reveal key={era.year} delay={i * 0.1}>
          <div className="relative">
            <span className="absolute -left-[37px] top-1 h-2.5 w-2.5 rounded-full border-2 border-cardinal-500 bg-paper" />
            <p className="text-sm uppercase tracking-[0.2em] text-cardinal-600">{era.year}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {era.items.map((item) => (
                <li key={item} className="rounded border border-line bg-panel px-4 py-3 text-fine text-body">
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
