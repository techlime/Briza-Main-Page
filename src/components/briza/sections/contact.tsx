"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Reveal } from "../effects/reveal";
import { SectionHeading } from "./section-heading";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,168,181,0.18)_0%,transparent_55%)]" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              For orders & enquiries,{" "}
              <span className="text-gradient-aqua">we're a call away.</span>
            </>
          }
          subtitle="Reach the Briza 24/7 team directly — order water, request bulk supply, or ask anything. We respond fast."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BRAND.phones.map((phone, i) => (
            <Reveal key={phone} delay={i * 0.1}>
              <a
                href={`tel:+91${phone}`}
                className="group flex items-center gap-4 overflow-hidden rounded-2xl glass-card p-6 transition-all hover:glow-aqua"
              >
                <motion.div
                  whileHover={{ rotate: 8 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#006B6B] to-[#00A8B5] ring-1 ring-[#00A8B5]/40"
                >
                  <Phone className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50">
                    Call {i === 0 ? "Now" : "Us"}
                  </div>
                  <div className="font-display text-2xl font-bold text-white">
                    +91 {phone}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ContactCard icon={MessageCircle} label="WhatsApp" value="Chat with us" href={`https://wa.me/${BRAND.whatsapp}`} highlight />
            <ContactCard icon={Mail} label="Email" value={BRAND.email} href={`mailto:${BRAND.email}`} />
            <ContactCard icon={MapPin} label="Location" value={BRAND.location} />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-3xl glass-strong p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <Clock className="h-8 w-8 text-[#FFD84D]" />
              <div>
                <div className="font-display text-xl font-bold text-white">
                  24/7 Delivery across Goa
                </div>
                <div className="text-sm text-white/55">
                  Late-night event? Early-morning office? We've got you.
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`tel:+91${BRAND.phones[0]}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#006B6B] to-[#00A8B5] px-6 py-3 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(0,168,181,0.7)] transition-transform hover:scale-[1.03]"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)] transition-transform hover:scale-[1.03]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  highlight?: boolean;
}) {
  const inner = (
    <div
      className={`flex h-full items-center gap-4 rounded-2xl p-5 transition-all ${
        highlight
          ? "bg-[#25D366]/10 ring-1 ring-[#25D366]/40 hover:glow-aqua"
          : "glass-card hover:ring-1 hover:ring-white/15"
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
        <Icon className={`h-5 w-5 ${highlight ? "text-[#25D366]" : "text-[#80DEEA]"}`} />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-white/50">{label}</div>
        <div className="font-semibold text-white">{value}</div>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  }
  return inner;
}
