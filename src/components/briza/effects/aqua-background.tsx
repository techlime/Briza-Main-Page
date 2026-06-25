"use client";

import { useEffect, useRef } from "react";

interface AquaBackgroundProps {
  /** density multiplier */
  density?: number;
  className?: string;
}

/**
 * A canvas-based animated background of slowly rising bubbles and drifting
 * aqua particles. Used as a fixed backdrop for the whole page.
 */
export function AquaBackground({ density = 1, className = "" }: AquaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    interface Particle {
      x: number;
      y: number;
      r: number;
      speed: number;
      drift: number;
      driftPhase: number;
      alpha: number;
      bubble: boolean;
    }
    let particles: Particle[] = [];

    const buildParticles = () => {
      const count = Math.floor((width * height) / 26000) * density;
      particles = Array.from({ length: Math.max(28, Math.min(120, count)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.4 + 0.6,
        speed: Math.random() * 0.4 + 0.15,
        drift: Math.random() * 0.7 - 0.35,
        driftPhase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.5 + 0.15,
        bubble: Math.random() > 0.78,
      }));
    };
    buildParticles();

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };
    onResize();
    window.addEventListener("resize", onResize);

    let raf = 0;
    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.speed;
        p.x += Math.sin(t + p.driftPhase) * p.drift * 0.4;
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.bubble) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(128, 222, 234, ${p.alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(p.x - p.r * 0.7, p.y - p.r * 0.7, p.r * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.5})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(77, 208, 225, ${p.alpha})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(render);
    };

    if (!prefersReduced) {
      raf = requestAnimationFrame(render);
    } else {
      // static single frame
      render();
      cancelAnimationFrame(raf);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
    />
  );
}
