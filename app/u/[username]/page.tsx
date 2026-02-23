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

  // Track profile view (not shown publicly)
  await supabase.from("profile_views").insert({
    profile_id: profile.id,
  });

  // PUBLIC COMMITMENTS
  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at")
    .eq("user_id", profile.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  // Track commitment views
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

  const cleanUrl = (url: string) =>
    url.replace(/^https?:\/\//, "");

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
      className="
        flex items-center gap-2
        px-4 py-2
        text-sm font-medium
        rounded-full
        border border-gray-200
        bg-white
        text-gray-700
        hover:bg-gray-50
        hover:border-gray-300
        hover:shadow-sm
        hover:-translate-y-[1px]
        transition-all duration-200
      "
    >
      {icon}
      <span>{label}</span>
    </a>
  );

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

          <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
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

          {/* Social Links */}
          <div className="mt-8 flex justify-center flex-wrap gap-3">

            {profile.website && (
              <SocialLink
                href={profile.website}
                label={cleanUrl(profile.website)}
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15 15 0 010 20" />
                  </svg>
                }
              />
            )}

            {profile.linkedin && (
              <SocialLink
                href={profile.linkedin}
                label="LinkedIn"
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 3h4v18H4zM6 1a2 2 0 110 4 2 2 0 010-4zM10 8h4v2h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2 1.4-2 2.9V21h-4z"/>
                  </svg>
                }
              />
            )}

            {profile.github && (
              <SocialLink
                href={profile.github}
                label="GitHub"
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5A12 12 0 000 12.7a12.2 12.2 0 008.2 11.6c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 .1 2 .1 1.1 2 3 1.5 3.7 1.1.1-.9.4-1.5.7-1.8-2.7-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.6 1.3-3.6-.1-.3-.6-1.6.1-3.4 0 0 1.1-.3 3.6 1.4a12.3 12.3 0 016.6 0c2.5-1.7 3.6-1.4 3.6-1.4.7 1.8.2 3.1.1 3.4.8 1 1.3 2.2 1.3 3.6 0 4.8-2.9 5.9-5.6 6.2.5.4.8 1.2.8 2.5v3.7c0 .3.2.7.8.6A12.2 12.2 0 0024 12.7 12 12 0 0012 .5z"/>
                  </svg>
                }
              />
            )}

          </div>

          <div className="mt-8">
            <ShareProfileButton username={profile.username} />
          </div>
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
                  const { count: commitmentViews } = await supabase
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

                      <div className="text-xs text-gray-500 mt-4 flex items-center gap-1">
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
