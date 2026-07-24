import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { CATEGORIES, fetchCategoryProducts } from "@/lib/shopify";
import { CollectionView } from "./CollectionView";

type Params = Promise<{ handle: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { handle } = await params;
  const url = `https://aevowellness.shop/collection/${handle}`;
  const category = CATEGORIES.find((c) => c.handle === handle);
  const title = category ? `${category.title} — Shop peptides | Aevo` : "Shop the range — Aevo";
  const description = category
    ? `${category.title} peptides at Aevo: ${category.blurb} Verified for research and shipped cold-chain across the UAE.`
    : "Browse verified peptide research formats from Aevo, shipped cold-chain across the UAE with same-day Dubai delivery.";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, type: "website", url },
  };
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { handle } = await params;
  const category = CATEGORIES.find((c) => c.handle === handle);
  const products = category
    ? await fetchCategoryProducts(handle).catch(() => [])
    : [];
  const url = `https://aevowellness.shop/collection/${handle}`;

  const jsonLd = category
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: category.title,
        description: `${category.title} peptides at Aevo: ${category.blurb} Verified for research and shipped cold-chain across the UAE.`,
        url,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://aevowellness.shop/product/${p.handle}`,
            name: p.title,
          })),
        },
      })
    : null;

  return (
    <CurrencyProvider>
      <CartProvider>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd }}
          />
        )}
        <CollectionView handle={handle} products={products} />
      </CartProvider>
    </CurrencyProvider>
  );
}
