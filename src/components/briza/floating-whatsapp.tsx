"use client";

import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3"
    >
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-64 overflow-hidden rounded-2xl glass-strong p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">BRIZA 24/7</div>
                <div className="text-[10px] text-[#25D366]">● Online now</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/50 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 rounded-2xl rounded-tl-sm bg-white/10 p-3 text-xs text-white/85">
            Hi there! 👋 Need water delivered? Send us a message and our team will
            respond right away.
          </p>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
              "Hi Briza 24/7, I'd like to order water."
            )}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="h-4 w-4" /> Start chat
          </a>
        </motion.div>
      )}

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)]"
        aria-label="Open WhatsApp chat"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </motion.button>
    </motion.div>
  );
}
