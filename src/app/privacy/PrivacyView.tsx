"use client";

import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { BuyBar } from "@/components/BuyBar";
import { Toaster } from "@/components/ui/sonner";

export function PrivacyView() {
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
                  Privacy Policy
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
                  Last updated: July 2026
                </p>
              </div>

              <article className="prose prose-sm max-w-none text-ink-soft [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-ink [&_p]:mt-3 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
                <h2>1. Who We Are</h2>
                <p>
                  Aevo Wellness (&ldquo;Aevo&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates
                  the website aevowellness.shop. We are the official distributors of APEX
                  research peptides, serving customers in the United Arab Emirates.
                </p>

                <h2>2. Information We Collect</h2>
                <h3>Information you provide</h3>
                <ul>
                  <li>Name and contact details when you place an order via WhatsApp or our checkout</li>
                  <li>Delivery address for shipping</li>
                  <li>Payment information processed securely through Shopify Payments</li>
                  <li>Communications you send us (enquiries, support requests)</li>
                </ul>

                <h3>Information collected automatically</h3>
                <ul>
                  <li>Device information (browser type, operating system, screen resolution)</li>
                  <li>IP address and approximate location</li>
                  <li>Pages visited, time spent, and navigation patterns</li>
                  <li>Referral source (how you found our website)</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <ul>
                  <li>To process and fulfil your orders</li>
                  <li>To communicate about your orders, deliveries, and support requests</li>
                  <li>To improve our website, products, and services</li>
                  <li>To send marketing communications (only with your consent)</li>
                  <li>To comply with legal obligations</li>
                </ul>

                <h2>4. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies. When you first visit our site,
                  you will be shown a cookie consent banner. Tracking pixels (including Meta/Facebook
                  Pixel) are only activated after you grant consent.
                </p>
                <p>
                  You can change your cookie preferences at any time by clearing your browser cookies
                  and revisiting the site. Essential cookies required for the site to function may
                  still be used without consent.
                </p>

                <h2>5. Sharing Your Information</h2>
                <p>We do not sell your personal data. We share information only with:</p>
                <ul>
                  <li>Shopify (our e-commerce platform) for order processing</li>
                  <li>Delivery partners for order fulfilment within the UAE</li>
                  <li>Meta/Facebook (only with your consent) for advertising measurement</li>
                  <li>Law enforcement or regulatory bodies when legally required</li>
                </ul>

                <h2>6. Data Retention</h2>
                <p>
                  We retain order data for as long as necessary to fulfil our contractual and
                  legal obligations, typically up to 5 years for financial records. You can
                  request deletion of your personal data at any time.
                </p>

                <h2>7. Your Rights</h2>
                <p>
                  Under the UAE Personal Data Protection Law (PDPL) and applicable regulations,
                  you have the right to:
                </p>
                <ul>
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Object to certain processing of your data</li>
                </ul>

                <h2>8. Data Security</h2>
                <p>
                  We use industry-standard security measures including HTTPS encryption,
                  secure payment processing through Shopify, and restricted access to
                  personal data. Our website is hosted on Vercel with enterprise-grade
                  infrastructure.
                </p>

                <h2>9. Children</h2>
                <p>
                  Our products are intended for adults aged 18 and over only. We do not
                  knowingly collect personal data from individuals under 18. Our site
                  includes an age verification gate.
                </p>

                <h2>10. Changes to This Policy</h2>
                <p>
                  We may update this policy from time to time. Changes will be posted on
                  this page with an updated revision date.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                  If you have questions about this privacy policy or wish to exercise your
                  data rights, contact us via WhatsApp or through the details on our{" "}
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
