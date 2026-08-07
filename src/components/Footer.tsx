"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import type gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/site";
import { onMotionReady } from "@/lib/motion";

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

const bottomLinks = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
];

const exploreLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Stack", href: "/#stack" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/#contact" },
];

const connectLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
  { label: "GitHub", href: "https://github.com" },
];

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let destroyed = false;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      let bundle: GsapBundle;
      try {
        bundle = await loadGsap();
      } catch {
        return;
      }
      if (destroyed || !root.isConnected) return;

      const inner = root.querySelector<HTMLElement>(".footer__motion");
      if (!inner) return;

      const media = bundle.gsap.matchMedia();
      media.add("(min-width: 810px)", () => {
        const tween = bundle.gsap.fromTo(
          inner,
          { yPercent: -6 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "top 35%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      cleanup = () => media.revert();
    };

    const unsubscribe = onMotionReady(() => {
      void run();
    });

    return () => {
      destroyed = true;
      unsubscribe();
      cleanup?.();
    };
  }, []);

  return (
    <footer ref={rootRef} className="border-t border-surface">
      <div className="footer__motion">
        <div className="mx-auto max-w-[var(--max-w)] px-[var(--pad-inner)] pt-[clamp(48px,6vw,90px)] pb-10">
          <div className="footer__brand">
            <Link href="/" className="footer__wordmark">
              halcyzhuo<span>.</span>
            </Link>
            <p className="footer__tagline">{SITE.tagline}.</p>
          </div>

          <div className="footer__grid">
            <div>
              <p className="footer__column-title">Explore</p>
              <ul className="footer__menu">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="footer__column-title">Connect</p>
              <ul className="footer__menu">
                {connectLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__contact">
              <p className="footer__column-title">Start a conversation</p>
              <a
                href={`mailto:${SITE.email}`}
                className="footer__email footer__link"
              >
                {SITE.email}
              </a>
              <p className="footer__location">Jakarta, Indonesia · Remote</p>
            </div>
          </div>

          <div className="footer__bottom">
            <ul className="footer__nav">
              {bottomLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p>© 2026 {SITE.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
