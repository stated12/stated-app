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

  const { data: commitment, error: fetchError } = await supabase
    .from("commitments")
    .select("status, user_id, company_id")
    .eq("id", id)
    .single();

  if (fetchError || !commitment) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Determine back URL based on whether this is a company commitment
  const backUrl = commitment.company_id ? "/dashboard/company" : "/dashboard";

  if (commitment.user_id !== user.id) {
    if (commitment.company_id) {
      const { data: owned } = await supabase.from("companies").select("id")
        .eq("id", commitment.company_id).eq("owner_user_id", user.id).maybeSingle();
      const { data: membership } = await supabase.from("company_members").select("role")
        .eq("company_id", commitment.company_id).eq("user_id", user.id).maybeSingle();
      const canManage = owned || (membership && ["admin","member"].includes(membership.role));
      if (!canManage) return NextResponse.redirect(new URL(backUrl, request.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (commitment.status !== "paused") {
    return NextResponse.redirect(new URL(backUrl, request.url));
  }

  const { error: updateError } = await supabase
    .from("commitments")
    .update({ status: "active", updated_at: new Date().toISOString() })
    .eq("id", id);

  if (updateError) {
    console.error("Resume update error:", updateError);
    return NextResponse.redirect(new URL(backUrl, request.url));
  }

  await supabase.from("commitment_updates").insert({
    commitment_id: id, user_id: user.id, content: "Commitment resumed",
  });

  await supabase.from("notifications").insert({
    user_id: user.id, type: "resume",
    title: "Commitment Resumed",
    message: "Your paused commitment is now active again.",
    link: commitment.company_id ? "/dashboard/company/commitments" : "/dashboard/my",
    read: false,
  });

  return NextResponse.redirect(new URL(backUrl, request.url));
}
