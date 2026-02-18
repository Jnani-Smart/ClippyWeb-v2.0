import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://clippyapp.live";
const siteName = "Clippy";
const siteDescription =
  "A lightweight, beautiful clipboard manager for macOS. Store text, URLs, code snippets, and images. Instant access with ⌘⇧V. Privacy-focused — your data never leaves your device.";

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
  title: {
    default: "Clippy - Clipboard Manager for macOS",
    template: "%s | Clippy",
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors: [{ name: "Jnani Smart", url: "https://github.com/Jnani-Smart" }],
  creator: "Jnani Smart",
  publisher: siteName,
  category: "productivity",
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
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Clippy — Clipboard Manager for macOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clippy — Clipboard Manager for macOS",
    description: siteDescription,
    images: ["/logo.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
