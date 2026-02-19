import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.clippyapp.live/sitemap.xml",
    host: "https://www.clippyapp.live",
  };
}
