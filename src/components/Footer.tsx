import Link from "next/link";
import { SITE } from "@/lib/site";

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
  return (
    <footer className="border-t border-surface">
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
    </footer>
  );
}
