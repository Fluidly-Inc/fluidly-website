/* eslint-disable @next/next/no-html-link-for-pages --
   In-page "/#section" anchors are intentionally plain <a> so the global
   SmoothScroll listener controls the scroll and keeps the hash out of the URL.
   Next <Link> would re-add the hash. Real routes below still use <Link>. */
import Image from "next/image";
import Link from "next/link";
import styles from "./chrome.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.footerTop}>
          <Link href="/" className={styles.brand}>
            <Image src="/fluidly-logo.png" alt="Fluidly" width={118} height={40} className={styles.logo} />
          </Link>
          <p>The Process Intelligence Operating System for work.</p>
        </div>

        <div className={styles.footerGrid}>
          <div>
            <strong>Platform</strong>
            <a href="/#os">The OS</a>
            <a href="/#problem">The idea</a>
            <a href="/#faq">FAQ</a>
          </div>
          <div>
            <strong>Solutions</strong>
            <a href="/#healthcare">Healthcare</a>
            <a href="/#os">Enterprise builders</a>
            <Link href="/blog">Blog</Link>
          </div>
          <div>
            <strong>Company</strong>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <a href="mailto:contact@fluidly.ai">Contact</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 Fluidly, Inc.</span>
          <span>Work becomes visible.</span>
        </div>
      </div>
    </footer>
  );
}
