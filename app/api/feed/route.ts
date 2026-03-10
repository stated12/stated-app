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
    const userHandle = searchParams.get("user");
    const companyHandle = searchParams.get("company");

    const supabase = getSupabase();

    let query = supabase
      .from("commitments")
      .select("*")
      .eq("status", "active")
      .eq("visibility", "public")
      .limit(25);

    /* ---------- ORDERING ---------- */

    if (type === "latest") {
      query = query.order("created_at", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    /* ---------- CATEGORY FILTER ---------- */

    if (category) {
      query = query.eq("category", category);
    }

    /* ---------- CURSOR PAGINATION ---------- */

    if (cursor) {
      query = query.lt("created_at", cursor);
    }

    /* ---------- SEARCH ---------- */

    if (searchQuery) {
      query = query.ilike("text", `%${searchQuery}%`);
    }

    /* ---------- USER PROFILE FILTER ---------- */

    if (userHandle) {

      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", userHandle)
        .maybeSingle();

      if (profile) {
        query = query.eq("user_id", profile.id);
      }

    }

    /* ---------- COMPANY FILTER ---------- */

    if (companyHandle) {

      const { data: companyRow } = await supabase
        .from("companies")
        .select("id")
        .eq("username", companyHandle)
        .maybeSingle();

      if (companyRow) {
        query = query.eq("company_id", companyRow.id);
      }

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

    /* ---------- FETCH PROFILES ---------- */

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_url")
      .in("id", userIds);

    const profileMap: any = {};

    profiles?.forEach((p: any) => {
      profileMap[p.id] = p;
    });

    /* ---------- FETCH COMPANIES ---------- */

    const { data: companies } = await supabase
      .from("companies")
      .select("id, username, name, logo_url")
      .in("id", companyIds);

    const companyMap: any = {};

    companies?.forEach((c: any) => {
      companyMap[c.id] = c;
    });

    /* ---------- FETCH VIEW COUNTS ---------- */

    const { data: viewRows } = await supabase
      .from("commitment_views")
      .select("commitment_id")
      .in("commitment_id", commitmentIds);

    const viewCount: any = {};

    viewRows?.forEach((v: any) => {
      viewCount[v.commitment_id] =
        (viewCount[v.commitment_id] || 0) + 1;
    });

    /* ---------- BUILD FEED ---------- */

    let feed = commitments.map((c: any) => {

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
          display_name:
            profile?.display_name || profile?.username || "User",
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

    /* ---------- TRENDING SORT ---------- */

    if (type === "trending") {
      feed.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return NextResponse.json(feed);

  } catch (err: any) {

    return NextResponse.json({
      error: err.message,
    });

  }
}
