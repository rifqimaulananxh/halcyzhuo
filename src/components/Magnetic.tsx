"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { onMotionReady } from "@/lib/motion";

export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const readyRef = useRef(false);

  useEffect(() => onMotionReady(() => {
    readyRef.current = true;
  }), []);

  const onMove = (e: MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || !readyRef.current) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${(x * strength).toFixed(1)}px, ${(
      y * strength
    ).toFixed(1)}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el || !readyRef.current) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}
