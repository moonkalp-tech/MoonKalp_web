
import type { Metadata, Viewport } from "next";

import type { Metadata } from "next";

import { Archivo, Noto_Sans, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";

// McLaren Sans is proprietary, so these are the closest free stand-ins:
// Archivo (wide axis) for display, Noto Sans for UI/body.
const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--f-d", display: "swap" });
const body = Noto_Sans({ subsets: ["latin"], variable: "--f-b", display: "swap" });

const hand = Caveat({ subsets: ["latin"], variable: "--f-h", display: "swap" });

export const metadata: Metadata = {
  title: "MoonKalp · CreativeFlow Studio",
  description: "Motion graphics, video, social media, Meta ads, SEO, websites and custom web software, all under one roof.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0a0a0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hand.variable}`}>
      <body>
        <Preloader />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
