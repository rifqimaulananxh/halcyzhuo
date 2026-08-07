"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
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

export function SectionEntrance() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let destroyed = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const root = document.querySelector<HTMLElement>("#main.page-main");
      if (!root) return;

      const sections = Array.from(
        root.querySelectorAll<HTMLElement>(
          "section:not(.hero):not([data-section-skip])"
        )
      );
      if (!sections.length) return;

      let bundle: GsapBundle;
      try {
        bundle = await loadGsap();
      } catch {
        return;
      }
      if (destroyed || !root.isConnected) return;

      const context = bundle.gsap.context(() => {
        sections.forEach((section) => {
          bundle.gsap.fromTo(
            section,
            {
              clipPath: "inset(12% 0 0 0)",
              yPercent: 4,
            },
            {
              clipPath: "inset(0% 0 0 0)",
              yPercent: 0,
              duration: 1.15,
              ease: "power4.out",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                once: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }, root);

      revert = () => context.revert();
    };

    const unsubscribe = onMotionReady(() => {
      void run();
    });

    return () => {
      destroyed = true;
      unsubscribe();
      revert?.();
    };
  }, [pathname]);

  return null;
}
