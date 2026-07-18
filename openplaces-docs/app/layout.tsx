import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { source } from "@/lib/source";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans">
        <RootProvider>
          <DocsLayout
            tree={source.getPageTree()}
            nav={{ title: "OpenPlaces" }}
            githubUrl="https://github.com/danielbacsur/openplaces"
          >
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}

export * from "./metadata";
