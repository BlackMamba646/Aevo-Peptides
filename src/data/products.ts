const productPen = "/assets/product-pen.png";
const productVial = "/assets/product-vial.png";
const productNasal = "/assets/product-nasal.png";

export interface Product {
  id: string;
  name: string;
  /** e.g. "10mg" */
  size: string;
  descriptor: string;
  price: number;
  currency: string;
  /** one-line research summary */
  summary: string;
  /** purity / verification line */
  purity: string;
  /** handling / storage line */
  handling: string;
  /** 2–3 original sentences on sourcing, purity and careful handling */
  description: string;
  specs: { label: string; value: string }[];
  /** product photo (transparent cutout) */
  image?: string;
  // SHOPIFY INTEGRATION: replace with the product's Shopify checkout / variant URL.
  shopifyUrl?: string;
}

/** Shared compliance line — research framing only, no human-use claims. */
export const RESEARCH_USE_NOTICE =
  "For laboratory research use only. Not for human consumption.";

export const products: Product[] = [
  {
    id: "peptide-pens",
    name: "Peptide Pens",
    size: "5mg",
    descriptor: "Pre-measured pen format",
    price: 149,
    currency: "£",
    summary:
      "A click-dial delivery format engineered for precise, repeatable measured amounts. Clean, controlled, and built for accuracy.",
    purity:
      "≥98% purity · HPLC & MS verified · Certificate of analysis with every batch",
    handling:
      "Supplied lyophilised · Store at −20°C · Reconstitute per your protocol",
    description:
      "Sourced from a single accredited synthesis partner and screened on arrival, every pen is filled under controlled conditions to a consistent fill volume. Each lot is independently assayed by HPLC and mass spectrometry before release, with the certificate of analysis matched to its batch. Handle cold and reconstitute according to your own laboratory protocol.",
    specs: [
      { label: "Format", value: "Pre-filled pen" },
      { label: "Quantity", value: "1 pen" },
      { label: "Storage", value: "−20°C" },
    ],
    image: productPen,
    shopifyUrl: undefined,
  },
  {
    id: "peptide-vials",
    name: "Peptide Vials",
    size: "10mg",
    descriptor: "Lyophilised glass vial",
    price: 119,
    currency: "£",
    summary:
      "The classic lyophilised format and most flexible starting point. Reconstitute to your own protocol and concentration, exactly as required.",
    purity:
      "≥98% purity · HPLC & MS verified · Certificate of analysis with every batch",
    handling:
      "Supplied lyophilised · Store at −20°C · Reconstitute per your protocol",
    description:
      "Each vial is precision-filled and sealed under inert conditions. Independently verified by HPLC and mass spectrometry, with a batch-matched certificate of analysis.",
    specs: [
      { label: "Format", value: "Glass vial" },
      { label: "Quantity", value: "1 vial" },
      { label: "Storage", value: "−20°C" },
    ],
    image: productVial,
    shopifyUrl: undefined,
  },
  {
    id: "nasal-sprays",
    name: "Nasal Sprays",
    size: "15mg",
    descriptor: "Fine-mist research format",
    price: 89,
    currency: "£",
    summary:
      "A ready-to-use intranasal format - no reconstitution, no needles. Pre-measured actuations keep every application consistent.",
    purity:
      "≥98% purity · HPLC & MS verified · Certificate of analysis with every batch",
    handling:
      "Supplied lyophilised · Store at −20°C · Reconstitute per your protocol",
    description:
      "Prepared from the same accredited synthesis source as the rest of the range and verified to identical standards before dispatch. Identity and purity are confirmed by HPLC and mass spectrometry, with a certificate of analysis tied to each batch. Store cold and reconstitute according to your laboratory protocol.",
    specs: [
      { label: "Format", value: "Nasal device" },
      { label: "Quantity", value: "1 unit" },
      { label: "Storage", value: "−20°C" },
    ],
    image: productNasal,
    shopifyUrl: undefined,
  },
];

export function formatPrice(p: Product) {
  return `${p.currency}${p.price.toFixed(0)}`;
}
