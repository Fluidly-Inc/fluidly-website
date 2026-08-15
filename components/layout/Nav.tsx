"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./chrome.module.css";

// Render hash links as plain <a> so the global SmoothScroll listener fully
// controls the click (Next <Link> would set the #hash itself). Real routes
// use <Link>.
function NavItem({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

const LINKS = [
  { href: "/#problem", label: "Why Fluidly" },
  { href: "/#os", label: "The OS" },
  { href: "/#healthcare", label: "Healthcare" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
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
            <NavItem key={l.href} href={l.href}>
              {l.label}
            </NavItem>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <NavItem className={styles.demoBtn} href="/#contact">
            Request a demo
          </NavItem>
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
          <NavItem key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </NavItem>
        ))}
        <NavItem href="/#contact" onClick={() => setOpen(false)} className={styles.mobileDemo}>
          Request a demo
        </NavItem>
      </div>
    </>
  );
}
