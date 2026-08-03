import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { Parallax } from "@/components/Parallax";
import { WorksGrid } from "@/components/WorksGrid";
import { FaqList } from "@/components/FaqList";
import { TextBtn } from "@/components/UI";
import { Magnetic } from "@/components/Magnetic";
import { Cta } from "@/components/Cta";
import { posts } from "@/lib/posts";
import type { CSSProperties } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const marqueeItems = [
  "TypeScript",
  "Next.js",
  "React",
  "NestJS",
  "Prisma",
  "PostgreSQL",
  "Redis",
  "AWS",
  "Docker",
  "Tailwind",
];

const stackRows = [
  {
    label: "Frontend",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "TanStack Query"],
  },
  {
    label: "Backend",
    tags: ["NestJS", "TypeScript", "Prisma ORM", "REST API", "Swagger"],
  },
  {
    label: "Database",
    tags: ["PostgreSQL", "Redis", "Amazon S3"],
  },
  {
    label: "Authentication",
    tags: ["JWT", "Refresh Token", "OAuth 2.0", "Argon2id", "MFA"],
  },
  {
    label: "Infrastructure",
    tags: ["Docker", "ECS Fargate", "CloudFront", "RDS", "Route53", "AWS"],
  },
];

const aboutRows = [
  {
    num: "01",
    title: "End-to-end delivery",
    desc: "Frontend, backend, infra — one team, from mockup to deploy. One point of contact, zero miscommunication.",
  },
  {
    num: "02",
    title: "Performance is a feature",
    desc: 'Fast loads, resilient systems. Every deploy is measured — not just "feels fast".',
  },
  {
    num: "03",
    title: "Built to be maintained",
    desc: "Clean code, real tests, clear docs. Built to be handed over, not just to work.",
  },
];

const approachSteps = [
  {
    step: "01 · discover",
    title: "Understanding the problem",
    desc: "Scope, spike, architecture. No rush to write code — making sure we build the right thing first.",
    tags: ["product thinking", "architecture", "roadmap"],
  },
  {
    step: "02 · build",
    title: "Production-grade code",
    desc: "Clean TypeScript, real tests, CI/CD from day one. Code that can be reviewed and maintained.",
    tags: ["typescript", "tests", "CI/CD"],
  },
  {
    step: "03 · ship",
    title: "Launch, measure, iterate",
    desc: "Deploys with full observability. Tracked performance, real feedback, continuous improvement.",
    tags: ["observability", "monitoring", "iterations"],
  },
];

export default function Home() {
  return (
    <div id="main">
      {/* HERO */}
      <section className="hero flex flex-col gap-20 pt-40 max-[809px]:gap-14 max-[809px]:pt-24">
        <div
          className="hero-item hero-meta flex items-center justify-between gap-6 border-b border-surface pb-8 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-4"
          style={{ "--i": 0 } as CSSProperties}
        >
          <p className="text-[15px] font-semibold tracking-wide">
            <span className="text-muted">hi, we&apos;re</span> halcyzhuo
            <span className="text-muted"> — engineering studio</span>
          </p>
          <span className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.16em]">
            <i className="w-[8px] h-[8px] rounded-full bg-online animate-pulse" />
            available for Q3 · 2026
          </span>
        </div>
        <div className="flex items-start justify-between gap-8 max-[809px]:flex-col max-[809px]:items-start">
          <Parallax speed={0.05} clamp={0.1} className="max-w-full">
            <TextReveal
              as="h1"
              split="chars"
              trigger="load"
              y={160}
              delay={0.15}
              className="hero-title text-[clamp(72px,12vw,152px)] font-bold tracking-[-0.05em] leading-[0.92] max-w-[1200px]"
            >
              Build things
              <br />
              that <span className="accent-word">ship</span>
              <span className="text-accent">.</span>
            </TextReveal>
          </Parallax>
          <Magnetic>
            <a
              href="#contact"
              className="hero-item hero-cta inline-flex items-center gap-3 mt-4 text-[16px] font-semibold group"
              style={{ "--i": 2 } as CSSProperties}
            >
              <span className="underline underline-offset-8 decoration-1 group-hover:decoration-2">
                ~/start-a-project
              </span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </Magnetic>
        </div>
        <div
          className="hero-item hero-bottom flex items-start justify-between gap-8 max-[809px]:flex-col"
          style={{ "--i": 3 } as CSSProperties}
        >
          <p className="text-muted text-[19px] max-w-[560px] leading-normal">
            An engineering studio turning ideas into fast, reliable software.
            <br />
            <span>Not just code — products that actually ship.</span>
          </p>
          <span className="text-[15px] font-medium text-muted">
            Jakarta, Indonesia · Remote
          </span>
        </div>
      </section>

      {/* STACK MARQUEE */}
      <section className="marquee" aria-label="Tech stack">
        <div className="marquee-row">
          <div className="marquee-track marquee-track--fill">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} aria-hidden={i >= marqueeItems.length}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="marquee-row marquee-row--accent">
          <div className="marquee-track marquee-track--reverse">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} aria-hidden={i >= marqueeItems.length}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <Reveal variant="mask">
          <div className="flex flex-col gap-7 border-b border-surface pb-[clamp(56px,8vw,120px)] max-w-[1400px]">
            <span
              className="rv rv-label manifesto__label"
              style={{ "--i": 0 } as CSSProperties}
            >
              Manifesto <span className="text-accent">·</span> what we believe
            </span>
            <TextReveal
              as="h2"
              className="manifesto__text"
              trigger="scroll"
              start="top 85%"
            >
              We build software where engineering rigor meets{" "}
              <span className="manifesto__accent">product instinct</span>
              <span className="text-muted">.</span>
            </TextReveal>
            <p
              className="rv rv-desc text-muted text-[17px] leading-normal max-w-[480px]"
              style={{ "--i": 2 } as CSSProperties}
            >
              Typed end to end, measured in production, designed to be
              maintained — every project is a system, not a screenshot.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ABOUT */}
      <section id="about">
        <Reveal variant="mask">
          <div className="flex flex-col gap-7 border-b border-surface pb-[clamp(48px,7vw,104px)] mb-12">
            <span
              className="rv rv-label text-[13px] font-semibold uppercase tracking-[0.16em] text-muted"
              style={{ "--i": 0 } as CSSProperties}
            >
              About <span className="text-accent">·</span> the studio
            </span>
            <TextReveal
              as="h2"
              className="text-[clamp(56px,9vw,120px)] font-bold tracking-[-0.05em] leading-[0.94] max-w-[1100px]"
            >
              Code with <span className="accent-word">intent</span>
              <span className="text-accent">.</span>
            </TextReveal>
            <p
              className="rv rv-desc text-muted text-[19px] leading-normal max-w-[560px]"
              style={{ "--i": 2 } as CSSProperties}
            >
              We help founders and teams take products from an idea to production
              — with clean architecture, honest performance, and no fluff.
            </p>
          </div>
        </Reveal>
        <Reveal variant="stagger">
          {aboutRows.map((row, i) => (
            <div
              key={row.num}
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[120px_1fr_1fr] gap-8 items-baseline py-11 border-b border-surface transition-all duration-300 hover:pl-3 max-[1024px]:grid-cols-[100px_1fr] max-[809px]:grid-cols-1 max-[809px]:gap-3"
            >
              <span className="text-[15px] font-semibold text-accent tracking-wide">
                {row.num}
              </span>
              <h3 className="text-[clamp(26px,3.4vw,42px)] font-semibold tracking-[-0.04em] leading-tight">
                {row.title}
              </h3>
              <p className="text-muted text-[16px] leading-normal max-w-[460px] max-[1024px]:col-start-2 max-[809px]:col-start-1">
                {row.desc}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* WORKS */}
      <section id="works">
        <Reveal variant="mask">
          <div className="flex items-end justify-between gap-10 border-b border-surface pb-12 mb-12 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-6">
            <div>
              <p
                className="rv rv-label text-[13px] font-semibold uppercase tracking-[0.16em] text-muted mb-5"
                style={{ "--i": 0 } as CSSProperties}
              >
                Works <span className="text-accent">·</span> 2026
              </p>
              <TextReveal
                as="h2"
                className="text-[clamp(52px,7.5vw,88px)] font-bold tracking-[-0.05em] leading-none"
              >
                Shipped, not
                <br />
                <span className="em-word">sketched</span>
                <span className="text-accent">.</span>
              </TextReveal>
            </div>
            <div className="flex flex-col items-end gap-6 max-[809px]:items-start">
              <p
                className="rv rv-desc text-muted text-[17px] leading-normal max-w-[360px] text-right max-[809px]:text-left"
                style={{ "--i": 3 } as CSSProperties}
              >
                Case studies with measurable outcomes — not just screenshots.
              </p>
              <div className="rv rv-cta" style={{ "--i": 4 } as CSSProperties}>
                <TextBtn href="/work">view all work</TextBtn>
              </div>
            </div>
          </div>
        </Reveal>
        <WorksGrid />
      </section>

      {/* APPROACH */}
      <section className="approach">
        <Reveal variant="mask">
          <div className="flex flex-col items-center text-center gap-6 border-b border-surface pb-[clamp(48px,7vw,96px)] mb-12">
            <span
              className="rv rv-label text-[13px] font-semibold uppercase tracking-[0.16em] text-muted"
              style={{ "--i": 0 } as CSSProperties}
            >
              Approach <span className="text-accent">·</span> how we work
            </span>
            <TextReveal
              as="h2"
              className="text-[clamp(52px,7.5vw,88px)] font-bold tracking-[-0.05em] leading-none max-w-[820px]"
            >
              From <span className="accent-word">idea</span> to ship,
              <br />
              clearly<span className="text-accent">.</span>
            </TextReveal>
            <p
              className="rv rv-desc text-muted text-[17px] leading-normal max-w-[460px]"
              style={{ "--i": 2 } as CSSProperties}
            >
              Not a vague agency process — a working rhythm you can follow at
              every stage.
            </p>
          </div>
        </Reveal>
        <Reveal variant="stagger-left">
          {approachSteps.map((step, i) => (
            <div
              key={step.step}
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[140px_1fr] gap-12 py-[52px] border-b border-surface transition-all duration-300 hover:pl-3 max-[1024px]:grid-cols-[110px_1fr] max-[1024px]:gap-8 max-[809px]:grid-cols-1 max-[809px]:gap-4"
            >
              <span className="text-[15px] font-semibold uppercase tracking-wide text-accent pt-2">
                {step.step}
              </span>
              <div className="max-w-[720px]">
                <h3 className="text-[clamp(30px,4vw,52px)] mb-[18px] tracking-[-0.04em] leading-tight">
                  {step.title}
                </h3>
                <p className="text-muted text-[17px] leading-normal">
                  {step.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-outline rounded-[100px] px-4 py-[7px] text-[13px] text-muted transition-colors duration-200 hover:border-ink hover:text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* STACK */}
      <section id="stack">
        <div className="grid grid-cols-[minmax(0,420px)_1fr] gap-16 max-[1024px]:grid-cols-1 max-[1024px]:gap-8">
          <div className="self-start border-b border-surface pb-12 mb-12 max-[1024px]:border-b max-[809px]:pb-8 max-[809px]:mb-8 lg:sticky lg:top-28">
            <Reveal variant="mask">
              <span
                className="rv rv-label text-[13px] font-semibold uppercase tracking-[0.16em] text-muted mb-5 block"
                style={{ "--i": 0 } as CSSProperties}
              >
                Stack <span className="text-accent">·</span> production-proven
              </span>
            </Reveal>
            <TextReveal
              as="h2"
              className="text-[clamp(44px,5.5vw,72px)] font-bold tracking-[-0.05em] leading-[0.96]"
            >
              Tools we
              <br />
              actually <span className="accent-word">use</span>
              <span className="text-accent">.</span>
            </TextReveal>
            <p className="rv rv-desc text-muted text-[17px] leading-normal max-w-[360px] mt-7">
              No buzzword bingo — only what&apos;s been used in production.
            </p>
          </div>
          <div>
            <Reveal variant="stagger-right">
              {stackRows.map((row, i) => (
                <div
                  key={row.label}
                  style={{ "--i": i } as CSSProperties}
                  className="grid grid-cols-[220px_1fr] gap-8 items-baseline py-9 border-b border-surface transition-all duration-300 hover:pl-3 max-[1024px]:grid-cols-[100px_1fr] max-[809px]:grid-cols-1"
                >
                  <span className="text-[15px] font-semibold uppercase tracking-[0.16em] text-muted pt-1">
                    {row.label}
                  </span>
                  <div className="flex flex-wrap gap-[10px]">
                    {row.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-outline rounded-[100px] px-[18px] py-2 text-[15px] text-muted transition-colors duration-200 hover:border-ink hover:text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <Reveal variant="mask">
          <div className="border-b border-surface pb-12 mb-12">
            <p
              className="rv rv-label text-[13px] font-semibold uppercase tracking-[0.16em] text-muted mb-5"
              style={{ "--i": 0 } as CSSProperties}
            >
              FAQ <span className="text-accent">·</span> common questions
            </p>
            <TextReveal
              as="h2"
              className="text-[clamp(52px,7.5vw,88px)] font-bold tracking-[-0.05em] leading-none max-w-[760px]"
            >
              Questions <span className="accent-word">asked</span>
              <br />
              most often<span className="text-accent">.</span>
            </TextReveal>
          </div>
        </Reveal>
        <FaqList />
      </section>

      {/* JOURNAL */}
      <section id="journal">
        <Reveal variant="mask">
          <div className="flex items-end justify-between gap-10 border-b border-surface pb-12 mb-12 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-6">
            <div>
              <p
                className="rv rv-label text-[13px] font-semibold uppercase tracking-[0.16em] text-muted mb-5"
                style={{ "--i": 0 } as CSSProperties}
              >
                Journal <span className="text-accent">·</span> insights
              </p>
              <TextReveal
                as="h2"
                className="text-[clamp(52px,7.5vw,88px)] font-bold tracking-[-0.05em] leading-none"
              >
                Journal<span className="text-accent">.</span>
              </TextReveal>
            </div>
            <div className="flex flex-col items-end gap-2 max-[809px]:items-start">
              <p
                className="rv rv-desc text-muted text-[17px] leading-normal max-w-[360px] text-right max-[809px]:text-left"
                style={{ "--i": 2 } as CSSProperties}
              >
                Technical notes on engineering, performance, and product
                decisions.
              </p>
              <div className="rv rv-cta" style={{ "--i": 3 } as CSSProperties}>
                <TextBtn href="/journal">see all articles →</TextBtn>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal variant="stagger">
          {posts.map((post, i) => (
            <a
              key={post.slug}
              href={`/journal/${post.slug}`}
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[90px_1fr_auto_auto] gap-8 items-center py-10 border-b border-surface transition-all duration-300 hover:pl-3 group max-[1024px]:grid-cols-[70px_1fr_auto] max-[809px]:grid-cols-[1fr_auto] max-[809px]:gap-3"
            >
              <span className="text-[15px] font-semibold text-muted tracking-wide">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[clamp(24px,3.2vw,38px)] tracking-[-0.03em] leading-tight">
                {post.title}
              </h3>
              <span className="font-mono text-[14px] text-muted whitespace-nowrap max-[1024px]:col-start-2 max-[809px]:col-start-1">
                {post.date} · {post.readTime}
              </span>
              <span className="text-[26px] transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          ))}
        </Reveal>
      </section>

      {/* CTA */}
      <Reveal variant="mask">
        <Cta />
      </Reveal>
    </div>
  );
}
