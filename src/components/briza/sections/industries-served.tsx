"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  Hotel,
  Store,
  UtensilsCrossed,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "../effects/reveal";
import { SectionHeading } from "./section-heading";

interface IndustryItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const INDUSTRIES: IndustryItem[] = [
  { icon: Hotel, title: "Hotels", description: "Premium in-room and F&B hydration for hospitality brands across Goa." },
  { icon: UtensilsCrossed, title: "Restaurants", description: "Pure, consistent water for dining service and kitchen use." },
  { icon: Briefcase, title: "Offices", description: "Reliable dispenser supply that keeps teams refreshed all day." },
  { icon: Calendar, title: "Events", description: "High-volume, on-time delivery for weddings, festivals and conferences." },
  { icon: Building2, title: "Corporate", description: "Tailored SLA-backed contracts for campuses and corporate parks." },
  { icon: Store, title: "Retail", description: "Shelf-ready 250ml–1000ml bottles for stores and kiosks statewide." },
];

export function IndustriesServed() {
  return (
    <section id="industries" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries Served"
          title={
            <>
              Trusted across{" "}
              <span className="text-gradient-aqua">Goa's busiest spaces.</span>
            </>
          }
          subtitle="From boutique hotels to large-scale events, Briza 24/7 powers hydration for the people who keep Goa moving."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((item, i) => (
            <Reveal key={item.title} delay={(i % 6) * 0.06}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl glass-card p-5 text-center"
              >
                <div className="pointer-events-none absolute -top-6 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-[#00A8B5]/25 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#006B6B]/40 to-[#00A8B5]/20 ring-1 ring-[#00A8B5]/30"
                >
                  <item.icon className="h-7 w-7 text-[#80DEEA]" />
                </motion.div>
                <h3 className="mt-4 font-display text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/55">
                  {item.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
