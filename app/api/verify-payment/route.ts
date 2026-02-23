import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PRICE_MAP: Record<
  string,
  { credits: number; type: "plan" | "pack" }
> = {
  individual: { credits: 20, type: "plan" },
  company_starter: { credits: 25, type: "plan" },
  company_growth: { credits: 50, type: "plan" },
  company_scale: { credits: 75, type: "plan" },
  pack_10: { credits: 10, type: "pack" },
  pack_25: { credits: 25, type: "pack" },
  pack_50: { credits: 50, type: "pack" },
};

export async function POST(req: Request) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    planKey,
    userId,
  } = await req.json();

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const plan = PRICE_MAP[planKey];
  if (!plan) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const newCredits = (profile.credits || 0) + plan.credits;

  const updateData: any = {
    credits: newCredits,
  };

  if (plan.type === "plan" && !profile.plan_key) {
    updateData.plan_key = planKey;
    updateData.plan_purchased_at = new Date().toISOString();
  }

  await supabase.from("profiles").update(updateData).eq("id", userId);

  return NextResponse.json({ success: true });
}
