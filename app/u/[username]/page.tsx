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

  if (!profile || error) return notFound();

  const { count: followersCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_user_id", profile.id);

  const { count: followingCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_user_id", profile.id);

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at, end_date, completed_at")
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

            const { data: update } = await supabase
              .from("commitment_updates")
              .select("content, created_at")
              .eq("commitment_id", c.id)
              .order("created_at", { ascending: false })
              .limit(1)
              .maybeSingle();

            return {
              ...c,
              views: count || 0,
              latest_update: update?.content || null,
              latest_update_created_at: update?.created_at || null,
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
      className="px-4 py-2 text-sm rounded-full border bg-gray-50 hover:bg-gray-100"
    >
      {icon} {label}
    </a>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16">

      <ViewTracker type="profile" entityId={profile.id} />

      {/* 🔥 TOP GRADIENT */}
      <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* 🔥 PROFILE CARD */}
      <div className="max-w-2xl mx-auto -mt-20 px-4">

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">

          {/* AVATAR */}
          <div className="w-24 h-24 mx-auto -mt-16 rounded-full overflow-hidden border-4 border-white shadow">
            <img src={avatarUrl} className="w-full h-full object-cover" />
          </div>

          {/* NAME */}
          <h1 className="text-2xl font-bold mt-4">
            {profile.display_name || profile.username}
          </h1>

          <div className="text-gray-500">@{profile.username}</div>

          {/* SOCIAL LINKS */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {profile.website && (
              <SocialLink href={profile.website} label={cleanUrl(profile.website)} icon="🌐" />
            )}
            {profile.twitter && (
              <SocialLink href={profile.twitter} label="Twitter" icon="✖" />
            )}
            {profile.linkedin && (
              <SocialLink href={profile.linkedin} label="LinkedIn" icon="🔗" />
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 justify-center mt-5">

            {currentUser?.id !== profile.id && (
              <FollowButton
                currentUserId={currentUser?.id}
                targetUserId={profile.id}
              />
            )}

            <ShareProfileButton username={profile.username} />

          </div>

          {/* STATS */}
          <div className="flex justify-center gap-8 mt-5 text-sm">
            <div>
              <strong>{followersCount ?? 0}</strong>
              <div className="text-gray-500">Followers</div>
            </div>
            <div>
              <strong>{followingCount ?? 0}</strong>
              <div className="text-gray-500">Following</div>
            </div>
            <div>
              <strong>{enrichedCommitments.length}</strong>
              <div className="text-gray-500">Commitments</div>
            </div>
          </div>

        </div>

      </div>

      {/* REPUTATION */}
      <div className="max-w-2xl mx-auto px-4 mt-6">
        <ReputationCard userId={profile.id} />
      </div>

      {/* COMMITMENTS */}
      <div className="max-w-2xl mx-auto px-4 mt-10">

        <h2 className="text-xl font-bold mb-6">
          Public Commitments
        </h2>

        {enrichedCommitments.length > 0 ? (
          <CommitmentList commitments={enrichedCommitments} />
        ) : (
          <div className="border rounded-xl p-6 text-center text-gray-500">
            No public commitments yet
          </div>
        )}

      </div>

    </div>
  );
}
