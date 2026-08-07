/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";

export type StudioChapter = {
  step: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
};

export function StudioExperience({
  chapters,
}: {
  chapters: readonly StudioChapter[];
}) {
  return (
    <section className="about-experience">
      <div className="about-experience__top">
        <span className="about-eyebrow">03 - experience</span>
        <span className="about-experience__count">({String(chapters.length).padStart(2, "0")})</span>
      </div>
      <div className="about-experience__heading">
        <span className="about-eyebrow">The path behind the work</span>
        <h2>
          Close to the detail. Experienced enough to know which details
          matter<span className="text-muted">.</span>
        </h2>
      </div>
      <div className="about-experience__grid">
        {chapters.map((chapter, index) => (
          <article
            className="about-chapter"
            key={chapter.title}
            style={{ "--i": index } as CSSProperties}
          >
            <div className="about-chapter__image">
              <img src={chapter.image} alt={chapter.alt} loading="lazy" />
            </div>
            <div className="about-chapter__meta">
              <span>{chapter.step}</span>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>{chapter.title}</h3>
            <p>{chapter.desc}</p>
          </article>
        ))}
      </div>
      <div className="about-experience__bottom">
        <span>people behind the work</span>
        <span>Jakarta / remote</span>
      </div>
    </section>
  );
}
