import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter-tight";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "halcyzhuo — Software Engineer",
    template: "%s — halcyzhuo",
  },
  description: SITE.description,
  keywords: [
    "halcyzhuo",
    "software engineer",
    "full-stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Indonesia",
  ],
  authors: [{ name: "halcyzhuo", url: SITE.url }],
  creator: "halcyzhuo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "halcyzhuo — Software Engineer",
    description: SITE.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "halcyzhuo — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "halcyzhuo — Software Engineer",
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f8f8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE.url}/#website`,
                  url: SITE.url,
                  name: SITE.name,
                  description: SITE.description,
                },
                {
                  "@type": "Person",
                  "@id": `${SITE.url}/#person`,
                  name: SITE.name,
                  url: SITE.url,
                  email: `mailto:${SITE.email}`,
                  jobTitle: "Software Engineer",
                  worksFor: { "@type": "Organization", name: SITE.name },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full bg-bg text-ink font-sans">
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
