import type { Metadata } from "next";
import { TermsView } from "./TermsView";

export const metadata: Metadata = {
  title: "Terms of Service — Aevo Wellness",
  description:
    "Terms and conditions for using the Aevo Wellness website and purchasing research peptides in the UAE. Read before placing your order.",
  alternates: { canonical: "https://aevowellness.shop/terms" },
  openGraph: {
    title: "Terms of Service — Aevo Wellness",
    description: "Terms and conditions for using the Aevo Wellness website and purchasing research peptides.",
    type: "website",
    url: "https://aevowellness.shop/terms",
  },
};

export default function Terms() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aevowellness.shop/" },
      { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://aevowellness.shop/terms" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TermsView />
    </>
  );
}
