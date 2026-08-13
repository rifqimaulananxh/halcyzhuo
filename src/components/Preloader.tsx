"use client";

import { useEffect, useRef, useState } from "react";
import type gsap from "gsap";
import { Wordmark } from "./Wordmark";

let gsapPromise: Promise<typeof gsap> | null = null;

function loadGsap(): Promise<typeof gsap> {
  gsapPromise ??= import("gsap").then((m) => m.default);
  return gsapPromise;
}

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const derivX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (t: number) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let x = t;
    for (let i = 0; i < 8; i++) {
      const err = sampleX(x) - t;
      if (Math.abs(err) < 1e-5) return sampleY(x);
      const d = derivX(x);
      x -= d === 0 ? 1e-4 : err / d;
    }
    return sampleY(x);
  };
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOut4 = cubicBezier(0.525, 0, 0.225, 1);

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
    let timeline: gsap.core.Timeline | null = null;
    let finishTimer = 0;
    let finished = false;

    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      document.documentElement.classList.remove("is-loading");
      document.body.style.overflow = "";
      setGone(true);
      finishTimer = window.setTimeout(() => {
        window.__preloaderDone = true;
        window.dispatchEvent(new CustomEvent("preloader:done"));
      }, 0);
    };

    if (reduce) {
      finish();
      return;
    }

    const gsapReady = Promise.race([
      loadGsap(),
      new Promise<never>((_, reject) => {
        window.setTimeout(
          () => reject(new Error("GSAP preload timeout")),
          3000
        );
      }),
    ]);

    gsapReady
      .then(async (gsap) => {
        if (cancelled) return;

        await Promise.race([
          document.fonts.ready.catch(() => undefined),
          new Promise((resolve) => setTimeout(resolve, 500)),
        ]);
        if (cancelled) return;

        const wordEls = Array.from(
          root.querySelectorAll<HTMLElement>(".preloader__word")
        );
        const greyEls = Array.from(
          root.querySelectorAll<HTMLElement>(".preloader__word-grey")
        );
        const inkEls = Array.from(
          root.querySelectorAll<HTMLElement>(".preloader__word-ink")
        );
        const metaEls = Array.from(
          root.querySelectorAll<HTMLElement>(".preloader__meta-item > *")
        );
        const numEl = root.querySelector<HTMLElement>(".preloader__meta-num");

        const counter = { prgs: 0 };
        const paintCount = () => {
          if (numEl)
            numEl.textContent = String(
              Math.min(99, Math.floor(counter.prgs * 100))
            ).padStart(3, "0");
        };

        gsap.set(root.querySelector(".preloader__in"), { visibility: "visible" });
        gsap.set(metaEls, { yPercent: 120 });
        gsap.set(wordEls, { xPercent: -25 });
        gsap.set(inkEls, { xPercent: -100.1 });

        timeline = gsap.timeline({ defaults: { ease: easeInOut4 } });
        timeline
          .to(metaEls, { yPercent: 0, duration: 0.7, ease: easeOutExpo, stagger: 0.09 }, 0)
          .to(inkEls, { xPercent: 0, duration: 0.8, stagger: 0.09 }, 0.3)
          .to(wordEls, { xPercent: 0, duration: 1.0, ease: easeOutExpo, stagger: 0.09 }, 0.3)
          .to(counter, { prgs: 1, duration: 1.0, ease: easeInOut4, onUpdate: paintCount }, 0.3)
          .add(() => {
            if (numEl) numEl.textContent = "100";
          }, "+=0.1")
          .to(metaEls, { yPercent: -120, duration: 0.6, stagger: 0.09 }, "+=0.1")
          .to(
            inkEls,
            { xPercent: -100.5, duration: 0.75, stagger: { each: 0.09, from: "end" } },
            "<"
          )
          .to(
            greyEls,
            { xPercent: 100.5, duration: 0.75, stagger: { each: 0.09, from: "end" } },
            "<"
          )
          .to(
            wordEls,
            {
              x: (i: number) => wordEls[i].getBoundingClientRect().width * 0.4,
              duration: 0.85,
              ease: easeInOut4,
              stagger: { each: 0.09 },
            },
            "<"
          )
          .add(finish, "+=0.1");
      })
      .catch(() => {
        if (!cancelled) finish();
      });

    return () => {
      cancelled = true;
      timeline?.kill();
      window.clearTimeout(finishTimer);
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
