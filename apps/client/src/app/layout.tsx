import "@workspace/tailwind/globals.css";
import { Toaster } from "@workspace/ui/components/sonner";
import { Metadata } from "next";

export const metadata: Metadata = {};

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
