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

export default function CompanyChallengesPage() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setDebugInfo("No session"); setLoading(false); return; }

      const { data: company, error: companyErr } = await supabase
        .from("companies")
        .select("id, name")
        .eq("owner_user_id", user.id)
        .maybeSingle();

      if (companyErr) { setDebugInfo(`Company lookup error: ${companyErr.message}`); setLoading(false); return; }
      if (!company) { setDebugInfo(`No company owned by uid ${user.id.slice(0,8)}`); setLoading(false); return; }
      setCompanyName(company.name);

      const { data, error, count } = await supabase
        .from("challenges")
        .select("id, title, type, status, submission_count, view_count, expires_at, plan, featured, created_at, invites_sent, invites_included", { count: "exact" })
        .eq("company_id", company.id)
        .order("created_at", { ascending: false });

      if (error) {
        setDebugInfo(`Challenges query error: ${error.message}`);
      } else {
        setDebugInfo(`company_id: ${company.id.slice(0,8)}... | rows: ${count ?? data?.length ?? 0}`);
      }

      setChallenges(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const active = challenges.filter(c => c.status === "active");
  const draft  = challenges.filter(c => c.status === "draft");
  const closed = challenges.filter(c => ["closed","expired"].includes(c.status));

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
      <div style={{ width: 32, height: 32, border: "3px solid #e5e7eb", borderTopColor: "#0891b2", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 800 }}>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.03em" }}>
            {companyName ? `${companyName} Challenges` : "Company Challenges"}
          </h1>
          {debugInfo && (
            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2, fontFamily: "monospace", wordBreak: "break-all" }}>
              {debugInfo}
            </div>
          )}
          <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
            Post challenges, review submissions, send invites and find the best talent.
          </p>
        </div>
        <Link
          href="/challenges/new"
          style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#0891b2", color: "#fff", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, textDecoration: "none" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          Post a Challenge
        </Link>
      </div>

      {/* Stats */}
      {challenges.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 28 }}>
          {[
            { label: "Active",      val: active.length,                                           color: "#16a34a", bg: "#f0fdf4" },
            { label: "Submissions", val: challenges.reduce((s,c) => s+c.submission_count, 0),    color: "#0891b2", bg: "#f0f9ff" },
            { label: "Total views", val: challenges.reduce((s,c) => s+c.view_count, 0),          color: "#7c3aed", bg: "#f5f3ff" },
            { label: "Invites sent",val: challenges.reduce((s,c) => s+(c.invites_sent||0), 0),   color: "#d97706", bg: "#fffbeb" },
          ].map(({ label, val, color, bg }) => (
            <div key={label} style={{ background: bg, borderRadius: 12, padding: "12px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color, letterSpacing: "-0.03em" }}>{val}</div>
              <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {challenges.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 16, border: "1px dashed #e5e7eb" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>No challenges yet</h3>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, maxWidth: 340, margin: "0 auto 20px" }}>
            Post your first challenge. Receive real work as applications. Find who you need based on execution, not credentials.
          </p>
          <Link href="/challenges/new" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#0891b2", color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 20px", borderRadius: 10, textDecoration: "none" }}>
            Post your first Challenge
          </Link>
        </div>
      )}

      {/* Active */}
      {active.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Active ({active.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {active.map(c => <ChallengeCard key={c.id} c={c} accent="#0891b2" />)}
          </div>
        </div>
      )}

      {/* Draft */}
      {draft.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Drafts - payment pending ({draft.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {draft.map(c => <ChallengeCard key={c.id} c={c} accent="#0891b2" />)}
          </div>
        </div>
      )}

      {/* Closed */}
      {closed.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Closed / Expired ({closed.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {closed.map(c => <ChallengeCard key={c.id} c={c} accent="#0891b2" />)}
          </div>
        </div>
      )}
    </div>
  );
}

function ChallengeCard({ c, accent }: { c: any; accent: string }) {
  const st = STATUS_STYLES[c.status] || STATUS_STYLES.draft;
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 600, background: st.bg, color: st.color, padding: "2px 8px", borderRadius: 20 }}>{st.label}</span>
            <span style={{ fontSize: 10, color: "#9ca3af" }}>{TYPE_LABELS[c.type] || c.type}</span>
            {c.featured && <span style={{ fontSize: 10, fontWeight: 600, background: "#fffbeb", color: "#d97706", padding: "2px 8px", borderRadius: 20 }}>Featured</span>}
            {c.status === "active" && c.expires_at && (
              <span style={{ fontSize: 10, color: "#6b7280", marginLeft: "auto" }}>{daysLeft(c.expires_at)}</span>
            )}
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{c.title}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
        {[
          { label: "Submissions", val: c.submission_count },
          { label: "Views",       val: c.view_count       },
          { label: "Invites sent",val: c.invites_sent || 0},
          { label: "Invites left",val: (c.invites_included - c.invites_sent) ?? "--" },
          { label: "Plan",        val: c.plan?.toUpperCase() || "--" },
        ].map(({ label, val }) => (
          <div key={label}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{val}</div>
            <div style={{ fontSize: 10, color: "#9ca3af" }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 10, borderTop: "1px solid #f3f4f6" }}>
        {c.status === "active" && (
          <>
            <Link href={`/challenges/${c.id}/submissions`}
              style={{ fontSize: 12, fontWeight: 600, color: accent, background: "#f0f9ff", padding: "6px 12px", borderRadius: 8, textDecoration: "none" }}>
              Submissions ({c.submission_count})
            </Link>
            <Link href={`/challenges/${c.id}`}
              style={{ fontSize: 12, fontWeight: 500, color: "#374151", background: "#f9fafb", border: "1px solid #e5e7eb", padding: "6px 12px", borderRadius: 8, textDecoration: "none" }}>
              Public page
            </Link>
            <Link href={`/challenges/${c.id}/invite`}
              style={{ fontSize: 12, fontWeight: 500, color: "#374151", background: "#f9fafb", border: "1px solid #e5e7eb", padding: "6px 12px", borderRadius: 8, textDecoration: "none" }}>
              Send invites ({(c.invites_included - c.invites_sent) ?? 0} left)
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
