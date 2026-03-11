import { ImageResponse } from "next/og"
import { createClient } from "@/lib/supabase/server"

export const runtime = "edge"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params

  const supabase = await createClient()

  const { data: commitment } = await supabase
    .from("commitments")
    .select(`
      text,
      user_id,
      company_id,
      profiles(display_name,username),
      companies(name,username)
    `)
    .eq("id", id)
    .maybeSingle()

  if (!commitment) {

    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0f172a",
            color: "white",
            fontSize: 48
          }}
        >
          Stated
        </div>
      ),
      { width: 1200, height: 630 }
    )

  }

  const identity =
    commitment.company_id
      ? commitment.companies?.name
      : commitment.profiles?.display_name ||
        commitment.profiles?.username

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0f172a",
          color: "white",
          fontFamily: "sans-serif"
        }}
      >

        <div style={{ fontSize: 48, fontWeight: 700, marginBottom: 40 }}>
          Stated
        </div>

        <div style={{ fontSize: 42, lineHeight: 1.3, maxWidth: 900 }}>
          {commitment.text}
        </div>

        <div style={{ fontSize: 32, marginTop: 40, color: "#93c5fd" }}>
          — {identity}
        </div>

        <div style={{ fontSize: 24, marginTop: 40, opacity: 0.7 }}>
          Public commitment platform
        </div>

      </div>
    ),
    { width: 1200, height: 630 }
  )

}
