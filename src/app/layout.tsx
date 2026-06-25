import type { Metadata, Viewport } from "next";
import { Sora, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://briza247.com";

// FIXED: Changed 'meta Metadata' to 'metadata: Metadata' to resolve the syntax error
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BRIZA 24/7 — Pure Hydration. Anytime. Everytime. | Packaged Drinking Water, Goa",
    template: "%s | BRIZA 24/7",
  },
  description:
    "BRIZA 24/7 delivers safe, hygienic and mineral-balanced packaged drinking water across Goa with reliable 24/7 supply. RO + UV purified, added minerals, fast delivery for homes, hotels, offices & events.",
  keywords: [
    "BRIZA 24/7",
    "packaged drinking water Goa",
    "mineral water Goa",
    "20 litre water bottle Goa",
    "water delivery Goa",
    "bulk water supply Goa",
    "RO UV purified water",
    "corporate water supply",
    "event water supply",
    "hotel water supply Goa",
  ],
  authors: [{ name: "BRIZA 24/7" }],
  creator: "BRIZA 24/7",
  publisher: "BRIZA 24/7",
  applicationName: "BRIZA 24/7",
  category: "Food & Beverage",
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180" }],
    shortcut: ["/favicon.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "BRIZA 24/7",
    title: "BRIZA 24/7 — Pure Hydration. Anytime. Everytime.",
    description:
      "Premium packaged drinking water across Goa. RO + UV purified, mineral-balanced, 24/7 delivery for homes, hotels, offices & events. Real taste of water, real taste of life.",
    images: [
      {
        url: "/og-image.png",
        width: 1344,
        height: 768,
        alt: "BRIZA 24/7 — Pure Hydration. Anytime. Everytime.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BRIZA 24/7 — Pure Hydration. Anytime. Everytime.",
    description:
      "Premium packaged drinking water across Goa. RO + UV purified, mineral-balanced, 24/7 delivery.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: false, email: true },
};

export const viewport: Viewport = {
  themeColor: "#F0F9FA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BRIZA 24/7",
  alternateName: "Briza 24/7",
  description:
    "Packaged drinking water company in Goa delivering safe, hygienic and mineral-balanced water 24/7.",
  slogan: "Pure Hydration. Anytime. Everytime.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.png`,
  telephone: ["+91 9158618148", "+91 9284625589"],
  areaServed: {
    "@type": "State",
    name: "Goa, India",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Goa",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/briza247",
    "https://www.instagram.com/briza247",
  ],
  knowsAbout: [
    "Packaged Drinking Water",
    "RO Purification",
    "UV Purification",
    "Mineral Balanced Water",
    "Bulk Water Supply",
    "Corporate Water Supply",
  ],
};

const productData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "BRIZA 24/7 Product Range",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BRIZA 250ml Packaged Drinking Water" },
    { "@type": "ListItem", position: 2, name: "BRIZA 500ml Packaged Drinking Water" },
    { "@type": "ListItem", position: 3, name: "BRIZA 1000ml Packaged Drinking Water" },
    { "@type": "ListItem", position: 4, name: "BRIZA 5 Litre Packaged Drinking Water" },
    { "@type": "ListItem", position: 5, name: "BRIZA 20 Litre Packaged Drinking Water" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
        />
      </head>
      <body
        className={`${sora.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
