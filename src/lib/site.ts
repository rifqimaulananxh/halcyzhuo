export const SITE = {
  name: "halcyzhuo",
  url: "https://halcyzhuo.dev",
  email: "hello@halcyzhuo.dev",
  tagline: "Engineering that ships",
  description:
    "halcyzhuo — product engineering for teams moving beyond the MVP. Interfaces, APIs, infrastructure, and systems that hold up.",
} as const;

export const NAV_LINKS = [
  { key: "work", label: "Works", href: "/work" },
  { key: "about", label: "About", href: "/about" },
  { key: "stack", label: "Stack", href: "/#stack" },
  { key: "journal", label: "Journal", href: "/journal" },
  { key: "contact", label: "Contact", href: "/#contact" },
] as const;
