import { env } from "@/env/server";
import "@workspace/tailwind/globals.css";
import { Toaster } from "@workspace/ui/components/sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: env.SITE_DESCRIPTION,
  metadataBase: new URL(env.SITE_URL),
  keywords: [],
  generator: "Next.js",
  applicationName: env.SITE_NAME,
  appleWebApp: {
    title: env.SITE_NAME,
  },
  title: {
    default: `${env.SITE_NAME} - LMS`,
    template: `%s | ${env.SITE_NAME}`,
  },
  openGraph: {
    url: "./",
    siteName: env.SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  other: {
    "msapplication-TileColor": "#fff",
  },
  twitter: {
    site: env.SITE_URL,
  },
  alternates: {
    canonical: "./",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-title" content="Learn Sphere" />
      </head>
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
