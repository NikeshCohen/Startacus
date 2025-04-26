import { ReactScan } from "@/components/global/ReactScan";

import type { Metadata } from "next";
import { Sora } from "next/font/google";

import "@/app/styles/globals.css";
import { QueryProviders } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

import Background from "@/components/global/Background";
import Footer from "@/components/global/Footer";
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
      <ReactScan prodEnabled />
      <body className={`${sora.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Background />
          <Toaster />
          <Analytics />
          <QueryProviders>{children}</QueryProviders>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
