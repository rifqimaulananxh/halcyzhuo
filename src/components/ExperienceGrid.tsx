"use client";

import { useLayoutEffect, useRef } from "react";
import type gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

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

export type ExperienceRow = { word: string; col: number }[];

const COL_COUNT = 10;
const ROW_COL_COUNT = 8;

/**
 * Value grid — a 1:1 replica of the paulkalkbrenner.net experience
 * section. A wide grid of columns (numbered 01-09) with vertical rules that,
 * together with the text rows, pan left as you scroll (scrubbed, ~4.75
 * columns), while the words slide in with a small stagger.
 */
export function ExperienceGrid({
  rows,
  className = "",
}: {
  rows: ExperienceRow[];
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let destroyed = false;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      let gsapApi: typeof gsap;
      try {
        const bundle = await loadGsap();
        gsapApi = bundle.gsap;
      } catch {
        return;
      }
      if (destroyed || !wrap.isConnected) return;

      const cols = gsapApi.utils.toArray<HTMLElement>(
        "[data-experience-col]",
        wrap
      );
      const textRows = gsapApi.utils.toArray<HTMLElement>(
        "[data-experience-text-row]",
        wrap
      );
      if (!cols.length && !textRows.length) return;
      const words = wrap.querySelectorAll("h2");

      const mm = gsapApi.matchMedia();
      mm.add(
        { isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" },
        (ctx) => {
          const isMobile = !!ctx.conditions?.isMobile;
          const colWidth = () => {
            const first = cols[0];
            return first ? first.getBoundingClientRect().width : 0;
          };
          const shift = () => (isMobile ? -6 : -4.75) * colWidth();
          const tl = gsapApi.timeline({
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
          tl.to([...cols, ...textRows], {
            x: shift,
            ease: "none",
            duration: 1,
          }).from(
            words,
            { x: "0.75em", ease: "none", stagger: 0.03, duration: 0.85 },
            "<"
          );
          return () => {
            tl.kill();
          };
        }
      );

      cleanup = () => mm.revert();
    };

    run();

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, []);

  return (
    <section className={`exp-section ${className}`} aria-label="What we deliver">
      <div ref={wrapRef} className="exp-wrap" data-experience-wrap>
        <div className="exp-lines">
          <div className="exp-lines__cover">
            <div className="exp-lines__col-border" />
            {rows.map((_, ri) => (
              <div key={ri} className="exp-bg__row" />
            ))}
          </div>
          {Array.from({ length: COL_COUNT }, (_, i) => (
            <div key={i} data-experience-col className="exp-lines__col">
              {i > 0 && (
                <span className="exp-lines__col-label">
                  {String(i).padStart(2, "0")}
                </span>
              )}
              <div className="exp-lines__col-border" />
            </div>
          ))}
        </div>
        <div className="exp-content">
          {rows.map((row, ri) => (
            <div
              key={ri}
              data-experience-text-row
              className="exp-content__row"
            >
              {Array.from({ length: ROW_COL_COUNT }, (_, ci) => {
                const cell = row.find((w) => w.col === ci);
                return (
                  <div key={ci} className="exp-content__col">
                    {cell && (
                      <div className="exp-content__el">
                        <div className="exp-content__dot" />
                        <h2 className="exp-content__h">{cell.word}</h2>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
