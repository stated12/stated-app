import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code      = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type      = searchParams.get("type");
  const next      = searchParams.get("next") ?? "/dashboard";

  const supabase = await createClient();

  // Handle email confirmation via token_hash (from branded email template)
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as any,
    });
    if (error) {
      console.error("Token verification error:", error.message);
      return NextResponse.redirect(origin + "/login?error=verification_failed");
    }
  }
  // Handle OAuth or magic link code exchange
  else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Code exchange error:", error.message);
      return NextResponse.redirect(origin + "/login?error=verification_failed");
    }
  }
  else {
    return NextResponse.redirect(origin + "/login?error=missing_code");
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(origin + "/login?error=no_user");
  }

  // Existing users - route correctly without touching DB
  const { data: existingProfile } = await supabase
    .from("profiles").select("id").eq("id", user.id).maybeSingle();
  const { data: existingCompany } = await supabase
    .from("companies").select("id").eq("owner_user_id", user.id).maybeSingle();

  if (existingProfile) return NextResponse.redirect(origin + "/dashboard");
  if (existingCompany) return NextResponse.redirect(origin + "/dashboard/company");

  // New signup - read metadata stored during signUp()
  const metadata    = user.user_metadata ?? {};
  const username    = (metadata.username as string | undefined)?.toLowerCase();
  const accountType = (metadata.account_type as string | undefined) ?? "individual";

  if (!username) {
    return NextResponse.redirect(origin + "/login?confirmed=1");
  }

  // Race condition guard
  const { data: takenP } = await supabase.from("profiles").select("id").eq("username", username).maybeSingle();
  const { data: takenC } = await supabase.from("companies").select("id").eq("username", username).maybeSingle();
  if (takenP || takenC) {
    return NextResponse.redirect(origin + "/signup?error=username_taken");
  }

  // Create individual profile
  if (accountType === "individual") {
    const { error } = await supabase.from("profiles").insert({
      id: user.id, username, display_name: username,
      account_type: "individual", credits: 5, plan_key: "free",
    });
    if (error) {
      console.error("Profile creation error:", error.message);
      return NextResponse.redirect(origin + "/login?error=profile_creation_failed");
    }
    return NextResponse.redirect(origin + "/login?confirmed=1");
  }

  // Create company
  if (accountType === "company") {
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .insert({
        username, name: username,
        owner_id: user.id, owner_user_id: user.id,
        plan_key: "free", credits: 5, member_limit: 2,
      })
      .select().single();

    if (companyError || !company) {
      console.error("Company creation error:", companyError?.message);
      return NextResponse.redirect(origin + "/login?error=profile_creation_failed");
    }

    await supabase.from("company_members").insert({
      company_id: company.id, user_id: user.id, role: "owner",
    });

    return NextResponse.redirect(origin + "/login?confirmed=1&type=company");
  }

  return NextResponse.redirect(origin + "/" + next);
}
