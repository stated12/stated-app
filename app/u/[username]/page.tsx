export const dynamic = "force-dynamic";

import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import ShareProfileButton from "@/components/ShareProfileButton";
import { Globe, Linkedin, Twitter, Github, Youtube } from "lucide-react";

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
    children,
  }: {
    href: string;
    label: string;
    children: React.ReactNode;
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
      {children}
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
              >
                <Globe size={16} />
              </SocialLink>
            )}

            {profile.linkedin && (
              <SocialLink
                href={profile.linkedin}
                label="LinkedIn"
              >
                <Linkedin size={16} />
              </SocialLink>
            )}

            {profile.twitter && (
              <SocialLink
                href={profile.twitter}
                label="Twitter"
              >
                <Twitter size={16} />
              </SocialLink>
            )}

            {profile.github && (
              <SocialLink
                href={profile.github}
                label="GitHub"
              >
                <Github size={16} />
              </SocialLink>
            )}

            {profile.youtube && (
              <SocialLink
                href={profile.youtube}
                label="YouTube"
              >
                <Youtube size={16} />
              </SocialLink>
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
