import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

// Bricolage Grotesque (display + body, variable width/optical size),
// Instrument Serif italics for accent words, Geist Mono for small labels.
const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz", "wdth"], variable: "--f-d", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--f-s", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--f-m", display: "swap" });

export const metadata: Metadata = {
  title: "MoonKalp · CreativeFlow Studio",
  description: "Motion graphics, video, social media, Meta ads, SEO, websites and custom web software, all under one roof.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#07070a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll />
        <Intro />
        <Cursor />
        <Header />
        <main>{children}</main>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
