import { ImageResponse } from "next/og";

// Branded social-share card, generated at request time so every link preview
// carries the wordmark instead of a bare URL. Matches the site's dark canvas
// and the sky→emerald→indigo gradient used by the homepage wordmark.

export const alt =
  "Sapiens Scientia — a public knowledge project mapping human health, society, Earth systems, and digital knowledge.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 22% 18%, #0b2a3a 0%, #000 55%), #000",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#7dd3fc",
          }}
        >
          Public knowledge project
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -2,
            backgroundImage: "linear-gradient(90deg, #38bdf8, #34d399, #818cf8)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Sapiens Scientia
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 38,
            fontSize: 38,
            lineHeight: 1.3,
            maxWidth: 1000,
            color: "#cbd5e1",
          }}
        >
          Mapping human health, society, Earth systems, and digital knowledge —
          from cells to the planet.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 24,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#64748b",
          }}
        >
          Particles → the Sun
        </div>
      </div>
    ),
    { ...size },
  );
}
