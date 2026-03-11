import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params;

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
          textAlign: "center"
        }}
      >

        <div style={{ fontSize: 52, fontWeight: 700, marginBottom: 30 }}>
          Stated
        </div>

        <div style={{ fontSize: 34, maxWidth: 900 }}>
          Commitment preview card
        </div>

        <div style={{ fontSize: 26, marginTop: 40, color: "#93c5fd" }}>
          ID: {id}
        </div>

        <div style={{ fontSize: 22, marginTop: 30, opacity: 0.7 }}>
          Public commitment platform
        </div>

      </div>
    ),
    { width: 1200, height: 630 }
  );
}
