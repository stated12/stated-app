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
  {
    key: "individual",
    name: "Individual",
    price: 499,
    credits: 20,
    popular: true,
  },
  {
    key: "company_starter",
    name: "Company Starter",
    price: 1999,
    credits: 25,
  },
  {
    key: "company_growth",
    name: "Company Growth",
    price: 2999,
    credits: 50,
  },
  {
    key: "company_scale",
    name: "Company Scale",
    price: 4999,
    credits: 75,
  },
];

const CREDIT_PACKS: Plan[] = [
  {
    key: "pack_10",
    name: "10 credits",
    price: 199,
    credits: 10,
  },
  {
    key: "pack_25",
    name: "25 credits",
    price: 399,
    credits: 25,
  },
  {
    key: "pack_50",
    name: "50 credits",
    price: 699,
    credits: 50,
  },
];

export default function UpgradePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    loadAccount();
  }, []);

  async function loadAccount() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUser(user);

    const { data } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user.id)
      .single();

    setAccount(data);
    setLoading(false);
  }

  async function purchase(plan: Plan, isPack: boolean) {
    if (!account) return;

    setBuying(true);

    try {
      const newCredits =
        (account.credits_remaining || 0) + plan.credits;

      const updateData: any = {
        credits_remaining: newCredits,
      };

      // only set plan_key on first purchase
      if (!account.plan_key && !isPack) {
        updateData.plan_key = plan.key;
        updateData.plan_purchased_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from("accounts")
        .update(updateData)
        .eq("user_id", user.id);

      if (error) throw error;

      alert(`Success! ${plan.credits} credits added`);

      router.push("/dashboard");
    } catch (err) {
      alert("Purchase failed");
    }

    setBuying(false);
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading...
      </div>
    );
  }

  const isFreeUser = !account?.plan_key;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Upgrade Stated
        </h1>

        {isFreeUser && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Choose your plan
            </h2>

            <div className="space-y-4 mb-8">
              {PLANS.map((plan) => (
                <div
                  key={plan.key}
                  className={`bg-white p-5 rounded-xl shadow border ${
                    plan.popular
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">

                    <div>
                      <div className="font-semibold text-lg">
                        {plan.name}
                      </div>

                      <div className="text-gray-600 text-sm">
                        {plan.credits} credits
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        purchase(plan, false)
                      }
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

        {/* Credit Packs */}

        <h2 className="text-lg font-semibold mb-4">
          Buy credit packs
        </h2>

        <div className="space-y-4">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.key}
              className="bg-white p-5 rounded-xl shadow border border-gray-200"
            >
              <div className="flex justify-between items-center">

                <div>
                  <div className="font-semibold">
                    {pack.name}
                  </div>

                  <div className="text-gray-600 text-sm">
                    Add {pack.credits} credits
                  </div>
                </div>

                <button
                  onClick={() =>
                    purchase(pack, true)
                  }
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
  );
}
