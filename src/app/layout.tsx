import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { CursorProvider, CustomCursor } from "@/components/CustomCursor";
import { PagePreload } from "@/components/PagePreload";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Spotlight } from "@/components/Spotlight";
import { PageTransition } from "@/components/PageTransition";
import { SectionEntrance } from "@/components/SectionEntrance";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: {
    default: "halcyzhuo — Engineering Studio",
    template: "%s — halcyzhuo",
  },
  description: SITE.description,
  keywords: [
    "halcyzhuo",
    "engineering studio",
    "full-stack development",
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
    title: "halcyzhuo — Engineering Studio",
    description: SITE.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "halcyzhuo — Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "halcyzhuo — Engineering Studio",
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
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.prod.website-files.com"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js','is-loading')" }} />
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
                  "@type": "Organization",
                  "@id": `${SITE.url}/#org`,
                  name: SITE.name,
                  url: SITE.url,
                  email: `mailto:${SITE.email}`,
                  description: SITE.description,
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full bg-bg text-ink font-sans">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <Preloader />
        <Spotlight />
        <ScrollProgress />
        <PageTransition />
        <SectionEntrance />
        <CursorProvider>
          <CustomCursor />
          <PagePreload />
          <Nav />
          {children}
          <Footer />
        </CursorProvider>
      </body>
    </html>
  );
}
