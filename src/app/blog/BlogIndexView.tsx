"use client";

import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { BuyBar } from "@/components/BuyBar";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { Toaster } from "@/components/ui/sonner";
import type { BlogPost } from "@/data/blog-posts";

const CATEGORY_LABELS: Record<BlogPost["category"], string> = {
  guide: "Guide",
  comparison: "Comparison",
  education: "Educational",
  market: "Market Insights",
};

export function BlogIndexView({ posts }: { posts: BlogPost[] }) {
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
            <div className="mx-auto max-w-4xl px-4 py-12 sm:py-20">
              <Reveal>
                <div className="mb-10 text-center">
                  <Link href="/" className="text-sm text-ink-soft hover:text-ink">
                    ← Home
                  </Link>
                  <h1
                    className="mt-4 text-ink"
                    style={{ fontSize: "clamp(30px, 5vw, 52px)" }}
                  >
                    Research & Guides
                  </h1>
                  <p className="mx-auto mt-3 max-w-lg text-ink-soft">
                    Peptide research overviews, format comparisons, storage guides,
                    and quality verification — written by the Aevo Research Team.
                  </p>
                </div>
              </Reveal>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Reveal key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <GlassCard className="flex h-full flex-col p-6 transition-shadow hover:shadow-lg">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="rounded-full bg-ink/5 px-2.5 py-0.5 text-xs font-medium text-ink-soft">
                            {CATEGORY_LABELS[post.category]}
                          </span>
                          <span className="text-xs text-ink-soft">{post.readTime}</span>
                        </div>
                        <h2 className="mb-2 text-lg font-semibold leading-snug text-ink">
                          {post.title}
                        </h2>
                        <p className="mb-4 flex-1 text-sm leading-relaxed text-ink-soft">
                          {post.description}
                        </p>
                        <div className="mt-auto flex items-center justify-between text-xs text-ink-soft">
                          <span>{post.author}</span>
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-AE", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                        </div>
                      </GlassCard>
                    </Link>
                  </Reveal>
                ))}
              </div>
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
