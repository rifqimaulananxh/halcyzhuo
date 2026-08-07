import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { WorkProjectRail } from "@/components/WorkProjectRail";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by halcyzhuo: systems shaped by real constraints and measured outcomes.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main id="main" className="page-main work-page">
      <section className="work-index" data-section-skip>
        <div className="work-index__top">
          <Reveal variant="mask">
            <p
              className="rv rv-desc work-index__description"
              style={{ "--i": 0 } as CSSProperties}
            >
              A curated set of systems shaped by real constraints.
            </p>
          </Reveal>
          <Reveal variant="mask">
            <TextReveal
              as="h1"
              trigger="load"
              className="work-index__title"
            >
              Projects<span className="text-muted">.</span>
            </TextReveal>
          </Reveal>
        </div>

        <WorkProjectRail projects={projects} />

        <div className="work-index__bottom">
          <span>projects ({projects.length})</span>
          <span>2025-2026</span>
        </div>
      </section>
    </main>
  );
}
