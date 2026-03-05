import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { planKey } = await req.json();

    if (!planKey) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const PRICE_MAP: Record<string, number> = {
      individual: 499,
      company_starter: 1999,
      company_growth: 2999,
      company_scale: 4999,
      pack_10: 199,
      pack_25: 399,
      pack_50: 699,
    };

    const CREDIT_MAP: Record<string, number> = {
      individual: 20,
      company_starter: 25,
      company_growth: 50,
      company_scale: 75,
      pack_10: 10,
      pack_25: 25,
      pack_50: 50,
    };

    const price = PRICE_MAP[planKey];
    const credits = CREDIT_MAP[planKey];

    if (!price || !credits) {
      return NextResponse.json({ error: "Plan not found" }, { status: 400 });
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: price * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        user_id: user.id,
        plan_key: planKey,
        credits: credits.toString(),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error("Razorpay order error:", error);
    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 }
    );
  }
}
