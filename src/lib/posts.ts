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
    title: "When a plain fetch layer beats React Query",
    date: "Jul 3, 2026",
    readTime: "8 min read",
    category: "Engineering",
    description:
      "A popular dependency is not always the right dependency for the product in front of you.",
    blocks: [
      {
        type: "p",
        text: "React Query is good software. But good software is not automatically the right dependency for a product. On one project, a plain fetch layer with a small cache removed more complexity than it added.",
      },
      {
        type: "p",
        text: "The app had a handful of screens, each loading one or two resources. Data changed rarely. There was no optimistic updating, infinite scrolling, or complicated invalidation. None of the features that would justify a data-fetching library were present.",
      },
      {
        type: "p",
        text: "The solution was a module that owned fetching, a small in-memory cache with a TTL, and one way to invalidate by key. Roughly forty lines:",
      },
      {
        type: "code",
        code: "export const cache = new Map();\nexport async function load(key, loader, { ttl = 60_000 } = {}) {\n  const hit = cache.get(key);\n  if (hit && Date.now() - hit.at < ttl) return hit.data;\n  const data = await loader();\n  cache.set(key, { data, at: Date.now() });\n  return data;\n}\nexport function invalidate(key) { cache.delete(key); }",
      },
      {
        type: "p",
        text: "There were fewer concepts to teach, no upgrade treadmill, and no new bundle weight. The team could read the whole data layer in one sitting. For this product, that was the point.",
      },
      {
        type: "p",
        text: "Popularity is a signal about the ecosystem, not a verdict about your codebase. Choose a dependency for the features you need now, not the ones you might need someday.",
      },
    ],
  },
  {
    slug: "lighthouse",
    title: "How to read a Lighthouse score (and when to ignore it)",
    date: "Jun 18, 2026",
    readTime: "6 min read",
    category: "Performance",
    description:
      "The score is a diagnostic, not the product. Focus on the metrics users actually feel.",
    blocks: [
      {
        type: "p",
        text: "A single Lighthouse run is one sample, on one machine, against a simulated connection. It is useful for finding problems, not declaring victory. Here is how I read the numbers.",
      },
      {
        type: "p",
        text: "The audit panel is lab data. Your users generate field data from real devices and networks. When the two disagree, trust the field. Users do not run on your Wi-Fi.",
      },
      {
        type: "p",
        text: "For most products, start with LCP, INP, and CLS: when the main content appears, how the interface responds, and whether the layout stays put. A high Performance score with poor INP still feels slow.",
      },
      {
        type: "p",
        text: "Ignore the score when it becomes an aesthetic gate instead of a user signal. A 99 that costs weeks of churn-risk refactors on an internal admin tool may not be worth it. Optimize for the experience users feel. Keep the score as a smoke alarm, not a target.",
      },
    ],
  },
  {
    slug: "scale-without-rewrite",
    title: "The architecture that scaled to 60k users without a rewrite",
    date: "May 29, 2026",
    readTime: "10 min read",
    category: "Architecture",
    description:
      "How small architectural decisions made growth an operational task, not an emergency.",
    blocks: [
      {
        type: "p",
        text: "Rewrites are usually a symptom of a product growing past its original assumptions. Dokterku did not need one because its early decisions were made to survive growth, not just to ship.",
      },
      {
        type: "p",
        text: "Booking availability was the query running constantly under load. We separated reads from writes with a read replica and cached availability aggressively. The write path stayed simple and correct.",
      },
      {
        type: "p",
        text: "Notifications, emails, and webhooks moved to a queue-backed worker. The API stopped doing work outside the request's core responsibility, removing most latency spikes.",
      },
      {
        type: "p",
        text: "Scaling is a series of small, boring refactors applied before they hurt, not one dramatic event. Plan the seams, replicas, caches, and queues during discovery, and growth becomes an operational task instead of an emergency.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
