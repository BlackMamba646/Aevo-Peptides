"use client";
import { useEffect } from "react";
import { hasConsent } from "./CookieConsent";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function loadPixel() {
  if (window.fbq) return;

  (function (f: Window, b: Document, e: string, v: string) {
    const n: ((...a: unknown[]) => void) & {
      callMethod?: (...a: unknown[]) => void;
      queue: unknown[][];
      loaded: boolean;
      version: string;
      push: (...a: unknown[]) => void;
    } = function (...args: unknown[]) {
      n.callMethod ? n.callMethod(...args) : n.queue.push(args);
    } as typeof n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    f.fbq = n;
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq!("init", "962145213303436");
  window.fbq!("track", "PageView");

  document.addEventListener(
    "click",
    (e) => {
      const link = (e.target as HTMLElement).closest("a");
      if (
        link?.href &&
        (link.href.includes("wa.me") || link.href.includes("api.whatsapp")) &&
        window.fbq
      ) {
        window.fbq("track", "InitiateCheckout");
      }
    },
    true,
  );
}

export function FacebookPixel() {
  useEffect(() => {
    if (hasConsent()) {
      loadPixel();
    }

    function onConsent() {
      loadPixel();
    }

    window.addEventListener("cookie-consent-granted", onConsent);
    return () => window.removeEventListener("cookie-consent-granted", onConsent);
  }, []);

  return null;
}
