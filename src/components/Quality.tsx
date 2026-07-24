"use client";
import { Leaf, Snowflake, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";

const ITEMS = [
  {
    icon: Snowflake,
    title: "Cold-chain handled",
    body: "Shipped cold and packed with care, from our facility to your door.",
  },
  {
    icon: ShieldCheck,
    title: "Third-party tested",
    body: "Independently checked, with documentation kept clean and clear.",
  },
  {
    icon: Leaf,
    title: "Considered by design",
    body: "Minimal packaging and precise formats — nothing more than needed.",
  },
];

export function Quality() {
  return (
    <section id="quality" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 text-center">
            <h2 className="text-ink" style={{ fontSize: "clamp(30px, 5vw, 52px)" }}>
              How it works.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">
              A simple standard, applied consistently across the range.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <GlassCard className="flex h-full flex-col items-start gap-4 p-6">
                <div className="glass flex size-12 items-center justify-center rounded-2xl">
                  <item.icon className="size-5 text-ink" />
                </div>
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
