"use client";

import { useEffect, useRef, useState } from "react";
import type gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SplitText } from "gsap/SplitText";
import { onMotionReady } from "@/lib/motion";
import { projects } from "@/lib/projects";

/* eslint-disable @next/next/no-img-element */

type GsapBundle = {
  gsap: typeof gsap;
  SplitText: typeof SplitText;
  ScrollTrigger: typeof ScrollTrigger;
};

let gsapBundlePromise: Promise<GsapBundle> | null = null;

function loadGsap(): Promise<GsapBundle> {
  gsapBundlePromise ??= Promise.all([
    import("gsap"),
    import("gsap/SplitText"),
    import("gsap/ScrollTrigger"),
  ]).then(([gsapModule, splitTextModule, scrollTriggerModule]) => {
    gsapModule.default.registerPlugin(
      splitTextModule.SplitText,
      scrollTriggerModule.ScrollTrigger
    );
    return {
      gsap: gsapModule.default,
      SplitText: splitTextModule.SplitText,
      ScrollTrigger: scrollTriggerModule.ScrollTrigger,
    };
  });
  return gsapBundlePromise;
}

const HERO_POINTERS = [
  { src: "/hero/hero-1.svg", label: "Fast, clear interfaces" },
  { src: "/hero/hero-2.svg", label: "Performance under load" },
  { src: "/hero/hero-3.svg", label: "Systems ready to scale" },
  { src: "/hero/hero-4.svg", label: "Code ready for handover" },
];

const HERO_POINTER_PROJECTS = projects.slice(0, 4);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [clock, setClock] = useState("");
  const [feature, setFeature] = useState(0);

  /* WIB clock (roshan-style, Asia/Jakarta) */
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setClock(formatter.format(new Date()));
    let timeoutId = 0;
    let intervalId = 0;
    const unsubscribe = onMotionReady(() => {
      timeoutId = window.setTimeout(tick, 0);
      intervalId = window.setInterval(tick, 1000);
    });
    return () => {
      unsubscribe();
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  /* mobile feature rotator (roshan-style, cycles every 1s) */
  useEffect(() => {
    let intervalId = 0;
    const unsubscribe = onMotionReady(() => {
      intervalId = window.setInterval(() => {
        setFeature((f) => (f + 1) % HERO_POINTERS.length);
      }, 1000);
    });
    return () => {
      unsubscribe();
      window.clearInterval(intervalId);
    };
  }, []);

  /* hero reveal (SplitText words->chars) + cursor chrome (roshan-style) */
  useEffect(() => {
    const hero = rootRef.current;
    if (!hero) return;

    const showFinal = () => {
      hero
        .querySelectorAll<HTMLElement>("[data-hero-heading]")
        .forEach((el) => {
          el.style.opacity = "1";
        });
      hero
        .querySelectorAll<HTMLElement>("[data-hero-chrome]")
        .forEach((el) => {
          el.style.opacity = "1";
        });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showFinal();
      return;
    }

    let destroyed = false;
    let cleanupChrome: (() => void) | undefined;
    const splitInstances: SplitText[] = [];
    const animatedChars: Element[] = [];

    const els = (...list: (HTMLElement | null | undefined)[]) =>
      list.filter((e): e is HTMLElement => Boolean(e));

    const play = async () => {
      let bundle: GsapBundle;
      try {
        bundle = await loadGsap();
      } catch {
        showFinal();
        return;
      }
      if (destroyed || !hero.isConnected) return;
      const { gsap, SplitText } = bundle;

      const headings = Array.from(
        hero.querySelectorAll<HTMLElement>("[data-hero-heading]")
      );
      const crosshairV =
        hero.querySelector<HTMLElement>("[data-hero-crosshair-v]");
      const crosshairH =
        hero.querySelector<HTMLElement>("[data-hero-crosshair-h]");
      const pointers = Array.from(
        hero.querySelectorAll<HTMLElement>("[data-hero-pointer]")
      );
      const meta = Array.from(
        hero.querySelectorAll<HTMLElement>("[data-hero-meta]")
      );
      const featuresMobile =
        hero.querySelector<HTMLElement>("[data-hero-features]");

      const chrome = els(
        crosshairV,
        crosshairH,
        ...pointers,
        ...meta,
        featuresMobile
      );

      gsap.set(chrome, { opacity: 0 });
      gsap.set(headings, { opacity: 0 });

      headings.forEach((heading) => {
        const wordsSplit = new SplitText(heading, { type: "words" });
        splitInstances.push(wordsSplit);
        wordsSplit.words.forEach((word) => {
          const charsSplit = new SplitText(word, { type: "chars" });
          const chars = charsSplit.chars;
          splitInstances.push(charsSplit);
          animatedChars.push(...chars);
          gsap.set(chars, { yPercent: 100 });
          gsap.to(chars, {
            yPercent: 0,
            duration: 1,
            stagger: 0.04,
            ease: "power4.out",
          });
        });
      });
      gsap.set(headings, { opacity: 1 });

      const rect = hero.getBoundingClientRect();
      const initX = rect.width * 0.75;
      const initY = rect.height * 0.3;

      const qVX = crosshairV
        ? gsap.quickTo(crosshairV, "x", { duration: 0.4, ease: "power3.out" })
        : null;
      const qHY = crosshairH
        ? gsap.quickTo(crosshairH, "y", { duration: 0.4, ease: "power3.out" })
        : null;
      const qPX = pointers.map((p) =>
        gsap.quickTo(p, "x", { duration: 0.4, ease: "power3.out" })
      );
      const qPY = pointers.map((p) =>
        gsap.quickTo(p, "y", { duration: 0.4, ease: "power3.out" })
      );

      if (crosshairV) gsap.set(crosshairV, { x: initX });
      if (crosshairH) gsap.set(crosshairH, { y: initY });
      pointers.forEach((p) => gsap.set(p, { x: initX, y: initY }));

      let last = { x: 0, y: 0 };
      let acc = 0;
      let current = 0;

      const onMove = (e: MouseEvent) => {
        const r = hero.getBoundingClientRect();
        const dx = e.clientX - r.left;
        const dy = e.clientY - r.top;
        if (last.x !== 0 || last.y !== 0) {
          acc += Math.hypot(dx - last.x, dy - last.y);
          if (acc >= 200) {
            acc = 0;
            gsap.to(pointers[current], {
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            });
            current = (current + 1) % pointers.length;
            gsap.to(pointers[current], {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        }
        last = { x: dx, y: dy };
        qVX?.(dx);
        qHY?.(dy);
        qPX.forEach((fn) => fn(dx));
        qPY.forEach((fn) => fn(dy));
      };

      const onEnter = () => {
        gsap.to(els(crosshairV, crosshairH, pointers[current]), {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        gsap.to(els(crosshairV, crosshairH, ...pointers), {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });
      };

      hero.addEventListener("mousemove", onMove, { passive: true });
      hero.addEventListener("mouseenter", onEnter);
      hero.addEventListener("mouseleave", onLeave);

      gsap.to(els(crosshairV, crosshairH, pointers[0], featuresMobile, ...meta), {
        opacity: 1,
        duration: 0.6,
        delay: 1,
        ease: "power2.out",
      });

      cleanupChrome = () => {
        hero.removeEventListener("mousemove", onMove);
        hero.removeEventListener("mouseenter", onEnter);
        hero.removeEventListener("mouseleave", onLeave);
        gsap.killTweensOf(
          els(crosshairV, crosshairH, ...pointers, ...meta, featuresMobile)
        );
        gsap.killTweensOf(animatedChars);
        splitInstances.forEach((split) => split.revert());
      };
    };

    const unsubscribe = onMotionReady(() => {
      void play();
    });

    return () => {
      destroyed = true;
      unsubscribe();
      cleanupChrome?.();
    };
  }, []);

  return (
    <section className="hero" data-hero ref={rootRef} aria-label="Intro">
      <div
        className="hero__crosshair-v"
        data-hero-crosshair-v
        data-hero-chrome
        aria-hidden="true"
      />
      <div
        className="hero__crosshair-h"
        data-hero-crosshair-h
        data-hero-chrome
        aria-hidden="true"
      >
        <span className="hero__crosshair-text">Engineering studio</span>
      </div>
      {HERO_POINTER_PROJECTS.map((project) => (
        <div
          className="hero__pointer"
          data-hero-pointer
          data-hero-chrome
          key={project.slug}
          aria-hidden="true"
        >
          <img className="hero__pointer-img" src={project.cover} alt="" />
          <span className="hero__pointer-label">[ {project.title} ]</span>
        </div>
      ))}

      <div className="hero__content">
        <div className="hero__spacer" />
        <div
          className="hero__features-mobile"
          data-hero-features
          data-hero-chrome
          aria-hidden="true"
        >
          <div className="hero__feature-img">
            <img
              className="hero__feature-img-el"
              src={HERO_POINTER_PROJECTS[feature].cover}
              alt=""
            />
          </div>
          <span className="hero__feature-label">
            [ {HERO_POINTER_PROJECTS[feature].title} ]
          </span>
        </div>

        <div className="hero__big-heading">
          <h1
            className="hero__heading"
            aria-label="Engineering software that holds up."
          >
            <span className="hero__heading-top" data-hero-heading aria-hidden="true">
              Engineering software
            </span>
          </h1>
          <div className="hero__heading-row">
            <div className="hero__heading-meta">
              <span
                className="hero__meta-text"
                data-hero-meta
                data-hero-chrome
              >
                halcyzhuo
              </span>
              <span
                className="hero__meta-text"
                data-hero-meta
                data-hero-chrome
              >
                Current time · {clock} WIB
              </span>
            </div>
            <div
              className="hero__heading hero__heading-right"
              data-hero-heading
              aria-hidden="true"
            >
              that holds up.
            </div>
          </div>
          <div
            className="hero__heading-mobile"
            data-hero-meta
            data-hero-chrome
            aria-hidden="true"
          >
            <span className="hero__meta-text">halcyzhuo</span>
            <span className="hero__meta-text">Engineering studio</span>
          </div>
        </div>
      </div>
    </section>
  );
}
