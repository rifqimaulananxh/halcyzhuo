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
      "Real-time analytics for teams that need the signal before the next report.",
    category: "web-app",
    client: "Pulse Labs",
    role: "Full-stack · Architecture",
    stack: "React, Node.js, WebSocket, ClickHouse",
    year: "2026",
    metric: "0.4s LCP",
    cover: "/projects/pulse.svg",
    url: "pulse.app",
    quote:
      "We can finally trust the dashboard. Decisions run on fresh data, and issues surface before customers notice.",
    quoteBy: { name: "Maya Raharja", role: "CEO · Pulse Labs" },
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Pulse's analytics pipeline ran in batches. Dashboards refreshed every few hours and buckled under traffic spikes. Product needed <strong>real-time</strong> signal; engineering needed a stable path to deliver it.",
          "Stale data was slowing decisions and driving churn. The target was sub-second insight at scale without turning infrastructure cost into the new problem.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We replaced polling with a WebSocket push layer fed by ClickHouse. Charts render from a normalized event stream, keeping the frontend responsive as volume grows.",
          "Aggregations moved into SQL through precomputed rollups and hot-path caching. The result is live insight without unnecessary moving parts.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "LCP fell from 2.3s to <strong>0.4s</strong>. Dashboards stream live data, and the platform handles 10x the event volume on the same infrastructure. Uptime held at <strong>99.9%</strong> through the first month after launch.",
          "More importantly, the team makes decisions on fresh data and catches issues earlier.",
        ],
      },
    ],
  },
  {
    slug: "finread",
    title: "Finread",
    tagline:
      "A fintech app and marketing site rebuilt in six weeks, with 42% less bundle weight.",
    category: "landing",
    client: "Finread",
    role: "Frontend lead",
    stack: "React, TypeScript, Tailwind, Vite",
    year: "2026",
    metric: "42% smaller bundle",
    cover: "/projects/finread.svg",
    url: "finread.io",
    quote:
      "LCP fell from 2.1s to 0.4s. Signups rose 38% the next month. No one asks about the stack anymore. It just works.",
    quoteBy: { name: "Daniel Kusuma", role: "CTO · Finread" },
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "The marketing site and app lived in separate codebases. Components were duplicated, the bundle kept growing, and load time was costing signups.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We brought both products under one design system, migrated to Vite, and removed dependencies that duplicated browser features. Images moved to modern formats with deliberate priority hints.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Bundle size fell <strong>42%</strong>. LCP dropped from 2.1s to <strong>0.4s</strong>, and signups rose <strong>38%</strong> the following month. Existing traffic finally had a faster path to conversion.",
        ],
      },
    ],
  },
  {
    slug: "nusantara",
    title: "Nusantara Labs",
    tagline:
      "An e-commerce rebuild that untangled a legacy monolith into a storefront built to convert.",
    category: "ecommerce",
    client: "Nusantara Labs",
    role: "Tech lead",
    stack: "Next.js, PostgreSQL, Stripe",
    year: "2026",
    metric: "2× conversion rate",
    cover: "/projects/nusantara.svg",
    url: "nusantara.co.id",
    quote:
      "We shipped two weeks early. The reviews were honest, the code was clear, and the performance wins were measurable.",
    quoteBy: { name: "Rina Setiawan", role: "Founder · Nusantara Labs" },
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "The storefront had a slow checkout, an aging stack, and abandonment at an all-time high. Every fix risked breaking something else.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We rebuilt the storefront in Next.js through an incremental migration: catalog first, checkout next, auth after that. Server components cut round trips, and a typed API kept the frontend honest.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Conversion rate doubled and average order value grew. Checkout abandonment fell sharply. The platform now feels like the product, not a workaround.",
        ],
      },
    ],
  },
  {
    slug: "dokterku",
    title: "Dokterku",
    tagline:
      "Telehealth booking that grew from 2k to 60k monthly active users without a rewrite.",
    category: "web-app",
    client: "Dokterku",
    role: "Full-stack",
    stack: "React Native, Node.js, PostgreSQL, Redis",
    year: "2025–2026",
    metric: "60k MAU",
    cover: "/projects/dokterku.svg",
    url: "dokterku.id",
    quote:
      "Halcyzhuo turned product chaos into a roadmap we could ship. Tests, monitoring, and documentation were in place from day one.",
    quoteBy: { name: "Andi Malik", role: "Product Lead · Dokterku" },
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Monthly active users grew from thousands to tens of thousands. The original architecture was built for a smaller scale, and scheduling conflicts were piling up.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We did not rewrite it. We hardened the booking core, added a read replica for availability queries, and cached data that changed rarely. Auth and notifications moved to a queue-backed worker.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The platform scaled from <strong>2k to 60k MAU</strong> without a re-architecture. Planning during discovery paid for itself many times over. The team ships features, not fixes.",
        ],
      },
    ],
  },
  {
    slug: "arunapay",
    title: "Aruna Pay",
    tagline:
      "A payment dashboard with edge delivery and observability from day one.",
    category: "landing",
    client: "Aruna Pay",
    role: "Architecture · Backend",
    stack: "Node.js, GraphQL, Redis, Cloudflare",
    year: "2026",
    metric: "0.2s TTFB",
    cover: "/projects/arunapay.svg",
    url: "arunapay.com",
    quote:
      "Edge delivery and observability were there from day one. We see problems before customers do, and we trust the numbers again.",
    quoteBy: { name: "Sari Puspita", role: "Founder · Aruna Pay" },
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Merchants faced slow load times and unclear failures in a payment dashboard they needed to trust.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We served hot API queries from the edge, then wrapped every provider call in structured observability: latency, error codes, and retries visible at a glance.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "TTFB dropped to <strong>0.2s</strong>. Incident response moved from merchant-reported to proactive. The team sees problems before customers do.",
        ],
      },
    ],
  },
  {
    slug: "sahamrakyat",
    title: "Saham Rakyat",
    tagline:
      "An investment platform built with accessibility and retention as first-class requirements.",
    category: "ecommerce",
    client: "Saham Rakyat",
    role: "Full-stack",
    stack: "Next.js, TypeScript, PostgreSQL",
    year: "2026",
    metric: "3× retention",
    cover: "/projects/sahamrakyat.svg",
    url: "sahamrakyat.id",
    quote:
      "Accessibility was part of the build from the start. We shipped WCAG AA and passed the audit on the first try.",
    quoteBy: { name: "Bagus Firmansyah", role: "Founder · Saham Rakyat" },
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Onboarding was losing users, and accessibility had been treated as a later concern. That created risk for both users and the business.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We rebuilt onboarding into short, focused steps with clear progress. The app shipped <strong>WCAG AA</strong> with proper focus management, semantic markup, and keyboard support throughout.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Retention tripled (<strong>+3x</strong>) and the accessibility audit passed on the first try. Accessibility proved faster for everyone, not just a checkbox.",
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
