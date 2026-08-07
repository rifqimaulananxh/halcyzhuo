import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { Cta } from "@/components/Cta";
import { BackLink } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "About halcyzhuo: an engineering studio that ships. How we work, what we value, and where we've been.",
  alternates: { canonical: "/about" },
};

const rows = [
  {
    num: "01",
    title: "Who we are",
    desc: "We build TypeScript, React, and Node.js products for teams moving from an early prototype into dependable production.",
  },
  {
    num: "02",
    title: "How we work",
    desc: "Direct and transparent: clear scope, honest estimates, and progress you can track. Good communication matters as much as good code.",
  },
  {
    num: "03",
    title: "What we value",
    desc: "Performance, accessibility, and code that is easy to operate and hand over. We build for the next release, not just the demo.",
  },
];

const timeline = [
  {
    step: "2023 — now",
    title: "Independent studio",
    desc: "End-to-end client work across fintech, healthtech, and e-commerce: shaping architecture, leading the build, and keeping products healthy after launch.",
  },
  {
    step: "2020 — 2023",
    title: "Senior full-stack engineer · fintech",
    desc: "Led a five-engineer team, improved performance, and built payment infrastructure handling millions of transactions.",
  },
  {
    step: "2018 — 2020",
    title: "Full-stack developer · startup",
    desc: "Worked across frontend, backend, and infrastructure, learning that fast shipping and clean architecture are not opposites.",
  },
];

export default function AboutPage() {
  return (
    <div id="main" className="page-main">
      <header className="page-header">
        <BackLink href="/">Home</BackLink>
        <Reveal variant="mask">
          <div className="mt-10 flex items-end justify-between gap-10 border-b border-surface pb-12 max-[809px]:flex-col max-[809px]:items-start">
            <div>
              <p
                className="rv rv-label page-eyebrow"
                style={{ "--i": 0 } as CSSProperties}
              >
                About <span className="text-accent">·</span> the studio
              </p>
              <TextReveal
                as="h1"
                className="page-title"
              >
                About<span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc page-lede"
              style={{ "--i": 2 } as CSSProperties}
            >
                Product engineering for teams whose MVP has become a real
                product. Based in Jakarta, working remotely.
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
                  className="rv rv-label page-eyebrow"
                style={{ "--i": 0 } as CSSProperties}
              >
                Experience · timeline
              </p>
              <TextReveal
                as="h2"
                className="page-title"
              >
                Where we&apos;ve shipped<span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc page-lede"
              style={{ "--i": 2 } as CSSProperties}
            >
              A track record of taking products from idea to production, from
              startup teams to an independent studio.
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

      <Reveal variant="mask" className="page-cta-reveal">
        <Cta
          pillLabel="ready for the next version"
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
