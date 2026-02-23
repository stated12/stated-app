export const dynamic = "force-dynamic";

import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import ShareProfileButton from "@/components/ShareProfileButton";

export default async function UserPage(
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // PROFILE
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", username);

  if (!profiles || profiles.length === 0) {
    notFound();
  }

  const profile = profiles[0];

  // PROFILE VIEW INSERT
  await supabase.from("profile_views").insert({
    profile_id: profile.id,
  });

  const { count: profileViews } = await supabase
    .from("profile_views")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", profile.id);

  // PUBLIC COMMITMENTS
  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at")
    .eq("user_id", profile.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  // INSERT COMMITMENT VIEWS
  if (commitments) {
    for (const c of commitments) {
      await supabase.from("commitment_views").insert({
        commitment_id: c.id,
      });
    }
  }

  const avatarUrl =
    profile.avatar_url && profile.avatar_url.startsWith("http")
      ? profile.avatar_url
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.display_name || profile.username || "User"
        )}&background=2563eb&color=fff`;

  function statusColor(status: string) {
    switch (status) {
      case "active":
        return "text-green-600";
      case "completed":
        return "text-blue-600";
      case "paused":
        return "text-yellow-600";
      case "withdrawn":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-10">

        {/* Branding */}
        <div className="text-center mb-14">
          <Image
            src="/logo.png"
            alt="Stated"
            width={120}
            height={120}
            className="mx-auto"
          />
          <div className="text-blue-600 font-bold text-3xl mt-4">
            Stated
          </div>
        </div>

        {/* Profile */}
        <div className="text-center">

          <div className="w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image
              src={avatarUrl}
              alt="avatar"
              width={144}
              height={144}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            {profile.display_name || profile.username}
            {profile.plan_key && (
              <span className="ml-3 text-blue-600 text-sm font-semibold">
                PRO
              </span>
            )}
          </h1>

          <div className="text-gray-600 font-medium mt-1">
            @{profile.username}
          </div>

          {profile.bio && (
            <p className="mt-4 text-gray-800 max-w-md mx-auto">
              {profile.bio}
            </p>
          )}

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-6 text-sm text-gray-600">
            <div>
              <div className="font-semibold text-gray-900">
                {commitments?.length || 0}
              </div>
              Commitments
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {profileViews || 0}
              </div>
              Profile Views
            </div>
          </div>

          <ShareProfileButton username={profile.username} />
        </div>

        {/* Commitments */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
            Public Commitments
          </h2>

          {commitments && commitments.length > 0 ? (
            <div className="space-y-10">
              {await Promise.all(
                commitments.map(async (c) => {

                  const { count: commitmentViews } = await supabase
                    .from("commitment_views")
                    .select("*", { count: "exact", head: true })
                    .eq("commitment_id", c.id);

                  return (
                    <div
                      key={c.id}
                      className="bg-white border rounded-xl p-6 shadow-md"
                    >
                      <div className="font-semibold text-lg text-gray-900 mb-2">
                        {c.text}
                      </div>

                      <div className={`text-sm capitalize ${statusColor(c.status)}`}>
                        Status: {c.status}
                      </div>

                      <div className="text-xs text-gray-600 mt-2">
                        Created {new Date(c.created_at).toLocaleDateString()}
                      </div>

                      <div className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                        👁 {commitmentViews || 0} views
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="border rounded-xl p-6 text-gray-700 text-center">
              No public commitments yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
