import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planKey,
      userId,
    } = await req.json();

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const CREDIT_MAP: Record<string, number> = {
      individual: 20,
      company_starter: 25,
      company_growth: 50,
      company_scale: 75,
      pack_10: 10,
      pack_25: 25,
      pack_50: 50,
    };

    const creditsToAdd = CREDIT_MAP[planKey];

    if (!creditsToAdd) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateData: any = {
      credits: (profile.credits || 0) + creditsToAdd,
    };

    // Only set plan once (lifetime unlock)
    if (!profile.plan_key && !planKey.startsWith("pack_")) {
      updateData.plan_key = planKey;
      updateData.plan_purchased_at = new Date().toISOString();
    }

    await supabase.from("profiles").update(updateData).eq("id", userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
