"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { onMotionReady } from "@/lib/motion";

type Variant = "fade" | "mask" | "stagger" | "stagger-left" | "stagger-right" | "none";

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

    let observer: IntersectionObserver | undefined;
    let fallback = 0;

    const start = () => {
      if (!("IntersectionObserver" in window)) {
        el.classList.add("visible");
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add("visible");
              observer?.unobserve(el);
            }
          });
        },
        { threshold: 0.12 }
      );
      observer.observe(el);
      fallback = window.setTimeout(() => el.classList.add("visible"), 4000);
    };

    const unsubscribe = onMotionReady(start);
    return () => {
      unsubscribe();
      observer?.disconnect();
      window.clearTimeout(fallback);
    };
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
