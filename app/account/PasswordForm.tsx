"use client";

import { useState } from "react";

export default function PasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirmPass] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess("");

    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (!/[A-Z]/.test(password)) { setError("Password must include at least one uppercase letter."); return; }
    if (!/[0-9]/.test(password)) { setError("Password must include at least one number."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }

    setLoading(true);
    const form = e.target as HTMLFormElement;
    const res = await fetch("/account/password", { method: "POST", body: new FormData(form) });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) { setError(data.error); return; }
    setSuccess(data.success || "Password updated successfully.");
    setPassword(""); setConfirm("");
  }

  const strength = password.length === 0 ? 0
    : password.length < 8 ? 1
    : password.length < 12 && !/[A-Z]/.test(password) ? 2
    : password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4
    : 3;

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#10b981", "#4338ca"];

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f1f6", boxShadow: "0 1px 8px rgba(0,0,0,0.04)", overflow: "hidden" }}>
      <div style={{ height: 3, background: "linear-gradient(90deg,#6366f1,#818cf8)" }} />
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="6" width="8" height="6" rx="1.5" stroke="#4338ca" strokeWidth="1.3"/><path d="M5 6V4.5a2 2 0 014 0V6" stroke="#4338ca" strokeWidth="1.3" strokeLinecap="round"/></svg>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f0c29" }}>Change Password</div>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#ef4444", marginBottom: 14 }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#15803d", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <span>✓</span> {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* New password */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 5, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>New Password</div>
            <div style={{ position: "relative" as const }}>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                placeholder="Enter new password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 12, padding: "10px 40px 10px 12px", fontSize: 13, color: "#374151", outline: "none", fontFamily: "inherit", background: "#fafbff", boxSizing: "border-box" as const }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0 }}>
                {showPass
                  ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/></svg>
                }
              </button>
            </div>
            {/* Strength bar */}
            {password.length > 0 && (
              <div style={{ marginTop: 6 }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 3 }}>
                  {[1,2,3,4].map((i) => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? strengthColor[strength] : "#e8eaf2", transition: "background 0.2s" }} />
                  ))}
                </div>
                <div style={{ fontSize: 10, color: strengthColor[strength], fontWeight: 600 }}>{strengthLabel[strength]}</div>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 5, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Confirm Password</div>
            <div style={{ position: "relative" as const }}>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm_password"
                required
                placeholder="Re-enter new password"
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); setError(""); }}
                style={{ width: "100%", border: `1.5px solid ${confirm && confirm !== password ? "#fca5a5" : "#e8eaf2"}`, borderRadius: 12, padding: "10px 40px 10px 12px", fontSize: 13, color: "#374151", outline: "none", fontFamily: "inherit", background: "#fafbff", boxSizing: "border-box" as const }}
              />
              <button type="button" onClick={() => setShowConfirmPass(!showConfirm)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0 }}>
                {showConfirm
                  ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/></svg>
                }
              </button>
            </div>
            {confirm && confirm !== password && (
              <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>Passwords do not match</div>
            )}
          </div>

          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 16, lineHeight: 1.5 }}>
            Must be at least 8 characters with an uppercase letter and a number.
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ background: loading ? "#a5b4fc" : "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", padding: "11px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: "0 3px 10px rgba(67,56,202,0.25)" }}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
