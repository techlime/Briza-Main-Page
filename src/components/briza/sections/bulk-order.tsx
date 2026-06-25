"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Hotel,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { Reveal } from "../effects/reveal";
import { SectionHeading } from "./section-heading";

const SUPPLY_TYPES = [
  { icon: Building2, label: "Corporate Supply" },
  { icon: Calendar, label: "Event Supply" },
  { icon: Hotel, label: "Hotel Supply" },
  { icon: Building2, label: "Office Supply" },
];

const REQUIREMENTS = ["250ml", "500ml", "1000ml", "5 Litre", "20 Litre", "Mixed"];

export function BulkOrder() {
  const [selected, setSelected] = useState("Corporate Supply");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    requirement: "20 Litre",
    quantity: "",
    message: "",
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.phone || !form.quantity) {
      setError("Please fill in your name, phone and quantity.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/bulk-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          message: `${selected} — ${form.message}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error ?? "Submission failed");
      }
      setSuccess(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        location: "",
        requirement: "20 Litre",
        quantity: "",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="bulk" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,168,181,0.18)_0%,transparent_50%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: supply types + copy */}
          <div>
            <SectionHeading
              eyebrow="Bulk Orders"
              align="left"
              title={
                <>
                  Supply that{" "}
                  <span className="text-gradient-aqua">scales with you.</span>
                </>
              }
              subtitle="Tell us what you need — we'll build a dependable, cost-effective hydration plan for your business or event."
            />

            <div className="mt-8 grid grid-cols-2 gap-4">
              {SUPPLY_TYPES.map((type, i) => {
                const isActive = selected === type.label;
                return (
                  <Reveal key={type.label} delay={i * 0.06}>
                    <motion.button
                      type="button"
                      onClick={() => setSelected(type.label)}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex w-full items-center gap-3 overflow-hidden rounded-2xl p-4 text-left transition-all ${
                        isActive
                          ? "bg-gradient-to-br from-[#006B6B]/40 to-[#00A8B5]/20 ring-1 ring-[#00A8B5]/50"
                          : "glass-card hover:ring-1 hover:ring-white/15"
                      }`}
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                        <type.icon className="h-5 w-5 text-[#80DEEA]" />
                      </div>
                      <span className="font-display text-sm font-semibold text-white">
                        {type.label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="bulk-pill"
                          className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#FFD84D] shadow-[0_0_10px_2px_rgba(255,216,77,0.7)]"
                        />
                      )}
                    </motion.button>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-8 rounded-2xl glass-card p-5">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#80DEEA]">
                  Why teams choose Briza bulk
                </h3>
                <ul className="mt-3 space-y-2">
                  {[
                    "Dedicated account manager & priority dispatch",
                    "Flexible subscription schedules",
                    "Volume pricing & SLA-backed reliability",
                    "Lab-tested, sealed, food-grade packaging",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-white/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00A8B5]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-8"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#00A8B5]/20 blur-3xl" />
              <h3 className="font-display text-2xl font-bold text-white">
                Request a quote
              </h3>
              <p className="mt-1 text-sm text-white/55">
                Fill the form and our team will reach out within 24 hours.
              </p>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    icon={User}
                    label="Name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(v) => update("name", v)}
                    required
                  />
                  <Field
                    icon={Phone}
                    label="Phone"
                    type="tel"
                    placeholder="+91 90000 00000"
                    value={form.phone}
                    onChange={(v) => update("phone", v)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    icon={Mail}
                    label="Email"
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(v) => update("email", v)}
                  />
                  <Field
                    icon={MapPin}
                    label="Location"
                    placeholder="e.g. Panaji, Goa"
                    value={form.location}
                    onChange={(v) => update("location", v)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/55">
                      Requirement
                    </label>
                    <select
                      value={form.requirement}
                      onChange={(e) => update("requirement", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#00A8B5]"
                    >
                      {REQUIREMENTS.map((r) => (
                        <option key={r} value={r} className="bg-[#021C24]">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Field
                    icon={Calendar}
                    label="Quantity"
                    type="number"
                    placeholder="e.g. 100"
                    value={form.quantity}
                    onChange={(v) => update("quantity", v)}
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/55">
                    Message (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us about your delivery schedule or special requirements…"
                    className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#00A8B5]"
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300 ring-1 ring-red-500/30">
                    {error}
                  </p>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-lg bg-[#00A8B5]/15 px-3 py-2 text-sm text-[#80DEEA] ring-1 ring-[#00A8B5]/30"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Enquiry received! Our team will contact you shortly.
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#006B6B] to-[#00A8B5] px-6 py-3.5 font-semibold text-white shadow-[0_12px_30px_-10px_rgba(0,168,181,0.7)] transition-transform hover:scale-[1.02] disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      Submit Enquiry
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-white/40">
                  Selected supply type: <span className="text-[#FFD84D]">{selected}</span>
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

function Field({ icon: Icon, label, value, onChange, placeholder, type = "text", required }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/55">
        {label} {required && <span className="text-[#FFD84D]">*</span>}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#00A8B5]"
        />
      </div>
    </div>
  );
}
