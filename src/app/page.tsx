import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { ScrollStack } from "@/components/ScrollStack";
import { HealthMarquee } from "@/components/HealthMarquee";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { BuyBar } from "@/components/BuyBar";
import { AgeGate } from "@/components/AgeGate";
import { Toaster } from "@/components/ui/sonner";

const HOME_OG_IMAGE = "https://aevowellness.shop/assets/science-hero.png";

export const metadata: Metadata = {
  title: "Buy Research Peptides in the UAE — Verified 98%+ Purity",
  description:
    "Shop Aevo's range of third-party tested research peptides — pens, vials and nasal sprays — cold-chain shipped across the UAE with same-day Dubai delivery. BPC-157, Semaglutide, Retatrutide & more.",
  alternates: { canonical: "https://aevowellness.shop/" },
  openGraph: {
    title: "Buy Research Peptides in the UAE — Verified 98%+ Purity | Aevo",
    description:
      "Third-party tested research peptides — pens, vials and nasal sprays — cold-chain shipped across the UAE with same-day Dubai delivery.",
    type: "website",
    url: "https://aevowellness.shop/",
    images: [HOME_OG_IMAGE],
  },
  twitter: { images: [HOME_OG_IMAGE] },
};

export default function Home() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Hero />
            <div
              className="relative overflow-x-clip"
              style={{
                background:
                  "radial-gradient(75% 22% at 50% 19%, rgba(28,58,142,0.16) 0%, transparent 70%), radial-gradient(80% 24% at 50% 45%, rgba(28,58,142,0.14) 0%, transparent 72%), linear-gradient(180deg, #eef0f3 0%, #e9ebee 55%, #e6e7e9 100%)",
              }}
            >
              <ProductGrid />
              <ScrollStack />
              <HealthMarquee />
            </div>
            <Footer />
          </main>
          <CartDrawer />
          <BuyBar />
        </div>
        <AgeGate />
        <Toaster position="top-center" />
      </CartProvider>
    </CurrencyProvider>
  );
}
