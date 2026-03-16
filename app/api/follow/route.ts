import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { followingUserId, followingCompanyId } = body;

  /* CREATE FOLLOW */

  const { error } = await supabase.from("follows").insert({
    follower_user_id: user.id,
    following_user_id: followingUserId || null,
    following_company_id: followingCompanyId || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  /* =========================
     CREATE NOTIFICATION
     ========================= */

  let ownerUserId: string | null = null;

  if (followingUserId) {
    ownerUserId = followingUserId;
  }

  if (followingCompanyId) {

    const { data: company } = await supabase
      .from("companies")
      .select("owner_user_id")
      .eq("id", followingCompanyId)
      .maybeSingle();

    ownerUserId = company?.owner_user_id || null;
  }

  /* GET FOLLOWER PROFILE */

  const { data: followerProfile } = await supabase
    .from("profiles")
    .select("username, display_name")
    .eq("id", user.id)
    .maybeSingle();

  const followerName =
    followerProfile?.display_name ||
    followerProfile?.username ||
    "Someone";

  /* INSERT NOTIFICATION */

  if (ownerUserId && ownerUserId !== user.id) {

    const { error: notifError } = await supabase
      .from("notifications")
      .insert({
        user_id: ownerUserId,
        title: "👥 New follower",
        message: `${followerName} started following you`,
        link: followerProfile?.username
          ? `/u/${followerProfile.username}`
          : "/dashboard",
        read: false,
      });

    if (notifError) {
      console.log("Notification insert error:", notifError);
    }

  }

  return NextResponse.json({ success: true });

}


export async function DELETE(req: Request) {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { followingUserId, followingCompanyId } = body;

  let query = supabase
    .from("follows")
    .delete()
    .eq("follower_user_id", user.id);

  if (followingUserId) {
    query = query.eq("following_user_id", followingUserId);
  }

  if (followingCompanyId) {
    query = query.eq("following_company_id", followingCompanyId);
  }

  const { error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });

}
