import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Force static rendering
export const dynamic = 'force-static'
export const revalidate = false
export const fetchCache = 'force-cache'

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://i.baris.pw'),
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
  robots: "index, follow",
  openGraph: {
    type: 'website',
    siteName: 'imatil',
    title: 'imatil - Browser-based File Converter',
    description: 'Convert images and videos between formats directly in your browser.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'imatil - Browser-based File Converter',
    description: 'Convert images and videos between formats directly in your browser.',
  },
  verification: {
    google: 'your-google-site-verification',
  },
  other: {
    'google-site-verification': 'your-google-site-verification',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'imatil',
  description: 'Browser-based file converter for images and videos',
  url: 'https://i.baris.pw',
  applicationCategory: 'Multimedia',
  operatingSystem: 'Any',
  browserRequirements: 'Requires modern browser with WebAssembly support',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Image format conversion',
    'Video format conversion',
    'Browser-based processing',
    'No file upload required',
    'Free to use',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
