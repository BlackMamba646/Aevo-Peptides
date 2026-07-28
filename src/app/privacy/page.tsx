import type { Metadata } from "next";
import { PrivacyView } from "./PrivacyView";

export const metadata: Metadata = {
  title: "Privacy Policy — Aevo",
  description:
    "How Aevo Wellness collects, uses and protects your personal data. Read our full privacy policy.",
  alternates: { canonical: "https://aevowellness.shop/privacy" },
  openGraph: {
    title: "Privacy Policy — Aevo",
    description: "How Aevo Wellness collects, uses and protects your personal data.",
    type: "website",
    url: "https://aevowellness.shop/privacy",
  },
};

export default function Privacy() {
  return <PrivacyView />;
}
