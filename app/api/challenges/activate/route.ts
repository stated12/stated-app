// app/api/challenges/activate/route.ts
// Called after Razorpay payment succeeds on client side
// Verifies signature, activates the challenge, sends confirmation email

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import crypto from "crypto";

const PLAN_DAYS: Record<string, number> = { basic: 30, pro: 60, scale: 90 };

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() {},
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const {
      challenge_id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
      amount_inr,
    } = await req.json();

    // ── Verify Razorpay signature ──────────────────────────────────────────
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // ── Fetch challenge + poster profile for notification ──────────────────
    const { data: challenge, error: fetchError } = await supabase
      .from("challenges")
      .select(`
        id, posted_by_user_id, status, title, type,
        profiles!posted_by_user_id ( full_name, username )
      `)
      .eq("id", challenge_id)
      .single();

    if (fetchError || !challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    if (challenge.posted_by_user_id !== session.user.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 403 });
    }

    if (challenge.status !== "draft") {
      return NextResponse.json({ error: "Challenge already activated" }, { status: 400 });
    }

    // ── Activate via SQL function ──────────────────────────────────────────
    const { error: activateError } = await supabase.rpc("activate_challenge", {
      challenge_uuid: challenge_id,
      payment_id_in:  razorpay_payment_id,
      plan_in:        plan,
      amount_in:      amount_inr * 100,
    });

    if (activateError) {
      console.error("Activate challenge error:", activateError);
      return NextResponse.json({ error: "Failed to activate challenge" }, { status: 500 });
    }

    // ── Log to payments table ──────────────────────────────────────────────
    await supabase.from("payments").insert({
      user_id:    session.user.id,
      amount:     amount_inr * 100,
      currency:   "INR",
      status:     "captured",
      payment_id: razorpay_payment_id,
      order_id:   razorpay_order_id,
      notes:      JSON.stringify({ type: "challenge", challenge_id, plan }),
    });

    // ── Send challenge created notification email ───────────────────────────
    // Fire and forget — don't block response on email
    const posterProfile = (challenge as any).profiles;
    const posterName    = posterProfile?.full_name || posterProfile?.username || "there";
    const posterEmail   = session.user.email || "";
    const durationDays  = PLAN_DAYS[plan] || 30;
    const expiresAt     = new Date(Date.now() + durationDays * 86400000).toISOString();

    const typeLabels: Record<string, string> = {
      hiring: "Hiring Challenge", cofounder: "Cofounder Hunt",
      partner: "Partner Hunt", consultant: "Consultant Hunt",
      investor_signal: "Investor Signal", collaborator: "Collaborator Hunt",
      impact: "Impact Challenge", grant: "Grant & Fellowship",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "https://app.stated.in"}/api/challenges/notify`,
      {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event:          "challenge_created",
          posterName,
          posterEmail,
          challengeTitle: challenge.title,
          challengeType:  typeLabels[challenge.type] || challenge.type,
          challengeId:    challenge_id,
          plan,
          expiresAt,
        }),
      }
    ).catch(err => console.error("Notify email error:", err));

    return NextResponse.json({ success: true, challenge_id });

  } catch (err) {
    console.error("Challenge activate error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
