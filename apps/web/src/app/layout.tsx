import "@workspace/tailwind/globals.css";

import { Metadata } from "next";
import { Presentation } from "lucide-react";
import { Footer, Layout, Navbar } from "nextra-theme-docs";

import "nextra-theme-docs/style.css";

import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";

export const metadata: Metadata = {
  description:
    "Empower your educational journey with a free, flexible, and feature-rich platform built by the community, for the community.",
  metadataBase: new URL("https://learn-sphere-web.vercel.app"),
  keywords: [
    "Open source LMS",
    "Free learning management system",
    "Best LMS for education",
    "Educational platform software",
    "Online course management",
    "E-learning platform open source",
    "Student management system",
    "Learning analytics tools",
    "Secure LMS platform",
    "Educational content management system",
  ],
  generator: "Next.js",
  applicationName: "Learn Sphere",
  appleWebApp: {
    title: "Learn Sphere",
  },
  title: {
    default: "Learn Sphere - FOSS LMS",
    template: "%s | Learn Sphere",
  },
  openGraph: {
    url: "./",
    siteName: "Learn Sphere",
    locale: "en_US",
    type: "website",
  },
  other: {
    "msapplication-TileColor": "#fff",
  },
  twitter: {
    site: "https://learn-sphere-web.vercel.app",
  },
  alternates: {
    canonical: "./",
  },
};

const banner = (
  <Banner storageKey="main-manner">
    🚧 There are breaking changes. This is pre alpha.
  </Banner>
);

const navbar = (
  <Navbar
    projectLink="https://github.com/tracepanic/learn-sphere"
    logo={
      <div className="flex items-center gap-2">
        <Presentation />
        <p className="text-2xl">LS</p>
      </div>
    }
  />
);

const footer = (
  <Footer>AGPL 3.0 {new Date().getFullYear()} © Learn Sphere.</Footer>
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-title" content="Learn Sphere" />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/tracepanic/learn-sphere/tree/main/apps/web"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
