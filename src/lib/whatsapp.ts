/** Aevo WhatsApp ordering helper. */
const WHATSAPP_NUMBER = "447832619150";

export function buildWhatsAppOrderUrl({ title, price }: { title: string; price?: string }) {
  const lines = [
    `Hi Aevo, I'd like to order:`,
    price ? `• ${title} — ${price}` : `• ${title}`,
  ];
  const message = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Fire Meta Pixel InitiateCheckout when a WhatsApp link/button is clicked. */
export function trackWhatsAppInitiateCheckout() {
  if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
    (window as any).fbq("track", "InitiateCheckout");
  }
}
