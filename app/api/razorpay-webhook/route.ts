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

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    // We only care about successful captures
    if (event.event !== "payment.captured") {
      return NextResponse.json({ message: "Event ignored" }, { status: 200 });
    }

    const payment = event.payload.payment.entity;

    const userId = payment.notes?.user_id;
    const creditsToAdd = Number(payment.notes?.credits || 0);
    const planKey = payment.notes?.plan_key;

    if (!userId) {
      return NextResponse.json({ error: "Missing user_id in notes" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if payment already processed
    const { data: existing } = await supabase
      .from("payments")
      .select("id, is_processed")
      .eq("razorpay_payment_id", payment.id)
      .maybeSingle();

    if (existing?.is_processed) {
      return NextResponse.json({ message: "Already processed" }, { status: 200 });
    }

    // Insert or update payment record
    const { data: inserted, error: insertError } = await supabase
      .from("payments")
      .upsert({
        user_id: userId,
        razorpay_order_id: payment.order_id,
        razorpay_payment_id: payment.id,
        razorpay_signature: signature,
        amount: payment.amount,
        currency: payment.currency,
        credits_purchased: creditsToAdd,
        status: "paid",
        payment_method: payment.method,
        is_processed: false,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    // Increment credits safely
    const { error: creditError } = await supabase.rpc("increment_credits", {
      user_id_input: userId,
      credit_amount: creditsToAdd,
    });

    if (creditError) {
      console.error("Credit error:", creditError);
      return NextResponse.json({ error: "Credit update failed" }, { status: 500 });
    }

    // If this is a plan purchase (not credit pack), unlock plan once
    if (planKey && !planKey.startsWith("pack_")) {
      await supabase
        .from("profiles")
        .update({
          plan_key: planKey,
          plan_purchased_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .is("plan_key", null); // only if not already set
    }

    // Mark payment as processed
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
