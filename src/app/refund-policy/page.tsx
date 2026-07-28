import type { Metadata } from "next";
import { RefundPolicyView } from "./RefundPolicyView";

export const metadata: Metadata = {
  title: "Refund & Returns Policy — Aevo",
  description:
    "Aevo's refund and returns policy for research peptide orders in the UAE.",
  alternates: { canonical: "https://aevowellness.shop/refund-policy" },
  openGraph: {
    title: "Refund & Returns Policy — Aevo",
    description: "Aevo's refund and returns policy for research peptide orders.",
    type: "website",
    url: "https://aevowellness.shop/refund-policy",
  },
};

export default function RefundPolicy() {
  return <RefundPolicyView />;
}
