import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Cardinal",
  robots: { index: false },
  alternates: { canonical: "/why-cardinal/" },
};

export default function AboutRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/why-cardinal/" />
      <section className="section mx-auto max-w-3xl px-6 pt-32">
        <p className="text-copy">
          This page has moved to <Link href="/why-cardinal" className="text-cardinal-600">Why Cardinal</Link>.
        </p>
      </section>
    </>
  );
}
