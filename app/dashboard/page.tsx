"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Commitment = {
  id: string;
  text: string;
  category: string;
  created_at: string;
  views?: number;
  username?: string;
  display_name?: string;
  avatar_url?: string;
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

export default function Dashboard() {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [activeTab, setActiveTab] =
    useState<"latest" | "trending">("latest");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

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
  ];

  useEffect(() => {
    loadFeed();
  }, [activeTab, category]);

  async function loadFeed() {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.append("type", activeTab);
      if (category) params.append("category", category);

      const res = await fetch(`/api/feed?${params.toString()}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setCommitments(data);
        triggerImpressions(data);
      } else {
        setCommitments([]);
      }
    } catch (err) {
      console.error("Feed error:", err);
      setCommitments([]);
    } finally {
      setLoading(false);
    }
  }

  async function triggerImpressions(data: Commitment[]) {
    if (!data || data.length === 0) return;

    const ids = data.map((c) => c.id);

    const sessionKey = "viewed_" + ids.join("_");

    if (sessionStorage.getItem(sessionKey)) return;

    try {
      await fetch("/api/impression", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commitmentIds: ids,
        }),
      });

      sessionStorage.setItem(sessionKey, "true");
    } catch (err) {
      console.error("Impression error:", err);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 pt-6 pb-20 space-y-6">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold">
          Public Commitments
        </h1>
        <p className="text-sm text-gray-500">
          Discover commitments from individuals & companies
        </p>
      </div>

      {/* FILTER CARD */}
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

      {/* FEED */}
      <div className="space-y-4">

        {loading && (
          <div className="text-center text-gray-500 py-6">
            Loading...
          </div>
        )}

        {!loading &&
          commitments.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl shadow-sm p-5 transition hover:shadow-md"
            >

              {/* AUTHOR */}
              <Link
                href={`/u/${c.username}`}
                className="flex items-center gap-3 mb-3"
              >

                <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">

                  {c.avatar_url ? (
                    <Image
                      src={c.avatar_url}
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                  ) : (
                    c.display_name?.charAt(0) ||
                    c.username?.charAt(0)
                  )}

                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {c.display_name || c.username}
                  </div>

                  <div className="text-xs text-gray-500">
                    @{c.username}
                  </div>
                </div>

              </Link>

              {/* META */}
              <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
                <span>{c.category}</span>
                <span>{timeAgo(c.created_at)}</span>
              </div>

              {/* TEXT */}
              <div className="text-gray-900 text-base mb-3 leading-relaxed">
                {c.text}
              </div>

              {/* VIEWS */}
              <div className="text-xs text-gray-500">
                👁 {c.views ?? 0} views
              </div>

            </div>
          ))}

        {!loading && commitments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-gray-500">
            No commitments yet
          </div>
        )}

      </div>

    </div>
  );
}
