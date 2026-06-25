"use client";

import { useEffect, useRef } from "react";

/**
 * A full-screen canvas that renders a soft water-ripple trail following
 * the cursor. Performance-tuned with a single rAF loop and capped ripple count.
 */
export function RippleCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Ripple {
      x: number;
      y: number;
      r: number;
      alpha: number;
      hue: number;
    }
    const ripples: Ripple[] = [];
    let lastX = -1;
    let lastY = -1;

    const onMove = (e: MouseEvent) => {
      const dx = lastX < 0 ? 0 : e.clientX - lastX;
      const dy = lastY < 0 ? 0 : e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist > 8 || lastX < 0) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          r: 4,
          alpha: 0.5,
          hue: 185 + Math.random() * 18,
        });
        lastX = e.clientX;
        lastY = e.clientY;
        if (ripples.length > 26) ripples.shift();
      }
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = ripples.length - 1; i >= 0; i--) {
        const p = ripples[i];
        p.r += 1.4;
        p.alpha -= 0.012;
        if (p.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${p.hue}, 90%, 55%, ${p.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
    />
  );
}
