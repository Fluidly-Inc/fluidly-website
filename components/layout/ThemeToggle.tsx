"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./chrome.module.css";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Canonical next-themes hydration guard: theme is unknown on the server, so
  // we flip to mounted once on the client. The one-time re-render is intended.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      className={styles.themeToggle}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* icon swaps only after mount to avoid hydration mismatch */}
      <span className={styles.toggleTrack} data-dark={mounted ? isDark : true}>
        <span className={styles.toggleThumb} />
      </span>
      <span className={styles.toggleLabel}>{mounted ? (isDark ? "Dark" : "Light") : ""}</span>
    </button>
  );
}
