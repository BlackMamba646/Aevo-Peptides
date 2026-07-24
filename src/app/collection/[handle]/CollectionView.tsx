"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { BuyBar } from "@/components/BuyBar";
import { ProductCard } from "@/components/ProductCard";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { Toaster } from "@/components/ui/sonner";
import { RESEARCH_USE_NOTICE } from "@/data/products";
import { CATEGORIES, type ShopifyProduct } from "@/lib/shopify";

export function CollectionView({
  handle,
  products,
}: {
  handle: string;
  products: ShopifyProduct[];
}) {
  const current = CATEGORIES.find((c) => c.handle === handle);
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
        <div className="border-b border-ink/10 py-2.5">
          <Marquee text="Same day delivery available in Dubai" tone="dark" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-20">
          <Reveal>
            <div className="mb-8 text-center">
              <Link href="/#products" className="text-sm text-ink-soft hover:text-ink">
                ← Back to the range
              </Link>
              <h1 className="mt-4 text-ink" style={{ fontSize: "clamp(30px, 5vw, 52px)" }}>
                {current?.title ?? "The range"}
              </h1>
              <p className="mx-auto mt-3 max-w-md text-ink-soft">
                Verified for laboratory research. Held to a single standard.
              </p>
            </div>
          </Reveal>

          <div className="mb-10 flex justify-center">
            <div className="glass inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.handle}
                  href={`/collection/${c.handle}`}
                  className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    c.handle === handle ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>

          {!current ? (
            <p className="py-16 text-center text-ink-soft">Collection not found.</p>
          ) : products.length === 0 ? (
            <p className="py-16 text-center text-ink-soft">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i * 0.04, 0.3)}>
                  <ProductCard product={p} className="h-full" />
                </Reveal>
              ))}
            </div>
          )}

          <p className="mt-10 text-center text-xs font-medium uppercase tracking-wide text-ink-soft">
            {RESEARCH_USE_NOTICE}
          </p>
        </div>
        <Footer />
      </main>
      <CartDrawer />
      <BuyBar />
      <Toaster position="top-center" />
    </div>
  );
}
