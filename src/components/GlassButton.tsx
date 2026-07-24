"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const glassButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium cursor-pointer select-none transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0 motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        // see-through glass on light surfaces
        glass:
          "glass text-ink hover:brightness-105 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]",
        // see-through glass on dark surfaces
        glassDark:
          "glass-dark text-white hover:brightness-110 hover:scale-[1.02] hover:shadow-[0_8px_28px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.18)]",
        // solid primary pill (ink) — still pill-shaped, used for high-intent CTAs
        solid:
          "bg-ink text-white hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-[15px]",
        lg: "h-13 px-8 text-base min-h-11",
        icon: "h-11 w-11",
        iconSm: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "default",
    },
  },
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  asChild?: boolean;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(glassButtonVariants({ variant, size, className }))} {...props} />
    );
  },
);
GlassButton.displayName = "GlassButton";

export { glassButtonVariants };
