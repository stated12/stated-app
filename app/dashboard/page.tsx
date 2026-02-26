"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Commitment = {
  id: string;
  text: string;
  category: string;
  created_at: string;
  views: number;
  identity: {
    username: string;
    display_name: string;
    avatar_url: string | null;
    plan_key: string | null;
    type: "user" | "company";
  };
};

function timeAgo(date: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  const intervals: any = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval > 1) return `${interval} ${key}s ago`;
    if (interval === 1) return `1 ${key} ago`;
  }

  return "Just now";
}

export default function Dashboard() {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadInitial();
  }, []);

  async function loadInitial() {
    const res = await fetch("/api/feed");
    const data = await res.json();

    setCommitments(data);

    if (data.length > 0) {
      setCursor(data[data.length - 1].created_at);
    }

    setHasMore(data.length === 25);
    triggerImpressions(data);
  }

  async function loadMore() {
    if (!cursor || !hasMore) return;

    setLoading(true);

    const res = await fetch(`/api/feed?cursor=${cursor}`);
    const data = await res.json();

    setCommitments((prev) => [...prev, ...data]);

    if (data.length > 0) {
      setCursor(data[data.length - 1].created_at);
    }

    if (data.length < 25) {
      setHasMore(false);
    }

    triggerImpressions(data);
    setLoading(false);
  }

  function triggerImpressions(data: Commitment[]) {
    if (!data || data.length === 0) return;

    const ids = data.map((c) => c.id);
    const sessionKey = "viewed_" + ids.join("_");

    if (sessionStorage.getItem(sessionKey)) return;

    fetch("/api/impression", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commitmentIds: ids }),
    });

    sessionStorage.setItem(sessionKey, "true");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className="space-y-4">
        {commitments.map((c) => {
          const avatar =
            c.identity.avatar_url?.trim()
              ? c.identity.avatar_url.trim()
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  c.identity.display_name || c.identity.username
                )}&background=2563eb&color=fff`;

          const profileLink =
            c.identity.type === "company"
              ? `/c/${c.identity.username}`
              : `/u/${c.identity.username}`;

          return (
            <div
              key={c.id}
              className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <Link href={profileLink}>
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </Link>

                <div>
                  <div className="flex items-center gap-2">
                    <Link href={profileLink} className="font-medium">
                      {c.identity.display_name || c.identity.username}
                    </Link>

                    {c.identity.type === "company" && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                        COMPANY
                      </span>
                    )}

                    {c.identity.type === "user" && c.identity.plan_key && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                        PRO
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    @{c.identity.username} · {timeAgo(c.created_at)}
                  </div>
                </div>
              </div>

              {c.category && (
                <div className="mb-2">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                    {c.category}
                  </span>
                </div>
              )}

              <div className="text-base mb-3 whitespace-pre-wrap">
                {c.text}
              </div>

              <div className="text-sm text-gray-500">
                {c.views} views
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

    </div>
  );
}
