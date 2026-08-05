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
    "Notes on engineering, performance, and product decisions by halcyzhuo.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
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
                Journal <span className="text-accent">·</span> insights
              </p>
              <TextReveal
                as="h1"
                className="text-[var(--fs-title)] font-bold tracking-[-0.05em] leading-[1.1]"
              >
                Journal<span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc text-[var(--fs-body)] text-muted leading-normal max-w-[420px]"
              style={{ "--i": 2 } as CSSProperties}
            >
              Technical notes on engineering, performance, and product decisions
              — written while building, not after.
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
              className="grid grid-cols-[90px_1fr_auto_auto] gap-8 items-center py-10 border-b border-surface transition-all duration-300 hover:pl-3 group max-[1024px]:grid-cols-[70px_1fr_auto] max-[809px]:grid-cols-[1fr_auto] max-[809px]:gap-3"
            >
              <span className="text-[var(--fs-body-sm)] font-semibold text-muted tracking-wide">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[var(--fs-h4)] tracking-[-0.03em] leading-[1.4]">
                  {post.title}
                </h3>
                <span className="block text-[var(--fs-body-sm)] text-muted mt-1.5">
                  {post.description}
                </span>
              </div>
              <span className="font-mono text-[var(--fs-body-sm)] text-muted whitespace-nowrap max-[1024px]:col-start-2 max-[809px]:col-start-1">
                {post.date} · {post.readTime}
              </span>
              <span className="text-[26px] transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          ))}
        </Reveal>
      </section>

      <Reveal variant="mask">
        <Cta
          pillLabel="writing about building"
          title="Ideas worth shipping."
          sub="Have a project that needs to ship? We're happy to talk through scope and architecture — free, no commitment."
        />
      </Reveal>
    </div>
  );
}
