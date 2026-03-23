"use client";

import { useState } from "react";

const CATEGORIES = [
  "General Question",
  "Commitment Issue",
  "Reputation / Scoring",
  "Billing / Credits",
  "Company Account",
  "Technical Problem",
  "Account Access Issue",
  "Report Abuse",
];

const FAQS = [
  {
    q: "What is a commitment?",
    a: "A commitment is a public declaration of something you intend to complete within a defined time period. Commitments appear on your public profile and can be tracked over time.",
  },
  {
    q: "How is reputation calculated?",
    a: "Reputation reflects your history of completing commitments. Successfully completed commitments improve reputation, while expired or withdrawn commitments may reduce it.",
  },
  {
    q: "Why do commitments require credits?",
    a: "Credits help prevent spam and ensure commitments represent genuine intent. Each commitment consumes a credit when created.",
  },
  {
    q: "Why did my commitment expire?",
    a: "Commitments automatically expire when the selected time period ends. To maintain reputation, mark the commitment completed before the deadline.",
  },
  {
    q: "Can commitments be edited?",
    a: "Commitments cannot be edited after creation to preserve integrity. If something changes, withdraw the commitment and create a new one.",
  },
  {
    q: "Can companies create commitments?",
    a: "Yes. Companies can publish commitments representing organizational goals or initiatives. These appear on the company's public profile.",
  },
  {
    q: "What proof is required for completion?",
    a: "When marking a commitment as completed, you may upload supporting proof such as screenshots, documents, or links.",
  },
];

export default function SupportPage() {
  const [category, setCategory] = useState("General Question");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function submitTicket() {
    if (!message.trim()) { setError("Please describe your issue."); return; }
    setLoading(true);
    setError("");

    const res = await fetch("/api/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // FIX: was sending "category" but API expects "subject"
      body: JSON.stringify({ subject: category, message }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Failed to submit ticket. Please try again.");
      return;
    }

    setSuccess(true);
    setMessage("");
    setCategory("General Question");
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingBottom: 40 }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#4338ca,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#fff" strokeWidth="1.5"/><path d="M9 10.5v.5M9 7a2 2 0 011.5 3.3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f0c29", margin: 0 }}>Support</h1>
        </div>
        <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
          Need help with Stated? Submit a request below. Please review the FAQs first — many common questions are answered there.
        </p>
      </div>

      {/* Support form card */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f1f6", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden", marginBottom: 24 }}>
        <div style={{ height: 3, background: "linear-gradient(90deg,#4338ca,#818cf8)" }} />
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f0c29", marginBottom: 16 }}>Submit a Support Ticket</div>

          {/* Category */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 5, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Category</div>
            <div style={{ position: "relative" as const }}>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 12, padding: "10px 36px 10px 12px", fontSize: 13, color: "#374151", outline: "none", fontFamily: "inherit", background: "#fafbff", appearance: "none" as any, cursor: "pointer", boxSizing: "border-box" as const }}
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>

          {/* Message */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 5, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Describe Your Issue</div>
            <textarea
              placeholder={`What happened?\n• Which commitment (if relevant)?\n• Payment ID (for billing issues)\n• Steps to reproduce the problem`}
              value={message}
              onChange={(e) => { setMessage(e.target.value); setError(""); }}
              rows={6}
              style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 12, padding: "10px 12px", fontSize: 13, color: "#374151", outline: "none", resize: "vertical" as const, fontFamily: "inherit", background: "#fafbff", lineHeight: 1.6, boxSizing: "border-box" as const }}
            />
          </div>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#ef4444", marginBottom: 14 }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#15803d", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>✓</span>
              <div>
                <div style={{ fontWeight: 600 }}>Ticket submitted successfully!</div>
                <div style={{ fontSize: 11, marginTop: 2, color: "#16a34a" }}>Our team typically reviews requests within 24 hours.</div>
              </div>
            </div>
          )}

          <button
            onClick={submitTicket}
            disabled={loading || success}
            style={{ background: loading || success ? "#a5b4fc" : "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", padding: "11px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700, border: "none", cursor: loading || success ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: "0 3px 10px rgba(67,56,202,0.25)" }}
          >
            {loading ? "Submitting..." : success ? "✓ Submitted" : "Submit Ticket"}
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f1f6", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <div style={{ height: 3, background: "linear-gradient(90deg,#10b981,#34d399)" }} />
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f0c29", marginBottom: 16 }}>Frequently Asked Questions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{ border: "1px solid #f0f1f6", borderRadius: 12, overflow: "hidden" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", padding: "12px 14px", background: openFaq === i ? "#f8f9ff" : "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, textAlign: "left" as const, fontFamily: "inherit" }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#0f0c29", lineHeight: 1.4 }}>{faq.q}</span>
                  <svg style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 14px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.6, borderTop: "1px solid #f0f1f6", paddingTop: 10 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
