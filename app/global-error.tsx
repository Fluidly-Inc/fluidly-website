"use client";

import { useEffect } from "react";

// Catches errors thrown in the root layout itself. It replaces the entire
// document, so it must render its own <html>/<body> and cannot rely on the
// app's CSS (globals may not have loaded). Styles are inlined and dark, to
// match the default theme.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[fluidly] root error", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#050f16",
          color: "#f2fbfc",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <div style={{ maxWidth: 460 }}>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#5eead4", lineHeight: 1 }}>500</div>
          <h1 style={{ fontSize: 24, margin: "12px 0" }}>Something broke on our end.</h1>
          <p style={{ color: "#93a9b2", lineHeight: 1.6, marginBottom: 24 }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: 48,
              padding: "0 22px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg,#17c4b1,#0c7d72)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
