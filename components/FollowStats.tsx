"use client";

import { useEffect, useState } from "react";

type Props = {
  userId?: string;
  companyId?: string;
};

export default function FollowStats({ userId, companyId }: Props) {
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const res = await fetch("/api/follow/stats", {
      method: "POST",
      body: JSON.stringify({
        userId,
        companyId,
      }),
    });

    const data = await res.json();

    setFollowers(data.followers);
    setFollowing(data.following);
  }

  return (
    <div className="flex gap-6 text-sm text-gray-600 mt-2">

      <div>
        <span className="font-semibold text-gray-900">
          {followers}
        </span>{" "}
        Followers
      </div>

      <div>
        <span className="font-semibold text-gray-900">
          {following}
        </span>{" "}
        Following
      </div>

    </div>
  );
}
