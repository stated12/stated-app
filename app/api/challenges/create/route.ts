// app/api/challenges/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Razorpay from "razorpay";
import {
  ChallengeType,
  ChallengePlan,
  CHALLENGE_PRICES,
  CHALLENGE_TYPES,
} from "@/lib/challenges-config";

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const body = await req.json();

    const {
      type,
      plan,
      title,
      description,
      what_we_need,
      evaluation_criteria,
      what_winner_gets,
      deadline,
      location,
      tags,
      require_text,
      require_link,
      require_file,
      require_video,
      company_id,
      posted_by_type,
    }: {
      type:                ChallengeType;
      plan:                ChallengePlan;
      title:               string;
      description:         string;
      what_we_need:        string;
      evaluation_criteria: string;
      what_winner_gets:    string;
      deadline:            string;
      location?:           string;
      tags?:               string[];
      require_text:        string;
      require_link:        string;
      require_file:        string;
      require_video:       string;
      company_id?:         string;
      posted_by_type:      "profile" | "company";
    } = body;

    // Validate required fields
    if (!type || !plan || !title || !description || !what_we_need || !evaluation_criteria || !what_winner_gets || !deadline) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!CHALLENGE_TYPES[type]) {
      return NextResponse.json({ error: "Invalid challenge type" }, { status: 400 });
    }

    const priceINR = CHALLENGE_PRICES[type][plan];
    if (!priceINR) {
      return NextResponse.json({ error: "Invalid plan or contact us for this tier" }, { status: 400 });
    }

    // 1. Create the challenge as draft
    const { data: challenge, error: challengeError } = await supabase
      .from("challenges")
      .insert({
        posted_by_user_id:   session.user.id,
        posted_by_type,
        company_id:          company_id || null,
        type,
        plan,
        title,
        description,
        what_we_need,
        evaluation_criteria,
        what_winner_gets,
        deadline,
        location:            location || null,
        tags:                tags || [],
        require_text,
        require_link,
        require_file,
        require_video,
        status:              "draft",
        payment_status:      "pending",
        amount_paid:         0,
      })
      .select("id")
      .single();

    if (challengeError || !challenge) {
      console.error("Challenge insert error:", challengeError);
      return NextResponse.json({ error: "Failed to create challenge" }, { status: 500 });
    }

    // 2. Create Razorpay order
    const order = await razorpay.orders.create({
      amount:   priceINR * 100, // paise
      currency: "INR",
      receipt:  `chal_${challenge.id.slice(0, 16)}`,
      notes: {
        challenge_id: challenge.id,
        plan,
        type,
        user_id: session.user.id,
      },
    });

    return NextResponse.json({
      challenge_id:    challenge.id,
      razorpay_order:  order,
      amount_inr:      priceINR,
    });

  } catch (err) {
    console.error("Challenge create error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
