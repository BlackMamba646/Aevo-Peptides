"use client";

import Link from "next/link";
import { Shield, Thermometer, FlaskConical, Award } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { BuyBar } from "@/components/BuyBar";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { Toaster } from "@/components/ui/sonner";

export function AboutView() {
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
                  <h1 className="mt-4 text-ink" style={{ fontSize: "clamp(30px, 5vw, 52px)" }}>
                    About Aevo
                  </h1>
                  <p className="mx-auto mt-3 max-w-lg text-ink-soft">
                    Official distributors of APEX research peptides in the United Arab Emirates.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <section>
                  <h2 className="mb-4 text-xl font-semibold text-ink">Who We Are</h2>
                  <div className="space-y-4 text-sm leading-relaxed text-ink-soft">
                    <p>
                      Aevo Wellness is a UAE-based distributor specialising in verified
                      research-grade peptides. We are the official distribution partner of{" "}
                      <a
                        href="https://www.apexpharma.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-ink"
                      >
                        APEX
                      </a>
                      , a manufacturer committed to pharmaceutical-grade production standards.
                    </p>
                    <p>
                      We supply researchers, laboratories, and institutions across the UAE
                      with peptides in multiple formats — pre-filled pens, lyophilised vials,
                      and nasal sprays — all verified for purity and shipped under strict
                      cold-chain conditions.
                    </p>
                  </div>
                </section>
              </Reveal>

              <Reveal>
                <section className="mt-12">
                  <h2 className="mb-4 text-xl font-semibold text-ink">Our Standards</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <GlassCard className="p-6">
                      <FlaskConical className="size-6 text-ink" />
                      <h3 className="mt-4 font-semibold text-ink">98%+ Purity</h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        Every batch is third-party tested via HPLC and mass spectrometry
                        to verify a minimum purity of 98%.
                      </p>
                    </GlassCard>

                    <GlassCard className="p-6">
                      <Shield className="size-6 text-ink" />
                      <h3 className="mt-4 font-semibold text-ink">Third-Party Verified</h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        Independent laboratory testing with Certificates of Analysis
                        available for every product lot.
                      </p>
                    </GlassCard>

                    <GlassCard className="p-6">
                      <Thermometer className="size-6 text-ink" />
                      <h3 className="mt-4 font-semibold text-ink">Cold-Chain Delivery</h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        Temperature-controlled storage and shipping to preserve peptide
                        integrity from our facility to your door.
                      </p>
                    </GlassCard>

                    <GlassCard className="p-6">
                      <Award className="size-6 text-ink" />
                      <h3 className="mt-4 font-semibold text-ink">GMP-Aligned Production</h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        APEX manufactures under Good Manufacturing Practice-aligned protocols,
                        ensuring consistency and traceability.
                      </p>
                    </GlassCard>
                  </div>
                </section>
              </Reveal>

              <Reveal>
                <section className="mt-12">
                  <h2 className="mb-4 text-xl font-semibold text-ink">Our Commitment</h2>
                  <div className="space-y-4 text-sm leading-relaxed text-ink-soft">
                    <p>
                      We believe that high-quality research depends on high-quality materials.
                      That&rsquo;s why every product we distribute comes with full documentation,
                      transparent sourcing, and verifiable test results.
                    </p>
                    <p>
                      Our team works closely with APEX to ensure that every peptide format
                      meets the standards expected by the research community — from compound
                      purity to packaging integrity.
                    </p>
                  </div>
                </section>
              </Reveal>

              <Reveal>
                <section className="mt-12">
                  <h2 className="mb-4 text-xl font-semibold text-ink">Our Team</h2>
                  <GlassCard className="p-6">
                    <h3 className="font-semibold text-ink">Aevo Research Team</h3>
                    <p className="mt-1 text-xs font-medium text-ink-soft">
                      Peptide Quality & Distribution
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      Our team brings expertise in pharmaceutical distribution, peptide
                      quality assurance, and cold-chain logistics across the UAE market.
                      Working directly with APEX manufacturing, we verify every batch through
                      independent HPLC and mass spectrometry testing before it reaches
                      researchers. Our published guides on peptide storage, format selection,
                      and purity verification are available on the{" "}
                      <Link href="/blog" className="underline hover:text-ink">
                        Aevo blog
                      </Link>
                      .
                    </p>
                  </GlassCard>
                </section>
              </Reveal>

              <Reveal>
                <section className="mt-12">
                  <h2 className="mb-4 text-xl font-semibold text-ink">Research Use Only</h2>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    All products sold by Aevo Wellness are strictly for laboratory and
                    research use. They are not for human consumption, veterinary use, or
                    any diagnostic or therapeutic application. By purchasing from us, you
                    confirm that you understand and agree to these conditions.
                  </p>
                </section>
              </Reveal>

              <Reveal>
                <section className="mt-12">
                  <h2 className="mb-4 text-xl font-semibold text-ink">Get in Touch</h2>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    Have questions about our products, testing, or partnerships? Reach out
                    via WhatsApp or visit our{" "}
                    <Link href="/shipping" className="underline hover:text-ink">
                      Shipping &amp; Returns
                    </Link>{" "}
                    page for contact details.
                  </p>
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
