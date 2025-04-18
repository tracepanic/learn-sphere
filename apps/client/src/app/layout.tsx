import { env } from "@/env/server";
import { apiRequest } from "@/utils/api";
import { constructUrl } from "@/utils/helper";
import "@workspace/tailwind/globals.css";
import { Toaster } from "@workspace/ui/components/sonner";

interface SchoolInfo {
  name: string;
  description: string | null;
}

export async function generateMetadata() {
  const data = await apiRequest<null, SchoolInfo | null>({
    url: await constructUrl("/school/info"),
    method: "GET",
    silent: true,
    onSuccess: () => null,
    onError: () => null,
  });

  if (!data.data) return null;

  return {
    description: data.data.description,
    metadataBase: new URL(process.env.SITE_URL || ""),
    keywords: [],
    generator: "Next.js",
    applicationName: data.data.name,
    appleWebApp: {
      title: data.data.name,
    },
    title: {
      default: `${data.data.name} - LMS`,
      template: `%s | ${data.data.name}`,
    },
    openGraph: {
      url: "./",
      siteName: data.data.name,
      locale: "en_US",
      type: "website",
    },
    other: {
      "msapplication-TileColor": "#fff",
    },
    twitter: {
      site: process.env.SITE_URL || "",
    },
    alternates: {
      canonical: "./",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-title" content={env.SITE_NAME} />
      </head>
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
