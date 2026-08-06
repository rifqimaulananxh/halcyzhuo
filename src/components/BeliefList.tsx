"use client";

import { useState, type CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { useCursor } from "@/components/CustomCursor";

export interface Belief {
  title: string;
  desc: string;
}

export function BeliefList({ beliefs }: { beliefs: Belief[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <Reveal
      variant="stagger"
      className="grid grid-cols-2 gap-x-16 gap-y-[clamp(36px,5vw,64px)] max-w-[1200px] max-[809px]:grid-cols-1"
    >
      {beliefs.map((belief, i) => {
        const isOpen = open === i;
        return (
          <div
            key={belief.title}
            style={{ "--i": i + 6 } as CSSProperties}
            className={`border-t border-surface pt-[clamp(24px,3.5vw,40px)] pb-[clamp(8px,1.5vw,16px)] ${
              isOpen ? "is-open" : ""
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`belief-panel-${i}`}
              onMouseEnter={() => setCursor("project", isOpen ? "close" : "open")}
              onMouseLeave={resetCursor}
              className="belief-row group w-full bg-transparent border-0 cursor-pointer text-left flex items-baseline justify-between gap-6"
            >
              <span className="flex items-baseline gap-[1rem] min-w-0">
                <span className="belief-dot" aria-hidden="true" />
                <span className="belief-row__title">{belief.title}</span>
              </span>
              <span
                className={`belief-row__plus ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <i />
                <i />
              </span>
            </button>
            <div
              id={`belief-panel-${i}`}
              role="region"
              className="grid transition-[grid-template-rows] duration-300"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="text-muted text-[var(--fs-body)] leading-normal pb-[clamp(20px,3vw,32px)] pl-[1.625rem] max-w-[520px]">
                  {belief.desc}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Reveal>
  );
}
