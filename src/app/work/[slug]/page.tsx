import type { Metadata } from "next";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { BackLink } from "@/components/PageHero";
import { TextReveal } from "@/components/TextReveal";
import { projects, getProject, getNextProject } from "@/lib/projects";
import { SITE } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: new URL(`/work/${project.slug}`, SITE.url).toString(),
      siteName: SITE.name,
      title: project.title,
      description: project.tagline,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${project.title} — halcyzhuo`,
        },
      ],
    },
  };
}

export default async function WorkDetail({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  const meta = [
    { dt: "Client", dd: project.client },
    { dt: "Role", dd: project.role },
    { dt: "Stack", dd: project.stack },
    { dt: "Year", dd: project.year },
  ];

  return (
    <main id="main" className="page-main">
      <header className="page-header">
        <BackLink href="/work">All work</BackLink>
        <Reveal variant="mask">
          <div className="mt-10 flex items-end justify-between gap-10 border-b border-surface pb-12 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-6">
            <div>
              <p
                className="rv rv-label page-eyebrow"
                style={{ "--i": 0 } as CSSProperties}
              >
                Case study <span className="text-accent">·</span> {project.year}
              </p>
              <TextReveal
                as="h1"
                className="page-title"
              >
                {project.title}
                <span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc page-lede max-w-[360px] text-right max-[809px]:text-left"
              style={{ "--i": 2 } as CSSProperties}
            >
              {project.tagline}
            </p>
          </div>
        </Reveal>
      </header>

      <article>
        <Reveal variant="mask">
          <header className="grid grid-cols-[1fr_260px] gap-12 items-end border-y border-surface py-14 max-[1024px]:grid-cols-1 max-[1024px]:items-start">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-md)] bg-surface">
              <Parallax speed={0.06} clamp={0.15} className="absolute inset-0">
                <img
                  src={project.cover}
                  alt={`${project.title} — ${project.tagline}`}
                  className="absolute left-0 top-[-15%] h-[130%] w-full object-cover"
                />
              </Parallax>
            </div>
            <dl className="flex flex-col gap-[14px]">
              {meta.map((m) => (
                <div key={m.dt} className="flex flex-col gap-[6px] border-b border-surface pb-[14px] last:border-b-0 max-[1024px]:flex-1 max-[1024px]:basis-[200px]">
                  <dt className="text-[var(--fs-body-sm)] font-semibold uppercase tracking-[0.16em] text-muted">
                    {m.dt}
                  </dt>
                  <dd className="text-[var(--fs-body)] font-medium">{m.dd}</dd>
                </div>
              ))}
            </dl>
          </header>
        </Reveal>

        <div className="flex flex-col gap-16 py-[72px]">
          {project.sections.map((s, si) => (
            <Reveal key={s.heading}>
              <section data-section-skip>
                <h2 className="font-display mb-5 text-[clamp(28px,3vw,48px)] font-semibold leading-[1.05] tracking-[-0.055em]">
                  <span className="text-muted text-[0.5em] align-[0.3em] mr-[14px]">
                    {String(si + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h2>
                {s.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-muted text-[var(--fs-body)] leading-normal mb-[18px]"
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}
              </section>
            </Reveal>
          ))}
        </div>

        {project.quote && project.quoteBy && (
          <Reveal variant="fade">
            <figure className="border-y border-surface py-[clamp(56px,7vw,96px)]">
              <span
                className="block text-accent font-display text-[var(--fs-hero)] leading-[0.5] select-none mb-8"
                aria-hidden="true"
              >
                “
              </span>
              <blockquote className="font-display text-[var(--fs-h4)] font-medium tracking-[-0.035em] leading-[1.4] max-w-[900px]">
                {project.quote}
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <span className="w-[44px] h-[44px] rounded-full bg-ink text-white flex items-center justify-center text-[var(--fs-bold-sm)] font-semibold flex-shrink-0">
                  {project.quoteBy.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <strong className="text-[var(--fs-body)] font-semibold block">
                    {project.quoteBy.name}
                  </strong>
                  <span className="text-[var(--fs-body-sm)] text-muted">
                    {project.quoteBy.role}
                  </span>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        )}

        <Reveal variant="fade">
          <Link
            href={`/work/${next.slug}`}
            className="block border-t border-surface py-16 group"
          >
            <span className="mb-4 block text-[var(--fs-body-sm)] font-semibold uppercase tracking-[0.16em] text-muted">
              Next project
            </span>
            <h3 className="inline-flex items-center gap-5 font-display text-[clamp(40px,4.5vw,78px)] font-medium leading-[0.98] tracking-[-0.07em] transition-all duration-300 group-hover:pl-3">
              {next.title}
              <span className="text-[30px] transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </h3>
          </Link>
        </Reveal>
      </article>
    </main>
  );
}
