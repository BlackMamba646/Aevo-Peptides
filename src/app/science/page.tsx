import type { Metadata } from "next";
import { ScienceView } from "./ScienceView";

export const metadata: Metadata = {
  title: "The Science — Aevo",
  description:
    "Inside Aevo's labs: every batch is independently assayed to ≥98% purity by HPLC and mass spectrometry, cold-chain handled and documented to a single standard.",
  alternates: { canonical: "https://aevowellness.shop/science" },
  openGraph: {
    title: "The Science — Aevo",
    description:
      "Independent testing, cold-chain logistics and lab-grade manufacturing — the verified science behind every Aevo format.",
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
  return <ScienceView />;
}
