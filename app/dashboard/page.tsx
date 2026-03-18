"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

type Identity = {
  username: string;
  display_name: string;
  avatar_url?: string | null;
  type: "user" | "company";
};

type FeedItem = {
  id: string;
  type?: "commitment" | "update";
  text: string;
  category?: string;
  created_at: string;
  views?: number;
  shares?: number;
  parent_commitment_id?: string; // ✅ added
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

  const [items, setItems] = useState<FeedItem[]>([]);
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
    setItems([]);
    setCursor(null);
    setHasMore(true);
    setLoading(true);
    loadFeed();
  }

  async function loadFeed() {

    try {

      const params = new URLSearchParams();
      params.append("type", activeTab);

      if (category) params.append("category", category);

      const res = await fetch(`/api/feed?${params.toString()}`);
      const data = await res.json();

      const safeData = Array.isArray(data) ? data : [];

      setItems(safeData);

      setCursor(
        safeData.length
          ? safeData[safeData.length - 1].created_at
          : null
      );

      setHasMore(safeData.length === 25);

    } catch (err) {

      console.error("Feed error:", err);
      setItems([]);

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

      setItems((prev) => [...prev, ...safeData]);

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

      {/* FILTER */}
      <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">

        <div className="flex gap-2">

          <button
            onClick={() => setActiveTab("latest")}
            className={`flex-1 py-2 rounded-xl text-sm ${
              activeTab === "latest"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Latest
          </button>

          <button
            onClick={() => setActiveTab("trending")}
            className={`flex-1 py-2 rounded-xl text-sm ${
              activeTab === "trending"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            🔥 Trending
          </button>

        </div>

        <button
          onClick={() => setActiveTab("following")}
          className={`w-full py-2 rounded-xl text-sm ${
            activeTab === "following"
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
          }`}
        >
          Following
        </button>

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

      {/* FEED */}
      <div className="space-y-4">

        {loading && (
          <div className="text-center text-gray-500 py-6">
            Loading...
          </div>
        )}

        {items.map((c) => {

          const avatar =
            c.identity.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              c.identity.display_name || c.identity.username
            )}`;

          const profileLink =
            c.identity.type === "company"
              ? `/c/${c.identity.username}`
              : `/u/${c.identity.username}`;

          const commitmentLink =
            c.type === "update" && c.parent_commitment_id
              ? `/commitment/${c.parent_commitment_id}`
              : `/commitment/${c.id}`;

          /* =========================
             UPDATE CARD
          ========================= */

          if (c.type === "update") {
            return (

              <Link key={c.id} href={commitmentLink}>

                <div className="bg-gray-50 border rounded-xl p-4 hover:bg-gray-100 transition">

                  <div className="flex gap-3 mb-2">

                    <img
                      src={avatar}
                      className="w-8 h-8 rounded-full"
                    />

                    <div className="text-sm">

                      <span className="font-semibold">
                        {c.identity.display_name}
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

          /* =========================
             COMMITMENT CARD
          ========================= */

          return (

            <Link key={c.id} href={commitmentLink}>

              <div className="bg-white rounded-2xl shadow-sm p-5">

                <Link
                  href={profileLink}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-3 mb-3"
                >

                  <img src={avatar} className="w-10 h-10 rounded-full" />

                  <div>
                    <div className="text-sm font-semibold">
                      {c.identity.display_name}
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

        {loadingMore && (
          <div className="text-center text-gray-500 py-4">
            Loading more...
          </div>
        )}

        <div ref={loadMoreRef}></div>

        {hasMore && !loadingMore && (
          <div className="text-center py-4">
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
