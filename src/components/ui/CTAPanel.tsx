import { Button } from "./Button";

export function CTAPanel({ title, body, cta, secondary }: {
  title: string; body?: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="glow-cardinal blueprint-grid rounded-lg border border-ink-800 bg-ink-900 px-8 py-16 text-center sm:px-16">
        <h2 className="font-display text-4xl font-medium tracking-tight text-ink-50 sm:text-6xl">{title}</h2>
        {body && <p className="mx-auto mt-4 max-w-xl text-lg">{body}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={cta.href}>{cta.label}</Button>
          {secondary && <Button href={secondary.href} variant="outline">{secondary.label}</Button>}
        </div>
      </div>
    </section>
  );
}
