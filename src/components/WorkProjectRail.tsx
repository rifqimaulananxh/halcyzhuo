"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { CursorHover } from "@/components/CursorHover";
import { onMotionReady } from "@/lib/motion";

export function WorkProjectRail({
  projects,
}: {
  projects: readonly Project[];
}) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const track = viewport.querySelector<HTMLElement>(".work-projects__track");
    const firstSet = viewport.querySelector<HTMLElement>(
      ".work-projects__set--first"
    );
    if (!track || !firstSet) return;

    const media = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let loopWidth = 0;
    let x = 0;
    let speed = -0.75;
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startOffset = 0;
    let previousX = 0;
    let raf = 0;
    let started = false;
    let paused = false;
    let resizeObserver: ResizeObserver | undefined;

    const render = () => {
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    };

    const wrap = () => {
      if (!loopWidth) return;
      if (x <= -loopWidth) x += loopWidth;
      if (x > 0) x -= loopWidth;
    };

    const measure = () => {
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      loopWidth = firstSet.offsetWidth + gap;
      wrap();
      render();
    };

    const tick = () => {
      if (!started || !media.matches || reduce.matches || document.hidden) {
        raf = 0;
        return;
      }
      if (!dragging && !paused && loopWidth > 0) {
        speed += (-0.75 - speed) * 0.05;
        x += speed;
        wrap();
        render();
      }
      raf = window.requestAnimationFrame(tick);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!media.matches) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startOffset = x;
      previousX = event.clientX;
      speed = 0;
      viewport.classList.add("is-dragging");
      viewport.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const distance = event.clientX - startX;
      if (Math.abs(distance) > 4) moved = true;
      x = startOffset + distance;
      speed = event.clientX - previousX;
      previousX = event.clientX;
      wrap();
      render();
    };

    const stopDragging = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove("is-dragging");
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
    };

    const onClick = (event: MouseEvent) => {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    };

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    const start = () => {
      if (started || !media.matches || reduce.matches) return;
      started = true;
      measure();
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(viewport);
      viewport.addEventListener("pointerdown", onPointerDown);
      viewport.addEventListener("pointermove", onPointerMove);
      viewport.addEventListener("pointerup", stopDragging);
      viewport.addEventListener("pointercancel", stopDragging);
      viewport.addEventListener("click", onClick, true);
      viewport.addEventListener("pointerenter", pause);
      viewport.addEventListener("pointerleave", resume);
      viewport.addEventListener("focusin", pause);
      viewport.addEventListener("focusout", resume);
      raf = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!started) return;
      started = false;
      window.cancelAnimationFrame(raf);
      raf = 0;
      resizeObserver?.disconnect();
      resizeObserver = undefined;
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", stopDragging);
      viewport.removeEventListener("pointercancel", stopDragging);
      viewport.removeEventListener("click", onClick, true);
      viewport.removeEventListener("pointerenter", pause);
      viewport.removeEventListener("pointerleave", resume);
      viewport.removeEventListener("focusin", pause);
      viewport.removeEventListener("focusout", resume);
      viewport.classList.remove("is-dragging");
    };

    const onMediaChange = () => {
      if (media.matches) start();
      else stop();
    };
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const unsubscribe = onMotionReady(start);
    media.addEventListener("change", onMediaChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      unsubscribe();
      media.removeEventListener("change", onMediaChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stop();
      track.style.transform = "";
    };
  }, []);

  return (
    <div className="work-projects">
      <div
        ref={viewportRef}
        className="work-projects__viewport"
        role="region"
        aria-label="Selected projects"
      >
        <div className="work-projects__track">
          {["first", "clone"].map((setName) => (
            <div
              className={`work-projects__set work-projects__set--${setName}`}
              key={setName}
              aria-hidden={setName === "clone"}
            >
              {projects.map((project, index) => (
                <article
                  className="work-project-card"
                  key={`${setName}-${project.slug}`}
                  style={{ "--i": index } as CSSProperties}
                >
                  <div className="work-project-card__meta">
                    <span>{project.title}</span>
                    <span>{project.year}</span>
                  </div>
                  <CursorHover>
                    <Link
                      href={`/work/${project.slug}`}
                      className="work-project-card__link"
                      data-no-page-transition
                      draggable={false}
                      tabIndex={setName === "clone" ? -1 : undefined}
                    >
                      <div className="work-project-card__image">
                        <img
                          src={project.cover}
                          alt={`${project.title} - ${project.tagline}`}
                          loading={
                            setName === "first" && index === 0 ? "eager" : "lazy"
                          }
                          fetchPriority={
                            setName === "first" && index === 0 ? "high" : "low"
                          }
                          draggable={false}
                        />
                      </div>
                    </Link>
                  </CursorHover>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
