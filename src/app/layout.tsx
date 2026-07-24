import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GlobalJsonLd } from "@/components/GlobalJsonLd";
import { FacebookPixel } from "@/components/FacebookPixel";

export const metadata: Metadata = {
  metadataBase: new URL("https://aevowellness.shop"),
  title: "Aevo wellness",
  description:
    "A premium e-commerce site for Aevo peptides, offering a frictionless mobile-first shopping experience.",
  authors: [{ name: "Lovable" }],
  openGraph: {
    siteName: "Aevo",
    title: "Aevo wellness",
    description:
      "A premium e-commerce site for Aevo peptides, offering a frictionless mobile-first shopping experience.",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@Lovable",
    title: "Aevo wellness",
    description:
      "A premium e-commerce site for Aevo peptides, offering a frictionless mobile-first shopping experience.",
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
      </body>
    </html>
  );
}
