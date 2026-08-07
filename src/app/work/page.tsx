import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { Cta } from "@/components/Cta";
import { BackLink } from "@/components/PageHero";
import { CursorHover } from "@/components/CursorHover";
import { getProjectCategoryLabel, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by halcyzhuo: case studies with real constraints and measurable outcomes.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div id="main" className="page-main">
      <header className="page-header">
        <BackLink href="/">Home</BackLink>
        <Reveal variant="mask">
          <div className="mt-10 flex items-end justify-between gap-10 border-b border-surface pb-12 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-6">
            <div>
              <p
                className="rv rv-label page-eyebrow"
                style={{ "--i": 0 } as CSSProperties}
              >
                Selected work <span className="text-accent">·</span> 2025–2026
              </p>
              <TextReveal
                as="h1"
                className="page-title"
              >
                Work<span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc page-lede max-w-[360px] text-right max-[809px]:text-left"
              style={{ "--i": 2 } as CSSProperties}
            >
              A few products, the constraints behind them, and what changed after launch.
            </p>
          </div>
        </Reveal>
      </header>

      <section>
        <Reveal variant="stagger">
          {projects.map((p, i) => (
            <CursorHover key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                style={{ "--i": i } as CSSProperties}
                className="group grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-8 border-b border-surface py-11 transition-all duration-300 hover:pl-3 max-[1024px]:grid-cols-[48px_minmax(0,1fr)_auto] max-[1024px]:gap-6 max-[809px]:grid-cols-[8px_minmax(0,1fr)] max-[809px]:gap-4"
              >
              <span className="text-[var(--fs-body-sm)] font-semibold tracking-wide text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[clamp(24px,2.6vw,42px)] font-medium leading-[1.08] tracking-[-0.055em]">
                  {p.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="text-[var(--fs-body-sm)] font-semibold uppercase tracking-[0.16em] text-muted">
                    {getProjectCategoryLabel(p.category)}
                  </span>
                  <span className="text-outline" aria-hidden="true">·</span>
                  <span className="text-[var(--fs-body-sm)] text-muted">{p.tagline}</span>
                  <span className="text-outline" aria-hidden="true">·</span>
                  <span className="font-mono text-[var(--fs-body-sm)] text-muted">{p.year}</span>
                </div>
              </div>
              <div className="flex items-center gap-5 max-[809px]:col-start-2 max-[809px]:row-start-2 max-[809px]:mt-3">
                <span className="whitespace-nowrap font-display text-[var(--fs-h4)] font-medium tracking-[-0.03em]">
                  {p.metric}
                </span>
                <span className="text-[30px] transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </div>
              </Link>
            </CursorHover>
          ))}
        </Reveal>
      </section>

      <Reveal variant="mask" className="page-cta-reveal">
        <Cta
          pillLabel="available for selected projects"
          title="Have a product to move forward?"
          sub="Tell us what you're building, what's getting in the way, and where it needs to go. We'll respond with a clear take on scope, architecture, and next steps."
          btnLabel="start a project"
        />
      </Reveal>
    </div>
  );
}
