"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Variant = "fade" | "mask" | "stagger" | "none";

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("visible");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("visible");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant} ${className}`}
      style={{
        transitionDelay:
          variant === "fade" && delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
