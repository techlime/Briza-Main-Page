"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { Droplets, MapPin, ShieldCheck, Truck, Users } from "lucide-react";
import { STATS } from "@/lib/brand";
import { Reveal } from "../effects/reveal";
import { SectionHeading } from "./section-heading";

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 2000, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (ref.current) {
        const formatted = Math.round(latest).toLocaleString("en-IN");
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
    return () => unsub();
  }, [spring, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const ICONS = [Users, Truck, ShieldCheck, MapPin];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#006B6B]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-[#00A8B5]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: copy */}
          <div>
            <SectionHeading
              eyebrow="About Briza"
              align="left"
              title={
                <>
                  Crafted for the{" "}
                  <span className="text-gradient-aqua">Real Taste of Water.</span>
                </>
              }
            />
            <Reveal delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-white/70">
                Briza 24/7 delivers safe, hygienic and mineral-balanced drinking
                water across Goa with reliable supply services. Every drop is
                RO + UV purified, lab-tested and sealed in food-grade packaging —
                so hydration is never a question of time.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-4 text-base leading-relaxed text-white/55">
                From a quick 250ml on the go to 20 litre jars powering offices
                and hotels, Briza 24/7 is built for the way Goa lives, works and
                celebrates — any hour, every day.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Goa-wide delivery",
                  "Lab-tested purity",
                  "Added minerals",
                  "24/7 supply",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-white/80"
                  >
                    <Droplets className="h-3.5 w-3.5 text-[#00A8B5]" />
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT: stats grid */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {STATS.map((stat, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -6 }}
                    className="aqua-border group relative overflow-hidden rounded-2xl glass-card p-6"
                  >
                    <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#00A8B5]/20 blur-2xl transition-opacity group-hover:opacity-100" />
                    <Icon className="h-7 w-7 text-[#00A8B5]" />
                    <div className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
                      <AnimatedNumber
                        value={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                      />
                    </div>
                    <div className="mt-1 text-sm text-white/55">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
