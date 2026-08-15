import type { MetadataRoute } from "next";
import { serverClient } from "@/sanity/client";
import { SLUGS_QUERY } from "@/sanity/queries";
import { log } from "@/lib/logger";

const base = "https://fluidly.ai";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string | null; publishedAt: string | null }[] = [];
  try {
    posts = await serverClient.fetch(SLUGS_QUERY);
  } catch (err) {
    // Sanity not reachable at build time -> ship the static entries only.
    log.error("sitemap: failed to load post slugs, using static entries", err);
    posts = [];
  }
  const withSlug = posts.filter((p): p is { slug: string; publishedAt: string | null } => !!p.slug);

  return [
    { url: base, lastModified: new Date().toISOString(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date().toISOString(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: new Date().toISOString(), changeFrequency: "daily", priority: 0.8 },
    ...withSlug.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.publishedAt || new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
