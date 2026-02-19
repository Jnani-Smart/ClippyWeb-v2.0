import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STATIC_FILE_EXT = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = (request.headers.get("host") || "")
    .toLowerCase()
    .split(":")[0];

  // Always canonicalize the apex to www for consistent indexing and caching.
  if (host === "clippyapp.live") {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.hostname = "www.clippyapp.live";
    return NextResponse.redirect(url, 308);
  }

  const isNextAsset =
    pathname.startsWith("/_next/static") || pathname.startsWith("/_next/image");
  const isStaticFile = STATIC_FILE_EXT.test(pathname);

  if (isNextAsset || isStaticFile) {
    return NextResponse.next();
  }

  // Ensure HTML/doc responses always revalidate so users do not keep old app shells.
  const response = NextResponse.next();
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  // Prevent duplicate indexing for deployment aliases/previews.
  if (host.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }
  return response;
}

export const config = {
  matcher: "/:path*",
};
