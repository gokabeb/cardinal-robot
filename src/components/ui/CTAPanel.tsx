import Link from "next/link";
import { Button } from "./Button";

export function CTAPanel({ title, body, cta, secondary }: {
  title: string; body?: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section mx-auto max-w-6xl px-6">
      <div className="relative overflow-hidden rounded-[20px] bg-navy px-8 py-20 text-center sm:px-16">
        <img
          src="/brand/mark-white-large.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-10 w-[420px] opacity-[0.06]"
        />
        <div className="relative">
          <h2 className="text-display font-display font-semibold text-white">{title}</h2>
          {body && <p className="text-lede mx-auto mt-5 max-w-xl text-white/70">{body}</p>}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={cta.href} className="bg-white text-navy hover:bg-cardinal-50">{cta.label}</Button>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 font-display text-sm font-semibold text-white transition-colors duration-150 hover:border-white/60"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
