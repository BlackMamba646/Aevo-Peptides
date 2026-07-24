"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { CATEGORIES } from "@/lib/shopify";
const catWeightLoss = "/assets/cat-weight-loss.png";
const catFocus = "/assets/cat-focus.png";
const catHormone = "/assets/cat-hormone.png";
const catEnergy = "/assets/cat-energy.png";
const catRecovery = "/assets/cat-recovery.png";

const IMAGES: Record<string, string> = {
  "weight-loss": catWeightLoss,
  "brain-performance": catFocus,
  "hormone-optimization": catHormone,
  "energy-longevity": catEnergy,
  recovery: catRecovery,
};

// Display order requested: weight loss, focus, optimise hormones, increase energy, recovery
const ORDER = [
  "weight-loss",
  "brain-performance",
  "recovery",
  "energy-longevity",
  "hormone-optimization",
];

function CategoryCard({ handle }: { handle: string }) {
  const category = CATEGORIES.find((c) => c.handle === handle);
  if (!category) return null;

  return (
    <Link
      href={`/collection/${category.handle}`}
      aria-label={`Browse ${category.title}`}
      className="group block h-full"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-ink/10 transition-transform duration-300 group-hover:-translate-y-1">
        <img
          src={IMAGES[category.handle]}
          alt={category.title}
          loading="lazy"
          width={1024}
          height={1365}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[10px] font-medium uppercase tracking-wide text-white/70">
            {category.title}
          </p>
          <h3 className="mt-1 text-lg font-medium leading-tight text-white">{category.label}</h3>
          <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-white">
            Explore
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProductGrid() {
  return (
    <section id="products" className="relative pt-20 pb-0 sm:pt-28 sm:pb-2">
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="mb-10 text-center">
            <h2 className="text-ink" style={{ fontSize: "clamp(30px, 5vw, 52px)" }}>
              Shop by goal.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">
              Five focused categories. Choose your goal, explore the range.
            </p>
          </div>
        </Reveal>

        {/* 2 per row on mobile, all 5 in a single aligned row on desktop */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {ORDER.map((handle, i) => (
            <Reveal key={handle} delay={Math.min(i * 0.05, 0.25)}>
              <CategoryCard handle={handle} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
