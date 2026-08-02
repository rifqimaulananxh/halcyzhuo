export type ProjectCategory = "web-app" | "landing" | "ecommerce";

export interface ProjectSection {
  heading: string;
  paragraphs: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  client: string;
  role: string;
  stack: string;
  year: string;
  metric: string;
  cover: string;
  url: string;
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: "pulse",
    title: "Pulse",
    tagline:
      "Realtime analytics dashboard — from slow, static reporting to live, sub-second insights.",
    category: "web-app",
    client: "Pulse Labs",
    role: "Full-stack · Architecture",
    stack: "React, Node.js, WebSocket, ClickHouse",
    year: "2026",
    metric: "0.4s LCP",
    cover: "/projects/pulse.svg",
    url: "pulse.app",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Pulse's analytics pipeline was batch-only — dashboards refreshed every few hours and crashed under traffic spikes. Product wanted <strong>realtime</strong>, engineers wanted <strong>stable</strong>.",
          "Users were churning because decisions were made on stale data. The core ask: sub-second insights, at scale, without burning the budget on infrastructure.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We replaced the polling architecture with a WebSocket push layer fed by ClickHouse. Charts render from a normalized event stream, so the frontend stays fast no matter how much data comes in.",
          "Aggregations moved from application code into SQL — pre-computed rollups with hot-path caching. The result is realtime without the complexity usually attached to it.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "LCP dropped from 2.3s to <strong>0.4s</strong>. Dashboards now stream live data, and the platform handles 10× the event volume on the same infrastructure. Uptime held at <strong>99.9%</strong> through the post-launch month.",
          "More importantly: decisions are now made on fresh data. The team reports a measurable lift in how fast they catch issues.",
        ],
      },
    ],
  },
  {
    slug: "finread",
    title: "Finread",
    tagline:
      "Fintech app + marketing site — a bloated frontend trimmed down and shipped in six weeks.",
    category: "landing",
    client: "Finread",
    role: "Frontend lead",
    stack: "React, TypeScript, Tailwind, Vite",
    year: "2026",
    metric: "↓42% bundle",
    cover: "/projects/finread.svg",
    url: "finread.io",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "The marketing site and the app were two separate codebases with duplicated components and a bundle that kept growing. Load times were chasing signups away.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "Unified both under a single design system, migrated to Vite, and cut dependencies that duplicated native browser features. Images moved to modern formats with proper priority hints.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Bundle shrank <strong>42%</strong>. LCP dropped from 2.1s to <strong>0.4s</strong>, and signups rose <strong>38%</strong> the following month — traffic we already had, finally converting.",
        ],
      },
    ],
  },
  {
    slug: "nusantara",
    title: "Nusantara Labs",
    tagline:
      "E-commerce platform rebuild — a legacy monolith untangled into a platform that converts.",
    category: "ecommerce",
    client: "Nusantara Labs",
    role: "Tech lead",
    stack: "Next.js, PostgreSQL, Stripe",
    year: "2026",
    metric: "2× conversion",
    cover: "/projects/nusantara.svg",
    url: "nusantara.co.id",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "A legacy storefront with slow checkouts, an aging stack, and checkout drop-off at an all-time high. Every fix risked breaking something else.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "Rebuilt the storefront in Next.js with an incremental migration — catalog first, then checkout, then auth. Server components cut round trips, and a typed API layer kept the frontend honest.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Conversion rate doubled and average order value grew. Checkout abandonment dropped sharply — the platform finally feels like the product, not a workaround.",
        ],
      },
    ],
  },
  {
    slug: "dokterku",
    title: "Dokterku",
    tagline:
      "Telehealth booking platform — scaled from 2k to 60k users without a rewrite.",
    category: "web-app",
    client: "Dokterku",
    role: "Full-stack",
    stack: "React Native, Node.js, PostgreSQL, Redis",
    year: "2025–2026",
    metric: "60k MAU",
    cover: "/projects/dokterku.svg",
    url: "dokterku.id",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Rapid growth — from thousands to tens of thousands of monthly users. The original architecture was built for a smaller scale and scheduling conflicts were piling up.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "No rewrite. We hardened the booking core, introduced a read replica for availability queries, and added caching where data changed rarely. Auth and notifications were moved to a queue-backed worker.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The platform scaled from <strong>2k to 60k MAU</strong> without a single re-architecture. Planning during the discover phase paid for itself ten times over — the team ships features, not fixes.",
        ],
      },
    ],
  },
  {
    slug: "arunapay",
    title: "Aruna Pay",
    tagline:
      "Payment gateway dashboard — edge serving and observability baked in from day one.",
    category: "landing",
    client: "Aruna Pay",
    role: "Architecture · Backend",
    stack: "Node.js, GraphQL, Redis, Cloudflare",
    year: "2026",
    metric: "0.2s TTFB",
    cover: "/projects/arunapay.svg",
    url: "arunapay.com",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "A payment dashboard where merchants saw slow dashboards and unclear failures. Trust in the numbers was low.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "Served API responses from the edge with caching for hot queries, and wrapped every provider call with structured observability — latency, error codes, and retries visible at a glance.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "TTFB dropped to <strong>0.2s</strong>. Incident response went from \"merchant-reported\" to proactive — the team sees problems before customers do.",
        ],
      },
    ],
  },
  {
    slug: "sahamrakyat",
    title: "Saham Rakyat",
    tagline:
      "Investment platform — accessibility and retention as first-class features.",
    category: "ecommerce",
    client: "Saham Rakyat",
    role: "Full-stack",
    stack: "Next.js, TypeScript, PostgreSQL",
    year: "2026",
    metric: "+3× retention",
    cover: "/projects/sahamrakyat.svg",
    url: "sahamrakyat.id",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "An investment platform where onboarding leaked users and accessibility was an afterthought — risk for both users and the business.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "Rebuilt onboarding into short, focused steps with clear progress. Shipped <strong>WCAG AA</strong> across the app — proper focus management, semantic markup, and keyboard support throughout.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Retention tripled (<strong>+3×</strong>) and the accessibility audit passed on the first try. Accessible turned out to be faster for everyone, not just a checkbox.",
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  return projects[(idx + 1) % projects.length];
}
