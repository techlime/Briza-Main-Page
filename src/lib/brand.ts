// BRIZA 24/7 brand constants and shared types

export const BRAND = {
  name: "BRIZA 24/7",
  tagline: "PURE HYDRATION. ANYTIME. EVERYTIME.",
  secondaryTagline: "Real Taste of Water. Real Taste of Life.",
  phones: ["9158618148", "9284625589"],
  whatsapp: "919158618148",
  email: "hello@briza247.com",
  location: "Goa, India",
  colors: {
    primary: "#006B6B",
    secondary: "#00A8B5",
    accent: "#FFD84D",
    background: "#021C24",
  },
} as const;

export type ProductId = "250ml" | "500ml" | "1000ml" | "5l" | "20l";

export interface Product {
  id: ProductId;
  name: string;
  capacity: string;
  tagline: string;
  image: string;
  features: string[];
  description: string;
  usage: string;
  suitableFor: string;
  highlight?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "250ml",
    name: "BRIZA 250ml",
    capacity: "250 ml",
    tagline: "Pocket-sized purity",
    image: "/products/250ml.png",
    features: ["On-the-go hydration", "Travel friendly", "Recyclable bottle", "Mineral balanced"],
    description:
      "Compact and convenient, the BRIZA 250ml bottle is crafted for instant refreshment wherever life takes you. Perfectly mineral-balanced and RO + UV purified for pure, crisp taste in every sip.",
    usage: "Best for quick hydration, school tiffins, travel and single-serve occasions.",
    suitableFor: "Schools, travel, retail shelves, events, conferences, gyms.",
  },
  {
    id: "500ml",
    name: "BRIZA 500ml",
    capacity: "500 ml",
    tagline: "Everyday essential",
    image: "/products/500ml.png",
    features: ["Perfect daily size", "Ergonomic grip", "Leak-proof cap", "RO + UV purified"],
    description:
      "The everyday hydration essential. BRIZA 500ml blends premium purity with an ergonomic, leak-proof design — the trusted companion for work, fitness and daily life across Goa.",
    usage: "Daily personal hydration, desk use, workouts, commutes and retail.",
    suitableFor: "Offices, gyms, retail outlets, homes, delivery subscriptions.",
    highlight: true,
  },
  {
    id: "1000ml",
    name: "BRIZA 1000ml",
    capacity: "1 Litre",
    tagline: "Share the refreshment",
    image: "/products/1000ml.png",
    features: ["Family size", "Resealable cap", "Added minerals", "Strong bottle design"],
    description:
      "Designed for sharing. BRIZA 1000ml delivers the same mineral-balanced purity in a sturdy, resealable bottle — ideal for meals, meetings and moments with family and friends.",
    usage: "Meals, meetings, family outings, desk hydration, longer trips.",
    suitableFor: "Families, restaurants, offices, picnics, hospitality tables.",
  },
  {
    id: "5l",
    name: "BRIZA 5 Litre",
    capacity: "5 Litre",
    tagline: "Home & office companion",
    image: "/products/5l.png",
    features: ["Easy-pour handle", "Multi-day supply", "Hygienic seal", "Cost effective"],
    description:
      "Built for homes and workspaces, the BRIZA 5 Litre can features a sturdy handle and hygienic seal — multi-day hydration that keeps your family or team refreshed and replenished.",
    usage: "Home dispensers, office water coolers, kitchens, small teams.",
    suitableFor: "Homes, small offices, cafeterias, kitchens, guest houses.",
  },
  {
    id: "20l",
    name: "BRIZA 20 Litre",
    capacity: "20 Litre",
    tagline: "Bulk hydration done right",
    image: "/products/20l.png",
    features: ["Dispenser ready", "Sealed for safety", "Corporate grade", "Subscription delivery"],
    description:
      "The flagship of our range. BRIZA 20 Litre jars are sealed for safety and built for dispensers — powering offices, hotels and events across Goa with reliable, pure hydration 24/7.",
    usage: "Water dispensers, coolers, bulk consumption, corporate & hospitality supply.",
    suitableFor: "Offices, hotels, restaurants, events, corporates, gated communities.",
  },
];

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

export const STATS: Stat[] = [
  { label: "Happy Customers", value: 25000, suffix: "+" },
  { label: "Deliveries Completed", value: 480000, suffix: "+" },
  { label: "Corporate Clients", value: 320, suffix: "+" },
  { label: "Service Coverage", value: 100, suffix: "%" },
];

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface PurificationStage {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export interface Industry {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
}

export interface GoaZone {
  name: string;
  x: number;
  y: number;
  major?: boolean;
}

export const PURIFICATION_STAGES: PurificationStage[] = [
  { step: "01", title: "Water Source", description: "Sourced from approved, deep aquifers with natural mineral balance.", icon: "droplets" },
  { step: "02", title: "RO Filtration", description: "Reverse osmosis removes dissolved impurities and micro-contaminants.", icon: "filter" },
  { step: "03", title: "UV Purification", description: "Ultraviolet light neutralises bacteria, viruses and pathogens.", icon: "sparkles" },
  { step: "04", title: "Mineral Balancing", description: "Essential minerals are re-balanced for taste and health.", icon: "gem" },
  { step: "05", title: "Quality Testing", description: "Lab-tested across 25+ parameters before every batch is approved.", icon: "shield-check" },
  { step: "06", title: "Packaging", description: "Hygienically sealed in food-grade, recyclable bottles & jars.", icon: "package" },
  { step: "07", title: "Delivery", description: "24/7 delivery across Goa with a chilled, dependable fleet.", icon: "truck" },
];

export const GOA_ZONES: GoaZone[] = [
  { name: "Panaji", x: 52, y: 30, major: true },
  { name: "Mapusa", x: 42, y: 22, major: true },
  { name: "Ponda", x: 60, y: 40, major: true },
  { name: "Margao", x: 52, y: 62, major: true },
  { name: "Vasco da Gama", x: 60, y: 52, major: true },
  { name: "Calangute", x: 46, y: 24 },
  { name: "Baga", x: 44, y: 22 },
  { name: "Porvorim", x: 50, y: 28 },
  { name: "Old Goa", x: 56, y: 34 },
  { name: "Canacona", x: 50, y: 76 },
  { name: "Quepem", x: 54, y: 66 },
  { name: "Bicholim", x: 46, y: 16 },
  { name: "Valpoi", x: 40, y: 10 },
  { name: "Sanvordem", x: 56, y: 64 },
  { name: "Cuncolim", x: 52, y: 68 },
];
