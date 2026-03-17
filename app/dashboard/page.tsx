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
    useState<"latest" | "trending" | "following">("latest");

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
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
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
        <h1 className="text-2xl font-bold">Public Commitments</h1>
        <p className="text-sm text-gray-500">
          Discover commitments from individuals & companies
        </p>
      </div>

      {/* FILTER CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">

        {/* Latest / Trending */}
        <div className="flex gap-2">

          <button
            onClick={() => setActiveTab("latest")}
            className={`flex-1 py-2 rounded-xl text-sm font-medium ${
              activeTab === "latest"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Latest
          </button>

          <button
            onClick={() => setActiveTab("trending")}
            className={`flex-1 py-2 rounded-xl text-sm font-medium ${
              activeTab === "trending"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            🔥 Trending
          </button>

        </div>

        {/* FOLLOWING BUTTON */}
        <button
          onClick={() => setActiveTab("following")}
          className={`w-full py-2 rounded-xl text-sm font-medium ${
            activeTab === "following"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Following
        </button>

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-xl px-3 py-2 text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat || "All Categories"}
            </option>
          ))}
        </select>

      </div>

      {/* EMPTY STATE (FOLLOWING) */}
      {!loading && commitments.length === 0 && activeTab === "following" && (
        <div className="text-center text-gray-500 py-10">
          👀 No updates yet <br />
          Follow people to see their commitments
        </div>
      )}

      {/* FEED */}
      <div className="space-y-4">

        {commitments.map((c) => {

          const avatar =
            c.identity.avatar_url?.trim()
              ? c.identity.avatar_url
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  c.identity.display_name || c.identity.username
                )}&background=2563eb&color=fff`;

          const profileLink =
            c.identity.type === "company"
              ? `/c/${c.identity.username}`
              : `/u/${c.identity.username}`;

          return (

            <Link key={c.id} href={`/commitment/${c.id}`}>

              <div className="bg-white rounded-2xl shadow-sm p-5">

                <Link
                  href={profileLink}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-3 mb-3"
                >
                  <img src={avatar} className="w-10 h-10 rounded-full" />

                  <div>
                    <div className="text-sm font-semibold">
                      {c.identity.display_name || c.identity.username}
                    </div>
                    <div className="text-xs text-gray-500">
                      @{c.identity.username}
                    </div>
                  </div>
                </Link>

                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>{c.category}</span>
                  <span>{timeAgo(c.created_at)}</span>
                </div>

                <div className="text-gray-900 mb-3">
                  {c.text}
                </div>

                <div className="text-xs text-gray-500 flex gap-4">
                  <span>👁 {c.views ?? 0}</span>
                  <span>🔁 {c.shares ?? 0}</span>
                </div>

              </div>

            </Link>

          );

        })}

        <div ref={loadMoreRef}></div>

      </div>

    </div>

  );

}
