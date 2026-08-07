"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";
import { useCursor } from "@/components/CustomCursor";
import { TextBtn } from "@/components/UI";
import { getProjectCategoryLabel, projects } from "@/lib/projects";

export function WorksGrid() {
  const { setCursor, resetCursor } = useCursor();
  const featured = projects.find((project) => project.slug === "pulse") ?? projects[0];

  if (!featured) return null;

  return (
    <div>
      <Reveal variant="fade" delay={80}>
        <Link
          href={`/work/${featured.slug}`}
          className="group grid grid-cols-[minmax(0,1.5fr)_minmax(280px,0.75fr)] overflow-hidden rounded-[var(--radius-md)] border border-white/15 bg-[#111111] font-sans text-white max-[1024px]:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)] max-[809px]:grid-cols-1"
          onMouseEnter={() => setCursor("project", "View Project")}
          onMouseLeave={resetCursor}
        >
          <div className="relative aspect-[16/10] min-h-[360px] overflow-hidden bg-surface max-[809px]:aspect-[16/10] max-[809px]:min-h-0">
            <Parallax speed={0.04} clamp={0.08} className="absolute inset-0">
              <img
                src={featured.cover}
                alt={`${featured.title} — ${featured.tagline}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.06]"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <span className="absolute left-6 top-6 text-[var(--fs-label)] font-semibold uppercase tracking-[0.16em] text-white/75">
              Featured project
            </span>
          </div>
          <div className="flex min-h-[360px] flex-col justify-between gap-10 p-8 max-[809px]:min-h-0 max-[809px]:gap-12 max-[576px]:p-6">
            <div>
              <div className="mb-12 flex items-center justify-between gap-4 text-[var(--fs-label)] font-semibold uppercase tracking-[0.16em] text-white/55 max-[809px]:mb-8">
                <span>01 / 06</span>
                <span>{featured.year}</span>
              </div>
              <span className="mb-4 block text-[var(--fs-label)] font-semibold uppercase tracking-[0.16em] text-white/55">
                {getProjectCategoryLabel(featured.category)}
              </span>
              <h3 className="font-display text-[clamp(40px,4.5vw,76px)] font-semibold leading-[0.95] tracking-[-0.06em]">
                {featured.title}
              </h3>
              <p className="mt-5 max-w-[360px] text-[var(--fs-body)] leading-normal text-white/65">
                {featured.tagline}
              </p>
            </div>
            <div className="flex items-end justify-between gap-5 border-t border-white/20 pt-5">
              <div>
                <span className="block text-[var(--fs-label)] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Outcome
                </span>
                <strong className="mt-1 block text-[var(--fs-h4)] font-medium tracking-[-0.03em]">
                  {featured.metric}
                </strong>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 ease-out group-hover:rotate-[45deg] group-hover:scale-110">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </Reveal>
      <Reveal variant="fade" delay={180}>
        <div className="flex justify-center">
          <TextBtn
            href="/work"
            className="font-display text-[clamp(20px,2vw,30px)] tracking-[-0.03em]"
          >
            view all work
          </TextBtn>
        </div>
      </Reveal>
    </div>
  );
}
