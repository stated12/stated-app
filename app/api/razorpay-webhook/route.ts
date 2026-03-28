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

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    // Only handle successful captures
    if (event.event !== "payment.captured") {
      return NextResponse.json({ message: "Event ignored" }, { status: 200 });
    }

    const payment = event.payload.payment.entity;

    // Validate payment status
    if (payment.status !== "captured") {
      return NextResponse.json({ message: "Payment not captured" }, { status: 200 });
    }

    const userId       = payment.notes?.user_id;
    const companyId    = payment.notes?.company_id || null;
    const creditsToAdd = Number(payment.notes?.credits || 0);
    const planKey      = payment.notes?.plan_key || "";
    const noteAmount   = Number(payment.notes?.amount || 0);

    if (!userId) {
      return NextResponse.json({ error: "Missing user_id in notes" }, { status: 400 });
    }
    if (creditsToAdd <= 0) {
      return NextResponse.json({ error: "Invalid credits amount" }, { status: 400 });
    }

    // Validate amount matches expected (prevents tampered payments)
    // noteAmount is in paise, payment.amount is in paise
    if (noteAmount > 0 && payment.amount !== noteAmount) {
      console.error("Amount mismatch:", payment.amount, "vs notes:", noteAmount);
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Idempotency -- skip if already processed
    const { data: existing } = await supabase
      .from("payments")
      .select("id, status")
      .eq("razorpay_payment_id", payment.id)
      .maybeSingle();

    if (existing?.status === "paid") {
      return NextResponse.json({ message: "Already processed" }, { status: 200 });
    }

    const isCompanyPlan = planKey.startsWith("comp_");
    const isPack        = planKey.startsWith("pack_");
    const paymentType   = isPack ? "credit_pack" : "plan";

    // Record payment
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
      }, { onConflict: "razorpay_payment_id" })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    // Route credits to correct account
    if (companyId && (isCompanyPlan || isPack)) {
      // COMPANY -- atomic increment using RPC to prevent race conditions
      const { error: rpcError } = await supabase.rpc("increment_company_credits", {
        company_id_input: companyId,
        credit_amount:    creditsToAdd,
      });

      if (rpcError) {
        // Fallback to direct update
        const { data: co } = await supabase
          .from("companies").select("credits").eq("id", companyId).single();
        await supabase
          .from("companies")
          .update({ credits: (co?.credits ?? 0) + creditsToAdd })
          .eq("id", companyId);
      }

      // Update plan key for plan purchases
      if (isCompanyPlan) {
        await supabase
          .from("companies")
          .update({ plan_key: planKey, plan_purchased_at: new Date().toISOString() })
          .eq("id", companyId);
      }

    } else {
      // INDIVIDUAL -- atomic increment
      const { error: rpcError } = await supabase.rpc("increment_credits", {
        user_id_input: userId,
        credit_amount: creditsToAdd,
      });

      if (rpcError) {
        const { data: prof } = await supabase
          .from("profiles").select("credits").eq("id", userId).single();
        await supabase
          .from("profiles")
          .update({ credits: (prof?.credits ?? 0) + creditsToAdd })
          .eq("id", userId);
      }

      if (planKey && !isPack) {
        await supabase
          .from("profiles")
          .update({ plan_key: planKey, plan_purchased_at: new Date().toISOString() })
          .eq("id", userId);
      }
    }

    return NextResponse.json({ message: "Payment processed" }, { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
