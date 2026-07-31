export function GlobalJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://aevowellness.shop/#organization",
        name: "Aevo Wellness",
        url: "https://aevowellness.shop",
        logo: {
          "@type": "ImageObject",
          url: "https://aevowellness.shop/assets/aevo-logo.svg",
          width: 200,
          height: 40,
        },
        description:
          "Official distributors of APEX research peptides in the UAE. Third-party tested for 98%+ purity via HPLC and mass spectrometry, cold-chain shipped.",
        foundingDate: "2024",
        areaServed: {
          "@type": "Country",
          name: "United Arab Emirates",
        },
        sameAs: [
          "https://www.instagram.com/aevowellness",
          "https://wa.me/447832619150",
          "https://www.apexpharma.io/",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: ["English", "Arabic"],
          url: "https://wa.me/447832619150",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://aevowellness.shop/#website",
        name: "Aevo",
        url: "https://aevowellness.shop",
        publisher: { "@id": "https://aevowellness.shop/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://aevowellness.shop/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SiteNavigationElement",
        name: [
          "Shop",
          "Science",
          "About",
          "Shipping",
          "FAQ",
        ],
        url: [
          "https://aevowellness.shop/",
          "https://aevowellness.shop/science",
          "https://aevowellness.shop/about",
          "https://aevowellness.shop/shipping",
          "https://aevowellness.shop/faq",
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
