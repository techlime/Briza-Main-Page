"use client";

import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Droplets,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

const FOOTER_LINKS = {
  Products: [
    { label: "250ml", href: "#products" },
    { label: "500ml", href: "#products" },
    { label: "1000ml", href: "#products" },
    { label: "5 Litre", href: "#products" },
    { label: "20 Litre", href: "#products" },
  ],
  Services: [
    { label: "24/7 Supply", href: "#services" },
    { label: "Bulk & Corporate", href: "#bulk" },
    { label: "Fast Delivery", href: "#delivery" },
    { label: "Events & Hotels", href: "#industries" },
  ],
  Company: [
    { label: "About Briza", href: "#about" },
    { label: "Why Choose Us", href: "#why" },
    { label: "Purification", href: "#process" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  QuickLinks: [
    { label: "Order Now", href: "#contact" },
    { label: "Bulk Enquiry", href: "#bulk" },
    { label: "Delivery Areas", href: "#delivery" },
    { label: "Contact", href: "#contact" },
  ],
};

const SOCIALS = [
  { icon: Facebook, href: "https://facebook.com/briza247", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/briza247", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/briza247", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/briza247", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 glass-strong">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full bg-[#00A8B5]/15 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand block */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#home" className="flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/logo.png"
                  alt="BRIZA 24/7 logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="leading-none">
                <div className="font-display text-xl font-extrabold tracking-[0.2em] text-white">
                  BRIZA<span className="text-gradient-gold"> 24/7</span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.35em] text-white/50">
                  Pure Hydration
                </div>
              </div>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              {BRAND.tagline} Premium packaged drinking water, RO + UV purified
              and mineral-balanced — delivered across Goa, any hour, every day.
            </p>

            <div className="mt-5 space-y-2 text-sm text-white/65">
              <a href={`tel:+91${BRAND.phones[0]}`} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-[#00A8B5]" /> +91 {BRAND.phones[0]} / {BRAND.phones[1]}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-[#00A8B5]" /> {BRAND.email}
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#00A8B5]" /> {BRAND.location}
              </div>
            </div>

            {/* socials */}
            <div className="mt-5 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full glass text-white/70 transition-all hover:bg-[#00A8B5]/20 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#80DEEA]">
                {heading}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* divider */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} BRIZA 24/7. All rights reserved. ·{" "}
            <span className="text-white/35">Pure Hydration. Anytime. Everytime.</span>
          </p>
          <div className="flex items-center gap-2 text-xs text-white/45">
            <Droplets className="h-3.5 w-3.5 text-[#00A8B5]" />
            Crafted in Goa, India
          </div>
        </div>
      </div>
    </footer>
  );
}
