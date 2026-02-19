import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt = "Clippy — Clipboard Manager for macOS";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
            gap: 20,
            fontWeight: 700,
            fontSize: 54,
            letterSpacing: "-0.03em",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            📋
          </div>
          Clippy
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontSize: 86,
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
            Instant history, quick search, privacy-first on macOS.
          </div>
        </div>
      </div>
    ),
    size
  );
}

