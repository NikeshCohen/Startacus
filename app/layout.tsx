import type { Metadata } from "next";
import { Sora } from "next/font/google";

import "@/app/globals.css";

import Background from "@/components/global/Background";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
