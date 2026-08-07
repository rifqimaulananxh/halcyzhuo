import type { CSSProperties, ReactNode } from "react";
import { SITE } from "@/lib/site";
import { SolidBtn } from "@/components/UI";
import { TextReveal } from "@/components/TextReveal";

export function Cta({
  pillLabel = "available for selected projects",
  title = (
    <>
      Have a product that needs its <span className="accent-word">next version</span>?
    </>
  ),
  sub = "Tell us what you're building, where it is getting stuck, and what needs to change. We'll come back with a clear take on scope, architecture, and next steps.",
  btnLabel = "start a conversation",
}: {
  pillLabel?: string;
  title?: ReactNode;
  sub?: string;
  btnLabel?: string;
}) {
  return (
    <section
      id="contact"
      data-section-skip
      className="cta-section w-full bg-ink text-white max-[809px]:-mx-[var(--pad-inner)]"
    >
      <div className="mx-auto grid w-full max-w-[var(--max-w)] grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] gap-16 px-[var(--pad-inner)] py-[clamp(80px,10vw,160px)] max-[1024px]:grid-cols-[minmax(0,1fr)_minmax(240px,0.8fr)] max-[809px]:grid-cols-1 max-[809px]:gap-10">
        <div>
          <span
            className="cta-section__label rv rv-label inline-flex items-center gap-2.5 text-[var(--fs-body-sm)] font-medium uppercase tracking-[0.16em] text-white/55"
            style={{ "--i": 0 } as CSSProperties}
          >
            <i className="h-[8px] w-[8px] rounded-full bg-online" />
            {pillLabel}
          </span>
          <TextReveal
            as="h2"
            className="font-display mt-6 max-w-[900px] text-[clamp(44px,5.5vw,96px)] font-bold leading-[0.94] tracking-[-0.08em]"
          >
            {title}
          </TextReveal>
        </div>
        <div className="flex flex-col items-start justify-end gap-7 max-[809px]:max-w-[520px]">
          <p
            className="cta-section__copy rv rv-desc max-w-[460px] text-[var(--fs-body)] leading-normal text-white/60"
            style={{ "--i": 2 } as CSSProperties}
          >
            {sub}
          </p>
          <div className="rv rv-cta" style={{ "--i": 3 } as CSSProperties}>
            <SolidBtn href={`mailto:${SITE.email}`} tone="light">
              {btnLabel}
            </SolidBtn>
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="cta-section__email rv rv-desc text-[var(--fs-body)] text-white/55 transition-opacity duration-200 hover:opacity-75"
            style={{ "--i": 4 } as CSSProperties}
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </section>
  );
}
