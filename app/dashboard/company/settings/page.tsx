"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CompanySettingsPage() {
  const supabase = createClient();
  const router = useRouter();

  const [company, setCompany] = useState<any>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { loadCompany(); }, []);

  async function loadCompany() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data: ownedCompany } = await supabase
      .from("companies").select("*").eq("owner_user_id", user.id).maybeSingle();

    if (ownedCompany) {
      setCompany(ownedCompany);
      setCompanyId(ownedCompany.id);
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

  async function updateCompany() {
    if (!companyId || !company) return;
    setError("");
    setSaving(true);

    const { error: updateError } = await supabase
      .from("companies")
      .update({
        name: company.name,
        description: company.description,
        logo_url: company.logo_url,
        website: company.website,
      })
      .eq("id", companyId);

    setSaving(false);

    if (updateError) {
      setError("Failed to save. Please try again.");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  async function deleteCompany() {
    if (!companyId) return;
    const confirm = window.prompt("Type DELETE to confirm company deletion");
    if (confirm !== "DELETE") return;
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

  const logoUrl = company.logo_url?.trim()
    ? company.logo_url.trim()
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=0891b2&color=fff&size=128`;

  const inputStyle = {
    width: "100%",
    border: "1px solid #e8eaf2",
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: 14,
    color: "#0f0c29",
    outline: "none",
    fontFamily: "inherit",
    background: "#f8f9fc",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block" as const,
    fontSize: 12,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
  };

  return (
    <div style={{ margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh", paddingBottom: 40 }}>

      <div style={{ background: "#fff", padding: "16px 16px 14px", borderBottom: "1px solid #f0f1f6" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>Company Settings</div>
        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>@{company.username}</div>
      </div>

      <div style={{ padding: 16 }}>

        <div style={{ background: "#fff", borderRadius: 14, padding: "16px", border: "1px solid #f0f1f6", marginBottom: 12, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: "linear-gradient(135deg,#0891b2,#0e7490)", padding: 2.5, flexShrink: 0 }}>
            <img src={logoUrl} alt={company.name} style={{ width: "100%", height: "100%", borderRadius: 10, objectFit: "cover", border: "2px solid #fff" }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f0c29" }}>{company.name}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>@{company.username} · Company</div>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 14, padding: "16px", border: "1px solid #f0f1f6", marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 16 }}>Company Info</div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Company Name</label>
            <input
              style={inputStyle}
              value={company.name || ""}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
              placeholder="Your company name"
              disabled={!isOwner}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>
              Username{" "}
              <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 400 }}>(permanent — cannot be changed)</span>
            </label>
            <input
              style={{ ...inputStyle, color: "#9ca3af", cursor: "not-allowed" }}
              value={company.username || ""}
              disabled
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Description</label>
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" as const }}
              value={company.description || ""}
              onChange={(e) => setCompany({ ...company, description: e.target.value })}
              placeholder="What does your company commit to publicly?"
              disabled={!isOwner}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Logo URL</label>
            <input
              style={inputStyle}
              value={company.logo_url || ""}
              onChange={(e) => setCompany({ ...company, logo_url: e.target.value })}
              placeholder="https://your-logo-url.com/logo.png"
              disabled={!isOwner}
            />
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
              Paste a direct image URL. Square images work best.
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Website</label>
            <input
              style={inputStyle}
              value={company.website || ""}
              onChange={(e) => setCompany({ ...company, website: e.target.value })}
              placeholder="https://yourcompany.com"
              disabled={!isOwner}
            />
          </div>

          {error && (
            <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#dc2626" }}>
              {error}
            </div>
          )}

          {isOwner && (
            <button
              onClick={updateCompany}
              disabled={saving}
              style={{ width: "100%", padding: "13px", background: saved ? "linear-gradient(135deg,#10b981,#34d399)" : saving ? "#9ca3af" : "linear-gradient(135deg,#0891b2,#0e7490)", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit" }}
            >
              {saved ? "✓ Saved!" : saving ? "Saving..." : "Save Changes"}
            </button>
          )}

          {!isOwner && (
            <div style={{ background: "#f8f9fc", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#9ca3af", textAlign: "center" as const }}>
              Only the company owner can edit settings
            </div>
          )}
        </div>

        <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", border: "1px solid #f0f1f6", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f0c29" }}>Public Profile</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>app.stated.in/c/{company.username}</div>
          </div>
          <a href={`/c/${company.username}`} style={{ fontSize: 12, fontWeight: 600, color: "#0891b2", background: "#e0f2fe", padding: "6px 14px", borderRadius: 20, textDecoration: "none" }}>
            View
          </a>
        </div>

        {isOwner && (
          <div style={{ background: "#fff", borderRadius: 14, padding: "16px", border: "1px solid #fee2e2", marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#dc2626", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 12 }}>Danger Zone</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.5 }}>
              Deleting your company is permanent. All commitments, members and data will be lost.
            </div>
            <button
              onClick={deleteCompany}
              style={{ background: "none", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 600, color: "#dc2626", cursor: "pointer", fontFamily: "inherit" }}
            >
              Delete Company
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
