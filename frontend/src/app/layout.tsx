import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PreviewListener } from "@/components/PreviewListener";
import { getSiteConfig } from "@/lib/strapi";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velocity — Accelerate Your Digital Transformation",
  description: "Build modern, scalable web applications with Velocity. Ship faster, iterate smarter, and delight your customers.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let siteConfig = null;
  try {
    siteConfig = await getSiteConfig();
  } catch {
    // Strapi may not be running during build
  }

  const draft = await draftMode();

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-900`}>
        {draft.isEnabled && <PreviewListener />}
        <Header siteConfig={siteConfig} />
        <main className="min-h-screen">{children}</main>
        <Footer siteConfig={siteConfig} />
      </body>
    </html>
  );
}
