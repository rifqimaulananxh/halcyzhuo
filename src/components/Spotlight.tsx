"use client";

import { useEffect, useRef } from "react";

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pos = { x: -1000, tx: -1000, y: -1000, ty: -1000 };
    let raf = 0;

    const loop = () => {
      raf = 0;
      pos.x += (pos.tx - pos.x) * 0.09;
      pos.y += (pos.ty - pos.y) * 0.09;
      el.style.background = `radial-gradient(560px at ${pos.x.toFixed(1)}px ${pos.y.toFixed(1)}px, rgba(34,34,34,0.055), transparent 70%)`;
      if (Math.abs(pos.x - pos.tx) > 0.5 || Math.abs(pos.y - pos.ty) > 0.5) {
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (e: MouseEvent) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ willChange: "background" }}
    />
  );
}
