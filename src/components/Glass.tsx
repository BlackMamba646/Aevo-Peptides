"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type GlassProps<T extends React.ElementType> = {
  as?: T;
  dark?: boolean;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * One reusable frosted-glass primitive.
 * Use for buttons, nav pills and cards. Keep it in normal flow —
 * never nest inside a parent with transform/filter/will-change, or
 * backdrop-filter sampling breaks.
 */
export function Glass<T extends React.ElementType = "div">({
  as,
  dark,
  className = "",
  ...props
}: GlassProps<T>) {
  const Tag = (as ?? "div") as React.ElementType;
  return <Tag className={cn(dark ? "glass-dark" : "glass", className)} {...props} />;
}
