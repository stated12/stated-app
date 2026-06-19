"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  CHALLENGE_TYPES,
  CHALLENGE_PRICES,
  PLANS,
  type ChallengeType,
  type ChallengePlan,
} from "@/lib/challenges-config";

declare global { interface Window { Razorpay: any; } }

const STEPS = ["Type", "Details", "Submission", "Payment"];

const ACCENT: Record<string, string> = {
  hiring: "#2563eb", cofounder: "#7c3aed", partner: "#16a34a",
  consultant: "#0d9488", investor_signal: "#d97706",
  collaborator: "#e11d48", impact: "#475569", grant: "#9333ea",
};

const ACCENTBG: Record<string, string> = {
  hiring: "#eff6ff", cofounder: "#f5f3ff", partner: "#f0fdf4",
  consultant: "#f0fdfa", investor_signal: "#fffbeb",
  collaborator: "#fff1f2", impact: "#f8fafc", grant: "#faf5ff",
};

export default function NewChallengePage() {
  const router = useRouter();

  // Account context
  const [posterName, setPosterName]   = useState("");
  const [postedAs, setPostedAs]       = useState<"profile" | "company">("profile");
  const [companyId, setCompanyId]     = useState<string | null>(null);
  const [accountReady, setAccountReady] = useState(false);

  // Step state
  const [step, setStep] = useState(0);

  // Step 1 — Type
  const [type, setType] = useState<ChallengeType | "">("");

  // Step 2 — Details
  const [title, setTitle]                   = useState("");
  const [description, setDescription]       = useState("");
  const [whatWeNeed, setWhatWeNeed]         = useState("");
  const [evalCriteria, setEvalCriteria]     = useState("");
  const [whatWinnerGets, setWhatWinnerGets] = useState("");
  const [deadline, setDeadline]             = useState("");
  const [location, setLocation]             = useState("");
  const [tags, setTags]                     = useState("");

  // Step 3 — Submission format
  const [reqText, setReqText]   = useState("optional");
  const [reqLink, setReqLink]   = useState("optional");
  const [reqFile, setReqFile]   = useState("optional");
  const [reqVideo, setReqVideo] = useState("disabled");

  // Step 4 — Plan & Payment
  const [plan, setPlan]           = useState<ChallengePlan>("pro");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");

  // Load account on mount
  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/signup?redirect=/challenges/new"); return; }

      // Check if on company dashboard path or if user owns a company
      const { data: company } = await supabase
        .from("companies")
        .select("id, name")
        .eq("owner_user_id", user.id)
        .maybeSingle();

      if (company) {
        setPosterName(company.name);
        setPostedAs("company");
        setCompanyId(company.id);
      } else {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, username")
          .eq("id", user.id)
          .maybeSingle();
        setPosterName(profile?.full_name || profile?.username || "You");
        setPostedAs("profile");
      }
      setAccountReady(true);
    }
    load();

    // Load Razorpay
    if (!document.querySelector('script[src*="razorpay"]')) {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.head.appendChild(s);
    }
  }, [router]);

  // Set default submission fields when type is picked
  useEffect(() => {
    if (type && CHALLENGE_TYPES[type]) {
      const d = CHALLENGE_TYPES[type].defaults;
      setReqText(d.require_text);
      setReqLink(d.require_link);
      setReqFile(d.require_file);
      setReqVideo(d.require_video);
    }
  }, [type]);

  function canProceed() {
    if (step === 0) return !!type;
    if (step === 1) {
      return (
        title.trim().length >= 5 &&
        description.trim().length >= 10 &&
        whatWeNeed.trim().length >= 5 &&
        evalCriteria.trim().length >= 5 &&
        whatWinnerGets.trim().length >= 3 &&
        !!deadline
      );
    }
    if (step === 2) return true;
    return false;
  }

  async function handlePayment() {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/challenges/create", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          plan,
          title:               title.trim(),
          description:         description.trim(),
          what_we_need:        whatWeNeed.trim(),
          evaluation_criteria: evalCriteria.trim(),
          what_winner_gets:    whatWinnerGets.trim(),
          deadline,
          location:            location.trim() || null,
          tags:                tags.split(",").map(t => t.trim()).filter(Boolean),
          require_text:        reqText,
          require_link:        reqLink,
          require_file:        reqFile,
          require_video:       reqVideo,
          company_id:          postedAs === "company" ? companyId : null,
          posted_by_type:      postedAs,
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); setSubmitting(false); return; }

      const { challenge_id, razorpay_order } = data;
      const priceINR = CHALLENGE_PRICES[type as ChallengeType][plan];

      const options = {
        key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:      razorpay_order.amount,
        currency:    "INR",
        name:        "Stated",
        description: `${CHALLENGE_TYPES[type as ChallengeType].label} - ${PLANS[plan].label} plan`,
        order_id:    razorpay_order.id,
        handler: async (response: any) => {
          const activateRes = await fetch("/api/challenges/activate", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              challenge_id,
              razorpay_order_id:   razorpay_order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              plan,
              amount_inr: priceINR,
            }),
          });
          const activateData = await activateRes.json();
          if (activateData.success) {
            router.push(`/challenges/${challenge_id}?posted=true`);
          } else {
            setError("Payment confirmed but activation failed. Contact hello@stated.in with your payment ID.");
            setSubmitting(false);
          }
        },
        prefill:  { name: posterName, email: "" },
        theme:    { color: "#2563eb" },
        modal:    { ondismiss: () => setSubmitting(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const accent   = type ? ACCENT[type]   : "#2563eb";
  const accentBg = type ? ACCENTBG[type] : "#eff6ff";
  const cfg      = type ? CHALLENGE_TYPES[type] : null;
  const price    = type ? CHALLENGE_PRICES[type as ChallengeType][plan] : 0;

  if (!accountReady) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
        <div style={{ width: 36, height: 36, border: "3px solid #e5e7eb", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} * {box-sizing:border-box}`}</style>

      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "#2563eb", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>✓</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>stated</span>
        </div>
        {/* Posting as badge */}
        <div style={{ background: accentBg, border: `1px solid ${accent}30`, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600, color: accent }}>
          Posting as {posterName}
        </div>
      </div>

      {/* Progress steps */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", maxWidth: 480, margin: "0 auto" }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, background: i < step ? "#2563eb" : i === step ? "#2563eb" : "#e5e7eb", color: i <= step ? "#fff" : "#9ca3af", transition: "all 0.2s" }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: 9, fontWeight: i === step ? 700 : 400, color: i === step ? "#2563eb" : "#9ca3af", whiteSpace: "nowrap" }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i < step ? "#2563eb" : "#e5e7eb", margin: "0 4px", marginBottom: 14, transition: "all 0.2s" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 16px 100px" }}>

        {/* ── STEP 0: TYPE SELECTION ──────────────────────────────────── */}
        {step === 0 && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.03em" }}>Post a Challenge</h1>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>Choose the type of challenge you want to post.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {(Object.entries(CHALLENGE_TYPES) as [ChallengeType, any][]).map(([key, cfg]) => {
                const selected = type === key;
                const ac = ACCENT[key];
                const ab = ACCENTBG[key];
                return (
                  <button
                    key={key}
                    onClick={() => setType(key)}
                    style={{ textAlign: "left", background: selected ? ab : "#fff", border: `2px solid ${selected ? ac : "#e5e7eb"}`, borderRadius: 14, padding: "16px 14px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{cfg.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 2, lineHeight: 1.2 }}>{cfg.label}</div>
                    <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.4 }}>{cfg.for}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STEP 1: DETAILS ────────────────────────────────────────── */}
        {step === 1 && cfg && (
          <div>
            {/* Type badge at top */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, background: accentBg, borderRadius: 12, padding: "12px 14px" }}>
              <span style={{ fontSize: 20 }}>{cfg.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{cfg.label}</div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>{cfg.tagline}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Challenge title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  maxLength={120}
                  placeholder="e.g. Design our onboarding — best design gets the contract"
                  style={{ width: "100%", border: `1.5px solid ${title.trim().length >= 5 ? "#d1fae5" : "#e5e7eb"}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit" }}
                />
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3, textAlign: "right" }}>{title.length}/120</div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Description <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Tell applicants who you are, what you are building, and why this challenge matters..."
                  style={{ width: "100%", border: `1.5px solid ${description.trim().length >= 10 ? "#d1fae5" : "#e5e7eb"}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  What we need <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea
                  value={whatWeNeed}
                  onChange={e => setWhatWeNeed(e.target.value)}
                  rows={3}
                  placeholder="Exactly what should applicants submit? Be specific."
                  style={{ width: "100%", border: `1.5px solid ${whatWeNeed.trim().length >= 5 ? "#d1fae5" : "#e5e7eb"}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  How we evaluate <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea
                  value={evalCriteria}
                  onChange={e => setEvalCriteria(e.target.value)}
                  rows={3}
                  placeholder="What criteria will you use to select? Help applicants self-select."
                  style={{ width: "100%", border: `1.5px solid ${evalCriteria.trim().length >= 5 ? "#d1fae5" : "#e5e7eb"}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  What the winner gets <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  value={whatWinnerGets}
                  onChange={e => setWhatWinnerGets(e.target.value)}
                  placeholder="e.g. Rs.25,000 contract, 20% equity, full-time role..."
                  style={{ width: "100%", border: `1.5px solid ${whatWinnerGets.trim().length >= 3 ? "#d1fae5" : "#e5e7eb"}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Deadline <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    style={{ width: "100%", border: `1.5px solid ${deadline ? "#d1fae5" : "#e5e7eb"}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Location</label>
                  <input
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Remote, Mumbai..."
                    style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Tags <span style={{ color: "#9ca3af", fontWeight: 400 }}>(comma separated)</span></label>
                <input
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  placeholder="e.g. Design, Figma, SaaS"
                  style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit" }}
                />
              </div>
            </div>
          </div>
        )}

                     
        {/* ── STEP 2: SUBMISSION FORMAT ───────────────────────────────── */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>Submission format</h2>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
              Choose what applicants must include. Defaults are set for your challenge type.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { key: "text",  icon: "📝", label: "Text response", desc: "Written answer or proposal",       val: reqText,  set: setReqText  },
                { key: "link",  icon: "🔗", label: "Link",           desc: "Portfolio, GitHub, live demo...", val: reqLink,  set: setReqLink  },
                { key: "file",  icon: "📎", label: "File",           desc: "PDF, doc (via cloud link)",       val: reqFile,  set: setReqFile  },
                { key: "video", icon: "🎬", label: "Video link",     desc: "Loom, YouTube, Drive...",         val: reqVideo, set: setReqVideo },
              ].map(({ icon, label, desc, val, set }) => (
                <div key={label} style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 18 }}>{icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{label}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af" }}>{desc}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                      {["required", "optional", "disabled"].map(opt => (
                        <button
                          key={opt}
                          onClick={() => set(opt)}
                          style={{ padding: "4px 8px", borderRadius: 6, border: `1.5px solid ${val === opt ? (opt === "required" ? "#ef4444" : opt === "optional" ? "#2563eb" : "#e5e7eb") : "#e5e7eb"}`, background: val === opt ? (opt === "required" ? "#fef2f2" : opt === "optional" ? "#eff6ff" : "#f9fafb") : "#fff", color: val === opt ? (opt === "required" ? "#dc2626" : opt === "optional" ? "#2563eb" : "#6b7280") : "#9ca3af", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 3: PLAN & PAYMENT ─────────────────────────────────── */}
        {step === 3 && cfg && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>Choose your plan</h2>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
              One payment. Your challenge goes live immediately. Email invites included in all plans.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {(["basic", "pro", "scale"] as ChallengePlan[]).map(p => {
                const pl      = PLANS[p];
                const pPrice  = CHALLENGE_PRICES[type as ChallengeType][p];
                if (pPrice === 0) return null;
                const selected = plan === p;
                return (
                  <button
                    key={p}
                    onClick={() => setPlan(p)}
                    style={{ textAlign: "left", background: selected ? "#eff6ff" : "#fff", border: `2px solid ${selected ? "#2563eb" : "#e5e7eb"}`, borderRadius: 14, padding: "16px", cursor: "pointer", fontFamily: "inherit", position: "relative", display: "flex", alignItems: "center", gap: 14 }}
                  >
                    {pl.badge && (
                      <div style={{ position: "absolute", top: -9, right: 14, background: "#2563eb", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>
                        {pl.badge}
                      </div>
                    )}
                    {/* Radio */}
                    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${selected ? "#2563eb" : "#d1d5db"}`, background: selected ? "#2563eb" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {selected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: selected ? "#2563eb" : "#0f172a" }}>Rs.{pPrice.toLocaleString("en-IN")}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{pl.label}</span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {[
                          `${pl.durationDays} days`,
                          `${pl.maxSubmissions >= 999999 ? "Unlimited" : pl.maxSubmissions} submissions`,
                          `${pl.emailInvites} invites`,
                          pl.csvImport ? "CSV import" : null,
                          pl.featured ? "Featured" : null,
                        ].filter(Boolean).map((feat, i) => (
                          <span key={i} style={{ fontSize: 11, color: "#6b7280", background: "#f8fafc", border: "1px solid #e5e7eb", padding: "2px 8px", borderRadius: 6 }}>
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Summary */}
            <div style={{ background: "#f8fafc", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "16px 18px", marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Order summary</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: `${cfg.label} - ${PLANS[plan].label}`, val: `Rs.${price.toLocaleString("en-IN")}` },
                  { label: "Duration",       val: `${PLANS[plan].durationDays} days` },
                  { label: "Email invites",  val: `${PLANS[plan].emailInvites} included` },
                  { label: "Posting as",     val: posterName },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "#6b7280" }}>{label}</span>
                    <span style={{ fontWeight: 600, color: "#0f172a" }}>{val}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: "#e5e7eb", margin: "4px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800 }}>
                  <span>Total</span>
                  <span style={{ color: "#2563eb" }}>Rs.{price.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>Inclusive of GST. Powered by Razorpay.</div>
              </div>
            </div>

            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: 14 }}>
                {error}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={submitting}
              style={{ width: "100%", background: submitting ? "#93c5fd" : "#2563eb", color: "#fff", border: "none", borderRadius: 12, padding: "16px", fontSize: 15, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit" }}
            >
              {submitting ? "Processing..." : `Pay Rs.${price.toLocaleString("en-IN")} and Publish`}
            </button>
            <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: 8 }}>
              Your challenge goes live immediately after payment.
            </p>
          </div>
        )}
      </div>

      {/* Fixed bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #e5e7eb", padding: "12px 16px 20px", display: "flex", gap: 10 }}>
        <button
          onClick={() => step > 0 ? setStep(s => s - 1) : router.back()}
          style={{ padding: "12px 20px", border: "1.5px solid #e5e7eb", borderRadius: 10, background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}
        >
          {step === 0 ? "Cancel" : "Back"}
        </button>
        {step < 3 && (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!canProceed()}
            style={{ flex: 1, padding: "12px 20px", border: "none", borderRadius: 10, background: canProceed() ? "#2563eb" : "#e5e7eb", color: canProceed() ? "#fff" : "#9ca3af", fontSize: 13, fontWeight: 700, cursor: canProceed() ? "pointer" : "not-allowed", fontFamily: "inherit" }}
          >
            {step === 2 ? "Choose plan and pay" : "Continue"}
          </button>
        )}
      </div>
    </div>
  );
        }
