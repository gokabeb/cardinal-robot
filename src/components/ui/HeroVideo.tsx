"use client";

import { useEffect, useState } from "react";

/* A muted looping clip layered *over* the hero still, never replacing it.

   DESIGN.md §5 requires the hero to render without JS, and §6 requires video to
   never block content behind a load. Both hold here because the <Photo> beneath
   stays the largest contentful paint: on a slow connection you get the AVIF
   still immediately and the clip arrives later, or never, without the headline
   or its scrim depending on it.

   Under prefers-reduced-motion the <video> is not mounted at all. That is
   stronger than mounting and pausing — nothing autoplays and nothing downloads.

   `src` is the extensionless base path; WebM is offered first and MP4 is the
   fallback, per §6. */
export function HeroVideo({ src, className }: { src: string; className?: string }) {
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!motionAllowed) return null;

  return (
    <video
      className={`${className ?? ""} transition-opacity duration-700 ease-out ${ready ? "opacity-100" : "opacity-0"}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      tabIndex={-1}
      onCanPlayThrough={() => setReady(true)}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
