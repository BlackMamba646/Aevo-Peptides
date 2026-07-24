"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FlaskConical,
  Microscope,
  ShieldCheck,
  Snowflake,
  Thermometer,
  Beaker,
  Activity,
  FileCheck,
} from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { GlassButton } from "@/components/GlassButton";
import { GlassCard } from "@/components/GlassCard";
import { Toaster } from "@/components/ui/sonner";

const heroImg = "/assets/science-hero.png";
const heroImgMobile = "/assets/science-hero-mobile.png";
const orbImg = "/assets/science-orb.png";
const eyeImg = "/assets/science-eye.png";
const footerGradient = "/assets/footer-gradient.png";

const PILLARS = [
  {
    icon: FlaskConical,
    eyebrow: "Testing & quality",
    title: "Verified to a single standard.",
    body: "Every batch is independently assayed to ≥98% purity by HPLC and mass spectrometry, with a certificate of analysis matched to the exact lot it ships with.",
  },
  {
    icon: Snowflake,
    eyebrow: "Cold chain",
    title: "Kept cold, shipped door to door.",
    body: "Temperature-controlled handling from synthesis to your door, with tracked door-to-door delivery across the UAE.",
  },
  {
    icon: Microscope,
    eyebrow: "Manufacturing",
    title: "State-of-the-art laboratories.",
    body: "Biotech and peptide synthesis laboratories with controlled manufacturing environments and validated, repeatable workflows.",
  },
];

const PROCESS = [
  {
    icon: Beaker,
    title: "Synthesis",
    body: "Peptides are produced in controlled, validated environments with traceable raw materials.",
  },
  {
    icon: Activity,
    title: "Assay",
    body: "Each lot is run through HPLC and mass spectrometry to confirm identity and purity.",
  },
  {
    icon: Thermometer,
    title: "Cold handling",
    body: "Product is held and packed at 2–8°C, then shipped in temperature-controlled packaging.",
  },
  {
    icon: FileCheck,
    title: "Documentation",
    body: "A certificate of analysis is matched to the lot number printed on your order.",
  },
];

export function ScienceView() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <CurrencyProvider>
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* ───────── Hero ───────── */}
          <section
            ref={heroRef}
            className="relative flex min-h-[88vh] items-end overflow-hidden bg-black-deep"
          >
            <motion.img
              src={heroImg}
              alt="A hand holding a KLIKSEMAX nasal spray against a soft grey studio backdrop"
              style={reduce ? undefined : { y: imgY }}
              initial={reduce ? false : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 hidden size-full object-cover object-center sm:block"
            />
            <motion.img
              src={heroImgMobile}
              alt="A hand holding a KLIKSEMAX nasal spray against a soft grey studio backdrop"
              style={reduce ? undefined : { y: imgY }}
              initial={reduce ? false : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 size-full object-cover object-center sm:hidden"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent"
              aria-hidden
            />

            <div className="relative z-10 w-full px-4 pb-10 pt-40 sm:px-6 sm:pb-14">
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xs font-medium uppercase tracking-[0.3em] text-white/50"
              >
                The science
              </motion.p>
              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 font-light text-white"
                style={{ fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 300, lineHeight: 1.1 }}
              >
                Measured, verified,
                <br />
                <span className="text-white/50">and documented.</span>
              </motion.h1>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="mt-5 max-w-md text-base font-light text-white/65 sm:text-lg"
              >
                The official distributors of Apex Pharma.
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <GlassButton variant="glassDark" size="lg" asChild>
                  <Link href="/#products">
                    Shop the range
                  </Link>
                </GlassButton>
                <GlassButton variant="glass" size="lg" asChild>
                  <a
                    href="https://www.apexpharma.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Verification
                  </a>
                </GlassButton>
              </motion.div>
            </div>
          </section>


          {/* ───────── Orb backdrop: pillars → purity ───────── */}
          <div className="relative overflow-hidden bg-offwhite">
            {/* Orb background image spans both sections */}
            <motion.img
              src={orbImg}
              alt="A soft luminous horizon — the clean baseline Aevo measures purity against"
              initial={reduce ? false : { opacity: 0, scale: 1.08 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 size-full object-cover"
            />
            {/* Soft wash so the text stays legible over the orb */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/55 to-white/40"
              aria-hidden
            />

            <div className="relative z-10">
              {/* ───────── Pillars ───────── */}
              <section className="px-4 py-24 sm:py-28">
                <div className="mx-auto max-w-6xl">
                  <Reveal>
                    <div className="mb-12 max-w-xl">
                      <h2 className="text-black" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
                        From the lab to your door.
                      </h2>
                      <p className="mt-3 text-ink-soft">
                        Three disciplines, applied consistently across the entire range.
                      </p>
                    </div>
                  </Reveal>

                  {/* Mobile: swipeable scroll carousel — flick left/right with finger or cursor */}
                  <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
                    {PILLARS.map((p) => (
                      <GlassCard
                        key={p.title}
                        className="flex w-[78vw] max-w-[320px] shrink-0 snap-center flex-col items-start gap-4 p-7"
                      >
                        <div className="glass flex size-12 items-center justify-center rounded-2xl">
                          <p.icon className="size-5 text-ink" />
                        </div>
                        <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">
                          {p.eyebrow}
                        </p>
                        <h3 className="text-lg font-semibold text-black/70">{p.title}</h3>
                        <p className="text-sm leading-relaxed text-ink-soft">{p.body}</p>
                      </GlassCard>
                    ))}
                  </div>

                  {/* Desktop: static grid */}
                  <div className="hidden gap-5 md:grid md:grid-cols-3">
                    {PILLARS.map((p, i) => (
                      <Reveal key={p.title} delay={i * 0.08}>
                        <GlassCard className="flex h-full flex-col items-start gap-4 p-7">
                          <div className="glass flex size-12 items-center justify-center rounded-2xl">
                            <p.icon className="size-5 text-ink" />
                          </div>
                          <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">
                            {p.eyebrow}
                          </p>
                          <h3 className="text-lg font-semibold text-black/70">{p.title}</h3>
                          <p className="text-sm leading-relaxed text-ink-soft">{p.body}</p>
                        </GlassCard>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </section>

              {/* ───────── Purity spotlight ───────── */}
              <section className="px-4 pb-28 pt-4 sm:pb-40">
                <div className="mx-auto max-w-2xl text-center">
                  <Reveal>
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-ink-soft">
                      Purity, proven
                    </p>
                    <h2 className="mt-3 text-ink" style={{ fontSize: "clamp(48px, 12vw, 120px)", fontWeight: 300 }}>
                      <CountUp to={98} suffix="%+" duration={2000} className="tabular-nums" />
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-ink-soft">
                      Independently verified by high-performance liquid
                      chromatography and confirmed by mass spectrometry. No batch
                      ships without a certificate of analysis tied to its lot.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-3">
                      <ShieldCheck className="size-5 text-ink" />
                      <span className="text-sm font-medium text-ink">
                        Every lot. Every time. No exceptions.
                      </span>
                    </div>
                  </Reveal>
                </div>
              </section>
            </div>
          </div>

        </main>

        {/* ───────── Gradient backdrop: process → footer ───────── */}
        <div className="relative overflow-hidden">
          <img
            src={footerGradient}
            alt=""
            aria-hidden
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-sky-50/80 to-sky-100/70" aria-hidden />
          <div className="relative">
            {/* ───────── Process timeline ───────── */}
            <section id="process" className="px-4 py-24 sm:py-28">

            <div className="mx-auto max-w-6xl">
              <Reveal>
                <div className="mb-14 text-center">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-ink-soft">
                    The process
                  </p>
                  <h2 className="mt-3 text-ink" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
                    Four steps, one standard.
                  </h2>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {PROCESS.map((step, i) => (
                  <Reveal key={step.title} delay={i * 0.08}>
                    <GlassCard className="flex h-full flex-col gap-4 p-7">
                      <div className="flex items-center justify-between">
                        <div className="glass flex size-12 items-center justify-center rounded-2xl">
                          <step.icon className="size-5 text-ink" />
                        </div>
                        <span className="text-3xl font-light tabular-nums text-ink/15">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-ink-soft">{step.body}</p>
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ───────── CTA ───────── */}
          <section className="px-4 pb-28">
            <Reveal>
              <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-white/60 px-6 py-20 text-center glass">
                <div className="relative">
                  <motion.img
                    src={eyeImg}
                    alt="Macro close-up of a human eye"
                    className="mx-auto mb-8 h-24 w-24 rounded-full object-cover shadow-lg ring-1 ring-ink/10 sm:h-28 sm:w-28"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  />
                  <h2 className="mx-auto max-w-xl text-ink" style={{ fontSize: "clamp(28px, 5vw, 46px)" }}>
                    Science you can verify.
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-ink-soft">
                    Explore the range, each held to the same standard you've just read about.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <GlassButton variant="solid" size="lg" asChild>
                      <Link href="/#products">Shop the range</Link>
                    </GlassButton>
                    <GlassButton variant="glass" size="lg" asChild>
                      <Link href="/">Back to home</Link>
                    </GlassButton>
                  </div>
                </div>
              </div>
            </Reveal>
            </section>
            <Footer bare />
          </div>
        </div>
        <CartDrawer />

      </div>
      <Toaster position="top-center" />
    </CartProvider>
    </CurrencyProvider>
  );
}
