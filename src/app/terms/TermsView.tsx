"use client";

import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { BuyBar } from "@/components/BuyBar";
import { Toaster } from "@/components/ui/sonner";

export function TermsView() {
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
                  Terms of Service
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
                  Last updated: July 2026
                </p>
              </div>

              <article className="prose prose-sm max-w-none text-ink-soft [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-ink [&_p]:mt-3 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
                <h2>1. Agreement to Terms</h2>
                <p>
                  By accessing or using aevowellness.shop (&ldquo;the Site&rdquo;), you agree to
                  be bound by these Terms of Service. If you do not agree, do not use the Site.
                  Aevo Wellness (&ldquo;Aevo&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) reserves
                  the right to update these terms at any time.
                </p>

                <h2>2. Eligibility</h2>
                <p>
                  You must be at least 18 years of age to use this Site or purchase products.
                  By using the Site, you represent and warrant that you meet this age requirement.
                </p>

                <h2>3. Products and Use</h2>
                <p>
                  All products sold on this Site are intended for laboratory and research purposes
                  only. They are not intended for human consumption, veterinary use, or any
                  therapeutic, diagnostic, or medical application.
                </p>
                <p>
                  By purchasing, you confirm that you understand and agree to use the products
                  solely for lawful research purposes in accordance with all applicable laws
                  and regulations in the United Arab Emirates and your jurisdiction.
                </p>

                <h2>4. Pricing and Payment</h2>
                <ul>
                  <li>All prices are listed in AED (UAE Dirhams) unless otherwise stated.</li>
                  <li>Prices are subject to change without notice.</li>
                  <li>Payment is processed securely through Shopify Payments.</li>
                  <li>Orders are confirmed only upon successful payment processing.</li>
                </ul>

                <h2>5. Shipping and Delivery</h2>
                <p>
                  We offer same-day delivery within Dubai (130 AED) and 24–48 hour delivery
                  across the UAE (70 AED). All shipments are tracked and maintained under
                  cold-chain conditions. See our{" "}
                  <Link href="/shipping" className="underline hover:text-ink">
                    Shipping &amp; Returns
                  </Link>{" "}
                  page for full details.
                </p>

                <h2>6. Returns and Refunds</h2>
                <p>
                  Due to the nature of our products and cold-chain requirements, we do not
                  accept returns or offer refunds. If you receive a damaged or incorrect
                  product, please contact us immediately and we will work to resolve the
                  issue. See our{" "}
                  <Link href="/refund-policy" className="underline hover:text-ink">
                    Refund Policy
                  </Link>{" "}
                  for details.
                </p>

                <h2>7. Intellectual Property</h2>
                <p>
                  All content on this Site — including text, images, logos, graphics, and
                  software — is the property of Aevo Wellness or its licensors and is protected
                  by copyright and intellectual property laws. You may not reproduce, distribute,
                  or create derivative works without our written permission.
                </p>

                <h2>8. Disclaimer of Warranties</h2>
                <p>
                  The Site and all products are provided &ldquo;as is&rdquo; without warranties of
                  any kind, either express or implied. We do not warrant that the Site will be
                  uninterrupted, error-free, or free of harmful components.
                </p>
                <p>
                  No statements on this Site constitute medical advice. We make no therapeutic
                  or health claims about any product.
                </p>

                <h2>9. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Aevo Wellness shall not be liable for
                  any indirect, incidental, special, or consequential damages arising from your
                  use of the Site or products.
                </p>

                <h2>10. Governing Law</h2>
                <p>
                  These terms are governed by the laws of the United Arab Emirates. Any disputes
                  shall be resolved in the courts of Dubai, UAE.
                </p>

                <h2>11. Contact</h2>
                <p>
                  For questions about these terms, contact us via WhatsApp or through the
                  details on our{" "}
                  <Link href="/shipping" className="underline hover:text-ink">
                    contact page
                  </Link>
                  .
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
