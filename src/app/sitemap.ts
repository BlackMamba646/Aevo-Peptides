import type { MetadataRoute } from "next";
import { CATEGORIES, fetchAllProducts } from "@/lib/shopify";

const BASE_URL = "https://aevowellness.shop";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1.0, lastModified: now },
    { url: `${BASE_URL}/science`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/shipping`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
    { url: `${BASE_URL}/refund-policy`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
  ];

  for (const c of CATEGORIES) {
    entries.push({
      url: `${BASE_URL}/collection/${c.handle}`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: now,
    });
  }

  try {
    const products = await fetchAllProducts();
    for (const p of products) {
      entries.push({
        url: `${BASE_URL}/product/${p.handle}`,
        changeFrequency: "weekly",
        priority: 0.7,
        lastModified: now,
      });
    }
  } catch (err) {
    console.error("sitemap: failed to load products", err);
  }

  return entries;
}
