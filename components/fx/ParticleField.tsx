"use client";

import { useEffect, useRef } from "react";

/* Evolved from the original script.js particle field:
   DPR-capped, count-clamped, pauses on reduced-motion and when off-screen.
   Colors read from CSS variables so it tracks the active theme. */
export function ParticleField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
    }[] = [];
    const mouse = { x: -9999, y: -9999 };

    const colors = () => {
      const cs = getComputedStyle(document.documentElement);
      return {
        dot: cs.getPropertyValue("--teal-light").trim() || "#5eead4",
        line: cs.getPropertyValue("--cyan").trim() || "#38bdf8",
        alpha: document.documentElement.getAttribute("data-theme") === "light" ? 0.5 : 1,
      };
    };
    let palette = colors();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(140, Math.max(60, Math.floor(width / 10)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 1.7 + 0.7,
        a: Math.random() * 0.45 + 0.18,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { dot, line, alpha } = palette;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          p.vx -= (dx / Math.max(dist, 1)) * 0.004;
          p.vy -= (dy / Math.max(dist, 1)) * 0.004;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.996;
        p.vy *= 0.996;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = withAlpha(dot, p.a * alpha);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 88) {
            ctx.beginPath();
            ctx.strokeStyle = withAlpha(line, (1 - d / 88) * 0.1 * alpha);
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => resize();
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    // pause the loop when the hero scrolls off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduce && !raf) raf = requestAnimationFrame(draw);
        if (!visible) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      palette = colors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}

/* hex or var-resolved color -> rgba() with a given alpha */
function withAlpha(color: string, alpha: number): string {
  const c = color.trim();
  if (c.startsWith("#")) {
    const hex = c.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split("")
            .map((x) => x + x)
            .join("")
        : hex;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return c;
}
