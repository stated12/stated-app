"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Props = {
  currentUserId?: string;
  targetUserId?: string;
  targetCompanyId?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function FollowButton({
  currentUserId,
  targetUserId,
  targetCompanyId,
  className,
  style,
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

    try {
      const res = await fetch("/api/follow/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId,
          targetCompanyId,
        }),
      });

      const data = await res.json();
      setFollowing(data.following);

    } catch (e) {
      console.log("check follow error", e);
    }

  }

  async function follow() {

    if (!currentUserId) {
      router.push("/signup?next=" + window.location.pathname);
      return;
    }

    setLoading(true);

    try {

      await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          followingUserId: targetUserId,
          followingCompanyId: targetCompanyId,
        }),
      });

      setFollowing(true);

    } catch (e) {
      console.log("follow error", e);
    }

    setLoading(false);

  }

  async function unfollow() {

    setLoading(true);

    try {

      await fetch("/api/follow", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          followingUserId: targetUserId,
          followingCompanyId: targetCompanyId,
        }),
      });

      setFollowing(false);

    } catch (e) {
      console.log("unfollow error", e);
    }

    setLoading(false);

  }

  return (
    <button
      onClick={following ? unfollow : follow}
      disabled={loading}
      style={style}
      className={
        className ||
        `px-3 py-1 rounded-lg text-sm transition ${
          following
            ? "bg-gray-200 text-gray-800"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`
      }
    >
      {loading ? "..." : following ? "Following" : "Follow"}
    </button>
  );

}
