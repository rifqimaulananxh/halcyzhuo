"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";

const PRELOADER_ANIMATION = "preloader-drive";

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.documentElement.classList.add("is-loading");
    document.body.style.overflow = "hidden";

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cancelled = false;
    let finished = false;

    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      document.documentElement.classList.remove("is-loading");
      document.body.style.overflow = "";
      setGone(true);
      window.__preloaderDone = true;
      window.dispatchEvent(new CustomEvent("preloader:done"));
    };

    if (reduce) {
      finish();
      return;
    }

    const counter = root.querySelector<HTMLElement>(".preloader__meta-num");
    if (counter) {
      const start = performance.now();
      const DURATION = 1300;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        const eased = 1 - Math.pow(1 - t, 3);
        counter.textContent =
          eased >= 1
            ? "100"
            : String(Math.floor(eased * 100)).padStart(3, "0");
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    const handleEnd = (e: AnimationEvent) => {
      if (e.animationName === PRELOADER_ANIMATION) finish();
    };
    root.addEventListener("animationend", handleEnd);

    return () => {
      cancelled = true;
      root.removeEventListener("animationend", handleEnd);
      document.documentElement.classList.remove("is-loading");
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader__in">
        <p className="preloader__line">
          <Wordmark word="halcy" />
            <span className="preloader__meta">
              <span className="preloader__meta-item">
                <span className="preloader__meta-label">Engineering studio</span>
              </span>
              <span className="preloader__meta-item">
                <span className="preloader__meta-count">
                  <span className="preloader__meta-num">000</span>%
                </span>
              </span>
            </span>
        </p>
        <p className="preloader__line">
          <Wordmark word="zhuo." className="preloader__word--zhuo" />
        </p>
      </div>
    </div>
  );
}
