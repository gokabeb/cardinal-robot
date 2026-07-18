import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="blueprint-grid flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Eyebrow>Signal lost</Eyebrow>
      <h1 className="font-display text-6xl font-medium text-navy sm:text-8xl">404</h1>
      <p className="max-w-md">This route is not in the fleet map. The page may have moved or never existed.</p>
      <Button href="/">Return home</Button>
    </main>
  );
}
