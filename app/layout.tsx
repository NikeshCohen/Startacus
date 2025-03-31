import { ReactScan } from "@/components/global/ReactScan";

import type { Metadata } from "next";
import { Sora } from "next/font/google";

import "@/app/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

import Background from "@/components/global/Background";
import Footer from "@/components/global/Footer";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s / Startacus – Full-Stack Starter Kit",
    absolute: "Startacus – The Ultimate Full-Stack Starter Kit",
  },
  description:
    "A full-stack starter kit using the best tech out there. Fast, scalable, and ready for battle.",
  icons: [{ rel: "icon", url: "/icon(white).png" }],
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
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
