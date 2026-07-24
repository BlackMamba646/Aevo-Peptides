import type { Metadata } from "next";
import { ShippingView } from "./ShippingView";

export const metadata: Metadata = {
  title: "Shipping & Returns — Aevo",
  description:
    "Aevo delivery options across the UAE — same-day delivery in Dubai and 24–48 hour delivery — plus our returns policy.",
  alternates: { canonical: "https://aevowellness.shop/shipping" },
  openGraph: {
    title: "Shipping & Returns — Aevo",
    description:
      "Same-day delivery in Dubai and 24–48 hour delivery across the UAE, plus our returns policy.",
    type: "website",
    url: "https://aevowellness.shop/shipping",
  },
};

export default function Shipping() {
  return <ShippingView />;
}
