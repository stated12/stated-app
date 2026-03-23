"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function PauseCommitmentPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const commitmentId = params.id as string;

  const [commitment, setCommitment] = useState<any>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { loadCommitment(); }, []);

  async function loadCommitment() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { data, error } = await supabase
      .from("commitments").select("*").eq("id", commitmentId).single();

    if (error || !data) { setError("Commitment not found"); return; }

    // ── Permission check: own commitment OR company member ──
    if (data.user_id !== user.id) {
      if (data.company_id) {
        const { data: ownedCompany } = await supabase
          .from("companies").select("id")
          .eq("id", data.company_id).eq("owner_user_id", user.id).maybeSingle();
        const { data: membership } = await supabase
          .from("company_members").select("role")
          .eq("company_id", data.company_id).eq("user_id", user.id).maybeSingle();
        const canManage = ownedCompany || (membership && ["admin", "member"].includes(membership.role));
        if (!canManage) { setError("You do not have permission"); return; }
      } else {
        setError("Commitment not found"); return;
      }
    }

    if (data.status !== "active") { setError("Only active commitments can be paused"); return; }
    setCommitment(data);
  }

  async function handlePause() {
    setError("");
    if (!reason.trim()) { setError("Please provide a reason"); return; }
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // No .eq("user_id") — works for both individual & company
      const { error: updateError } = await supabase
        .from("commitments")
        .update({ status: "paused", updated_at: new Date().toISOString() })
        .eq("id", commitmentId);
      if (updateError) throw updateError;

      const { error: logError } = await supabase
        .from("commitment_updates")
        .insert({ commitment_id: commitmentId, user_id: user.id, content: `Commitment paused: ${reason}` });
      if (logError) throw logError;

      await supabase.from("notifications").insert({
        user_id: user.id, type: "pause",
        title: "⏸ Commitment Paused",
        message: "You paused one of your commitments.",
        link: "/dashboard/my", read: false,
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (error && !commitment) {
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

  if (!commitment) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" }}>
        <div style={{ fontSize: 13, color: "#9ca3af" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 440, background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #f0f1f6" }}>

        <div style={{ height: 4, background: "linear-gradient(90deg,#f59e0b,#fcd34d)" }} />

        <div style={{ padding: "24px 20px" }}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#4338ca", marginBottom: 20, letterSpacing: -0.5 }}>Stated</div>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>⏸</div>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: "#0f0c29", margin: 0 }}>Pause Commitment</h1>
          </div>

          {/* Commitment text */}
          <div style={{ background: "#f8f9fc", borderRadius: 12, padding: "10px 14px", marginBottom: 18, borderLeft: "3px solid #f59e0b" }}>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{commitment.text}</div>
          </div>

          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Reason for Pausing</div>
            <textarea
              placeholder="Why are you pausing this commitment?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 12, padding: "10px 12px", fontSize: 13, color: "#374151", outline: "none", resize: "vertical" as const, fontFamily: "inherit", boxSizing: "border-box" as const, background: "#fafbff" }}
            />
          </div>

          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 18, lineHeight: 1.5 }}>
            💡 You can resume this commitment at any time from your dashboard.
          </div>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#ef4444", marginBottom: 14 }}>
              {error}
            </div>
          )}

          <button
            onClick={handlePause}
            disabled={loading}
            style={{ width: "100%", background: loading ? "#fde68a" : "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", padding: 13, borderRadius: 14, fontSize: 14, fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: "0 3px 12px rgba(245,158,11,0.3)" }}
          >
            {loading ? "Pausing..." : "⏸ Pause Commitment"}
          </button>

          <Link href="/dashboard" style={{ display: "block", textAlign: "center" as const, marginTop: 12, fontSize: 12, color: "#9ca3af", textDecoration: "none" }}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
