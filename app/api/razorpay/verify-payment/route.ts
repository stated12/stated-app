import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { razorpay_payment_id, planKey } = body;

  if (!razorpay_payment_id || !planKey) {
    return NextResponse.json({ error: "Invalid payment" }, { status: 400 });
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const individualPlans: Record<string, { credits: number }> = {
    ind_499: { credits: 20 },
    ind_899: { credits: 40 },
    ind_1299: { credits: 60 },
  };

  const creditPacks: Record<string, { credits: number }> = {
    pack_10: { credits: 10 },
    pack_25: { credits: 25 },
    pack_50: { credits: 50 },
  };

  const companyPlans: Record<
    string,
    { credits: number; member_limit: number }
  > = {
    comp_1999: { credits: 25, member_limit: 10 },
    comp_2999: { credits: 50, member_limit: 15 },
    comp_4999: { credits: 75, member_limit: 25 },
  };

  // Individual Plan
  if (individualPlans[planKey]) {
    const plan = individualPlans[planKey];

    await supabase
      .from("profiles")
      .update({
        plan_key: planKey,
        credits: plan.credits,
      })
      .eq("id", user.id);

    return NextResponse.json({ success: true });
  }

  // Credit Pack
  if (creditPacks[planKey]) {
    const pack = creditPacks[planKey];

    const { data: profile } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    const currentCredits = profile?.credits || 0;

    await supabase
      .from("profiles")
      .update({
        credits: currentCredits + pack.credits,
      })
      .eq("id", user.id);

    return NextResponse.json({ success: true });
  }

  // Company Plan
  if (companyPlans[planKey]) {
    const plan = companyPlans[planKey];

    const { data: companyMember } = await supabase
      .from("company_members")
      .select("company_id, role")
      .eq("user_id", user.id)
      .eq("role", "owner")
      .single();

    if (!companyMember) {
      return NextResponse.json(
        { error: "Only company owner can upgrade" },
        { status: 403 }
      );
    }

    await supabase
      .from("companies")
      .update({
        plan_key: planKey,
        credits: plan.credits,
        member_limit: plan.member_limit,
      })
      .eq("id", companyMember.company_id);

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid plan key" }, { status: 400 });
}
