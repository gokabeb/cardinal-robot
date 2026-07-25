import { Reveal } from "@/components/motion/Reveal";

export function PhotoHero({
  image, imageAlt, eyebrow, title, lede, minHeight = "min-h-[420px] sm:min-h-[520px]",
}: {
  image: string; imageAlt: string; eyebrow: string; title: string; lede: string; minHeight?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className={`relative flex ${minHeight} items-end`}>
        <img src={image} alt={imageAlt} className="img-tone absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(780px 520px at 8% 100%, rgba(12,16,51,0.92) 0%, rgba(12,16,51,0.92) 42%, rgba(12,16,51,0.58) 66%, rgba(12,16,51,0) 88%), linear-gradient(115deg, rgba(12,16,51,0.4) 0%, rgba(12,16,51,0.14) 32%, rgba(12,16,51,0) 58%)",
          }}
        />
        <Reveal className="relative w-full px-6 py-16 sm:px-10 sm:py-20">
          <p className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-white/80">
            <span aria-hidden className="h-1.5 w-1.5 bg-white" />
            {eyebrow}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/90">{lede}</p>
        </Reveal>
      </div>
    </section>
  );
}
