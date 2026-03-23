"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function CommitmentUpdatePage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const commitmentId = params.id as string;

  const [content, setContent] = useState("");
  const [commitmentText, setCommitmentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [limitInfo, setLimitInfo] = useState<{ used: number; limit: number } | null>(null);

  const UPDATE_LIMITS: Record<string, number> = {
    free: 2, ind_499: 5, ind_899: 10, ind_1299: 15,
    comp_1999: 5, comp_2999: 10, comp_4999: 15,
  };

  useEffect(() => { verifyOwnership(); }, []);

  async function verifyOwnership() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { data, error } = await supabase
      .from("commitments").select("text, user_id, company_id").eq("id", commitmentId).single();

    if (error || !data) { setError("Commitment not found"); setChecking(false); return; }

    if (data.user_id !== user.id && !data.company_id) {
      setError("You do not have permission"); setChecking(false); return;
    }

    setCommitmentText(data.text);
    setChecking(false);
  }

  async function submitUpdate() {
    if (!content.trim()) { setError("Write your progress update"); return; }
    setLoading(true); setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { data: commitment } = await supabase
      .from("commitments").select("company_id").eq("id", commitmentId).single();

    let planKey = "free";
    if (commitment?.company_id) {
      const { data: company } = await supabase
        .from("companies").select("plan_key").eq("id", commitment.company_id).single();
      planKey = company?.plan_key || "free";
    } else {
      const { data: profile } = await supabase
        .from("profiles").select("plan_key").eq("id", user.id).single();
      planKey = profile?.plan_key || "free";
    }

    const limit = UPDATE_LIMITS[planKey] ?? 2;
    const { count } = await supabase
      .from("commitment_updates").select("*", { count: "exact", head: true }).eq("commitment_id", commitmentId);

    if ((count ?? 0) >= limit) {
      setError(`Update limit reached (${limit}). Upgrade your plan to add more updates.`);
      setLoading(false); return;
    }

    setLimitInfo({ used: (count ?? 0) + 1, limit });

    const { error: insertError } = await supabase
      .from("commitment_updates")
      .insert({ commitment_id: commitmentId, user_id: user.id, content: content.trim() });

    if (insertError) { setError(insertError.message); setLoading(false); return; }

    await supabase.from("notifications").insert({
      user_id: user.id, type: "update",
      title: "📈 Progress Updated",
      message: "You added a new progress update.",
      link: "/dashboard/my", read: false,
    });

    router.push("/dashboard");
  }

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" }}>
        <div style={{ fontSize: 13, color: "#9ca3af" }}>Loading...</div>
      </div>
    );
  }

  if (error === "Commitment not found" || error === "You do not have permission") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "32px 24px", textAlign: "center", border: "1px solid #f0f1f6", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
          <div style={{ color: "#ef4444", fontWeight: 600, fontSize: 14 }}>{error}</div>
          <Link href="/dashboard" style={{ display: "inline-block", marginTop: 16, fontSize: 12, color: "#4338ca", textDecoration: "none", fontWeight: 600 }}>← Back to dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 440, background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #f0f1f6" }}>

        <div style={{ height: 4, background: "linear-gradient(90deg,#4338ca,#818cf8)" }} />

        <div style={{ padding: "24px 20px" }}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#4338ca", marginBottom: 20, letterSpacing: -0.5 }}>Stated</div>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>📈</div>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: "#0f0c29", margin: 0 }}>Add Progress Update</h1>
          </div>

          {/* Commitment text */}
          <div style={{ background: "#f8f9fc", borderRadius: 12, padding: "10px 14px", marginBottom: 18, borderLeft: "3px solid #4338ca" }}>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{commitmentText}</div>
          </div>

          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Progress Update</div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="E.g. Completed chapter 2 today, ahead of schedule..."
              rows={5}
              style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 12, padding: "10px 12px", fontSize: 13, color: "#374151", outline: "none", resize: "vertical" as const, fontFamily: "inherit", boxSizing: "border-box" as const, background: "#fafbff" }}
            />
          </div>

          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 18, lineHeight: 1.5 }}>
            💡 Regular updates build credibility and keep your followers engaged.
          </div>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#ef4444", marginBottom: 14 }}>
              {error}
            </div>
          )}

          <button
            onClick={submitUpdate}
            disabled={loading}
            style={{ width: "100%", background: loading ? "#a5b4fc" : "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", padding: 13, borderRadius: 14, fontSize: 14, fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: "0 3px 12px rgba(67,56,202,0.3)" }}
          >
            {loading ? "Saving..." : "📈 Add Update"}
          </button>

          <Link href="/dashboard" style={{ display: "block", textAlign: "center" as const, marginTop: 12, fontSize: 12, color: "#9ca3af", textDecoration: "none" }}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
