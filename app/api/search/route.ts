export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";

  if (!q) {
    return NextResponse.json({
      suggestions: [],
      top: [],
      people: [],
      companies: [],
      commitments: [],
    });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  /* PEOPLE SEARCH */

  const { data: people } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url")
    .or(`username.ilike.%${q}%,display_name.ilike.%${q}%`)
    .limit(10);

  /* COMPANY SEARCH */

  const { data: companies } = await supabase
    .from("companies")
    .select("id, username, name, logo_url")
    .or(`username.ilike.%${q}%,name.ilike.%${q}%`)
    .limit(10);

  /* COMMITMENT SEARCH */

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, user_id, company_id")
    .ilike("text", `%${q}%`)
    .eq("status", "active")
    .eq("visibility", "public")
    .limit(10);

  /* TOP RESULTS */

  const top = [
    ...(people?.slice(0, 2) || []),
    ...(companies?.slice(0, 2) || []),
  ];

  /* SUGGESTIONS */

  const suggestions = [

    ...(people || []).map((p) => ({
      type: "person",
      label: p.display_name || p.username,
      username: p.username,
    })),

    ...(companies || []).map((c) => ({
      type: "company",
      label: c.name || c.username,
      username: c.username,
    })),

    ...(commitments || []).slice(0,3).map((c) => ({
      type: "commitment",
      label: c.text?.slice(0,60) || "",
    })),

  ].slice(0,6);

  return NextResponse.json({
    suggestions,
    top,
    people: people || [],
    companies: companies || [],
    commitments: commitments || [],
  });

}
