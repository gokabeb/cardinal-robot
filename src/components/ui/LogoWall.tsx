"use client";
import { useState } from "react";
import { clients, type Client } from "@/data/clients";
import { Marquee } from "@/components/motion/Marquee";
import { cn } from "@/lib/cn";

const TOKEN = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;

if (!TOKEN && process.env.NODE_ENV !== "production") {
  // Silent degradation here is expensive: the whole wall turns into text and
  // nobody notices until it is live. Make it loud in dev and in CI builds.
  console.warn(
    "[LogoWall] NEXT_PUBLIC_LOGO_DEV_TOKEN is not set — every client cell will " +
      "render the wordmark fallback instead of a brand mark. Set it in .env.local.",
  );
}

function logoUrl(domain: string): string | null {
  if (!TOKEN) return null;
  return `https://img.logo.dev/${domain}?token=${TOKEN}&format=png&size=160`;
}

/** One brand cell: CDN logo (grayscale at rest, color pop on hover) with a
 *  wordmark fallback so the wall never shows a broken image. Fixed height
 *  prevents layout shift when a logo fails.
 *
 *  The fallback has to look like a decision, not like a failed image. Without
 *  NEXT_PUBLIC_LOGO_DEV_TOKEN every cell renders it, so a wall of small grey
 *  text reads as placeholder and undercuts the claim above it. Set at wordmark
 *  scale in navy instead: still clearly typographic, but deliberate. */
function LogoCell({ client }: { client: Client }) {
  const [failed, setFailed] = useState(false);
  const url = logoUrl(client.domain);
  return (
    <div className="group relative flex h-20 items-center justify-center px-8">
      {url && !failed ? (
        <img
          src={url}
          alt={client.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-8 w-auto max-w-[128px] object-contain opacity-55 grayscale transition-all duration-200 ease-out group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : (
        <span className="whitespace-nowrap font-display text-base font-semibold tracking-[-0.015em] text-navy/55 transition-colors duration-200 ease-out group-hover:text-navy">
          {client.name}
        </span>
      )}
      {url && !failed && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-paper px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-navy opacity-0 shadow-sm transition-all duration-200 ease-out group-hover:-translate-y-3 group-hover:opacity-100"
        >
          {client.name}
        </span>
      )}
    </div>
  );
}

export function LogoWall({ compact = false, className }: { compact?: boolean; className?: string }) {
  if (compact) {
    return (
      <Marquee pauseOnHover duration={48} className={className}>
        {clients.map((c) => <LogoCell key={c.domain} client={c} />)}
      </Marquee>
    );
  }
  const mid = Math.ceil(clients.length / 2);
  return (
    <div className={className}>
      {/* Desktop: static grid — a wall, not a carnival */}
      <div className="hidden flex-wrap items-center justify-center gap-x-2 gap-y-4 sm:flex">
        {clients.map((c) => <LogoCell key={c.domain} client={c} />)}
      </div>
      {/* Mobile: two slow counter-rows */}
      <div className={cn("space-y-2 sm:hidden")}>
        <Marquee pauseOnHover duration={56}>
          {clients.slice(0, mid).map((c) => <LogoCell key={c.domain} client={c} />)}
        </Marquee>
        <Marquee pauseOnHover duration={64}>
          {clients.slice(mid).map((c) => <LogoCell key={c.domain} client={c} />)}
        </Marquee>
      </div>
    </div>
  );
}
