import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type") || "latest";
    const category = searchParams.get("category");
    const cursor = searchParams.get("cursor");
    const searchQuery = searchParams.get("q");

    const supabase = getSupabase();

    let query = supabase
      .from("commitments")
      .select("*")
      .eq("status", "active")
      .eq("visibility", "public")
      .limit(25)
      .order("created_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    if (cursor) {
      query = query.lt("created_at", cursor);
    }

    if (searchQuery) {
      query = query.ilike("text", `%${searchQuery}%`);
    }

    const { data: commitments, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message });
    }

    if (!commitments || commitments.length === 0) {
      return NextResponse.json([]);
    }

    const userIds = [
      ...new Set(commitments.map((c: any) => c.user_id).filter(Boolean)),
    ];

    const companyIds = [
      ...new Set(commitments.map((c: any) => c.company_id).filter(Boolean)),
    ];

    const commitmentIds = commitments.map((c: any) => c.id);

    // -----------------------------
    // fetch profiles
    // -----------------------------

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_url")
      .in("id", userIds);

    const profileMap: any = {};
    profiles?.forEach((p: any) => {
      profileMap[p.id] = p;
    });

    // -----------------------------
    // fetch companies
    // -----------------------------

    const { data: companies } = await supabase
      .from("companies")
      .select("id, username, name, logo_url")
      .in("id", companyIds);

    const companyMap: any = {};
    companies?.forEach((c: any) => {
      companyMap[c.id] = c;
    });

    // -----------------------------
    // fetch view counts
    // -----------------------------

    const { data: viewRows } = await supabase
      .from("commitment_views")
      .select("commitment_id")
      .in("commitment_id", commitmentIds);

    const viewCount: any = {};

    viewRows?.forEach((v: any) => {
      viewCount[v.commitment_id] =
        (viewCount[v.commitment_id] || 0) + 1;
    });

    // -----------------------------
    // build feed
    // -----------------------------

    const feed = commitments.map((c: any) => {
      let identity: any = null;

      if (c.company_id) {
        const company = companyMap[c.company_id];

        identity = {
          username: company?.username || "company",
          display_name: company?.name || "Company",
          avatar_url: company?.logo_url || null,
          type: "company",
        };
      } else {
        const profile = profileMap[c.user_id];

        identity = {
          username: profile?.username || "user",
          display_name: profile?.display_name || profile?.username || "User",
          avatar_url: profile?.avatar_url || null,
          type: "user",
        };
      }

      return {
        id: c.id,
        text: c.text,
        category: c.category,
        created_at: c.created_at,
        views: viewCount[c.id] || 0,
        identity,
      };
    });

    return NextResponse.json(feed);
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
    });
  }
}
