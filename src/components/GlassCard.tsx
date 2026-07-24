"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "light" | "dark";
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, tone = "light", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl",
          tone === "light" ? "glass" : "glass-dark",
          className,
        )}
        {...props}
      />
    );
  },
);
GlassCard.displayName = "GlassCard";
