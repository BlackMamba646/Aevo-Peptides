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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqView({ items }: { items: FaqItem[] }) {
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
                  <Link href="/" className="text-sm text-ink-soft hover:text-ink">
                    ← Home
                  </Link>
                  <h1
                    className="mt-4 text-ink"
                    style={{ fontSize: "clamp(30px, 5vw, 52px)" }}
                  >
                    Frequently Asked Questions
                  </h1>
                  <p className="mx-auto mt-3 max-w-md text-ink-soft">
                    Everything you need to know about our research peptides,
                    shipping, and quality standards.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <GlassCard className="p-6 sm:p-8">
                  <Accordion type="single" collapsible className="w-full">
                    {items.map((item, i) => (
                      <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger className="text-left font-semibold text-ink">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-ink-soft leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </GlassCard>
              </Reveal>

              <Reveal>
                <div className="mt-10 text-center">
                  <p className="text-sm text-ink-soft">
                    Still have questions?{" "}
                    <a
                      href="https://wa.me/447832619150?text=Hi%20Aevo%2C%20I%20have%20a%20question."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-ink"
                    >
                      Contact us on WhatsApp
                    </a>
                  </p>
                </div>
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
