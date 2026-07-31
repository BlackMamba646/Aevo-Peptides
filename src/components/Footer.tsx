"use client";
import Link from "next/link";
const logo = "/assets/aevo-logo.svg";

type FooterLink = { label: string; to?: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Peptide Pens" },
      { label: "Peptide Vials" },
      { label: "Nasal Sprays" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Science", to: "/science" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Shipping", to: "/shipping" },
      { label: "Refund Policy", to: "/refund-policy" },
    ],
  },
];


export function Footer({ bare = false }: { bare?: boolean }) {
  return (
    <footer
      className="relative overflow-hidden px-4 pb-10 pt-8 text-ink sm:pt-16 md:px-0"
      style={
        bare
          ? undefined
          : {
              background:
                "linear-gradient(180deg, #eef2f6 0%, #dbe9f6 45%, #cfe1f4 100%)",
            }
      }
    >
      <div className="relative w-full md:pl-12 lg:pl-20">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <img src={logo} alt="Aevo brand logo" className="h-6 w-auto brightness-0" />
            
            <p className="mt-2 text-sm text-ink-soft">
              Official distributors of{" "}
              <a
                href="https://www.apexpharma.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-ink"
              >
                APEX
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) =>
                    l.to ? (
                      <li key={l.label}>
                        <Link
                          href={l.to}
                          className="text-sm text-ink-soft transition-colors hover:text-ink"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ) : (
                      <li key={l.label}>
                        <a
                          href="#"
                          className="text-sm text-ink-soft transition-colors hover:text-ink"
                        >
                          {l.label}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-6">
          <p className="text-xs leading-relaxed text-ink-soft">
            All products referenced on this site are for laboratory research use only.
            Not for human or veterinary use. No medical, diagnostic, or therapeutic
            claims are made.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
            <Link href="/privacy" className="hover:text-ink">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-ink">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-ink">Refund Policy</Link>
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            © {new Date().getFullYear()} Aevo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
