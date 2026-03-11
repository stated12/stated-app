import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0f172a",
          color: "white",
          fontFamily: "sans-serif",
          padding: "60px",
          textAlign: "center",
        }}
      >

        <div style={{ fontSize: 52, fontWeight: 700, marginBottom: 30 }}>
          Stated
        </div>

        <div style={{ fontSize: 36, maxWidth: 900 }}>
          Public commitment platform
        </div>

      </div>
    ),
    size
  );
}
