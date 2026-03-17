export const dynamic = "force-dynamic";

import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";

import ShareProfileButton from "@/components/ShareProfileButton";
import ReputationCard from "@/components/ReputationCard";
import ViewTracker from "@/components/ViewTracker";
import CommitmentList from "@/components/CommitmentList";
import FollowButton from "@/components/social/FollowButton";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const supabase = createPublicClient();
  const supabaseAuth = await createClient();

  const {
    data: { user: currentUser },
  } = await supabaseAuth.auth.getUser();

  const cleanUsername = decodeURIComponent(username)
    .trim()
    .toLowerCase();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "id, username, display_name, avatar_url, bio, plan_key, website, linkedin, github, twitter, youtube"
    )
    .ilike("username", cleanUsername)
    .single();

  if (!profile || error) {
    return notFound();
  }

  /* =========================
     FOLLOW COUNTS (NEW)
  ========================= */

  const { count: followersCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_user_id", profile.id);

  const { count: followingCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_user_id", profile.id);

  /* =========================
     COMMITMENTS
  ========================= */

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at, end_date, completed_at, latest_update")
    .eq("user_id", profile.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  const enrichedCommitments =
    commitments && commitments.length > 0
      ? await Promise.all(
          commitments.map(async (c) => {
            const { count } = await supabase
              .from("commitment_views")
              .select("*", { count: "exact", head: true })
              .eq("commitment_id", c.id);

            return {
              ...c,
              views: count || 0,
            };
          })
        )
      : [];

  const avatarUrl =
    profile.avatar_url && profile.avatar_url.startsWith("http")
      ? profile.avatar_url
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.display_name || profile.username || "User"
        )}&background=2563eb&color=fff`;

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

        <ViewTracker type="profile" entityId={profile.id} />

        {/* HEADER */}
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

        {/* PROFILE */}
        <div className="text-center">
          <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
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

          {/* 🔥 FOLLOW BUTTON + COUNTS */}
          <div className="mt-6 flex flex-col items-center gap-3">

            {currentUser?.id !== profile.id && (
              <FollowButton
                currentUserId={currentUser?.id}
                targetUserId={profile.id}
              />
            )}

            <div className="text-sm text-gray-600 flex gap-4">

              <Link href={`/u/${profile.username}/followers`}>
                <span className="hover:underline cursor-pointer">
                  <strong>{followersCount ?? 0}</strong> Followers
                </span>
              </Link>

              <Link href={`/u/${profile.username}/following`}>
                <span className="hover:underline cursor-pointer">
                  <strong>{followingCount ?? 0}</strong> Following
                </span>
              </Link>

            </div>

          </div>

          {/* SOCIAL LINKS */}
          <div className="mt-8 flex justify-center flex-wrap gap-3">
            {profile.website && (
              <SocialLink
                href={profile.website}
                label={cleanUrl(profile.website)}
                icon={<span>🌐</span>}
              />
            )}
            {profile.linkedin && (
              <SocialLink href={profile.linkedin} label="LinkedIn" icon={<span>🔗</span>} />
            )}
            {profile.github && (
              <SocialLink href={profile.github} label="GitHub" icon={<span>💻</span>} />
            )}
            {profile.twitter && (
              <SocialLink href={profile.twitter} label="X" icon={<span>✖</span>} />
            )}
            {profile.youtube && (
              <SocialLink href={profile.youtube} label="YouTube" icon={<span>▶</span>} />
            )}
          </div>

          <div className="mt-8">
            <ShareProfileButton username={profile.username} />
          </div>
        </div>

        {/* REPUTATION */}
        <div className="mt-10">
          <ReputationCard userId={profile.id} />
        </div>

        {/* COMMITMENTS */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-10 text-center text-gray-900">
            Public Commitments
          </h2>

          {enrichedCommitments.length > 0 ? (
            <CommitmentList commitments={enrichedCommitments} />
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
