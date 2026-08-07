"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type gsap from "gsap";

/* eslint-disable @next/next/no-img-element */

const LINKS = [
  { key: "home", label: "Home", href: "/", image: "/hero/hero-1.svg" },
  { key: "work", label: "Work", href: "/work", image: "/hero/hero-2.svg" },
  { key: "about", label: "About", href: "/about", image: "/hero/hero-3.svg" },
  {
    key: "journal",
    label: "Journal",
    href: "/journal",
    image: "/hero/hero-4.svg",
  },
  {
    key: "contact",
    label: "Contact",
    href: "/#contact",
    image: "/hero/hero-5.svg",
  },
] as const;

let gsapPromise: Promise<typeof gsap> | null = null;

function loadGsap(): Promise<typeof gsap> {
  gsapPromise ??= import("gsap").then((m) => m.default);
  return gsapPromise;
}

export function Nav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [open, setOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [lastIndex, setLastIndex] = useState(0);
  const [showDelay, setShowDelay] = useState(true);

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    const [path, section] = href.split("#");
    if (section) return pathname === (path || "/") && hash === `#${section}`;
    const base = path || "/";
    if (base === "/") return pathname === "/" && hash !== "#contact";
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  const activeIndex = LINKS.findIndex((link) => isActive(link.href));
  const displayedIndex = hoverIndex ?? activeIndex;

  /* drawer open reveal (roshan-style: title fade + items stagger) */
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let kill: (() => void) | undefined;

    loadGsap()
      .then((gsap) => {
        if (cancelled || !drawerRef.current) return;
        const title = drawerRef.current.querySelector("[data-nav-title]");
        const items = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>("[data-nav-item]")
        );
        if (!title) return;
        const tl = gsap.timeline({ delay: 0.8 });
        tl.fromTo(
          title,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power4.out" }
        );
        tl.fromTo(
          items,
          { y: "100%" },
          { y: "0%", duration: 0.6, stagger: 0.1, ease: "power4.out" },
          0
        );
        kill = () => gsap.killTweensOf([title, ...items]);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      kill?.();
    };
  }, [open]);

  const toggle = () => {
    if (open) {
      setOpen(false);
    } else {
      setShowDelay(true);
      window.setTimeout(() => {
        setShowDelay(false);
      }, 800);
      setOpen(true);
    }
  };

  const close = () => setOpen(false);

  return (
    <>
      <nav className="navbar" aria-label="Primary">
        <Link className="navbar__logo" href="/" aria-label="halcyzhuo">
          H.
        </Link>
        <button
          type="button"
          className={`navbar__menu ${open ? "navbar__menu--open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={toggle}
        >
          <span className="navbar__bar" />
          <span className="navbar__bar" />
        </button>
      </nav>

      <div
        className={`nav-drawer ${open ? "nav-drawer--open" : ""}`}
        ref={drawerRef}
      >
        <div className="nav-drawer__content">
          <h1 className="nav-drawer__title" data-nav-title>
            Engineered
            <br />
            to
            <br />
            last.
          </h1>
          <div className="nav-drawer__preview" aria-hidden="true">
            {LINKS.map((link, i) => {
              const isCurrent = open && i === displayedIndex;
              const isLast = open && i === lastIndex;
              let y = 100;
              let z = 0;
              let transition = "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)";
              if (isCurrent) {
                y = 0;
                z = 2;
                if (showDelay)
                  transition =
                    "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1) 0.4s";
              } else if (isLast) {
                y = 0;
                z = 1;
                transition = "none";
              }
              return (
                <div
                  key={link.key}
                  className="nav-drawer__preview-img"
                  style={{
                    transform: `translateY(${y}%)`,
                    zIndex: z,
                    transition,
                  }}
                >
                  <img src={link.image} alt="" />
                </div>
              );
            })}
          </div>
          <ul className="nav-drawer__list">
            {LINKS.map((link, i) => (
              <li className="nav-drawer__item" key={link.key}>
                <Link
                  href={link.href}
                  className={`nav-drawer__link ${
                    isActive(link.href) ? "nav-drawer__link--active" : ""
                  }`}
                  data-nav-item
                  onClick={close}
                  onMouseEnter={() => {
                    setLastIndex(hoverIndex ?? activeIndex);
                    setHoverIndex(i);
                  }}
                  onMouseLeave={() => {
                    setLastIndex(i);
                    setHoverIndex(null);
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`nav-drawer__overlay ${
          open ? "nav-drawer__overlay--open" : ""
        }`}
        onClick={close}
        aria-hidden="true"
      />
    </>
  );
}
