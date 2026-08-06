"use client";

import { useState, type CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "Do you take on small projects?",
    a: "Yes. We take on MVPs, focused features, and well-scoped fixes. A small project still deserves a thoughtful approach.",
  },
  {
    q: "Can you work with an existing codebase?",
    a: "Yes. We start by reading the code and understanding the constraints, then improve it incrementally without putting development on hold.",
  },
  {
    q: "What's a typical project timeline?",
    a: "Most MVPs take 4–8 weeks, depending on scope. Retainer work runs monthly with weekly milestones and clear check-ins.",
  },
  {
    q: "What happens after I reach out?",
    a: "We'll book a 20-minute call to understand the goals and constraints. If it's a fit, you'll get a proposal with timeline and pricing within 2–3 days. If it isn't, we'll say so.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Every project includes two weeks of post-launch support. Ongoing monitoring, performance work, and new features are available on a monthly retainer.",
  },
];

export function FaqList() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Reveal variant="stagger" className="faq-list max-w-[1040px]">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            style={{ "--i": i } as CSSProperties}
            className="border-b border-surface overflow-hidden"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="w-full bg-transparent border-0 text-left font-sans text-[var(--fs-h4)] font-medium tracking-[-0.02em] leading-[1.4] text-ink py-[30px] px-0 cursor-pointer flex items-center justify-between gap-4 transition-all duration-300 group"
            >
              {item.q}
              <span
                className={`relative w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <i className="absolute left-0 top-1/2 w-full h-[2px] bg-accent -translate-y-1/2" />
                <i className="absolute top-0 left-1/2 h-full w-[2px] bg-accent -translate-x-1/2" />
              </span>
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              className="grid transition-[grid-template-rows] duration-300"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="text-muted text-[var(--fs-body)] leading-normal pb-7 max-w-[760px]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Reveal>
  );
}
