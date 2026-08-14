import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { BackLink } from "@/components/PageHero";
import { TextReveal } from "@/components/TextReveal";
import { posts, getPost } from "@/lib/posts";
import { SITE } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: new URL(`/journal/${post.slug}`, SITE.url).toString(),
      siteName: SITE.name,
      title: post.title,
      description: post.description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${post.title} — halcyzhuo`,
        },
      ],
    },
  };
}

export default async function JournalPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main id="main" className="page-main">
      <header className="page-header">
        <BackLink href="/journal">All articles</BackLink>
        <Reveal variant="mask">
          <div className="mt-10 flex items-end justify-between gap-10 border-b border-surface pb-12 max-[809px]:flex-col max-[809px]:items-start">
            <div>
              <p
                className="rv rv-label page-eyebrow"
                style={{ "--i": 0 } as CSSProperties}
              >
                {post.category} · {post.date}
              </p>
              <TextReveal
                as="h1"
                className="page-title"
              >
                {post.title}
                <span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc page-lede"
              style={{ "--i": 2 } as CSSProperties}
            >
              {post.description}
            </p>
          </div>
        </Reveal>
      </header>

      <article>
        <Reveal variant="fade">
          <header className="py-14 flex flex-col gap-6 max-w-[860px]">
            <div className="flex flex-wrap gap-5 text-[var(--fs-body)] text-muted">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <span>{post.category}</span>
            </div>
          </header>
        </Reveal>

        <Reveal variant="fade">
          <div className="max-w-[720px] pt-8 pb-6">
            {post.blocks.map((block, i) =>
              block.type === "p" ? (
                <p
                  key={i}
                  className="text-[var(--fs-body)] leading-normal text-muted mb-[22px]"
                >
                  {block.text}
                </p>
              ) : (
                <pre
                  key={i}
                  className="my-7 overflow-x-auto rounded-[var(--radius-md)] bg-surface p-6 font-mono text-[var(--fs-body-sm)] leading-[1.6] text-ink"
                >
                  <code>{block.code}</code>
                </pre>
              )
            )}
          </div>
        </Reveal>

        <div className="border-t border-surface py-14 max-w-[720px]">
          <Reveal variant="mask">
            <TextReveal as="h3" className="font-display mb-6 text-[clamp(28px,3vw,48px)] font-semibold leading-[1.05] tracking-[-0.055em]">
              Is the stack slowing the product down?
            </TextReveal>
            <div className="rv rv-cta" style={{ "--i": 1 } as CSSProperties}>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-ink text-white text-[var(--fs-bold-sm)] font-semibold uppercase tracking-[0.08em] px-8 py-[18px] transition-colors duration-200 hover:bg-ink/85"
              >
                start a conversation
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </article>
    </main>
  );
}
