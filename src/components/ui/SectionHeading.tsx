import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({ eyebrow, title, lede, className }: {
  eyebrow?: string; title: string; lede?: string; className?: string;
}) {
  return (
    <div className={cn("max-w-2xl space-y-4", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-5xl">{title}</h2>
      {lede && <p className="text-lg leading-relaxed">{lede}</p>}
    </div>
  );
}
