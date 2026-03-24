import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const individualPlans: Record<string, { credits: number; amount: number }> = {
  ind_499:  { credits: 20, amount: 49900 },
  ind_899:  { credits: 40, amount: 89900 },
  ind_1299: { credits: 60, amount: 129900 },
};

const creditPacks: Record<string, { credits: number; amount: number }> = {
  pack_10: { credits: 10, amount: 19900 },
  pack_25: { credits: 25, amount: 39900 },
  pack_50: { credits: 50, amount: 69900 },
};

const companyPlans: Record<string, { credits: number; member_limit: number; amount: number }> = {
  comp_1999: { credits: 25, member_limit: 10, amount: 199900 },
  comp_2999: { credits: 50, member_limit: 15, amount: 299900 },
  comp_4999: { credits: 75, member_limit: 25, amount: 499900 },
};

export async function POST(request: Request) {
  const body = await request.json();
  const { razorpay_order_id, razorpay_payment_id, planKey } = body;

  if (!razorpay_payment_id || !planKey) {
    return NextResponse.json({ error: "Invalid payment" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // ── Individual Plan ──
  if (individualPlans[planKey]) {
    const plan = individualPlans[planKey];

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ plan_key: planKey, credits: plan.credits })
      .eq("id", user.id);
    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

    await supabase.from("payments").insert({
      user_id:             user.id,
      company_id:          null,
      razorpay_order_id:   razorpay_order_id || null,
      razorpay_payment_id: razorpay_payment_id,
      plan_key:            planKey,
      amount:              plan.amount,
      credits_added:       plan.credits,   // ← existing column name
      payment_type:        "plan",
      status:              "paid",
    });

    return NextResponse.json({ success: true });
  }

  // ── Credit Pack ──
  if (creditPacks[planKey]) {
    const pack = creditPacks[planKey];

    const { data: profile } = await supabase
      .from("profiles").select("credits").eq("id", user.id).single();
    const currentCredits = profile?.credits || 0;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ credits: currentCredits + pack.credits })
      .eq("id", user.id);
    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

    await supabase.from("payments").insert({
      user_id:             user.id,
      company_id:          null,
      razorpay_order_id:   razorpay_order_id || null,
      razorpay_payment_id: razorpay_payment_id,
      plan_key:            planKey,
      amount:              pack.amount,
      credits_added:       pack.credits,   // ← existing column name
      payment_type:        "credit_pack",
      status:              "paid",
    });

    return NextResponse.json({ success: true });
  }

  // ── Company Plan ──
  if (companyPlans[planKey]) {
    const plan = companyPlans[planKey];

    const { data: companyMember } = await supabase
      .from("company_members")
      .select("company_id, role")
      .eq("user_id", user.id)
      .eq("role", "owner")
      .single();

    if (!companyMember) {
      return NextResponse.json({ error: "Only company owner can upgrade" }, { status: 403 });
    }

    const { error: updateError } = await supabase
      .from("companies")
      .update({ plan_key: planKey, credits: plan.credits, member_limit: plan.member_limit })
      .eq("id", companyMember.company_id);
    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

    await supabase.from("payments").insert({
      user_id:             user.id,
      company_id:          companyMember.company_id,
      razorpay_order_id:   razorpay_order_id || null,
      razorpay_payment_id: razorpay_payment_id,
      plan_key:            planKey,
      amount:              plan.amount,
      credits_added:       plan.credits,   // ← existing column name
      payment_type:        "plan",
      status:              "paid",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid plan key" }, { status: 400 });
}
