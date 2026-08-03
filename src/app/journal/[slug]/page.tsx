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
      url: `${SITE.url}/journal/${post.slug}`,
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
    <div id="main">
      <header className="pt-32 pb-12 max-[809px]:pt-24">
        <BackLink href="/journal">All articles</BackLink>
        <Reveal variant="mask">
          <div className="mt-10 flex items-end justify-between gap-10 border-b border-surface pb-12 max-[809px]:flex-col max-[809px]:items-start">
            <div>
              <p
                className="rv rv-label mb-4 text-[14px] font-semibold uppercase tracking-[0.08em] text-muted"
                style={{ "--i": 0 } as CSSProperties}
              >
                {post.category} · {post.date}
              </p>
              <TextReveal
                as="h1"
                className="text-[clamp(40px,6vw,88px)] font-bold tracking-[-0.05em] leading-[0.95]"
              >
                {post.title}
                <span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc text-[16px] text-muted leading-normal max-w-[420px]"
              style={{ "--i": 2 } as CSSProperties}
            >
              {post.description}
            </p>
          </div>
        </Reveal>
      </header>

      <article>
        <Reveal variant="mask">
          <header className="py-14 flex flex-col gap-6 max-w-[860px]">
            <div className="flex gap-5 text-[15px] text-muted">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <span>{post.category}</span>
            </div>
          </header>
        </Reveal>

        <Reveal variant="mask">
          <div className="max-w-[720px] pt-8 pb-6">
            {post.blocks.map((block, i) =>
              block.type === "p" ? (
                <p
                  key={i}
                  className="text-[18px] leading-[1.7] text-muted mb-[22px]"
                >
                  {block.text}
                </p>
              ) : (
                <pre
                  key={i}
                  className="bg-surface rounded-[var(--radius-md)] p-6 overflow-x-auto font-mono text-[14px] leading-[1.6] my-7 text-ink"
                >
                  <code>{block.code}</code>
                </pre>
              )
            )}
          </div>
        </Reveal>

        <div className="border-t border-surface py-14 max-w-[720px]">
          <Reveal variant="mask">
            <TextReveal as="h3" className="text-[clamp(30px,4vw,48px)] tracking-[-0.04em] mb-6">
              Got a stack that feels heavier than the product?
            </TextReveal>
            <div className="rv rv-cta" style={{ "--i": 1 } as CSSProperties}>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-ink text-white text-[15px] font-semibold uppercase tracking-[0.08em] px-8 py-[18px] transition-colors duration-200 hover:bg-ink/85"
              >
                ~/lets-talk
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </article>
    </div>
  );
}
