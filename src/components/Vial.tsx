"use client";
import { cn } from "@/lib/utils";

interface VialProps {
  className?: string;
  /** width in px of the vial illustration */
  width?: number;
  /** Swap for a real transparent product PNG later by passing src */
  src?: string;
  alt?: string;
}

/**
 * Clean CSS/SVG peptide vial matching blue-and-white medical packaging.
 * White/glass body, a hint of sapphire liquid, brushed white cap, glass highlights.
 * Easy to replace with a real transparent PNG via the `src` prop.
 */
export function Vial({ className, width = 150, src, alt = "Aevo peptide vial" }: VialProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ width }}
        className={cn("h-auto select-none", className)}
      />
    );
  }

  return (
    <svg
      width={width}
      height={width * 2.4}
      viewBox="0 0 100 240"
      fill="none"
      role="img"
      aria-label={alt}
      className={cn("select-none", className)}
    >
      <defs>
        <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.18" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#eef2fb" stopOpacity="0.35" />
          <stop offset="0.82" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#c9d4ee" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="liquid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1C3A8E" />
          <stop offset="1" stopColor="#0B1E5C" />
        </linearGradient>
        <linearGradient id="cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f4f6fa" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d6dbe6" />
        </linearGradient>
        <clipPath id="bodyClip">
          <rect x="26" y="58" width="48" height="150" rx="14" />
        </clipPath>
      </defs>

      {/* Cap */}
      <rect x="34" y="16" width="32" height="20" rx="4" fill="url(#cap)" />
      <rect x="30" y="34" width="40" height="14" rx="5" fill="url(#cap)" />
      <rect x="36" y="46" width="28" height="16" rx="3" fill="#e7ebf3" />

      {/* Glass body */}
      <rect
        x="26"
        y="58"
        width="48"
        height="150"
        rx="14"
        fill="url(#glassBody)"
        stroke="#ffffff"
        strokeOpacity="0.7"
      />

      {/* Sapphire liquid (a hint, lower portion) */}
      <g clipPath="url(#bodyClip)">
        <rect x="26" y="120" width="48" height="88" fill="url(#liquid)" />
        <ellipse cx="50" cy="121" rx="24" ry="5" fill="#2546a6" opacity="0.9" />
      </g>

      {/* Glass highlights */}
      <rect x="33" y="68" width="6" height="120" rx="3" fill="#ffffff" opacity="0.65" />
      <rect x="44" y="70" width="3" height="90" rx="1.5" fill="#ffffff" opacity="0.4" />

      {/* Label band */}
      <rect
        x="30"
        y="150"
        width="40"
        height="34"
        rx="4"
        fill="#ffffff"
        opacity="0.92"
      />
      <rect x="35" y="158" width="30" height="3" rx="1.5" fill="#1C3A8E" opacity="0.85" />
      <rect x="35" y="166" width="22" height="2.5" rx="1.25" fill="#6E6E73" />
      <rect x="35" y="172" width="26" height="2.5" rx="1.25" fill="#6E6E73" opacity="0.7" />
    </svg>
  );
}
