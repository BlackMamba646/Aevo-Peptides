"use client";

import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { BuyBar } from "@/components/BuyBar";
import { Toaster } from "@/components/ui/sonner";

export function RefundPolicyView() {
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
              <div className="mb-10 text-center">
                <Link href="/" className="text-sm text-ink-soft hover:text-ink">
                  ← Home
                </Link>
                <h1 className="mt-4 text-ink" style={{ fontSize: "clamp(30px, 5vw, 52px)" }}>
                  Refund &amp; Returns Policy
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
                  Last updated: July 2026
                </p>
              </div>

              <article className="prose prose-sm max-w-none text-ink-soft [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-ink [&_p]:mt-3 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
                <h2>Overview</h2>
                <p>
                  At Aevo Wellness, all products are research-grade peptides that require strict
                  cold-chain handling. Due to the sensitive nature of these products, we maintain
                  a firm policy on returns and refunds to ensure the integrity and safety of all
                  items.
                </p>

                <h2>No Returns or Exchanges</h2>
                <p>
                  We do not accept returns or exchanges on any orders once they have been
                  dispatched. This policy exists because:
                </p>
                <ul>
                  <li>
                    Research peptides must be stored and handled under controlled cold-chain
                    conditions at all times.
                  </li>
                  <li>
                    Once a product leaves our facility, we cannot verify that proper storage
                    conditions were maintained.
                  </li>
                  <li>
                    Accepting returned products could compromise the safety and quality standards
                    we uphold.
                  </li>
                </ul>

                <h2>Damaged or Incorrect Orders</h2>
                <p>
                  If you receive a product that is damaged during transit or is different from
                  what you ordered, please contact us within 24 hours of delivery. We will:
                </p>
                <ul>
                  <li>Ask for photographic evidence of the issue</li>
                  <li>Investigate the matter promptly</li>
                  <li>Offer a replacement or store credit at our discretion</li>
                </ul>

                <h2>Order Cancellations</h2>
                <p>
                  Orders may be cancelled before they are dispatched. Once an order has been
                  handed to our delivery partner, it cannot be cancelled. Contact us as soon
                  as possible if you need to cancel an order.
                </p>

                <h2>Delivery Issues</h2>
                <p>
                  If your order has not arrived within the expected delivery timeframe (same-day
                  for Dubai, 24–48 hours for the rest of the UAE), please contact us and we will
                  track your shipment and resolve the issue.
                </p>

                <h2>Contact Us</h2>
                <p>
                  For any issues with your order, reach out to us via WhatsApp or through the
                  details on our{" "}
                  <Link href="/shipping" className="underline hover:text-ink">
                    Shipping &amp; Returns
                  </Link>{" "}
                  page. We aim to respond to all enquiries within 24 hours.
                </p>
              </article>
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
