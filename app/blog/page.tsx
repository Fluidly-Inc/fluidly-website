import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PostCard } from "@/components/blog/PostCard";
import { sanityFetch } from "@/sanity/live";
import { POSTS_QUERY } from "@/sanity/queries";
import { log } from "@/lib/logger";
import styles from "@/components/blog/blog.module.css";

// defineLive drives freshness; render on demand so new posts appear at once.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on process intelligence, decision automation, and building the operating system for work.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  let posts: Awaited<ReturnType<typeof sanityFetch<typeof POSTS_QUERY>>>["data"] = [];
  try {
    ({ data: posts } = await sanityFetch({ query: POSTS_QUERY }));
  } catch (err) {
    // Sanity outage: log and fall through to the empty state, don't 500.
    log.error("blog index: failed to load posts", err);
  }

  return (
    <>
      <Nav />
      <main>
        <section className={`section ${styles.blogHead}`} id="top">
          <div className="wrap">
            <div className="eyebrow">Fluidly blog</div>
            <h1 className="h-xl">Notes on making work visible.</h1>
            <p className="lede">
              Process intelligence, decision automation, and what we learn building the operating
              system for work.
            </p>
          </div>
        </section>

        <section className={`section ${styles.blogList}`}>
          <div className="wrap">
            {posts.length ? (
              <div className={styles.grid}>
                {posts.map((post, i) => (
                  <PostCard key={post._id} post={post} index={i} />
                ))}
              </div>
            ) : (
              <p className="lede">No posts yet. Check back soon.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
