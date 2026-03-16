import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const { userId, companyId } = await req.json();

  let followers = 0;
  let following = 0;

  if (userId) {

    const { count: followersCount } = await supabase
      .from("follows")
      .select("*", { count: "exact", head: true })
      .eq("following_user_id", userId);

    const { count: followingCount } = await supabase
      .from("follows")
      .select("*", { count: "exact", head: true })
      .eq("follower_user_id", userId);

    followers = followersCount || 0;
    following = followingCount || 0;
  }

  if (companyId) {

    const { count: followersCount } = await supabase
      .from("follows")
      .select("*", { count: "exact", head: true })
      .eq("following_company_id", companyId);

    const { count: followingCount } = await supabase
      .from("follows")
      .select("*", { count: "exact", head: true })
      .eq("follower_company_id", companyId);

    followers = followersCount || 0;
    following = followingCount || 0;
  }

  return NextResponse.json({
    followers,
    following,
  });
}
