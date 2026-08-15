import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../ui";
import { urlFor } from "@/sanity/image";
import styles from "./blog.module.css";

type Post = {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  publishedAt: string | null;
  coverImage: unknown;
  author: { name: string | null } | null;
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.07} as="article">
      <Link href={`/blog/${post.slug}`} className={styles.card}>
        {post.coverImage ? (
          <div className={styles.cardImageWrap}>
            <Image
              src={urlFor(post.coverImage).width(720).height(420).fit("crop").auto("format").url()}
              alt={post.title || ""}
              width={720}
              height={420}
              className={styles.cardImage}
            />
          </div>
        ) : (
          <div className={styles.cardImagePlaceholder} aria-hidden />
        )}
        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            {formatDate(post.publishedAt)}
            {post.author?.name ? ` · ${post.author.name}` : ""}
          </div>
          <h3 className={styles.cardTitle}>{post.title}</h3>
          {post.excerpt && <p className={styles.cardExcerpt}>{post.excerpt}</p>}
          <span className={styles.cardLink}>Read post</span>
        </div>
      </Link>
    </Reveal>
  );
}
