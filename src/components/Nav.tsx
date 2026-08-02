"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Magnetic } from "@/components/Magnetic";
import { NAV_LINKS, SITE } from "@/lib/site";

const navLinks = NAV_LINKS.filter((link) => link.key !== "contact");

const LOGO = "halcyzhuo";

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      const dy = y - lastY.current;
      if (y > 140 && dy > 2 && !open) setHidden(true);
      else if (dy < -2 || y < 140) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled || open
            ? "bg-bg/85 backdrop-blur-md border-b border-surface"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[var(--max-w)] px-[var(--pad-inner)] py-4 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="logo-mask text-xl font-semibold tracking-tight">
              {LOGO.split("").map((c, i) => (
                <span
                  key={i}
                  className="logo-char"
                  style={{ "--i": i } as CSSProperties}
                >
                  {c}
                </span>
              ))}
              <span
                className="logo-char text-muted"
                style={{ "--i": LOGO.length } as CSSProperties}
              >
                .
              </span>
            </Link>
            <nav className="flex items-center gap-8 max-[809px]:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  data-active={pathname === link.href}
                  className="relative text-[15px] font-semibold transition-opacity after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-200 hover:opacity-70 hover:after:w-full data-[active=true]:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Magnetic className="max-[809px]:hidden">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center rounded-[8px] border border-outline px-4 py-2 text-[13px] font-semibold transition-colors duration-200 hover:border-ink hover:bg-bg"
              >
                Email
              </a>
            </Magnetic>
            <Magnetic>
              <Link
                href="/#contact"
                className="inline-flex items-center rounded-[8px] bg-ink px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-ink/85"
              >
                Let&apos;s talk
              </Link>
            </Magnetic>
            <button
              className="hidden w-7 h-5 flex-col justify-center gap-[6px] bg-transparent border-0 cursor-pointer max-[809px]:flex"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <span
                className={`block h-[2px] bg-ink transition-transform ${
                  open ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] bg-ink transition-transform ${
                  open ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-40 bg-bg flex flex-col px-[var(--pad-inner)] pt-24 pb-8 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-surface py-5 text-3xl font-semibold tracking-tight transition-opacity hover:opacity-70"
            >
              {link.label}
              <span aria-hidden className="text-2xl text-muted">
                →
              </span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-6">
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-[8px] bg-ink px-4 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-ink/85"
          >
            Let&apos;s talk
          </Link>
          <ul className="flex justify-around border-t border-surface pt-6">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="text-[15px] font-semibold text-muted transition-opacity hover:opacity-70"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
