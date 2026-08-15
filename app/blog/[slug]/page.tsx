import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PortableBody } from "@/components/blog/PortableBody";
import { sanityFetch } from "@/sanity/live";
import { serverClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { POST_QUERY, SLUGS_QUERY } from "@/sanity/queries";
import { log } from "@/lib/logger";
import styles from "@/components/blog/blog.module.css";

export async function generateStaticParams() {
  try {
    const slugs = await serverClient.fetch(SLUGS_QUERY);
    return slugs.flatMap((s) => (s.slug ? [{ slug: s.slug }] : []));
  } catch (err) {
    log.error("blog: failed to load slugs for static params", err);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    stega: false, // never leak stega chars into <head>
  });
  const post = data;
  if (!post) return {};
  const title = post.seoTitle || post.title || undefined;
  const description = post.seoDescription || post.excerpt || undefined;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: post.coverImage
        ? [urlFor(post.coverImage).width(1200).height(630).fit("crop").url()]
        : undefined,
    },
  };
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await sanityFetch({ query: POST_QUERY, params: { slug } });
  if (!post) notFound();

  const fluidlyOrg = {
    "@type": "Organization",
    name: "Fluidly",
    "@id": "https://fluidly.ai/#organization",
    url: "https://fluidly.ai",
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt || undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    // Fluidly content is org-authored, never attributed to an individual.
    author: fluidlyOrg,
    publisher: fluidlyOrg,
    image: post.coverImage
      ? urlFor(post.coverImage).width(1200).height(630).fit("crop").url()
      : undefined,
    articleSection: "Process Intelligence",
    keywords: [
      "process intelligence",
      "operating system for work",
      "workflow automation",
      "decision intelligence",
    ],
    inLanguage: "en-US",
    isPartOf: { "@type": "Blog", "@id": "https://fluidly.ai/blog#blog", name: "Fluidly Blog" },
    mainEntityOfPage: `https://fluidly.ai/blog/${slug}`,
  };

  return (
    <>
      <Nav />
      <main>
        <article className={`section ${styles.post}`} id="top">
          <div className="wrap">
            <div className={styles.postHead}>
              <Link href="/blog" className={styles.backLink}>
                ← All posts
              </Link>
              <div className={styles.postMeta}>
                {formatDate(post.publishedAt)}
                {post.author?.name ? ` · ${post.author.name}` : ""}
              </div>
              <h1 className="h-lg">{post.title}</h1>
              {post.excerpt && <p className="lede">{post.excerpt}</p>}
            </div>

            {post.coverImage && (
              <div className={styles.postCover}>
                <Image
                  src={urlFor(post.coverImage).width(1400).height(760).fit("crop").auto("format").url()}
                  alt={post.coverImage.alt || post.title || ""}
                  width={1400}
                  height={760}
                  priority
                  className={styles.postCoverImage}
                />
              </div>
            )}

            {Array.isArray(post.body) && <PortableBody value={post.body} />}
          </div>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
