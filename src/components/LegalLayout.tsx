import type { CSSProperties, ReactNode } from "react";
import { BackLink } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SITE } from "@/lib/site";

export function LegalLayout({
  label,
  title,
  intro,
  sections,
}: {
  label: string;
  title: ReactNode;
  intro: string;
  sections: { title: string; body: string[] }[];
}) {
  return (
    <div id="main" className="page-main">
      <header className="page-header">
        <BackLink href="/">Home</BackLink>
        <Reveal variant="mask">
          <div className="mt-10 border-b border-surface pb-12">
            <p
              className="rv rv-label page-eyebrow"
              style={{ "--i": 0 } as CSSProperties}
            >
              {label}
            </p>
            <TextReveal
              as="h1"
              className="page-title"
            >
              {title}
            </TextReveal>
            <p
              className="rv rv-desc page-lede mt-8 max-w-[560px]"
              style={{ "--i": 2 } as CSSProperties}
            >
              {intro}
            </p>
          </div>
        </Reveal>
      </header>

      <section>
        <Reveal variant="stagger">
          {sections.map((s, i) => (
            <div
              key={s.title}
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[180px_1fr] gap-12 py-[52px] border-b border-surface max-[1024px]:grid-cols-[130px_1fr] max-[1024px]:gap-8 max-[809px]:grid-cols-1 max-[809px]:gap-4"
            >
              <span className="text-[var(--fs-body-sm)] font-semibold uppercase tracking-wide text-muted pt-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="max-w-[760px]">
                <h2 className="font-display mb-4 text-[clamp(24px,2.3vw,36px)] font-semibold leading-[1.08] tracking-[-0.045em]">
                  {s.title}
                </h2>
                {s.body.map((p, j) => (
                  <p
                    key={j}
                    className="text-muted text-[var(--fs-body)] leading-normal mb-3 last:mb-0"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
        <p className="text-muted text-[var(--fs-body-sm)] mt-10">
          Questions?{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="underline underline-offset-4 decoration-1 transition-colors hover:text-ink"
          >
            {SITE.email}
          </a>
        </p>
      </section>
    </div>
  );
}
