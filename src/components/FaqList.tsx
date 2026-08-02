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
    a: "Yes. MVPs, single features, dan bug-fix yang terarah — selama scopenya jelas, gue ambil. Kadang project kecil justru yang paling berdampak.",
  },
  {
    q: "Can you work with an existing codebase?",
    a: "Absolutely. Gue terbiasa masuk ke codebase lama, baca dulu konteksnya, dan refactor bertahap tanpa menghentikan development yang lagi jalan.",
  },
  {
    q: "What's a typical project timeline?",
    a: "MVP biasanya 4–8 minggu tergantung scope. Retainer partner jalan bulanan dengan milestone mingguan yang bisa kamu pantau di tiap check-in.",
  },
  {
    q: "What happens after I reach out?",
    a: "Kita janjian 20 menit, bahas goals & constraint. Kalau cocok, gue kasih proposal + timeline + harga dalam 2–3 hari. Kalau nggak cocok, gue bilang terus terang.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Setiap project dapat 2 minggu post-launch support. Untuk perawatan lanjutan (monitoring, tuning, fitur baru), tersedia retainer bulanan.",
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
                <i className="absolute left-0 top-1/2 w-full h-[2px] bg-ink -translate-y-1/2" />
                <i className="absolute top-0 left-1/2 h-full w-[2px] bg-ink -translate-x-1/2" />
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
