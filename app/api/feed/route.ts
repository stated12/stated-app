import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");

  let query = supabase
    .from("commitments")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(25);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  const { data: commitments, error } = await query;

  if (error) {
    return NextResponse.json([], { status: 500 });
  }

  if (!commitments || commitments.length === 0) {
    return NextResponse.json([]);
  }

  const userOwnerIds = commitments
    .filter((c) => c.owner_type === "user")
    .map((c) => c.owner_id);

  const companyOwnerIds = commitments
    .filter((c) => c.owner_type === "company")
    .map((c) => c.owner_id);

  const { data: profiles } = userOwnerIds.length
    ? await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url, plan_key")
        .in("id", userOwnerIds)
    : { data: [] };

  const { data: companies } = companyOwnerIds.length
    ? await supabase
        .from("companies")
        .select("id, username, name, avatar_url, plan_key")
        .in("id", companyOwnerIds)
    : { data: [] };

  const feed = commitments.map((c) => {
    let identity: any = null;

    if (c.owner_type === "user") {
      const profile = profiles?.find((p) => p.id === c.owner_id);
      if (profile) {
        identity = {
          username: profile.username,
          display_name: profile.display_name,
          avatar_url: profile.avatar_url,
          plan_key: profile.plan_key,
          type: "user",
        };
      }
    }

    if (c.owner_type === "company") {
      const company = companies?.find((co) => co.id === c.owner_id);
      if (company) {
        identity = {
          username: company.username,
          display_name: company.name,
          avatar_url: company.avatar_url,
          plan_key: company.plan_key,
          type: "company",
        };
      }
    }

    return {
      id: c.id,
      text: c.text,
      status: c.status,
      created_at: c.created_at,
      views: c.views ?? 0,
      identity,
    };
  });

  return NextResponse.json(feed);
}
