import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: PageProps) {
  const supabase = await createClient();

  const username = params?.username?.toLowerCase();

  if (!username) {
    return <div className="p-10">Profile not found</div>;
  }

  // Fetch profile safely
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .limit(1);

  if (!profiles || profiles.length === 0) {
    return <div className="p-10">Profile not found</div>;
  }

  const profile = profiles[0];

  // ✅ FIXED: Use visibility column
  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at")
    .eq("user_id", profile.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  // Insert profile view (ignore failure silently)
  await supabase
    .from("profile_views")
    .insert({
      profile_id: profile.id,
    })
    .catch(() => {});

  // Insert commitment views
  if (commitments) {
    for (const c of commitments) {
      await supabase
        .from("commitment_views")
        .insert({
          commitment_id: c.id,
          user_id: profile.id,
        })
        .catch(() => {});
    }
  }

  const avatarUrl =
    profile.avatar_url && profile.avatar_url.startsWith("http")
      ? profile.avatar_url
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.display_name || profile.username || "User"
        )}&background=2563eb&color=fff`;

  function normalizeUrl(url?: string | null) {
    if (!url) return null;
    return url.startsWith("http") ? url : `https://${url}`;
  }

  function SocialLink({
    label,
    value,
  }: {
    label: string;
    value?: string | null;
  }) {
    const url = normalizeUrl(value);
    if (!url) return null;

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm"
      >
        {label}
      </a>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-2xl mx-auto">

        <div className="text-xl font-semibold mb-8 text-blue-600">
          Stated
        </div>

        {/* Profile Header */}
        <div className="text-center mb-10">

          <Image
            src={avatarUrl}
            alt="avatar"
            width={110}
            height={110}
            className="rounded-full mx-auto mb-4 object-cover"
          />

          <h1 className="text-2xl font-semibold">
            {profile.display_name || profile.username}
            {profile.plan_key && (
              <span className="ml-2 text-blue-600 text-sm">PRO</span>
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

          {/* Social links */}
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <SocialLink label="LinkedIn" value={profile.linkedin} />
            <SocialLink label="Twitter" value={profile.twitter} />
            <SocialLink label="GitHub" value={profile.github} />
            <SocialLink label="YouTube" value={profile.youtube} />
            <SocialLink label="Instagram" value={profile.instagram} />
          </div>

        </div>

        {/* Commitments */}
        <div>
          <h2 className="text-xl font-semibold mb-6">
            Commitments
          </h2>

          {commitments && commitments.length > 0 ? (
            <div className="space-y-4">
              {commitments.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-xl p-5"
                >
                  <div className="font-medium mb-2">
                    {c.text}
                  </div>

                  <div className="text-sm text-gray-500 capitalize">
                    Status: {c.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-xl p-5 text-gray-500">
              No commitments yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
