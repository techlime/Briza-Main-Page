"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { LoadingScreen } from "@/components/briza/loading-screen";
import { Navbar } from "@/components/briza/navbar";
import { Hero } from "@/components/briza/sections/hero";
import { About } from "@/components/briza/sections/about";
import { WhyChoose } from "@/components/briza/sections/why-choose";
import { ProductShowcase } from "@/components/briza/sections/product-showcase";
import { Services } from "@/components/briza/sections/services";
import { PurificationProcess } from "@/components/briza/sections/purification-process";
import { DeliveryGoa } from "@/components/briza/sections/delivery-goa";
import { IndustriesServed } from "@/components/briza/sections/industries-served";
import { BulkOrder } from "@/components/briza/sections/bulk-order";
import { Testimonials } from "@/components/briza/sections/testimonials";
import { Contact } from "@/components/briza/sections/contact";
import { Footer } from "@/components/briza/sections/footer";
import { MobileBottomNav } from "@/components/briza/mobile-bottom-nav";
import { FloatingWhatsApp } from "@/components/briza/floating-whatsapp";
import { RippleCursor } from "@/components/briza/ripple-cursor";
import { AquaBackground } from "@/components/briza/effects/aqua-background";

export default function Home() {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ocean-radial">
      {/* Fixed background layers */}
      <AquaBackground density={1} />
      <RippleCursor />

      {/* Loading overlay */}
      <LoadingScreen />

      {/* Sticky nav */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <WhyChoose />
        <ProductShowcase />
        <Services />
        <PurificationProcess />
        <DeliveryGoa />
        <IndustriesServed />
        <BulkOrder />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* Floating utilities */}
      <FloatingWhatsApp />
      <MobileBottomNav />

      {/* bottom padding on mobile so content isn't hidden behind bottom nav */}
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </div>
  );
}
