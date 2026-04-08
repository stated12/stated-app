"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function CompleteCommitmentPage() {
  const supabase     = createClient();
  const router       = useRouter();
  const params       = useParams();
  const commitmentId = params.id as string;

  const [commitment, setCommitment] = useState<any>(null);
  const [isCompany,  setIsCompany]  = useState(false);
  const [note,       setNote]       = useState("");
  const [proofText,  setProofText]  = useState("");
  const [proofLink,  setProofLink]  = useState("");
  const [imageFile,  setImageFile]  = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
        const { data: owned } = await supabase
          .from("companies").select("id")
          .eq("id", data.company_id).eq("owner_user_id", user.id).maybeSingle();
        const { data: membership } = await supabase
          .from("company_members").select("role")
          .eq("company_id", data.company_id).eq("user_id", user.id).maybeSingle();
        const canManage = owned || (membership && ["admin", "member"].includes(membership.role));
        if (!canManage) { setError("You do not have permission"); return; }
      } else {
        setError("Commitment not found"); return;
      }
    }

    if (data.status !== "active" && data.status !== "paused") {
      setError("This commitment cannot be completed"); return;
    }

    setCommitment(data);
    setIsCompany(!!data.company_id);
  }

  // ── Show local preview when user picks a file ─────────────────────────────
  function handleImageChange(file: File | null) {
    setImageFile(file);
    if (!file) { setImagePreview(null); return; }
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  const backUrl = isCompany ? "/dashboard/company" : "/dashboard";

  // ── FIX: bucket name is "commitment-proofs" (hyphen, not underscore) ──────
  async function uploadProofImage(userId: string): Promise<string> {
    if (!imageFile) return "";
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `${userId}/${commitmentId}_${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("commitment-proofs")          // ✅ hyphen — matches your bucket name
      .upload(filePath, imageFile, { upsert: false });
    if (uploadError) throw new Error("Image upload failed: " + uploadError.message);
    const { data } = supabase.storage
      .from("commitment-proofs")          // ✅ hyphen here too
      .getPublicUrl(filePath);
    return data.publicUrl;
  }

  async function handleComplete() {
    setError(""); setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let imageUrl = "";
      if (imageFile) imageUrl = await uploadProofImage(user.id);

      // Build a clean completion update text
      const proofParts: string[] = [];
      if (note.trim())      proofParts.push(note.trim());
      if (proofText.trim()) proofParts.push("Proof: " + proofText.trim());
      if (proofLink.trim()) proofParts.push("Link: " + proofLink.trim());
      if (imageUrl)         proofParts.push("Image: " + imageUrl);

      const completionText = proofParts.length > 0
        ? "Commitment completed — " + proofParts.join(" | ")
        : "Commitment completed";

      // Mark commitment as completed
      const { error: updateError } = await supabase
        .from("commitments")
        .update({
          status:       "completed",
          completed_at: new Date().toISOString(),
          updated_at:   new Date().toISOString(),
        })
        .eq("id", commitmentId);
      if (updateError) throw updateError;

      // Log a completion update
      await supabase.from("commitment_updates").insert({
        commitment_id: commitmentId,
        user_id:       user.id,
        content:       completionText,
      });

      // Send notification
      await supabase.from("notifications").insert({
        user_id: user.id,
        type:    "completion",
        title:   "Commitment Completed 🎉",
        message: "You successfully completed your commitment.",
        link:    isCompany ? "/dashboard/company/commitments" : "/dashboard/my",
        read:    false,
      });

      router.push(backUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const accentColor = isCompany ? "#0891b2" : "#4338ca";

  if (error && !commitment) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "32px 24px", textAlign: "center", border: "1px solid #f0f1f6" }}>
          <div style={{ color: "#ef4444", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>{error}</div>
          <Link href={backUrl} style={{ fontSize: 12, color: accentColor, textDecoration: "none", fontWeight: 600 }}>Back to dashboard</Link>
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

          <Link href={backUrl} style={{ textDecoration: "none" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: accentColor, marginBottom: 20 }}>Stated</div>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: "#0f0c29", margin: 0 }}>Complete Commitment</h1>
            {isCompany && (
              <span style={{ fontSize: 10, fontWeight: 700, background: "#e0f2fe", color: "#0891b2", padding: "2px 8px", borderRadius: 20 }}>
                Company
              </span>
            )}
          </div>

          {/* Commitment text */}
          <div style={{ background: "#f8f9fc", borderRadius: 12, padding: "10px 14px", marginBottom: 18, borderLeft: "3px solid #10b981" }}>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{commitment.text}</div>
          </div>

          {/* Completion note */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Completion Note
            </div>
            <textarea
              placeholder="Share how you achieved this commitment..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 12, padding: "10px 12px", fontSize: 13, color: "#374151", outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", background: "#fafbff" }}
            />
          </div>

          {/* Proof section */}
          <div style={{ background: "#f8f9fc", borderRadius: 14, padding: 14, marginBottom: 16, border: "1px solid #f0f1f6" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0f0c29", marginBottom: 4 }}>
              Add Proof <span style={{ fontWeight: 400, color: "#9ca3af" }}>(Optional)</span>
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 12 }}>
              Adding proof increases your credibility.
            </div>

            {/* Image picker */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
              style={{ display: "none" }}
              id="proof-img"
            />
            <label
              htmlFor="proof-img"
              style={{
                display: "block",
                border: "1.5px dashed #c7d2fe",
                borderRadius: 10,
                padding: "10px 12px",
                background: "#fff",
                textAlign: "center",
                marginBottom: 10,
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 12, color: "#4338ca", fontWeight: 600 }}>
                {imageFile ? imageFile.name : "Choose image file"}
              </span>
            </label>

            {/* ✅ Live image preview in UI — shows the actual image before submit */}
            {imagePreview && (
              <div style={{ marginBottom: 10, borderRadius: 10, overflow: "hidden", border: "1px solid #e8eaf2" }}>
                <img
                  src={imagePreview}
                  alt="Proof preview"
                  style={{ width: "100%", maxHeight: 200, objectFit: "cover", display: "block" }}
                />
                <div
                  style={{ padding: "6px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8f9fc" }}
                >
                  <span style={{ fontSize: 11, color: "#6b7280" }}>Preview</span>
                  <button
                    onClick={() => handleImageChange(null)}
                    style={{ fontSize: 11, color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <input
              type="text"
              placeholder="Proof link (optional)"
              value={proofLink}
              onChange={(e) => setProofLink(e.target.value)}
              style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 10, padding: "9px 12px", fontSize: 13, marginBottom: 10, outline: "none", fontFamily: "inherit", boxSizing: "border-box", background: "#fff" }}
            />
            <textarea
              placeholder="Describe your proof (optional)"
              value={proofText}
              onChange={(e) => setProofText(e.target.value)}
              rows={2}
              style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 10, padding: "9px 12px", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", background: "#fff" }}
            />
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#ef4444", marginBottom: 14 }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleComplete}
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#86efac" : "linear-gradient(135deg,#10b981,#059669)",
              color: "#fff",
              padding: 13,
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 700,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit",
            }}
          >
            {loading ? "Completing..." : "Mark as Completed"}
          </button>

          <Link href={backUrl} style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: "#9ca3af", textDecoration: "none" }}>
            Cancel
          </Link>

        </div>
      </div>
    </div>
  );
}
