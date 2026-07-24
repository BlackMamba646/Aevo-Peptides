"use client";
import type { ReactElement } from "react";
import { useCurrency, type CurrencyCode } from "@/context/CurrencyContext";

function UAEFlag() {
  return (
    <svg viewBox="0 0 60 40" className="size-full" aria-hidden>
      <rect width="60" height="40" fill="#fff" />
      <rect width="60" height="13.33" fill="#00732F" />
      <rect y="26.67" width="60" height="13.33" fill="#000" />
      <rect width="15" height="40" fill="#FF0000" />
    </svg>
  );
}

const FLAGS: { code: CurrencyCode; label: string; Flag: () => ReactElement }[] = [
  { code: "AED", label: "Dirham (UAE)", Flag: UAEFlag },
];

export function CurrencyToggle({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { code, setCurrency } = useCurrency();
  return (
    <div className={`flex items-center ${compact ? "gap-1" : "gap-1.5"} ${className}`}>
      {FLAGS.map(({ code: c, label, Flag }) => (
        <button
          key={c}
          type="button"
          onClick={() => setCurrency(c)}
          aria-label={`Show prices in ${label}`}
          aria-pressed={code === c}
          className={`overflow-hidden rounded-[3px] ring-1 transition-all ${
            compact ? "h-3.5 w-5" : "h-5 w-7"
          } ${
            code === c
              ? "opacity-100 ring-ink/40 scale-105"
              : "opacity-50 ring-ink/10 hover:opacity-90"
          }`}
        >
          <Flag />
        </button>
      ))}
    </div>
  );
}
