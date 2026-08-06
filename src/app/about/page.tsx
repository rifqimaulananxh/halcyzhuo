import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { Cta } from "@/components/Cta";
import { BackLink } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "About halcyzhuo — an engineering studio that ships. How we work, what we value, and where we've been.",
  alternates: { canonical: "/about" },
};

const rows = [
  {
    num: "01",
    title: "Who we are",
    desc: "An engineering studio focused on TypeScript, React, Node.js, and architecture built to last. Experience taking products from idea to production for a range of clients.",
  },
  {
    num: "02",
    title: "How we work",
    desc: "Transparent and direct. Clear scope, honest estimates, and check-ins you can track. Good communication matters as much as good code.",
  },
  {
    num: "03",
    title: "What we value",
    desc: "Measurable performance, accessibility as a baseline, and code that's easy to hand over. Products built to last, not built to demo.",
  },
];

const timeline = [
  {
    step: "2023 — now",
    title: "Independent studio",
    desc: "Client projects end-to-end: fintech, healthtech, and e-commerce. Designing architecture, leading the build, and keeping products alive after launch.",
  },
  {
    step: "2020 — 2023",
    title: "Senior full-stack · fintech",
    desc: "Leading a five-engineer team, improving performance, and building payment infrastructure that processes millions of transactions.",
  },
  {
    step: "2018 — 2020",
    title: "Full-stack developer · startup",
    desc: "From frontend to backend to infra — learning that fast shipping and clean architecture aren't two separate things.",
  },
];

export default function AboutPage() {
  return (
    <div id="main">
      <header className="pt-32 pb-12 max-[809px]:pt-24">
        <BackLink href="/">Home</BackLink>
        <Reveal variant="mask">
          <div className="mt-10 flex items-end justify-between gap-10 border-b border-surface pb-12 max-[809px]:flex-col max-[809px]:items-start">
            <div>
              <p
                className="rv rv-label mb-4 text-[var(--fs-label)] font-semibold uppercase tracking-[0.08em] text-muted"
                style={{ "--i": 0 } as CSSProperties}
              >
                About <span className="text-accent">·</span> the studio
              </p>
              <TextReveal
                as="h1"
                className="text-[var(--fs-title)] font-bold tracking-[-0.05em] leading-[1.1]"
              >
                About<span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc text-[var(--fs-body)] text-muted leading-normal max-w-[420px]"
              style={{ "--i": 2 } as CSSProperties}
            >
              Product engineering for teams moving beyond the MVP. Based in
              Jakarta, working remotely.
            </p>          </div>
        </Reveal>
      </header>

      <section>
        <Reveal variant="stagger">
          {rows.map((row, i) => (
            <div
              key={row.num}
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[120px_1fr_1fr] gap-8 items-baseline py-11 border-b border-surface transition-all duration-300 hover:pl-3 max-[1024px]:grid-cols-[100px_1fr] max-[809px]:grid-cols-1 max-[809px]:gap-3"
            >
              <span className="text-[var(--fs-body-sm)] font-semibold text-muted tracking-wide">
                {row.num}
              </span>
              <h3 className="text-[var(--fs-h2)] font-semibold tracking-[-0.04em] leading-[1.2]">
                {row.title}
              </h3>
              <p className="text-muted text-[var(--fs-body)] leading-normal max-w-[460px] max-[1024px]:col-start-2 max-[809px]:col-start-1">
                {row.desc}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <section>
        <Reveal variant="mask">
          <div className="flex items-end justify-between gap-10 border-b border-surface pb-12 mb-12 max-[809px]:flex-col max-[809px]:items-start">
            <div>
              <p
                className="rv rv-label mb-4 text-[var(--fs-label)] font-semibold uppercase tracking-[0.08em] text-muted"
                style={{ "--i": 0 } as CSSProperties}
              >
                Experience · timeline
              </p>
              <TextReveal
                as="h2"
                className="text-[var(--fs-title)] font-bold tracking-[-0.05em] leading-[1.1]"
              >
                Where we&apos;ve shipped<span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc text-[var(--fs-body)] text-muted leading-normal max-w-[420px]"
              style={{ "--i": 2 } as CSSProperties}
            >
              A track record of taking products from idea to production — from
              startups to an engineering studio.
            </p>
          </div>
        </Reveal>
        <Reveal variant="stagger">
          {timeline.map((item, i) => (
            <div
              key={item.title}
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[140px_1fr] gap-12 py-[52px] border-b border-surface transition-all duration-300 hover:pl-3 max-[1024px]:grid-cols-[110px_1fr] max-[1024px]:gap-8 max-[809px]:grid-cols-1 max-[809px]:gap-4"
            >
              <span className="text-[var(--fs-body-sm)] font-semibold uppercase tracking-wide text-muted pt-2">
                {item.step}
              </span>
              <div className="max-w-[720px]">
                <h3 className="text-[var(--fs-h2)] mb-[18px] tracking-[-0.04em] leading-[1.2]">
                  {item.title}
                </h3>
                <p className="text-muted text-[var(--fs-body)] leading-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <Reveal variant="mask">
      <Cta
          pillLabel="ready to build"
          title={
            <>
              Tell us what you&apos;re <span className="accent-word">building</span>.
            </>
          }
          btnLabel="start a project"
        />
      </Reveal>
    </div>
  );
}
