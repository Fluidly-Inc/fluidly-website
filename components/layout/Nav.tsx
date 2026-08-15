"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./chrome.module.css";

const LINKS = [
  { href: "/#problem", label: "Why Fluidly" },
  { href: "/#os", label: "The OS" },
  { href: "/#healthcare", label: "Healthcare" },
  { href: "/#playground", label: "Playground" },
  { href: "/blog", label: "Blog" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
  }, [open]);

  return (
    <>
      <header className={styles.nav} data-scrolled={scrolled}>
        <Link href="/" className={styles.brand} aria-label="Fluidly home">
          <Image
            src="/fluidly-logo.png"
            alt="Fluidly"
            width={132}
            height={44}
            priority
            className={styles.logo}
          />
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <Link className={styles.demoBtn} href="/#contact">
            Request a demo
          </Link>
          <button
            type="button"
            className={styles.burger}
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-open={open}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={styles.mobileNav} data-open={open} aria-hidden={!open}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/#contact" onClick={() => setOpen(false)} className={styles.mobileDemo}>
          Request a demo
        </Link>
      </div>
    </>
  );
}
