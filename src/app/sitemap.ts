import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ["/", "/work", "/journal", "/about"].map(
    (route) => ({
      url: new URL(route, SITE.url).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "/" ? 1 : 0.8,
    })
  );

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: new URL(`/work/${p.slug}`, SITE.url).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: new URL(`/journal/${p.slug}`, SITE.url).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
