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
  const [initialLoading, setInitialLoading] = useState(true);
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
    setInitialLoading(true);

    const query = new URLSearchParams();
    query.append("type", activeTab);
    if (category) query.append("category", category);

    const res = await fetch(`/api/feed?${query.toString()}`);
    const data = await res.json();

    setCommitments(data);
    setCursor(data.length ? data[data.length - 1].created_at : null);
    setHasMore(data.length === 25);
    triggerImpressions(data);
    setInitialLoading(false);
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
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Link
            href="/"
            className="group w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 shadow-inner flex items-center justify-center hover:scale-105 transition"
          >
            <Image
              src="/logo.png"
              alt="Stated"
              width={120}
              height={120}
            />
          </Link>
        </div>

        <h1 className="text-3xl font-bold">Community Feed</h1>
        <p className="text-gray-500 text-sm">
          Discover public commitments from builders & companies
        </p>
      </div>

      {/* Sticky Filters */}
      <div className="sticky top-4 z-10 bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("latest")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "latest"
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Latest
          </button>

          <button
            onClick={() => setActiveTab("trending")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "trending"
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            🔥 Trending
          </button>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat || "All Categories"}
            </option>
          ))}
        </select>
      </div>

      {/* Feed */}
      <div className="space-y-6">

        {/* Skeleton */}
        {initialLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-5 animate-pulse space-y-3"
            >
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-2 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          ))}

        {!initialLoading && commitments.length === 0 && (
          <div className="bg-white rounded-xl shadow p-8 text-center space-y-3">
            <h3 className="text-lg font-semibold">No commitments yet</h3>
            <p className="text-gray-500 text-sm">
              Be the first to make a public commitment.
            </p>
            <Link
              href="/dashboard/commitments/new"
              className="inline-block mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Create Commitment
            </Link>
          </div>
        )}

        {!initialLoading &&
          commitments.map((c) => {
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
                className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Link href={profileLink}>
                    <Image
                      src={avatar}
                      alt="avatar"
                      width={44}
                      height={44}
                      className="rounded-full"
                    />
                  </Link>

                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={profileLink}
                        className="font-medium hover:underline"
                      >
                        {c.identity.display_name ||
                          c.identity.username}
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
                  <div className="mb-2 text-xs text-blue-600 font-medium">
                    {c.category}
                  </div>
                )}

                <div className="mb-3 whitespace-pre-wrap text-gray-800">
                  {c.text}
                </div>

                <div className="text-sm text-gray-500 flex items-center gap-2">
                  👁 {c.views}
                  {activeTab === "trending" && (
                    <span className="text-orange-500 text-xs">
                      • Trending
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {hasMore && commitments.length > 0 && (
        <div className="text-center pt-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
