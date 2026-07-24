"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlassButton } from "@/components/GlassButton";
const logo = "/assets/aevo-logo.svg";

const STORAGE_KEY = "aevo-age-verified";

export function AgeGate() {
  const [verified, setVerified] = React.useState<boolean | null>(null);
  const [declined, setDeclined] = React.useState(false);

  React.useEffect(() => {
    try {
      setVerified(localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      setVerified(false);
    }
  }, []);

  const confirm = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    setVerified(true);
  };

  // Lock scroll while the gate is visible
  React.useEffect(() => {
    if (verified === false) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [verified]);

  const showGate = verified === false;

  return (
    <AnimatePresence>
      {showGate && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black-deep px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* ambient sapphire glow */}
          <div className="sapphire-glow absolute -left-20 top-1/4 size-[420px]" aria-hidden />
          <div className="sapphire-glow absolute -right-24 bottom-0 size-[360px] opacity-70" aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Age verification"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark relative z-10 w-full max-w-md rounded-3xl p-8 text-center sm:p-10"
          >
            <img src={logo} alt="aevo" className="mx-auto h-7 w-auto" />

            {!declined ? (
              <>
                <h2
                  className="mt-8 text-white"
                  style={{ fontSize: "clamp(24px, 4vw, 32px)" }}
                >
                  Are you over 21?
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                  You must be 21 or older to enter this site. All products are for
                  laboratory research use only.
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  <GlassButton
                    variant="solid"
                    size="lg"
                    className="w-full bg-white text-black-deep hover:bg-white"
                    onClick={confirm}
                  >
                    I am over 21
                  </GlassButton>
                  <GlassButton
                    variant="glassDark"
                    size="lg"
                    className="w-full"
                    onClick={() => setDeclined(true)}
                  >
                    I am under 21
                  </GlassButton>
                </div>
              </>
            ) : (
              <>
                <h2
                  className="mt-8 text-white"
                  style={{ fontSize: "clamp(24px, 4vw, 32px)" }}
                >
                  Access restricted
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                  We're sorry, but you must be 21 or older to access this site.
                </p>
                <div className="mt-8">
                  <GlassButton
                    variant="glassDark"
                    size="lg"
                    className="w-full"
                    onClick={() => setDeclined(false)}
                  >
                    Go back
                  </GlassButton>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
