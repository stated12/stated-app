"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ViewTracker from "@/components/ViewTracker";

type Identity = {
  username?: string;
  display_name?: string | null;
  avatar_url?: string | null;
  plan_key?: string | null;
  type?: "user" | "company";
};

type Commitment = {
  id: string;
  text?: string;
  category?: string;
  created_at: string;
  views?: number;
  latest_update?: string | null;
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

  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] =
    useState<"latest" | "trending">("latest");
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
    "Other"
  ];

  useEffect(() => {
    resetFeed();
  }, [activeTab, category]);

  function resetFeed() {
    setCommitments([]);
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

    setCommitments(safeData);

    setCursor(
      safeData.length
        ? safeData[safeData.length - 1].created_at
        : null
    );

    setHasMore(safeData.length === 25);
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
      (item) => !commitments.some((c) => c.id === item.id)
    );

    setCommitments((prev) => [...prev, ...unique]);

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

      {showFilters && (

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

      )}

      <div className="space-y-4">

        {commitments.map((c) => {

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

          return (

            <Link key={c.id} href={`/commitment/${c.id}`}>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 cursor-pointer hover:shadow-md transition">

                <ViewTracker
                  type="commitment"
                  entityId={c.id}
                />

                <div className="flex items-center gap-3 mb-3">

                  <Link href={profileLink} onClick={(e)=>e.stopPropagation()}>

                    <Image
                      src={avatar}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />

                  </Link>

                  <div>

                    <Link
                      href={profileLink}
                      onClick={(e)=>e.stopPropagation()}
                      className="font-medium"
                    >
                      {identity.display_name ||
                        identity.username ||
                        "Unknown"}
                    </Link>

                    <div className="text-xs text-gray-500">
                      @{identity.username || "user"} ·{" "}
                      {timeAgo(c.created_at)}
                    </div>

                  </div>

                </div>

                {c.category && (

                  <div className="text-xs text-blue-600 mb-2">
                    {c.category}
                  </div>

                )}

                <div className="mb-3 whitespace-pre-wrap text-gray-800">
                  {c.text || ""}
                </div>

                {c.latest_update && (

                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mb-3">
                    <span className="font-medium text-gray-900">
                      Latest update:
                    </span>{" "}
                    {c.latest_update}
                  </div>

                )}

                <div className="text-sm text-gray-500">
                  👁 {c.views ?? 0} views
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
