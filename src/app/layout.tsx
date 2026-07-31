import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GlobalJsonLd } from "@/components/GlobalJsonLd";
import { FacebookPixel } from "@/components/FacebookPixel";
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://aevowellness.shop"),
  title: {
    default: "Aevo | Research-Grade Peptides, ≥98% Verified Purity | UAE",
    template: "%s | Aevo",
  },
  description:
    "Independently assayed to ≥98% purity by HPLC & mass spectrometry. Cold-chain shipped across the UAE with same-day Dubai delivery. BPC-157, TB-500, Semaglutide, Retatrutide & more. For laboratory research use only.",
  authors: [{ name: "Aevo Wellness" }],
  keywords: [
    "research peptides UAE",
    "buy peptides Dubai",
    "BPC-157",
    "Semaglutide",
    "Retatrutide",
    "Tirzepatide",
    "TB-500",
    "peptide pens",
    "peptide vials",
    "nasal spray peptides",
    "HPLC verified peptides",
    "cold-chain peptides",
    "APEX peptides",
  ],
  alternates: {
    languages: {
      "en-GB": "https://aevowellness.shop",
      "en-AE": "https://aevowellness.shop",
      "x-default": "https://aevowellness.shop",
    },
  },
  openGraph: {
    siteName: "Aevo",
    title: "Aevo | Research-Grade Peptides, ≥98% Verified Purity",
    description:
      "Independently assayed to ≥98% purity by HPLC & mass spectrometry. Cold-chain shipped across the UAE with same-day Dubai delivery.",
    type: "website",
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aevo | Research-Grade Peptides, ≥98% Verified Purity",
    description:
      "Independently assayed to ≥98% purity by HPLC & mass spectrometry. Cold-chain shipped across the UAE.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalJsonLd />
        {children}
        <FacebookPixel />
        <CookieConsent />
      </body>
    </html>
  );
}
