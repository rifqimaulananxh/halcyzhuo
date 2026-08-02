export type PostBlock = { type: "p"; text: string } | { type: "code"; code: string };

export interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  description: string;
  blocks: PostBlock[];
}

export const posts: Post[] = [
  {
    slug: "react-query-fetch",
    title: "Why I dropped React Query for a plain fetch layer",
    date: "Jul 3, 2026",
    readTime: "8 min read",
    category: "/engineering",
    description:
      "Sometimes the popular dependency isn't the right fit for your product.",
    blocks: [
      {
        type: "p",
        text: "React Query is great software. But \"great software\" and \"right dependency for your product\" are different questions. For one project, the answer was a plain fetch layer wrapped in a small cache — and it removed more complexity than it added.",
      },
      {
        type: "p",
        text: "The app had a handful of screens, each loading one or two resources. Data changed rarely, and there was no optimistic updating or infinite scrolling. In short: none of the features that make a data-fetching library earn its weight.",
      },
      {
        type: "p",
        text: "A module that owns the fetch, a small in-memory cache with staleness, and a way to invalidate by key. Roughly forty lines:",
      },
      {
        type: "code",
        code: "export const cache = new Map();\nexport async function load(key, loader, { ttl = 60_000 } = {}) {\n  const hit = cache.get(key);\n  if (hit && Date.now() - hit.at < ttl) return hit.data;\n  const data = await loader();\n  cache.set(key, { data, at: Date.now() });\n  return data;\n}\nexport function invalidate(key) { cache.delete(key); }",
      },
      {
        type: "p",
        text: "Fewer concepts to teach, no version upgrade treadmill, and bundle weight that stayed flat. The team could read the whole data layer in one sitting. For this product, that was the point.",
      },
      {
        type: "p",
        text: "Popularity is a signal about the ecosystem, not a verdict about your codebase. Evaluate the dependency against the features you actually need — not the ones you might need someday.",
      },
    ],
  },
  {
    slug: "lighthouse",
    title: "How to read a Lighthouse score (and when to ignore it)",
    date: "Jun 18, 2026",
    readTime: "6 min read",
    category: "/performance",
    description:
      "Scores are not the goal. A practical guide to chasing the metrics that actually matter.",
    blocks: [
      {
        type: "p",
        text: "A single Lighthouse run is a sample of one, on your machine, against a simulated connection. It is useful for finding problems — not for declaring victory. Here's how I read the numbers.",
      },
      {
        type: "p",
        text: "The score in the audit panel is lab data. Your real users are field data — collected from actual devices and networks. When the two disagree, trust the field. Users don't run on your Wi-Fi.",
      },
      {
        type: "p",
        text: "For most products: LCP (how fast the main content appears), INP (responsiveness to interaction), and CLS (layout stability). A high Performance score with bad INP still feels slow.",
      },
      {
        type: "p",
        text: "When the score is an aesthetic gate, not a user signal. A 99 that cost you weeks of churn-risk refactors on an internal admin tool may not be worth it. Optimize for the experience users feel, then keep the score as a smoke alarm — not a target.",
      },
    ],
  },
  {
    slug: "scale-without-rewrite",
    title: "The architecture that scaled to 60k users without a rewrite",
    date: "May 29, 2026",
    readTime: "10 min read",
    category: "/architecture",
    description:
      "Lessons from Dokterku: planning right from day one beats rebuilding later.",
    blocks: [
      {
        type: "p",
        text: "Rewrites are usually a symptom — a product that grew past its original assumptions. Dokterku didn't need one, because the early decisions were made to survive growth, not just to ship.",
      },
      {
        type: "p",
        text: "Booking availability was the query running constantly under load. We separated reads from writes with a read replica and cached availability aggressively. The write path stayed simple and correct.",
      },
      {
        type: "p",
        text: "Notifications, emails, and webhooks moved to a queue-backed worker. The API stopped being responsible for work that wasn't the request's business, which removed most of the latency spikes.",
      },
      {
        type: "p",
        text: "Scaling is a series of small, boring refactors applied before they hurt — not one dramatic event. Plan the seams (replicas, caches, queues) during the discover phase, and growth becomes an operational task, not an emergency.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
