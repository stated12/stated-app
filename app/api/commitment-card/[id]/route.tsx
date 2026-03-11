import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params;

  const supabase = await createClient();

  const { data: commitment } = await supabase
    .from("commitments")
    .select("id,text,user_id,company_id")
    .eq("id", id)
    .maybeSingle();

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
    );
  }

  let identity = "User";

  if (commitment.company_id) {

    const { data: company } = await supabase
      .from("companies")
      .select("name")
      .eq("id", commitment.company_id)
      .maybeSingle();

    identity = company?.name || "Company";

  } else if (commitment.user_id) {

    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name,username")
      .eq("id", commitment.user_id)
      .maybeSingle();

    identity = profile?.display_name || profile?.username || "User";

  }

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
  );

}
