"use client";

import { useEffect, useState } from "react";
import { onMotionReady } from "@/lib/motion";

export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    const unsubscribe = onMotionReady(() => {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    });
    return () => {
      unsubscribe();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-ink origin-left transition-transform duration-150 ease-out will-change-transform"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}
