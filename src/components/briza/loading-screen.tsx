"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Premium loading screen: water-drop fill + ripple + logo reveal,
 * then a smooth fade transition out of the viewport.
 */
export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ocean-radial"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          {/* radial glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,168,181,0.18)_0%,rgba(2,28,36,0)_60%)]" />
          </div>

          {/* drop + ripple */}
          <div className="relative flex h-56 w-56 items-center justify-center">
            {/* concentric ripples */}
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute rounded-full border border-[#00A8B5]/40"
                initial={{ width: 60, height: 60, opacity: 0.6 }}
                animate={{ width: [60, 200], height: [60, 200], opacity: [0.6, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* water drop with rising fill */}
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_30px_rgba(0,168,181,0.6)]">
                <defs>
                  <linearGradient id="dropFill" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#006B6B" />
                    <stop offset="60%" stopColor="#00A8B5" />
                    <stop offset="100%" stopColor="#80DEEA" />
                  </linearGradient>
                  <clipPath id="dropClip">
                    <path d="M50 5 C50 5, 90 55, 90 75 A40 40 0 1 1 10 75 C10 55, 50 5, 50 5 Z" />
                  </clipPath>
                </defs>
                {/* drop outline */}
                <path
                  d="M50 5 C50 5, 90 55, 90 75 A40 40 0 1 1 10 75 C10 55, 50 5, 50 5 Z"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(0,168,181,0.5)"
                  strokeWidth="1.5"
                />
                {/* rising water fill */}
                <g clipPath="url(#dropClip)">
                  <motion.rect
                    x="-10"
                    width="120"
                    initial={{ y: 110 }}
                    animate={{ y: 110 - (110 * progress) / 100 }}
                    transition={{ ease: "linear" }}
                    height="120"
                    fill="url(#dropFill)"
                  />
                  {/* wave on top of fill */}
                  <motion.path
                    d="M -20 8 Q 15 0 50 8 T 120 8 L 120 30 L -20 30 Z"
                    fill="#80DEEA"
                    initial={{ y: 110 }}
                    animate={{ y: 110 - (110 * progress) / 100 }}
                    opacity={0.55}
                  />
                </g>
                {/* shine */}
                <ellipse cx="38" cy="55" rx="6" ry="14" fill="rgba(255,255,255,0.35)" />
              </svg>
            </div>
          </div>

          {/* logo */}
          <motion.div
            className="mt-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="relative h-16 w-16">
              <Image
                src="/logo.png"
                alt="BRIZA 24/7 logo"
                fill
                sizes="64px"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-3 font-display text-2xl font-extrabold tracking-[0.3em] text-white">
              BRIZA
              <span className="text-gradient-gold"> 24/7</span>
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.4em] text-white/50">
              Pure Hydration
            </div>
          </motion.div>

          {/* progress bar */}
          <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#006B6B] via-[#00A8B5] to-[#FFD84D]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 font-mono text-xs tracking-widest text-white/60">
            {progress.toString().padStart(3, "0")}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
