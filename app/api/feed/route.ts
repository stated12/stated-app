import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type CommitmentRow = {
  id: string;
  status: "completed" | "active" | "withdrawn" | "expired";
  views: number | null;
};

async function calculateReputation(
  supabase: any,
  userId?: string,
  companyId?: string
) {
  let baseQuery = supabase
    .from("commitments")
    .select("id, status, views")
    .eq("visibility", "public");

  if (companyId) {
    baseQuery = baseQuery.eq("company_id", companyId);
  } else if (userId) {
    baseQuery = baseQuery.eq("user_id", userId);
  }

  const { data } = await baseQuery;
  const commitments: CommitmentRow[] = data ?? [];

  if (commitments.length === 0) {
    return { badge: "Beginner" };
  }

  const completed = commitments.filter(
    (c) => c.status === "completed"
  ).length;

  const active = commitments.filter(
    (c) => c.status === "active"
  ).length;

  const withdrawn = commitments.filter(
    (c) => c.status === "withdrawn"
  ).length;

  const commitmentIds = commitments.map((c) => c.id);

  let updatesCount = 0;

  if (commitmentIds.length > 0) {
    const { count } = await supabase
      .from("commitment_updates")
      .select("*", { count: "exact", head: true })
      .in("commitment_id", commitmentIds);

    updatesCount = count ?? 0;
  }

  const totalViews = commitments.reduce(
    (sum, c) => sum + (c.views || 0),
    0
  );

  const viewsBonus = Math.floor(totalViews / 50);

  const total = completed + active + withdrawn;
  const completionRate =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  let rateBonus = 0;
  if (completionRate >= 80) rateBonus = 10;
  else if (completionRate >= 60) rateBonus = 5;

  const score =
    completed * 10 +
    active * 2 +
    updatesCount * 2 +
    viewsBonus -
    withdrawn * 5 +
    rateBonus;

  let badge = "Beginner";
  if (score >= 200) badge = "Trusted";
  else if (score >= 100) badge = "Leader";
  else if (score >= 50) badge = "Operator";
  else if (score >= 20) badge = "Builder";

  return { badge };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type") || "latest";
  const category = searchParams.get("category");
  const cursor = searchParams.get("cursor");

  // ✅ Support q parameter (used by search page)
  const searchQuery = searchParams.get("q");

  const supabase = await createClient();

  let query = supabase
    .from("commitments")
    .select(`
      id,
      text,
      category,
      created_at,
      views,
      user_id,
      company_id,
      profiles:user_id (
        username,
        display_name,
        avatar_url
      ),
      companies:company_id (
        username,
        name,
        logo_url
      )
    `)
    .eq("status", "active")
    .limit(25);

  // Order
  if (type === "trending") {
    query = query.order("views", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  // Category
  if (category) {
    query = query.eq("category", category);
  }

  // Cursor pagination
  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  // ✅ TEXT SEARCH
  if (searchQuery) {
    query = query.ilike("text", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Feed error:", error);
    return NextResponse.json([]);
  }

  const formatted = await Promise.all(
    data.map(async (c: any) => {
      if (c.company_id && c.companies) {
        const reputation = await calculateReputation(
          supabase,
          undefined,
          c.company_id
        );

        return {
          id: c.id,
          text: c.text,
          category: c.category,
          created_at: c.created_at,
          views: c.views ?? 0,
          identity: {
            username: c.companies.username,
            display_name: c.companies.name,
            avatar_url: c.companies.logo_url,
            type: "company",
            badge: reputation.badge,
          },
        };
      }

      const reputation = await calculateReputation(
        supabase,
        c.user_id,
        undefined
      );

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
          badge: reputation.badge,
        },
      };
    })
  );

  return NextResponse.json(formatted);
}
