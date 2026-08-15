"use client";

import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import styles from "./ui.module.css";

/* ---------- Reveal: staggered in-view fade/rise ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  as = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "li" | "article" | "section";
  className?: string;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ---------- Button ---------- */
export function Button({
  children,
  href,
  variant = "solid",
  full,
  ...rest
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost" | "quiet";
  full?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = [styles.btn, styles[variant], full ? styles.full : ""]
    .filter(Boolean)
    .join(" ");
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

/* ---------- Eyebrow / kicker ---------- */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

/* ---------- Tag / chip ---------- */
export function Tag({ children }: { children: ReactNode }) {
  return <span className={styles.tag}>{children}</span>;
}

/* ---------- MetricCounter: springs from 0 to value in view ----------
   Reuses the ease-to-target feel of the original script.js counter. */
export function MetricCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.4, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = Math.round(v).toLocaleString() + suffix;
      }
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
