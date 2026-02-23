export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

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

  const { data: commitments } = await supabase
    .from("commitments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // ✅ Fetch all updates for user's commitments
  const commitmentIds = commitments?.map((c) => c.id) || [];

  const { data: updates } =
    commitmentIds.length > 0
      ? await supabase
          .from("commitment_updates")
          .select("*")
          .in("commitment_id", commitmentIds)
          .order("created_at", { ascending: false })
      : { data: [] };

  const credits = profile?.credits ?? 0;
  const isPro = !!profile?.plan_key;

  const avatar =
    profile?.avatar_url?.trim()
      ? profile.avatar_url.trim()
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile?.display_name || profile?.username || "User"
        )}&background=2563eb&color=fff`;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">

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
              <div className="text-lg font-semibold">
                {profile?.display_name || "No name set"}
              </div>
              <div className="text-gray-600 text-sm">
                {profile?.bio || "No bio added"}
              </div>
            </div>
          </div>
        </div>

        {/* CREATE BUTTON */}
        <Link
          href="/commitment/new"
          className="block text-center py-3 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700"
        >
          Create Commitment
        </Link>

        {/* COMMITMENTS */}
        <div className="space-y-4">
          <div className="font-semibold">Your commitments</div>

          {commitments?.map((c) => {
            const commitmentUpdates =
              updates?.filter(
                (u) => u.commitment_id === c.id
              ) || [];

            return (
              <div
                key={c.id}
                className="bg-white rounded-xl shadow p-4"
              >
                <div className="font-medium text-base">
                  {c.text}
                </div>

                <div className="text-sm text-gray-500 mt-1 capitalize">
                  Status:
                  <span className="ml-1 font-medium">
                    {c.status}
                  </span>
                </div>

                {/* STATUS COMMENT (pause/withdraw) */}
                {c.comment && (
                  <div className="mt-2 text-sm bg-gray-100 p-2 rounded">
                    {c.comment}
                  </div>
                )}

                {/* UPDATES SECTION */}
                {commitmentUpdates.length > 0 && (
                  <div className="mt-4 space-y-2 border-t pt-3">
                    <div className="text-sm font-medium text-gray-700">
                      Updates
                    </div>

                    {commitmentUpdates.map((u) => (
                      <div
                        key={u.id}
                        className="text-sm bg-gray-50 p-2 rounded"
                      >
                        <div>{u.text}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(
                            u.created_at
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ACTIONS */}
                {c.status === "active" && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <Link
                      href={`/commitment/${c.id}/update`}
                      className="text-sm border px-3 py-1 rounded hover:bg-gray-50"
                    >
                      Add update
                    </Link>
                    <Link
                      href={`/commitment/${c.id}/complete`}
                      className="text-sm border px-3 py-1 rounded hover:bg-gray-50"
                    >
                      Complete
                    </Link>
                    <Link
                      href={`/commitment/${c.id}/pause`}
                      className="text-sm border px-3 py-1 rounded hover:bg-gray-50"
                    >
                      Pause
                    </Link>
                    <Link
                      href={`/commitment/${c.id}/withdraw`}
                      className="text-sm border px-3 py-1 rounded hover:bg-gray-50"
                    >
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
