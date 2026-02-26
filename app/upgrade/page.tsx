"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type UserType = "individual" | "company";

export default function UpgradePage() {
  const supabase = createClient();

  const [currentPlan, setCurrentPlan] = useState<string>("free");
  const [userType, setUserType] = useState<UserType>("individual");
  const [loadingPlan, setLoadingPlan] = useState(true);

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan_key")
        .eq("id", user.id)
        .single();

      setCurrentPlan(profile?.plan_key || "free");

      const { data: companyMember } = await supabase
        .from("company_members")
        .select("company_id, role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (companyMember) {
        setUserType("company");
      }

      setLoadingPlan(false);
    }

    loadData();
  }, []);

  async function handlePurchase(planKey: string) {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planKey }),
    });

    const data = await res.json();

    if (!data.orderId) {
      alert("Payment initialization failed");
      return;
    }

    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      order_id: data.orderId,
      handler: async function (response: any) {
        await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            planKey,
          }),
        });

        window.location.href = "/dashboard";
      },
      theme: { color: "#1E4ED8" },
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
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
          disabled={isCurrent || loadingPlan}
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
    <div className="grid md:grid-cols-3 gap-8">
      <PlanCard
        title="Starter"
        price="499"
        planKey="ind_499"
        features={[
          "20 Credits",
          "Public commitments",
          "View counts visible",
          "Analytics unlocked",
        ]}
      />

      <PlanCard
        title="Growth"
        price="899"
        planKey="ind_899"
        highlight
        features={[
          "40 Credits",
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
          "60 Credits",
          "Analytics unlocked",
          "PRO badge",
          "Completion scoring",
        ]}
      />
    </div>
  );

  const companyPlans = (
    <div className="grid md:grid-cols-3 gap-8">
      <PlanCard
        title="Team"
        price="1999"
        planKey="comp_1999"
        features={[
          "Up to 10 members",
          "25 Shared Credits",
          "Company dashboard",
          "Analytics unlocked",
        ]}
      />

      <PlanCard
        title="Growth"
        price="2999"
        planKey="comp_2999"
        highlight
        features={[
          "Up to 15 members",
          "50 Shared Credits",
          "Analytics unlocked",
          "Reputation scoring",
        ]}
      />

      <PlanCard
        title="Scale"
        price="4999"
        planKey="comp_4999"
        features={[
          "Up to 25 members",
          "75 Shared Credits",
          "Full analytics",
          "Advanced reporting ready",
        ]}
      />
    </div>
  );

  return (
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

        {userType === "individual" ? individualPlans : companyPlans}

        {userType === "individual" && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">
              Need Extra Credits?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Pack 10", price: 199, key: "pack_10" },
                { title: "Pack 25", price: 399, key: "pack_25" },
                { title: "Pack 50", price: 699, key: "pack_50" },
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
        )}

        <div className="text-center text-sm text-gray-500 border-t pt-8">
          Secure payments via Razorpay • Instant activation •
          One-time purchase • No subscription lock-in
        </div>

      </div>
    </div>
  );
}
