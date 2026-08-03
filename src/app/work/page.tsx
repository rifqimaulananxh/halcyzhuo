import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { Cta } from "@/components/Cta";
import { BackLink } from "@/components/PageHero";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by halcyzhuo — case studies with real, measurable outcomes.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div id="main">
      <header className="pt-32 pb-12 max-[809px]:pt-24">
        <BackLink href="/">Home</BackLink>
        <Reveal variant="mask">
          <div className="mt-10 flex items-end justify-between gap-10 border-b border-surface pb-12 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-6">
            <div>
              <p
                className="rv rv-label text-[13px] font-semibold uppercase tracking-[0.16em] text-muted mb-5"
                style={{ "--i": 0 } as CSSProperties}
              >
                All projects <span className="text-accent">·</span> 2025–2026
              </p>
              <TextReveal
                as="h1"
                className="text-[clamp(56px,9vw,120px)] font-bold tracking-[-0.05em] leading-[0.95]"
              >
                Work<span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc text-muted text-[17px] leading-normal max-w-[360px] text-right max-[809px]:text-left"
              style={{ "--i": 2 } as CSSProperties}
            >
              Case studies with measurable outcomes — not just screenshots.
            </p>
          </div>
        </Reveal>
      </header>

      <section>
        <Reveal variant="stagger">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[90px_1fr_auto] gap-8 items-center py-11 border-b border-surface transition-all duration-300 hover:pl-3 group max-[1024px]:grid-cols-[70px_1fr] max-[809px]:grid-cols-[1fr_auto] max-[809px]:gap-3"
            >
              <span className="text-[15px] font-semibold text-muted tracking-wide">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[clamp(30px,4.4vw,56px)] tracking-[-0.04em] leading-none">
                  {p.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                  <span className="inline-block border border-outline text-[12px] font-semibold uppercase tracking-[0.16em] rounded-[100px] px-2.5 py-[3px]">
                    {p.category.replace("-", " ")}
                  </span>
                  <span className="text-[15px] text-muted">{p.tagline}</span>
                  <span className="font-mono text-[13px] text-muted">{p.year}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 max-[1024px]:col-start-2 max-[1024px]:flex-row max-[1024px]:items-center max-[809px]:col-start-1 max-[809px]:flex-row max-[809px]:items-center">
                <span className="inline-block bg-ink text-white text-[13px] font-semibold rounded px-3 py-1 whitespace-nowrap">
                  {p.metric}
                </span>
                <span className="text-[30px] transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      <Reveal variant="mask">
        <Cta
          pillLabel="open to new work"
          title="Like what you see?"
          sub="Tell us about your product — we'll give you an honest take on scope, architecture, and estimates."
          btnLabel="~/start-a-project"
        />
      </Reveal>
    </div>
  );
}
