import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="surface-dark flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Eyebrow tone="dark">Signal lost</Eyebrow>
      <h1 className="font-display text-6xl font-semibold text-white sm:text-8xl">404</h1>
      <p className="max-w-md text-white/70">This route is not in the fleet map. The page may have moved or never existed.</p>
      {/* Solid cardinal-600 on navy is ~1.8:1 — the same white-on-navy button
          the CTA panel uses is the only one that holds up here. */}
      <Button href="/" className="bg-white text-navy hover:bg-cardinal-50">Return home</Button>
    </main>
  );
}
