export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
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
    .select("*")
    .eq("id", user.id)
    .single();

  const isPro = !!profile?.plan_key;
  const credits = profile?.credits ?? 0;

  // ================= PAYMENTS =================
  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const totalCreditsPurchased =
    payments?.reduce(
      (sum, p) => sum + (p.credits_purchased || 0),
      0
    ) ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Stated logo"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-bold text-blue-600">
              Billing
            </h1>
          </div>

          <Link
            href="/dashboard"
            className="text-sm text-gray-500 hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* ================= CURRENT PLAN ================= */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <div className="text-sm text-gray-500">
                Current Plan
              </div>
              <div className="text-xl font-semibold mt-1">
                {isPro ? "Pro Plan" : "Free Plan"}
              </div>
              {profile?.plan_purchased_at && (
                <div className="text-xs text-gray-400 mt-1">
                  Activated{" "}
                  {new Date(
                    profile.plan_purchased_at
                  ).toLocaleDateString()}
                </div>
              )}
            </div>

            {!isPro && (
              <Link
                href="/upgrade"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>

        {/* ================= CREDITS SUMMARY ================= */}
        <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-sm text-gray-500">
              Credits Remaining
            </div>
            <div className="text-2xl font-bold mt-1">
              {credits}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">
              Total Credits Purchased
            </div>
            <div className="text-2xl font-bold mt-1">
              {totalCreditsPurchased}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">
              Total Payments
            </div>
            <div className="text-2xl font-bold mt-1">
              {payments?.length ?? 0}
            </div>
          </div>
        </div>

        {/* ================= PAYMENT HISTORY ================= */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-lg font-semibold mb-4">
            Payment History
          </div>

          {payments && payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b text-gray-500">
                  <tr>
                    <th className="py-3 text-left">Date</th>
                    <th className="py-3 text-left">Amount</th>
                    <th className="py-3 text-left">Credits</th>
                    <th className="py-3 text-left">Method</th>
                    <th className="py-3 text-left">Status</th>
                    <th className="py-3 text-left">Receipt</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b last:border-none"
                    >
                      <td className="py-3">
                        {new Date(
                          payment.created_at
                        ).toLocaleDateString()}
                      </td>

                      <td className="py-3">
                        ₹{(payment.amount || 0) / 100}
                      </td>

                      <td className="py-3">
                        {payment.credits_purchased}
                      </td>

                      <td className="py-3 capitalize">
                        {payment.payment_method || "-"}
                      </td>

                      <td className="py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            payment.status === "paid"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className="py-3 text-xs">
                        {payment.status === "paid" ? (
                          <span className="text-gray-600">
                            Receipt sent via email
                          </span>
                        ) : (
                          <span className="text-gray-400">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">
              No payments yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
