"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { BuyBar } from "@/components/BuyBar";
import { ProductCard } from "@/components/ProductCard";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { Toaster } from "@/components/ui/sonner";
import { RESEARCH_USE_NOTICE } from "@/data/products";
import { CATEGORIES, type ShopifyProduct } from "@/lib/shopify";

const COLLECTION_INTROS: Record<string, string> = {
  "weight-loss":
    "Aevo's weight-management research collection features peptides studied for their roles in metabolic regulation, appetite signalling, and fat oxidation. This range includes GLP-1 receptor agonists such as Retatrutide and Tirzepatide alongside growth-hormone-releasing fragments like AOD-9604 and HGH Fragment 176-191. Every batch is independently verified to a minimum 98% purity via HPLC and mass spectrometry, with per-lot Certificates of Analysis available. All products are cold-chain shipped across the UAE with same-day Dubai delivery, and are supplied exclusively for laboratory and research purposes.",
  "recovery":
    "The recovery collection brings together peptides at the centre of tissue-repair and inflammation research. BPC-157, a pentadecapeptide studied for its effects on tendon, ligament, and gut-lining models, is paired with TB-500 (Thymosin Beta-4), investigated for its role in cell migration and wound healing. The range also includes KPV, a tripeptide fragment with anti-inflammatory research interest, and DSIP, studied in sleep-architecture and recovery protocols. Each product is third-party tested to ≥98% purity, stored under controlled cold-chain conditions, and intended strictly for research use.",
  "energy-longevity":
    "This collection targets the intersection of cellular energy metabolism and longevity research. NAD+ precursors, MOTS-c (a mitochondrial-derived peptide studied for exercise-mimetic effects), Epitalon (investigated in telomerase-activation research), and SS-31 (Elamipretide, a mitochondria-targeted peptide) represent some of the most actively researched compounds in the ageing-science field. GHK-Cu and Glutathione round out the range with antioxidant and tissue-remodelling research applications. All products are HPLC and mass-spectrometry verified to ≥98% purity, with Certificates of Analysis matched to each production lot.",
  "brain-performance":
    "Aevo's cognitive and neuroactive research collection includes Semax and Selank — synthetic peptide analogues studied for their effects on BDNF expression, anxiety models, and cognitive performance in preclinical research. The range extends to PT-141 (Bremelanotide), investigated for melanocortin-receptor activation, and Kisspeptin, studied in neuroendocrine signalling pathways. AICAR and SLU-PP-332, both subjects of exercise-mimetic and metabolic research, complete the collection. Every compound is independently assayed, cold-chain stored, and shipped for laboratory research use only.",
  "hormone-optimization":
    "The hormone-optimisation research collection centres on growth-hormone secretagogues and releasing factors that are widely studied in endocrine research. Ipamorelin and GHRP-2/6 (ghrelin-receptor agonists), Sermorelin and CJC-1295 (GHRH analogues), and Tesamorelin (studied in visceral-fat and GH-axis research) form the core of this range. Somatropin (recombinant HGH) is also available for qualified research applications. All products are manufactured by APEX, verified to ≥98% purity via third-party HPLC and mass spectrometry, and shipped under cold-chain conditions across the UAE.",
};

export function CollectionView({
  handle,
  products,
}: {
  handle: string;
  products: ShopifyProduct[];
}) {
  const current = CATEGORIES.find((c) => c.handle === handle);
  const intro = COLLECTION_INTROS[handle];
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main
        className="pt-16"
        style={{
          background:
            "radial-gradient(75% 22% at 50% 12%, rgba(28,58,142,0.14) 0%, transparent 70%), linear-gradient(180deg, #eef0f3 0%, #e9ebee 60%, #e6e7e9 100%)",
        }}
      >
        <div className="border-b border-ink/10 py-2.5">
          <Marquee text="Same day delivery available in Dubai" tone="dark" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-20">
          <Reveal>
            <div className="mb-8 text-center">
              <Link href="/#products" className="text-sm text-ink-soft hover:text-ink">
                ← Back to the range
              </Link>
              <h1 className="mt-4 text-ink" style={{ fontSize: "clamp(30px, 5vw, 52px)" }}>
                {current?.title ?? "The range"}
              </h1>
              <p className="mx-auto mt-3 max-w-md text-ink-soft">
                Verified for laboratory research. Held to a single standard.
              </p>
              {intro && (
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                  {intro}
                </p>
              )}
            </div>
          </Reveal>

          <div className="mb-10 flex justify-center">
            <div className="glass inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.handle}
                  href={`/collection/${c.handle}`}
                  className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    c.handle === handle ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>

          {!current ? (
            <p className="py-16 text-center text-ink-soft">Collection not found.</p>
          ) : products.length === 0 ? (
            <p className="py-16 text-center text-ink-soft">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i * 0.04, 0.3)}>
                  <ProductCard product={p} className="h-full" />
                </Reveal>
              ))}
            </div>
          )}

          <p className="mt-10 text-center text-xs font-medium uppercase tracking-wide text-ink-soft">
            {RESEARCH_USE_NOTICE}
          </p>
        </div>
        <Footer />
      </main>
      <CartDrawer />
      <BuyBar />
      <Toaster position="top-center" />
    </div>
  );
}
