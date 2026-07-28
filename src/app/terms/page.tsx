import type { Metadata } from "next";
import { TermsView } from "./TermsView";

export const metadata: Metadata = {
  title: "Terms of Service — Aevo",
  description:
    "Terms and conditions for using the Aevo Wellness website and purchasing research peptides.",
  alternates: { canonical: "https://aevowellness.shop/terms" },
  openGraph: {
    title: "Terms of Service — Aevo",
    description: "Terms and conditions for using the Aevo Wellness website.",
    type: "website",
    url: "https://aevowellness.shop/terms",
  },
};

export default function Terms() {
  return <TermsView />;
}
