import type { ReactNode } from "react";

/* On navy the eyebrow can't stay cardinal-600 — #2136cc against #0c1033 is
   roughly 1.8:1, effectively invisible. It steps up to cardinal-100, which
   keeps the label tinted blue rather than dropping to plain white. */
const TONES = {
  light: { text: "text-cardinal-600", bullet: "bg-cardinal-600" },
  dark: { text: "text-cardinal-100", bullet: "bg-cardinal-100" },
} as const;

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
}) {
  const c = TONES[tone];
  return (
    <p className={`text-label flex items-center gap-2.5 ${c.text}`}>
      <span aria-hidden className={`h-1.5 w-1.5 ${c.bullet}`} />
      {children}
    </p>
  );
}
