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
  user_id?: string | null;
  company_id?: string | null;
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
    <div className="max-w-xl mx-auto px-4 pt-4 pb-20 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-center relative mb-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Stated"
            width={42}
            height={42}
          />
          <span className="text-xl font-bold text-blue-600 tracking-tight">
            Stated
          </span>
        </Link>
      </div>

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

        {/* Tabs */}
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

        {/* Category */}
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
              <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
                <span>{c.category}</span>
                <span>{timeAgo(c.created_at)}</span>
              </div>

              <div className="text-gray-900 text-base mb-3 leading-relaxed">
                {c.text}
              </div>

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

      {/* FOOTER */}
      <div className="pt-10 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Stated. Built for builders.
      </div>
    </div>
  );
}
