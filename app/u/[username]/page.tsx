import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: PageProps) {
  const supabase = await createClient();

  const usernameParam = params?.username;

  if (!usernameParam) {
    notFound();
  }

  // Case-insensitive username lookup
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", usernameParam)
    .single();

  if (error || !profile) {
    notFound();
  }

  // Fetch only public commitments
  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at")
    .eq("user_id", profile.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

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

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-blue-600">
            Stated
          </div>
        </div>

        {/* Profile Section */}
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
              <span className="ml-2 text-blue-600 text-sm font-medium">
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

          {/* Share Button */}
          <div className="mt-6">
            <button
              onClick={() =>
                navigator.share
                  ? navigator.share({
                      title: profile.display_name || profile.username,
                      url: `https://app.stated.in/u/${profile.username}`,
                    })
                  : alert("Copy link from address bar")
              }
              className="text-sm border px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Share Profile
            </button>
          </div>

        </div>

        {/* Commitments */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6 text-center">
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

                  <div className="text-xs text-gray-400 mt-2">
                    Created {new Date(c.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-xl p-5 text-gray-500 text-center">
              No commitments yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
