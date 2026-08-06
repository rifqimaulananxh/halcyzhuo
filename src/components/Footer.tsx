import Link from "next/link";
import { SITE } from "@/lib/site";

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
        <div className="footer__top">
          <p className="footer__logo">
            <Link href="/" className="font-semibold tracking-tight">
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
