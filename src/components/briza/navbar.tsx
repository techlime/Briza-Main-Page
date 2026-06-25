"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";
import { useActiveSection } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "delivery", label: "Delivery" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500",
              scrolled
                ? "glass-strong shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)]"
                : "bg-transparent"
            )}
          >
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3" aria-label="BRIZA 24/7 home">
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src="/logo.png"
                  alt="BRIZA 24/7"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="leading-none">
                <div className="font-display text-lg font-extrabold tracking-[0.2em] text-white">
                  BRIZA<span className="text-gradient-gold"> 24/7</span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.35em] text-white/50">
                  Pure Hydration
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active === link.id
                      ? "text-white"
                      : "text-white/65 hover:text-white"
                  )}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#006B6B] to-[#00A8B5] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,168,181,0.6)] transition-all hover:scale-[1.03] hover:shadow-[0_10px_30px_-8px_rgba(0,168,181,0.8)] sm:flex"
              >
                <Phone className="h-4 w-4" />
                Order Now
              </a>
              <button
                onClick={() => setOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full glass text-white lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col glass-strong p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10">
                    <Image
                      src="/logo.png"
                      alt="BRIZA 24/7"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                  <div className="font-display text-lg font-extrabold tracking-[0.2em] text-white">
                    BRIZA<span className="text-gradient-gold"> 24/7</span>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-2" aria-label="Mobile">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className={cn(
                      "rounded-xl px-4 py-3 text-lg font-medium transition-colors",
                      active === link.id
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto space-y-3">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#006B6B] to-[#00A8B5] px-5 py-3.5 font-semibold text-white"
                >
                  <Phone className="h-4 w-4" /> Order Now
                </a>
                <div className="flex gap-2">
                  {BRAND.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:+91${p}`}
                      className="flex-1 rounded-xl border border-white/15 bg-white/5 py-3 text-center text-sm font-medium text-white"
                    >
                      +91 {p}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
