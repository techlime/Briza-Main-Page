"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span";
}

/**
 * A reusable scroll-reveal wrapper using Framer Motion + IntersectionObserver.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 36,
  once = true,
  as = "div",
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ once });

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
