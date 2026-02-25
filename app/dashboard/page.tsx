export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import InstallButton from "@/components/InstallButton";

export default async function Dashboard() {
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

  // PROFILE
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const isPro = !!profile?.plan_key;
  const credits = profile?.credits ?? 0;

  // COMMITMENTS
  const { data: commitments } = await supabase
    .from("commitments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const commitmentIds = commitments?.map((c) => c.id) || [];

  // UPDATES
  const { data: updates } =
    commitmentIds.length > 0
      ? await supabase
          .from("commitment_updates")
          .select("*")
          .in("commitment_id", commitmentIds)
          .order("created_at", { ascending: false })
      : { data: [] };

  // ANALYTICS
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

  // STATS
  const total = commitments?.length ?? 0;
  const active =
    commitments?.filter((c) => c.status === "active").length ?? 0;
  const completed =
    commitments?.filter((c) => c.status === "completed").length ?? 0;
  const paused =
    commitments?.filter(
      (c) => c.status === "paused" || c.status === "withdrawn"
    ).length ?? 0;

  const avatar =
    profile?.avatar_url?.trim()
      ? profile.avatar_url.trim()
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile?.display_name || profile?.username || "User"
        )}&background=2563eb&color=fff`;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Stated logo" width={40} height={40} />
            <div>
              <h1 className="text-2xl font-bold text-blue-600">Stated</h1>
              <div className="text-sm text-gray-500">Dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <InstallButton />
            <Link href="/logout" className="text-sm text-gray-500 hover:underline">
              Logout
            </Link>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center gap-4">
            <div className="w-[72px] h-[72px] relative">
              <Image
                src={avatar}
                alt="avatar"
                fill
                sizes="72px"
                className="rounded-full object-cover"
              />
            </div>

            <div>
              <div className="text-lg font-semibold flex items-center gap-2">
                {profile?.display_name || "No name set"}
                {isPro && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                    PRO
                  </span>
                )}
              </div>

              <div className="text-gray-600 text-sm">
                {profile?.bio || "No bio added"}
              </div>

              <div className="text-xs text-gray-400 mt-1">
                app.stated.in/u/{profile?.username}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 flex-wrap">
            <Link href="/profile/edit" className="border px-4 py-2 rounded-lg hover:bg-gray-50">
              Edit profile
            </Link>
            <Link href={`/u/${profile?.username}`} className="border px-4 py-2 rounded-lg hover:bg-gray-50">
              Public profile
            </Link>
            <Link href="/billing" className="border px-4 py-2 rounded-lg hover:bg-gray-50">
              Billing
            </Link>
            <Link href="/account" className="border px-4 py-2 rounded-lg hover:bg-gray-50">
              Account settings
            </Link>
            {!isPro && (
              <Link href="/upgrade" className="border px-4 py-2 rounded-lg hover:bg-gray-50">
                Upgrade
              </Link>
            )}
          </div>
        </div>

        {/* CREDITS */}
        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div className="font-medium">
            Credits remaining: {credits}
          </div>

          <Link
            href="/upgrade"
            className="text-sm text-blue-600 hover:underline"
          >
            Buy credits
          </Link>
        </div>

        {/* ANALYTICS */}
        <div
          className={`bg-white rounded-xl shadow p-5 ${
            isPro ? "border border-blue-200" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="font-semibold">Analytics</div>
            {!isPro && <span>🔒</span>}
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
            <div className="relative">
              <div className="blur-sm select-none text-sm text-gray-500">
                Profile views: 124
                <br />
                Commitment views: 89
                <br />
                Active: 3
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  href="/upgrade"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Upgrade to unlock analytics
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* CREATE BUTTON */}
        <Link
          href={credits === 0 ? "/upgrade" : "/commitment/new"}
          className="block text-center py-3 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700"
        >
          {credits === 0
            ? "No credits left – Buy credits"
            : "Create Commitment (1 credit)"}
        </Link>

        {/* COMMITMENTS LIST (unchanged logic below) */}
        {/* Keep your existing commitments rendering block here */}

      </div>
    </div>
  );
}
