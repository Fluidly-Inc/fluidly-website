import Link from "next/link";

export default function PostNotFound() {
  return (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center", padding: "40px 20px" }}>
      <div style={{ maxWidth: 460 }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: 12 }}>Post not found.</h1>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          This post may have been moved or unpublished.
        </p>
        <Link
          href="/blog"
          style={{ color: "var(--accent, #17c4b1)", fontWeight: 600 }}
        >
          Back to all posts
        </Link>
      </div>
    </main>
  );
}
