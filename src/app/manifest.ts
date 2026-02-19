import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Clippy - Clipboard Manager for macOS",
    short_name: "Clippy",
    description:
      "A lightweight, beautiful clipboard manager for macOS with instant history access.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F5F0",
    theme_color: "#F5F5F0",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

