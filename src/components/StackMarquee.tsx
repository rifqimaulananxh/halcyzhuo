"use client";

import { DraggableMarquee } from "@/components/DraggableMarquee";
import { StackLogo, type StackSlug } from "@/components/StackLogos";

const STACK: StackSlug[] = [
  "typescript",
  "nextjs",
  "react",
  "nestjs",
  "prisma",
  "postgresql",
  "redis",
  "aws",
  "docker",
  "tailwind",
];

export function StackMarquee() {
  const items = STACK.map((slug) => <StackLogo key={slug} slug={slug} />);
  return <DraggableMarquee items={items} duration={60} multiplier={35} />;
}
