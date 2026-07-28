import type { Metadata } from "next";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: "About Aevo Wellness — Research Peptides UAE",
  description:
    "Aevo Wellness is the official distributor of APEX research peptides in the UAE. Learn about our commitment to 98%+ purity, third-party testing, and cold-chain delivery.",
  alternates: { canonical: "https://aevowellness.shop/about" },
  openGraph: {
    title: "About Aevo Wellness — Research Peptides UAE",
    description:
      "Official distributor of APEX research peptides in the UAE. Third-party tested, cold-chain shipped.",
    type: "website",
    url: "https://aevowellness.shop/about",
  },
};

export default function About() {
  return <AboutView />;
}
