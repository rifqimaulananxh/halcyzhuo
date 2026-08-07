/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Cta } from "@/components/Cta";
import { Reveal } from "@/components/Reveal";
import { SolidBtn } from "@/components/UI";
import { TextReveal } from "@/components/TextReveal";
import { ValuesAccordion, type ValueItem } from "@/components/ValuesAccordion";
import {
  StudioExperience,
  type StudioChapter,
} from "@/components/StudioExperience";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About halcyzhuo: product engineering for teams moving beyond the MVP. How we work, what we value, and where we've shipped.",
  alternates: { canonical: "/about" },
};

const values: readonly ValueItem[] = [
  {
    num: "01",
    title: "Clarity over noise",
    desc: "We reduce the problem to the decisions that matter, then make the system legible enough for the whole team to move with it.",
  },
  {
    num: "02",
    title: "Performance with intent",
    desc: "Speed is part of the product. We make deliberate tradeoffs so interfaces feel immediate and infrastructure stays affordable to operate.",
  },
  {
    num: "03",
    title: "Systems that hand over",
    desc: "The work should remain useful after launch. Typed contracts, documentation, testing, and observability are part of the build, not an afterthought.",
  },
  {
    num: "04",
    title: "Built for what comes next",
    desc: "We design for the next release as carefully as the first: accessible, maintainable, and ready for the complexity after the demo.",
  },
];

const chapters: readonly StudioChapter[] = [
  {
    step: "2023 - now",
    title: "Independent studio",
    desc: "End-to-end client work across fintech, healthtech, and e-commerce: shaping architecture, leading the build, and keeping products healthy after launch.",
    image: "/hero/hero-1.avif",
    alt: "Abstract interface study",
  },
  {
    step: "2020 - 2023",
    title: "Senior full-stack engineer",
    desc: "Led a five-engineer team, improved performance, and built payment infrastructure handling millions of transactions.",
    image: "/hero/hero-3.avif",
    alt: "Abstract systems study",
  },
  {
    step: "2018 - 2020",
    title: "Full-stack developer",
    desc: "Worked across frontend, backend, and infrastructure, learning that fast shipping and clean architecture are not opposites.",
    image: "/hero/hero-5.avif",
    alt: "Abstract product study",
  },
];

export default function AboutPage() {
  return (
    <main id="main" className="page-main about-page">
      <section className="about-index-hero" data-section-skip>
        <div className="about-index-hero__top">
          <Reveal variant="mask">
            <span
              className="rv rv-label about-eyebrow"
              style={{ "--i": 0 } as CSSProperties}
            >
              About the studio
            </span>
          </Reveal>
          <Reveal variant="mask">
            <span
              className="rv rv-label about-index-hero__year"
              style={{ "--i": 1 } as CSSProperties}
            >
              Est. in Jakarta
            </span>
          </Reveal>
        </div>
        <div className="about-index-hero__title">
          <TextReveal as="h1" trigger="load">
            We build things
            <br />
            that hold up<span className="text-muted">.</span>
          </TextReveal>
        </div>
        <div className="about-index-hero__bottom">
          <span>Scroll to explore</span>
          <span>01 - the studio</span>
        </div>
      </section>

      <section className="about-feature" data-section-skip>
        <Reveal variant="fade">
          <div className="about-feature__image">
            <img
              src="/hero/hero-3.avif"
              alt="Abstract visual system created by halcyzhuo"
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>

      <section className="about-intro" data-section-skip>
        <div className="about-intro__top">
          <span className="about-eyebrow">01 - the studio</span>
          <span className="about-intro__year">Engineering that ships</span>
        </div>
        <div className="about-intro__grid">
          <Reveal variant="mask">
            <TextReveal as="h2" className="about-intro__heading">
              Product engineering for teams moving beyond the MVP.
            </TextReveal>
          </Reveal>
          <div className="about-intro__copy">
            <Reveal variant="mask">
              <p
                className="rv rv-desc"
                style={{ "--i": 0 } as CSSProperties}
              >
                We turn growing complexity into software teams can ship,
                operate, and hand over. Interfaces, APIs, and infrastructure
                for what comes next.
              </p>
            </Reveal>
            <Reveal variant="mask">
              <p
                className="rv rv-desc"
                style={{ "--i": 1 } as CSSProperties}
              >
                Direct and transparent: clear scope, honest estimates, and
                progress you can track from the first constraint to production.
              </p>
            </Reveal>
            <SolidBtn href={`mailto:${SITE.email}`}>
              get in touch
            </SolidBtn>
          </div>
        </div>
      </section>

      <section className="about-values" data-section-skip>
        <div className="about-values__heading">
          <span className="about-eyebrow">02 - what we believe</span>
          <TextReveal as="h2">
            Good systems make the next decision easier<span className="text-muted">.</span>
          </TextReveal>
        </div>
        <ValuesAccordion items={values} />
      </section>

      <StudioExperience chapters={chapters} />

      <Reveal variant="mask" className="page-cta-reveal">
        <Cta
          pillLabel="ready for the next version"
          title={
            <>
              Ready for the <span className="accent-word">next version</span>?
            </>
          }
          btnLabel="start a project"
        />
      </Reveal>
    </main>
  );
}
