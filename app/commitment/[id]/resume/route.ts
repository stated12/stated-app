import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔎 Step 1: Check current commitment status
  const { data: commitment, error: fetchError } = await supabase
    .from("commitments")
    .select("status")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !commitment) {
    console.error("Fetch error:", fetchError);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 🛑 If already active (or not paused), do nothing
  if (commitment.status !== "paused") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Step 2: Update status to active
  const { error: updateError } = await supabase
    .from("commitments")
    .update({
      status: "active",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (updateError) {
    console.error("Resume update error:", updateError);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 📝 Step 3: Insert resume log (only once)
  const { error: insertError } = await supabase
    .from("commitment_updates")
    .insert({
      commitment_id: id,
      user_id: user.id,
      content: "Commitment resumed",
    });

  if (insertError) {
    console.error("Resume log insert error:", insertError);
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
