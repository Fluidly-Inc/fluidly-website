"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // client-side render error; surface it in the browser console with context
    console.error("[fluidly] render error", error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 460 }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: 12 }}>Something went wrong.</h1>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          An unexpected error occurred. Try again, or head back home.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            minHeight: 46,
            padding: "0 22px",
            borderRadius: 12,
            border: "1px solid var(--line)",
            background: "var(--accent, #17c4b1)",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
