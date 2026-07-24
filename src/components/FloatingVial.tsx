"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Vial } from "@/components/Vial";
import { cn } from "@/lib/utils";

/**
 * A floating vial with a soft breathing sapphire glow halo and a soft shadow.
 * Used in the hero and the dark featured band.
 */
export function FloatingVial({
  width = 150,
  className,
  glowClassName,
  src,
  alt,
}: {
  width?: number;
  className?: string;
  glowClassName?: string;
  src?: string;
  alt?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* sapphire glow halo */}
      <div
        className={cn(
          "sapphire-glow absolute left-1/2 top-1/2 -z-10 size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full motion-safe:animate-breathe",
          glowClassName,
        )}
        aria-hidden
      />
      <motion.div
        className="motion-safe:animate-float"
        animate={reduce ? undefined : undefined}
      >
        {src ? (
          <img
            src={src}
            alt={alt ?? "Aevo peptide vial"}
            style={{ width }}
            className="h-auto select-none drop-shadow-2xl"
          />
        ) : (
          <Vial width={width} />
        )}
        {/* soft shadow beneath */}
        <div
          className="mx-auto mt-2 h-3 rounded-[50%] bg-black/15 blur-md"
          style={{ width: width * 0.7 }}
          aria-hidden
        />
      </motion.div>
    </div>
  );
}
