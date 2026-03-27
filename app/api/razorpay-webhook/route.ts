import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body      = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);
    if (event.event !== "payment.captured") {
      return NextResponse.json({ message: "Event ignored" }, { status: 200 });
    }

    const payment      = event.payload.payment.entity;
    const userId       = payment.notes?.user_id;
    const companyId    = payment.notes?.company_id || null;
    const creditsToAdd = Number(payment.notes?.credits || 0);
    const planKey      = payment.notes?.plan_key || "";

    if (!userId) {
      return NextResponse.json({ error: "Missing user_id in notes" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Idempotency -- check if already processed
    const { data: existing } = await supabase
      .from("payments")
      .select("id, status")
      .eq("razorpay_payment_id", payment.id)
      .maybeSingle();

    if (existing?.status === "paid") {
      return NextResponse.json({ message: "Already processed" }, { status: 200 });
    }

    const isCompanyPlan = planKey.startsWith("comp_");
    const paymentType   = planKey.startsWith("pack_") ? "credit_pack" : "plan";

    // Record payment with correct column names
    const { data: inserted, error: insertError } = await supabase
      .from("payments")
      .upsert({
        user_id:             userId,
        company_id:          companyId,
        razorpay_order_id:   payment.order_id,
        razorpay_payment_id: payment.id,
        amount:              payment.amount,
        credits_added:       creditsToAdd,
        plan_key:            planKey || null,
        payment_type:        paymentType,
        status:              "paid",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    if (companyId && (isCompanyPlan || planKey.startsWith("pack_"))) {
      // --- COMPANY: add credits to companies table ---
      const { data: co } = await supabase
        .from("companies")
        .select("credits")
        .eq("id", companyId)
        .single();

      const current = co?.credits ?? 0;

      const companyUpdate: Record<string, unknown> = {
        credits: current + creditsToAdd,
      };
      if (isCompanyPlan) {
        companyUpdate.plan_key          = planKey;
        companyUpdate.plan_purchased_at = new Date().toISOString();
      }

      await supabase
        .from("companies")
        .update(companyUpdate)
        .eq("id", companyId);

    } else {
      // --- INDIVIDUAL: add credits to profiles table ---
      const { data: prof } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", userId)
        .single();

      const current = prof?.credits ?? 0;

      const profileUpdate: Record<string, unknown> = {
        credits: current + creditsToAdd,
      };
      if (planKey && !planKey.startsWith("pack_")) {
        profileUpdate.plan_key          = planKey;
        profileUpdate.plan_purchased_at = new Date().toISOString();
      }

      await supabase
        .from("profiles")
        .update(profileUpdate)
        .eq("id", userId);
    }

    return NextResponse.json({ message: "Payment processed" }, { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
