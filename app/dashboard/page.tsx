"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Commitment = {
  id: string;
  text: string;
  status: string;
  created_at: string;
  views: number;
  profiles: {
    username: string;
    display_name: string;
    avatar_url: string | null;
    plan_key: string | null;
  };
};

export default function DashboardFeed() {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInitial();
  }, []);

  async function loadInitial() {
    const res = await fetch("/api/feed");
    const data = await res.json();
    setCommitments(data);
    if (data.length > 0) {
      setCursor(data[data.length - 1].created_at);
    }
    triggerImpressions(data);
  }

  async function loadMore() {
    if (!cursor) return;
    setLoading(true);
    const res = await fetch(`/api/feed?cursor=${cursor}`);
    const data = await res.json();
    setCommitments((prev) => [...prev, ...data]);
    if (data.length > 0) {
      setCursor(data[data.length - 1].created_at);
    }
    triggerImpressions(data);
    setLoading(false);
  }

  function triggerImpressions(data: Commitment[]) {
    if (!data || data.length === 0) return;

    const ids = data.map((c) => c.id);
    const sessionKey = "viewed_" + ids.join("_");

    if (sessionStorage.getItem(sessionKey)) return;

    fetch("/api/impression", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commitmentIds: ids }),
    });

    sessionStorage.setItem(sessionKey, "true");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className="space-y-4">
        {commitments.map((c) => {
          const avatar =
            c.profiles.avatar_url?.trim()
              ? c.profiles.avatar_url.trim()
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  c.profiles.display_name || c.profiles.username
                )}&background=2563eb&color=fff`;

          return (
            <div key={c.id} className="bg-white rounded-xl shadow p-5">

              <div className="flex items-center gap-3 mb-3">
                <Link href={`/u/${c.profiles.username}`}>
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
                    href={`/u/${c.profiles.username}`}
                    className="font-medium"
                  >
                    {c.profiles.display_name || c.profiles.username}
                  </Link>
                  {c.profiles.plan_key && (
                    <span className="ml-2 text-xs text-blue-600 font-medium">
                      PRO
                    </span>
                  )}
                  <div className="text-xs text-gray-500">
                    @{c.profiles.username}
                  </div>
                </div>
              </div>

              <div className="text-base mb-3">
                {c.text}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div>
                  {new Date(c.created_at).toLocaleDateString()}
                </div>
                <div>
                  {c.views} views
                </div>
              </div>

            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={loadMore}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>

    </div>
  );
}
