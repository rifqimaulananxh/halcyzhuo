export type ProjectCategory = "web-app" | "landing" | "ecommerce";

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "web-app": "Web app",
  landing: "Landing page",
  ecommerce: "E-commerce",
};

export function getProjectCategoryLabel(category: ProjectCategory): string {
  return PROJECT_CATEGORY_LABELS[category];
}

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
  quote: string;
  quoteBy: { name: string; role: string };
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: "pulse",
    title: "Pulse",
    tagline:
      "Real-time analytics dashboard. From slow batch reporting to live, sub-second insight.",
    category: "web-app",
    client: "Pulse Labs",
    role: "Full-stack · Architecture",
    stack: "React, Node.js, WebSocket, ClickHouse",
    year: "2026",
    metric: "0.4s LCP",
    cover: "/projects/pulse.svg",
    url: "pulse.app",
    quote:
      "Real-time dashboards we can trust. Decisions now run on fresh data, and our team catches issues before customers do.",
    quoteBy: { name: "Maya Raharja", role: "CEO · Pulse Labs" },
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Pulse's analytics pipeline was batch-only: dashboards refreshed every few hours and failed under traffic spikes. Product needed <strong>real-time</strong> insight; engineering needed stability.",
          "Users were churning because decisions were based on stale data. The goal was sub-second insight at scale without burning the budget on infrastructure.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We replaced polling with a WebSocket push layer fed by ClickHouse. Charts render from a normalized event stream, so the frontend stays responsive as data volume grows.",
          "Aggregations moved from application code into SQL: precomputed rollups with hot-path caching. The result is real-time insight without unnecessary complexity.",
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
      "Fintech app and marketing site. A bloated frontend trimmed down and shipped in six weeks.",
    category: "landing",
    client: "Finread",
    role: "Frontend lead",
    stack: "React, TypeScript, Tailwind, Vite",
    year: "2026",
    metric: "42% smaller bundle",
    cover: "/projects/finread.svg",
    url: "finread.io",
    quote:
      "The LCP dropped from 2.1s to 0.4s. Our signups went up 38% the next month. Nobody asks about our tech stack anymore — it just works.",
    quoteBy: { name: "Daniel Kusuma", role: "CTO · Finread" },
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "The marketing site and app were two separate codebases with duplicated components and a bundle that kept growing. Load times were driving signups away.",
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
          "Bundle size fell <strong>42%</strong>. LCP dropped from 2.1s to <strong>0.4s</strong>, and signups rose <strong>38%</strong> the following month. Existing traffic finally converted.",
        ],
      },
    ],
  },
  {
    slug: "nusantara",
    title: "Nusantara Labs",
    tagline:
      "E-commerce platform rebuild. A legacy monolith untangled into a storefront that converts.",
    category: "ecommerce",
    client: "Nusantara Labs",
    role: "Tech lead",
    stack: "Next.js, PostgreSQL, Stripe",
    year: "2026",
    metric: "2× conversion rate",
    cover: "/projects/nusantara.svg",
    url: "nusantara.co.id",
    quote:
      "Shipped two weeks ahead of schedule. Clean code, honest reviews, and measurable performance wins — not just promises.",
    quoteBy: { name: "Rina Setiawan", role: "Founder · Nusantara Labs" },
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "A legacy storefront with slow checkout, an aging stack, and abandonment at an all-time high. Every fix risked breaking something else.",
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
          "Conversion rate doubled and average order value grew. Checkout abandonment fell sharply. The platform finally feels like the product, not a workaround.",
        ],
      },
    ],
  },
  {
    slug: "dokterku",
    title: "Dokterku",
    tagline:
      "Telehealth booking platform. Scaled from 2k to 60k monthly active users without a rewrite.",
    category: "web-app",
    client: "Dokterku",
    role: "Full-stack",
    stack: "React Native, Node.js, PostgreSQL, Redis",
    year: "2025–2026",
    metric: "60k MAU",
    cover: "/projects/dokterku.svg",
    url: "dokterku.id",
    quote:
      "Halcyzhuo translated product chaos into a roadmap we could ship. Testing infrastructure, monitoring, and documentation were in place from day one.",
    quoteBy: { name: "Andi Malik", role: "Product Lead · Dokterku" },
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Rapid growth from thousands to tens of thousands of monthly active users. The original architecture was built for a smaller scale, and scheduling conflicts were piling up.",
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
          "The platform scaled from <strong>2k to 60k MAU</strong> without a re-architecture. Planning during the discovery phase paid for itself ten times over. The team ships features, not fixes.",
        ],
      },
    ],
  },
  {
    slug: "arunapay",
    title: "Aruna Pay",
    tagline:
      "Payment gateway dashboard with edge delivery and observability from day one.",
    category: "landing",
    client: "Aruna Pay",
    role: "Architecture · Backend",
    stack: "Node.js, GraphQL, Redis, Cloudflare",
    year: "2026",
    metric: "0.2s TTFB",
    cover: "/projects/arunapay.svg",
    url: "arunapay.com",
    quote:
      "Edge delivery and observability were in place from day one. Now our team sees problems before customers do, and we trust the numbers again.",
    quoteBy: { name: "Sari Puspita", role: "Founder · Aruna Pay" },
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "A payment dashboard where merchants faced slow load times and unclear failures. Trust in the numbers was low.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We served API responses from the edge with caching for hot queries, then wrapped every provider call with structured observability: latency, error codes, and retries visible at a glance.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "TTFB dropped to <strong>0.2s</strong>. Incident response went from merchant-reported to proactive. The team sees problems before customers do.",
        ],
      },
    ],
  },
  {
    slug: "sahamrakyat",
    title: "Saham Rakyat",
    tagline:
      "Investment platform where accessibility and retention are first-class features.",
    category: "ecommerce",
    client: "Saham Rakyat",
    role: "Full-stack",
    stack: "Next.js, TypeScript, PostgreSQL",
    year: "2026",
    metric: "3× retention",
    cover: "/projects/sahamrakyat.svg",
    url: "sahamrakyat.id",
    quote:
      "It is rare to find an engineer who cares about accessibility. Halcyzhuo shipped WCAG AA from the start, and our audit passed on the first try.",
    quoteBy: { name: "Bagus Firmansyah", role: "Founder · Saham Rakyat" },
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "An investment platform where onboarding lost users and accessibility was an afterthought, creating risk for both users and the business.",
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
          "Retention tripled (<strong>+3×</strong>) and the accessibility audit passed on the first try. Accessibility turned out to be faster for everyone, not just a checkbox.",
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
