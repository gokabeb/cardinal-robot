/**
 * Build-time responsive image generation.
 *
 * The site is a static export (`output: "export"`, `images.unoptimized: true`),
 * so next/image gives us no runtime optimization. Everything has to happen
 * here instead: for each source JPEG we emit AVIF and WebP at a few widths,
 * plus a manifest of intrinsic dimensions so <Photo> can reserve layout and
 * avoid shift.
 *
 * Run: npm run images
 * Output: public/images/opt/  (gitignored build artifact)
 */
import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";

const SRC = "public/images";
const OUT = join(SRC, "opt");
const WIDTHS = [640, 1024, 1600, 2400];

// AVIF is ~30% smaller than WebP at equivalent quality but slow to encode;
// at 8 source images the build cost is a couple of seconds, so it is worth it.
const FORMATS = [
  { ext: "avif", options: { quality: 55, effort: 4 } },
  { ext: "webp", options: { quality: 76 } },
];

async function main() {
  await mkdir(OUT, { recursive: true });

  const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  if (files.length === 0) {
    console.warn(`[images] no source images found in ${SRC}`);
    return;
  }

  const manifest = {};

  for (const file of files) {
    const { name } = parse(file);
    const input = join(SRC, file);
    const image = sharp(input);
    const { width: srcW, height: srcH } = await image.metadata();

    manifest[name] = { width: srcW, height: srcH, src: `/images/${file}` };

    // Never upscale: a 1600px source should not produce a 2400px variant.
    const widths = WIDTHS.filter((w) => w <= srcW);
    if (widths.length === 0) widths.push(srcW);

    for (const w of widths) {
      for (const { ext, options } of FORMATS) {
        const out = join(OUT, `${name}-${w}.${ext}`);
        await sharp(input).resize({ width: w })[ext](options).toFile(out);
      }
    }

    console.log(`[images] ${file} → ${widths.length * FORMATS.length} variants`);
  }

  // The manifest is committed (unlike the binary variants) so that typecheck
  // and build work on a clean checkout before `npm run images` has ever run.
  const json = JSON.stringify({ widths: WIDTHS, images: manifest }, null, 2);
  await writeFile(join(OUT, "manifest.json"), json);
  await writeFile("src/lib/image-manifest.json", json + "\n");
  console.log(`[images] wrote manifest for ${files.length} images`);
}

main().catch((err) => {
  console.error("[images] failed:", err);
  process.exit(1);
});
