"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ViewTracker from "@/components/ViewTracker";
import FollowButton from "@/components/social/FollowButton";
import CheerButton from "@/components/CheerButton"; // ✅ added

export default function CommitmentClient({
  commitmentId,
}: {
  commitmentId: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [commitment, setCommitment] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [viewCount, setViewCount] = useState<number>(0);
  const [shareCount, setShareCount] = useState<number>(0);
  const [cheerCount, setCheerCount] = useState<number>(0); // ✅ added
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [followerCount, setFollowerCount] = useState<number>(0);

  useEffect(() => {
    loadCommitment();
    loadUpdates();
    loadViews();
    loadShares();
    loadCheers(); // ✅ added
    loadUser();
  }, []);

  useEffect(() => {
    if (profile || company) loadFollowers();
  }, [profile, company]);

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    setCurrentUser(data?.user || null);
  }

  async function loadCommitment() {
    const { data } = await supabase
      .from("commitments").select("*").eq("id", commitmentId).maybeSingle();
    if (!data) { setLoading(false); return; }
    setCommitment(data);
    if (data.user_id) {
      const { data: profileData } = await supabase
        .from("profiles").select("id,username,display_name,avatar_url")
        .eq("id", data.user_id).maybeSingle();
      setProfile(profileData || null);
    }
    if (data.company_id) {
      const { data: companyData } = await supabase
        .from("companies").select("id,username,name,logo_url")
        .eq("id", data.company_id).maybeSingle();
      setCompany(companyData || null);
    }
    setLoading(false);
  }

  async function loadUpdates() {
    const { data } = await supabase
      .from("commitment_updates").select("*").eq("commitment_id", commitmentId)
      .order("created_at", { ascending: false });
    setUpdates(data || []);
  }

  async function loadViews() {
    const { count } = await supabase
      .from("commitment_views").select("*", { count: "exact", head: true })
      .eq("commitment_id", commitmentId);
    setViewCount(count || 0);
  }

  async function loadShares() {
    const { count } = await supabase
      .from("commitment_shares").select("*", { count: "exact", head: true })
      .eq("commitment_id", commitmentId);
    setShareCount(count || 0);
  }

  // ✅ Load cheer count from commitment_cheers table
  async function loadCheers() {
    const { count } = await supabase
      .from("commitment_cheers").select("*", { count: "exact", head: true })
      .eq("commitment_id", commitmentId);
    setCheerCount(count || 0);
  }

  async function loadFollowers() {
    if (profile?.id) {
      const { count } = await supabase
        .from("follows").select("*", { count: "exact", head: true })
        .eq("following_user_id", profile.id);
      setFollowerCount(count || 0);
    }
    if (company?.id) {
      const { count } = await supabase
        .from("follows").select("*", { count: "exact", head: true })
        .eq("following_company_id", company.id);
      setFollowerCount(count || 0);
    }
  }

  function avatar() {
    if (commitment?.company_id && company?.logo_url) return company.logo_url;
    if (profile?.avatar_url) return profile.avatar_url;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.display_name || company?.name || "User"
    )}&background=4338ca&color=fff`;
  }

  async function share() {
    const url = `${window.location.origin}/commitment/${commitmentId}`;
    const text = `Public commitment on Stated:\n\n"${commitment?.text}"\n\nTrack progress:\n${url}`;
    try {
      await supabase.from("commitment_shares").insert({ commitment_id: commitmentId });
      await supabase.rpc("increment_commitment_shares", { commitment_id_input: commitmentId });
      setShareCount((s) => s + 1);
    } catch (e) {
      console.log("share tracking error", e);
    }
    if (navigator.share) {
      await navigator.share({ title: "Public Commitment on Stated", text, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Commitment link copied");
    }
  }

  function getStatusStyle(): { label: string; bg: string; color: string; dot: string } {
    const s = commitment?.status;
    if (s === "active")    return { label: "Active",    bg: "#dcfce7", color: "#15803d", dot: "#16a34a" };
    if (s === "paused")    return { label: "Paused",    bg: "#fef9c3", color: "#a16207", dot: "#ca8a04" };
    if (s === "completed") return { label: "Completed", bg: "#dbeafe", color: "#1d4ed8", dot: "#2563eb" };
    if (s === "withdrawn") return { label: "Withdrawn", bg: "#f3f4f6", color: "#6b7280", dot: "#9ca3af" };
    return { label: commitment?.status, bg: "#f3f4f6", color: "#6b7280", dot: "#9ca3af" };
  }

  function getAccentColor() {
    const s = commitment?.status;
    if (s === "active")    return "linear-gradient(90deg,#4338ca,#818cf8)";
    if (s === "completed") return "linear-gradient(90deg,#10b981,#34d399)";
    if (s === "withdrawn") return "linear-gradient(90deg,#9ca3af,#d1d5db)";
    if (s === "paused")    return "linear-gradient(90deg,#f59e0b,#fcd34d)";
    return "linear-gradient(90deg,#4338ca,#818cf8)";
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" }}>
      <div style={{ fontSize: 14, color: "#9ca3af" }}>Loading commitment...</div>
    </div>
  );

  if (!commitment) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" }}>
      <div style={{ fontSize: 14, color: "#9ca3af" }}>Commitment not found</div>
    </div>
  );

  const identity = commitment.company_id ? company : profile;
  const identityType = commitment.company_id ? "company" : "user";
  const isOwner = identityType === "user" && currentUser?.id === identity?.id;
  const profileLink = identityType === "company" ? `/c/${identity?.username}` : `/u/${identity?.username}`;
  const status = getStatusStyle();

  return (
    <div style={{ minHeight: "100vh", background: "#f2f3f7", paddingBottom: 40 }}>
      <ViewTracker type="commitment" entityId={commitmentId} />

      {/* NAV */}
      <nav style={{ background: "#fff", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ebebf2" }}>
        <button
          onClick={() => window.history.length > 1 ? router.back() : router.push("/")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, color: "#4338ca", fontFamily: "inherit" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="#4338ca" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <Link href="/" style={{ textDecoration: "none", fontWeight: 800, fontSize: 16, color: "#4338ca" }}>
          St<span style={{ color: "#1e1b4b" }}>a</span>ted
        </Link>
        <div style={{ width: 48 }} />
      </nav>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "16px 16px 0" }}>

        {/* CREATOR ROW */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <Link href={profileLink} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#4338ca,#7c3aed,#ec4899)", padding: 2.5, flexShrink: 0 }}>
              <img src={avatar()} alt={identity?.display_name || identity?.name}
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0f0c29" }}>
                {identity?.display_name || identity?.name}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>
                @{identity?.username} · {followerCount} followers
              </div>
            </div>
          </Link>

          {!isOwner && (
            <FollowButton
              currentUserId={currentUser?.id}
              targetUserId={identityType === "user" ? identity?.id : undefined}
              targetCompanyId={identityType === "company" ? identity?.id : undefined}
              className="px-4 py-2 rounded-full text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#4338ca,#6366f1)", boxShadow: "0 3px 10px rgba(67,56,202,0.3)", border: "none" }}
            />
          )}
        </div>

        {/* COMMITMENT CARD */}
        <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: 14 }}>
          <div style={{ height: 4, background: getAccentColor() }} />
          <div style={{ padding: "18px 20px 16px" }}>

            {/* Status badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: status.dot, flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: status.color, background: status.bg, padding: "2px 10px", borderRadius: 20, letterSpacing: "0.5px" }}>
                {status.label.toUpperCase()}
              </span>
            </div>

            {/* Commitment text */}
            <div style={{ fontSize: 17, fontWeight: 700, color: "#0f0c29", lineHeight: 1.5, marginBottom: 14 }}>
              {commitment.text}
            </div>

            {/* Date */}
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 14 }}>
              Created {new Date(commitment.created_at).toLocaleDateString()}
            </div>

            {/* Views + shares + cheers count row */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 12, borderTop: "1px solid #f3f4f8", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6b7280" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <ellipse cx="7" cy="7" rx="6" ry="4" stroke="#9ca3af" strokeWidth="1.2"/>
                  <circle cx="7" cy="7" r="2" stroke="#9ca3af" strokeWidth="1.2"/>
                </svg>
                {viewCount} views
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6b7280" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10 2l3 3-3 3" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 5H6a4 4 0 00-4 4v1" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {shareCount} shares
              </div>
            </div>

            {/* Action buttons row — Share + CheerButton */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              {/* Share button */}
              <button
                onClick={share}
                style={{
                  background: "linear-gradient(135deg,#4338ca,#6366f1)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "11px 24px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  boxShadow: "0 3px 12px rgba(67,56,202,0.3)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="11" cy="3" r="1.8" stroke="#fff" strokeWidth="1.2"/>
                  <circle cx="3" cy="7" r="1.8" stroke="#fff" strokeWidth="1.2"/>
                  <circle cx="11" cy="11" r="1.8" stroke="#fff" strokeWidth="1.2"/>
                  <path d="M4.7 6.1l4.6-2.3M4.7 7.9l4.6 2.3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Share commitment
              </button>

              {/* ✅ CheerButton — full size, live count from DB */}
              <CheerButton
                commitmentId={commitmentId}
                initialCount={cheerCount}
              />
            </div>

          </div>
        </div>

        {/* PROGRESS UPDATES */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4h10M2 7.5h7M2 11h5" stroke="#4338ca" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#0f0c29" }}>
              Progress updates
            </h2>
            {updates.length > 0 && (
              <span style={{ fontSize: 10, fontWeight: 700, color: "#4338ca", background: "#eef2ff", padding: "2px 8px", borderRadius: 20 }}>
                {updates.length}
              </span>
            )}
          </div>

          {updates.length === 0 ? (
            <div style={{ background: "#fff", borderRadius: 14, padding: "24px", textAlign: "center", border: "1px solid #f0f1f6" }}>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>No updates yet</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {updates.map((update) => (
                <div
                  key={update.id}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: "14px 16px",
                    border: "1px solid #f0f1f6",
                    borderLeft: "3px solid #4338ca",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ fontSize: 13, color: "#0f0c29", lineHeight: 1.55, marginBottom: 6 }}>
                    {update.content}
                  </div>
                  <div style={{ fontSize: 10, color: "#9ca3af" }}>
                    {new Date(update.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA — shown to non-owners only */}
        {!isOwner && (
          <div
            style={{
              background: "linear-gradient(135deg,#1e1b4b 0%,#4338ca 50%,#7c3aed 100%)",
              borderRadius: 18,
              padding: "24px 20px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(1px 1px at 15% 25%,rgba(255,255,255,0.8) 0%,transparent 100%),radial-gradient(1px 1px at 75% 15%,rgba(255,255,255,0.6) 0%,transparent 100%),radial-gradient(1px 1px at 45% 70%,rgba(255,255,255,0.5) 0%,transparent 100%),radial-gradient(1px 1px at 85% 60%,rgba(255,255,255,0.4) 0%,transparent 100%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
                Make your own public commitment
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 18, lineHeight: 1.5 }}>
                Start with <span style={{ color: "#fff", fontWeight: 700 }}>5 free commitments</span>. Build credibility publicly.
              </div>
              <Link
                href="/dashboard/create"
                style={{
                  display: "inline-block",
                  background: "#fff",
                  color: "#4338ca",
                  padding: "11px 28px",
                  borderRadius: 22,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                }}
              >
                Create your commitment →
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
                         }
