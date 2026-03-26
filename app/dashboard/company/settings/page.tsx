"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CompanySettingsPage() {
  const supabase = createClient();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [company, setCompany] = useState<any>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  useEffect(() => { loadCompany(); }, []);

  async function loadCompany() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data: owned } = await supabase
      .from("companies").select("*").eq("owner_user_id", user.id).maybeSingle();

    if (owned) {
      setCompany(owned);
      setCompanyId(owned.id);
      setIsOwner(true);
      setLoading(false);
      return;
    }

    const { data: membership } = await supabase
      .from("company_members").select("company_id").eq("user_id", user.id).maybeSingle();

    if (!membership) { setLoading(false); return; }

    const { data } = await supabase
      .from("companies").select("*").eq("id", membership.company_id).single();

    setCompany(data);
    setCompanyId(membership.company_id);
    setIsOwner(false);
    setLoading(false);
  }

  async function handleAvatarUpload(file: File) {
    if (!companyId) return;
    if (file.size > 2 * 1024 * 1024) { setError("Image must be under 2MB"); return; }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setError("Only JPG, PNG, WEBP allowed"); return; }

    setAvatarUploading(true);
    setError("");
    const ext = file.name.split(".").pop();
    const path = "company-" + companyId + "." + ext;

    const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (upErr) { setError("Upload failed: " + upErr.message); setAvatarUploading(false); return; }

    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = urlData.publicUrl + "?t=" + Date.now();

    const { error: updateErr } = await supabase.from("companies").update({ logo_url: publicUrl }).eq("id", companyId);
    if (updateErr) { setError("Failed to save avatar"); setAvatarUploading(false); return; }

    setCompany((prev: any) => ({ ...prev, logo_url: publicUrl }));
    setAvatarUploading(false);
  }

  async function updateCompany() {
    if (!companyId || !company) return;
    setError("");
    setSaving(true);

    const { error: updateError } = await supabase.from("companies").update({
      name:         company.name,
      display_name: company.display_name,
      description:  company.description,
      bio:          company.bio,
      website:      company.website,
      linkedin_url: company.linkedin_url,
      twitter_url:  company.twitter_url,
      github_url:   company.github_url,
      youtube_url:  company.youtube_url,
    }).eq("id", companyId);

    setSaving(false);
    if (updateError) { setError("Failed to save. Please try again."); }
    else { setSaved(true); setTimeout(() => setSaved(false), 3000); }
  }

  async function deleteCompany() {
    if (!companyId || deleteInput !== "DELETE") return;
    await supabase.from("companies").delete().eq("id", companyId);
    router.push("/dashboard");
  }

  if (loading) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 13, color: "#9ca3af" }}>Loading settings...</div>
    </div>
  );

  if (!company) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 13, color: "#9ca3af" }}>Company not found</div>
    </div>
  );

  const avatarUrl = company.logo_url?.trim()
    ? company.logo_url.trim()
    : "https://ui-avatars.com/api/?name=" + encodeURIComponent(company.name) + "&background=0891b2&color=fff&size=128";

  const IS = {
    width: "100%", border: "1px solid #e8eaf2", borderRadius: 10,
    padding: "11px 14px", fontSize: 14, color: "#0f0c29", outline: "none",
    fontFamily: "inherit", background: "#f8f9fc", boxSizing: "border-box" as const,
  };
  const LS = { display: "block" as const, fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 };
  const CARD = { background: "#fff", borderRadius: 14, padding: "16px", border: "1px solid #f0f1f6", marginBottom: 12 };
  const SEC = { fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 16 };
  const FIELD = { marginBottom: 14 };

  return (
    <div style={{ margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh", paddingBottom: 40 }}>

      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 16px 14px", borderBottom: "1px solid #f0f1f6" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>Company Settings</div>
        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>@{company.username}</div>
      </div>

      <div style={{ padding: 16 }}>

        {/* Avatar upload */}
        <div style={{ ...CARD, display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px" }}>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#0891b2,#0e7490)", padding: 3 }}>
              <img
                src={avatarUrl}
                alt={company.name}
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff", display: "block" }}
              />
            </div>
            {avatarUploading && (
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 18, height: 18, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
              </div>
            )}
          </div>

          {isOwner && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style={{ display: "none" }}
                onChange={(ev) => { if (ev.target.files?.[0]) handleAvatarUpload(ev.target.files[0]); }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarUploading}
                style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 20, padding: "7px 18px", fontSize: 12, fontWeight: 600, color: "#0891b2", cursor: "pointer", fontFamily: "inherit" }}
              >
                {avatarUploading ? "Uploading..." : "Change Photo"}
              </button>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>JPG, PNG, WEBP . Max 2MB</div>
            </>
          )}
        </div>

        {/* Company Info */}
        <div style={CARD}>
          <div style={SEC}>Company Info</div>

          <div style={FIELD}>
            <label style={LS}>Company Name</label>
            <input style={IS} value={company.name || ""} onChange={(ev) => setCompany({ ...company, name: ev.target.value })} placeholder="Your company name" disabled={!isOwner} />
          </div>

          <div style={FIELD}>
            <label style={LS}>Display Name <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 400 }}>(shown on profile)</span></label>
            <input style={IS} value={company.display_name || ""} onChange={(ev) => setCompany({ ...company, display_name: ev.target.value })} placeholder="e.g. Stated Inc." disabled={!isOwner} />
          </div>

          <div style={FIELD}>
            <label style={LS}>Username <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 400 }}>(permanent - cannot be changed)</span></label>
            <input style={{ ...IS, color: "#9ca3af", cursor: "not-allowed" }} value={company.username || ""} disabled />
          </div>

          <div style={FIELD}>
            <label style={LS}>Description</label>
            <textarea
              style={{ ...IS, minHeight: 70, resize: "vertical" as const }}
              value={company.description || ""}
              onChange={(ev) => setCompany({ ...company, description: ev.target.value })}
              placeholder="What does your company commit to publicly?"
              disabled={!isOwner}
            />
          </div>

          <div style={{ marginBottom: 0 }}>
            <label style={LS}>Bio</label>
            <textarea
              style={{ ...IS, minHeight: 70, resize: "vertical" as const }}
              value={company.bio || ""}
              onChange={(ev) => setCompany({ ...company, bio: ev.target.value })}
              placeholder="A short bio for your company"
              disabled={!isOwner}
            />
          </div>
        </div>

        {/* Links */}
        <div style={CARD}>
          <div style={SEC}>Links</div>

          <div style={FIELD}>
            <label style={LS}>Website</label>
            <input style={IS} value={company.website || ""} onChange={(ev) => setCompany({ ...company, website: ev.target.value })} placeholder="https://yourcompany.com" disabled={!isOwner} />
          </div>

          <div style={FIELD}>
            <label style={LS}>LinkedIn</label>
            <input style={IS} value={company.linkedin_url || ""} onChange={(ev) => setCompany({ ...company, linkedin_url: ev.target.value })} placeholder="https://linkedin.com/company/yourco" disabled={!isOwner} />
          </div>

          <div style={FIELD}>
            <label style={LS}>Twitter / X</label>
            <input style={IS} value={company.twitter_url || ""} onChange={(ev) => setCompany({ ...company, twitter_url: ev.target.value })} placeholder="https://x.com/yourco" disabled={!isOwner} />
          </div>

          <div style={FIELD}>
            <label style={LS}>GitHub</label>
            <input style={IS} value={company.github_url || ""} onChange={(ev) => setCompany({ ...company, github_url: ev.target.value })} placeholder="https://github.com/yourco" disabled={!isOwner} />
          </div>

          <div style={{ marginBottom: 0 }}>
            <label style={LS}>YouTube</label>
            <input style={IS} value={company.youtube_url || ""} onChange={(ev) => setCompany({ ...company, youtube_url: ev.target.value })} placeholder="https://youtube.com/@yourco" disabled={!isOwner} />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: "#dc2626" }}>
            {error}
          </div>
        )}

        {/* Save */}
        {isOwner && (
          <button
            type="button"
            onClick={updateCompany}
            disabled={saving}
            style={{ width: "100%", padding: "14px", background: saved ? "linear-gradient(135deg,#10b981,#34d399)" : saving ? "#9ca3af" : "linear-gradient(135deg,#0891b2,#0e7490)", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit", marginBottom: 12 }}
          >
            {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
          </button>
        )}

        {!isOwner && (
          <div style={{ background: "#f8f9fc", borderRadius: 10, padding: "12px 14px", fontSize: 12, color: "#9ca3af", textAlign: "center" as const, marginBottom: 12 }}>
            Only the company owner can edit settings
          </div>
        )}

        {/* Public profile */}
        <div style={{ ...CARD, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f0c29" }}>Public Profile</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>app.stated.in/c/{company.username}</div>
          </div>
          <a href={"/c/" + company.username} style={{ fontSize: 12, fontWeight: 600, color: "#0891b2", background: "#e0f2fe", padding: "6px 14px", borderRadius: 20, textDecoration: "none" }}>
            View
          </a>
        </div>

        {/* Danger zone */}
        {isOwner && (
          <div style={{ background: "#fff", borderRadius: 14, padding: "16px", border: "1px solid #fee2e2", marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 10 }}>Danger Zone</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.5 }}>
              Deleting your company is permanent. All commitments, members and data will be lost.
            </div>

            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                style={{ background: "none", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 600, color: "#dc2626", cursor: "pointer", fontFamily: "inherit" }}
              >
                Delete Company
              </button>
            ) : (
              <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
                  Type DELETE to confirm
                </div>
                <input
                  style={{ ...IS, border: "1.5px solid #fca5a5", background: "#fff", marginBottom: 10 }}
                  value={deleteInput}
                  onChange={(ev) => setDeleteInput(ev.target.value)}
                  placeholder="DELETE"
                  autoFocus
                />
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => { setShowDeleteConfirm(false); setDeleteInput(""); }}
                    style={{ flex: 1, padding: "10px", background: "#f8f9fc", border: "1px solid #e8eaf2", borderRadius: 9, fontSize: 13, fontWeight: 600, color: "#6b7280", cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={deleteCompany}
                    disabled={deleteInput !== "DELETE"}
                    style={{ flex: 1, padding: "10px", background: deleteInput === "DELETE" ? "#dc2626" : "#fca5a5", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700, color: "#fff", cursor: deleteInput === "DELETE" ? "pointer" : "not-allowed", fontFamily: "inherit" }}
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
