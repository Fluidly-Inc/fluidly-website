"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

/* Pinned scroll-scrub wrapper. Renders a tall track; the child sticks
   and receives scroll progress (0 to 1) to drive its own transforms. */
export function ScrollScene({
  height = "220vh",
  className,
  children,
}: {
  height?: string;
  className?: string;
  children: (progress: MotionValue<number>) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className={className} style={{ height }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {children(scrollYProgress)}
      </div>
    </div>
  );
}

export { motion, useTransform };
