import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");
  const q = searchParams.get("q");

  const supabase = await createClient();

  let query = supabase
    .from("commitments")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(25);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  if (q) {
    query = query.ilike("text", `%${q}%`);
  }

  const { data: commitments, error } = await query;

  if (error) {
    return NextResponse.json([]);
  }

  if (!commitments || commitments.length === 0) {
    return NextResponse.json([]);
  }

  const userIds = commitments
    .filter((c) => c.owner_type === "user")
    .map((c) => c.owner_id);

  const companyIds = commitments
    .filter((c) => c.owner_type === "company")
    .map((c) => c.owner_id);

  const { data: users } =
    userIds.length > 0
      ? await supabase
          .from("profiles")
          .select("id, username, display_name, avatar_url, plan_key, deleted_at")
          .in("id", userIds)
      : { data: [] };

  const { data: companies } =
    companyIds.length > 0
      ? await supabase
          .from("companies")
          .select("id, username, name, avatar_url, deleted_at")
          .in("id", companyIds)
      : { data: [] };

  const result = commitments.map((c) => {
    if (c.owner_type === "user") {
      const user = users?.find((u) => u.id === c.owner_id);

      return {
        id: c.id,
        text: c.text,
        created_at: c.created_at,
        views: c.views,
        owner_type: "user",
        author: {
          username: user?.username || "deleted",
          display_name:
            user?.deleted_at ? "Deleted User" : user?.display_name || user?.username,
          avatar_url: user?.avatar_url,
          plan_key: user?.plan_key,
        },
      };
    } else {
      const company = companies?.find((co) => co.id === c.owner_id);

      return {
        id: c.id,
        text: c.text,
        created_at: c.created_at,
        views: c.views,
        owner_type: "company",
        author: {
          username: company?.username || "deleted",
          display_name:
            company?.deleted_at ? "Deleted Company" : company?.name,
          avatar_url: company?.avatar_url,
          plan_key: null,
        },
      };
    }
  });

  return NextResponse.json(result);
}
