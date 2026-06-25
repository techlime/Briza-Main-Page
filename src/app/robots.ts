import type { MetadataRoute } from "next";

// Force Next.js to generate this route as a static file for GitHub Pages
export const dynamic = "force-static";

const SITE_URL = "https://briza247.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
