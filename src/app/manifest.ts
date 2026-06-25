import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BRIZA 24/7 — Pure Hydration. Anytime. Everytime.",
    short_name: "BRIZA 24/7",
    description:
      "Premium packaged drinking water across Goa. RO + UV purified, mineral-balanced, 24/7 delivery.",
    start_url: "/",
    display: "standalone",
    background_color: "#021C24",
    theme_color: "#021C24",
    orientation: "portrait-primary",
    icons: [
      { src: "/favicon.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/favicon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/favicon.png", sizes: "180x180", type: "image/png", purpose: "maskable" },
    ],
    categories: ["food", "beverage", "shopping", "business"],
    lang: "en-IN",
  };
}
