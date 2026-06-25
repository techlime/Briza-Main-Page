"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  Clock,
  Hotel,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "../effects/reveal";
import { SectionHeading } from "./section-heading";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    icon: Clock,
    title: "24/7 Supply & Delivery",
    description: "Round-the-clock hydration support across Goa — day or night, we deliver.",
  },
  {
    icon: Building2,
    title: "Bulk & Corporate Supply",
    description: "Volume contracts for offices, factories and campuses with SLA-backed reliability.",
  },
  {
    icon: Store,
    title: "Fast Delivery Across Goa",
    description: "A dependable fleet reaching every corner of the state, on schedule.",
  },
];

const SECONDARY: { icon: LucideIcon; label: string }[] = [
  { icon: Hotel, label: "Hotels" },
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: Calendar, label: "Events" },
  { icon: Building2, label: "Offices" },
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#006B6B]/15 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Always on. <span className="text-gradient-aqua">Always delivering.</span>
            </>
          }
          subtitle="A hydration partner built for Goa's pace — from late-night events to early-morning offices."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl glass-card p-7"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#00A8B5]/20 blur-2xl" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#006B6B]/40 to-[#00A8B5]/20 ring-1 ring-[#00A8B5]/30">
                  <service.icon className="h-7 w-7 text-[#80DEEA]" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {service.description}
                </p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-[#00A8B5]/40 to-transparent" />
                <span className="mt-3 inline-block font-mono text-xs text-white/30">
                  0{i + 1} / 03
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* secondary service chips */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-white/50">We also supply to:</span>
            {SECONDARY.map((item) => (
              <motion.span
                key={item.label}
                whileHover={{ y: -3 }}
                className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-white/85"
              >
                <item.icon className="h-4 w-4 text-[#FFD84D]" />
                {item.label}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
