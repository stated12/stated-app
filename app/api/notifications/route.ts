import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json([]);

  // =====================================
  // FETCH USER NOTIFICATIONS
  // =====================================

  const { data, error } = await supabase
    .from("notifications")
    .select("id, title, message, link, created_at, is_read")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Notification fetch error:", error);
    return NextResponse.json([]);
  }

  let notifications = data || [];

  // =====================================
  // AUTO CREATE WELCOME NOTIFICATION
  // =====================================

  if (notifications.length === 0) {

    const { data: profile } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .maybeSingle();

    if (profile) {

      const { data: existing } = await supabase
        .from("notifications")
        .select("id")
        .eq("user_id", user.id)
        .eq("notification_type", "welcome")
        .limit(1);

      if (!existing || existing.length === 0) {

        await supabase.from("notifications").insert({
          user_id: user.id,
          title: "🎉 Welcome to Stated",
          message:
            "You unlocked 5 free credits. 1 credit = 1 commitment. Start posting your first commitment.",
          link: "/dashboard/create",
          is_read: false,
          notification_type: "welcome",
        });

        const { data: updated } = await supabase
          .from("notifications")
          .select("id, title, message, link, created_at, is_read")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(20);

        notifications = updated || [];
      }
    }
  }

  return NextResponse.json(notifications);

}


export async function PATCH(request: Request) {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ success: false });

  const { id } = await request.json();

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Notification update error:", error);
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });

}
