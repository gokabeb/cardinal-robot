import { cn } from "@/lib/cn";

/* `tone` follows the surface ladder (DESIGN.md §3.1): pass "dark" whenever the
   heading sits on a .surface-dark section so the whole block moves together
   rather than each page hand-rolling white text classes at the call site.

   The heading and lede are composed with template literals, NOT cn(). The
   type-scale classes are custom (.text-title, .text-lede), and tailwind-merge
   groups anything matching `text-*` as one conflict group — it cannot tell a
   custom font-size class from a colour, so cn("text-title", "text-white")
   silently drops text-title and the heading falls back to inherited 16px.
   cn() stays on the wrapper, where the incoming className has no such clash. */
const TONES = {
  light: { title: "text-navy", lede: "text-body" },
  dark: { title: "text-white", lede: "text-white/70" },
} as const;

export function SectionHeading({ title, lede, className, tone = "light" }: {
  title: string; lede?: string; className?: string;
  tone?: keyof typeof TONES;
}) {
  const c = TONES[tone];
  return (
    <div className={cn("max-w-2xl space-y-4", className)}>
      <h2 className={`text-title font-display font-semibold ${c.title}`}>{title}</h2>
      {lede && <p className={`text-lede ${c.lede}`}>{lede}</p>}
    </div>
  );
}
