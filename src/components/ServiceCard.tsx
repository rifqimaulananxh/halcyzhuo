import type { CSSProperties } from "react";

export interface ServiceItem {
  num: string;
  title: string;
  desc: string;
}

export function ServiceCard({
  item,
  index,
}: {
  item: ServiceItem;
  index: number;
}) {
  return (
    <div
      className="about-card group flex items-center gap-6 py-0.5 cursor-pointer"
      style={{ "--i": index } as CSSProperties}
    >
      <div className="about-card__icon flex-none relative w-10 h-10 flex items-center justify-center">
        <span className="about-card__circle absolute rounded-full bg-ink transition-all duration-300 ease-out" />
        <span className="about-card__plus-h absolute rounded-full bg-white transition-all duration-300 ease-out" />
        <span className="about-card__plus-v absolute rounded-full bg-white transition-all duration-300 ease-out rotate-90" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="block text-[var(--fs-label)] font-semibold uppercase tracking-[0.16em] text-ink mb-1 opacity-60">
          {item.num}
        </span>
        <h3 className="about-card__title text-[40px] font-medium leading-[1.3] tracking-normal transition-transform duration-300 group-hover:translate-x-1 max-[999px]:text-[24px]">
          {item.title}
        </h3>
        <p className="text-ink text-[15px] leading-[1.4] mt-1.5 max-w-[400px] opacity-70">
          {item.desc}
        </p>
      </div>
    </div>
  );
}
