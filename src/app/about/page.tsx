import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { Cta } from "@/components/Cta";
import { BackLink } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "About halcyzhuo — a software engineer who ships. How I work, what I value, and where I've been.",
  alternates: { canonical: "/about" },
};

const rows = [
  {
    num: "01",
    title: "Who I am",
    desc: "Full-stack engineer dengan fokus di TypeScript, React, Node.js, dan arsitektur yang bertahan lama. Enam tahun pengalaman membawa produk dari ide ke produksi — solo maupun leading small teams.",
  },
  {
    num: "02",
    title: "How I work",
    desc: "Transparan dan langsung. Scope jelas, estimasi jujur, dan check-in yang bisa dipantau. Saya percaya komunikasi yang baik sama pentingnya dengan kode yang baik.",
  },
  {
    num: "03",
    title: "What I value",
    desc: "Performa yang terukur, aksesibilitas sebagai standar, dan kode yang bisa diserah-terimakan. Produk yang dibangun untuk dipakai lama, bukan untuk demo.",
  },
];

const timeline = [
  {
    step: "2023 — now",
    title: "Independent engineer",
    desc: "Client projects end-to-end: fintech, healthtech, dan e-commerce. Merancang arsitektur, memimpin build, dan menjaga produk tetap hidup setelah launch.",
  },
  {
    step: "2020 — 2023",
    title: "Senior full-stack · fintech",
    desc: "Memimpin tim lima engineer, memperbaiki performa, dan membangun payment infrastructure yang dipakai jutaan transaksi.",
  },
  {
    step: "2018 — 2020",
    title: "Full-stack developer · startup",
    desc: "Dari frontend ke backend ke infra — belajar bahwa shipping cepat dan arsitektur rapi bukan dua hal yang terpisah.",
  },
];

export default function AboutPage() {
  return (
    <div id="main">
      <header className="pt-32 pb-12 max-[809px]:pt-24">
        <BackLink href="/">Home</BackLink>
        <Reveal variant="mask">
          <div className="mt-10 flex items-end justify-between gap-10 border-b border-surface pb-12 max-[809px]:flex-col max-[809px]:items-start">
            <div>
              <p
                className="rv rv-label mb-4 text-[14px] font-semibold uppercase tracking-[0.08em] text-muted"
                style={{ "--i": 0 } as CSSProperties}
              >
                About · the engineer
              </p>
              <TextReveal
                as="h1"
                className="text-[clamp(56px,9vw,120px)] font-semibold tracking-[-0.05em] leading-[0.95]"
              >
                About<span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc text-[16px] text-muted leading-normal max-w-[420px]"
              style={{ "--i": 2 } as CSSProperties}
            >
              Software engineer yang mengejar hasil terukur — bukan sekadar code
              yang jalan. Berbasis Jakarta, bekerja remote.
            </p>
          </div>
        </Reveal>
      </header>

      <section>
        <Reveal variant="stagger">
          {rows.map((row, i) => (
            <div
              key={row.num}
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[120px_1fr_1fr] gap-8 items-baseline py-11 border-b border-surface transition-all duration-300 hover:pl-3 max-[1024px]:grid-cols-[100px_1fr] max-[809px]:grid-cols-1 max-[809px]:gap-3"
            >
              <span className="text-[15px] font-semibold text-muted tracking-wide">
                {row.num}
              </span>
              <h3 className="text-[clamp(26px,3.4vw,42px)] font-semibold tracking-[-0.04em] leading-tight">
                {row.title}
              </h3>
              <p className="text-muted text-[16px] leading-normal max-w-[460px] max-[1024px]:col-start-2 max-[809px]:col-start-1">
                {row.desc}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <section>
        <Reveal variant="mask">
          <div className="flex items-end justify-between gap-10 border-b border-surface pb-12 mb-12 max-[809px]:flex-col max-[809px]:items-start">
            <div>
              <p
                className="rv rv-label mb-4 text-[14px] font-semibold uppercase tracking-[0.08em] text-muted"
                style={{ "--i": 0 } as CSSProperties}
              >
                Experience · timeline
              </p>
              <TextReveal
                as="h2"
                className="text-[clamp(40px,6vw,72px)] font-semibold tracking-[-0.05em] leading-[1]"
              >
                Where I&apos;ve shipped<span className="text-muted">.</span>
              </TextReveal>
            </div>
            <p
              className="rv rv-desc text-[16px] text-muted leading-normal max-w-[420px]"
              style={{ "--i": 2 } as CSSProperties}
            >
              Enam tahun membawa produk dari ide ke produksi — dari startup
              sampai independent engineering.
            </p>
          </div>
        </Reveal>
        <Reveal variant="stagger">
          {timeline.map((item, i) => (
            <div
              key={item.title}
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[140px_1fr] gap-12 py-[52px] border-b border-surface transition-all duration-300 hover:pl-3 max-[1024px]:grid-cols-[110px_1fr] max-[1024px]:gap-8 max-[809px]:grid-cols-1 max-[809px]:gap-4"
            >
              <span className="text-[15px] font-semibold uppercase tracking-wide text-muted pt-2">
                {item.step}
              </span>
              <div className="max-w-[720px]">
                <h3 className="text-[clamp(30px,4vw,52px)] mb-[18px] tracking-[-0.04em] leading-tight">
                  {item.title}
                </h3>
                <p className="text-muted text-[17px] leading-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <Reveal variant="mask">
        <Cta
          pillLabel="let's build"
          title="Tell me what you're building."
          btnLabel="~/start-a-project"
        />
      </Reveal>
    </div>
  );
}
