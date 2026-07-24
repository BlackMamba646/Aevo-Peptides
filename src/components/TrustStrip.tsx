"use client";
export function TrustStrip() {
  const items = [
    "Third-party tested",
    "Cold-chain shipped",
    "Fast UAE delivery",
  ];
  return (
    <section className="px-4">
      <div className="glass mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full px-5 py-2.5 text-center text-[13px] text-ink-soft">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden className="text-ink-soft/40">·</span>}
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
