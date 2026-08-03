import Link from "next/link";
import type { CSSProperties } from "react";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";

const gridColumns = [
  [
    { label: "Works", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
  ],
  [
    { label: "Stack", href: "/#stack" },
    { label: "Contact", href: "/#contact" },
  ],
  [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
  ],
  [
    { label: SITE.email, href: `mailto:${SITE.email}` },
    { label: "Jakarta, Indonesia · Remote", href: "#" },
  ],
];

const bottomLinks = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
];

const connectLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
  { label: "GitHub", href: "https://github.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-surface">
      <div className="mx-auto max-w-[var(--max-w)] px-[var(--pad-inner)] pt-[clamp(48px,6vw,90px)] pb-10">
        <Reveal variant="mask">
          <div className="flex flex-col items-start gap-7 border-b border-surface pb-[clamp(56px,8vw,120px)]">
            <span
              className="rv rv-label text-[13px] font-semibold uppercase tracking-[0.16em] text-muted"
              style={{ "--i": 0 } as CSSProperties}
            >
              Have a project in mind?
            </span>
            <TextReveal
              as="h2"
              split="chars"
              y={160}
              className="text-[clamp(56px,10vw,150px)] font-bold tracking-[-0.05em] leading-[0.9]"
            >
              Let&apos;s work
              <br />
              <span className="accent-word">together</span>
              <span className="text-accent">.</span>
            </TextReveal>
            <div className="rv rv-cta" style={{ "--i": 3 } as CSSProperties}>
              <a
                href={`mailto:${SITE.email}`}
                className="group inline-flex items-center gap-4 text-[clamp(22px,3vw,34px)] font-semibold tracking-[-0.02em]"
              >
                <span className="underline underline-offset-8 decoration-1 group-hover:decoration-2 transition-all duration-300">
                  {SITE.email}
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </a>
            </div>
          </div>
        </Reveal>
        <div className="footer__top">
          <p className="footer__logo">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              halcyzhuo<span className="text-muted">.</span>
            </Link>
          </p>
          <div className="footer__grid">
            {gridColumns.map((column, i) => (
              <ul key={i} className="footer__menu">
                {column.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
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
          <ul className="footer__nav">
            <strong className="font-semibold text-muted">Connect:</strong>
            {connectLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="footer__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
