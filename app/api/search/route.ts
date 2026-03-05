export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";

  if (!q) {
    return NextResponse.json({
      top: [],
      people: [],
      companies: [],
      commitments: [],
    });
  }

  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, account_type")
    .or(`username.ilike.%${q}%,display_name.ilike.%${q}%`)
    .limit(10);

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, user_id")
    .ilike("text", `%${q}%`)
    .limit(10);

  const people =
    profiles?.filter((p) => p.account_type !== "company") || [];

  const companies =
    profiles?.filter((p) => p.account_type === "company") || [];

  const top = [
    ...(people.slice(0, 2)),
    ...(companies.slice(0, 2)),
  ];

  return NextResponse.json({
    top,
    people,
    companies,
    commitments: commitments || [],
  });
}
