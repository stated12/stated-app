"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function CompleteCommitmentPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const commitmentId = params.id as string;

  const [commitment, setCommitment] = useState<any>(null);
  const [note, setNote] = useState("");
  const [proofText, setProofText] = useState("");
  const [proofLink, setProofLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
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

    if (data.status !== "active" && data.status !== "paused") {
      setError("This commitment cannot be completed"); return;
    }
    setCommitment(data);
  }

  async function uploadProofImage(userId: string) {
    if (!imageFile) return null;
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `${userId}/${commitmentId}_${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from("commitment_proofs").upload(filePath, imageFile);
    if (error) throw error;
    const { data } = supabase.storage.from("commitment_proofs").getPublicUrl(filePath);
    return data.publicUrl;
  }

  async function handleComplete() {
    setError(""); setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let imageUrl = null;
      if (imageFile) imageUrl = await uploadProofImage(user.id);

      const proofParts = [];
      if (note.trim())      proofParts.push(note);
      if (proofText.trim()) proofParts.push(`Proof: ${proofText}`);
      if (proofLink.trim()) proofParts.push(`Link: ${proofLink}`);
      if (imageUrl)         proofParts.push(`Image: ${imageUrl}`);

      const completionText = proofParts.length > 0
        ? `Commitment completed — ${proofParts.join(" | ")}`
        : "Commitment completed";

      // No .eq("user_id") — works for both individual & company
      const { error: updateError } = await supabase
        .from("commitments")
        .update({ status: "completed", completed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq("id", commitmentId);
      if (updateError) throw updateError;

      const { error: logError } = await supabase
        .from("commitment_updates")
        .insert({ commitment_id: commitmentId, user_id: user.id, content: completionText });
      if (logError) throw logError;

      await supabase.from("notifications").insert({
        user_id: user.id, type: "completion",
        title: "🎉 Commitment Completed",
        message: "You successfully completed your commitment.",
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

        <div style={{ height: 4, background: "linear-gradient(90deg,#10b981,#34d399)" }} />

        <div style={{ padding: "24px 20px" }}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#4338ca", marginBottom: 20, letterSpacing: -0.5 }}>Stated</div>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>✓</div>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: "#0f0c29", margin: 0 }}>Complete Commitment</h1>
          </div>

          {/* Commitment text */}
          <div style={{ background: "#f8f9fc", borderRadius: 12, padding: "10px 14px", marginBottom: 18, borderLeft: "3px solid #10b981" }}>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{commitment.text}</div>
          </div>

          {/* Note */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Completion Note</div>
            <textarea
              placeholder="Share how you achieved this commitment..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 12, padding: "10px 12px", fontSize: 13, color: "#374151", outline: "none", resize: "vertical" as const, fontFamily: "inherit", boxSizing: "border-box" as const, background: "#fafbff" }}
            />
          </div>

          {/* Proof section */}
          <div style={{ background: "#f8f9fc", borderRadius: 14, padding: 14, marginBottom: 16, border: "1px solid #f0f1f6" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0f0c29", marginBottom: 4 }}>
              Add Proof <span style={{ fontWeight: 400, color: "#9ca3af" }}>(Optional)</span>
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 12 }}>Adding proof increases your credibility.</div>

            <div style={{ border: "1.5px dashed #c7d2fe", borderRadius: 10, padding: "10px 12px", background: "#fff", textAlign: "center" as const, marginBottom: 10 }}>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} style={{ display: "none" }} id="proof-img" />
              <label htmlFor="proof-img" style={{ fontSize: 12, color: "#4338ca", cursor: "pointer", fontWeight: 600 }}>
                {imageFile ? `📎 ${imageFile.name}` : "📁 Choose image file"}
              </label>
            </div>

            <input
              type="text"
              placeholder="Proof link (optional)"
              value={proofLink}
              onChange={(e) => setProofLink(e.target.value)}
              style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 10, padding: "9px 12px", fontSize: 13, marginBottom: 10, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const, background: "#fff" }}
            />

            <textarea
              placeholder="Describe your proof (optional)"
              value={proofText}
              onChange={(e) => setProofText(e.target.value)}
              rows={2}
              style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 10, padding: "9px 12px", fontSize: 13, outline: "none", resize: "vertical" as const, fontFamily: "inherit", boxSizing: "border-box" as const, background: "#fff" }}
            />
          </div>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#ef4444", marginBottom: 14 }}>
              {error}
            </div>
          )}

          <button
            onClick={handleComplete}
            disabled={loading}
            style={{ width: "100%", background: loading ? "#86efac" : "linear-gradient(135deg,#10b981,#059669)", color: "#fff", padding: 13, borderRadius: 14, fontSize: 14, fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: "0 3px 12px rgba(16,185,129,0.3)" }}
          >
            {loading ? "Completing..." : "✓ Mark as Completed"}
          </button>

          <Link href="/dashboard" style={{ display: "block", textAlign: "center" as const, marginTop: 12, fontSize: 12, color: "#9ca3af", textDecoration: "none" }}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
