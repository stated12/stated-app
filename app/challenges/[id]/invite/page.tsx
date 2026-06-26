"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Contact {
  email:     string;
  full_name: string;
  company:   string;
}

export default function InvitePage() {
  const router = useRouter();
  const params = useParams();
  const id     = params.id as string;

  const [challenge, setChallenge]   = useState<any>(null);
  const [loading, setLoading]       = useState(true);
  const [contacts, setContacts]     = useState<Contact[]>([]);
  const [manualEmail, setManualEmail] = useState("");
  const [manualName, setManualName]   = useState("");
  const [sending, setSending]         = useState(false);
  const [result, setResult]           = useState<{ sent: number; failed: number } | null>(null);
  const [error, setError]             = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data } = await supabase
        .from("challenges")
        .select("id, title, type, status, plan, invites_remaining, invites_sent, posted_by_user_id")
        .eq("id", id)
        .single();

      if (!data || data.posted_by_user_id !== user.id) {
        router.push("/dashboard/challenges"); return;
      }
      setChallenge(data);
      setLoading(false);
    }
    load();
  }, [id, router]);

  function addManual() {
    const email = manualEmail.trim().toLowerCase();
    if (!email || !email.includes("@")) { setError("Enter a valid email address."); return; }
    if (contacts.find(c => c.email === email)) { setError("This email is already in the list."); return; }
    setContacts(prev => [...prev, { email, full_name: manualName.trim(), company: "" }]);
    setManualEmail("");
    setManualName("");
    setError("");
  }

  function removeContact(email: string) {
    setContacts(prev => prev.filter(c => c.email !== email));
  }

  function handleCSV(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.split("\n").filter(Boolean);
      const parsed: Contact[] = [];
      // Skip header row if it contains "email"
      const startIdx = lines[0]?.toLowerCase().includes("email") ? 1 : 0;
      for (let i = startIdx; i < lines.length; i++) {
        const cols = lines[i].split(",").map(c => c.trim().replace(/"/g, ""));
        const email = cols[0]?.toLowerCase();
        if (email && email.includes("@") && !contacts.find(c => c.email === email)) {
          parsed.push({ email, full_name: cols[1] || "", company: cols[2] || "" });
        }
      }
      setContacts(prev => [...prev, ...parsed]);
      if (fileRef.current) fileRef.current.value = "";
    };
    reader.readAsText(file);
  }

  async function sendInvites() {
    if (!contacts.length) { setError("Add at least one contact."); return; }
    const remaining = challenge?.invites_remaining ?? 0;
    if (contacts.length > remaining) {
      setError(`You only have ${remaining} invite${remaining !== 1 ? "s" : ""} remaining. Remove ${contacts.length - remaining} contact${contacts.length - remaining !== 1 ? "s" : ""}.`);
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/challenges/send-invites", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ challenge_id: id, contacts }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to send invites."); return; }
      setResult({ sent: data.sent, failed: data.failed });
      setContacts([]);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const isProOrScale = ["pro","scale"].includes(challenge?.plan);
  const remaining    = challenge?.invites_remaining ?? 0;

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
      <div style={{ width: 32, height: 32, border: "3px solid #e5e7eb", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'DM Sans',sans-serif", padding: "32px 16px 80px" }}>
      <div style={{ maxWidth: 580, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <Link href={`/challenges/${id}/submissions`} style={{ fontSize: 13, color: "#6b7280", border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 12px", textDecoration: "none" }}>
            Back
          </Link>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: 0 }}>Send Invites</h1>
            <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{challenge?.title}</p>
          </div>
        </div>

        {/* Invites remaining */}
        <div style={{ background: remaining > 0 ? "#eff6ff" : "#fef2f2", border: `1px solid ${remaining > 0 ? "#bfdbfe" : "#fecaca"}`, borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: remaining > 0 ? "#1d4ed8" : "#dc2626" }}>{remaining}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>email invites remaining</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{challenge?.invites_sent || 0} sent so far</div>
            <div style={{ fontSize: 11, color: "#9ca3af", textTransform: "capitalize" }}>{challenge?.plan} plan</div>
          </div>
        </div>

        {remaining === 0 && (
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: "14px 18px", marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 4 }}>No invites remaining</div>
            <div style={{ fontSize: 12, color: "#c2410c" }}>Purchase an email add-on pack to send more invites. Contact hello@stated.in to add more credits.</div>
          </div>
        )}

        {/* Success state */}
        {result && (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 14, padding: "24px", marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#14532d", marginBottom: 4 }}>Invites sent!</div>
            <div style={{ fontSize: 14, color: "#16a34a" }}>{result.sent} email{result.sent !== 1 ? "s" : ""} sent successfully{result.failed > 0 ? `, ${result.failed} failed` : ""}.</div>
            <Link href={`/challenges/${id}/submissions`} style={{ display: "inline-block", marginTop: 16, fontSize: 13, fontWeight: 600, color: "#16a34a", border: "1px solid #86efac", borderRadius: 8, padding: "8px 16px", textDecoration: "none" }}>
              View submissions dashboard
            </Link>
          </div>
        )}

        {!result && remaining > 0 && (
          <>
            {/* CSV Upload - Pro/Scale only */}
            {isProOrScale ? (
              <div style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "18px", marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Import from CSV</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 12 }}>
                  CSV format: <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4 }}>email, full_name, company</code> — one contact per row. First row can be a header.
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleCSV}
                  style={{ fontSize: 13, color: "#374151" }}
                />
              </div>
            ) : (
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#92400e" }}>CSV import is available on Pro and Scale plans. Add emails manually below.</div>
              </div>
            )}

            {/* Manual add */}
            <div style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "18px", marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Add email manually</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <input
                  type="text"
                  value={manualName}
                  onChange={e => setManualName(e.target.value)}
                  placeholder="Full name (optional)"
                  style={{ flex: 1, minWidth: 120, border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "9px 12px", fontSize: 13, outline: "none" }}
                />
                <input
                  type="email"
                  value={manualEmail}
                  onChange={e => setManualEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") addManual(); }}
                  placeholder="email@example.com"
                  style={{ flex: 2, minWidth: 160, border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "9px 12px", fontSize: 13, outline: "none" }}
                />
                <button
                  onClick={addManual}
                  style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Add
                </button>
              </div>
            </div>

            {/* Contact list */}
            {contacts.length > 0 && (
              <div style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "18px", marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>
                  {contacts.length} contact{contacts.length !== 1 ? "s" : ""} ready to invite
                  {contacts.length > remaining && (
                    <span style={{ color: "#dc2626", fontWeight: 400, fontSize: 11, marginLeft: 8 }}>
                      (exceeds {remaining} remaining — remove {contacts.length - remaining})
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 280, overflowY: "auto" }}>
                  {contacts.map(c => (
                    <div key={c.email} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", borderRadius: 8, padding: "8px 12px" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{c.full_name || c.email}</div>
                        {c.full_name && <div style={{ fontSize: 11, color: "#6b7280" }}>{c.email}</div>}
                      </div>
                      <button onClick={() => removeContact(c.email)} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 16, padding: "0 4px" }}>×</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: 14 }}>
                {error}
              </div>
            )}

            <button
              onClick={sendInvites}
              disabled={sending || contacts.length === 0 || contacts.length > remaining}
              style={{ width: "100%", background: sending || contacts.length === 0 || contacts.length > remaining ? "#e5e7eb" : "#2563eb", color: sending || contacts.length === 0 || contacts.length > remaining ? "#9ca3af" : "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, cursor: sending || contacts.length === 0 ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
              {sending ? "Sending..." : `Send ${contacts.length || ""} invite${contacts.length !== 1 ? "s" : ""} via email`}
            </button>
            <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: 8 }}>
              Emails are sent from hello@stated.in on your behalf.
            </p>
          </>
        )}
      </div>
    </div>
  );
            }
