import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({ index, eyebrow, title, lede, className }: {
  index?: string; eyebrow?: string; title: string; lede?: string; className?: string;
}) {
  return (
    <div className={cn("max-w-2xl space-y-4", className)}>
      {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-medium tracking-tight text-ink-50 sm:text-5xl">{title}</h2>
      {lede && <p className="text-lg leading-relaxed">{lede}</p>}
    </div>
  );
}
