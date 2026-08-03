import type { CSSProperties, ReactNode } from "react";
import { SITE } from "@/lib/site";
import { SolidBtn } from "@/components/UI";
import { TextReveal } from "@/components/TextReveal";

export function Cta({
  pillLabel = "free 20-min intro call",
  title = (
    <>
      Tell us what you&apos;re <span className="accent-word">building</span>.
    </>
  ),
  sub = "Tell us about your product — we'll give you an honest take on scope, architecture, and estimates. No drama, no jargon.",
  btnLabel = "~/lets-talk",
}: {
  pillLabel?: string;
  title?: ReactNode;
  sub?: string;
  btnLabel?: string;
}) {
  return (
    <section
      id="contact"
      className="flex flex-col items-center text-center gap-6 border border-surface rounded-[var(--radius-md)] px-6 py-[88px]"
    >
      <span
        className="rv rv-label inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.16em]"
        style={{ "--i": 0 } as CSSProperties}
      >
        <i className="w-[8px] h-[8px] rounded-full bg-online animate-pulse" />
        {pillLabel}
      </span>
      <TextReveal
        as="h2"
        className="text-[clamp(52px,7.5vw,88px)] font-bold tracking-[-0.05em] leading-none max-w-[700px]"
      >
        {title}
      </TextReveal>
      <p
        className="rv rv-desc text-muted text-xl max-w-[560px] leading-normal"
        style={{ "--i": 2 } as CSSProperties}
      >
        {sub}
      </p>
      <div className="rv rv-cta" style={{ "--i": 3 } as CSSProperties}>
        <SolidBtn href={`mailto:${SITE.email}`}>{btnLabel}</SolidBtn>
      </div>
      <a
        href={`mailto:${SITE.email}`}
        className="rv rv-desc text-[15px] text-muted transition-opacity duration-200 hover:opacity-75"
        style={{ "--i": 4 } as CSSProperties}
      >
        {SITE.email}
      </a>
    </section>
  );
}
