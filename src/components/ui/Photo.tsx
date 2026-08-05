import manifest from "@/lib/image-manifest.json";
import { cn } from "@/lib/cn";

type ImageName = keyof typeof manifest.images;

/**
 * Responsive image for a static export.
 *
 * next/image is a no-op here (`output: "export"` + `images.unoptimized`), so
 * variants are generated at build time by scripts/build-images.mjs and served
 * through a plain <picture>. AVIF first, WebP next, original JPEG last.
 *
 * Intrinsic width/height always come from the manifest so the browser reserves
 * layout before the bytes land — no shift, regardless of how the caller sizes
 * the element with CSS.
 */
export function Photo({
  name,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  tone = true,
}: {
  /** Base filename without extension, e.g. "hero" for public/images/hero.jpg. */
  name: ImageName;
  /** Empty string marks the image decorative; it is then hidden from AT. */
  alt: string;
  className?: string;
  /** Viewport-relative rendered width, so the browser picks the right variant. */
  sizes?: string;
  /** Set on the LCP image only. Eager + high fetch priority. */
  priority?: boolean;
  /** Palette treatment. Turn off for product shots that need true color. */
  tone?: boolean;
}) {
  const meta = manifest.images[name];
  const widths = manifest.widths.filter((w) => w <= meta.width);
  if (widths.length === 0) widths.push(meta.width);

  const srcSet = (ext: string) =>
    widths.map((w) => `/images/opt/${name}-${w}.${ext} ${w}w`).join(", ");

  const decorative = alt === "";

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={meta.src}
        alt={alt}
        aria-hidden={decorative || undefined}
        width={meta.width}
        height={meta.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={cn(tone && "img-tone", className)}
      />
    </picture>
  );
}
