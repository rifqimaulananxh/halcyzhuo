export const SITE = {
  name: "halcyzhuo",
  url: "https://halcyzhuo.dev",
  email: "hello@halcyzhuo.dev",
  tagline: "Engineering that ships",
  description:
    "halcyzhuo — software engineer. Full-stack development, performance, and reliable products.",
} as const;

export const NAV_LINKS = [
  { key: "work", label: "Works", href: "/work" },
  { key: "about", label: "About", href: "/about" },
  { key: "stack", label: "Stack", href: "/#stack" },
  { key: "journal", label: "Journal", href: "/journal" },
  { key: "contact", label: "Contact", href: "/#contact" },
] as const;
