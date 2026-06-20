// app/api/challenges/create-order/route.ts
// Creates a Razorpay order for an existing draft challenge (payment resume flow)

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Razorpay from "razorpay";
import { CHALLENGE_PRICES, type ChallengeType, type ChallengePlan } from "@/lib/challenges-config";

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll() { return cookieStore.getAll(); }, setAll() {} } }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

    const { challenge_id, plan } = await req.json();

    // Verify ownership and draft status
    const { data: challenge } = await supabase
      .from("challenges")
      .select("id, type, status, posted_by_user_id")
      .eq("id", challenge_id)
      .single();

    if (!challenge) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (challenge.posted_by_user_id !== session.user.id) return NextResponse.json({ error: "Unauthorised" }, { status: 403 });
    if (challenge.status !== "draft") return NextResponse.json({ error: "Already active" }, { status: 400 });

    // Update the plan on the draft
    await supabase.from("challenges").update({ plan }).eq("id", challenge_id);

    const priceINR = CHALLENGE_PRICES[challenge.type as ChallengeType][plan as ChallengePlan];
    if (!priceINR) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    const order = await razorpay.orders.create({
      amount:   priceINR * 100,
      currency: "INR",
      receipt:  `pay_${challenge_id.slice(0, 16)}`,
      notes:    { challenge_id, plan, user_id: session.user.id },
    });

    return NextResponse.json({ razorpay_order: order, amount_inr: priceINR });

  } catch (err) {
    console.error("Create order error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
