export const SITE = {
  name: "halcyzhuo",
  url: "https://halcyzhuo.dev",
  email: "hello@halcyzhuo.dev",
  tagline: "Engineering that ships",
  description:
    "halcyzhuo — product engineering for teams whose MVP has become a real product. Interfaces, APIs, and infrastructure that keep working as complexity grows.",
} as const;

export const NAV_LINKS = [
  { key: "work", label: "Work", href: "/work" },
  { key: "about", label: "About", href: "/about" },
  { key: "stack", label: "Stack", href: "/#stack" },
  { key: "journal", label: "Journal", href: "/journal" },
  { key: "contact", label: "Contact", href: "/#contact" },
] as const;
