import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "imatil - Browser-based File Converter",
  description: "Convert images and videos between formats directly in your browser. Supports PNG, JPG, WebP, SVG, MP4, WebM, and more.",
  keywords: [
    "file converter",
    "image converter",
    "video converter",
    "online converter",
    "browser-based",
    "FFmpeg",
    "WebAssembly",
    "PNG",
    "JPG",
    "WebP",
    "SVG",
    "MP4",
    "WebM",
  ],
  authors: [{ name: "byigitt" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
