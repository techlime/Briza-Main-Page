"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks the global mouse position (normalised -1..1 around viewport centre)
 * for parallax effects. Throttled via rAF for performance.
 */
export function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      setPos((prev) => ({
        x: prev.x + (target.current.x - prev.x) * 0.08,
        y: prev.y + (target.current.y - prev.y) * 0.08,
      }));
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return pos;
}
