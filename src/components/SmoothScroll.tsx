"use client";

import { useEffect } from "react";
import Lenis from "lenis";
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

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let destroyed = false;
    let lenis: Lenis | undefined;
    let gsapInstance: typeof gsap | undefined;
    let ticker: ((time: number) => void) | undefined;
    let scrollHandler: (() => void) | undefined;
    let onClick: ((e: MouseEvent) => void) | undefined;
    let removeScrollListener: (() => void) | undefined;
    let routeHandler: (() => void) | undefined;

    const run = async () => {
      const instance = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis = instance;

      try {
        const { gsap, ScrollTrigger } = await loadGsap();
        if (destroyed) {
          instance.destroy();
          return;
        }
        gsapInstance = gsap;
        instance.on("scroll", ScrollTrigger.update);
        removeScrollListener = () => {
          instance?.off("scroll", ScrollTrigger.update);
        };
        ticker = (time: number) => instance.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);

        scrollHandler = () => {
          if (!destroyed) ScrollTrigger.refresh();
        };
        routeHandler = scrollHandler;
        if (document.fonts?.ready) document.fonts.ready.then(scrollHandler);
        window.addEventListener("load", scrollHandler);
        window.addEventListener("route-transition:done", routeHandler);
      } catch {
        if (!destroyed) instance.destroy();
        return;
      }

      onClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
          'a[href^="#"], a[href^="/#"]'
        );
        if (!anchor) return;
        const href = anchor.getAttribute("href") || "";
        const id = href.replace(/^\/?#/, "");
        if (!id) return;
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        instance.scrollTo(el, { offset: -100 });
      };
      document.addEventListener("click", onClick);
    };

    const unsubscribe = onMotionReady(() => {
      void run();
    });

    return () => {
      destroyed = true;
      unsubscribe();
      if (gsapInstance && ticker) gsapInstance.ticker.remove(ticker);
      if (scrollHandler) window.removeEventListener("load", scrollHandler);
      if (routeHandler) {
        window.removeEventListener("route-transition:done", routeHandler);
      }
      if (onClick) document.removeEventListener("click", onClick);
      removeScrollListener?.();
      lenis?.destroy();
    };
  }, []);

  return null;
}
