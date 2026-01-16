import portfolioData from "@/lib/config/portfolio-data";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const primaryFont = localFont({
  src: "../public/fonts/WorkSans.ttf",
  variable: "--font-primary",
});

const monoramaFont = localFont({
  src: "../public/fonts/Monorama.ttf",
  variable: "--font-monorama",
});

const monumentFont = localFont({
  src: "../public/fonts/MonumentExtended.otf",
  variable: "--font-monument",
});

export const metadata: Metadata = {
  title: `${portfolioData.personalInfo.firstName} ${portfolioData.personalInfo.lastName}`,
  description: portfolioData.content.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="2xl:scroll-stable">
      <body
        className={`${monumentFont.variable} ${monoramaFont.variable} ${primaryFont.variable} antialiased selection:bg-accent selection:text-background text-foreground bg-background font-primary`}
      >
        {children}
      </body>
    </html>
  );
}
