"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

  /* COMBINED CATEGORY LIST (INDIVIDUAL + COMPANY) */

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

        {/* TAB SWITCH */}

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

        {/* CATEGORY FILTER */}

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
              c.identity.avatar_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                c.identity.display_name || c.identity.username
              )}&background=2563eb&color=fff`;

            const profileLink =
              c.identity.type === "company"
                ? `/c/${c.identity.username}`
                : `/u/${c.identity.username}`;

            return (

              <div
                key={c.id}
                className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition"
              >

                {/* AUTHOR */}

                <Link
                  href={profileLink}
                  className="flex items-center gap-3 mb-3"
                >

                  <Image
                    src={avatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
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

                {/* TEXT */}

                <div className="text-gray-900 text-base mb-3 leading-relaxed">
                  {c.text}
                </div>

                {/* VIEWS */}

                <div className="text-xs text-gray-500">
                  👁 {c.views ?? 0} views
                </div>

              </div>

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
