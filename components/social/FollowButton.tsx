"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
