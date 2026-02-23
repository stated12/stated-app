import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient();
  const usernameParam = params?.username;

  if (!usernameParam) notFound();

  // ✅ Safe username lookup (no .single())
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", usernameParam);

  if (!profiles || profiles.length === 0) notFound();

  const profile = profiles[0];

  // ✅ Safe profile view insert (never crash)
  try {
    await supabase.from("profile_views").insert({
      profile_id: profile.id,
    });
  } catch (e) {
    console.log("Profile view insert failed");
  }

  // ✅ Fetch public commitments
  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at")
    .eq("user_id", profile.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  const commitmentIds = commitments?.map((c) => c.id) || [];

  // ✅ Fetch updates
  const { data: updates } =
    commitmentIds.length > 0
      ? await supabase
          .from("commitment_updates")
          .select("*")
          .in("commitment_id", commitmentIds)
          .order("created_at", { ascending: false })
      : { data: [] };

  // ✅ Safe commitment view inserts
  if (commitmentIds.length > 0) {
    try {
      const viewRows = commitmentIds.map((id) => ({
        commitment_id: id,
        user_id: profile.id,
      }));
      await supabase.from("commitment_views").insert(viewRows);
    } catch (e) {
      console.log("Commitment view insert failed");
    }
  }

  const avatarUrl =
    profile.avatar_url?.startsWith("http")
      ? profile.avatar_url
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.display_name || profile.username || "User"
        )}&background=2563eb&color=fff`;

  const profileUrl = `https://app.stated.in/u/${profile.username}`;

  function normalizeUrl(url?: string | null) {
    if (!url) return null;
    return url.startsWith("http") ? url : `https://${url}`;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-2xl p-8">

        {/* 🔷 Branding */}
        <div className="text-center mb-10">
          <Image
            src="/logo.png"
            alt="Stated Logo"
            width={50}
            height={50}
            className="mx-auto mb-2"
          />
          <div className="text-3xl font-bold text-blue-600">
            Stated
          </div>
        </div>

        {/* 👤 Profile */}
        <div className="text-center">

          <Image
            src={avatarUrl}
            alt="avatar"
            width={120}
            height={120}
            className="rounded-full mx-auto mb-4 object-cover"
          />

          <h1 className="text-2xl font-semibold">
            {profile.display_name || profile.username}
            {profile.plan_key && (
              <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                PRO
              </span>
            )}
          </h1>

          <div className="text-gray-500">
            @{profile.username}
          </div>

          {profile.bio && (
            <p className="mt-4 text-gray-700">
              {profile.bio}
            </p>
          )}

          {profile.website && (
            <a
              href={normalizeUrl(profile.website)!}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-blue-600 hover:underline"
            >
              {profile.website}
            </a>
          )}

          {/* 🔗 Social Share */}
          <div className="mt-6 flex justify-center gap-3 flex-wrap text-sm">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(profileUrl)}`}
              target="_blank"
              className="border px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              WhatsApp
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`}
              target="_blank"
              className="border px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              LinkedIn
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}`}
              target="_blank"
              className="border px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              Twitter
            </a>
          </div>

        </div>

        {/* 📌 Commitments */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Public Commitments
          </h2>

          {commitments && commitments.length > 0 ? (
            <div className="space-y-8">
              {commitments.map((c) => {
                const commitmentUpdates =
                  updates?.filter(
                    (u) => u.commitment_id === c.id
                  ) || [];

                return (
                  <div
                    key={c.id}
                    className="border rounded-xl p-6"
                  >
                    <div className="font-medium text-lg mb-2">
                      {c.text}
                    </div>

                    <div className="text-sm text-gray-500 capitalize">
                      Status: {c.status}
                    </div>

                    <div className="text-xs text-gray-400 mt-2">
                      Created{" "}
                      {new Date(
                        c.created_at
                      ).toLocaleDateString()}
                    </div>

                    {/* Timeline */}
                    {commitmentUpdates.length > 0 && (
                      <div className="mt-6 space-y-4 border-t pt-6">
                        {commitmentUpdates.map((u) => (
                          <div
                            key={u.id}
                            className="relative pl-6"
                          >
                            <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>

                            <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                              <div className="text-sm">
                                {u.content}
                              </div>

                              <div className="text-xs text-gray-400 mt-1">
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
                );
              })}
            </div>
          ) : (
            <div className="border rounded-xl p-5 text-gray-500 text-center">
              No public commitments yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
