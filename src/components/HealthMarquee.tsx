"use client";
const phoneCutout = "/assets/home-health-areas-cutout.png";
import { trackWhatsAppInitiateCheckout } from "@/lib/whatsapp";

const AREAS = [
  "Low libido",
  "Low energy",
  "Cognitive support",
  "Poor sleep",
  "Low recovery",
  "Low immunity",
  "Metabolic dysfunction",
];

function rotate<T>(arr: T[], by: number): T[] {
  return [...arr.slice(by), ...arr.slice(0, by)];
}

function Pill({ label }: { label: string }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-white/70 bg-white/55 px-6 py-3 text-sm text-ink shadow-[0_4px_20px_rgba(16,24,40,0.06)] backdrop-blur-md sm:text-base">
      {label}
    </span>
  );
}

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex shrink-0 gap-3 pr-3 animate-marquee sm:gap-4 sm:pr-4"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((label, i) => (
          <Pill key={i} label={label} />
        ))}
      </div>
    </div>
  );
}

export function HealthMarquee() {
  return (
    <section className="relative -mt-32 px-4 pt-0 pb-20 sm:mt-0 sm:pt-8 sm:pb-28 lg:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-end lg:gap-12">
        {/* Phone cutout — left on desktop, flush to bottom so hands meet the footer */}
        <div className="relative -mt-24 w-full max-w-sm shrink-0 sm:mt-0 lg:-ml-6 lg:w-[46%] lg:max-w-none lg:self-end">
          <img
            src={phoneCutout}
            alt="A phone showing the Aevo health assessment, selecting areas of health to improve."
            className="mx-auto block w-full max-h-[560px] object-contain object-bottom drop-shadow-2xl [mask-image:linear-gradient(to_right,black_70%,transparent_100%),linear-gradient(to_bottom,black_78%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in] lg:-mb-1 lg:max-h-[640px] lg:[mask-image:linear-gradient(to_right,black_62%,transparent_100%)] lg:[mask-composite:add] lg:[-webkit-mask-composite:source-over]"
          />
        </div>

        {/* Heading + moving pills — right on desktop */}
        <div className="w-full min-w-0 lg:flex-1 lg:pb-24">
          <div className="mb-6 flex justify-center lg:justify-start">
            <a
              href="https://wa.me/447832619150"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppInitiateCheckout}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Speak to the team
            </a>
          </div>
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-ink" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
              What can peptides support?
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <Row items={AREAS} />
            <Row items={rotate(AREAS, 3)} reverse />
            <Row items={rotate(AREAS, 5)} />
          </div>
        </div>
      </div>
    </section>
  );
}
