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

  const { error } = await supabase.from("follows").insert({
    follower_user_id: user.id,
    following_user_id: followingUserId || null,
    following_company_id: followingCompanyId || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
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
