import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { WorksGrid } from "@/components/WorksGrid";
import { ApproachSteps } from "@/components/ApproachSteps";
import { TextBtn } from "@/components/UI";
import { Cta } from "@/components/Cta";
import { Hero } from "@/components/Hero";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { ServiceCard } from "@/components/ServiceCard";
import { posts } from "@/lib/posts";
import type { CSSProperties } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const stackGridRows = [
  [{ word: "fast", col: 1 }],
  [{ word: "reliable", col: 2 }],
  [{ word: "accessible", col: 3 }],
  [{ word: "scalable", col: 4 }],
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

const specRows = [
  {
    num: "01",
    title: "Frontend systems",
    desc: "Fast, accessible interfaces that stay clear under real traffic and everyday use.",
  },
  {
    num: "02",
    title: "Backend & APIs",
    desc: "Typed services, stable contracts, and data flows that stay predictable as usage grows.",
  },
  {
    num: "03",
    title: "Infrastructure & operations",
    desc: "Deployments, monitoring, and the operational layer that keeps products healthy after launch.",
  },
];

const approachSteps = [
  {
    step: "01 · discover",
      title: "Find the constraint",
      desc: "We align on the outcome, constraints, and smallest useful path before code starts.",
    tags: ["product thinking", "architecture", "roadmap"],
  },
  {
    step: "02 · build",
      title: "Build the next version",
      desc: "Typed code, real tests, and delivery from the start. Every decision stays easy to review, change, and hand over.",
    tags: ["typescript", "tests", "CI/CD"],
  },
  {
    step: "03 · ship",
      title: "Learn from production",
      desc: "We launch with observability, watch real behavior, and use it to decide what the product needs next.",
      tags: ["observability", "monitoring", "iteration"],
  },
];

export default function Home() {
  return (
    <div id="main">
      {/* HERO */}
      <Hero />

      {/* VALUE GRID */}
      <ExperienceGrid rows={stackGridRows} />

      {/* ABOUT */}
      <section
        id="about"
        className="about-section mx-auto grid w-full max-w-[var(--max-w)] grid-cols-3 gap-8 px-[var(--pad-inner)] max-[1024px]:grid-cols-1 max-[1024px]:pb-[56px] max-[809px]:px-0"
      >
        <div className="about-heading col-span-2 max-[1024px]:col-span-1 flex flex-col gap-6 place-self-start overflow-hidden">
          <Reveal variant="mask">
            <span
              className="rv rv-label block text-[56px] font-bold uppercase tracking-normal leading-[1.1] text-ink max-[999px]:text-[32px]"
              style={{ "--i": 0 } as CSSProperties}
            >
              About <span className="text-accent">·</span> the studio
            </span>
          </Reveal>
          <Reveal variant="mask">
            <p
              className="rv rv-desc text-muted text-[15px] leading-[1.4] max-w-[460px]"
              style={{ "--i": 1 } as CSSProperties}
            >
              We help product teams turn growing complexity into software they
              can ship, operate, and hand over. We build systems, not
              screenshots: interfaces, APIs, and infrastructure for the next
              stage of the product.
            </p>
          </Reveal>
        </div>
        <div className="about-cards col-span-1 border-l border-outline pl-[48px] pb-[200px] max-[1024px]:border-l-0 max-[1024px]:pl-0 max-[1024px]:pt-8 max-[1024px]:border-t max-[1024px]:border-surface max-[1024px]:pb-0">
          <Reveal variant="stagger">
            {specRows.map((row, i) => (
              <ServiceCard key={row.num} item={row} index={i} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* WORKS */}
      <section
        id="works"
        className="w-full bg-ink py-[clamp(80px,9vw,144px)] font-sans text-white max-[809px]:-mx-[var(--pad-inner)]"
      >
        <div className="mx-auto w-full max-w-[var(--max-w)] px-[var(--pad-inner)]">
          <Reveal variant="mask">
            <div className="mb-12 flex items-end justify-between gap-10 border-b border-white/20 pb-12 max-[809px]:mb-10 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-6">
              <div>
                <p
                  className="rv rv-label mb-5 text-[var(--fs-body-sm)] font-semibold uppercase tracking-[0.16em] text-white/55"
                  style={{ "--i": 0 } as CSSProperties}
                >
                  Work <span className="text-white/80">·</span> selected projects
                </p>
                <TextReveal
                  as="h2"
                  className="font-display text-[clamp(42px,5.5vw,96px)] font-bold leading-[0.95] tracking-[-0.07em]"
                >
                  Shipped, not
                  <br />
                  <span className="em-word">sketched</span>
                  <span className="text-white/45">.</span>
                </TextReveal>
              </div>
              <p
                className="rv rv-desc max-w-[360px] text-right text-[var(--fs-body)] leading-normal text-white/60 max-[809px]:text-left"
                style={{ "--i": 2 } as CSSProperties}
              >
                A few products, the constraints behind them, and what changed after launch.
              </p>
            </div>
          </Reveal>
          <WorksGrid />
        </div>
      </section>

      {/* APPROACH */}
      <section className="approach w-full">
        <div className="mx-auto w-full max-w-[var(--max-w)] px-[var(--pad-inner)] max-[809px]:px-0">
          <Reveal variant="mask">
            <div className="mb-12 flex items-end justify-between gap-10 border-b border-surface pb-[clamp(48px,7vw,96px)] max-[809px]:mb-10 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-6">
              <div>
                <span
                  className="rv rv-label mb-5 block text-[var(--fs-body-sm)] font-semibold uppercase tracking-[0.16em] text-muted"
                  style={{ "--i": 0 } as CSSProperties}
                >
                  Approach <span className="text-accent">·</span> how we work
                </span>
                <TextReveal
                  as="h2"
                  className="font-display max-w-[760px] text-[clamp(40px,4.5vw,78px)] font-bold leading-[0.98] tracking-[-0.07em]"
                >
                  From <span className="accent-word">problem</span> to product,
                  <br />
                  with a clear next step<span className="text-accent">.</span>
                </TextReveal>
              </div>
              <p
                className="rv rv-desc max-w-[420px] text-right text-[var(--fs-body)] leading-normal text-muted max-[809px]:text-left"
                style={{ "--i": 2 } as CSSProperties}
              >
                We define the constraint, build the smallest useful system, and
                learn from what ships.
              </p>
            </div>
          </Reveal>
          <ApproachSteps steps={approachSteps} />
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="w-full">
        <div className="mx-auto w-full max-w-[var(--max-w)] px-[var(--pad-inner)] max-[809px]:px-0">
          <div className="grid grid-cols-[minmax(0,420px)_1fr] gap-16 max-[1024px]:grid-cols-1 max-[1024px]:gap-8">
            <div className="self-start border-b border-surface pb-12 mb-12 max-[1024px]:border-b max-[809px]:pb-8 max-[809px]:mb-8 lg:sticky lg:top-28">
              <Reveal variant="mask">
                <span
                  className="rv rv-label mb-5 block text-[var(--fs-body-sm)] font-semibold uppercase tracking-[0.16em] text-muted"
                  style={{ "--i": 0 } as CSSProperties}
                >
                  Stack <span className="text-accent">·</span> tools in production
                </span>
              </Reveal>
              <TextReveal
                as="h2"
                className="font-display text-[clamp(40px,4.5vw,78px)] font-bold leading-[0.98] tracking-[-0.07em]"
              >
                The stack
                <br />
                behind the <span className="accent-word">work</span>
                <span className="text-accent">.</span>
              </TextReveal>
              <p className="rv rv-desc text-muted text-[var(--fs-body)] leading-normal max-w-[360px] mt-7">
                A focused stack chosen for speed, clarity, and the realities of production.
              </p>
            </div>
            <div>
              <Reveal variant="stagger-right">
                {stackRows.map((row, i) => (
                  <div
                    key={row.label}
                    style={{ "--i": i } as CSSProperties}
                    className="stack-row relative grid grid-cols-[220px_minmax(0,1fr)_56px] items-baseline gap-8 py-10 max-[1024px]:grid-cols-[120px_minmax(0,1fr)_48px] max-[1024px]:gap-6 max-[809px]:grid-cols-[1fr] max-[809px]:gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-[var(--fs-body-sm)] font-semibold tracking-[0.08em] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[var(--fs-body)] font-semibold uppercase tracking-[0.16em] text-muted">
                        {row.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                      {row.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className="font-display text-[clamp(20px,2vw,30px)] tracking-[-0.03em] text-muted transition-colors duration-200 hover:text-ink"
                        >
                          {tag}
                          {tagIndex < row.tags.length - 1 && (
                            <span className="ml-5 text-outline" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section id="journal" className="w-full">
        <div className="mx-auto w-full max-w-[var(--max-w)] px-[var(--pad-inner)] max-[809px]:px-0">
          <Reveal variant="mask">
            <div className="mb-12 flex items-end justify-between gap-10 border-b border-surface pb-12 max-[809px]:mb-10 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-6">
              <div>
                <p
                  className="rv rv-label mb-5 text-[var(--fs-body-sm)] font-semibold uppercase tracking-[0.16em] text-muted"
                  style={{ "--i": 0 } as CSSProperties}
                >
                  Journal <span className="text-accent">·</span> notes from the work
                </p>
                <TextReveal
                  as="h2"
                  className="font-display text-[clamp(40px,4.5vw,78px)] font-bold leading-[0.98] tracking-[-0.07em]"
                >
                  Journal<span className="text-accent">.</span>
                </TextReveal>
              </div>
              <div className="flex flex-col items-end gap-2 max-[809px]:items-start">
                <p
                  className="rv rv-desc max-w-[360px] text-right text-[var(--fs-body)] leading-normal text-muted max-[809px]:text-left"
                  style={{ "--i": 2 } as CSSProperties}
                >
                  Notes on engineering, performance, and product decisions,
                  written close to the work.
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
                className="group grid grid-cols-[12px_minmax(0,1fr)_auto] items-center gap-8 border-b border-surface py-10 transition-all duration-300 hover:pl-3 max-[1024px]:gap-6 max-[809px]:grid-cols-[8px_minmax(0,1fr)] max-[809px]:gap-4 max-[809px]:py-8"
              >
                <span className="h-2 w-2 self-center rounded-full bg-ink" aria-hidden="true" />
                <div className="min-w-0">
                  <span className="mb-3 block text-[var(--fs-label)] font-semibold uppercase tracking-[0.16em] text-muted">
                    {post.category}
                  </span>
                  <h3
                    className={`font-display font-medium leading-[1.08] tracking-[-0.045em] ${
                      i === 0
                        ? "text-[clamp(28px,3.2vw,50px)]"
                        : "text-[clamp(22px,2.2vw,34px)]"
                    }`}
                  >
                    {post.title}
                  </h3>
                  {i === 0 && (
                    <p className="mt-4 max-w-[620px] text-[var(--fs-body)] leading-normal text-muted">
                      {post.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-6 max-[809px]:col-start-2 max-[809px]:row-start-2 max-[809px]:mt-2">
                  <span className="whitespace-nowrap font-mono text-[var(--fs-body-sm)] text-muted">
                    {post.date} · {post.readTime}
                  </span>
                  <span className="text-[26px] transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </div>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <Reveal variant="mask" className="page-cta-reveal">
        <Cta />
      </Reveal>
    </div>
  );
}
