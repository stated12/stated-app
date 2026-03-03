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
    setLoading(true);

    const params = new URLSearchParams();
    params.append("type", activeTab);
    if (category) params.append("category", category);

    const res = await fetch(`/api/feed?${params.toString()}`);
    const data = await res.json();

    setCommitments(data);
    setLoading(false);
  }

  function badgeColor(badge?: string) {
    switch (badge) {
      case "Trusted":
        return "bg-purple-100 text-purple-600";
      case "Leader":
        return "bg-blue-100 text-blue-600";
      case "Operator":
        return "bg-indigo-100 text-indigo-600";
      case "Builder":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 pt-6 pb-28 space-y-6">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold">
          Public Commitments
        </h1>
        <p className="text-sm text-gray-500">
          Discover public commitments from builders & companies
        </p>
      </div>

      {/* FILTER CARD */}
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">

        {/* Tabs */}
        <div className="flex gap-2">
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
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            🔥 Trending
          </button>
        </div>

        {/* Category */}
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

      {/* FEED */}
      <div className="space-y-4">

        {loading && (
          <div className="text-center text-gray-500">
            Loading...
          </div>
        )}

        {!loading &&
          commitments.map((c) => {
            const avatar =
              c.identity.avatar_url?.trim()
                ? c.identity.avatar_url.trim()
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    c.identity.display_name
                  )}&background=2563eb&color=fff`;

            const profileLink =
              c.identity.type === "company"
                ? `/c/${c.identity.username}`
                : `/u/${c.identity.username}`;

            return (
              <div
                key={c.id}
                className="bg-white rounded-xl shadow-sm p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Link href={profileLink}>
                    <Image
                      src={avatar}
                      alt="avatar"
                      width={42}
                      height={42}
                      className="rounded-full"
                    />
                  </Link>

                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={profileLink}
                        className="font-medium"
                      >
                        {c.identity.display_name}
                      </Link>

                      {c.identity.badge && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${badgeColor(
                            c.identity.badge
                          )}`}
                        >
                          {c.identity.badge}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-gray-500">
                      @{c.identity.username} ·{" "}
                      {timeAgo(c.created_at)}
                    </div>
                  </div>
                </div>

                <div className="text-gray-800 mb-2">
                  {c.text}
                </div>

                <div className="text-xs text-gray-500">
                  👁 {c.views} views
                </div>
              </div>
            );
          })}

        {!loading && commitments.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
            No commitments yet
          </div>
        )}
      </div>

      {/* LARGE CREATE BUTTON (like mockup) */}
      <Link
        href="/dashboard/commitments/new"
        className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl shadow-md font-medium"
      >
        + Create Commitment
      </Link>
    </div>
  );
                  }
