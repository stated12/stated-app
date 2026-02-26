import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json([]);

  const { data, error } = await supabase
    .from("notifications")
    .select("id, title, message, link, created_at, read")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Notification fetch error:", error);
    return NextResponse.json([]);
  }

  return NextResponse.json(data || []);
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
    .update({ read: true })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Notification update error:", error);
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}
