"use client";

import { useEffect, useState } from "react";

export default function InvitePage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);
  const [invites, setInvites] = useState<any[]>([]);

  useEffect(() => { loadInvites(); }, []);

  async function loadInvites() {
    const res = await fetch("/api/company/invites");
    const data = await res.json();
    setInvites(data.invites || []);
  }

  async function sendInvite() {
    if (!email.trim()) { alert("Enter email"); return; }
    setLoading(true);
    const res = await fetch("/api/company/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });
    const data = await res.json();
    if (!res.ok) { alert(data.error); setLoading(false); return; }
    alert("Invitation sent");
    setEmail("");
    loadInvites();
    setLoading(false);
  }

  async function cancelInvite(id: string) {
    if (!confirm("Cancel this invite?")) return;
    await fetch(`/api/company/invite/${id}`, { method: "DELETE" });
    loadInvites();
  }

  async function resendInvite(id: string) {
    await fetch(`/api/company/invite/${id}`, { method: "POST" });
    alert("Invite resent");
    loadInvites();
  }

  const roleMeta: Record<string, { label: string; desc: string; bg: string; color: string }> = {
    admin:  { label: "Admin",  desc: "Full access — invite, manage, billing, insights", bg: "#fef3c7", color: "#92400e" },
    member: { label: "Member", desc: "Create and manage company commitments",           bg: "#dcfce7", color: "#15803d" },
    viewer: { label: "Viewer", desc: "Read-only access to company profile",              bg: "#f3f4f6", color: "#6b7280" },
  };

  return (
    <div style={{ margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#fff", padding: "14px 16px 12px", borderBottom: "1px solid #f0f1f6" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>Invite Member</div>
        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>Send an invite link via email</div>
      </div>

      <div style={{ padding: 16 }}>

        {/* Invite form */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 18, marginBottom: 16, border: "1px solid #f0f1f6" }}>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Email address
            </label>
            <input
              type="email"
              placeholder="colleague@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", border: "1px solid #e8eaf2", borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "#0f0c29", outline: "none", fontFamily: "inherit", background: "#f8f9fc" }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Role
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(roleMeta).map(([key, meta]) => (
                <div
                  key={key}
                  onClick={() => setRole(key)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${role === key ? "#0891b2" : "#e8eaf2"}`, background: role === key ? "#f0f9ff" : "#fff", cursor: "pointer" }}
                >
                  <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${role === key ? "#0891b2" : "#d1d5db"}`, background: role === key ? "#0891b2" : "#fff", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0f0c29" }}>{meta.label}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{meta.desc}</div>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: meta.bg, color: meta.color }}>{meta.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={sendInvite}
            disabled={loading}
            style={{ width: "100%", padding: "13px", background: loading ? "#9ca3af" : "linear-gradient(135deg,#0891b2,#0e7490)", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: loading ? "none" : "0 3px 10px rgba(8,145,178,0.3)" }}
          >
            {loading ? "Sending..." : "Send Invitation →"}
          </button>
        </div>

        {/* Pending invites */}
        <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
          Pending Invites
        </div>

        {invites.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px", textAlign: "center", border: "1px solid #f0f1f6" }}>
            <div style={{ fontSize: 13, color: "#9ca3af" }}>No pending invites</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {invites.map((invite) => {
              const expired = invite.expires_at && new Date(invite.expires_at) < new Date();
              const meta = roleMeta[invite.role] || roleMeta.viewer;
              return (
                <div key={invite.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", border: "1px solid #f0f1f6" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0f0c29", marginBottom: 6 }}>{invite.email}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: meta.bg, color: meta.color }}>{meta.label}</span>
                        <span style={{ fontSize: 10, color: expired ? "#ef4444" : "#f59e0b", fontWeight: 600 }}>{expired ? "Expired" : "Pending"}</span>
                        <span style={{ fontSize: 10, color: "#9ca3af" }}>Sent {new Date(invite.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {!expired && (
                        <button onClick={() => resendInvite(invite.id)} style={{ fontSize: 11, fontWeight: 600, color: "#0891b2", background: "#e0f2fe", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontFamily: "inherit" }}>
                          Resend
                        </button>
                      )}
                      <button onClick={() => cancelInvite(invite.id)} style={{ fontSize: 11, fontWeight: 600, color: "#ef4444", background: "#fff5f5", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontFamily: "inherit" }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
