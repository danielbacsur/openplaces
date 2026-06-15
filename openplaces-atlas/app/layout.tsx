import { type ReactNode } from "react";

import { Google_Sans } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
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
