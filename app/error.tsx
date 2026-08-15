"use client";

import { useEffect } from "react";
import { ErrorShell } from "@/components/layout/ErrorShell";
import styles from "@/components/layout/error-shell.module.css";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[fluidly] render error", error);
  }, [error]);

  return (
    <ErrorShell
      code="500"
      title="Something broke on our end."
      message="An unexpected error occurred. Try again, and if it keeps happening, reach us at contact@fluidly.ai."
      action={
        <button type="button" onClick={reset} className={styles.retryBtn}>
          Try again
        </button>
      }
    />
  );
}
