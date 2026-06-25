import type { MetadataRoute } from "next";

// Force Next.js to generate this route as a static file for GitHub Pages
export const dynamic = "force-static";

const SITE_URL = "https://briza247.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    }
  ];
}
