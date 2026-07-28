import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { fetchProductByHandle } from "@/lib/shopify";
import { ProductView } from "./ProductView";

type Params = Promise<{ handle: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { handle } = await params;
  const url = `https://aevowellness.shop/product/${handle}`;
  const product = await fetchProductByHandle(handle).catch(() => null);
  const title = product ? `${product.title} — Aevo` : "Product — Aevo";
  const rawDesc = product?.description?.trim();
  const description =
    rawDesc && rawDesc.length >= 50
      ? rawDesc.slice(0, 300)
      : `${product?.title ?? "Verified peptide research format"} — a verified peptide research format from Aevo, shipped cold-chain across the UAE with same-day Dubai delivery.`;
  const image = product?.images?.[0]?.url;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      ...(image ? { images: [image] } : {}),
    },
    ...(image ? { twitter: { images: [image] } } : {}),
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { handle } = await params;
  const product = await fetchProductByHandle(handle).catch(() => null);
  const url = `https://aevowellness.shop/product/${handle}`;

  let jsonLd: string | null = null;
  if (product) {
    const price = parseFloat(product.priceRange.minVariantPrice.amount);
    const currency = product.priceRange.minVariantPrice.currencyCode ?? "AED";
    const priceValid = new Date();
    priceValid.setFullYear(priceValid.getFullYear() + 1);

    jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          name: product.title,
          description: product.description?.trim() || product.title,
          image: product.images.map((i) => i.url),
          url,
          brand: { "@type": "Brand", name: "APEX" },
          sku: product.handle,
          offers:
            Number.isFinite(price) && price > 0
              ? {
                  "@type": "Offer",
                  price: price.toFixed(2),
                  priceCurrency: currency,
                  priceValidUntil: priceValid.toISOString().split("T")[0],
                  availability: product.availableForSale
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                  url,
                }
              : undefined,
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://aevowellness.shop/" },
            { "@type": "ListItem", position: 2, name: product.title, item: url },
          ],
        },
      ],
    });
  }

  return (
    <CurrencyProvider>
      <CartProvider>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd }}
          />
        )}
        <ProductView product={product} />
      </CartProvider>
    </CurrencyProvider>
  );
}
