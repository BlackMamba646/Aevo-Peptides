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

const HOME_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a21cd6e4-8fbe-4815-8048-9a48d135d60e/id-preview-a906b881--c79282dd-7877-421e-8ee3-b183eeb9cdab.lovable.app-1780346068891.png";

export const metadata: Metadata = {
  title: "Aevo — Refined peptide formats",
  description:
    "Aevo is a considered range of peptide formats — pens, vials and nasal sprays — designed with clean lines and quiet precision.",
  alternates: { canonical: "https://aevowellness.shop/" },
  openGraph: {
    title: "Aevo — Refined peptide formats",
    description:
      "A considered range of peptide formats, designed with clean lines and quiet precision.",
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
