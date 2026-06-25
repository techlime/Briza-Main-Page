"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  BadgeIndianRupee,
  Boxes,
  Droplets,
  Gem,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "../effects/reveal";
import { SectionHeading } from "./section-heading";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  { icon: Gem, title: "Added Minerals", description: "Essential minerals re-balanced for taste and wellbeing in every bottle." },
  { icon: ShieldCheck, title: "Safe & Hygienic", description: "Sealed in food-grade packaging under stringent hygiene protocols." },
  { icon: Sparkles, title: "Pure & Refreshing", description: "Crisp, clean taste that revives you with every sip, anytime." },
  { icon: Boxes, title: "Strong Bottle Design", description: "Sturdy, leak-proof bottles engineered for safe transport and storage." },
  { icon: Droplets, title: "RO + UV Purified", description: "Dual-stage purification removes impurities and neutralises pathogens." },
  { icon: RefreshCw, title: "Mineral Balanced", description: "Calibrated TDS and mineral profile for consistently great hydration." },
  { icon: BadgeCheck, title: "Consistent Quality", description: "Lab-tested across 25+ parameters in every batch, no exceptions." },
  { icon: BadgeIndianRupee, title: "Affordable Pricing", description: "Premium purity at honest prices for homes, businesses and events." },
  { icon: Timer, title: "Fast Delivery", description: "Dependable fleet across Goa with 24/7 delivery for urgent needs." },
];

export function WhyChoose() {
  return (
    <section id="why" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid-aqua opacity-30 mask-fade-b" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Briza"
          title={
            <>
              Nine reasons to{" "}
              <span className="text-gradient-aqua">make Briza your daily hydration.</span>
            </>
          }
          subtitle="Premium purity, dependable supply and thoughtful packaging — engineered into every drop we deliver across Goa."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 0.08} as="div">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-2xl glass-card p-6 transition-shadow hover:glow-aqua"
              >
                {/* shimmer */}
                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="absolute -inset-x-10 -top-10 h-40 rotate-12 bg-gradient-to-r from-transparent via-[#00A8B5]/15 to-transparent animate-shimmer" />
                </span>

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#006B6B]/30 to-[#00A8B5]/20 ring-1 ring-[#00A8B5]/30">
                    <feature.icon className="h-6 w-6 text-[#80DEEA]" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {feature.description}
                  </p>
                </div>

                {/* index marker */}
                <span className="absolute right-4 top-4 font-mono text-xs text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
