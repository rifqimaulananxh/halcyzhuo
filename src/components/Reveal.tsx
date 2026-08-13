"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMotionReady } from "@/lib/motion";

type Variant = "fade" | "mask" | "stagger" | "stagger-left" | "stagger-right" | "none";

let gsapBundlePromise: Promise<{
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}> | null = null;

function loadGsapBundle(): Promise<{
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}> {
  gsapBundlePromise ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]).then(([gsapModule, scrollTriggerModule]) => {
    gsapModule.default.registerPlugin(scrollTriggerModule.ScrollTrigger);
    return {
      gsap: gsapModule.default,
      ScrollTrigger: scrollTriggerModule.ScrollTrigger,
    };
  });
  return gsapBundlePromise;
}

const variantDefaults: Record<Exclude<Variant, "none">, { start: string; once: boolean }> = {
  fade: { start: "top 90%", once: true },
  mask: { start: "top 90%", once: true },
  stagger: { start: "top 90%", once: true },
  "stagger-left": { start: "top 90%", once: true },
  "stagger-right": { start: "top 90%", once: true },
};

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
    if (!el || variant === "none") {
      if (el) el.classList.add("visible");
      return;
    }

    let cancelled = false;

    const init = async () => {
      let bundle;
      try {
        bundle = await loadGsapBundle();
      } catch {
        el.classList.add("visible");
        return;
      }
      if (cancelled || !el.isConnected) return;

      const { gsap, ScrollTrigger } = bundle;
      const { start, once } = variantDefaults[variant];

      gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start,
          once,
          onEnter: () => el.classList.add("visible"),
          onEnterBack: () => el.classList.add("visible"),
        });
      }, el);
    };

    const unsubscribe = onMotionReady(init);
    return () => {
      unsubscribe();
      cancelled = true;
    };
  }, [variant]);

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