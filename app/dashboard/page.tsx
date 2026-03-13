"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

type Identity = {
  username: string;
  display_name: string;
  avatar_url?: string | null;
  type: "user" | "company";
};

type Commitment = {
  id: string;
  text: string;
  category: string;
  created_at: string;
  views?: number;
  shares?: number;
  latest_update?: string | null;
  identity: Identity;
};

function timeAgo(date: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  if (seconds < 60) return "now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}

export default function DashboardPage() {

  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] =
    useState<"latest" | "trending">("latest");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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
  ];

  useEffect(() => {
    resetFeed();
  }, [activeTab, category]);

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {

        const first = entries[0];

        if (first.isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }

      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();

  }, [hasMore, loadingMore]);

  function resetFeed() {
    setCommitments([]);
    setCursor(null);
    setHasMore(true);
    loadFeed();
  }

  async function loadFeed() {

    try {

      setLoading(true);

      const params = new URLSearchParams();
      params.append("type", activeTab);

      if (category) params.append("category", category);

      const res = await fetch(`/api/feed?${params.toString()}`);
      const data = await res.json();

      const safeData = Array.isArray(data) ? data : [];

      setCommitments(safeData);

      setCursor(
        safeData.length
          ? safeData[safeData.length - 1].created_at
          : null
      );

      setHasMore(safeData.length === 25);

    } catch (err) {

      console.error("Feed error:", err);
      setCommitments([]);

    } finally {

      setLoading(false);

    }

  }

  async function loadMore() {

    if (!cursor || !hasMore) return;

    try {

      setLoadingMore(true);

      const params = new URLSearchParams();

      params.append("type", activeTab);
      params.append("cursor", cursor);

      if (category) params.append("category", category);

      const res = await fetch(`/api/feed?${params.toString()}`);
      const data = await res.json();

      const safeData = Array.isArray(data) ? data : [];

      setCommitments((prev) => [...prev, ...safeData]);

      if (safeData.length > 0) {
        setCursor(safeData[safeData.length - 1].created_at);
      }

      if (safeData.length < 25) {
        setHasMore(false);
      }

    } catch (err) {

      console.error("Load more error:", err);

    } finally {

      setLoadingMore(false);

    }

  }

  return (

    <div className="max-w-xl mx-auto px-4 pt-6 pb-20 space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Public Commitments
        </h1>

        <p className="text-sm text-gray-500">
          Discover commitments from individuals & companies
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">

        <div className="flex gap-2">

          <button
            onClick={() => setActiveTab("latest")}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === "latest"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Latest
          </button>

          <button
            onClick={() => setActiveTab("trending")}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === "trending"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            🔥 Trending
          </button>

        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat || "All Categories"}
            </option>
          ))}

        </select>

      </div>

      <div className="space-y-4">

        {loading && (
          <div className="text-center text-gray-500 py-6">
            Loading...
          </div>
        )}

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

            <Link key={c.id} href={`/commitment/${c.id}`}>

              <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition cursor-pointer">

                <Link
                  href={profileLink}
                  onClick={(e)=>e.stopPropagation()}
                  className="flex items-center gap-3 mb-3"
                >

                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>

                    <div className="text-sm font-semibold text-gray-900">
                      {c.identity.display_name ||
                        c.identity.username}
                    </div>

                    <div className="text-xs text-gray-500">
                      @{c.identity.username}
                    </div>

                  </div>

                </Link>

                <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
                  <span>{c.category}</span>
                  <span>{timeAgo(c.created_at)}</span>
                </div>

                <div className="text-gray-900 text-base mb-3 leading-relaxed">
                  {c.text}
                </div>

                {c.latest_update && (
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mb-3">
                    <span className="font-medium text-gray-900">
                      Latest update:
                    </span>{" "}
                    {c.latest_update}
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>👁 {c.views ?? 0} views</span>
                  <span>🔁 {c.shares ?? 0}</span>
                </div>

              </div>

            </Link>

          );

        })}

        {loadingMore && (
          <div className="text-center text-gray-500 py-4">
            Loading more...
          </div>
        )}

        <div ref={loadMoreRef}></div>

        {hasMore && !loadingMore && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Load More
            </button>
          </div>
        )}

      </div>

    </div>

  );

}
