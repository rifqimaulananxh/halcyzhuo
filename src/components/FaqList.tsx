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
    a: "Yes. MVPs, single features, and focused bug-fixes — as long as the scope is clear, we'll take it. Sometimes small projects are the ones that matter most.",
  },
  {
    q: "Can you work with an existing codebase?",
    a: "Absolutely. We're used to stepping into existing codebases, reading the context first, and refactoring incrementally without stopping the development that's already underway.",
  },
  {
    q: "What's a typical project timeline?",
    a: "MVPs typically take 4–8 weeks depending on scope. Retainer partners run monthly with weekly milestones you can track at every check-in.",
  },
  {
    q: "What happens after I reach out?",
    a: "We'll book 20 minutes and talk through goals and constraints. If it's a fit, we'll send a proposal with timeline and pricing within 2–3 days. If it's not, we'll tell you straight.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Every project gets 2 weeks of post-launch support. For ongoing maintenance — monitoring, tuning, new features — a monthly retainer is available.",
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
              className="w-full bg-transparent border-0 text-left font-sans text-[clamp(19px,2.4vw,26px)] font-medium tracking-[-0.02em] text-ink py-[30px] px-0 cursor-pointer flex items-center justify-between gap-4 transition-all duration-300 group"
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
                <p className="text-muted text-[17px] leading-normal pb-7 max-w-[760px]">
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
