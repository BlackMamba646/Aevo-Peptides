"use client";
import Link from "next/link";
import { GlassButton } from "@/components/GlassButton";
import { GlassCard } from "@/components/GlassCard";
import { Vial } from "@/components/Vial";
import { useCurrency } from "@/context/CurrencyContext";
import { buildWhatsAppOrderUrl, trackWhatsAppInitiateCheckout } from "@/lib/whatsapp";
import type { ShopifyProduct } from "@/lib/shopify";

function ProductMedia({ product }: { product: ShopifyProduct }) {
  const img = product.images[0];
  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl">
      <div className="sapphire-glow absolute left-1/2 top-1/2 size-2/3 -translate-x-1/2 -translate-y-1/2 opacity-40" aria-hidden />
      {img ? (
        <img
          src={img.url}
          alt={img.altText ?? product.title}
          loading="lazy"
          className="relative h-full w-full object-cover"
        />
      ) : (
        <Vial width={90} />
      )}
    </div>
  );
}

export function ProductCard({ product, className }: { product: ShopifyProduct; className?: string }) {
  const { format } = useCurrency();
  const orderUrl = buildWhatsAppOrderUrl({
    title: product.title,
  });
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <GlassCard className={`flex flex-col p-3 sm:p-4 ${className ?? ""}`}>
      <Link href={`/product/${product.handle}`} aria-label={`View ${product.title}`}>
        <ProductMedia product={product} />
      </Link>
      <div className="mt-3 flex flex-1 flex-col sm:mt-4">
        <Link href={`/product/${product.handle}`}>
          <h3 className="text-base font-medium text-ink sm:text-lg">{product.title}</h3>
        </Link>
        {Number.isFinite(price) && price > 0 && (
          <p className="mt-1 text-base font-semibold text-ink sm:text-lg">{format(price)}</p>
        )}
        <div className="mt-3 flex-1 sm:mt-4 flex items-end">
          <GlassButton variant="glass" size="sm" className="w-full" asChild>
            <a href={orderUrl} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppInitiateCheckout}>
              Order
            </a>
          </GlassButton>
        </div>
      </div>
    </GlassCard>
  );
}
