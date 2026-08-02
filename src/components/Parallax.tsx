"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export function Parallax({
  children,
  speed = 0.08,
  clamp = 0.15,
  className = "",
  style,
}: {
  children: ReactNode;
  speed?: number;
  clamp?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const max = el.clientHeight * clamp;
      const raw = (r.top + r.height / 2 - center) * speed;
      const offset = Math.max(-max, Math.min(max, raw));
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, clamp]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}
