import type { Metadata } from "next";
import { PrivacyView } from "./PrivacyView";

export const metadata: Metadata = {
  title: "Privacy Policy — Aevo Wellness",
  description:
    "How Aevo Wellness collects, uses and protects your personal data when you browse or purchase research peptides. Read our full privacy policy.",
  alternates: { canonical: "https://aevowellness.shop/privacy" },
  openGraph: {
    title: "Privacy Policy — Aevo Wellness",
    description: "How Aevo Wellness collects, uses and protects your personal data.",
    type: "website",
    url: "https://aevowellness.shop/privacy",
  },
};

export default function Privacy() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aevowellness.shop/" },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://aevowellness.shop/privacy" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PrivacyView />
    </>
  );
}
