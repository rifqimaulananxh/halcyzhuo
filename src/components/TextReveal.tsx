"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import type gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SplitText } from "gsap/SplitText";

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

type SplitType = "lines" | "chars";
type TriggerType = "load" | "scroll";

interface TextRevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  split?: SplitType;
  trigger?: TriggerType;
  duration?: number;
  stagger?: number;
  delay?: number;
  y?: number;
  start?: string;
}

/**
 * Obscura-style text reveal built on GSAP SplitText.
 * Splits the text into lines (each wrapped in an overflow:hidden mask)
 * and slides them up from yPercent 120 with a power4.out ease.
 * gsap is loaded lazily so it ships as its own chunk after hydration.
 */
export function TextReveal({
  as: Tag = "h2",
  children,
  className = "",
  style,
  split = "lines",
  trigger = "scroll",
  duration = 1,
  stagger = 0.12,
  delay = 0,
  y = 120,
  start = "top 80%",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      el.style.visibility = "visible";
      return;
    }

    let destroyed = false;
    let resizeTimer = 0;
    let resizeHandler: (() => void) | undefined;
    let st: ScrollTrigger | undefined;
    let tween: gsap.core.Tween | undefined;
    let instance: SplitText | undefined;

    const computeLabel = (el: HTMLElement) => {
      let label = "";
      const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          label += node.textContent ?? "";
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const elm = node as Element;
          if (elm.tagName === "BR") label += " ";
          else node.childNodes.forEach(walk);
        }
      };
      el.childNodes.forEach(walk);
      return label.replace(/\s+/g, " ").trim();
    };

    const teardown = () => {
      st?.kill();
      tween?.kill();
      instance?.revert();
      st = undefined;
      tween = undefined;
      instance = undefined;
    };

    const run = async () => {
      let bundle: GsapBundle;
      try {
        bundle = await loadGsap();
      } catch {
        el.style.visibility = "visible";
        return;
      }
      if (destroyed || !el.isConnected) return;
      const { gsap, ScrollTrigger } = bundle;

      const build = (instant: boolean) => {
        if (destroyed || !el.isConnected) return;
        teardown();
        el.style.visibility = "visible";

        const label = computeLabel(el);
        instance = new bundle.SplitText(el, {
          type: "lines,words,chars",
          mask: "lines",
          linesClass: "text-line",
          wordsClass: "text-word",
          charsClass: "text-char",
          reduceWhiteSpace: true,
          aria: "none",
        });
        if (label) el.setAttribute("aria-label", label);
        instance.lines.forEach((line) =>
          line.setAttribute("aria-hidden", "true")
        );

        const targets =
          split === "lines" ? instance.lines : instance.chars;
        if (instant) {
          gsap.set(targets, { yPercent: 0 });
          return;
        }

        tween = gsap.fromTo(
          targets,
          { yPercent: y },
          {
            yPercent: 0,
            duration,
            ease: "power4.out",
            stagger:
              split === "lines" ? stagger : { amount: duration },
            delay,
            clearProps: "transform",
          }
        );

        if (trigger === "scroll") {
          tween.pause();
          st = ScrollTrigger.create({
            trigger: el,
            start,
            once: true,
            onEnter: () => tween?.play(),
          });
        }
      };

      const rebuildIfIdle = () => {
        if (!tween) {
          build(false);
          ScrollTrigger.refresh();
          return;
        }
        const p = tween.progress();
        if (p === 1) {
          build(true);
          ScrollTrigger.refresh();
        } else if (p === 0) {
          build(false);
          ScrollTrigger.refresh();
        }
      };

      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(rebuildIfIdle, 150);
      };
      resizeHandler = onResize;
      window.addEventListener("resize", onResize);

      build(false);

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          if (destroyed) return;
          window.clearTimeout(resizeTimer);
          rebuildIfIdle();
        });
      }
    };

    run();

    return () => {
      destroyed = true;
      window.clearTimeout(resizeTimer);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      teardown();
    };
  }, [split, trigger, duration, stagger, delay, y, start]);

  return (
    <Tag
      ref={ref as never}
      data-text-reveal
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
