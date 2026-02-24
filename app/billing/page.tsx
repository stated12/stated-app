export const dynamic = "force-dynamic";

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function BillingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Login
        </Link>
      </div>
    );
  }

  // ================= PROFILE =================
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan_key, credits, plan_purchased_at")
    .eq("id", user.id)
    .single();

  const isPro = !!profile?.plan_key;

  // ================= PAYMENTS =================
  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  const formatAmount = (amount: number, currency: string) => {
    if (!amount) return "—";
    const value = amount / 100;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              Billing
            </h1>
            <div className="text-sm text-gray-500">
              Manage your plan and payments
            </div>
          </div>

          <Link
            href="/dashboard"
            className="text-sm text-gray-500 hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Current Plan */}
        <div className="bg-white rounded-xl shadow p-5 space-y-3">
          <div className="font-semibold text-lg">
            Current Plan
          </div>

          <div className="text-sm text-gray-700">
            {isPro ? (
              <>
                <div>
                  Plan: <span className="font-medium capitalize">{profile.plan_key}</span>
                </div>
                <div>
                  Purchased:{" "}
                  {profile.plan_purchased_at
                    ? new Date(profile.plan_purchased_at).toLocaleDateString()
                    : "—"}
                </div>
              </>
            ) : (
              <div>Free Plan</div>
            )}
          </div>

          <div>
            Credits remaining:{" "}
            <span className="font-medium">{profile?.credits ?? 0}</span>
          </div>

          {!isPro && (
            <Link
              href="/upgrade"
              className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              Upgrade Plan
            </Link>
          )}
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="font-semibold text-lg mb-4">
            Payment History
          </div>

          {!payments || payments.length === 0 ? (
            <div className="text-sm text-gray-500">
              No payments yet.
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {formatAmount(payment.amount, payment.currency)}
                    </div>

                    <div className="text-xs text-gray-500">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </div>

                    {payment.credits_purchased > 0 && (
                      <div className="text-xs text-gray-500">
                        Credits purchased: {payment.credits_purchased}
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-400 capitalize">
                    {payment.payment_method}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
