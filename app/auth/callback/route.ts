import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(origin + "/login?error=missing_code");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Auth callback error:", error.message);
    return NextResponse.redirect(origin + "/login?error=verification_failed");
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(origin + "/login?error=no_user");
  }

  // -- Check if profile/company already exists (existing users, re-confirms) --
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  const { data: existingCompany } = await supabase
    .from("companies")
    .select("id")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  // Already set up - route them to the right dashboard
  if (existingProfile || existingCompany) {
    if (existingCompany) {
      return NextResponse.redirect(origin + "/dashboard/company");
    }
    return NextResponse.redirect(origin + "/dashboard");
  }

  // -- New signup - read metadata set during signUp() ------------------------
  const metadata    = user.user_metadata ?? {};
  const username    = (metadata.username as string | undefined)?.toLowerCase();
  const accountType = (metadata.account_type as string | undefined) ?? "individual";

  if (!username) {
    // No metadata means they signed up before this flow - send to login
    return NextResponse.redirect(origin + "/login?confirmed=1");
  }

  // Double-check username isn't already taken (race condition guard)
  const { data: usernameTakenProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  const { data: usernameTakenCompany } = await supabase
    .from("companies")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (usernameTakenProfile || usernameTakenCompany) {
    // Very rare but handle gracefully - send to signup to pick a new username
    return NextResponse.redirect(origin + "/signup?error=username_taken");
  }

  // -- Create individual profile ---------------------------------------------
  if (accountType === "individual") {
    const { error: profileError } = await supabase.from("profiles").insert({
      id:           user.id,
      username,
      display_name: username,
      account_type: "individual",
      credits:      5,
      plan_key:     "free",
    });

    if (profileError) {
      console.error("Profile creation error:", profileError.message);
      return NextResponse.redirect(origin + "/login?error=profile_creation_failed");
    }

    // Send to login with confirmed flag - user logs in fresh
    return NextResponse.redirect(origin + "/login?confirmed=1");
  }

  // -- Create company --------------------------------------------------------
  if (accountType === "company") {
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .insert({
        username,
        name:          username,
        owner_id:      user.id,
        owner_user_id: user.id,
        plan_key:      "free",
        credits:       5,
        member_limit:  2,
      })
      .select()
      .single();

    if (companyError || !company) {
      console.error("Company creation error:", companyError?.message);
      return NextResponse.redirect(origin + "/login?error=profile_creation_failed");
    }

    const { error: membershipError } = await supabase.from("company_members").insert({
      company_id: company.id,
      user_id:    user.id,
      role:       "owner",
    });

    if (membershipError) {
      console.error("Membership creation error:", membershipError.message);
      // Company was created - still send to login, they can use it
    }

    return NextResponse.redirect(origin + "/login?confirmed=1&type=company");
  }

  // Fallback
  return NextResponse.redirect(origin + "/" + next);
}
