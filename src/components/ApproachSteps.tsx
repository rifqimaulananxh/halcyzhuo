"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { onMotionReady } from "@/lib/motion";

export type ApproachStep = {
  step: string;
  title: string;
  desc: string;
  tags: string[];
};

export function ApproachSteps({
  steps,
}: {
  steps: readonly ApproachStep[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entered, setEntered] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-approach-step]")
    );
    if (!items.length) return;

    const enteredIndexes = new Set<number>();
    let raf = 0;
    let observer: IntersectionObserver | undefined;
    let fallback = 0;

    const updateActive = () => {
      const targetY = window.innerHeight * 0.46;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - targetY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        updateActive();
      });
    };

    const start = () => {
      observer = new IntersectionObserver(
        (entries) => {
          let changed = false;
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const index = Number(
              (entry.target as HTMLElement).dataset.approachIndex
            );
            if (enteredIndexes.has(index)) return;
            enteredIndexes.add(index);
            changed = true;
          });
          if (changed) setEntered(new Set(enteredIndexes));
        },
        { threshold: 0.12 }
      );

      items.forEach((item) => observer?.observe(item));
      fallback = window.setTimeout(() => {
        items.forEach((item, index) => {
          if (!enteredIndexes.has(index)) {
            enteredIndexes.add(index);
            setEntered(new Set(enteredIndexes));
          }
        });
      }, 4000);
      updateActive();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    };

    const unsubscribe = onMotionReady(start);

    return () => {
      unsubscribe();
      observer?.disconnect();
      window.clearTimeout(fallback);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, [steps.length]);

  return (
    <div ref={rootRef} className="approach-steps relative">
      {steps.map((step, index) => (
        <article
          key={step.step}
          data-approach-step
          data-approach-index={index}
          style={{ "--i": index } as CSSProperties}
          className={`approach-step grid grid-cols-[180px_minmax(0,1fr)_56px] items-start gap-8 py-[52px] hover:pl-3 max-[1024px]:grid-cols-[140px_minmax(0,1fr)_48px] max-[1024px]:gap-6 max-[809px]:grid-cols-1 max-[809px]:gap-5 max-[809px]:py-10${entered.has(index) ? " approach-step--entered" : ""}${activeIndex === index ? " approach-step--active" : ""}`}
        >
          <div className="approach-step__label relative z-10 flex flex-col items-start gap-3 bg-bg">
            <span className="approach-step__number text-[var(--fs-body-sm)] font-semibold tracking-[0.08em] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[var(--fs-body-sm)] font-semibold uppercase tracking-[0.16em] text-accent">
              {step.step.split(" · ")[1] ?? step.step}
            </span>
          </div>
          <div className="approach-step__content">
            <h3 className="font-display mb-5 text-[clamp(26px,2.5vw,42px)] font-semibold leading-[1.05] tracking-[-0.055em]">
              {step.title}
            </h3>
            <p className="max-w-[650px] text-[var(--fs-body)] leading-normal text-muted">
              {step.desc}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
              {step.tags.map((tag, tagIndex) => (
                <span
                  key={tag}
                  className="text-[var(--fs-bold-sm)] text-muted transition-colors duration-200 hover:text-ink"
                >
                  {tag}
                  {tagIndex < step.tags.length - 1 && (
                    <span className="ml-4 text-outline" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <span
            className="approach-step__arrow flex w-full justify-end pt-1 pr-1 text-[30px] max-[809px]:hidden"
            aria-hidden="true"
          >
            →
          </span>
          <span className="approach-step__line" aria-hidden="true" />
        </article>
      ))}
    </div>
  );
}
