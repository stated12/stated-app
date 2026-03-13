import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ReputationCard from "@/components/ReputationCard";

export default async function InsightsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const PRO_PLANS = [
    "ind_499",
    "ind_899",
    "ind_1299",
    "comp_1999",
    "comp_2999",
    "comp_4999",
  ];

  const isPro = PRO_PLANS.includes(profile?.plan_key);

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id,status,shares")
    .eq("user_id", user.id)
    .is("company_id", null);

  const commitmentIds = commitments?.map((c) => c.id) || [];

  const { count: profileViews } = await supabase
    .from("profile_views")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", user.id);

  let commitmentViews = 0;

  if (commitmentIds.length > 0) {
    const { data } = await supabase
      .from("commitment_views")
      .select("commitment_id")
      .in("commitment_id", commitmentIds);

    commitmentViews = data?.length ?? 0;
  }

  const total = commitments?.length ?? 0;

  const active =
    commitments?.filter((c) => c.status === "active").length ?? 0;

  const completed =
    commitments?.filter((c) => c.status === "completed").length ?? 0;

  const paused =
    commitments?.filter(
      (c) => c.status === "paused" || c.status === "withdrawn"
    ).length ?? 0;

  const totalShares =
    commitments?.reduce((sum, c) => sum + (c.shares ?? 0), 0) ?? 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className="bg-white rounded-xl shadow p-6 relative">

        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-semibold">Insights</div>

          {isPro && (
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
              PRO
            </span>
          )}
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 gap-4 text-center">

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">
              👤 Profile Views
            </div>
            <div className="text-xl font-semibold">
              {profileViews ?? 0}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">
              👁 Commitment Views
            </div>
            <div className="text-xl font-semibold">
              {commitmentViews}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 text-blue-700">
            <div className="text-xs mb-1">
              🔁 Total Shares
            </div>
            <div className="text-xl font-semibold">
              {totalShares}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">
              📝 Total Commitments
            </div>
            <div className="text-xl font-semibold">
              {total}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-6 pt-4" />

        {/* Commitment Status */}
        <div className="grid grid-cols-3 text-center text-sm text-gray-600">

          <div>
            <div className="font-semibold text-gray-900">
              {active}
            </div>
            Active
          </div>

          <div>
            <div className="font-semibold text-gray-900">
              {completed}
            </div>
            Completed
          </div>

          <div>
            <div className="font-semibold text-gray-900">
              {paused}
            </div>
            Paused / Withdrawn
          </div>

        </div>

        {!isPro && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl">

            <div className="text-center space-y-3">

              <div className="text-2xl">🔒</div>

              <div className="text-sm text-gray-700 font-medium">
                Insights available on PRO
              </div>

              <a
                href="/upgrade"
                className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Upgrade to PRO
              </a>

            </div>

          </div>
        )}

      </div>

      <ReputationCard userId={user.id} />

    </div>
  );
}
