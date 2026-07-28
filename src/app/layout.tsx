import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GlobalJsonLd } from "@/components/GlobalJsonLd";
import { FacebookPixel } from "@/components/FacebookPixel";
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://aevowellness.shop"),
  title: "Aevo | Research-Grade Peptides, ≥98% Verified Purity",
  description:
    "Independently assayed to ≥98% purity by HPLC & mass spectrometry. Cold-chain shipped to the UK, EU & UAE. BPC-157, TB-500, Semaglutide, Retatrutide & more. For laboratory research use only.",
  authors: [{ name: "Aevo Wellness" }],
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
      "Independently assayed to ≥98% purity by HPLC & mass spectrometry. Cold-chain shipped to the UK, EU & UAE.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aevo | Research-Grade Peptides, ≥98% Verified Purity",
    description:
      "Independently assayed to ≥98% purity by HPLC & mass spectrometry. Cold-chain shipped to the UK, EU & UAE.",
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
