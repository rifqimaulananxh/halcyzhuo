# halcyzhuo

Portfolio site for [halcyzhuo](https://halcyzhuo.dev) — a software engineer. Fast, animated, and built to ship.

## Stack

- **Next.js 16** (App Router) — 100% statically generated
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4**
- **GSAP** (SplitText, ScrollTrigger) + **Lenis** for the Obscura-style reveal animations

## Highlights

- Mask-line text reveals powered by GSAP SplitText (no preloader, no FOUC)
- Smooth scrolling via Lenis, synced to ScrollTrigger
- **gsap is lazy-loaded** as its own chunk — users on `prefers-reduced-motion` never download it
- SEO-ready: per-page canonicals, JSON-LD (Person + WebSite), Open Graph with per-detail-page tags, sitemap, robots
- Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`), no `X-Powered-By`

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Scripts

```bash
pnpm lint       # eslint
pnpm build      # production build (SSG)
pnpm start      # serve the production build
```

## Project structure

```
src/
  app/            # routes (/, /about, /work, /journal, 404)
  components/     # TextReveal, SmoothScroll, Nav, Footer, ...
  lib/            # site config, projects, posts
public/
  og.png          # social share image
  projects/       # project cover SVGs
```

## Deploy

The site is fully static — deploy `pnpm build` output to any static host (Vercel, Netlify, Cloudflare Pages).
