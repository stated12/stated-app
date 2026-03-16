import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ following: false });
  }

  const body = await req.json();

  const { targetUserId, targetCompanyId } = body;

  let query = supabase
    .from("follows")
    .select("id")
    .eq("follower_user_id", user.id);

  if (targetUserId) {
    query = query.eq("following_user_id", targetUserId);
  }

  if (targetCompanyId) {
    query = query.eq("following_company_id", targetCompanyId);
  }

  const { data } = await query.maybeSingle();

  return NextResponse.json({
    following: !!data,
  });
}
