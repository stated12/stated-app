import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");
  const q = searchParams.get("q");

  const supabase = await createClient();

  let query = supabase
    .from("commitments")
    .select(`
      id,
      text,
      status,
      created_at,
      user_id,
      profiles (
        username,
        display_name,
        avatar_url,
        plan_key
      )
    `)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(25);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  if (q) {
    query = query.or(
      `text.ilike.%${q}%,profiles.username.ilike.%${q}%,profiles.display_name.ilike.%${q}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const commitmentIds = data?.map((c) => c.id) || [];

  let viewCounts: Record<string, number> = {};

  if (commitmentIds.length > 0) {
    const { data: views } = await supabase
      .from("commitment_views")
      .select("commitment_id")
      .in("commitment_id", commitmentIds);

    viewCounts =
      views?.reduce((acc: any, v) => {
        acc[v.commitment_id] = (acc[v.commitment_id] || 0) + 1;
        return acc;
      }, {}) || {};
  }

  const result =
    data?.map((c) => ({
      ...c,
      views: viewCounts[c.id] || 0,
    })) || [];

  return NextResponse.json(result);
}
