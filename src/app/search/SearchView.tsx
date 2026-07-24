"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Loader2, Search as SearchIcon } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { BuyBar } from "@/components/BuyBar";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Toaster } from "@/components/ui/sonner";
import { RESEARCH_USE_NOTICE } from "@/data/products";
import { searchProducts } from "@/lib/shopify";

const queryClient = new QueryClient();

function SearchInner() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const router = useRouter();
  const [term, setTerm] = React.useState(q);

  React.useEffect(() => {
    setTerm(q);
  }, [q]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", q],
    queryFn: () => searchProducts(q),
    staleTime: 1000 * 60 * 5,
    enabled: q.trim().length > 0,
  });

  const products = data ?? [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  };

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
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-20">
          <Reveal>
            <div className="mb-8 text-center">
              <h1 className="text-ink" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
                Search the range
              </h1>
              <form onSubmit={submit} className="mx-auto mt-6 flex max-w-lg items-center gap-2">
                <div className="glass flex flex-1 items-center gap-2 rounded-full px-4 py-2.5">
                  <SearchIcon className="size-4 shrink-0 text-ink-soft" />
                  <input
                    autoFocus
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search by name or keyword…"
                    className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft"
                    aria-label="Search products"
                  />
                </div>
              </form>
            </div>
          </Reveal>

          {q.trim().length === 0 ? (
            <p className="py-16 text-center text-ink-soft">Type a keyword to find a product.</p>
          ) : isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="size-8 animate-spin text-ink-soft" />
            </div>
          ) : isError ? (
            <p className="py-16 text-center text-ink-soft">
              Couldn't search right now. Please try again later.
            </p>
          ) : products.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-ink-soft">No products found for “{q}”.</p>
              <Link href="/#products" className="mt-4 inline-block text-sm font-medium text-ink hover:underline">
                Browse the full range
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-6 text-center text-sm text-ink-soft">
                {products.length} result{products.length === 1 ? "" : "s"} for “{q}”
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
                {products.map((p, i) => (
                  <Reveal key={p.id} delay={Math.min(i * 0.04, 0.3)}>
                    <ProductCard product={p} className="h-full" />
                  </Reveal>
                ))}
              </div>
            </>
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

export function SearchView() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <CartProvider>
          <React.Suspense fallback={null}>
            <SearchInner />
          </React.Suspense>
        </CartProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}
