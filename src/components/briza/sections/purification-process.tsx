"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  Filter,
  Gem,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { PURIFICATION_STAGES } from "@/lib/brand";
import { Reveal } from "../effects/reveal";
import { SectionHeading } from "./section-heading";

const ICONS: Record<string, LucideIcon> = {
  droplets: Droplets,
  filter: Filter,
  sparkles: Sparkles,
  gem: Gem,
  "shield-check": ShieldCheck,
  package: Package,
  truck: Truck,
};

export function PurificationProcess() {
  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,107,107,0.18)_0%,transparent_55%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Purification Process"
          title={
            <>
              From source to sip —{" "}
              <span className="text-gradient-aqua">seven stages of pure.</span>
            </>
          }
          subtitle="Every bottle of Briza passes through a rigorous, lab-verified purification journey before it reaches you."
        />

        {/* Desktop horizontal timeline */}
        <div className="relative mt-16 hidden lg:block">
          {/* flowing line */}
          <div className="absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-[#00A8B5]/40 to-transparent" />
          {/* animated droplet travelling along the line */}
          <motion.div
            className="absolute top-12 h-3 w-3 -translate-y-1/2 rounded-full bg-[#80DEEA] shadow-[0_0_16px_4px_rgba(0,168,181,0.7)]"
            initial={{ left: "0%" }}
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-7 gap-3">
            {PURIFICATION_STAGES.map((stage, i) => {
              const Icon = ICONS[stage.icon] ?? Droplets;
              return (
                <Reveal key={stage.step} delay={i * 0.08}>
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      whileHover={{ scale: 1.08, y: -4 }}
                      className="relative flex h-24 w-24 items-center justify-center rounded-full glass-card ring-1 ring-[#00A8B5]/30"
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,168,181,0.25)_0%,transparent_70%)]" />
                      <Icon className="h-9 w-9 text-[#80DEEA]" />
                      <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD84D] to-[#FFB300] font-mono text-[11px] font-bold text-[#021C24]">
                        {stage.step}
                      </span>
                    </motion.div>
                    <h3 className="mt-4 font-display text-sm font-semibold text-white">
                      {stage.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">
                      {stage.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-[#00A8B5]/40 via-[#00A8B5]/20 to-transparent" />
          <div className="space-y-5">
            {PURIFICATION_STAGES.map((stage, i) => {
              const Icon = ICONS[stage.icon] ?? Droplets;
              return (
                <Reveal key={stage.step} delay={i * 0.05}>
                  <div className="relative flex items-start gap-4">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full glass-card ring-1 ring-[#00A8B5]/30">
                      <Icon className="h-6 w-6 text-[#80DEEA]" />
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD84D] to-[#FFB300] font-mono text-[10px] font-bold text-[#021C24]">
                        {stage.step}
                      </span>
                    </div>
                    <div className="flex-1 rounded-2xl glass-card p-4">
                      <h3 className="font-display text-base font-semibold text-white">
                        {stage.title}
                      </h3>
                      <p className="mt-1 text-sm text-white/55">{stage.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
