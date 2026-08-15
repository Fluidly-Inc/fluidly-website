import Link from "next/link";
import styles from "./error-shell.module.css";

/* Shared branded shell for error/404 pages. Server-safe (no hooks); the
   client error boundaries pass a retry button in via `action`. */
export function ErrorShell({
  code,
  title,
  message,
  action,
  homeHref = "/",
  homeLabel = "Back home",
}: {
  code: string;
  title: string;
  message: string;
  action?: React.ReactNode;
  homeHref?: string;
  homeLabel?: string;
}) {
  return (
    <main className={styles.wrap}>
      <div className={styles.glow} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.code} aria-hidden>
          {code}
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          {action}
          <Link href={homeHref} className={styles.homeBtn}>
            {homeLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
