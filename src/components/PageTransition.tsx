"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import type gsap from "gsap";
import { onPreloaderDone } from "@/lib/motion";

let gsapPromise: Promise<typeof gsap> | null = null;

function loadGsap(): Promise<typeof gsap> {
  gsapPromise ??= import("gsap").then((module) => module.default);
  return gsapPromise;
}

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const layerRef = useRef<HTMLDivElement>(null);
  const previousRouteKey = useRef(pathname);
  const navigating = useRef(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[href]"
      );
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.hasAttribute("data-no-page-transition")
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.hash ||
        (url.pathname === currentUrl.pathname && url.search === currentUrl.search)
      ) {
        return;
      }

      if (navigating.current) return;
      event.preventDefault();
      navigating.current = true;
      window.__routeTransitionActive = true;

      void loadGsap()
        .then((gsapApi) => {
          if (cancelled || !layer.isConnected) {
            navigating.current = false;
            return;
          }
          tweenRef.current?.kill();
          gsapApi.set(layer, { pointerEvents: "auto" });
          tweenRef.current = gsapApi.to(layer, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.55,
            ease: "power4.inOut",
          onComplete: () => {
            router.push(`${url.pathname}${url.search}`);
          },
          });
        })
        .catch(() => {
          navigating.current = false;
          window.__routeTransitionActive = false;
          window.dispatchEvent(new CustomEvent("route-transition:done"));
          router.push(`${url.pathname}${url.search}`);
        });
    };

    const unsubscribe = onPreloaderDone(() => {
      document.addEventListener("click", onClick, true);
    });
    return () => {
      cancelled = true;
      unsubscribe();
      document.removeEventListener("click", onClick, true);
      tweenRef.current?.kill();
    };
  }, [router]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || previousRouteKey.current === pathname) return;
    previousRouteKey.current = pathname;
    if (!navigating.current) {
      window.__routeTransitionActive = false;
      return;
    }

    let cancelled = false;
    void loadGsap()
      .then((gsapApi) => {
        if (cancelled || !layer.isConnected) return;
        tweenRef.current?.kill();
        tweenRef.current = gsapApi.to(layer, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.6,
          delay: 0.05,
          ease: "power4.inOut",
          onComplete: () => {
            navigating.current = false;
            tweenRef.current = null;
            gsapApi.set(layer, { pointerEvents: "none" });
            window.__routeTransitionActive = false;
            window.dispatchEvent(new CustomEvent("route-transition:done"));
          },
        });
      })
      .catch(() => {
        navigating.current = false;
        layer.style.clipPath = "inset(0% 0% 100% 0%)";
        layer.style.pointerEvents = "none";
        window.__routeTransitionActive = false;
        window.dispatchEvent(new CustomEvent("route-transition:done"));
      });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <div
      ref={layerRef}
      className="page-transition-layer"
      aria-hidden="true"
    />
  );
}
