import { Photo } from "./Photo";
import manifest from "@/lib/image-manifest.json";

export function PhotoHero({
  image, imageAlt, title, lede, minHeight = "min-h-[420px] sm:min-h-[520px]",
}: {
  /** Base image name, e.g. "assembly" for public/images/assembly.jpg. */
  image: keyof typeof manifest.images;
  imageAlt: string; title: string; lede: string; minHeight?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className={`relative flex ${minHeight} items-end`}>
        <Photo
          name={image}
          alt={imageAlt}
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            // Scrim must guarantee 4.5:1 across the whole text block, not just
            // its center (DESIGN.md §8). The linear pass does the guaranteeing;
            // the radial only deepens the corner the copy is anchored to.
            backgroundImage:
              "radial-gradient(820px 560px at 6% 100%, rgba(12,16,51,0.93) 0%, rgba(12,16,51,0.88) 45%, rgba(12,16,51,0.5) 70%, rgba(12,16,51,0) 90%), linear-gradient(to top, rgba(12,16,51,0.82) 0%, rgba(12,16,51,0.45) 34%, rgba(12,16,51,0.08) 62%, rgba(12,16,51,0) 100%)",
          }}
        />
        {/* CSS-only entrance (DESIGN.md §5): hero copy must not wait on JS. */}
        <div className="relative w-full px-6 py-16 sm:px-10 sm:py-20">
          <h2 className="text-display hero-rise hero-rise-1 max-w-2xl font-display font-semibold text-white">
            {title}
          </h2>
          <p className="text-lede hero-rise hero-rise-2 mt-6 max-w-lg text-white/90">{lede}</p>
        </div>
      </div>
    </section>
  );
}
