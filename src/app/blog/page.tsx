import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog-posts";
import { BlogIndexView } from "./BlogIndexView";

export const metadata: Metadata = {
  title: "Blog — Peptide Research Guides & Education",
  description:
    "Research guides, format comparisons, and educational articles about peptides from Aevo Wellness. BPC-157, storage, HPLC testing, and more.",
  alternates: { canonical: "https://aevowellness.shop/blog" },
  openGraph: {
    title: "Blog — Peptide Research Guides & Education",
    description:
      "Peptide research guides, format comparisons, and educational content from Aevo Wellness.",
    type: "website",
    url: "https://aevowellness.shop/blog",
  },
};

export default function BlogPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aevowellness.shop/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://aevowellness.shop/blog" },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Aevo Wellness Blog",
    description: "Research guides, format comparisons, and educational articles about peptides.",
    url: "https://aevowellness.shop/blog",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: BLOG_POSTS.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://aevowellness.shop/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <BlogIndexView posts={BLOG_POSTS} />
    </>
  );
}
