"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import type gsap from "gsap";

let gsapPromise: Promise<typeof gsap> | null = null;

function loadGsap(): Promise<typeof gsap> {
  gsapPromise ??= import("gsap").then((m) => m.default);
  return gsapPromise;
}

/**
 * Draggable marquee — 1:1 replica of the paulkalkbrenner.net platform
 * marquee. A single row of items that auto-scrolls left and can be grabbed:
 * drag movement is multiplied (data-multiplier on the original) and on
 * release the content keeps momentum, then auto-scroll resumes.
 * Falls back to a static strip when prefers-reduced-motion is set.
 */
export function DraggableMarquee({
  items,
  className = "",
  duration = 80,
  multiplier = 35,
}: {
  items: ReactNode[];
  className?: string;
  duration?: number;
  multiplier?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let destroyed = false;
    let auto: gsap.core.Tween | undefined;
    let throwTween: gsap.core.Tween | undefined;
    let resizeTimer = 0;
    let cleanupListeners: (() => void) | undefined;

    const killTweens = () => {
      auto?.kill();
      throwTween?.kill();
      auto = undefined;
      throwTween = undefined;
    };

    const run = async () => {
      let gsapApi: typeof gsap;
      try {
        gsapApi = await loadGsap();
      } catch {
        return;
      }
      if (destroyed || !track.isConnected) return;

      let half = 0;
      let wrap = (v: number) => v;
      const pos = { x: 0 };
      let apply = () => {};

      const syncAuto = () => {
        if (!auto) return;
        auto.progress(-pos.x / half);
        auto.play();
      };

      const build = () => {
        killTweens();
        half = track.scrollWidth / 2;
        if (!half) return;
        wrap = gsapApi.utils.wrap(-half, 0);
        if (pos.x === -half) pos.x = 0;
        apply = () => gsapApi.set(track, { x: wrap(pos.x) });
        apply();
        auto = gsapApi.to(pos, {
          x: -half,
          duration,
          ease: "none",
          repeat: -1,
          onUpdate: apply,
        });
      };

      build();

      let dragging = false;
      let startPX = 0;
      let startX = 0;
      let lastPX = 0;
      let lastT = 0;
      let vel = 0;

      const onDown = (e: PointerEvent) => {
        if (e.button !== 0 && e.pointerType === "mouse") return;
        dragging = true;
        startPX = e.clientX;
        lastPX = e.clientX;
        startX = pos.x;
        lastT = performance.now();
        vel = 0;
        throwTween?.kill();
        throwTween = undefined;
        auto?.pause();
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      };

      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        const now = performance.now();
        const dt = now - lastT;
        if (dt > 0) vel = ((e.clientX - lastPX) / dt) * 1000 * multiplier;
        lastPX = e.clientX;
        lastT = now;
        pos.x = wrap(startX + (e.clientX - startPX) * multiplier);
        apply();
      };

      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        if (Math.abs(vel) > 30) {
          const dist = vel * 0.35;
          throwTween = gsapApi.to(pos, {
            x: pos.x + dist,
            duration: Math.min(2.2, Math.abs(dist) / 2000 + 0.35),
            ease: "power2.out",
            onUpdate: apply,
            onComplete: () => {
              throwTween = undefined;
              syncAuto();
            },
          });
        } else {
          pos.x = wrap(pos.x);
          apply();
          syncAuto();
        }
      };

      track.addEventListener("pointerdown", onDown);
      track.addEventListener("pointermove", onMove);
      track.addEventListener("pointerup", onUp);
      track.addEventListener("pointercancel", onUp);

      const refresh = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(build, 150);
      };
      window.addEventListener("resize", refresh);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(refresh);
      }

      cleanupListeners = () => {
        window.removeEventListener("resize", refresh);
        track.removeEventListener("pointerdown", onDown);
        track.removeEventListener("pointermove", onMove);
        track.removeEventListener("pointerup", onUp);
        track.removeEventListener("pointercancel", onUp);
      };
    };

    run();

    return () => {
      destroyed = true;
      window.clearTimeout(resizeTimer);
      cleanupListeners?.();
      killTweens();
    };
  }, [duration, multiplier]);

  return (
    <div
      ref={rootRef}
      className={`draggable-marquee is--platforms ${className}`}
      role="region"
      aria-label="Tech stack"
    >
      <div ref={trackRef} className="draggable-marquee__collection">
        <div className="draggable-marquee__list">
          {Array.from({ length: 2 }).map((_, dup) =>
            items.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className="draggable-marquee__item"
                aria-hidden={dup === 1}
              >
                <span className="draggable-marquee__text">{item}</span>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
