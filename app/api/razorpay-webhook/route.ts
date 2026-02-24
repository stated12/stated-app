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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if payment already exists
    const { data: existing } = await supabase
      .from("payments")
      .select("id, is_processed")
      .eq("razorpay_payment_id", payment.id)
      .maybeSingle();

    if (existing && existing.is_processed) {
      return NextResponse.json({ message: "Already processed" }, { status: 200 });
    }

    // Insert payment record
    const { data: inserted, error: insertError } = await supabase
      .from("payments")
      .upsert({
        user_id: payment.notes?.user_id,
        razorpay_order_id: payment.order_id,
        razorpay_payment_id: payment.id,
        razorpay_signature: signature,
        amount: payment.amount,
        currency: payment.currency,
        credits_purchased: Number(payment.notes?.credits || 0),
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

    // Add credits (atomic safe update)
    const { error: creditError } = await supabase.rpc("increment_credits", {
      user_id_input: payment.notes?.user_id,
      credit_amount: Number(payment.notes?.credits || 0),
    });

    if (creditError) {
      console.error("Credit error:", creditError);
      return NextResponse.json({ error: "Credit update failed" }, { status: 500 });
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
