import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

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

        <div style={{ fontSize: 34 }}>
          Public commitment platform
        </div>

        <div style={{ fontSize: 26, marginTop: 40, color: "#93c5fd" }}>
          Commitment ID
        </div>

        <div style={{ fontSize: 22, marginTop: 10 }}>
          {id}
        </div>

      </div>
    ),
    size
  );
}
