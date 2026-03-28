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

  // Company OWNERS go to company dashboard
  const { data: ownedCompany } = await supabase
    .from("companies")
    .select("id")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  if (ownedCompany) {
    return NextResponse.redirect(origin + "/dashboard/company");
  }

  // Invited MEMBERS go to individual dashboard
  // Their individual account is primary; company access is via the workspace switcher
  // This avoids confusion between individual and company profiles
  const { data: membership } = await supabase
    .from("company_members")
    .select("company_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (membership) {
    return NextResponse.redirect(origin + "/dashboard");
  }

  // Pure individual or next param redirect
  return NextResponse.redirect(origin + "/" + next);
}
