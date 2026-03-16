"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Props = {
  currentUserId?: string;
  targetUserId?: string;
  targetCompanyId?: string;
};

export default function FollowButton({
  currentUserId,
  targetUserId,
  targetCompanyId,
}: Props) {

  const router = useRouter();
  const supabase = createClient();

  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkFollowing();
  }, []);

  async function checkFollowing() {

    if (!currentUserId) return;

    const res = await fetch("/api/follow/check", {
      method: "POST",
      body: JSON.stringify({
        targetUserId,
        targetCompanyId,
      }),
    });

    const data = await res.json();

    setFollowing(data.following);

  }

  async function follow() {

    if (!currentUserId) {
      router.push("/signup?next=" + window.location.pathname);
      return;
    }

    setLoading(true);

    await fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify({
        followingUserId: targetUserId,
        followingCompanyId: targetCompanyId,
      }),
    });

    setFollowing(true);

    /* =============================== */
    /* CREATE FOLLOW NOTIFICATION      */
    /* =============================== */

    try {

      let ownerUserId = targetUserId;

      /* company owner */

      if (targetCompanyId) {

        const { data: company } =
        await supabase
        .from("companies")
        .select("owner_user_id")
        .eq("id", targetCompanyId)
        .maybeSingle();

        ownerUserId = company?.owner_user_id;

      }

      if (!ownerUserId) {
        setLoading(false);
        return;
      }

      /* get follower name */

      const { data: followerProfile } =
      await supabase
      .from("profiles")
      .select("display_name,username")
      .eq("id", currentUserId)
      .maybeSingle();

      const followerName =
      followerProfile?.display_name ||
      followerProfile?.username ||
      "Someone";

      /* check owner plan */

      const { data: ownerProfile } =
      await supabase
      .from("profiles")
      .select("plan_key")
      .eq("id", ownerUserId)
      .maybeSingle();

      const planKey = ownerProfile?.plan_key ?? "free";

      let message = "You have a new follower";

      if (planKey !== "free") {
        message = `${followerName} started following you`;
      }

      await supabase
      .from("notifications")
      .insert({
        user_id: ownerUserId,
        title: "👥 New follower",
        message,
        link: targetUserId
          ? `/u/${followerProfile?.username}`
          : `/c/${targetCompanyId}`,
        is_read: false,
        notification_type: "new_follower",
      });

    } catch (e) {

      console.log("follow notification error", e);

    }

    setLoading(false);

  }

  async function unfollow() {

    setLoading(true);

    await fetch("/api/follow", {
      method: "DELETE",
      body: JSON.stringify({
        followingUserId: targetUserId,
        followingCompanyId: targetCompanyId,
      }),
    });

    setFollowing(false);
    setLoading(false);

  }

  return (
    <button
      onClick={following ? unfollow : follow}
      disabled={loading}
      className={`px-3 py-1 rounded-lg text-sm ${
        following
          ? "bg-gray-200 text-gray-800"
          : "bg-blue-600 text-white"
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );

}
