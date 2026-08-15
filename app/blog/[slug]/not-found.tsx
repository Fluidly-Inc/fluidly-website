import { ErrorShell } from "@/components/layout/ErrorShell";

export default function PostNotFound() {
  return (
    <ErrorShell
      code="404"
      title="Post not found."
      message="This post may have been moved or unpublished. Browse the rest of the blog instead."
      homeHref="/blog"
      homeLabel="Back to blog"
    />
  );
}
