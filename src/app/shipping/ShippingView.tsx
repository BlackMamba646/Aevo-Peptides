"use client";

import Link from "next/link";
import { Truck, Clock, PackageX, MessageCircle } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { BuyBar } from "@/components/BuyBar";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { GlassButton } from "@/components/GlassButton";
import { Toaster } from "@/components/ui/sonner";
import { buildWhatsAppUrl, trackWhatsAppInitiateCheckout } from "@/lib/whatsapp";

export function ShippingView() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main
            className="pt-16"
            style={{
              background:
                "radial-gradient(75% 22% at 50% 12%, rgba(28,58,142,0.14) 0%, transparent 70%), linear-gradient(180deg, #eef0f3 0%, #e9ebee 60%, #e6e7e9 100%)",
            }}
          >
            <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
              <Reveal>
                <div className="mb-10 text-center">
                  <Link href="/#products" className="text-sm text-ink-soft hover:text-ink">
                    ← Back to the range
                  </Link>
                  <h1 className="mt-4 text-ink" style={{ fontSize: "clamp(30px, 5vw, 52px)" }}>
                    Shipping & Returns
                  </h1>
                  <p className="mx-auto mt-3 max-w-md text-ink-soft">
                    Fast, tracked delivery across the UAE.
                  </p>
                </div>
              </Reveal>

              {/* Shipping */}
              <Reveal>
                <section>
                  <h2 className="mb-4 text-xl font-semibold text-ink">UAE delivery</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <GlassCard className="p-6">
                      <Truck className="size-6 text-ink" />
                      <h3 className="mt-4 font-semibold text-ink">Same-day delivery</h3>
                      <p className="mt-1 text-sm text-ink-soft">Within Dubai</p>
                      <p className="mt-3 text-2xl font-semibold text-ink">130 AED</p>
                    </GlassCard>

                    <GlassCard className="p-6">
                      <Clock className="size-6 text-ink" />
                      <h3 className="mt-4 font-semibold text-ink">24–48 hour delivery</h3>
                      <p className="mt-1 text-sm text-ink-soft">Across the UAE</p>
                      <p className="mt-3 text-2xl font-semibold text-ink">70 AED</p>
                    </GlassCard>
                  </div>
                </section>
              </Reveal>

              {/* Returns */}
              <Reveal>
                <section className="mt-12">
                  <h2 className="mb-4 text-xl font-semibold text-ink">Returns policy</h2>
                  <GlassCard className="p-6">
                    <PackageX className="size-6 text-ink" />
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      Due to the nature of our products, we're unable to offer refunds or
                      exchanges. However, if your product arrives and there's an issue with it,
                      please contact us and we'll be able to sort the problem out for you.
                    </p>
                    <a
                      href={buildWhatsAppUrl("Hi Aevo, I have an issue with my order and need some help.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackWhatsAppInitiateCheckout}
                      className="mt-5 inline-block"
                    >
                      <GlassButton variant="glass" size="sm">
                        <MessageCircle className="size-4" />
                        Contact us
                      </GlassButton>
                    </a>
                  </GlassCard>
                </section>
              </Reveal>
            </div>
            <Footer />
          </main>
          <CartDrawer />
          <BuyBar />
          <Toaster position="top-center" />
        </div>
      </CartProvider>
    </CurrencyProvider>
  );
}
