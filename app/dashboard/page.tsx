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

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const isPro = !!profile?.plan_key;
  const credits = profile?.credits ?? 0;

  const { data: commitments } = await supabase
    .from("commitments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const commitmentIds = commitments?.map((c) => c.id) || [];

  const { data: updates } =
    commitmentIds.length > 0
      ? await supabase
          .from("commitment_updates")
          .select("*")
          .in("commitment_id", commitmentIds)
          .order("created_at", { ascending: false })
      : { data: [] };

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
            <Link
              href="/logout"
              className="text-sm text-gray-500 hover:underline"
            >
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

        {/* COMMITMENTS */}
        <div className="space-y-4">
          <div className="font-semibold">Your commitments</div>

          {commitments?.map((c) => {
            const commitmentUpdates =
              updates?.filter((u) => u.commitment_id === c.id) || [];

            return (
              <div key={c.id} className="bg-white rounded-xl shadow p-4">
                <div className="font-medium text-base">{c.text}</div>

                <div className="text-sm text-gray-500 mt-1 capitalize">
                  Status:
                  <span className="ml-1 font-medium">{c.status}</span>
                </div>

                {commitmentUpdates.length > 0 && (
                  <div className="mt-4 space-y-3 border-t pt-4">
                    {commitmentUpdates.map((u) => (
                      <div key={u.id} className="relative pl-6">
                        <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                          <div className="text-sm">{u.content}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(u.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ACTIVE */}
                {c.status === "active" && (
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <Link href={`/commitment/${c.id}/update`} className="text-sm border px-3 py-1 rounded hover:bg-gray-50">
                      Add update
                    </Link>
                    <Link href={`/commitment/${c.id}/complete`} className="text-sm border px-3 py-1 rounded hover:bg-gray-50">
                      Complete
                    </Link>
                    <Link href={`/commitment/${c.id}/pause`} className="text-sm border px-3 py-1 rounded hover:bg-gray-50">
                      Pause
                    </Link>
                    <Link href={`/commitment/${c.id}/withdraw`} className="text-sm border px-3 py-1 rounded hover:bg-gray-50">
                      Withdraw
                    </Link>
                  </div>
                )}

                {/* PAUSED */}
                {c.status === "paused" && (
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <Link href={`/commitment/${c.id}/resume`} className="text-sm border px-3 py-1 rounded hover:bg-gray-50">
                      Resume
                    </Link>
                    <Link href={`/commitment/${c.id}/withdraw`} className="text-sm border px-3 py-1 rounded hover:bg-gray-50">
                      Withdraw
                    </Link>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
