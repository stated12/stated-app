export const dynamic = "force-dynamic";

import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ShareProfileButton from "@/components/ShareProfileButton";
import ReputationCard from "@/components/ReputationCard";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  if (!username) {
    return notFound();
  }

  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username.toLowerCase())
    .single();

  if (error || !profile) {
    return notFound();
  }

  supabase.from("profile_views").insert({
    profile_id: profile.id,
  });

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

  function statusColor(status: string) {
    switch (status) {
      case "active":
        return "text-green-600";
      case "completed":
        return "text-blue-600";
      case "paused":
        return "text-yellow-600";
      case "withdrawn":
        return "text-gray-600";
      case "expired":
        return "text-red-700 font-semibold";
      default:
        return "text-gray-500";
    }
  }

  const cleanUrl = (url: string) =>
    url.replace(/^https?:\/\//, "");

  const SocialLink = ({
    href,
    label,
    icon,
  }: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
    >
      {icon}
      <span>{label}</span>
    </a>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-10">

        {/* Header */}
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

        {/* Profile Section */}
        <div className="text-center">
          <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
            {/* ✅ FIXED AVATAR */}
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            {profile.display_name || profile.username}
            {profile.plan_key === "pro" && (
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

          {/* ✅ UPDATED SOCIAL LINKS */}
          <div className="mt-8 flex justify-center flex-wrap gap-3">
            {profile.website && (
              <SocialLink
                href={profile.website}
                label={cleanUrl(profile.website)}
                icon={<span>🌐</span>}
              />
            )}

            {profile.linkedin && (
              <SocialLink
                href={profile.linkedin}
                label="LinkedIn"
                icon={<span>🔗</span>}
              />
            )}

            {profile.github && (
              <SocialLink
                href={profile.github}
                label="GitHub"
                icon={<span>💻</span>}
              />
            )}

            {profile.twitter && (
              <SocialLink
                href={profile.twitter}
                label="X"
                icon={<span>✖</span>}
              />
            )}

            {profile.youtube && (
              <SocialLink
                href={profile.youtube}
                label="YouTube"
                icon={<span>▶</span>}
              />
            )}
          </div>

          <div className="mt-8">
            <ShareProfileButton username={profile.username} />
          </div>
        </div>

        {/* Reputation */}
        <div className="mt-10">
          <ReputationCard userId={profile.id} />
        </div>

        {/* Commitments */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-10 text-center text-gray-900">
            Public Commitments
          </h2>

          {commitments && commitments.length > 0 ? (
            <div className="space-y-8">
              {await Promise.all(
                commitments.map(async (c) => {
                  const { count } = await supabase
                    .from("commitment_views")
                    .select("*", { count: "exact", head: true })
                    .eq("commitment_id", c.id);

                  return (
                    <div
                      key={c.id}
                      className="bg-white border rounded-xl p-6 shadow-md hover:shadow-lg transition"
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

                      <div className="text-xs text-gray-500 mt-4">
                        👁 {count || 0} views
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
