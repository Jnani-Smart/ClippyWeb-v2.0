import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.clippyapp.live";
const vercelUrl = "https://clippyapp.vercel.app";
const siteName = "Clippy";
const siteDescription =
  "A lightweight, beautiful clipboard manager for macOS. Store text, URLs, code snippets, and images. Instant access with ⌘⇧V. Privacy-focused — your data never leaves your device.";
const ogImagePath = "/opengraph-image.png";
const twitterImagePath = "/twitter-image.png";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  inLanguage: "en-US",
  description: siteDescription,
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteName,
  operatingSystem: "macOS",
  applicationCategory: "UtilitiesApplication",
  description: siteDescription,
  url: siteUrl,
  downloadUrl: `${siteUrl}/download/latest`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  sameAs: [vercelUrl, "https://github.com/Jnani-Smart/Clippy"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F5F0" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Clippy - Clipboard Manager for macOS",
    template: "%s | Clippy",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  applicationName: siteName,
  manifest: "/manifest.webmanifest",
  authors: [{ name: "Jnani Smart", url: "https://github.com/Jnani-Smart" }],
  creator: "Jnani Smart",
  publisher: siteName,
  category: "productivity",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "default",
  },
  keywords: [
    "clipboard manager",
    "macOS clipboard",
    "clipboard history",
    "copy paste manager",
    "mac productivity app",
    "clipboard tool",
    "clipboard snippets",
    "⌘⇧V",
    "free clipboard manager",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Clippy — Clipboard Manager for macOS",
    description: siteDescription,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: "Clippy — Clipboard Manager for macOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clippy — Clipboard Manager for macOS",
    description: siteDescription,
    images: [twitterImagePath],
  },
  icons: {
    icon: "/icon.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                if (!('serviceWorker' in navigator)) return;
                window.addEventListener('load', function () {
                  navigator.serviceWorker.getRegistrations().then(function (regs) {
                    regs.forEach(function (reg) { reg.unregister(); });
                  }).catch(function () {});
                });
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
