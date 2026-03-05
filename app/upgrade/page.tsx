"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { createClient } from "@/lib/supabase/client";

export default function UpgradePage() {
  const supabase = createClient();

  const [currentPlan, setCurrentPlan] = useState<string>("free");
  const [credits, setCredits] = useState<number>(0);
  const [userType, setUserType] = useState<
    "individual" | "company_member" | "company_owner"
  >("individual");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan_key, credits")
        .eq("id", user.id)
        .single();

      setCurrentPlan(profile?.plan_key || "free");
      setCredits(profile?.credits || 0);

      const { data: membership } = await supabase
        .from("company_members")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (membership) {
        if (membership.role === "owner") {
          setUserType("company_owner");
        } else {
          setUserType("company_member");
        }
      }

      setLoading(false);
    }

    loadData();
  }, []);

  async function handlePurchase(planKey: string) {
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planKey }),
      });

      const data = await res.json();

      if (!res.ok || !data.orderId) {
        alert(data.error || "Payment initialization failed");
        return;
      }

      if (!(window as any).Razorpay) {
        alert("Payment system failed to load. Please refresh.");
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        order_id: data.orderId,

        handler: async function (response: any) {
          await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...response,
              planKey,
            }),
          });

          window.location.href = "/dashboard";
        },

        theme: {
          color: "#1E4ED8",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed to start.");
    }
  }

  function PlanCard({
    title,
    price,
    features,
    planKey,
    highlight = false,
  }: any) {
    const isCurrent = currentPlan === planKey;

    return (
      <div
        className={`rounded-xl p-6 shadow bg-white flex flex-col justify-between ${
          highlight ? "border-2 border-blue-600" : ""
        }`}
      >
        {highlight && (
          <div className="text-xs font-semibold text-blue-600 mb-2">
            ⭐ Most Popular
          </div>
        )}

        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-2xl font-bold mt-2">₹{price}</div>

          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {features.map((f: string, i: number) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>
        </div>

        <button
          disabled={isCurrent || loading}
          onClick={() => handlePurchase(planKey)}
          className={`mt-6 py-2 rounded-lg font-medium ${
            isCurrent
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isCurrent ? "Current Plan" : "Choose Plan"}
        </button>
      </div>
    );
  }

  const individualPlans = (
    <>
      <div className="text-center text-sm text-gray-600 mb-8">
        You currently have{" "}
        <span className="font-semibold">{credits}</span> credits.
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <PlanCard
          title="Starter"
          price="499"
          planKey="ind_499"
          features={[
            "20 credits",
            "Analytics unlocked",
            "Completion tracking",
            "Public commitment views",
          ]}
        />

        <PlanCard
          title="Growth"
          price="899"
          planKey="ind_899"
          highlight
          features={[
            "40 credits",
            "Analytics unlocked",
            "PRO badge",
            "Extended dashboard insights",
          ]}
        />

        <PlanCard
          title="Pro Creator"
          price="1299"
          planKey="ind_1299"
          features={[
            "60 credits",
            "Analytics unlocked",
            "PRO badge",
            "Completion scoring",
          ]}
        />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Extra Credit Packs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "10 Credits", price: 199, key: "pack_10" },
            { title: "25 Credits", price: 399, key: "pack_25" },
            { title: "50 Credits", price: 699, key: "pack_50" },
          ].map((pack) => (
            <div
              key={pack.key}
              className="bg-white rounded-xl shadow p-6 text-center"
            >
              <div className="font-semibold">{pack.title}</div>

              <div className="text-2xl font-bold mt-2">
                ₹{pack.price}
              </div>

              <button
                onClick={() => handlePurchase(pack.key)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Buy Pack
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const companyPlans = (
    <div className="grid md:grid-cols-3 gap-8">
      <PlanCard
        title="Team"
        price="1999"
        planKey="comp_1999"
        features={[
          "25 shared credits",
          "Up to 10 members",
          "Company analytics",
          "Team dashboard",
        ]}
      />

      <PlanCard
        title="Growth"
        price="2999"
        planKey="comp_2999"
        highlight
        features={[
          "50 shared credits",
          "Up to 15 members",
          "Company analytics",
          "Reputation scoring",
        ]}
      />

      <PlanCard
        title="Scale"
        price="4999"
        planKey="comp_4999"
        features={[
          "75 shared credits",
          "Up to 25 members",
          "Full analytics suite",
          "Advanced reporting ready",
        ]}
      />
    </div>
  );

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-6xl mx-auto space-y-16">

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Stated" width={40} height={40} />

              <div>
                <div className="text-2xl font-bold text-blue-600">
                  Stated
                </div>
                <div className="text-sm text-gray-500">
                  Upgrade Your Plan
                </div>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="text-sm text-gray-500 hover:underline"
            >
              ← Back to Dashboard
            </Link>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold">
              Unlock More Accountability Power
            </h1>

            <p className="text-gray-600 mt-3">
              More credits, analytics access, and team scaling.
            </p>
          </div>

          {userType === "individual" && individualPlans}

          {userType === "company_owner" && companyPlans}

          {userType === "company_member" && (
            <div className="text-center text-gray-600">
              Only the company owner can upgrade the company plan.
            </div>
          )}

          <div className="text-center text-sm text-gray-500 border-t pt-8">
            Secure payments via Razorpay • One-time payment • Instant activation • No subscription lock-in
          </div>

        </div>
      </div>
    </>
  );
}
