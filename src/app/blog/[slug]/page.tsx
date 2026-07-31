import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs } from "@/data/blog-posts";
import { BlogPostView } from "./BlogPostView";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not Found" };

  const url = `https://aevowellness.shop/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | Aevo`,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `https://aevowellness.shop/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Aevo Wellness",
      url: "https://aevowellness.shop",
    },
    publisher: {
      "@type": "Organization",
      name: "Aevo Wellness",
      url: "https://aevowellness.shop",
      logo: {
        "@type": "ImageObject",
        url: "https://aevowellness.shop/assets/aevo-logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
    url,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aevowellness.shop/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://aevowellness.shop/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPostView post={post} />
    </>
  );
}
