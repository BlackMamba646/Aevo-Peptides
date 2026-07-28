export function GlobalJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Aevo Wellness",
        url: "https://aevowellness.shop",
        logo: "https://aevowellness.shop/assets/science-hero.png",
        description:
          "Official distributors of APEX research peptides in the UAE. Third-party tested for 98%+ purity, cold-chain shipped.",
        sameAs: [
          "https://www.instagram.com/aevowellness",
          "https://wa.me/447832619150",
          "https://www.apexpharma.io/",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: ["English", "Arabic"],
          url: "https://aevowellness.shop/shipping",
        },
      },
      {
        "@type": "WebSite",
        name: "Aevo",
        url: "https://aevowellness.shop",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://aevowellness.shop/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
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
