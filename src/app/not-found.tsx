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
    <div id="main" className="pt-40">
      <Reveal variant="mask">
        <div className="flex flex-col items-start gap-8 max-w-[900px]">
          <p
            className="rv rv-label text-[13px] font-semibold uppercase tracking-wider text-muted"
            style={{ "--i": 0 } as CSSProperties}
          >
            Error <span className="text-ink/30">·</span> 404
          </p>
          <TextReveal
            as="h1"
            trigger="load"
            className="text-[clamp(64px,12vw,160px)] font-semibold tracking-[-0.05em] leading-[0.92]"
          >
            Lost in the
            <br />
            stack<span className="text-muted">.</span>
          </TextReveal>
          <p
            className="rv rv-desc text-muted text-[17px] leading-normal max-w-[420px]"
            style={{ "--i": 3 } as CSSProperties}
          >
            Halaman yang kamu cari nggak ada — mungkin dihapus, atau URL-nya
            salah. Kayak bug yang udah di-fix, mari kembali ke jalan yang benar.
          </p>
          <div className="rv rv-cta" style={{ "--i": 4 } as CSSProperties}>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-ink text-white text-[15px] font-semibold uppercase tracking-[0.08em] px-8 py-[18px] transition-colors duration-200 hover:bg-ink/85"
            >
              ~/back-home
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
