export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const type     = searchParams.get("type") || "latest";
    const category = searchParams.get("category");
    const cursor   = searchParams.get("cursor");
    // ✅ NEW: respect ?limit= — homepage passes 6, explore uses default 20
    const limit    = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 50);

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    /* =========================
       FETCH COMMITMENTS
    ========================= */

    let commitmentQuery = supabase
      .from("commitments")
      .select(`
        id,
        text,
        category,
        created_at,
        user_id,
        company_id,
        shares
      `)
      .eq("status", "active")
      .eq("visibility", "public")
      .order("created_at", { ascending: false })
      .limit(limit); // ✅ was hardcoded to 20

    if (category) commitmentQuery = commitmentQuery.eq("category", category);
    if (cursor)   commitmentQuery = commitmentQuery.lt("created_at", cursor);

    if (type === "following") {
      if (!user) return NextResponse.json([]);

      const { data: following } = await supabase
        .from("follows")
        .select("following_user_id")
        .eq("follower_user_id", user.id);

      const ids = following?.map((f) => f.following_user_id).filter(Boolean) || [];
      if (ids.length === 0) return NextResponse.json([]);
      commitmentQuery = commitmentQuery.in("user_id", ids);
    }

    const { data: commitments } = await commitmentQuery;

    /* =========================
       FETCH UPDATES
       — skip updates on homepage (limit < 20) to keep feed clean
    ========================= */

    let updates: any[] = [];

    if (limit >= 20) {
      let updatesQuery = supabase
        .from("commitment_updates")
        .select(`id, commitment_id, content, created_at`)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (cursor) updatesQuery = updatesQuery.lt("created_at", cursor);

      const { data } = await updatesQuery;
      updates = data ?? [];
    }

    /* =========================
       COLLECT IDS
    ========================= */

    const allCommitmentIds = [
      ...(commitments?.map((c: any) => c.id) || []),
      ...updates.map((u: any) => u.commitment_id),
    ];
    const uniqueCommitmentIds = [...new Set(allCommitmentIds)];

    /* =========================
       FETCH VIEWS
    ========================= */

    const viewsMap: Record<string, number> = {};
    await Promise.all(
      uniqueCommitmentIds.map(async (id) => {
        const { count } = await supabase
          .from("commitment_views")
          .select("*", { count: "exact", head: true })
          .eq("commitment_id", id);
        viewsMap[id] = count ?? 0;
      })
    );

    /* =========================
       FETCH CHEERS
    ========================= */

    const cheersMap: Record<string, number> = {};
    await Promise.all(
      uniqueCommitmentIds.map(async (id) => {
        const { count } = await supabase
          .from("commitment_cheers")
          .select("*", { count: "exact", head: true })
          .eq("commitment_id", id);
        cheersMap[id] = count ?? 0;
      })
    );

    /* =========================
       FETCH PARENTS FOR UPDATES
    ========================= */

    const parentMap: Record<string, any> = {};
    if (uniqueCommitmentIds.length > 0) {
      const { data: parentCommitments } = await supabase
        .from("commitments")
        .select("id, user_id, company_id")
        .in("id", uniqueCommitmentIds);
      parentCommitments?.forEach((c: any) => { parentMap[c.id] = c; });
    }

    /* =========================
       FETCH PROFILES / COMPANIES
    ========================= */

    const userIds = [...new Set([
      ...(commitments?.map((c: any) => c.user_id) || []),
      ...Object.values(parentMap).map((c: any) => c.user_id),
    ].filter(Boolean))];

    const companyIds = [...new Set([
      ...(commitments?.map((c: any) => c.company_id) || []),
      ...Object.values(parentMap).map((c: any) => c.company_id),
    ].filter(Boolean))];

    const profileMap: Record<string, any> = {};
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .in("id", userIds);
      profiles?.forEach((p: any) => { profileMap[p.id] = p; });
    }

    const companyMap: Record<string, any> = {};
    if (companyIds.length > 0) {
      const { data: companies } = await supabase
        .from("companies")
        .select("id, username, name, logo_url")
        .in("id", companyIds);
      companies?.forEach((c: any) => { companyMap[c.id] = c; });
    }

    /* =========================
       BUILD FEED
    ========================= */

    function buildIdentity(userId: string | null, companyId: string | null) {
      if (companyId) {
        const co = companyMap[companyId];
        return { username: co?.username || "", display_name: co?.name || "Company", avatar_url: co?.logo_url || "", type: "company" };
      }
      const p = profileMap[userId ?? ""];
      return { username: p?.username || "", display_name: p?.display_name || "User", avatar_url: p?.avatar_url || "", type: "user" };
    }

    const feed: any[] = [];

    commitments?.forEach((c: any) => {
      feed.push({
        id:         c.id,
        type:       "commitment",
        text:       c.text,
        category:   c.category,
        created_at: c.created_at,
        views:      viewsMap[c.id]  || 0,
        shares:     c.shares        ?? 0,
        cheers:     cheersMap[c.id] || 0,  // ✅ cheers now included
        identity:   buildIdentity(c.user_id, c.company_id),
      });
    });

    updates.forEach((u: any) => {
      const parent = parentMap[u.commitment_id];
      if (!parent) return;
      feed.push({
        id:                    u.id,
        type:                  "update",
        text:                  u.content,
        parent_commitment_id:  u.commitment_id,
        created_at:            u.created_at,
        identity:              buildIdentity(parent.user_id, parent.company_id),
      });
    });

    feed.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // ✅ Enforce final limit (after merging commitments + updates)
    return NextResponse.json(feed.slice(0, limit));

  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
