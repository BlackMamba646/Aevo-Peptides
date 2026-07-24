"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GlassButton } from "@/components/GlassButton";
import { Marquee } from "@/components/Marquee";
const heroImg = "/assets/science-runner.png";
const aevoLogo = "/assets/aevo-logo.svg";
import { trackWhatsAppInitiateCheckout } from "@/lib/whatsapp";

export function Hero() {
  const reduce = useReducedMotion();
  const [purity, setPurity] = useState(reduce ? 98 : 50);

  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPurity(Math.round(50 + eased * 48));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-black-deep"
    >
      {/* Hero image — full bleed */}
      <motion.img
        src={heroImg}
        alt="A runner in motion overlaid with a grid of data points — the human signal Aevo measures against"
        initial={reduce ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 size-full object-cover object-[32%_center] sm:object-center"
      />

      {/* Readability gradient — strongest at the bottom-left where the copy sits */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent sm:from-black/60 sm:via-transparent"
        aria-hidden
      />
      {/* AEVO logo — top left, white */}
      <motion.img
        src={aevoLogo}
        alt="Aevo brand logo"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-4 top-4 z-20 h-6 sm:left-8 sm:top-6 sm:h-7"
        style={{ filter: "brightness(0) invert(1)" }}
      />

      {/* Animated purity badge — top right */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-dark absolute right-4 top-24 z-20 flex flex-col items-end rounded-2xl px-4 py-3 sm:right-8 sm:top-20"
        aria-label={`${purity} percent purity`}
      >
        <span className="text-3xl font-light leading-none tabular-nums text-white sm:text-4xl">
          {purity}%
        </span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
          Purity
        </span>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/2 backdrop-blur-md [mask-image:linear-gradient(to_top,black_45%,transparent)]"
        aria-hidden
      />
      {/* Extra blur on the left so the copy stays crisp over the figure */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-1/2 backdrop-blur-md [mask-image:linear-gradient(to_right,black_30%,transparent)] sm:block"
        aria-hidden
      />

      {/* Copy — anchored bottom-left */}
      <div className="relative z-10 mt-auto w-full px-4 pb-24 pt-28 sm:px-6 sm:pl-12 md:pb-28 md:pl-20">
        <div className="max-w-2xl text-left">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-light tracking-tight text-white"
            style={{ fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 300, lineHeight: 1.1 }}
          >
            Science you
            <br />
            <span className="text-white/50">can verify.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-sm text-balance text-base font-light text-white/60 sm:max-w-none sm:whitespace-nowrap sm:text-lg"
          >
            Independently verified to 98%+ and held to a single standard.
          </motion.p>

          {/* Shop CTA — below copy on the left on mobile */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex flex-col items-start gap-3 sm:hidden"
          >
            <GlassButton variant="glassDark" size="default" onClick={() => scrollTo("#products")}>
              Shop the range
            </GlassButton>
          </motion.div>
        </div>
      </div>

      {/* CTAs — anchored bottom-right on desktop */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-24 right-8 z-10 hidden items-center gap-4 sm:flex md:bottom-28 md:right-12"
      >
        <a
          href="https://wa.me/447832619150"
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppInitiateCheckout}
          className="text-[15px] font-medium text-white transition-opacity hover:opacity-70"
        >
          Speak to Our Specialists ›
        </a>
        <GlassButton variant="glassDark" size="lg" onClick={() => scrollTo("#products")}>
          Shop the range
        </GlassButton>
      </motion.div>

      {/* Speak to specialists — right side just above the banner on mobile */}
      <motion.a
        href="https://wa.me/447832619150"
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsAppInitiateCheckout}
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-14 right-4 z-20 text-[15px] font-medium text-white transition-opacity hover:opacity-70 sm:hidden"
      >
        Speak to Our Specialists ›
      </motion.a>

      {/* Moving trust banner — frosts the hero image scrolling behind it */}
      <div className="glass-dark absolute inset-x-0 bottom-0 z-20 rounded-none border-x-0 border-b-0 py-3">
        <Marquee text="Third-party tested · Cold chain shipped · Fast UAE delivery" />
      </div>
    </section>
  );
}
