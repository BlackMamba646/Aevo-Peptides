import type { Metadata } from "next";
import { RefundPolicyView } from "./RefundPolicyView";

export const metadata: Metadata = {
  title: "Refund & Returns Policy — Aevo Wellness",
  description:
    "Aevo's refund and returns policy for research peptide orders in the UAE. Learn about our policy for damaged or incorrect shipments.",
  alternates: { canonical: "https://aevowellness.shop/refund-policy" },
  openGraph: {
    title: "Refund & Returns Policy — Aevo Wellness",
    description: "Aevo's refund and returns policy for research peptide orders in the UAE.",
    type: "website",
    url: "https://aevowellness.shop/refund-policy",
  },
};

export default function RefundPolicy() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aevowellness.shop/" },
      { "@type": "ListItem", position: 2, name: "Refund Policy", item: "https://aevowellness.shop/refund-policy" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <RefundPolicyView />
    </>
  );
}
