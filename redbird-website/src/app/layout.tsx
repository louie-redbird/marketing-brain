import type { Metadata } from "next";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

import "@fontsource/outfit/700.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/caveat/400.css";
import "@fontsource/caveat/500.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "Redbird — Your marketing, sorted.",
  description:
    "AI-powered marketing for Australian SMEs. Enterprise-quality strategy and execution at SME-friendly prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
