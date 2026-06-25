"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";

const HeroBottle = dynamic(
  () => import("../three/hero-bottle").then((m) => m.HeroBottle),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-48 w-24 animate-pulse rounded-full bg-gradient-to-b from-[#00A8B5]/40 to-transparent" />
      </div>
    ),
  }
);

export function Hero() {
  const pointer = useMouseParallax();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* Light rays */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-0 h-[80vh] w-[40vw] -translate-x-1/2 animate-light-ray bg-[conic-gradient(from_180deg_at_50%_0%,transparent_0deg,rgba(0,168,181,0.18)_30deg,transparent_60deg)] opacity-50" />
        <div className="absolute left-[30%] top-0 h-[70vh] w-[20vw] animate-light-ray bg-[conic-gradient(from_180deg_at_50%_0%,transparent_0deg,rgba(255,216,77,0.12)_25deg,transparent_50deg)]" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* radial vignette */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,28,36,0.6)_100%)]" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-4 lg:px-8">
        {/* LEFT: copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="relative z-10 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-white/80"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#FFD84D]" />
            Packaged Drinking Water · Goa, India
          </motion.div>

          <h1 className="font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
            <span className="block">BRIZA</span>
            <span className="block text-gradient-gold">24/7</span>
          </h1>

          <div className="mt-6 space-y-1.5">
            <p className="font-display text-xl font-semibold tracking-[0.15em] text-white sm:text-2xl">
              PURE HYDRATION.
            </p>
            <p className="font-display text-xl font-semibold tracking-[0.15em] text-gradient-aqua sm:text-2xl">
              ANYTIME. EVERYTIME.
            </p>
          </div>

          <p className="mx-auto mt-5 max-w-md text-base text-white/60 lg:mx-0">
            {BRAND.secondaryTagline}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start sm:justify-center">
            <a
              href="#contact"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#006B6B] to-[#00A8B5] px-7 py-3.5 font-semibold text-white shadow-[0_12px_36px_-10px_rgba(0,168,181,0.7)] transition-all hover:scale-[1.03] sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              <Droplets className="h-4 w-4" />
              Order Now
            </a>
            <a
              href="#products"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition-all hover:border-[#00A8B5]/60 hover:bg-white/10 sm:w-auto"
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* mini stats strip */}
          <div className="mt-10 flex items-center justify-center gap-6 lg:justify-start">
            {[
              { v: "24/7", l: "Delivery" },
              { v: "RO+UV", l: "Purified" },
              { v: "100%", l: "Mineral Balanced" },
            ].map((s) => (
              <div key={s.l} className="text-center lg:text-left">
                <div className="font-display text-xl font-bold text-white">{s.v}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/45">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: 3D bottle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="relative z-10 h-[50vh] sm:h-[60vh] lg:h-[78vh]"
          style={{
            transform: `translate3d(${pointer.x * 12}px, ${pointer.y * -12}px, 0)`,
          }}
        >
          {/* glow behind bottle */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,168,181,0.35)_0%,transparent_70%)] blur-2xl" />
          {/* floor reflection */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 h-16 w-2/3 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(0,168,181,0.25)_0%,transparent_70%)] blur-md" />

          <HeroBottle pointer={pointer} className="h-full w-full" />

          {/* ripple rings at base */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -z-0 h-10 w-40 -translate-x-1/2">
            <span className="absolute inset-0 m-auto h-px w-40 animate-ripple rounded-full bg-[#00A8B5]/50" />
            <span className="absolute inset-0 m-auto h-px w-40 animate-ripple rounded-full bg-[#00A8B5]/40" style={{ animationDelay: "1.3s" }} />
          </div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            className="h-2 w-1 rounded-full bg-[#00A8B5]"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
      </motion.a>
    </section>
  );
}
