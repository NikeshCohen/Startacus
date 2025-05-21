import { ReactScan } from "@/components/global/ReactScan";

import type { Metadata } from "next";
import { Sora } from "next/font/google";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import "@/app/styles/globals.css";
import { QueryProviders } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Analytics } from "@vercel/analytics/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ErrorBoundary } from "react-error-boundary";
import { extractRouterConfig } from "uploadthing/server";

import ErrorFallback from "@/components/global/ErrorFalback";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import Toaster from "@/components/global/Toaster";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://startacus.vercel.app"),
  title: {
    template: "%s / Startacus – Full-Stack Starter Kit",
    absolute: "Startacus – The Ultimate Full-Stack Starter Kit",
  },
  description:
    "A full-stack starter kit using the best tech out there. Fast, scalable, and ready for battle.",
  icons: [{ rel: "icon", url: "/icon(white).png" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: new URL("https://startacus.vercel.app"),
    siteName: "Startacus",
    title: "Startacus – The Ultimate Full-Stack Starter Kit",
    description:
      "A full-stack starter kit using the best tech out there. Fast, scalable, and ready for battle.",
    images: [
      {
        url: "/og_image.png",
        alt: "Startacus – The Ultimate Full-Stack Starter Kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Startacus – The Ultimate Full-Stack Starter Kit",
    description:
      "A full-stack starter kit using the best tech out there. Fast, scalable, and ready for battle.",
    creator: "@nikeshcohen",
    images: ["/og_image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactScan />
      <body className={`${sora.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Toaster />
          <Analytics />
          <QueryProviders>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <NuqsAdapter>
                <Header />
                {children}
                <Footer />
              </NuqsAdapter>
            </ErrorBoundary>
          </QueryProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
