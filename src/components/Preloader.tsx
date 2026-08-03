"use client";

import { useEffect, useState, type CSSProperties } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    document.body.style.overflow = "hidden";
    const delay = reduce ? 0 : 1500;
    const t1 = window.setTimeout(() => setDone(true), delay);
    const t2 = window.setTimeout(
      () => {
        setGone(true);
        document.body.style.overflow = "";
      },
      reduce ? 0 : 2450
    );
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  const word = "halcyzhuo";

  return (
    <div className={`preloader ${done ? "preloader--done" : ""}`} aria-hidden="true">
      <div className="preloader__inner">
        <span className="preloader__word">
          {word.split("").map((c, i) => (
            <i key={i} style={{ "--i": i } as CSSProperties}>
              {c}
            </i>
          ))}
          <i className="preloader__dot" style={{ "--i": word.length } as CSSProperties}>
            .
          </i>
        </span>
        <span className="preloader__bar" />
      </div>
    </div>
  );
}
