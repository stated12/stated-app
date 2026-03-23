import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/login", request.url));

  // Fetch commitment without user_id filter
  const { data: commitment, error: fetchError } = await supabase
    .from("commitments")
    .select("status, user_id, company_id")
    .eq("id", id)
    .single();

  if (fetchError || !commitment) {
    console.error("Fetch error:", fetchError);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ── Permission check: own commitment OR company member ──
  if (commitment.user_id !== user.id) {
    if (commitment.company_id) {
      const { data: ownedCompany } = await supabase
        .from("companies").select("id")
        .eq("id", commitment.company_id).eq("owner_user_id", user.id).maybeSingle();
      const { data: membership } = await supabase
        .from("company_members").select("role")
        .eq("company_id", commitment.company_id).eq("user_id", user.id).maybeSingle();
      const canManage = ownedCompany || (membership && ["admin", "member"].includes(membership.role));
      if (!canManage) return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (commitment.status !== "paused") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Update status — no .eq("user_id") so company commitments work too
  const { error: updateError } = await supabase
    .from("commitments")
    .update({ status: "active", updated_at: new Date().toISOString() })
    .eq("id", id);

  if (updateError) {
    console.error("Resume update error:", updateError);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const { error: insertError } = await supabase
    .from("commitment_updates")
    .insert({ commitment_id: id, user_id: user.id, content: "Commitment resumed" });

  if (insertError) console.error("Resume log insert error:", insertError);

  await supabase.from("notifications").insert({
    user_id: user.id, type: "resume",
    title: "▶️ Commitment Resumed",
    message: "Your paused commitment is now active again.",
    link: "/dashboard/my", read: false,
  });

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
