"use client";

import { useEffect } from "react";

/* Intercepts in-page anchor clicks (href="/#x" or "#x") site-wide: smooth-
   scrolls to the target and keeps the URL clean (no #hash in the address bar).
   One global listener covers Nav, Footer, and any other anchor. Real routes
   and external links are ignored. */
export function SmoothScroll() {
  useEffect(() => {
    // Cross-page anchor links (e.g. /#os clicked from /blog) land with a hash.
    // After the jump, scroll to it then strip the hash so the URL stays clean.
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // let layout settle first
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
          history.replaceState(null, "", window.location.pathname + window.location.search);
        });
      }
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // match "#id" or "/#id" (optionally with the current path prefix)
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const path = href.slice(0, hashIndex);
      const id = href.slice(hashIndex + 1);
      if (!id) return;
      // only handle when the target is on the current page
      const onSamePage = path === "" || path === "/" || path === window.location.pathname;
      if (!onSamePage) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      // keep the URL clean: no #hash appended
      history.replaceState(null, "", window.location.pathname + window.location.search);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
