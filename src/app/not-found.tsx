import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "404 — Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="page-main pt-40">
      <Reveal variant="mask">
        <div className="flex flex-col items-start gap-8 max-w-[900px]">
          <p
            className="rv rv-label text-[var(--fs-label)] font-semibold uppercase tracking-[0.16em] text-muted"
            style={{ "--i": 0 } as CSSProperties}
          >
            Error <span className="text-accent">·</span> 404
          </p>
          <TextReveal
            as="h1"
            trigger="load"
            className="text-[var(--fs-hero)] font-bold tracking-[-0.05em] leading-[1.1]"
          >
            Lost in the
            <br />
            stack<span className="text-muted">.</span>
          </TextReveal>
          <p
            className="rv rv-desc text-muted text-[var(--fs-body)] leading-normal max-w-[420px]"
            style={{ "--i": 3 } as CSSProperties}
          >
            The page you&apos;re looking for doesn&apos;t exist — maybe it was removed, or
            the URL is wrong. Like a bug that&apos;s already been fixed, let&apos;s head
            back to the right path.
          </p>
          <div className="rv rv-cta" style={{ "--i": 4 } as CSSProperties}>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-ink text-white text-[var(--fs-bold-sm)] font-semibold uppercase tracking-[0.08em] px-8 py-[18px] transition-colors duration-200 hover:bg-ink/85"
            >
              back home
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
