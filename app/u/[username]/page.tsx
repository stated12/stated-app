export const dynamic = "force-dynamic";

import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";

import ShareProfileButton from "@/components/ShareProfileButton";
import ReputationCard from "@/components/ReputationCard";
import ViewTracker from "@/components/ViewTracker";
import CommitmentList from "@/components/CommitmentList";
import FollowButton from "@/components/social/FollowButton";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const supabase = createPublicClient();
  const supabaseAuth = await createClient();

  const {
    data: { user: currentUser },
  } = await supabaseAuth.auth.getUser();

  const cleanUsername = decodeURIComponent(username).trim().toLowerCase();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "id, username, display_name, avatar_url, bio, plan_key, website, linkedin, github, twitter, youtube"
    )
    .ilike("username", cleanUsername)
    .single();

  if (!profile || error) return notFound();

  const { count: followersCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_user_id", profile.id);

  const { count: followingCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_user_id", profile.id);

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at, end_date, completed_at")
    .eq("user_id", profile.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  const enrichedCommitments =
    commitments && commitments.length > 0
      ? await Promise.all(
          commitments.map(async (c) => {
            const { count } = await supabase
              .from("commitment_views")
              .select("*", { count: "exact", head: true })
              .eq("commitment_id", c.id);

            const { data: update } = await supabase
              .from("commitment_updates")
              .select("content, created_at")
              .eq("commitment_id", c.id)
              .order("created_at", { ascending: false })
              .limit(1)
              .maybeSingle();

            return {
              ...c,
              views: count || 0,
              latest_update: update?.content || null,
              latest_update_created_at: update?.created_at || null,
            };
          })
        )
      : [];

  const avatarUrl =
    profile.avatar_url && profile.avatar_url.startsWith("http")
      ? profile.avatar_url
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.display_name || profile.username || "User"
        )}&background=2563eb&color=fff`;

  const cleanUrl = (url: string) => url.replace(/^https?:\/\//, "");

  const totalViews = enrichedCommitments.reduce((sum, c) => sum + c.views, 0);

  const formatViews = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();

  return (
    <div className="min-h-screen pb-16" style={{ background: "#f2f3f7" }}>
      <ViewTracker type="profile" entityId={profile.id} />

      {/* ── NAV ── */}
      <nav
        className="flex items-center justify-between px-5 py-3 bg-white border-b"
        style={{ borderColor: "#ebebf2" }}
      >
        <Link
          href="/"
          className="flex items-center gap-1 text-xs font-medium text-gray-500"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7l5 5"
              stroke="#6b7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </Link>
        <span
          className="font-extrabold text-base tracking-tight"
          style={{ fontFamily: "inherit", color: "#1e1b4b" }}
        >
          St<span style={{ color: "#4f46e5" }}>a</span>ted
        </span>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ background: "#9ca3af" }}
            />
          ))}
        </div>
      </nav>

      {/* ── BANNER ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: 152, background: "#0d0b1e" }}
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg,#1e1b4b 0%,#312e81 30%,#4c1d95 60%,#6b21a8 80%,#86198f 100%)",
          }}
        />
        {/* Glow blobs */}
        <div
          className="absolute rounded-full"
          style={{
            width: 180,
            height: 180,
            top: -60,
            right: -30,
            background:
              "radial-gradient(circle,rgba(139,92,246,0.5) 0%,transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 140,
            height: 140,
            bottom: -50,
            left: 20,
            background:
              "radial-gradient(circle,rgba(236,72,153,0.4) 0%,transparent 70%)",
          }}
        />
        {/* Stars */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(1.5px 1.5px at 8% 20%,#fff 0%,transparent 100%),
              radial-gradient(1px 1px at 20% 70%,rgba(255,255,255,0.8) 0%,transparent 100%),
              radial-gradient(1px 1px at 35% 15%,rgba(255,255,255,0.9) 0%,transparent 100%),
              radial-gradient(1px 1px at 55% 55%,rgba(255,255,255,0.6) 0%,transparent 100%),
              radial-gradient(1.2px 1.2px at 72% 25%,rgba(255,255,255,0.85) 0%,transparent 100%),
              radial-gradient(1px 1px at 85% 65%,rgba(255,255,255,0.7) 0%,transparent 100%),
              radial-gradient(1px 1px at 92% 35%,rgba(255,255,255,0.5) 0%,transparent 100%),
              radial-gradient(1px 1px at 48% 85%,rgba(255,255,255,0.4) 0%,transparent 100%),
              radial-gradient(1px 1px at 15% 50%,rgba(255,255,255,0.55) 0%,transparent 100%),
              radial-gradient(1px 1px at 63% 78%,rgba(255,255,255,0.45) 0%,transparent 100%)
            `,
          }}
        />

        {/* Banner content */}
        <div
          className="absolute inset-0 flex items-center justify-between px-5 z-10"
          style={{ paddingBottom: 32 }}
        >
          {/* Left — logo + wordmark + tagline */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Stated"
                width={32}
                height={32}
                style={{
                  objectFit: "contain",
                  filter:
                    "drop-shadow(0 0 8px rgba(139,92,246,0.9))",
                }}
              />
              <span
                className="font-extrabold text-white text-xl tracking-wide"
                style={{ textShadow: "0 2px 12px rgba(139,92,246,0.5)" }}
              >
                Stated
              </span>
            </div>
            <span
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.5)", paddingLeft: 2 }}
            >
              Put your word on the line
            </span>
          </div>

          {/* Right — motivational lines */}
          <div className="flex flex-col items-end gap-1.5">
            {[
              <>Your word is your <em className="not-italic" style={{color:"#fb923c"}}>brand.</em></>,
              <>Follow-through is <em className="not-italic" style={{color:"#fb923c"}}>everything.</em></>,
              <>Say it. <em className="not-italic" style={{color:"#fb923c"}}>Own it.</em></>,
            ].map((line, i) => (
              <span
                key={i}
                className="font-bold text-right text-xs"
                style={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.3px" }}
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom strip — Commit · Track · Achieve */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-0 z-10"
          style={{
            background: "rgba(0,0,0,0.28)",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "6px 20px",
          }}
        >
          {[
            { dot: "#60a5fa", glow: "rgba(96,165,250,0.8)", label: "Commit", color: "rgba(96,165,250,0.9)" },
            { dot: "#a78bfa", glow: "rgba(167,139,250,0.8)", label: "Track", color: "rgba(167,139,250,0.9)" },
            { dot: "#34d399", glow: "rgba(52,211,153,0.8)", label: "Achieve", color: "rgba(52,211,153,0.9)" },
          ].map((step, i) => (
            <div key={i} className="flex items-center flex-1 justify-center gap-1.5">
              {i > 0 && (
                <div
                  className="self-stretch w-px mx-2"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
              )}
              <div
                className="rounded-full flex-shrink-0"
                style={{
                  width: 6,
                  height: 6,
                  background: step.dot,
                  boxShadow: `0 0 6px ${step.glow}`,
                }}
              />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: step.color, fontSize: 9 }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Avatar — left-aligned, overlapping banner bottom */}
        <div className="absolute z-20" style={{ bottom: -42, left: 20 }}>
          <div
            className="rounded-full p-0.5"
            style={{
              background: "linear-gradient(135deg,#4338ca,#7c3aed,#ec4899)",
              width: 84,
              height: 84,
              boxShadow: "0 4px 20px rgba(67,56,202,0.45)",
            }}
          >
            <img
              src={avatarUrl}
              alt={profile.display_name || profile.username}
              className="rounded-full object-cover"
              style={{
                width: "100%",
                height: "100%",
                border: "3px solid #fff",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── PROFILE CARD ── */}
      <div
        className="bg-white"
        style={{ paddingTop: 52, borderBottom: "1px solid #f0f1f6" }}
      >
        <div className="px-5 pb-5">
          {/* Name row + action buttons */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1
                className="font-extrabold text-xl tracking-tight"
                style={{ color: "#0f0c29", letterSpacing: "-0.3px" }}
              >
                {profile.display_name || profile.username}
              </h1>
              <div className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                @{profile.username}
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              {currentUser?.id !== profile.id && (
                <FollowButton
                  currentUserId={currentUser?.id}
                  targetUserId={profile.id}
                  className="px-5 py-2 rounded-full text-xs font-bold text-white border-none"
                  style={{
                    background: "linear-gradient(135deg,#4338ca,#6366f1)",
                    boxShadow: "0 4px 12px rgba(67,56,202,0.35)",
                  }}
                />
              )}
              <ShareProfileButton
                username={profile.username}
                className="w-9 h-9 rounded-full flex items-center justify-center border"
                style={{ background: "#f5f6fa", borderColor: "#e8eaf2" }}
              />
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: "#4b5563" }}
            >
              {profile.bio}
            </p>
          )}

          {/* Social links */}
          {(profile.website || profile.twitter || profile.linkedin || profile.github || profile.youtube) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1.5"
                  style={{
                    background: "#f5f6fa",
                    border: "1px solid #e8eaf2",
                    color: "#4338ca",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1a5 5 0 100 10A5 5 0 006 1zm0 0c1.5 2 1.5 8 0 10M1 6h10" stroke="#4338ca" strokeWidth="1.1" strokeLinecap="round"/>
                  </svg>
                  {cleanUrl(profile.website)}
                </a>
              )}
              {profile.twitter && (
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1.5"
                  style={{
                    background: "#f5f6fa",
                    border: "1px solid #e8eaf2",
                    color: "#4338ca",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M11 1.5L6.8 6.3M11 1.5H8M11 1.5V5M1 10.5l4.2-4.8m0 0L1 1.5h3.5l6.5 9H7.5L5.2 5.7z" stroke="#4338ca" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Twitter
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1.5"
                  style={{
                    background: "#f5f6fa",
                    border: "1px solid #e8eaf2",
                    color: "#4338ca",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 1h8a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zm4 8V5m0 0V3m0 2H4m2 0h2" stroke="#4338ca" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  LinkedIn
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1.5"
                  style={{
                    background: "#f5f6fa",
                    border: "1px solid #e8eaf2",
                    color: "#4338ca",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1a5 5 0 00-1.58 9.74c.25.05.34-.11.34-.24v-.85C3.16 9.9 2.87 9 2.87 9c-.23-.58-.56-.74-.56-.74-.46-.31.03-.3.03-.3.5.03.77.52.77.52.45.77 1.18.55 1.47.42.05-.33.18-.55.32-.68C3.43 8.1 2.37 7.7 2.37 5.9c0-.52.19-.95.5-1.28-.05-.12-.22-.61.05-1.27 0 0 .4-.13 1.32.49a4.6 4.6 0 012.4 0c.91-.62 1.31-.49 1.31-.49.27.66.1 1.15.05 1.27.31.33.5.76.5 1.28 0 1.81-1.1 2.2-2.15 2.32.17.15.32.44.32.89v1.31c0 .13.09.29.34.24A5 5 0 006 1z" stroke="#4338ca" strokeWidth="0.8"/>
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          )}

          {/* Stats row */}
          <div
            className="flex pt-4"
            style={{ borderTop: "1px solid #f3f4f8" }}
          >
            {[
              { num: followersCount ?? 0, label: "Followers" },
              { num: followingCount ?? 0, label: "Following" },
              { num: enrichedCommitments.length, label: "Commitments" },
              { num: formatViews(totalViews), label: "Total Views" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex-1 text-center"
                style={{
                  borderLeft: i > 0 ? "1px solid #f3f4f8" : "none",
                }}
              >
                <div
                  className="font-extrabold text-lg"
                  style={{ color: "#0f0c29", fontFamily: "inherit" }}
                >
                  {s.num}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REPUTATION ── */}
      <div className="px-3.5 mt-3">
        <div
          className="flex items-center gap-1.5 text-sm font-bold mb-2"
          style={{ color: "#0f0c29" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1l1.6 3.3 3.6.52-2.6 2.54.62 3.6L7 9.2l-3.22 1.76.62-3.6L1.8 4.82l3.6-.52z" stroke="#f59e0b" strokeWidth="1.2" strokeLinejoin="round" fill="#fef3c7"/>
          </svg>
          Reputation
        </div>
        <ReputationCard userId={profile.id} />
      </div>

      {/* ── COMMITMENTS ── */}
      <div className="px-3.5 mt-3">
        <div
          className="flex items-center gap-1.5 text-sm font-bold mb-2"
          style={{ color: "#0f0c29" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 4h10M2 7.5h7M2 11h5" stroke="#4338ca" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Public Commitments
        </div>

        {enrichedCommitments.length > 0 ? (
          <CommitmentList commitments={enrichedCommitments} />
        ) : (
          <div
            className="rounded-2xl p-8 text-center text-sm"
            style={{
              background: "#fff",
              border: "1px solid #f0f1f6",
              color: "#9ca3af",
            }}
          >
            No public commitments yet
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer
        className="mt-8 pt-5 pb-8 text-center"
        style={{ borderTop: "1px solid #f0f1f5", background: "#fff" }}
      >
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          {["Home", "Privacy Policy", "Terms of Service", "Refund Policy"].map(
            (l) => (
              <Link
                key={l}
                href={l === "Home" ? "/" : `/${l.toLowerCase().replace(/ /g, "-")}`}
                className="text-xs"
                style={{ color: "#9ca3af" }}
              >
                {l}
              </Link>
            )
          )}
        </div>
        <p className="text-xs" style={{ color: "#c4c4cc" }}>
          © 2026 Stated &nbsp;·&nbsp; Built in{" "}
          <Link href="/" style={{ color: "#6366f1" }}>
            India
          </Link>{" "}
          for the World
        </p>
      </footer>
    </div>
  );
}
