"use client";

import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { GlassButton } from "@/components/GlassButton";
import { Vial } from "@/components/Vial";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { RESEARCH_USE_NOTICE } from "@/data/products";
import type { ShopifyProduct } from "@/lib/shopify";
import { buildWhatsAppOrderUrl, trackWhatsAppInitiateCheckout } from "@/lib/whatsapp";

export function ProductView({ product }: { product: ShopifyProduct | null }) {
  const { format } = useCurrency();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main
        className="pt-16"
        style={{
          background:
            "radial-gradient(75% 22% at 50% 12%, rgba(28,58,142,0.14) 0%, transparent 70%), linear-gradient(180deg, #eef0f3 0%, #e9ebee 60%, #e6e7e9 100%)",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
          {!product ? (
            <div className="py-24 text-center">
              <p className="text-ink-soft">Product not found.</p>
              <GlassButton variant="solid" className="mt-6" asChild>
                <Link href="/#products">Back to the range</Link>
              </GlassButton>
            </div>
          ) : (
            <div className="flex flex-col gap-10 md:flex-row">
              <div className="md:w-1/2">
                <div className="glass relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl">
                  <div className="sapphire-glow absolute left-1/2 top-1/2 size-2/3 -translate-x-1/2 -translate-y-1/2 opacity-40" aria-hidden />
                  {product.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.images[0].url}
                      alt={product.images[0].altText ?? product.title}
                      className="relative h-full w-full object-cover"
                    />
                  ) : (
                    <Vial width={120} />
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col md:w-1/2">
                <Link href="/#products" className="text-sm text-ink-soft hover:text-ink">
                  ← Back to the range
                </Link>
                <h1 className="mt-4 text-3xl font-medium text-ink sm:text-4xl">{product.title}</h1>
                {(() => {
                  const price = parseFloat(product.priceRange.minVariantPrice.amount);
                  return Number.isFinite(price) && price > 0 ? (
                    <p className="mt-3 text-2xl font-semibold text-ink">{format(price)}</p>
                  ) : null;
                })()}

                <Accordion type="single" collapsible className="mt-6">
                  {product.description && (
                    <AccordionItem value="description" className="border-ink/15">
                      <AccordionTrigger className="text-ink">Description</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm leading-relaxed text-ink-soft">
                          {product.description}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  <AccordionItem value="shipping" className="border-ink/15">
                    <AccordionTrigger className="text-ink">Shipping</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm leading-relaxed text-ink-soft">
                        <p>
                          <span className="font-medium text-ink">Same-day delivery</span> within
                          Dubai — 130 AED.
                        </p>
                        <p>
                          <span className="font-medium text-ink">24–48 hour delivery</span> across
                          the UAE — 70 AED.
                        </p>
                        <p>
                          All orders are tracked. Due to the nature of our product, we do not accept refunds or exchanges; however, if you receive your item and you are faced with any kind of issue, please get in contact with us and we'll be able to resolve this for you.
                        </p>
                        <Link
                          href="/shipping"
                          className="inline-block font-medium text-ink underline underline-offset-4 hover:text-ink-soft"
                        >
                          Full shipping &amp; returns details
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-8">
                  <GlassButton variant="glass" size="lg" className="w-full sm:w-auto" asChild>
                    <a
                      href={buildWhatsAppOrderUrl({ title: product.title })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackWhatsAppInitiateCheckout}
                    >
                      Order
                    </a>
                  </GlassButton>
                </div>

                <p className="mt-8 text-xs font-medium uppercase tracking-wide text-ink-soft">
                  {RESEARCH_USE_NOTICE}
                </p>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </main>
      <CartDrawer />
      <Toaster position="top-center" />
    </div>
  );
}
