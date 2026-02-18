import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import { getAccountTypeLabel } from "../../lib/account";

export default async function Dashboard() {
  const supabase = await createClient();

  // Get logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Login
        </Link>
      </div>
    );
  }

  // Get account
  const { data: account } = await supabase
    .from("accounts")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get commitments
  const { data: commitments } = await supabase
    .from("commitments")
    .select("*")
    .eq("account_id", user.id)
    .order("created_at", { ascending: false });

  const credits = account?.credits ?? 0;

  const total = commitments?.length ?? 0;
  const active =
    commitments?.filter((c) => c.status === "active").length ?? 0;
  const completed =
    commitments?.filter((c) => c.status === "completed").length ?? 0;
  const failed =
    commitments?.filter((c) => c.status === "failed").length ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <h1 className="text-3xl font-bold">Stated</h1>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow p-5 space-y-3">

          <div className="text-lg font-semibold">
            {profile?.name || "No name set"}
          </div>

          <div className="text-gray-600">
            {profile?.bio || "No bio added"}
          </div>

          <div className="text-sm text-gray-500">
            Public URL:
            <div>
              stated.app/u/{profile?.username}
            </div>
          </div>

          <div className="text-sm">
            Account type:
            <span className="ml-1 font-medium">
              {getAccountTypeLabel(account?.account_type || "individual")}
            </span>
          </div>

          <div className="flex gap-3 pt-2 flex-wrap">

            <Link
              href="/profile/edit"
              className="border px-4 py-2 rounded-lg"
            >
              Edit profile
            </Link>

            <Link
              href={`/u/${profile?.username}`}
              className="border px-4 py-2 rounded-lg"
            >
              Public profile
            </Link>

            <Link
              href="/upgrade"
              className="border px-4 py-2 rounded-lg"
            >
              Upgrade
            </Link>

          </div>
        </div>

        {/* Credits Card */}
        <div className="bg-white rounded-xl shadow p-5">

          <div className="text-lg font-semibold">
            Credits remaining: {credits}
          </div>

          {credits === 0 && (
            <Link
              href="/upgrade"
              className="text-blue-600 text-sm"
            >
              Buy credits to continue
            </Link>
          )}

        </div>

        {/* Analytics */}
        <div className="bg-white rounded-xl shadow p-5">

          <div className="font-semibold mb-3">
            Your stats
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">

            <div>
              Total: {total}
            </div>

            <div>
              Active: {active}
            </div>

            <div>
              Completed: {completed}
            </div>

            <div>
              Failed: {failed}
            </div>

          </div>

        </div>

        {/* Create Commitment */}
        <Link
          href="/commitment/new"
          className={`block text-center py-3 rounded-lg text-white ${
            credits === 0
              ? "bg-gray-400 pointer-events-none"
              : "bg-blue-600"
          }`}
        >
          Create Commitment
        </Link>

        {/* Commitments List */}
        <div className="space-y-4">

          <div className="font-semibold">
            Your commitments
          </div>

          {commitments?.length === 0 && (
            <div className="text-gray-500">
              No commitments yet
            </div>
          )}

          {commitments?.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl shadow p-4"
            >

              <div className="font-medium">
                {c.text}
              </div>

              <div className="text-sm text-gray-500 mt-1">
                {c.category} • {c.duration}
              </div>

              <div className="text-sm mt-1">

                Status:
                <span className="ml-1 capitalize font-medium">
                  {c.status}
                </span>

              </div>

              <div className="text-xs text-gray-400 mt-1">
                {new Date(c.created_at).toLocaleDateString()}
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
