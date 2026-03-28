"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CheerButton from "@/components/CheerButton";

type Identity = {
  username?: string;
  display_name?: string | null;
  avatar_url?: string | null;
  type?: "user" | "company";
};

type FeedItem = {
  id: string;
  type: "commitment" | "update";
  text?: string;
  category?: string;
  created_at: string;
  views?: number;
  shares?: number;
  cheers?: number;
  parent_commitment_id?: string;
  identity?: Identity | null;
};

function timeAgo(date: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  const intervals: any = {
    year: 31536000, month: 2592000, day: 86400, hour: 3600, minute: 60,
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
  limit,
}: {
  endpoint: string;
  showFilters?: boolean;
  limit?: number; // if set, caps display and hides Load More
}) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState<"latest" | "trending" | "following">("latest");
  const [category, setCategory] = useState("");

  const categories = [
    "", "Fitness", "Learning", "Writing", "Health", "Finance", "Business",
    "Marketing", "Sales", "Operations", "Product", "Strategic", "Announcement", "Other",
  ];

  useEffect(() => { resetFeed(); }, [activeTab, category]);

  function resetFeed() {
    setItems([]);
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
    setItems(safeData);
    setCursor(safeData.length ? safeData[safeData.length - 1].created_at : null);
    setHasMore(safeData.length > 0);
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
    const unique = safeData.filter((item) => !items.some((c) => c.id === item.id));
    setItems((prev) => [...prev, ...unique]);
    if (unique.length > 0) setCursor(unique[unique.length - 1].created_at);
    if (unique.length === 0) setHasMore(false);
    setLoading(false);
  }

  const tabStyle = (tab: string): React.CSSProperties => ({
    padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600,
    cursor: "pointer", whiteSpace: "nowrap",
    background: activeTab === tab ? "#4338ca" : "#fff",
    color: activeTab === tab ? "#fff" : "#6b7280",
    boxShadow: activeTab === tab ? "0 2px 8px rgba(67,56,202,0.25)" : "none",
    border: activeTab === tab ? "1px solid transparent" : "1px solid #e8eaf2",
  });

  // Apply limit only for display — does not affect fetching
  const displayItems = limit ? items.slice(0, limit) : items;
  const showLoadMore = !limit && hasMore;

  return (
    <div style={{ maxWidth: 768, margin: "0 auto" }}>
      {/* FILTERS */}
      {showFilters && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2, marginBottom: 10 }}>
            <button onClick={() => setActiveTab("latest")} style={tabStyle("latest")}>Latest</button>
            <button onClick={() => setActiveTab("trending")} style={tabStyle("trending")}>Trending</button>
            <button onClick={() => setActiveTab("following")} style={tabStyle("following")}>Following</button>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", border: "1px solid #e8eaf2", borderRadius: 10, padding: "9px 14px", fontSize: 13, color: category ? "#0f0c29" : "#9ca3af", background: "#fff", outline: "none", fontFamily: "inherit" }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat || "All Categories"}</option>
            ))}
          </select>
        </div>
      )}

      {/* FEED ITEMS */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {displayItems.map((c) => {
          const identity = c.identity ?? {};
          const avatar = identity.avatar_url?.trim()
            ? identity.avatar_url.trim()
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(identity.display_name || identity.username || "User")}&background=4338ca&color=fff`;

          const profileLink = identity.type === "company" ? `/c/${identity.username}` : `/u/${identity.username}`;
          const commitmentLink = c.type === "update" && c.parent_commitment_id
            ? `/commitment/${c.parent_commitment_id}`
            : `/commitment/${c.id}`;

          // UPDATE CARD
          if (c.type === "update") {
            return (
              <Link key={c.id} href={commitmentLink} style={{ textDecoration: "none" }}>
                <div style={{ background: "#f8f9fc", border: "1px solid #f0f1f6", borderRadius: 14, padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 8.5V5a4 4 0 018 0v3.5" stroke="#4338ca" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M0 8.5h12" stroke="#4338ca" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#4338ca" }}>Update</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <img src={avatar} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>
                        {identity.display_name || identity.username} updated a commitment
                      </div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2, lineHeight: 1.4 }}>{c.text}</div>
                      <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 4 }}>{timeAgo(c.created_at)}</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          }

          // COMMITMENT CARD
          return (
            <Link key={c.id} href={commitmentLink} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #f0f1f6", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ height: 3, background: "linear-gradient(90deg,#4338ca,#818cf8)" }} />
                <div style={{ padding: "12px 14px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Link href={profileLink} onClick={(e) => e.stopPropagation()}>
                      <img src={avatar} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                    </Link>
                    <div style={{ flex: 1 }}>
                      <Link href={profileLink} onClick={(e) => e.stopPropagation()} style={{ textDecoration: "none" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f0c29" }}>
                          {identity.display_name || identity.username}
                        </div>
                      </Link>
                      <div style={{ fontSize: 10, color: "#9ca3af" }}>@{identity.username} · {timeAgo(c.created_at)}</div>
                    </div>
                    {c.category && (
                      <div style={{ fontSize: 9, fontWeight: 600, color: "#4338ca", background: "#eef2ff", padding: "2px 8px", borderRadius: 20, flexShrink: 0 }}>
                        {c.category}
                      </div>
                    )}
                  </div>

                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0f0c29", lineHeight: 1.5, marginBottom: 10 }}>
                    {c.text}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 8, borderTop: "1px solid #f3f4f8" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#9ca3af" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <ellipse cx="6" cy="6" rx="5" ry="3.5" stroke="#9ca3af" strokeWidth="1.1"/>
                        <circle cx="6" cy="6" r="1.6" stroke="#9ca3af" strokeWidth="1.1"/>
                      </svg>
                      {c.views ?? 0} views
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#9ca3af" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M9 1.5l2 2-2 2" stroke="#9ca3af" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11 3.5H5A3 3 0 002 6.5v1" stroke="#9ca3af" strokeWidth="1.1" strokeLinecap="round"/>
                      </svg>
                      {c.shares ?? 0}
                    </div>
                    <div onClick={(e) => e.stopPropagation()} style={{ marginLeft: "auto" }}>
                      <CheerButton commitmentId={c.id} initialCount={c.cheers ?? 0} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* LOAD MORE — hidden when limit is set */}
      {showLoadMore && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button
            onClick={loadMore}
            disabled={loading}
            style={{ background: loading ? "#f3f4f6" : "#fff", border: "1px solid #e8eaf2", borderRadius: 22, padding: "9px 28px", fontSize: 12, fontWeight: 600, color: loading ? "#9ca3af" : "#4338ca", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}
          >
            {loading ? "Loading..." : "View more commitments"}
          </button>
        </div>
      )}
    </div>
  );
}
