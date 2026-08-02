"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  quote: string;
  initials: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Dikirim dua minggu lebih cepat dari jadwal. Kode yang rapi, review yang jujur, dan hasil performa yang terukur — bukan cuma janji.",
    initials: "RS",
    name: "Rina Setiawan",
    role: "Founder · Nusantara Labs",
  },
  {
    quote:
      "The LCP dropped from 2.1s to 0.4s. Our signups went up 38% the next month. Nobody asks about our tech stack anymore — it just works.",
    initials: "DK",
    name: "Daniel Kusuma",
    role: "CTO · Finread",
  },
  {
    quote:
      "Halcyzhuo translated product chaos into a roadmap we could ship. Testing infrastructure, monitoring, docs — semua beres dari hari pertama.",
    initials: "AM",
    name: "Andi Malik",
    role: "Product Lead · Dokterku",
  },
  {
    quote:
      "We scaled from 2k to 60k users without a single re-architecture. That planning in the discover phase paid for itself ten times over.",
    initials: "SP",
    name: "Sari Puspita",
    role: "Founder · Aruna Pay",
  },
  {
    quote:
      "Jarang ketemu engineer yang peduli sama accessibility. Halcyzhuo shipped WCAG AA out of the box — our audit passed on the first try.",
    initials: "BF",
    name: "Bagus Firmansyah",
    role: "Founder · Saham Rakyat",
  },
];

const Stars = () => (
  <div className="flex gap-[3px] text-ink mb-6">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3 6.5 7 .7-5.3 4.7 1.5 6.9L12 17.3 5.8 20.8l1.5-6.9L2 9.2l7-.7z" />
      </svg>
    ))}
  </div>
);

export function TestimonialBig() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  const go = (dir: number) => {
    setVisible(false);
    setTimeout(() => {
      setIdx((i) => (i + dir + testimonials.length) % testimonials.length);
      setVisible(true);
    }, 200);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[idx];

  return (
    <div
      className="pt-[72px] pb-10 max-w-[1100px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pl-[140px] max-[1024px]:pl-[60px] max-[809px]:pl-0">
        <Stars />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-7 items-start max-[809px]:grid-cols-1 max-[809px]:gap-2">
        <span className="text-[140px] leading-[0.6] font-semibold tracking-[-0.05em] text-surface select-none max-[809px]:text-[100px]">
          “
        </span>
        <blockquote
          className={`text-[clamp(30px,4.6vw,52px)] font-medium tracking-[-0.035em] leading-[1.15] text-balance transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {t.quote}
        </blockquote>
      </div>
      <div className="flex items-center gap-4 mt-10 pl-[140px] max-[1024px]:pl-[60px] max-[809px]:pl-0">
        <span className="w-[44px] h-[44px] rounded-full bg-ink text-white flex items-center justify-center text-[14px] font-semibold flex-shrink-0">
          {t.initials}
        </span>
        <div>
          <strong className="text-[16px] font-semibold block">{t.name}</strong>
          <span className="text-[15px] text-muted">{t.role}</span>
        </div>
      </div>
      <div className="flex gap-[10px] mt-8 pl-[140px] max-[1024px]:pl-[60px] max-[809px]:pl-0">
        <button
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="w-12 h-12 rounded-full border border-outline flex items-center justify-center text-ink transition-colors duration-200 hover:bg-ink hover:border-ink hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="w-12 h-12 rounded-full border border-outline flex items-center justify-center text-ink transition-colors duration-200 hover:bg-ink hover:border-ink hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
