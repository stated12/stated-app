"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function PauseCommitmentPage() {
  const supabase     = createClient();
  const router       = useRouter();
  const params       = useParams();
  const commitmentId = params.id as string;

  const [commitment, setCommitment] = useState<any>(null);
  const [isCompany,  setIsCompany]  = useState(false);
  const [reason,     setReason]     = useState("");
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");

  useEffect(() => { loadCommitment(); }, []);

  async function loadCommitment() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const { data, error } = await supabase
      .from("commitments").select("*").eq("id", commitmentId).single();
    if (error || !data) { setError("Commitment not found"); return; }
    if (data.user_id !== user.id) {
      if (data.company_id) {
        const { data: owned } = await supabase.from("companies").select("id").eq("id", data.company_id).eq("owner_user_id", user.id).maybeSingle();
        const { data: membership } = await supabase.from("company_members").select("role").eq("company_id", data.company_id).eq("user_id", user.id).maybeSingle();
        if (!owned && !(membership && ["admin","member"].includes(membership.role))) { setError("You do not have permission"); return; }
      } else { setError("Commitment not found"); return; }
    }
    if (data.status !== "active") { setError("Only active commitments can be paused"); return; }
    setCommitment(data);
    setIsCompany(!!data.company_id);
  }

  const backUrl = isCompany ? "/dashboard/company" : "/dashboard";
  const accentColor = isCompany ? "#0891b2" : "#4338ca";

  async function handlePause() {
    setError("");
    if (!reason.trim()) { setError("Please provide a reason"); return; }
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { error: updateError } = await supabase.from("commitments")
        .update({ status: "paused", updated_at: new Date().toISOString() }).eq("id", commitmentId);
      if (updateError) throw updateError;
      await supabase.from("commitment_updates").insert({ commitment_id: commitmentId, user_id: user.id, content: "Commitment paused: " + reason });
      await supabase.from("notifications").insert({ user_id: user.id, type: "pause", title: "Commitment Paused", message: "You paused one of your commitments.", link: isCompany ? "/dashboard/company/commitments" : "/dashboard/my", read: false });
      router.push(backUrl);
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  }

  if (error && !commitment) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "32px 24px", textAlign: "center" as const, border: "1px solid #f0f1f6" }}>
        <div style={{ color: "#ef4444", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>{error}</div>
        <Link href={backUrl} style={{ fontSize: 12, color: accentColor, textDecoration: "none", fontWeight: 600 }}>Back to dashboard</Link>
      </div>
    </div>
  );

  if (!commitment) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" }}>
      <div style={{ fontSize: 13, color: "#9ca3af" }}>Loading...</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 440, background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #f0f1f6" }}>
        <div style={{ height: 4, background: "linear-gradient(90deg,#f59e0b,#fcd34d)" }} />
        <div style={{ padding: "24px 20px" }}>
          <Link href={backUrl} style={{ textDecoration: "none" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: accentColor, marginBottom: 20 }}>Stated</div>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: "#0f0c29", margin: 0 }}>Pause Commitment</h1>
            {isCompany && <span style={{ fontSize: 10, fontWeight: 700, background: "#e0f2fe", color: "#0891b2", padding: "2px 8px", borderRadius: 20 }}>Company</span>}
          </div>
          <div style={{ background: "#f8f9fc", borderRadius: 12, padding: "10px 14px", marginBottom: 18, borderLeft: "3px solid #f59e0b" }}>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{commitment.text}</div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Reason for Pausing</div>
            <textarea placeholder="Why are you pausing this commitment?" value={reason} onChange={(e) => setReason(e.target.value)} rows={4}
              style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 12, padding: "10px 12px", fontSize: 13, color: "#374151", outline: "none", resize: "vertical" as const, fontFamily: "inherit", boxSizing: "border-box" as const, background: "#fafbff" }} />
          </div>
          {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#ef4444", marginBottom: 14 }}>{error}</div>}
          <button onClick={handlePause} disabled={loading}
            style={{ width: "100%", background: loading ? "#fde68a" : "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", padding: 13, borderRadius: 14, fontSize: 14, fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
            {loading ? "Pausing..." : "Pause Commitment"}
          </button>
          <Link href={backUrl} style={{ display: "block", textAlign: "center" as const, marginTop: 12, fontSize: 12, color: "#9ca3af", textDecoration: "none" }}>Cancel</Link>
        </div>
      </div>
    </div>
  );
}
