"use client";

import { motion } from "framer-motion";
import { Home, Info, Package, Server, Truck, Phone } from "lucide-react";
import { useActiveSection } from "@/hooks/use-reveal";

const ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: Info },
  { id: "products", label: "Products", icon: Package },
  { id: "services", label: "Services", icon: Server },
  { id: "delivery", label: "Delivery", icon: Truck },
  { id: "contact", label: "Contact", icon: Phone },
];

export function MobileBottomNav() {
  const active = useActiveSection(ITEMS.map((i) => i.id));

  return (
    <motion.nav
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 26 }}
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
      aria-label="Mobile bottom navigation"
    >
      <div className="mx-auto max-w-md px-3 pb-3">
        <div className="flex items-center justify-between rounded-2xl glass-strong px-2 py-1.5 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.6)]">
          {ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="relative flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium transition-colors"
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-[#006B6B]/40 to-[#00A8B5]/20 ring-1 ring-[#00A8B5]/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`h-5 w-5 ${
                    isActive ? "text-[#80DEEA]" : "text-white/55"
                  }`}
                />
                <span
                  className={
                    isActive ? "text-white" : "text-white/55"
                  }
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
