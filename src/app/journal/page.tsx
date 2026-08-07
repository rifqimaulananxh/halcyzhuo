import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Field notes from halcyzhuo on engineering, performance, and product decisions made in production.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <main id="main" className="page-main journal-page">
      <section className="journal-index" data-section-skip>
        <div className="journal-index__top">
          <Reveal variant="mask">
            <p
              className="rv rv-desc journal-index__description"
              style={{ "--i": 0 } as CSSProperties}
            >
              Notes on engineering, performance, and product decisions, written
              close to the work.
            </p>
          </Reveal>
          <Reveal variant="mask">
            <TextReveal
              as="h1"
              trigger="load"
              className="journal-index__title"
            >
              Journal<span className="text-muted">.</span>
            </TextReveal>
          </Reveal>
        </div>

        <div className="journal-index__list">
          <Reveal variant="stagger">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                style={{ "--i": index } as CSSProperties}
                className="journal-index__item group"
              >
                <div className="journal-index__meta">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <div className="journal-index__content">
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                </div>
                <span className="journal-index__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </Reveal>
        </div>

        <div className="journal-index__bottom">
          <span>journal ({posts.length})</span>
          <span>field notes / 2026</span>
        </div>
      </section>
    </main>
  );
}
