import type { Metadata } from "next";
import { SearchView } from "./SearchView";

export const metadata: Metadata = {
  title: "Search — Aevo",
  description: "Search the Aevo range of peptide research formats.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://aevowellness.shop/search" },
  openGraph: { url: "https://aevowellness.shop/search" },
};

export default function Search() {
  return <SearchView />;
}
