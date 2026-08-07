"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import type gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMotionReady } from "@/lib/motion";

type GsapBundle = {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
};

let gsapBundlePromise: Promise<GsapBundle> | null = null;

function loadGsap(): Promise<GsapBundle> {
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

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let destroyed = false;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      let bundle: GsapBundle;
      try {
        bundle = await loadGsap();
      } catch {
        return;
      }
      if (destroyed || !el.isConnected) return;

      const { gsap: gsapApi } = bundle;
      const target = el.querySelector<HTMLElement>("img") ?? el;
      const amount = Math.min(18, Math.max(6, clamp * 100 + speed * 100));
      const scale = target === el ? 1 : 1.08;

      gsapApi.set(target, {
        yPercent: -amount,
        scale,
        transformOrigin: "center center",
      });

      const tween = gsapApi.to(target, {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsapApi.set(target, { clearProps: "transform" });
      };
    };

    const unsubscribe = onMotionReady(() => {
      void run();
    });

    return () => {
      destroyed = true;
      unsubscribe();
      cleanup?.();
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
