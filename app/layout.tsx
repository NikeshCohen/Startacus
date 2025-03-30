import type { Metadata } from "next";
import { Sora } from "next/font/google";

import "@/app/styles/globals.css";

import Background from "@/components/global/Background";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s / Startacus – Full-Stack Starter Kit",
    absolute: "Startacus – The Ultimate Full-Stack Starter Kit",
  },
  description:
    "A full-stack starter kit using the best tech out there. Fast, scalable, and ready for battle.",
  icons: [{ rel: "icon", url: "/icon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} antialiased`}>
        <Background />
        {children}
      </body>
    </html>
  );
}
