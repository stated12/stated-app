import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const PRICE_MAP: Record<
  string,
  { amount: number; credits: number; type: "plan" | "pack" }
> = {
  individual: { amount: 49900, credits: 20, type: "plan" },
  company_starter: { amount: 199900, credits: 25, type: "plan" },
  company_growth: { amount: 299900, credits: 50, type: "plan" },
  company_scale: { amount: 499900, credits: 75, type: "plan" },
  pack_10: { amount: 19900, credits: 10, type: "pack" },
  pack_25: { amount: 39900, credits: 25, type: "pack" },
  pack_50: { amount: 69900, credits: 50, type: "pack" },
};

export async function POST(req: Request) {
  const { planKey } = await req.json();

  if (!planKey || !PRICE_MAP[planKey]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const plan = PRICE_MAP[planKey];

  const order = await razorpay.orders.create({
    amount: plan.amount,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  return NextResponse.json({
    orderId: order.id,
    amount: plan.amount,
  });
}
