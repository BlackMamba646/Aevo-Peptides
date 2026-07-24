"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { FlaskConical, Snowflake, Microscope } from "lucide-react";

interface StackCard {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  body: string;
}

const CARDS: StackCard[] = [
  {
    icon: FlaskConical,
    eyebrow: "Testing & quality",
    title: "Verified to a single standard.",
    body: "Every batch is independently assayed to ≥98% purity by HPLC and mass spectrometry, with a certificate of analysis matched to the lot it ships with.",
  },
  {
    icon: Snowflake,
    eyebrow: "Cold chain",
    title: "Kept cold, shipped door to door.",
    body: "Temperature-controlled handling from synthesis to your door, with tracked door-to-door delivery across the UAE.",
  },
  {
    icon: Microscope,
    eyebrow: "Manufacturing",
    title: "State-of-the-art laboratories.",
    body: "Biotech and peptide synthesis laboratories with controlled manufacturing environments and validated workflows.",
  },
];

// Light grey for card body/eyebrow text (instead of near-black ink).
const TEXT_GREY = "text-[#9b9ba2]";
// Darker, near-black tone for headlines so they stand out from the body copy.
const TEXT_HEADING = "text-[#2b2b30]";

function CardInner({ card }: { card: StackCard }) {
  const Icon = card.icon;
  return (
    <>
      <span className="flex size-12 items-center justify-center rounded-2xl bg-ink/5 backdrop-blur-sm">
        <Icon className="size-6 text-[#9b9ba2]" />
      </span>
      <p className={`mt-6 text-xs font-medium uppercase tracking-widest ${TEXT_GREY}`}>
        {card.eyebrow}
      </p>
      <h3 className={`mt-2 ${TEXT_HEADING}`} style={{ fontSize: "clamp(24px, 4vw, 34px)" }}>
        {card.title}
      </h3>
      <p className={`mt-4 ${TEXT_GREY}`}>{card.body}</p>
    </>
  );
}

function SectionHeading() {
  return (
    <div className="mb-12 text-center">
      <p className={`text-sm font-medium uppercase tracking-widest ${TEXT_GREY}`}>
        One standard
      </p>
      <h2 className={`mt-3 ${TEXT_HEADING}`} style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
        From the lab to your door.
      </h2>
    </div>
  );
}

/* ───────── Desktop: continuous horizontal marquee of cards ───────── */
function DesktopMarquee() {
  const doubled = [...CARDS, ...CARDS];
  return (
    <section className="relative hidden py-14 sm:block">
      <div className="relative z-10">
        <div className="px-4">
          <SectionHeading />
        </div>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div
            className="flex shrink-0 animate-marquee"
            style={{ animationDirection: "reverse" }}
          >
            {doubled.map((card, i) => (
              <div
                key={i}
                className="glass mr-6 flex w-[360px] shrink-0 flex-col rounded-3xl p-8"
              >
                <CardInner card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Mobile: scroll-driven vertical card stack ───────── */
// Per-card keyframes across scroll progress [0, 0.5, 1] for a 3-card stack.
const KEYS = [
  { scale: [1, 1.08, 1.16], y: [0, -70, -140], opacity: [1, 0, 0] },
  { scale: [0.92, 1, 1.08], y: [34, 0, -70], opacity: [0.5, 1, 0] },
  { scale: [0.84, 0.92, 1], y: [68, 34, 0], opacity: [0.3, 0.6, 1] },
];

function StackCardItem({
  card,
  index,
  progress,
}: {
  card: StackCard;
  index: number;
  progress: MotionValue<number>;
}) {
  const k = KEYS[index];
  const scale = useTransform(progress, [0, 0.5, 1], k.scale);
  const y = useTransform(progress, [0, 0.5, 1], k.y);
  const opacity = useTransform(progress, [0, 0.5, 1], k.opacity);

  return (
    <motion.div
      style={{ scale, y, opacity, zIndex: CARDS.length - index }}
      className="glass absolute inset-x-0 mx-auto flex max-w-md flex-col overflow-hidden rounded-3xl p-8"
    >
      <CardInner card={card} />
    </motion.div>
  );
}

function MobileStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduce) {
    return (
      <section className="relative overflow-hidden px-4 py-10 sm:hidden">
        <SectionHeading />
        <div className="relative mx-auto flex max-w-md flex-col gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="glass flex flex-col overflow-hidden rounded-3xl p-8"
            >
              <CardInner card={card} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative sm:hidden" style={{ height: "180vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
          <SectionHeading />
          <div className="relative mx-auto h-[360px] max-w-md">
            {CARDS.map((card, i) => (
              <StackCardItem
                key={card.title}
                card={card}
                index={i}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ScrollStack() {
  return (
    <div id="quality">
      <MobileStack />
      <DesktopMarquee />
    </div>
  );
}
