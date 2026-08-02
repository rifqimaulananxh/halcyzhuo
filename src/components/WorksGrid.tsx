"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { projects, type ProjectCategory } from "@/lib/projects";

const FILTERS: { key: "all" | ProjectCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web-app", label: "Web app" },
  { key: "landing", label: "Landing" },
  { key: "ecommerce", label: "E-commerce" },
];

const count = (key: "all" | ProjectCategory) =>
  key === "all"
    ? projects.length
    : projects.filter((p) => p.category === key).length;

export function WorksGrid() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");

  const visible = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <>
      <div
        className="filter-bar flex flex-wrap gap-3 mb-10"
        role="tablist"
        aria-label="Filter projects"
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-[100px] px-5 py-2 text-[14px] font-medium transition-colors duration-200 ${
              filter === f.key
                ? "bg-ink text-white"
                : "border border-outline text-ink hover:border-ink"
            }`}
          >
            {f.label}
            <span
              className={`ml-1.5 ${
                filter === f.key ? "text-white/60" : "text-muted"
              }`}
            >
              {count(f.key)}
            </span>
          </button>
        ))}
      </div>

      <Reveal
        variant="stagger"
        className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,420px),1fr))] gap-x-5 gap-y-[30px]"
      >
        {visible.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            style={{ "--i": i } as CSSProperties}
            className="group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-surface">
              <img
                src={p.cover}
                alt={`${p.title} — ${p.tagline}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-between p-6">
                <div className="translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
                  <small className="block text-white/70 text-[12px] font-semibold uppercase tracking-wider mb-1">
                    {p.category.replace("-", " ")}
                  </small>
                  <h3 className="text-white text-[clamp(20px,2.2vw,28px)] font-medium leading-tight">
                    {p.title}
                  </h3>
                </div>
                <span className="w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 pt-6">
              <h3 className="text-[clamp(18px,1.8vw,22px)] font-semibold tracking-[-0.02em] transition-opacity duration-200 group-hover:opacity-60">
                {p.title}
              </h3>
              <span className="text-[14px] font-medium text-muted whitespace-nowrap">
                {p.metric}
              </span>
            </div>
          </Link>
        ))}
      </Reveal>
    </>
  );
}
