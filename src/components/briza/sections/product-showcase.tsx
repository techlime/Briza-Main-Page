"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, Minus, Package, Plus, ShoppingCart, Sparkles, X } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/brand";
import { Reveal } from "../effects/reveal";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

export function ProductShowcase() {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <section id="products" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[#00A8B5]/15 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Range"
          title={
            <>
              Five sizes. <span className="text-gradient-aqua">One standard of purity.</span>
            </>
          }
          subtitle="From pocket-friendly 250ml bottles to 20 litre dispenser jars, every Briza product is RO + UV purified and mineral balanced."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 0.08}>
              <motion.button
                onClick={() => setActive(product)}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={cn(
                  "group relative flex h-full w-full flex-col items-center overflow-hidden rounded-3xl glass-card p-6 text-left transition-shadow hover:glow-aqua",
                  product.highlight && "ring-1 ring-[#FFD84D]/40"
                )}
              >
                {/* highlight badge */}
                {product.highlight && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#FFD84D]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FFD84D]">
                    <Sparkles className="h-3 w-3" /> Popular
                  </span>
                )}

                {/* glow */}
                <div className="pointer-events-none absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-[#00A8B5]/20 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />

                {/* image */}
                <div className="relative flex h-56 w-full items-end justify-center">
                  <div className="pointer-events-none absolute bottom-0 h-3 w-32 rounded-[50%] bg-black/40 blur-md" />
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: -1.5 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="relative h-52 w-auto"
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name} — ${product.capacity} packaged drinking water`}
                      fill
                      sizes="(max-width: 768px) 60vw, 240px"
                      className="object-contain drop-shadow-[0_18px_30px_rgba(0,168,181,0.35)]"
                    />
                  </motion.div>
                  {/* water reflection */}
                  <div className="pointer-events-none absolute bottom-2 h-10 w-24 rounded-[50%] bg-[radial-gradient(ellipse,rgba(0,168,181,0.45)_0%,transparent_70%)] blur-sm opacity-60 transition-opacity group-hover:opacity-90" />
                </div>

                {/* content */}
                <div className="mt-2 w-full">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {product.name}
                    </h3>
                    <span className="rounded-full bg-[#00A8B5]/15 px-2.5 py-0.5 text-xs font-semibold text-[#80DEEA]">
                      {product.capacity}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#FFD84D]/90">{product.tagline}</p>

                  <ul className="mt-4 space-y-1.5">
                    {product.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-white/60">
                        <Check className="h-3.5 w-3.5 shrink-0 text-[#00A8B5]" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                      View details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#006B6B] to-[#00A8B5] text-white shadow-[0_6px_18px_-6px_rgba(0,168,181,0.7)]">
                      <ShoppingCart className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}

          {/* CTA card */}
          <Reveal delay={0.16}>
            <a
              href="#bulk"
              className="group flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border border-[#FFD84D]/30 bg-gradient-to-br from-[#FFD84D]/15 via-[#00A8B5]/10 to-transparent p-6 transition-all hover:glow-gold"
            >
              <div>
                <Package className="h-8 w-8 text-[#FFD84D]" />
                <h3 className="mt-4 font-display text-2xl font-bold text-white">
                  Need bulk supply?
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Corporate, hotel, event and office enquiries — get a tailored
                  quote and reliable 24/7 delivery across Goa.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[#FFD84D]">
                Request a quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [qty, setQty] = useState(1);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl glass-strong md:grid-cols-2"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            {/* image */}
            <div className="relative flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(0,168,181,0.18)_0%,transparent_70%)] p-8">
              <div className="pointer-events-none absolute bottom-8 h-4 w-40 rounded-[50%] bg-black/50 blur-md" />
              <motion.div
                initial={{ rotate: -8, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 120, damping: 14 }}
                className="relative h-72 w-auto sm:h-96"
              >
                <Image
                  src={product.image}
                  alt={`${product.name} — ${product.capacity}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 360px"
                  className="object-contain drop-shadow-[0_24px_40px_rgba(0,168,181,0.45)]"
                />
              </motion.div>
            </div>

            {/* details */}
            <div className="flex max-h-[90vh] flex-col overflow-y-auto p-7 sm:p-8">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#00A8B5]/15 px-3 py-1 text-xs font-semibold text-[#80DEEA]">
                {product.capacity}
              </span>
              <h3 className="mt-3 font-display text-3xl font-bold text-white">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-[#FFD84D]">{product.tagline}</p>

              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {product.description}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <DetailBlock title="Usage" body={product.usage} />
                <DetailBlock title="Suitable for" body={product.suitableFor} />
              </div>

              <div className="mt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/45">
                  Key features
                </h4>
                <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/75">
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#00A8B5]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* quantity + order */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold text-white">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(999, q + 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#006B6B] to-[#00A8B5] px-6 py-3 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(0,168,181,0.7)] transition-transform hover:scale-[1.02]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Order {qty} × {product.capacity}
                </a>
              </div>
              <p className="mt-3 text-xs text-white/40">
                Bulk ordering available — tap order to confirm quantity with our team.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-[#80DEEA]">
        {title}
      </div>
      <p className="mt-1 text-sm text-white/70">{body}</p>
    </div>
  );
}
