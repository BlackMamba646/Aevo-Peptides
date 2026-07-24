"use client";
interface MarqueeProps {
  text: string;
  /** number of repeated copies in each half — keeps the track seamless */
  repeat?: number;
  /** text colour tone — "light" for white text, "dark" for grey ink text */
  tone?: "light" | "dark";
}

/**
 * Seamless, infinitely-scrolling banner.
 * The track holds two identical halves and translates -50%,
 * so the loop has no visible seam.
 */
export function Marquee({ text, repeat = 4, tone = "light" }: MarqueeProps) {
  const items = Array.from({ length: repeat });
  const textColor = tone === "dark" ? "text-ink-soft" : "text-white/70";
  const dotColor = tone === "dark" ? "text-ink/30" : "text-white/30";

  const Half = () => (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((_, i) => (
        <span key={i} className="flex items-center">
          <span className={`px-6 text-[13px] font-medium tracking-wide ${textColor}`}>
            {text}
          </span>
          <span className={dotColor}>•</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="group relative w-full overflow-hidden">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <Half />
        <Half />
      </div>
      <span className="sr-only">{text}</span>
    </div>
  );
}
