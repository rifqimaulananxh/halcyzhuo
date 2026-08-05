import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Reveal variant="fade" className="w-fit">
      <Magnetic>
        <Link
          href={href}
          className="inline-flex items-center gap-[10px] text-[var(--fs-body-sm)] font-semibold text-muted w-fit transition-colors duration-200 hover:text-ink group"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          {children}
        </Link>
      </Magnetic>
    </Reveal>
  );
}
