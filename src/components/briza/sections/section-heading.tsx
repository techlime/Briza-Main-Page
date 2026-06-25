"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Reveal } from "../effects/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`flex flex-col gap-3 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#00A8B5]/30 bg-[#00A8B5]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#80DEEA]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00A8B5]" />
          {eyebrow}
        </motion.span>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl text-base text-white/60 sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
