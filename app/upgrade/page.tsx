"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function UpgradePage() {
  const supabase = createClient();
  const router = useRouter();

  const [credits, setCredits] = useState<number | null>(null);
  const [planPurchased, setPlanPurchased] = useState(false);
  const [loading, setLoading] = useState(true);

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

    const { data } = await supabase
      .from("accounts")
      .select("credits_remaining, plan_key")
      .eq("user_id", user.id)
      .single();

    if (data) {
      setCredits(data.credits_remaining ?? 0);
      setPlanPurchased(!!data.plan_key);
    }

    setLoading(false);
  }

  async function handlePurchase(planKey: string, creditsToAdd: number) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: account } = await supabase
      .from("accounts")
      .select("credits_remaining")
      .eq("user_id", user.id)
      .single();

    const newCredits =
      (account?.credits_remaining ?? 0) + creditsToAdd;

    await supabase
      .from("accounts")
      .update({
        credits_remaining: newCredits,
        plan_key: planPurchased ? account?.plan_key : planKey,
      })
      .eq("user_id", user.id);

    alert("Purchase successful");

    router.push("/dashboard");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
      <div className="w-full max-w-xl space-y-6">

        <div>
          <h1 className="text-3xl font-bold">Upgrade</h1>
          <p className="text-gray-600 mt-1">
            Get credits to create commitments
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-lg font-medium">
            Credits remaining: {credits}
          </p>
        </div>

        {!planPurchased && (
          <div className="bg-white p-4 rounded-xl shadow space-y-4">

            <h2 className="text-xl font-semibold">
              Unlock full access
            </h2>

            <PlanCard
              title="Individual Plan"
              price="₹499"
              credits="20 credits"
              onClick={() =>
                handlePurchase("individual", 20)
              }
            />

            <PlanCard
              title="Company Standard"
              price="₹1999"
              credits="25 credits"
              onClick={() =>
                handlePurchase("company_standard", 25)
              }
            />

            <PlanCard
              title="Company Growth"
              price="₹2999"
              credits="50 credits"
              onClick={() =>
                handlePurchase("company_growth", 50)
              }
            />

          </div>
        )}

        <div className="bg-white p-4 rounded-xl shadow space-y-4">

          <h2 className="text-xl font-semibold">
            Buy Credit Packs
          </h2>

          <PlanCard
            title="Starter Pack"
            price="₹199"
            credits="10 credits"
            onClick={() =>
              handlePurchase("credit_pack", 10)
            }
          />

          <PlanCard
            title="Popular Pack"
            price="₹399"
            credits="25 credits"
            onClick={() =>
              handlePurchase("credit_pack", 25)
            }
          />

          <PlanCard
            title="Pro Pack"
            price="₹699"
            credits="50 credits"
            onClick={() =>
              handlePurchase("credit_pack", 50)
            }
          />

        </div>

      </div>
    </div>
  );
}

function PlanCard({
  title,
  price,
  credits,
  onClick,
}: {
  title: string;
  price: string;
  credits: string;
  onClick: () => void;
}) {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-center">

      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-600 text-sm">{credits}</p>
      </div>

      <button
        onClick={onClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Buy {price}
      </button>

    </div>
  );
}
