"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  draft:   { bg: "#f3f4f6", color: "#6b7280", label: "Draft"   },
  active:  { bg: "#dcfce7", color: "#16a34a", label: "Active"  },
  paused:  { bg: "#fef3c7", color: "#d97706", label: "Paused"  },
  closed:  { bg: "#fee2e2", color: "#dc2626", label: "Closed"  },
  expired: { bg: "#f3f4f6", color: "#9ca3af", label: "Expired" },
};

const TYPE_LABELS: Record<string, string> = {
  hiring: "💼 Hiring", cofounder: "🤝 Cofounder", partner: "🔗 Partner",
  consultant: "🧠 Consultant", investor_signal: "📡 Investor Signal",
  collaborator: "⚡ Collaborator", impact: "🌱 Impact", grant: "🎓 Grant",
};

function daysLeft(expiresAt: string) {
  const d = Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000);
  if (d <= 0) return "Expired";
  if (d === 1) return "1 day left";
  return `${d} days left`;
}

export default function MyChallengesPage() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading]       = useState(true);
  const [debugInfo, setDebugInfo]   = useState<string>("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user }, error: userErr } = await supabase.auth.getUser();

      if (userErr || !user) {
        setDebugInfo(`No session. Error: ${userErr?.message || "none"}`);
        setLoading(false);
        return;
      }

      const { data, error, count } = await supabase
        .from("challenges")
        .select("id, title, type, status, submission_count, view_count, expires_at, plan, featured, created_at, invites_sent, invites_included", { count: "exact" })
        .eq("posted_by_user_id", user.id)
        .order("created_at", { ascending: false });

      // Also test: can this session see ANY challenges at all (RLS sanity check)
      const { data: anyData, count: anyCount } = await supabase
        .from("challenges")
        .select("id", { count: "exact" })
        .limit(1);

      if (error) {
        setDebugInfo(`Query error: ${error.message} | code: ${error.code}`);
      } else {
        setDebugInfo(`uid: ${user.id.slice(0,8)}... | filtered rows: ${count ?? data?.length ?? 0} | any-visible rows: ${anyCount ?? 0}`);
      }
      setChallenges(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const active  = challenges.filter(c => c.status === "active");
  const draft   = challenges.filter(c => c.status === "draft");
  const closed  = challenges.filter(c => ["closed","expired"].includes(c.status));

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
      <div style={{ width: 32, height: 32, border: "3px solid #e5e7eb", borderTopColor: "#4338ca", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 800 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.03em" }}>My Challenges</h1>
          {debugInfo && (
            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2, fontFamily: "monospace", wordBreak: "break-all" }}>
              {debugInfo}
            </div>
          )}
          <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4, fontWeight: 400 }}>
            Manage your posted challenges, view submissions and send invites.
          </p>
        </div>
        <Link
          href="/challenges/new"
          style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, textDecoration: "none" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          Post a Challenge
        </Link>
      </div>

      {/* Stats strip */}
      {challenges.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Active",      val: active.length,                                     color: "#16a34a", bg: "#f0fdf4" },
            { label: "Total submissions", val: challenges.reduce((s,c) => s+c.submission_count,0), color: "#2563eb", bg: "#eff6ff" },
            { label: "Total views", val: challenges.reduce((s,c) => s+c.view_count,0),       color: "#7c3aed", bg: "#f5f3ff" },
          ].map(({ label, val, color, bg }) => (
            <div key={label} style={{ background: bg, borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 800, color, letterSpacing: "-0.03em" }}>{val}</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {challenges.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 16, border: "1px dashed #e5e7eb" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>No challenges yet</h3>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, maxWidth: 320, margin: "0 auto 20px" }}>
            Post your first challenge and find exactly who you need — based on real work, not CVs.
          </p>
          <Link href="/challenges/new" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 20px", borderRadius: 10, textDecoration: "none" }}>
            Post your first Challenge
          </Link>
        </div>
      )}

      {/* Active challenges */}
      {active.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
            Active ({active.length})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {active.map(c => <ChallengeCard key={c.id} c={c} />)}
          </div>
        </div>
      )}

      {/* Draft challenges */}
      {draft.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
            Drafts — payment pending ({draft.length})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {draft.map(c => <ChallengeCard key={c.id} c={c} />)}
          </div>
        </div>
      )}

      {/* Closed */}
      {closed.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
            Closed / Expired ({closed.length})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {closed.map(c => <ChallengeCard key={c.id} c={c} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function ChallengeCard({ c }: { c: any }) {
  const st = STATUS_STYLES[c.status] || STATUS_STYLES.draft;
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 600, background: st.bg, color: st.color, padding: "2px 8px", borderRadius: 20 }}>
              {st.label}
            </span>
            <span style={{ fontSize: 10, color: "#9ca3af" }}>{TYPE_LABELS[c.type] || c.type}</span>
            {c.featured && <span style={{ fontSize: 10, fontWeight: 600, background: "#fffbeb", color: "#d97706", padding: "2px 8px", borderRadius: 20 }}>Featured</span>}
            {c.status === "active" && c.expires_at && (
              <span style={{ fontSize: 10, color: "#6b7280", marginLeft: "auto" }}>{daysLeft(c.expires_at)}</span>
            )}
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>{c.title}</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {[
          { label: "Submissions", val: c.submission_count },
          { label: "Views",       val: c.view_count       },
          { label: "Invites sent",val: c.invites_sent     },
          { label: "Plan",        val: c.plan?.toUpperCase() || "—" },
        ].map(({ label, val }) => (
          <div key={label}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{val}</div>
            <div style={{ fontSize: 10, color: "#9ca3af" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 8, borderTop: "1px solid #f3f4f6" }}>
        {c.status === "active" && (
          <>
            <Link href={`/challenges/${c.id}/submissions`}
              style={{ fontSize: 12, fontWeight: 600, color: "#2563eb", background: "#eff6ff", padding: "6px 12px", borderRadius: 8, textDecoration: "none" }}>
              View Submissions ({c.submission_count})
            </Link>
            <Link href={`/challenges/${c.id}`}
              style={{ fontSize: 12, fontWeight: 500, color: "#374151", background: "#f9fafb", border: "1px solid #e5e7eb", padding: "6px 12px", borderRadius: 8, textDecoration: "none" }}>
              Public page
            </Link>
            <Link href={`/challenges/${c.id}/invite`}
              style={{ fontSize: 12, fontWeight: 500, color: "#374151", background: "#f9fafb", border: "1px solid #e5e7eb", padding: "6px 12px", borderRadius: 8, textDecoration: "none" }}>
              Send invites ({c.invites_included - c.invites_sent} left)
            </Link>
          </>
        )}
        {c.status === "draft" && (
          <Link href={`/challenges/${c.id}/pay`}
            style={{ fontSize: 12, fontWeight: 600, color: "#d97706", background: "#fffbeb", border: "1px solid #fde68a", padding: "6px 12px", borderRadius: 8, textDecoration: "none" }}>
            Complete payment to activate
          </Link>
        )}
        {["closed","expired"].includes(c.status) && (
          <Link href={`/challenges/${c.id}/submissions`}
            style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", background: "#f9fafb", border: "1px solid #e5e7eb", padding: "6px 12px", borderRadius: 8, textDecoration: "none" }}>
            View submissions
          </Link>
        )}
      </div>
    </div>
  );
}
