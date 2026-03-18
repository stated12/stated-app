export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type") || "latest";
    const category = searchParams.get("category");
    const cursor = searchParams.get("cursor");

    const supabase = await createClient();

    /* CURRENT USER */
    const {
      data: { user },
    } = await supabase.auth.getUser();

    /* BASE QUERY */
    let query = supabase
      .from("commitments")
      .select(`
        id,
        text,
        category,
        created_at,
        user_id,
        company_id,
        shares,
        latest_update,
        updated_at
      `)
      .eq("status", "active")
      .eq("visibility", "public")
      .limit(25);

    /* CATEGORY */
    if (category) {
      query = query.eq("category", category);
    }

    /* FOLLOWING FILTER */
    if (type === "following") {

      if (!user) return NextResponse.json([]);

      const { data: following } = await supabase
        .from("follows")
        .select("following_user_id")
        .eq("follower_user_id", user.id);

      const ids =
        following?.map((f) => f.following_user_id).filter(Boolean) || [];

      if (ids.length === 0) return NextResponse.json([]);

      query = query.in("user_id", ids);
    }

    /* FETCH */
    const { data: commitments, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message });
    }

    if (!commitments || commitments.length === 0) {
      return NextResponse.json([]);
    }

    /* GET VIEWS */
    const enriched = await Promise.all(
      commitments.map(async (c: any) => {

        const { count } = await supabase
          .from("commitment_views")
          .select("*", { count: "exact", head: true })
          .eq("commitment_id", c.id);

        return {
          ...c,
          views: count || 0,
        };

      })
    );

    /* USERS + COMPANIES */
    const userIds = [
      ...new Set(enriched.map((c: any) => c.user_id).filter(Boolean)),
    ];

    const companyIds = [
      ...new Set(enriched.map((c: any) => c.company_id).filter(Boolean)),
    ];

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_url")
      .in("id", userIds);

    const { data: companies } = await supabase
      .from("companies")
      .select("id, username, name, logo_url")
      .in("id", companyIds);

    const profileMap: any = {};
    profiles?.forEach((p: any) => (profileMap[p.id] = p));

    const companyMap: any = {};
    companies?.forEach((c: any) => (companyMap[c.id] = c));

    /* BUILD ACTIVITY FEED */
    let feed: any[] = [];

    enriched.forEach((c: any) => {

      let identity;

      if (c.company_id) {
        const company = companyMap[c.company_id];
        identity = {
          username: company?.username || "company",
          display_name: company?.name || "Company",
          avatar_url:
            company?.logo_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              company?.name || "Company"
            )}`,
          type: "company",
        };
      } else {
        const profile = profileMap[c.user_id];
        identity = {
          username: profile?.username || "user",
          display_name:
            profile?.display_name || profile?.username || "User",
          avatar_url:
            profile?.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              profile?.display_name || profile?.username || "User"
            )}`,
          type: "user",
        };
      }

      /* ✅ ADD COMMITMENT EVENT */
      feed.push({
        id: c.id,
        type: "commitment",
        text: c.text,
        category: c.category,
        created_at: c.created_at,
        views: c.views,
        shares: c.shares || 0,
        identity,
      });

      /* ✅ ADD UPDATE EVENT */
      if (c.latest_update) {
        feed.push({
          id: c.id + "_update",
          type: "update",
          text: c.latest_update,
          parent_commitment_id: c.id,
          created_at: c.updated_at || c.created_at,
          identity,
        });
      }

    });

    /* SORT BY TIME */
    feed.sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    );

    /* TRENDING */
    if (type === "trending") {
      feed.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return NextResponse.json(feed);

  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
