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
    type: "user" | "company";
    badge?: string;
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
  const [activeTab, setActiveTab] = useState<"latest" | "trending">("latest");
  const [category, setCategory] = useState("");

  const categories = [
    "",
    "Fitness",
    "Learning",
    "Writing",
    "Health",
    "Finance",
    "Business",
    "Product",
    "Growth",
    "Hiring",
    "Marketing",
    "Operations",
    "Revenue",
  ];

  useEffect(() => {
    loadInitial();
  }, [activeTab, category]);

  async function loadInitial() {
    const query = new URLSearchParams();
    query.append("type", activeTab);
    if (category) query.append("category", category);

    const res = await fetch(`/api/feed?${query.toString()}`);
    const data = await res.json();

    setCommitments(data);
    setCursor(data.length ? data[data.length - 1].created_at : null);
    setHasMore(data.length === 25);
    triggerImpressions(data);
  }

  async function loadMore() {
    if (!cursor || !hasMore) return;

    setLoading(true);

    const query = new URLSearchParams();
    query.append("type", activeTab);
    query.append("cursor", cursor);
    if (category) query.append("category", category);

    const res = await fetch(`/api/feed?${query.toString()}`);
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

  function badgeColor(badge?: string) {
    switch (badge) {
      case "Trusted":
        return "bg-purple-100 text-purple-600";
      case "Leader":
        return "bg-indigo-100 text-indigo-600";
      case "Operator":
        return "bg-blue-100 text-blue-600";
      case "Builder":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Tabs + Category */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("latest")}
            className={`px-4 py-2 rounded ${
              activeTab === "latest"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Latest
          </button>

          <button
            onClick={() => setActiveTab("trending")}
            className={`px-4 py-2 rounded ${
              activeTab === "trending"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Trending
          </button>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat || "All Categories"}
            </option>
          ))}
        </select>
      </div>

      {/* Feed */}
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
            <div key={c.id} className="bg-white rounded-xl shadow p-5">
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

                    {c.identity.badge && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${badgeColor(
                          c.identity.badge
                        )}`}
                      >
                        {c.identity.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    @{c.identity.username} · {timeAgo(c.created_at)}
                  </div>
                </div>
              </div>

              {c.category && (
                <div className="mb-2 text-xs text-blue-600">
                  {c.category}
                </div>
              )}

              <div className="mb-2 whitespace-pre-wrap">
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
