"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CHALLENGE_TYPES, CHALLENGE_PRICES, PLANS, EMAIL_ADDON_PACKS, type ChallengeType, type ChallengePlan } from "@/lib/challenges-config";

declare global { interface Window { Razorpay: any; } }

const STEPS = ["Type", "Details", "Submission", "Payment"];

const TYPE_COLORS: Record<string, { border: string; bg: string; accent: string }> = {
  hiring:          { border: "#bfdbfe", bg: "#eff6ff",  accent: "#2563eb"  },
  cofounder:       { border: "#ddd6fe", bg: "#f5f3ff",  accent: "#7c3aed"  },
  partner:         { border: "#bbf7d0", bg: "#f0fdf4",  accent: "#16a34a"  },
  consultant:      { border: "#99f6e4", bg: "#f0fdfa",  accent: "#0d9488"  },
  investor_signal: { border: "#fde68a", bg: "#fffbeb",  accent: "#d97706"  },
  collaborator:    { border: "#fecdd3", bg: "#fff1f2",  accent: "#e11d48"  },
  impact:          { border: "#cbd5e1", bg: "#f8fafc",  accent: "#475569"  },
  grant:           { border: "#ddd6fe", bg: "#faf5ff",  accent: "#9333ea"  },
};

export default function NewChallengePage() {
  const router = useRouter();
  const [step, setStep]                   = useState(0);
  const [type, setType]                   = useState<ChallengeType | "">("");
  const [plan, setPlan]                   = useState<ChallengePlan>("pro");
  const [title, setTitle]                 = useState("");
  const [description, setDescription]     = useState("");
  const [whatWeNeed, setWhatWeNeed]       = useState("");
  const [evalCriteria, setEvalCriteria]   = useState("");
  const [whatWinnerGets, setWhatWinnerGets] = useState("");
  const [deadline, setDeadline]           = useState("");
  const [location, setLocation]           = useState("");
  const [tags, setTags]                   = useState("");
  const [reqText, setReqText]             = useState("optional");
  const [reqLink, setReqLink]             = useState("optional");
  const [reqFile, setReqFile]             = useState("optional");
  const [reqVideo, setReqVideo]           = useState("optional");
  const [postedAs, setPostedAs]           = useState<"profile"|"company">("profile");
  const [companyId, setCompanyId]         = useState<string|null>(null);
  const [companies, setCompanies]         = useState<any[]>([]);
  const [submitting, setSubmitting]       = useState(false);
  const [error, setError]                 = useState("");
  const [challengeId, setChallengeId]     = useState<string|null>(null);

  useEffect(() => {
    async function loadCompanies() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login?redirect=/challenges/new"); return; }
      const { data } = await supabase
        .from("companies")
        .select("id, name")
        .eq("owner_user_id", user.id);
      if (data?.length) {
        setCompanies(data);
        setPostedAs("company");
        setCompanyId(data[0].id);
      }
    }
    loadCompanies();

    // Load Razorpay script
    if (!document.querySelector('script[src*="razorpay"]')) {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.head.appendChild(s);
    }
  }, [router]);

  // Set default submission requirements when type changes
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
    if (step === 1) return title.trim().length >= 5 && description.trim().length >= 20 && whatWeNeed.trim().length >= 10 && evalCriteria.trim().length >= 10 && whatWinnerGets.trim().length >= 5 && !!deadline;
    if (step === 2) return true;
    return false;
  }

  async function handlePayment() {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/challenges/create", {
        method: "POST",
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

      const { challenge_id, razorpay_order, amount_inr } = data;
      setChallengeId(challenge_id);

      const priceINR = CHALLENGE_PRICES[type as ChallengeType][plan];

      const options = {
        key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:      razorpay_order.amount,
        currency:    "INR",
        name:        "Stated",
        description: `${CHALLENGE_TYPES[type as ChallengeType].label} — ${PLANS[plan].label} plan`,
        order_id:    razorpay_order.id,
        handler: async (response: any) => {
          const activateRes = await fetch("/api/challenges/activate", {
            method: "POST",
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
            setError("Payment verified but activation failed. Contact hello@stated.in");
          }
        },
        prefill: { name: "", email: "" },
        theme: { color: "#2563eb" },
        modal: {
          ondismiss: () => { setSubmitting(false); },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const selectedType   = type ? CHALLENGE_TYPES[type] : null;
  const selectedPrice  = type ? CHALLENGE_PRICES[type as ChallengeType][plan] : 0;
  const selectedPlan   = PLANS[plan];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 720, margin: "0 auto" }}>

      {/* Progress bar */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 12 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: i <= step ? "#2563eb" : "#e5e7eb", color: i <= step ? "#fff" : "#9ca3af", transition: "all 0.2s" }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: 10, fontWeight: i === step ? 700 : 400, color: i === step ? "#2563eb" : "#9ca3af", whiteSpace: "nowrap" }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i < step ? "#2563eb" : "#e5e7eb", margin: "0 6px", marginBottom: 16, transition: "all 0.2s" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 0 — Type selection */}
      {step === 0 && (
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", marginBottom: 6, letterSpacing: "-0.03em" }}>Post a Challenge</h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28 }}>Choose the type of challenge you want to post.</p>

          {/* Post as */}
          {companies.length > 0 && (
            <div style={{ marginBottom: 24, background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 10 }}>Posting as</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setPostedAs("profile")}
                  style={{ padding: "7px 14px", borderRadius: 8, border: `2px solid ${postedAs === "profile" ? "#2563eb" : "#e5e7eb"}`, background: postedAs === "profile" ? "#eff6ff" : "#fff", color: postedAs === "profile" ? "#2563eb" : "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                >
                  Individual
                </button>
                {companies.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { setPostedAs("company"); setCompanyId(c.id); }}
                    style={{ padding: "7px 14px", borderRadius: 8, border: `2px solid ${postedAs === "company" && companyId === c.id ? "#2563eb" : "#e5e7eb"}`, background: postedAs === "company" && companyId === c.id ? "#eff6ff" : "#fff", color: postedAs === "company" && companyId === c.id ? "#2563eb" : "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {(Object.entries(CHALLENGE_TYPES) as [ChallengeType, any][]).map(([key, cfg]) => {
              const col = TYPE_COLORS[key];
              const selected = type === key;
              const price = CHALLENGE_PRICES[key];
              return (
                <button
                  key={key}
                  onClick={() => setType(key)}
                  style={{ textAlign: "left", background: selected ? col.bg : "#fff", border: `2px solid ${selected ? col.accent : "#e5e7eb"}`, borderRadius: 14, padding: "16px", cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit" }}
                >
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{cfg.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 3 }}>{cfg.label}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 10, lineHeight: 1.4 }}>{cfg.for}</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {(["basic","pro","scale"] as ChallengePlan[]).map(p => (
                      <span key={p} style={{ fontSize: 10, fontWeight: 600, background: p === "pro" ? col.bg : "#f3f4f6", color: p === "pro" ? col.accent : "#6b7280", border: `1px solid ${p === "pro" ? col.border : "#e5e7eb"}`, padding: "2px 7px", borderRadius: 6 }}>
                        {p === "scale" && price[p] === 0 ? "Contact" : `Rs.${price[p]}`}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 1 — Details */}
      {step === 1 && selectedType && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 24 }}>{selectedType.icon}</span>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: 0 }}>{selectedType.label}</h2>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{selectedType.tagline}</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                Challenge title <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={120}
                placeholder={`e.g. ${selectedType.label} — best execution wins`}
                style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
              />
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, textAlign: "right" }}>{title.length}/120</div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                Description <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                placeholder="Tell applicants who you are, what you're building, and why this challenge matters..."
                style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                What we need <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                value={whatWeNeed}
                onChange={e => setWhatWeNeed(e.target.value)}
                rows={3}
                placeholder="Describe exactly what applicants should submit. Be specific — this is what they'll build or write."
                style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                How we evaluate <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                value={evalCriteria}
                onChange={e => setEvalCriteria(e.target.value)}
                rows={3}
                placeholder="What criteria will you use to shortlist and select? Be honest — it helps applicants self-select."
                style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                What the winner gets <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                value={whatWinnerGets}
                onChange={e => setWhatWinnerGets(e.target.value)}
                placeholder="e.g. Rs.25,000 contract, 20% equity, full-time role at Rs.12 LPA..."
                style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                  Deadline <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>Location</label>
                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g. Mumbai, Remote, Pan-India"
                  style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>Tags</label>
              <input
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="e.g. UI Design, Figma, SaaS (comma separated)"
                style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 — Submission format */}
      {step === 2 && (
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>Submission format</h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
            Choose what applicants must include in their response. We have set defaults based on your challenge type — adjust as needed.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { key: "text",  label: "Text response", desc: "Written answer, approach, or proposal", val: reqText,  set: setReqText  },
              { key: "link",  label: "Link",           desc: "Portfolio, GitHub, live demo, Figma...", val: reqLink,  set: setReqLink  },
              { key: "file",  label: "File upload",    desc: "PDF, document, images (via cloud link)", val: reqFile,  set: setReqFile  },
              { key: "video", label: "Video link",     desc: "Loom, YouTube, Google Drive video",      val: reqVideo, set: setReqVideo },
            ].map(({ key, label, desc, val, set }) => (
              <div key={key} style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>{desc}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["required","optional","disabled"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => set(opt)}
                      style={{ padding: "5px 10px", borderRadius: 7, border: `1.5px solid ${val === opt ? (opt === "required" ? "#ef4444" : opt === "optional" ? "#2563eb" : "#e5e7eb") : "#e5e7eb"}`, background: val === opt ? (opt === "required" ? "#fef2f2" : opt === "optional" ? "#eff6ff" : "#f9fafb") : "#fff", color: val === opt ? (opt === "required" ? "#dc2626" : opt === "optional" ? "#2563eb" : "#6b7280") : "#9ca3af", fontSize: 11, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", fontFamily: "inherit" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3 — Plan & Payment */}
      {step === 3 && selectedType && (
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>Choose your plan</h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
            One payment activates your challenge. Email invites included in all plans.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
            {(["basic","pro","scale"] as ChallengePlan[]).map(p => {
              const pl = PLANS[p];
              const price = CHALLENGE_PRICES[type as ChallengeType][p];
              if (price === 0) return null;
              const selected = plan === p;
              return (
                <button
                  key={p}
                  onClick={() => setPlan(p)}
                  style={{ textAlign: "left", background: selected ? "#eff6ff" : "#fff", border: `2px solid ${selected ? "#2563eb" : "#e5e7eb"}`, borderRadius: 14, padding: "16px", cursor: "pointer", position: "relative", fontFamily: "inherit" }}
                >
                  {pl.badge && (
                    <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#2563eb", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap" }}>
                      {pl.badge}
                    </div>
                  )}
                  <div style={{ fontSize: 20, fontWeight: 800, color: selected ? "#2563eb" : "#0f172a", marginBottom: 2 }}>
                    Rs.{price.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 10 }}>{pl.label}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {[
                      `${pl.durationDays} days active`,
                      `${pl.maxSubmissions >= 999999 ? "Unlimited" : pl.maxSubmissions} submissions`,
                      `${pl.emailInvites} email invites`,
                      pl.csvImport ? "CSV import" : null,
                      pl.featured ? "Featured on Stated" : null,
                      pl.prioritySupport ? "Priority support" : null,
                    ].filter(Boolean).map((feat, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#6b7280" }}>
                        <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span> {feat}
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Summary */}
          <div style={{ background: "#f8fafc", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Order summary</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#6b7280" }}>{selectedType.label} — {PLANS[plan].label}</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>Rs.{selectedPrice.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#6b7280" }}>Duration</span>
                <span style={{ color: "#0f172a" }}>{PLANS[plan].durationDays} days</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#6b7280" }}>Email invites</span>
                <span style={{ color: "#0f172a" }}>{PLANS[plan].emailInvites} included</span>
              </div>
              <div style={{ height: 1, background: "#e5e7eb", margin: "4px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800 }}>
                <span style={{ color: "#0f172a" }}>Total</span>
                <span style={{ color: "#2563eb" }}>Rs.{selectedPrice.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>Inclusive of GST. Powered by Razorpay.</div>
            </div>
          </div>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={submitting}
            style={{ width: "100%", background: submitting ? "#93c5fd" : "#2563eb", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit" }}
          >
            {submitting ? "Processing..." : `Pay Rs.${selectedPrice.toLocaleString("en-IN")} and Publish Challenge`}
          </button>
          <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: 10 }}>
            Your challenge goes live immediately after payment is confirmed.
          </p>
        </div>
      )}

      {/* Nav buttons */}
      <div style={{ display: "flex", gap: 10, marginTop: 32, justifyContent: "space-between" }}>
        {step > 0 ? (
          <button
            onClick={() => setStep(s => s - 1)}
            style={{ padding: "11px 20px", border: "1.5px solid #e5e7eb", borderRadius: 10, background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          >
            Back
          </button>
        ) : (
          <button
            onClick={() => router.back()}
            style={{ padding: "11px 20px", border: "1.5px solid #e5e7eb", borderRadius: 10, background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          >
            Cancel
          </button>
        )}

        {step < 3 && (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!canProceed()}
            style={{ flex: 1, padding: "11px 20px", border: "none", borderRadius: 10, background: canProceed() ? "#2563eb" : "#e5e7eb", color: canProceed() ? "#fff" : "#9ca3af", fontSize: 13, fontWeight: 700, cursor: canProceed() ? "pointer" : "not-allowed", fontFamily: "inherit" }}
          >
            {step === 2 ? "Review and pay" : "Continue"}
          </button>
        )}
      </div>
    </div>
  );
}
