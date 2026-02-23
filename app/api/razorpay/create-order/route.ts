import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

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

    const price = PRICE_MAP[planKey];

    if (!price) {
      return NextResponse.json({ error: "Plan not found" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: price * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
  }
}
