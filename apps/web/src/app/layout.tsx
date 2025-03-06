import "@workspace/tailwind/globals.css";

import { Presentation } from "lucide-react";
import { Footer, Layout, Navbar } from "nextra-theme-docs";

import "nextra-theme-docs/style.css";

import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";

export const metadata = {};

const banner = (
  <Banner storageKey="main-manner">
    🚧 There are breaking changes. This is pre alpha.
  </Banner>
);

const navbar = (
  <Navbar
    logo={
      <div className="flex items-center gap-2">
        <Presentation />
        <p className="text-2xl">SL</p>
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
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/tracepanic/learn-sphere/tree/main/apps/web"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
