import type { Metadata } from "next";
import { ScienceView } from "./ScienceView";

export const metadata: Metadata = {
  title: "Peptide Purity & Testing — HPLC Verified ≥98%",
  description:
    "How Aevo verifies every peptide batch: independent HPLC and mass spectrometry assays to ≥98% purity, cold-chain handling from synthesis to delivery, and a Certificate of Analysis with every lot.",
  alternates: { canonical: "https://aevowellness.shop/science" },
  openGraph: {
    title: "Peptide Purity & Testing — HPLC Verified ≥98%",
    description:
      "Independent testing, cold-chain logistics and lab-grade manufacturing — the verified science behind every Aevo peptide format.",
    type: "website",
    url: "https://aevowellness.shop/science",
    images: ["https://aevowellness.shop/assets/science-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://aevowellness.shop/assets/science-hero.png"],
  },
};

export default function Science() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aevowellness.shop/" },
      { "@type": "ListItem", position: 2, name: "Science", item: "https://aevowellness.shop/science" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ScienceView />
    </>
  );
}
