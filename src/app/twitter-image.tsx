import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt = "Clippy — Clipboard Manager for macOS";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          padding: "56px 64px",
          background:
            "linear-gradient(145deg, #f5f5f0 0%, #f0efe8 42%, #f7f6f2 100%)",
          color: "#1C1C1E",
          fontFamily: "Inter, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontWeight: 700,
            fontSize: 52,
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ fontSize: 54 }}>📋</span>
          Clippy
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 800,
            letterSpacing: "-0.045em",
            lineHeight: 1,
          }}
        >
          Clipboard, reimagined.
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 500,
            color: "rgba(28,28,30,0.72)",
          }}
        >
          Lightweight clipboard manager for macOS.
        </div>
      </div>
    ),
    size
  );
}

