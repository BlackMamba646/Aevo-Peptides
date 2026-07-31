import type { Metadata } from "next";
import { ShippingView } from "./ShippingView";

export const metadata: Metadata = {
  title: "UAE Peptide Shipping — Same-Day Dubai Delivery | Aevo",
  description:
    "Same-day cold-chain peptide delivery in Dubai (130 AED) and 24–48 hour tracked shipping across the UAE (70 AED). Temperature-controlled from our facility to your door.",
  alternates: { canonical: "https://aevowellness.shop/shipping" },
  openGraph: {
    title: "UAE Peptide Shipping — Same-Day Dubai Delivery | Aevo",
    description:
      "Same-day delivery in Dubai and 24–48 hour cold-chain shipping across the UAE, plus our returns policy.",
    type: "website",
    url: "https://aevowellness.shop/shipping",
  },
};

export default function Shipping() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aevowellness.shop/" },
      { "@type": "ListItem", position: 2, name: "Shipping & Returns", item: "https://aevowellness.shop/shipping" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ShippingView />
    </>
  );
}
