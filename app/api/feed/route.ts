import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function calculateBadge(score: number) {
  if (score >= 200) return "Trusted";
  if (score >= 100) return "Leader";
  if (score >= 50) return "Operator";
  if (score >= 20) return "Builder";
  return "Beginner";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type") || "latest";
  const category = searchParams.get("category");
  const cursor = searchParams.get("cursor");
  const search = searchParams.get("search");

  const supabase = await createClient();

  let query = supabase
    .from("commitments")
    .select(
      `
      id,
      text,
      category,
      created_at,
      views,
      status,
      user_id,
      company_id,
      profiles:user_id (
        id,
        username,
        display_name,
        avatar_url,
        plan_key
      ),
      companies:company_id (
        id,
        username,
        name,
        avatar_url
      )
    `
    )
    .eq("status", "active")
    .limit(25);

  if (search) {
    query = query.ilike("text", `%${search}%`);
  }

  if (category) {
    query = query.eq("category", category);
  }

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  if (type === "trending") {
    query = query.order("views", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json([]);
  }

  const formatted =
    data?.map((c: any) => {
      const score = (c.views ?? 0) + 10; // lightweight proxy

      const badge = calculateBadge(score);

      if (c.company_id && c.companies) {
        return {
          id: c.id,
          text: c.text,
          category: c.category,
          created_at: c.created_at,
          views: c.views ?? 0,
          identity: {
            username: c.companies.username,
            display_name: c.companies.name,
            avatar_url: c.companies.avatar_url,
            type: "company",
            badge,
          },
        };
      }

      return {
        id: c.id,
        text: c.text,
        category: c.category,
        created_at: c.created_at,
        views: c.views ?? 0,
        identity: {
          username: c.profiles?.username,
          display_name: c.profiles?.display_name,
          avatar_url: c.profiles?.avatar_url,
          type: "user",
          badge,
        },
      };
    }) || [];

  return NextResponse.json(formatted);
}
