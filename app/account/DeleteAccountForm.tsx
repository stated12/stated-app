"use client";

import { useState } from "react";

export default function DeleteAccountForm() {
  const [confirmText, setConfirmText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = confirmText === "DELETE";

  async function handleDelete() {
    if (!isValid) return;
    setLoading(true);
    await fetch("/account/delete", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #fecaca", boxShadow: "0 1px 8px rgba(0,0,0,0.04)", overflow: "hidden" }}>
      <div style={{ height: 3, background: "linear-gradient(90deg,#ef4444,#fca5a5)" }} />
      <div style={{ padding: "16px 20px" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M5.5 3.5V2.5a1 1 0 011-1h1a1 1 0 011 1v1M6 6v4M8 6v4M3 3.5l.7 7.5a1 1 0 001 .9h4.6a1 1 0 001-.9l.7-7.5" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round"/></svg>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#dc2626" }}>Delete Account</div>
          <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: "#ef4444", background: "#fee2e2", padding: "2px 8px", borderRadius: 20 }}>DANGER ZONE</span>
        </div>

        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.6, background: "#fff5f5", borderRadius: 10, padding: "10px 12px", border: "1px solid #fee2e2" }}>
          ⚠️ This permanently deletes your profile, all commitments, reputation history, and associated data. <strong>This cannot be undone.</strong>
        </div>

        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            style={{ background: "#fff", border: "1.5px solid #fca5a5", color: "#dc2626", padding: "10px 18px", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
          >
            Delete Account Permanently
          </button>
        ) : (
          <div>
            <div style={{ fontSize: 13, color: "#374151", marginBottom: 10, lineHeight: 1.5 }}>
              To confirm, type <strong style={{ color: "#dc2626", fontFamily: "monospace" }}>DELETE</strong> in the box below:
            </div>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              style={{ width: "100%", border: `1.5px solid ${isValid ? "#fca5a5" : "#e8eaf2"}`, borderRadius: 12, padding: "10px 12px", fontSize: 13, color: "#374151", outline: "none", fontFamily: "monospace", background: "#fafbff", marginBottom: 14, boxSizing: "border-box" as const }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button
                disabled={!isValid || loading}
                onClick={handleDelete}
                style={{ background: isValid && !loading ? "linear-gradient(135deg,#ef4444,#dc2626)" : "#fca5a5", color: "#fff", padding: "10px 18px", borderRadius: 12, fontSize: 13, fontWeight: 700, border: "none", cursor: isValid && !loading ? "pointer" : "not-allowed", fontFamily: "inherit", boxShadow: isValid ? "0 3px 10px rgba(239,68,68,0.3)" : "none" }}
              >
                {loading ? "Deleting..." : "Confirm Delete"}
              </button>
              <button
                onClick={() => { setShowConfirm(false); setConfirmText(""); }}
                style={{ background: "#f8f9fc", border: "1.5px solid #e8eaf2", color: "#374151", padding: "10px 18px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
