import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "imatil - Browser-based File Converter",
  description: "Convert images and videos between formats directly in your browser. No uploads needed.",
  keywords: [
    "file converter",
    "image converter",
    "video converter",
    "online converter",
    "browser-based",
    "ffmpeg",
    "webassembly",
    "png",
    "jpg",
    "webp",
    "svg",
    "mp4",
    "webm",
  ],
  authors: [
    {
      name: "imatil",
      url: "https://github.com/yourusername/imatil",
    },
  ],
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
