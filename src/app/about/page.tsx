import type { Metadata } from "next";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: "About Aevo — Official APEX Peptide Distributors UAE",
  description:
    "Aevo Wellness is the official UAE distributor of APEX research peptides. 98%+ purity verified by HPLC & mass spectrometry, GMP-aligned manufacturing, and cold-chain delivery.",
  alternates: { canonical: "https://aevowellness.shop/about" },
  openGraph: {
    title: "About Aevo — Official APEX Peptide Distributors UAE",
    description:
      "Official distributor of APEX research peptides in the UAE. Third-party tested, cold-chain shipped.",
    type: "website",
    url: "https://aevowellness.shop/about",
  },
};

export default function About() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aevowellness.shop/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://aevowellness.shop/about" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutView />
    </>
  );
}
