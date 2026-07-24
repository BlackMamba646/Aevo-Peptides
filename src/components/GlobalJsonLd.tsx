export function GlobalJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Aevo",
        url: "https://aevowellness.shop",
        logo: "https://aevowellness.shop/favicon.ico",
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
