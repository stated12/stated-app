"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

type Plan = {
  key: string;
  name: string;
  price: number;
  credits: number;
  popular?: boolean;
};

const PLANS: Plan[] = [
  { key: "individual", name: "Individual Pro", price: 499, credits: 20, popular: true },
  { key: "company_starter", name: "Company Starter", price: 1999, credits: 25 },
  { key: "company_growth", name: "Company Growth", price: 2999, credits: 50 },
  { key: "company_scale", name: "Company Scale", price: 4999, credits: 75 },
];

const CREDIT_PACKS: Plan[] = [
  { key: "pack_10", name: "10 credits", price: 199, credits: 10 },
  { key: "pack_25", name: "25 credits", price: 399, credits: 25 },
  { key: "pack_50", name: "50 credits", price: 699, credits: 50 },
];

export default function UpgradePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    loadProfile();

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
    setLoading(false);
  }

  async function purchase(plan: Plan) {
    setBuying(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // ✅ Correct API path
    const orderRes = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planKey: plan.key }),
    });

    const orderData = await orderRes.json();

    if (!orderData.orderId) {
      alert("Order creation failed");
      setBuying(false);
      return;
    }

    const options = {
      key: orderData.key, // ✅ use key from API
      amount: orderData.amount,
      currency: "INR",
      order_id: orderData.orderId,
      handler: async function (response: any) {
        // ✅ Correct verify path
        const verifyRes = await fetch("/api/razorpay/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            planKey: plan.key,
            userId: user.id,
          }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          router.push("/dashboard");
        } else {
          alert("Payment verification failed");
        }
      },
      theme: { color: "#2563eb" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();

    setBuying(false);
  }

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  const isPro = !!profile?.plan_key;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold">Upgrade Stated</h1>

        {!isPro && (
          <>
            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="font-semibold mb-3">Pro unlocks:</h2>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✔ Analytics dashboard</li>
                <li>✔ Profile & commitment views</li>
                <li>✔ Followers (coming soon)</li>
                <li>✔ Pro badge</li>
                <li>✔ Lifetime access</li>
              </ul>
            </div>

            <div className="space-y-4">
              {PLANS.map((plan) => (
                <div key={plan.key} className="bg-white p-5 rounded-xl shadow border">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{plan.name}</div>
                      <div className="text-sm text-gray-600">
                        {plan.credits} credits included
                      </div>
                    </div>
                    <button
                      onClick={() => purchase(plan)}
                      disabled={buying}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      ₹{plan.price}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {isPro && (
          <div className="bg-green-100 p-4 rounded-lg text-green-700">
            You are a Pro member 🎉
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold mb-4">Buy credit packs</h2>
          <div className="space-y-4">
            {CREDIT_PACKS.map((pack) => (
              <div key={pack.key} className="bg-white p-5 rounded-xl shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{pack.name}</div>
                    <div className="text-sm text-gray-600">
                      Add {pack.credits} credits
                    </div>
                  </div>
                  <button
                    onClick={() => purchase(pack)}
                    disabled={buying}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    ₹{pack.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
