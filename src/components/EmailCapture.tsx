"use client";
import * as React from "react";
import { toast } from "sonner";
import { GlassButton } from "@/components/GlassButton";
import { Reveal } from "@/components/Reveal";

export function EmailCapture() {
  const [email, setEmail] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // SHOPIFY INTEGRATION: wire this to your marketing list / Shopify customer capture.
    toast.success("Thanks — we'll keep in touch.");
    setEmail("");
  };

  return (
    <section id="about" className="px-4 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="text-white" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
          Stay in the loop.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-white/60">
          New formats, restocks and quiet updates. No noise.
        </p>
        <form
          onSubmit={submit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            aria-label="Email address"
            className="glass-dark h-12 flex-1 rounded-full px-5 text-[15px] text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <GlassButton type="submit" variant="glassDark" size="lg">
            Keep in touch
          </GlassButton>
        </form>
      </Reveal>
    </section>
  );
}
