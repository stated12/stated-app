import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
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

    const payment = event.payload.payment.entity;

    const userId    = payment.notes?.user_id;
    const companyId = payment.notes?.company_id;   // set this when creating order
    const creditsToAdd = Number(payment.notes?.credits || 0);
    const planKey   = payment.notes?.plan_key || "";

    if (!userId) {
      return NextResponse.json({ error: "Missing user_id in notes" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Idempotency check
    const { data: existing } = await supabase
      .from("payments")
      .select("id, is_processed")
      .eq("razorpay_payment_id", payment.id)
      .maybeSingle();

    if (existing?.is_processed) {
      return NextResponse.json({ message: "Already processed" }, { status: 200 });
    }

    const isCompanyPlan = planKey.startsWith("comp_");

    // Determine which table to record payment against
    const { data: inserted, error: insertError } = await supabase
      .from("payments")
      .upsert({
        user_id:              userId,
        company_id:           isCompanyPlan ? (companyId || null) : null,
        razorpay_order_id:    payment.order_id,
        razorpay_payment_id:  payment.id,
        razorpay_signature:   signature,
        amount:               payment.amount,
        currency:             payment.currency,
        credits_purchased:    creditsToAdd,
        credits_added:        creditsToAdd,
        plan_key:             planKey || null,
        payment_type:         planKey.startsWith("pack_") ? "credit_pack" : "plan",
        status:               "paid",
        payment_method:       payment.method,
        is_processed:         false,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    if (isCompanyPlan && companyId) {
      // --- COMPANY PLAN ---
      // Get current company credits
      const { data: co } = await supabase
        .from("companies")
        .select("credits, plan_key")
        .eq("id", companyId)
        .single();

      const currentCredits = co?.credits ?? 0;

      // Add credits on top of existing balance (never reset)
      await supabase
        .from("companies")
        .update({
          credits:           currentCredits + creditsToAdd,
          plan_key:          planKey,
          plan_purchased_at: new Date().toISOString(),
        })
        .eq("id", companyId);

    } else {
      // --- INDIVIDUAL PLAN or CREDIT PACK ---
      const { data: prof } = await supabase
        .from("profiles")
        .select("credits, plan_key")
        .eq("id", userId)
        .single();

      const currentCredits = prof?.credits ?? 0;

      const updateData: Record<string, unknown> = {
        credits: currentCredits + creditsToAdd,
      };

      // Update plan key for plan purchases (always, even if upgrading)
      if (planKey && !planKey.startsWith("pack_")) {
        updateData.plan_key          = planKey;
        updateData.plan_purchased_at = new Date().toISOString();
      }

      await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", userId);
    }

    // Mark payment processed
    await supabase
      .from("payments")
      .update({ is_processed: true })
      .eq("id", inserted.id);

    return NextResponse.json({ message: "Payment processed" }, { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
