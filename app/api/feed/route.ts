export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type") || "latest";
    const category = searchParams.get("category");

    const supabase = await createClient();

    /* CURRENT USER */
    const {
      data: { user },
    } = await supabase.auth.getUser();

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
      .limit(25);

    if (category) {
      commitmentQuery = commitmentQuery.eq("category", category);
    }

    if (type === "following") {

      if (!user) return NextResponse.json([]);

      const { data: following } = await supabase
        .from("follows")
        .select("following_user_id")
        .eq("follower_user_id", user.id);

      const ids =
        following?.map((f) => f.following_user_id).filter(Boolean) || [];

      if (ids.length === 0) return NextResponse.json([]);

      commitmentQuery = commitmentQuery.in("user_id", ids);
    }

    const { data: commitments } = await commitmentQuery;

    /* =========================
       FETCH UPDATES
    ========================= */

    const { data: updates } = await supabase
      .from("commitment_updates")
      .select(`
        id,
        commitment_id,
        content,
        created_at
      `)
      .order("created_at", { ascending: false })
      .limit(25);

    /* =========================
       GET IDS
    ========================= */

    const userIds = [
      ...new Set(commitments?.map((c: any) => c.user_id).filter(Boolean)),
    ];

    const companyIds = [
      ...new Set(commitments?.map((c: any) => c.company_id).filter(Boolean)),
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

    /* =========================
       BUILD FEED
    ========================= */

    let feed: any[] = [];

    /* COMMITMENTS */
    commitments?.forEach((c: any) => {

      const profile = profileMap[c.user_id];
      const company = companyMap[c.company_id];

      const identity = c.company_id
        ? {
            username: company?.username,
            display_name: company?.name,
            avatar_url: company?.logo_url,
            type: "company",
          }
        : {
            username: profile?.username,
            display_name: profile?.display_name,
            avatar_url: profile?.avatar_url,
            type: "user",
          };

      feed.push({
        id: c.id,
        type: "commitment",
        text: c.text,
        category: c.category,
        created_at: c.created_at,
        identity,
      });

    });

    /* UPDATES */
    updates?.forEach((u: any) => {

      const parent = commitments?.find(
        (c: any) => c.id === u.commitment_id
      );

      if (!parent) return;

      const profile = profileMap[parent.user_id];
      const company = companyMap[parent.company_id];

      const identity = parent.company_id
        ? {
            username: company?.username,
            display_name: company?.name,
            avatar_url: company?.logo_url,
            type: "company",
          }
        : {
            username: profile?.username,
            display_name: profile?.display_name,
            avatar_url: profile?.avatar_url,
            type: "user",
          };

      feed.push({
        id: u.id,
        type: "update",
        text: u.content,
        parent_commitment_id: u.commitment_id,
        created_at: u.created_at,
        identity,
      });

    });

    /* SORT */
    feed.sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    );

    return NextResponse.json(feed);

  } catch (err: any) {

    return NextResponse.json({ error: err.message });

  }
}
