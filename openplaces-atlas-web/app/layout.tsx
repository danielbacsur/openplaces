import { type ReactNode } from "react";

import localFont from "next/font/local";

import "./globals.css";

const googleSans = localFont({
  variable: "--font-google-sans",
  src: "./_fonts/google-sans-latin.woff2",
  display: "block",
  weight: "400 700",
});

const materialSymbols = localFont({
  src: "./_fonts/material-symbols-outlined.woff2",
  variable: "--font-material-symbols",
  display: "block",
  weight: "400",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${materialSymbols.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

export * from "./metadata";
