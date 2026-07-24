"use client";

import * as React from "react";

export type CurrencyCode = "AED";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  /** multiplier applied to the base AED price (Shopify's store currency) */
  rate: number;
  /** place the symbol before or after the amount */
  position: "before" | "after";
}

// Shopify returns prices in AED, so AED is the base currency (rate 1).
export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  AED: { code: "AED", symbol: "AED ", rate: 1, position: "before" },
};

interface CurrencyContextValue {
  currency: CurrencyInfo;
  code: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  /** convert a base AED amount into the active currency, rounded */
  convert: (aed: number) => number;
  /** format a base AED amount as a display string in the active currency */
  format: (aed: number) => string;
}

const CurrencyContext = React.createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [code, setCode] = React.useState<CurrencyCode>("AED");
  const currency = CURRENCIES[code];

  const convert = React.useCallback(
    (aed: number) => Math.round(aed * CURRENCIES[code].rate),
    [code],
  );

  const format = React.useCallback(
    (aed: number) => {
      const c = CURRENCIES[code];
      const amount = Math.round(aed * c.rate).toLocaleString("en-US");
      return c.position === "before"
        ? `${c.symbol}${amount}`
        : `${amount}${c.symbol}`;
    },
    [code],
  );

  const value: CurrencyContextValue = {
    currency,
    code,
    setCurrency: setCode,
    convert,
    format,
  };

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = React.useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
