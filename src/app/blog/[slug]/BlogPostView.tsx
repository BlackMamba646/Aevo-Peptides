"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

export function BlogPostView({ post }: { post: BlogPost }) {
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
            <article className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
              <Reveal>
                <div className="mb-10">
                  <Link href="/blog" className="text-sm text-ink-soft hover:text-ink">
                    ← All articles
                  </Link>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="rounded-full bg-ink/5 px-2.5 py-0.5 text-xs font-medium text-ink-soft">
                      {CATEGORY_LABELS[post.category]}
                    </span>
                    <span className="text-xs text-ink-soft">{post.readTime}</span>
                  </div>
                  <h1
                    className="mt-4 text-ink"
                    style={{ fontSize: "clamp(26px, 4.5vw, 44px)", lineHeight: 1.15 }}
                  >
                    {post.title}
                  </h1>
                  <div className="mt-4 flex items-center gap-3 text-sm text-ink-soft">
                    <span>{post.author}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-AE", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <GlassCard className="p-6 sm:p-10">
                  <div className="prose prose-slate max-w-none text-ink prose-headings:text-ink prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-xl prose-h2:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-p:leading-relaxed prose-p:text-ink-soft prose-strong:text-ink prose-a:text-ink prose-a:underline hover:prose-a:text-ink-soft prose-li:text-ink-soft prose-table:text-sm prose-th:text-ink prose-td:text-ink-soft">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {post.content}
                    </ReactMarkdown>
                  </div>
                </GlassCard>
              </Reveal>

              <Reveal>
                <div className="mt-10 text-center">
                  <Link
                    href="/blog"
                    className="text-sm text-ink-soft underline hover:text-ink"
                  >
                    ← Back to all articles
                  </Link>
                </div>
              </Reveal>
            </article>
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
