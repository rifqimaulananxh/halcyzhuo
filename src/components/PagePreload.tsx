"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const done = new Set<string>();

export function PagePreload() {
  const router = useRouter();

  useEffect(() => {
    const handleEnter = (e: MouseEvent | TouchEvent) => {
      const el = (e.target as Element | null)?.closest?.("a[href]");
      if (!(el instanceof HTMLAnchorElement)) return;
      if (el.classList.contains("no-prefetch")) return;
      if (el.target === "_blank") return;
      if (el.hasAttribute("download")) return;
      const href = el.getAttribute("href") || "";
      if (!href.startsWith("/") || href.startsWith("#")) return;
      const path = href.split("#")[0].split("?")[0];
      if (!path || path === window.location.pathname || done.has(path)) return;
      done.add(path);
      try {
        router.prefetch(path);
      } catch {
        /* invalid route — ignore */
      }
    };

    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("touchstart", handleEnter, { passive: true });
    return () => {
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("touchstart", handleEnter);
    };
  }, [router]);

  return null;
}
