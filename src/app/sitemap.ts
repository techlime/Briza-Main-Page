import type { MetadataRoute } from "next";

const SITE_URL = "https://briza247.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = [
    "",
    "#about",
    "#products",
    "#services",
    "#process",
    "#delivery",
    "#industries",
    "#bulk",
    "#testimonials",
    "#contact",
  ];
  const now = new Date();
  return sections.map((section) => ({
    url: `${SITE_URL}/${section}`,
    lastModified: now,
    changeFrequency: section === "" ? ("weekly" as const) : ("monthly" as const),
    priority: section === "" ? 1 : 0.7,
  }));
}
