import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { Cta } from "@/components/Cta";
import { BackLink } from "@/components/PageHero";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Field notes from halcyzhuo on engineering, performance, and product decisions.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
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
                Journal <span className="text-accent">·</span> field notes
              </p>
              <TextReveal
                as="h1"
                className="page-title"
              >
                Journal<span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc page-lede"
              style={{ "--i": 2 } as CSSProperties}
            >
              Notes on engineering, performance, and product decisions, written
              close to the work.
            </p>
          </div>
        </Reveal>
      </header>

      <section>
        <Reveal variant="stagger">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              style={{ "--i": i } as CSSProperties}
              className="group grid grid-cols-[12px_minmax(0,1fr)_auto] items-center gap-8 border-b border-surface py-10 transition-all duration-300 hover:pl-3 max-[1024px]:gap-6 max-[809px]:grid-cols-[8px_minmax(0,1fr)] max-[809px]:gap-4 max-[809px]:py-8"
            >
              <span className="h-2 w-2 self-center rounded-full bg-ink" aria-hidden="true" />
              <div>
                <span className="mb-2 block text-[var(--fs-body-sm)] font-semibold uppercase tracking-[0.16em] text-muted">
                  {post.category}
                </span>
                <h3 className="font-display text-[clamp(24px,2.4vw,38px)] font-medium leading-[1.08] tracking-[-0.045em]">
                  {post.title}
                </h3>
                <span className="mt-2 block text-[var(--fs-body)] text-muted">
                  {post.description}
                </span>
              </div>
              <div className="flex items-center gap-6 max-[809px]:col-start-2 max-[809px]:row-start-2 max-[809px]:mt-2">
                <span className="whitespace-nowrap font-mono text-[var(--fs-body-sm)] text-muted">
                  {post.date} · {post.readTime}
                </span>
                <span className="text-[26px] transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      <Reveal variant="mask" className="page-cta-reveal">
        <Cta
          pillLabel="field notes from the work"
          title="Ideas worth shipping."
          sub="Have a product decision to make? We can talk through the constraint, architecture, and next step."
        />
      </Reveal>
    </div>
  );
}
