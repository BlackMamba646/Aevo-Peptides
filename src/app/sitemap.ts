import type { MetadataRoute } from "next";
import { CATEGORIES, fetchAllProducts } from "@/lib/shopify";

const BASE_URL = "https://aevowellness.shop";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/science`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/shipping`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/search`, changeFrequency: "monthly", priority: 0.4 },
  ];

  for (const c of CATEGORIES) {
    entries.push({
      url: `${BASE_URL}/collection/${c.handle}`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  try {
    const products = await fetchAllProducts();
    for (const p of products) {
      entries.push({
        url: `${BASE_URL}/product/${p.handle}`,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  } catch (err) {
    console.error("sitemap: failed to load products", err);
  }

  return entries;
}
