"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trackWhatsAppInitiateCheckout } from "@/lib/whatsapp";

/**
 * Sticky bottom glass WhatsApp bar for mobile. Appears after the user scrolls past
 * the hero, giving a one-tap path to speak with the team. Hidden on desktop.
 */
export function BuyBar() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <a
            href="https://wa.me/447832619150"
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppInitiateCheckout}
            className="glass flex items-center justify-center gap-2 rounded-full p-3 text-sm font-medium text-slate-600 transition-colors hover:bg-white/70 hover:text-slate-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-400"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Speak to our specialists
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
