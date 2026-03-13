"use client";

import { useEffect, useState } from "react";
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
    "Marketing",
    "Sales",
    "Operations",
    "Product",
    "Strategic",
    "Announcement",
  ];

  useEffect(() => {
    loadFeed();
  }, [activeTab, category]);

  async function loadFeed() {

    try {

      setLoading(true);

      const params = new URLSearchParams();

      params.append("type", activeTab);

      if (category) {
        params.append("category", category);
      }

      const res = await fetch(`/api/feed?${params.toString()}`);

      const data = await res.json();

      if (Array.isArray(data)) {
        setCommitments(data);
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

              <Link key={c.id} href={`/commitment/${c.id}`}>

                <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition cursor-pointer">

                  {/* AUTHOR */}

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

                  {/* META */}

                  <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
                    <span>{c.category}</span>
                    <span>{timeAgo(c.created_at)}</span>
                  </div>

                  {/* COMMITMENT TEXT */}

                  <div className="text-gray-900 text-base mb-3 leading-relaxed">
                    {c.text}
                  </div>

                  {/* LATEST UPDATE */}

                  {c.latest_update && (

                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mb-3">

                      <span className="font-medium text-gray-900">
                        Latest update:
                      </span>{" "}
                      {c.latest_update}

                    </div>

                  )}

                  {/* VIEWS + SHARES */}

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>👁 {c.views ?? 0} views</span>
                    <span>🔁 {c.shares ?? 0}</span>
                  </div>

                </div>

              </Link>

            );

          })}

        {!loading && commitments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-gray-500">
            No commitments yet
          </div>
        )}

      </div>

    </div>

  );

}
