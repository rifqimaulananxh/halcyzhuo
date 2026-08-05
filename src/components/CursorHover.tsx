"use client";

import type { ReactNode } from "react";
import { useCursor } from "@/components/CustomCursor";

export function CursorHover({ children }: { children: ReactNode }) {
  const { setCursor, resetCursor } = useCursor();
  return (
    <div
      className="contents"
      onMouseEnter={() => setCursor("project", "View Project")}
      onMouseLeave={resetCursor}
    >
      {children}
    </div>
  );
}
