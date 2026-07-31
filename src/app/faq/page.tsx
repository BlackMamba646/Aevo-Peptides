import type { Metadata } from "next";
import { FaqView } from "./FaqView";

const FAQ_ITEMS = [
  {
    question: "What are research peptides?",
    answer:
      "Research peptides are short chains of amino acids synthesised for use in scientific and laboratory research. They are used to study biological processes, receptor interactions, and cellular mechanisms. All peptides sold by Aevo are strictly for laboratory research use only — not for human consumption.",
  },
  {
    question: "How is the purity of your peptides verified?",
    answer:
      "Every batch is independently tested to a minimum of 98% purity using High-Performance Liquid Chromatography (HPLC) and mass spectrometry. Each product ships with a Certificate of Analysis (CoA) matched to its specific lot number, so you can verify exactly what you're receiving.",
  },
  {
    question: "Who manufactures your peptides?",
    answer:
      "Aevo is the official distribution partner of APEX, a manufacturer committed to pharmaceutical-grade production standards. All products are produced under GMP-aligned protocols in controlled laboratory environments with full traceability from synthesis to dispatch.",
  },
  {
    question: "What peptide formats do you offer?",
    answer:
      "We offer three formats: pre-filled peptide pens for precise, repeatable dosing; lyophilised glass vials that can be reconstituted to your protocol; and ready-to-use nasal sprays with pre-measured actuations. Each format is verified to the same 98%+ purity standard.",
  },
  {
    question: "How should I store peptides?",
    answer:
      "All peptides should be stored at −20°C in their original sealed containers. Lyophilised (freeze-dried) peptides are stable when stored correctly. Once reconstituted, peptides should be refrigerated at 2–8°C and used within the timeframe specified in your research protocol.",
  },
  {
    question: "Do you ship across the UAE?",
    answer:
      "Yes. We offer same-day delivery within Dubai (130 AED) and 24–48 hour tracked delivery across the rest of the UAE (70 AED). All shipments are temperature-controlled to maintain peptide integrity from our facility to your door.",
  },
  {
    question: "What is cold-chain shipping?",
    answer:
      "Cold-chain shipping means your peptides are stored and transported at controlled temperatures (2–8°C) throughout the entire delivery process. This preserves the molecular integrity and purity of the peptides, ensuring they arrive in optimal condition for research use.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Due to the nature of our products and strict quality-control requirements, we are unable to offer refunds or exchanges once an order has been dispatched. If your product arrives damaged or there is an issue with your order, please contact us via WhatsApp and we will resolve the problem promptly.",
  },
  {
    question: "What peptide categories do you carry?",
    answer:
      "Our range is grouped by research goal: Weight Loss (Retatrutide, Tirzepatide, AOD-9604), Recovery (BPC-157, TB-500, KPV), Energy & Longevity (NAD+, MOTS-C, Epitalon, GHK-Cu), Brain Performance (Semax, Selank, PT-141), and Hormone Optimization (Ipamorelin, Sermorelin, CJC-1295, Somatropin).",
  },
  {
    question: "Do you provide Certificates of Analysis?",
    answer:
      "Yes. Every product includes a batch-matched Certificate of Analysis (CoA) confirming identity and purity via HPLC and mass spectrometry. You can verify any APEX product directly through the official APEX verification portal.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Browse our product range on the website, add items to your cart, and proceed to checkout via our Shopify-powered store. You can also contact us directly via WhatsApp for personalised assistance with your order.",
  },
  {
    question: "Are your peptides legal in the UAE?",
    answer:
      "Research peptides sold for legitimate laboratory and scientific research purposes are available in the UAE. All Aevo products are sold strictly as research chemicals and are not intended for human consumption, veterinary use, or any diagnostic or therapeutic application.",
  },
];

export const metadata: Metadata = {
  title: "FAQ — Research Peptides Questions Answered",
  description:
    "Frequently asked questions about Aevo research peptides: purity testing, cold-chain shipping, storage, formats, ordering in the UAE, and Certificates of Analysis.",
  alternates: { canonical: "https://aevowellness.shop/faq" },
  openGraph: {
    title: "FAQ — Research Peptides Questions Answered",
    description:
      "Answers to common questions about peptide purity, shipping, storage, and ordering from Aevo in the UAE.",
    type: "website",
    url: "https://aevowellness.shop/faq",
  },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aevowellness.shop/" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://aevowellness.shop/faq" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FaqView items={FAQ_ITEMS} />
    </>
  );
}
