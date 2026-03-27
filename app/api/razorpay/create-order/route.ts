import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { planKey } = await req.json();

    if (!planKey) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    const PRICE_MAP: Record<string, number> = {
      ind_499: 499, ind_899: 899, ind_1299: 1299,
      comp_1999: 1999, comp_2999: 2999, comp_4999: 4999,
      pack_10: 199, pack_25: 399, pack_50: 699,
    };

    const CREDIT_MAP: Record<string, number> = {
      ind_499: 20, ind_899: 40, ind_1299: 60,
      comp_1999: 25, comp_2999: 50, comp_4999: 75,
      pack_10: 10, pack_25: 25, pack_50: 50,
    };

    const price   = PRICE_MAP[planKey];
    const credits = CREDIT_MAP[planKey];

    if (!price || !credits) {
      return NextResponse.json({ error: "Plan not found" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For company plans, find the company this user owns so webhook
    // can credit the company account instead of the individual profile.
    let companyId: string | null = null;
    if (planKey.startsWith("comp_")) {
      const { data: co } = await supabase
        .from("companies")
        .select("id")
        .eq("owner_user_id", user.id)
        .maybeSingle();
      companyId = co?.id || null;
    }

    const razorpay = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const notes: Record<string, string> = {
      user_id:  user.id,
      plan_key: planKey,
      credits:  credits.toString(),
    };

    // Pass company_id in notes so webhook routes credits to correct account
    if (companyId) {
      notes.company_id = companyId;
    }

    const order = await razorpay.orders.create({
      amount:   price * 100,
      currency: "INR",
      receipt:  "receipt_" + Date.now(),
      notes,
    });

    return NextResponse.json({
      orderId:   order.id,
      amount:    order.amount,
      key:       process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      isCompany: !!companyId,
    });

  } catch (error: any) {
    console.error("Razorpay order error:", error);
    return NextResponse.json(
      { error: error?.message || "Order creation failed" },
      { status: 500 }
    );
  }
}
