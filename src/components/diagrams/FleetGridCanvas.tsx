"use client";
import { useEffect, useRef } from "react";
import { US_DOT_GRID, HUBS } from "./us-dots";

export function FleetGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();

    const hubSet = new Set(HUBS.map(([c, r]) => `${c},${r}`));
    const rows = US_DOT_GRID.length;
    const cols = US_DOT_GRID[0].length;

    const draw = (t: number) => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      const cell = Math.min(w / (cols + 4), h / (rows + 4));
      const ox = (w - cols * cell) / 2;
      const oy = (h - rows * cell) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (US_DOT_GRID[r][c] !== "#") continue;
          const x = ox + c * cell + cell / 2;
          const y = oy + r * cell + cell / 2;
          const isHub = hubSet.has(`${c},${r}`);
          const phase = (c * 7 + r * 13) % 100;
          const pulse = reduce ? 0.5 : 0.35 + 0.35 * Math.sin(t / 900 + phase);
          ctx.beginPath();
          ctx.arc(x, y, isHub ? cell * 0.14 : cell * 0.08, 0, Math.PI * 2);
          ctx.fillStyle = isHub
            ? `rgba(214, 69, 61, ${0.5 + pulse * 0.5})`
            : `rgba(245, 245, 244, ${0.06 + pulse * 0.12})`;
          ctx.fill();
        }
      }
      if (!reduce && running) raf = requestAnimationFrame(draw);
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) schedule();
    });
    io.observe(canvas);

    const onResize = () => {
      resize();
      if (running) schedule();
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full opacity-70" />;
}
