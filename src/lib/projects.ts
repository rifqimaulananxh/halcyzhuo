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
  metric?: string;
  cover: string;
  quote?: string;
  quoteBy?: { name: string; role: string };
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: "architecture-bureau",
    title: "Architecture Bureau",
    tagline:
      "An editorial showcase for a Medellín architecture practice, with tactile SVG plan reveals and synchronized scroll physics.",
    category: "landing",
    client: "Architecture Bureau",
    role: "Frontend engineering",
    stack: "Next.js 16, TypeScript, GSAP ScrollTrigger, Lenis",
    year: "2026",
    metric: "SVG plan reveals, synced scroll",
    cover: "/projects/architecture-bureau.jpg",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "The practice's work is technical: CAD line drawings, material specifications, and forest photography. A standard agency template would have flattened it into high-contrast banners and lost what makes the work distinctive.",
          "The site needed to present that detail with zero visual clutter, and without paying for it in performance.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We animated technical CAD line drawings as custom SVG stroke reveals, triggered cleanly through ScrollTrigger as each drawing enters view.",
          "Lenis momentum scroll was synced with header behaviour, with reduced-motion fallbacks throughout. The build is split into small, isolated components — plan SVGs, image reveals, an inquiry modal — so the system stays easy to extend.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "An editorial architecture showcase that communicates spatial precision on a slow, deliberate pace.",
          "Visitors move from a drawing to an inquiry without leaving the mood of the site.",
        ],
      },
    ],
  },
  {
    slug: "frame-estate",
    title: "Frame Estate",
    tagline:
      "A B2B construction platform that turns a complex framing process into a clear, step-by-step journey.",
    category: "landing",
    client: "Frame Estate",
    role: "Frontend engineering",
    stack: "Next.js 16, React 19, TypeScript, Tailwind CSS, Lenis",
    year: "2026",
    metric: "Consultation flow, staged reveals",
    cover: "/projects/frame-estate.jpg",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Commercial construction leads drop off when project stages feel opaque and the only next step is an impersonal contact form.",
          "The platform had to translate a genuinely technical build process into something a decision-maker can follow.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We built staggered card reveals and magnetic micro-interactions that walk through material origins and phase handovers in order.",
          "A dedicated consultation flow gives immediate feedback with accessible modal states, and a full SEO layer — sitemap, canonical tags, asset attribution — carries the content to search.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A B2B construction experience that makes a complicated process legible enough to act on.",
          "The clear next step is always visible: the consultation.",
        ],
      },
    ],
  },
  {
    slug: "harmony-sound",
    title: "Harmony Sound",
    tagline:
      "An editorial storefront for a premium audio atelier, with a working cart and live product filtering.",
    category: "ecommerce",
    client: "Harmony Sound",
    role: "Frontend engineering",
    stack: "Next.js 16, React 19, TypeScript, Tailwind CSS, Lenis",
    year: "2026",
    metric: "Working cart, live filters",
    cover: "/projects/harmony-sound.jpg",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Product pages too easily become grids of features. The store needed real commerce behaviour without losing a calm, editorial pace.",
          "The design system had to be bespoke enough that the products carry the page.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We built a working cart drawer with quantity controls, line removal, live subtotals, and full dialog accessibility.",
          "Category filtering and free-text search run through a single memoized pass, with an accessible empty state. Smooth scrolling and reveals are fully reduced-motion aware.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "An e-commerce concept where art direction and checkout behaviour coexist without either dominating.",
          "The browsing path feels editorial; the purchase path feels like a product, not an afterthought.",
        ],
      },
    ],
  },
  {
    slug: "ockham",
    title: "Ockham",
    tagline:
      "A brutalist video production portfolio with a custom motion engine and an automated ad-render pipeline.",
    category: "landing",
    client: "Ockham",
    role: "Creative engineering",
    stack: "Next.js 16, TypeScript, Lenis, ffmpeg",
    year: "2026",
    metric: "360 frames → 15s MP4",
    cover: "/projects/ockham.jpg",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "The site had to feel like the work it sells: direct, heavy, and a little raw. Off-the-shelf animation libraries would have softened it.",
          "It also had to prove the company can automate production, not just describe it.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We wrote a custom motion system on Lenis — magnetic buttons, parallax offsets, text reveals, a scroll progress bar, and modal-aware scroll pausing — instead of composing one from a library.",
          "A render script generates 360 SVG frames and pipes them through ffmpeg to produce a 15-second MP4 from the command line.",
          "Open Graph images, JSON-LD, sitemap, robots, and security headers are generated for every response.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A portfolio whose animation system and content pipeline are as hand-made as the work it presents.",
          "The ad pipeline runs headless, so a new cut is a command, not a project.",
        ],
      },
    ],
  },
  {
    slug: "the-ordinary",
    title: "The Ordinary",
    tagline:
      "A clinical, ingredient-led skincare landing page with masked-line type, a working cart and search, and product-level structured data.",
    category: "landing",
    client: "The Ordinary",
    role: "Frontend engineering",
    stack: "Next.js 16, React 19, TypeScript, Lenis, JSON-LD",
    year: "2026",
    metric: "Product-level JSON-LD",
    cover: "/projects/the-ordinary.jpg",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Skincare marketing is noisy. The page had to feel scientific and honest while still moving product.",
          "Typography and restraint had to carry the argument, not stock claims.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "Slow masked-line headline reveals and clip-path image wipes are driven by a single IntersectionObserver, keeping the motion quiet and consistent.",
          "A working cart with a count badge, a search bar, and drawer panels for menu, account, and cart — all with scroll lock — handle the commerce side.",
          "Product-level JSON-LD with real pricing and a generated Open Graph image make the page richer in search results.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A landing page that reads as credible first, promotional second.",
          "The science earns the sale.",
        ],
      },
    ],
  },
  {
    slug: "parana-property-group",
    title: "Paraná Property Group",
    tagline:
      "A corporate real estate presence with a cinematic hero, a cyclic property gallery, and an accessible inquiry flow.",
    category: "landing",
    client: "Paraná Property Group",
    role: "Frontend engineering",
    stack: "Next.js 16, React 19, TypeScript, Tailwind CSS",
    year: "2026",
    metric: "Cinematic hero, cyclic gallery",
    cover: "/projects/parana.jpg",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Real estate sites bury the ask under listings and carousels. This one needed presence without friction.",
          "The developer, not just the property, had to come across.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "A cinematic hero with an active-nav state and a scroll cue guides the visitor downward instead of shouting at them.",
          "A cyclic property gallery and an inquiry modal with a success state, Escape handling, and body scroll lock handle the conversion path.",
          "Motion stays on CSS transitions and focus-visible states so the page remains fast and quiet.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A presence that sells the developer, not just the property.",
          "The path from arrival to inquiry is short and unforced.",
        ],
      },
    ],
  },
  {
    slug: "open-trip",
    title: "Open Trip",
    tagline:
      "An open-trip operator site where search and filters actually drive the trip list.",
    category: "web-app",
    client: "Open Trip",
    role: "Frontend engineering",
    stack: "Next.js 16, React 19, TypeScript, Tailwind CSS",
    year: "2026",
    metric: "Filters drive the list",
    cover: "/projects/open-trip.jpg",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Trip listing pages fail when filters are decorative. Every control on this page had to drive the results.",
          "Deciding between open trips is already hard; the interface had to make the narrowing obvious.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "A hero search bar and a destination filter bar both feed a single filtering layer over the trip list.",
          "A no-results state with a reset action and a live result count announced to screen readers keep the state legible.",
          "Trip details open in an accessible modal with a booking handoff.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Narrowing from a full list to one trip takes two deliberate clicks.",
          "The controls never pretend to work; they work.",
        ],
      },
    ],
  },
  {
    slug: "meat-master",
    title: "Meat Master",
    tagline:
      "A wood-fire restaurant site built around the two things people actually want: the menu and the reservation.",
    category: "landing",
    client: "Meat Master",
    role: "Frontend engineering",
    stack: "Next.js 16, React 19, TypeScript, Lenis, JSON-LD",
    year: "2026",
    metric: "Menu & reservation, one scroll",
    cover: "/projects/meat-master.jpg",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Restaurant sites usually bury the menu and the booking under prose. This one had to keep both one scroll away.",
          "The content is Russian-language, so routing, anchors, and copy had to behave in a different locale.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "A category-tabbed dish carousel with a working add-to-cart count and interactive delivery slot selection carries the menu.",
          "A validated reservation form with a success state sits alongside it, with hash links routed through smooth scroll.",
          "Restaurant JSON-LD, a generated Open Graph image, sitemap, and robots support local search.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A restaurant site that treats the menu as the hero and the reservation as the goal.",
          "Guests are two interactions from booking a table.",
        ],
      },
    ],
  },
  {
    slug: "luvbag-fitness",
    title: "Luvbag Fitness",
    tagline:
      "A fitness equipment storefront where customers configure before they commit.",
    category: "ecommerce",
    client: "Luvbag Fitness",
    role: "Frontend engineering",
    stack: "Next.js 16, React 19, TypeScript, Tailwind CSS, Lenis",
    year: "2026",
    metric: "Live product customizer",
    cover: "/projects/luvbag.jpg",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "Static product grids make gear feel interchangeable. The store needed a moment of configuration.",
          "A purchase should feel assembled, not just ordered.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "A product customizer where color swatches restyle the stage image and a quantity stepper updates the cart count live.",
          "Product details open in an accessible modal with focus management and scroll lock, plus a persistent cart toast.",
          "Organization, WebSite, and Product JSON-LD with real offers and availability round out the page for search engines.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A storefront that turns a purchase into a small, satisfying assembly.",
          "The customizer answers the questions customers ask in person, online.",
        ],
      },
    ],
  },
  {
    slug: "taste-of-adventure",
    title: "Taste of Adventure",
    tagline:
      "A restaurant site built around appetite: tabbed menus, parallax imagery, and an unmissable reservation.",
    category: "landing",
    client: "Taste of Adventure",
    role: "Frontend engineering",
    stack: "Next.js 16, React 19, TypeScript, Lenis",
    year: "2026",
    metric: "Tabbed menu, parallax imagery",
    cover: "/projects/taste-of-adventure.jpg",
    sections: [
      {
        heading: "Challenge",
        paragraphs: [
          "A restaurant site must feel like walking into the room, not like reading a brochure.",
          "Photography had to carry the appetite, and the reservation had to stay in reach.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "A tabbed dish menu with full ARIA tab semantics and a focus-trapped full-menu modal that pauses smooth scroll while open.",
          "Parallax on key imagery, magnetic CTAs, and a scroll progress bar, all reduced-motion aware.",
          "Every anchor link routes through smooth scroll with focus management for keyboard users.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A site with the warmth of the room and the clarity of a good menu.",
          "The reservation is always one deliberate action away.",
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
