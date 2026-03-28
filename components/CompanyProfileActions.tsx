"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShareProfileButton from "@/components/ShareProfileButton";

type Props = {
  companyId: string;
  companyName: string;
  username: string;
  currentUserId: string | null;
  isOwner: boolean;
};

export default function CompanyProfileActions({ companyId, username, currentUserId, isOwner }: Props) {
  const router = useRouter();
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUserId) return;
    fetch("/api/follow/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetCompanyId: companyId }),
    }).then((r) => r.json()).then((d) => setFollowing(d.following)).catch(() => {});
  }, [companyId, currentUserId]);

  async function handleFollow() {
    if (!currentUserId) { router.push("/signup?next=" + window.location.pathname); return; }
    setLoading(true);
    try {
      await fetch("/api/follow", {
        method: following ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followingCompanyId: companyId }),
      });
      setFollowing(!following);
    } catch {}
    setLoading(false);
  }

  const pillStyle = (active: boolean): React.CSSProperties => ({
    padding: "8px 22px",
    borderRadius: 22,
    fontSize: 13,
    fontWeight: 700,
    cursor: loading ? "not-allowed" : "pointer",
    fontFamily: "inherit",
    background: active ? "linear-gradient(135deg,#0891b2,#0e7490)" : "#f0f9ff",
    color: active ? "#fff" : "#0891b2",
    border: active ? "none" : "1.5px solid #bae6fd",
    boxShadow: active ? "0 2px 8px rgba(8,145,178,0.3)" : "none",
    whiteSpace: "nowrap" as const,
  });

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
      {!isOwner && (
        <button onClick={handleFollow} disabled={loading} style={pillStyle(!following)}>
          {loading ? "..." : following ? "Following" : "Follow"}
        </button>
      )}
      <ShareProfileButton
        username={username}
        profileType="company"
        style={pillStyle(false)}
      />
    </div>
  );
}
