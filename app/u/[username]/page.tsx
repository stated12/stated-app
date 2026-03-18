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

  /* =========================
     PROFILE
  ========================= */

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
     FOLLOW COUNTS
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

  const { data: commitments, error: commitmentsError } = await supabase
    .from("commitments")
    .select(
      "id, text, status, created_at, end_date, completed_at"
    )
    .eq("user_id", profile.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  if (commitmentsError) {
    console.log("Commitments error:", commitmentsError);
  }

  /* =========================
     ENRICH (VIEWS + LATEST UPDATE)
  ========================= */

  const enrichedCommitments =
    commitments && commitments.length > 0
      ? await Promise.all(
          commitments.map(async (c) => {

            /* VIEWS */
            const { count } = await supabase
              .from("commitment_views")
              .select("*", { count: "exact", head: true })
              .eq("commitment_id", c.id);

            /* 🔥 LATEST UPDATE */
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

  /* =========================
     HELPERS
  ========================= */

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
        <div className="text-center mb-12">
          <Image
            src="/logo.png"
            alt="Stated"
            width={110}
            height={110}
            className="mx-auto"
          />
          <div className="text-blue-600 font-bold text-3xl mt-3">
            Stated
          </div>
        </div>

        {/* PROFILE */}
        <div className="text-center">

          <div className="w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            {profile.display_name || profile.username}
            {profile.plan_key === "pro" && (
              <span className="ml-2 text-blue-600 text-sm font-semibold">
                PRO
              </span>
            )}
          </h1>

          <div className="text-gray-600 mt-1">
            @{profile.username}
          </div>

          {profile.bio && (
            <p className="mt-3 text-gray-800 max-w-md mx-auto">
              {profile.bio}
            </p>
          )}

          {/* FOLLOW */}
          <div className="mt-6 flex flex-col items-center gap-3">

            {currentUser?.id !== profile.id && (
              <FollowButton
                currentUserId={currentUser?.id}
                targetUserId={profile.id}
              />
            )}

            <div className="text-sm text-gray-700 flex gap-5">

              <Link href={`/u/${profile.username}/followers`}>
                <span className="cursor-pointer hover:underline">
                  <strong>{followersCount ?? 0}</strong> Followers
                </span>
              </Link>

              <Link href={`/u/${profile.username}/following`}>
                <span className="cursor-pointer hover:underline">
                  <strong>{followingCount ?? 0}</strong> Following
                </span>
              </Link>

            </div>

          </div>

          {/* SOCIAL */}
          <div className="mt-7 flex justify-center flex-wrap gap-3">
            {profile.website && (
              <SocialLink href={profile.website} label={cleanUrl(profile.website)} icon={<span>🌐</span>} />
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

          <div className="mt-7">
            <ShareProfileButton username={profile.username} />
          </div>

        </div>

        {/* REPUTATION */}
        <div className="mt-10">
          <ReputationCard userId={profile.id} />
        </div>

        {/* COMMITMENTS */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
            Public Commitments
          </h2>

          {enrichedCommitments.length > 0 ? (
            <CommitmentList commitments={enrichedCommitments} />
          ) : (
            <div className="border rounded-xl p-6 text-gray-600 text-center">
              No public commitments yet <br />
              <span className="text-sm text-gray-500">
                Follow to track future commitments
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
