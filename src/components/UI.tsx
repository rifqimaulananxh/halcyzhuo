import { Magnetic } from "@/components/Magnetic";

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function SolidBtn({
  href,
  children,
  tone = "dark",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  const toneClass =
    tone === "light"
      ? "bg-white text-ink hover:bg-white/85"
      : "bg-ink text-white hover:bg-accent";

  return (
    <Magnetic>
      <a
        href={href}
        className={`inline-flex items-center gap-3 rounded-[var(--radius-md)] px-8 py-[18px] text-[var(--fs-body)] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${toneClass}`}
      >
        {children}
        <ArrowIcon />
      </a>
    </Magnetic>
  );
}

export function TextBtn({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Magnetic>
      <a
        href={href}
        className={`inline-flex items-center gap-3 mt-6 text-[var(--fs-body)] font-semibold group ${className}`}
      >
        <span className="underline underline-offset-8 decoration-1 group-hover:decoration-2">
          {children}
        </span>
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          <ArrowIcon className="w-[26px] h-[26px]" />
        </span>
      </a>
    </Magnetic>
  );
}
