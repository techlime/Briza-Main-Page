"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Truck } from "lucide-react";
import { useState } from "react";
import { GOA_ZONES } from "@/lib/brand";
import { Reveal } from "../effects/reveal";
import { SectionHeading } from "./section-heading";

export function DeliveryGoa() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="delivery" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,168,181,0.15)_0%,transparent_55%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: copy */}
          <div>
            <SectionHeading
              eyebrow="Delivery Across Goa"
              align="left"
              title={
                <>
                  Reaching every{" "}
                  <span className="text-gradient-aqua">beach, town & village.</span>
                </>
              }
              subtitle="From Panaji to Canacona, Briza 24/7 operates a dependable delivery network with chilled, sealed bottles ready when you need them."
            />

            <Reveal delay={0.15}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { label: "Service zones", value: "15+" },
                  { label: "Avg. response", value: "< 60 min" },
                  { label: "Fleet vehicles", value: "24/7" },
                  { label: "Coverage", value: "State-wide" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl glass-card p-4"
                  >
                    <div className="font-display text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#006B6B] to-[#00A8B5] px-6 py-3 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(0,168,181,0.7)] transition-transform hover:scale-[1.03]"
                >
                  <Truck className="h-4 w-4" /> Check my area
                </a>
                <span className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm text-white/75">
                  <Navigation className="h-4 w-4 text-[#FFD84D]" />
                  Hover a pin to explore
                </span>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: stylised map */}
          <Reveal delay={0.2}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl glass-card p-5 sm:aspect-[5/5]">
              {/* dark aqua map background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,168,181,0.18)_0%,transparent_45%),radial-gradient(circle_at_70%_80%,rgba(0,107,107,0.25)_0%,transparent_50%)]" />
              <div className="absolute inset-0 bg-grid-aqua opacity-40" />

              {/* stylised Goa landmass (simplified) */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="goaLand" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(0,168,181,0.22)" />
                    <stop offset="100%" stopColor="rgba(0,107,107,0.32)" />
                  </linearGradient>
                </defs>
                <path
                  d="M38 4 Q44 6 46 12 L52 16 Q56 22 60 26 L66 30 Q70 38 64 44 L62 50 Q66 56 62 62 L58 68 Q60 76 56 82 L50 88 Q44 86 42 80 L40 72 Q36 66 40 60 L38 52 Q34 46 38 40 L36 32 Q32 26 36 20 L34 12 Q36 6 38 4 Z"
                  fill="url(#goaLand)"
                  stroke="rgba(0,168,181,0.55)"
                  strokeWidth="0.5"
                />
                {/* coastline glow */}
                <path
                  d="M38 4 Q44 6 46 12 L52 16 Q56 22 60 26 L66 30 Q70 38 64 44 L62 50 Q66 56 62 62 L58 68 Q60 76 56 82 L50 88 Q44 86 42 80 L40 72 Q36 66 40 60 L38 52 Q34 46 38 40 L36 32 Q32 26 36 20 L34 12 Q36 6 38 4 Z"
                  fill="none"
                  stroke="rgba(128,222,234,0.5)"
                  strokeWidth="0.3"
                  style={{ filter: "blur(1.5px)" }}
                />
              </svg>

              {/* zone markers */}
              {GOA_ZONES.map((zone, i) => (
                <motion.button
                  key={zone.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                  onMouseEnter={() => setHovered(zone.name)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(zone.name)}
                  onBlur={() => setHovered(null)}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.04, type: "spring", stiffness: 260, damping: 18 }}
                  aria-label={`Delivery zone: ${zone.name}`}
                >
                  {/* pulsing ring */}
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span
                      className={`block rounded-full ${
                        zone.major ? "h-5 w-5 bg-[#00A8B5]/40" : "h-3.5 w-3.5 bg-[#80DEEA]/40"
                      } animate-ripple`}
                    />
                  </span>
                  <span
                    className={`relative block rounded-full ${
                      zone.major ? "h-3.5 w-3.5" : "h-2.5 w-2.5"
                    } ${
                      hovered === zone.name
                        ? "bg-[#FFD84D] shadow-[0_0_14px_4px_rgba(255,216,77,0.7)]"
                        : "bg-[#00A8B5] shadow-[0_0_10px_3px_rgba(0,168,181,0.6)]"
                    }`}
                  />
                  {/* label */}
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={
                      hovered === zone.name
                        ? { opacity: 1, y: 0 }
                        : { opacity: zone.major ? 0.85 : 0, y: 4 }
                    }
                    className={`absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#021C24]/90 px-2 py-0.5 text-[10px] font-medium text-white ring-1 ring-white/10`}
                  >
                    {zone.name}
                  </motion.span>
                </motion.button>
              ))}

              {/* legend */}
              <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 rounded-xl glass-strong px-3 py-2 text-[10px] text-white/70">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00A8B5]" /> Major hub
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#80DEEA]" /> Delivery zone
                </span>
              </div>

              {/* floating truck icon */}
              <motion.div
                className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-[#FFD84D]/15 px-3 py-1.5 text-[11px] font-semibold text-[#FFD84D] ring-1 ring-[#FFD84D]/30"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Truck className="h-3.5 w-3.5" /> Live delivery
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
