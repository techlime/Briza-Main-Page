"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "../effects/reveal";
import { SectionHeading } from "./section-heading";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Anita Desai",
    role: "Operations Manager",
    location: "Hotel Riverside, Panaji",
    quote:
      "Briza 24/7 has been our hydration partner for over a year. The consistency, purity and punctuality are exactly what hospitality demands. Our guests notice the difference.",
    rating: 5,
  },
  {
    name: "Rohan Fernandes",
    role: "Event Planner",
    location: "Margao",
    quote:
      "Whether it's a 500-guest wedding or a last-minute corporate event, Briza shows up — every single time. Their 24/7 promise is genuinely 24/7.",
    rating: 5,
  },
  {
    name: "Sneha Naik",
    role: "Office Admin",
    location: "Vasco Tech Park",
    quote:
      "Switched our entire office supply to Briza. The 20 litre jars are always sealed, always on time, and the team is incredibly responsive. Couldn't ask for more.",
    rating: 5,
  },
  {
    name: "Carlos D'Souza",
    role: "Restaurant Owner",
    location: "Calangute",
    quote:
      "Pure taste matters in a restaurant. Briza's mineral-balanced water is the cleanest my kitchen has worked with. The bottles look premium on every table too.",
    rating: 5,
  },
  {
    name: "Priya Shetty",
    role: "Resident",
    location: "Porvorim",
    quote:
      "I order the 5 litre can for my family every few days. Quick delivery, friendly staff, and water that genuinely tastes fresh. Briza has become a household name for us.",
    rating: 5,
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  const current = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,107,107,0.18)_0%,transparent_55%)]" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved by Goa,{" "}
              <span className="text-gradient-aqua">one sip at a time.</span>
            </>
          }
        />

        <Reveal delay={0.1}>
          <div
            className="relative mt-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative min-h-[280px] overflow-hidden rounded-3xl glass-card p-8 sm:p-12 sm:min-h-[260px]">
              <Quote className="absolute right-8 top-8 h-16 w-16 text-[#00A8B5]/15" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#FFD84D] text-[#FFD84D]" />
                    ))}
                  </div>
                  <p className="mt-5 font-display text-xl leading-relaxed text-white/90 sm:text-2xl">
                    “{current.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#006B6B] to-[#00A8B5] font-display text-sm font-bold text-white">
                      {current.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{current.name}</div>
                      <div className="text-xs text-white/55">
                        {current.role} · {current.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* controls */}
            <div className="mt-5 flex items-center justify-between">
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-8 bg-[#00A8B5]" : "w-3 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full glass text-white transition-colors hover:bg-white/15"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full glass text-white transition-colors hover:bg-white/15"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
