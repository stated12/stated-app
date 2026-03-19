"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Identity = {
  username?: string;
  display_name?: string | null;
  avatar_url?: string | null;
  type?: "user" | "company";
};

type FeedItem = {
  id: string;
  type: "commitment" | "update";
  text?: string;
  category?: string;
  created_at: string;
  views?: number;
  shares?: number;
  parent_commitment_id?: string;
  identity?: Identity | null;
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

export default function CommitmentFeed({
  endpoint,
  showFilters = false,
}: {
  endpoint: string;
  showFilters?: boolean;
}) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [activeTab, setActiveTab] =
    useState<"latest" | "trending" | "following">("latest");

  const [category, setCategory] = useState("");

  const categories = [
    "",
    "Fitness",
    "Learning",
    "Writing",
    "Health",
    "Finance",
    "Business",
    "Marketing",
    "Sales",
    "Operations",
    "Product",
    "Strategic",
    "Announcement",
    "Other",
  ];

  useEffect(() => {
    resetFeed();
  }, [activeTab, category]);

  function resetFeed() {
    setItems([]);
    setCursor(null);
    setHasMore(true);
    loadInitial();
  }

  async function loadInitial() {
    const query = new URLSearchParams();
    query.append("type", activeTab);

    if (category) query.append("category", category);

    const res = await fetch(`${endpoint}?${query.toString()}`);
    if (!res.ok) return;

    const data = await res.json();
    const safeData = Array.isArray(data) ? data : [];

    setItems(safeData);

    setCursor(
      safeData.length
        ? safeData[safeData.length - 1].created_at
        : null
    );

    setHasMore(safeData.length >= 25);
  }

  async function loadMore() {
    if (!cursor || !hasMore) return;

    setLoading(true);

    const query = new URLSearchParams();
    query.append("type", activeTab);
    query.append("cursor", cursor);

    if (category) query.append("category", category);

    const res = await fetch(`${endpoint}?${query.toString()}`);
    const data = await res.json();

    const safeData = Array.isArray(data) ? data : [];

    const unique = safeData.filter(
      (item) => !items.some((c) => c.id === item.id)
    );

    setItems((prev) => [...prev, ...unique]);

    if (unique.length > 0) {
      setCursor(unique[unique.length - 1].created_at);
    }

    if (unique.length < 25) {
      setHasMore(false);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* ✅ FIXED FILTER UI */}
      {showFilters && (
        <div className="bg-white rounded-xl p-4 border shadow-sm">

          {/* ROW 1 */}
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => setActiveTab("latest")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                activeTab === "latest"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Latest
            </button>

            <button
              onClick={() => setActiveTab("trending")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                activeTab === "trending"
                  ? "bg-gray-200"
                  : "bg-gray-100"
              }`}
            >
              🔥 Trending
            </button>
          </div>

          {/* ROW 2 */}
          <div className="mb-3">
            <button
              onClick={() => setActiveTab("following")}
              className={`w-full py-2 rounded-lg text-sm font-medium ${
                activeTab === "following"
                  ? "bg-gray-200"
                  : "bg-gray-100"
              }`}
            >
              Following
            </button>
          </div>

          {/* ROW 3 */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat || "All Categories"}
              </option>
            ))}
          </select>

        </div>
      )}

      {/* FEED */}
      <div className="space-y-4">
        {items.map((c) => {
          const identity = c.identity ?? {};

          const avatar =
            identity.avatar_url?.trim()
              ? identity.avatar_url.trim()
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  identity.display_name ||
                    identity.username ||
                    "User"
                )}&background=2563eb&color=fff`;

          const profileLink =
            identity.type === "company"
              ? `/c/${identity.username}`
              : `/u/${identity.username}`;

          const commitmentLink =
            c.type === "update" && c.parent_commitment_id
              ? `/commitment/${c.parent_commitment_id}`
              : `/commitment/${c.id}`;

          if (c.type === "update") {
            return (
              <Link key={c.id} href={commitmentLink}>
                <div className="bg-gray-50 border rounded-xl p-4 hover:bg-gray-100 transition">
                  <div className="text-xs text-blue-600 font-medium mb-2">
                    🔄 Update
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <img src={avatar} className="w-8 h-8 rounded-full" />
                    <div className="text-sm">
                      <span className="font-semibold">
                        {identity.display_name || identity.username}
                      </span>{" "}
                      updated a commitment
                    </div>
                  </div>

                  <div className="text-gray-900 text-sm ml-11">
                    {c.text}
                  </div>

                  <div className="text-xs text-gray-400 ml-11 mt-1">
                    {timeAgo(c.created_at)}
                  </div>
                </div>
              </Link>
            );
          }

          return (
            <Link key={c.id} href={commitmentLink}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3 mb-3">

                  <Link href={profileLink} onClick={(e)=>e.stopPropagation()}>
                    <img
                      src={avatar}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>

                  <div>
                    <Link
                      href={profileLink}
                      onClick={(e)=>e.stopPropagation()}
                      className="font-medium"
                    >
                      {identity.display_name || identity.username}
                    </Link>

                    <div className="text-xs text-gray-500">
                      @{identity.username} · {timeAgo(c.created_at)}
                    </div>
                  </div>

                </div>

                {c.category && (
                  <div className="text-xs text-blue-600 mb-2">
                    {c.category}
                  </div>
                )}

                <div className="mb-3 whitespace-pre-wrap text-gray-800">
                  {c.text}
                </div>

                <div className="text-sm text-gray-500 flex gap-4">
                  <span>👁 {c.views ?? 0} views</span>
                  <span>🔁 {c.shares ?? 0}</span>
                </div>

              </div>
            </Link>
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
