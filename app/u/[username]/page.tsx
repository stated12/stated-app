import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: PageProps) {
  const supabase = await createClient();
  const username = params.username;

  if (!username) return notFound();

  // PROFILE
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username.toLowerCase())
    .single();

  if (!profile) return notFound();

  // COMMITMENTS
  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at, view_count")
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  // URL normalizer
  function normalizeUrl(value?: string | null) {
    if (!value) return null;
    return value.startsWith("http") ? value : `https://${value}`;
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

  const avatarUrl =
    profile.avatar_url && profile.avatar_url.startsWith("http")
      ? profile.avatar_url
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.display_name || profile.username
        )}&background=0D8ABC&color=fff`;

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-2xl mx-auto">

        {/* BRAND */}
        <div className="text-xl font-semibold mb-8 text-blue-600">
          Stated
        </div>

        {/* PROFILE HEADER */}
        <div className="text-center mb-10">

          <Image
            src={avatarUrl}
            alt="avatar"
            width={110}
            height={110}
            className="rounded-full mx-auto mb-4"
          />

          <h1 className="text-2xl font-semibold">
            {profile.display_name || profile.username}
            <span className="text-blue-600 ml-2">★</span>
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

          {/* SOCIAL LINKS */}
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <SocialLink label="LinkedIn" value={profile.linkedin} />
            <SocialLink label="Twitter" value={profile.twitter} />
            <SocialLink label="GitHub" value={profile.github} />
            <SocialLink label="YouTube" value={profile.youtube} />
            <SocialLink label="Instagram" value={profile.instagram} />
          </div>
        </div>

        {/* COMMITMENTS */}
        <div>
          <h2 className="text-xl font-semibold mb-6">
            Commitments
          </h2>

          {commitments && commitments.length > 0 ? (
            <div className="space-y-4">
              {commitments.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-xl p-5 hover:shadow-sm transition"
                >
                  <div className="font-medium mb-2">
                    {c.text}
                  </div>

                  <div className="text-sm text-gray-500">
                    Status: {c.status}
                    {" • "}
                    👁 {c.view_count ?? 0} views
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
