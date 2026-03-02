import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { type, entityId } = await req.json();

    if (!type || !entityId) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const viewerId = user?.id ?? null;

    // Generate simple session key for anonymous users
    const sessionKey =
      viewerId ?? req.headers.get("x-forwarded-for") ?? crypto.randomUUID();

    const table =
      type === "profile" ? "profile_views" : "commitment_views";

    const column =
      type === "profile" ? "profile_id" : "commitment_id";

    // 🔒 Prevent duplicate within 24 hours
    const { data: existing } = await supabase
      .from(table)
      .select("id")
      .eq(column, entityId)
      .or(
        viewerId
          ? `viewer_id.eq.${viewerId}`
          : `session_key.eq.${sessionKey}`
      )
      .gte(
        "created_at",
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      )
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: true });
    }

    // 🚫 Prevent self view
    if (viewerId && type === "profile" && viewerId === entityId) {
      return NextResponse.json({ success: true });
    }

    await supabase.from(table).insert({
      [column]: entityId,
      viewer_id: viewerId,
      session_key: viewerId ? null : sessionKey,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}
