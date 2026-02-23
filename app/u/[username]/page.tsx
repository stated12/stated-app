export const dynamic = "force-dynamic";

import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import ShareProfileButton from "@/components/ShareProfileButton";

export async function generateMetadata(
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  return {
    title: `${username} on Stated`,
    description: `View ${username}'s public commitments on Stated.`,
  };
}

export default async function UserPage(
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", username);

  if (!profiles || profiles.length === 0) {
    notFound();
  }

  const profile = profiles[0];

  await supabase.from("profile_views").insert({
    profile_id: profile.id,
  });

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at")
    .eq("user_id", profile.id)
    .eq("visibility", "public")
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
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* Branding */}
        <div className="text-center mb-10">
          <Image
            src="/logo.png"
            alt="Stated"
            width={60}
            height={60}
            className="mx-auto"
          />
          <div className="text-blue-600 font-bold text-xl mt-2">
            Stated
          </div>
        </div>

        {/* Profile Header */}
        <div className="text-center">

          {/* Perfect Circle Avatar */}
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border">
            <Image
              src={avatarUrl}
              alt="avatar"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            {profile.display_name || profile.username}
            {profile.plan_key && (
              <span className="ml-2 text-blue-600 text-sm font-semibold">
                PRO
              </span>
            )}
          </h1>

          <div className="text-gray-700 font-medium">
            @{profile.username}
          </div>

          {profile.bio && (
            <p className="mt-4 text-gray-800">
              {profile.bio}
            </p>
          )}

          <ShareProfileButton username={profile.username} />
        </div>

        {/* Commitments */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6 text-center text-gray-900">
            Public Commitments
          </h2>

          {commitments && commitments.length > 0 ? (
            <div className="space-y-8 relative">

              {/* Vertical Timeline Line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              {commitments.map((c) => {
                const commitmentUpdates =
                  updates?.filter(
                    (u) => u.commitment_id === c.id
                  ) || [];

                return (
                  <div key={c.id} className="relative pl-10">

                    <div className="bg-white border rounded-xl p-6 shadow-md">
                      <div className="font-semibold text-lg text-gray-900 mb-2">
                        {c.text}
                      </div>

                      <div className={`text-sm capitalize ${statusColor(c.status)}`}>
                        Status: {c.status}
                      </div>

                      <div className="text-xs text-gray-600 mt-2">
                        Created {new Date(c.created_at).toLocaleDateString()}
                      </div>

                      {commitmentUpdates.length > 0 && (
                        <div className="mt-6 space-y-4 border-t pt-6">
                          {commitmentUpdates.map((u) => (
                            <div key={u.id} className="relative pl-6">
                              <div className="absolute -left-6 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>

                              <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
                                <div className="text-sm text-gray-900">
                                  {u.content}
                                </div>

                                <div className="text-xs text-gray-600 mt-1">
                                  {new Date(
                                    u.created_at
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
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
