"use client";
import { useState, useEffect } from "react";

const CONSENT_KEY = "aevo_cookie_consent";

export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "granted";
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "granted");
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-granted"));
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-ink/10 bg-white/95 p-5 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink-soft">
          We use cookies and tracking technologies to improve your experience and
          analyse site traffic. See our{" "}
          <a href="/privacy" className="underline hover:text-ink">
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={decline}
            className="rounded-lg border border-ink/20 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
