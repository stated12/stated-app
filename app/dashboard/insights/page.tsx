import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function InsightsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const isPro = !!profile?.plan_key;

  const { data: commitments } = await supabase
    .from("commitments")
    .select("*")
    .eq("user_id", user.id);

  const commitmentIds = commitments?.map((c) => c.id) || [];

  const { count: profileViews } = isPro
    ? await supabase
        .from("profile_views")
        .select("*", { count: "exact", head: true })
        .eq("profile_id", user.id)
    : { count: 0 };

  let commitmentViews = 0;

  if (isPro && commitmentIds.length > 0) {
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

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold">Insights</div>
          {isPro && (
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
              PRO
            </span>
          )}
        </div>

        {isPro ? (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Profile views: {profileViews ?? 0}</div>
            <div>Total commitments: {total}</div>
            <div>Commitment views: {commitmentViews}</div>
            <div>Active: {active}</div>
            <div>Completed: {completed}</div>
            <div>Paused / Withdrawn: {paused}</div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            Upgrade to unlock insights.
          </div>
        )}

      </div>

    </div>
  );
}
