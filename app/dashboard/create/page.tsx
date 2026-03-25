"use client";

import { Suspense, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// ─── Profanity filter ─────────────────────────────────────────────────────────
const BANNED_WORDS = [
  "fuck","fucking","fucker","fck","f*ck","f**k",
  "shit","sh*t","s**t","shitty",
  "ass","asshole","a**hole",
  "bitch","b*tch","b**ch",
  "cunt","c*nt",
  "dick","d*ck","cock","c*ck",
  "pussy","p*ssy",
  "bastard","b*stard",
  "damn","damnit",
  "crap","wtf","stfu","gtfo",
  "nigger","nigga","n*gger","n*gga",
  "faggot","fag","f*g",
  "whore","wh*re","slut","sl*t",
  "piss","pissed",
  "motherfucker","mofo",
  "jackass","dumbass","dumb*ss",
  "retard","ret*rd",
  "bollocks","bugger","wanker","tosser","twat",
];

function containsProfanity(text: string): string | null {
  const lower = text.toLowerCase().replace(/[^a-z0-9*]/g, " ");
  for (const word of BANNED_WORDS) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    if (regex.test(lower)) return word;
  }
  return null;
}

// ─── Plan names (mirrors upgrade page) ───────────────────────────────────────
const PLAN_NAMES: Record<string, string> = {
  free:      "Free",
  ind_499:   "Starter",
  ind_899:   "Growth",
  ind_1299:  "Pro Creator",
  comp_1999: "Team",
  comp_2999: "Growth",
  comp_4999: "Scale",
};

// ─── Categories ───────────────────────────────────────────────────────────────
const INDIVIDUAL_CATEGORIES = [
  { label: "Fitness",                      emoji: "💪" },
  { label: "Learning",                     emoji: "📚" },
  { label: "Writing",                      emoji: "✍️" },
  { label: "Health",                       emoji: "🫀" },
  { label: "Finance",                      emoji: "💰" },
  { label: "Business",                     emoji: "🚀" },
  { label: "Career / Leadership",          emoji: "🏆" },
  { label: "Mental Health / Wellbeing",    emoji: "🧠" },
  { label: "Relationships / Community",    emoji: "🤝" },
  { label: "Sustainability / Environment", emoji: "🌱" },
];

const COMPANY_CATEGORIES = [
  { label: "Marketing",           emoji: "📣" },
  { label: "Sales",               emoji: "📈" },
  { label: "Operations",          emoji: "⚙️" },
  { label: "Product",             emoji: "📦" },
  { label: "Strategic",           emoji: "♟️" },
  { label: "Announcements",       emoji: "📢" },
  { label: "Innovation & R&D",    emoji: "🔬" },
  { label: "Culture & People",    emoji: "🫂" },
  { label: "ESG / Sustainability", emoji: "🌍" },
  { label: "Community & CSR",     emoji: "💚" },
  { label: "Finance",             emoji: "💰" },
  { label: "Legal & Compliance",  emoji: "⚖️" },
  { label: "Customer Success",    emoji: "⭐" },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────
const DEADLINE_OPTIONS = [
  { value: "1w",     label: "1 Week"   },
  { value: "2w",     label: "2 Weeks"  },
  { value: "3w",     label: "3 Weeks"  },
  { value: "1m",     label: "1 Month"  },
  { value: "3m",     label: "3 Months" },
  { value: "6m",     label: "6 Months" },
  { value: "1y",     label: "1 Year"   },
  { value: "custom", label: "Custom"   },
];

function calcDeadline(deadline: string, customDate: string): string {
  if (deadline === "custom") return customDate;
  const d = new Date();
  if (deadline === "1w") d.setDate(d.getDate() + 7);
  if (deadline === "2w") d.setDate(d.getDate() + 14);
  if (deadline === "3w") d.setDate(d.getDate() + 21);
  if (deadline === "1m") d.setMonth(d.getMonth() + 1);
  if (deadline === "3m") d.setMonth(d.getMonth() + 3);
  if (deadline === "6m") d.setMonth(d.getMonth() + 6);
  if (deadline === "1y") d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split("T")[0];
}

// ─── Upgrade Modal ────────────────────────────────────────────────────────────
function UpgradeModal({
  onClose,
  isCompany,
  planName,
}: {
  onClose: () => void;
  isCompany: boolean;
  planName: string;
}) {
  const gradient    = isCompany ? "linear-gradient(135deg,#0891b2,#0e7490)" : "linear-gradient(135deg,#4338ca,#6366f1)";
  const shadowColor = isCompany ? "rgba(8,145,178,0.3)" : "rgba(67,56,202,0.3)";

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(15,12,41,0.55)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "24px 24px 0 0",
          width: "100%", maxWidth: 480,
          padding: "28px 24px 44px",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          animation: "slideUp 0.25s cubic-bezier(0.34,1.1,0.64,1)",
        }}
      >
        <div style={{ width: 36, height: 4, background: "#e5e7eb", borderRadius: 99, margin: "0 auto 22px" }} />
        <div style={{
          width: 60, height: 60, borderRadius: 20, background: gradient,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, margin: "0 auto 18px",
          boxShadow: `0 8px 24px ${shadowColor}`,
        }}>
          ⭐
        </div>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: "#0f0c29", marginBottom: 8 }}>
            No credits remaining
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
            You've used all your credits on the <strong>{planName}</strong> plan.
            Upgrade or buy a credit pack to keep publishing.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
          <a
            href="/upgrade"
            style={{
              display: "block", textAlign: "center",
              background: gradient, color: "#fff",
              padding: "14px", borderRadius: 14,
              fontSize: 14, fontWeight: 700, textDecoration: "none",
              boxShadow: `0 4px 16px ${shadowColor}`,
            }}
          >
            View Plans &amp; Upgrade →
          </a>
          <a
            href="/upgrade#credit-packs"
            style={{
              display: "block", textAlign: "center",
              background: "#f8f9fc", border: "1.5px solid #e8eaf2",
              color: "#374151", padding: "13px", borderRadius: 14,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
            }}
          >
            💎 Buy a Credit Pack
          </a>
        </div>
        <button
          onClick={onClose}
          style={{
            width: "100%", padding: "12px", background: "none",
            border: "none", fontSize: 13, color: "#9ca3af",
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Maybe later
        </button>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────
function CreateCommitmentForm() {
  const supabase     = createClient();
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const [text, setText]             = useState("");
  const [category, setCategory]     = useState("");
  const [deadline, setDeadline]     = useState("");
  const [customDate, setCustomDate] = useState("");
  const [profile, setProfile]       = useState<any>(null);
  const [company, setCompany]       = useState<any>(null);
  const [loading, setLoading]       = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [profanityError, setProfanityError]     = useState("");

  const isCompanyWS =
    pathname.startsWith("/dashboard/company") ||
    searchParams.get("workspace") === "company";

  const categories     = isCompanyWS ? COMPANY_CATEGORIES : INDIVIDUAL_CATEGORIES;
  const accentColor    = isCompanyWS ? "#0891b2" : "#4338ca";
  const accentGradient = isCompanyWS
    ? "linear-gradient(135deg,#0891b2,#0e7490)"
    : "linear-gradient(135deg,#4338ca,#6366f1)";

  useEffect(() => { loadUser(); }, []);

  async function loadUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { data: profileData } = await supabase
      .from("profiles").select("*").eq("id", user.id).single();
    setProfile(profileData);

    if (isCompanyWS) {
      const { data: membership } = await supabase
        .from("company_members").select("company_id")
        .eq("user_id", user.id).maybeSingle();
      if (membership) {
        const { data: co } = await supabase
          .from("companies").select("*").eq("id", membership.company_id).single();
        setCompany(co);
      } else {
        const { data: ownedCo } = await supabase
          .from("companies").select("*").eq("owner_user_id", user.id).maybeSingle();
        if (ownedCo) setCompany(ownedCo);
      }
    }
    setInitialLoading(false);
  }

  // ── Derived credit state ───────────────────────────────────────────────────
  const creditSource           = isCompanyWS && company ? company : profile;
  const creditsLeft: number    = creditSource?.credits ?? 0;
  const planKey: string        = creditSource?.plan_key ?? "free";
  const planName: string       = PLAN_NAMES[planKey] ?? planKey;
  const isLowCredits           = creditsLeft > 0 && creditsLeft <= 2;

  // ── Text change with live profanity check ──────────────────────────────────
  function handleTextChange(val: string) {
    setText(val);
    const found = containsProfanity(val);
    if (found) {
      setProfanityError("This platform is for positive public commitments. Inappropriate language isn't allowed.");
    } else {
      setProfanityError("");
    }
  }

  // ── Credit helpers ─────────────────────────────────────────────────────────
  async function deductCredit(userId: string): Promise<boolean> {
    if (creditsLeft <= 0) return false;
    const table    = isCompanyWS && company ? "companies" : "profiles";
    const entityId = isCompanyWS && company ? company.id : userId;

    const { error } = await supabase
      .from(table)
      .update({ credits: creditsLeft - 1 })
      .eq("id", entityId);
    if (error) return false;

    await supabase.from("credit_transactions").insert({
      user_id:     userId,
      amount:      -1,
      type:        "commitment_creation",
      description: `Commitment created: ${text.trim().slice(0, 60)}`,
    });
    return true;
  }

  async function rollbackCredit(userId: string) {
    const table    = isCompanyWS && company ? "companies" : "profiles";
    const entityId = isCompanyWS && company ? company.id : userId;
    await supabase.from(table).update({ credits: creditsLeft }).eq("id", entityId);
    await supabase.from("credit_transactions").insert({
      user_id:     userId,
      amount:      1,
      type:        "commitment_creation_rollback",
      description: "Rollback: commitment insert failed after credit deduction",
    });
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit() {
    if (!text.trim())                         { alert("Please write your commitment"); return; }
    if (containsProfanity(text))              { setProfanityError("This platform is for positive public commitments. Inappropriate language isn't allowed."); return; }
    if (!category)                            { alert("Please select a category"); return; }
    if (!deadline)                            { alert("Please select a deadline"); return; }
    if (deadline === "custom" && !customDate) { alert("Please pick a custom date"); return; }
    if (creditsLeft <= 0)                     { setShowUpgradeModal(true); return; }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const deducted = await deductCredit(user.id);
    if (!deducted) { setShowUpgradeModal(true); setLoading(false); return; }

    const insertData: any = {
      text:        text.trim(),
      category,
      target_date: calcDeadline(deadline, customDate),
      status:      "active",
    };
    if (isCompanyWS && company) {
      insertData.company_id         = company.id;
      insertData.created_by_user_id = user.id;
    } else {
      insertData.user_id = user.id;
    }

    const { error } = await supabase.from("commitments").insert(insertData);
    if (error) {
      await rollbackCredit(user.id);
      alert(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push(isCompanyWS && company ? "/dashboard/company" : "/dashboard");
  }

  // ── Loading state ──────────────────────────────────────────────────────────
  if (initialLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" }}>
        <div style={{ fontSize: 13, color: "#9ca3af" }}>Loading...</div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  const submitDisabled = loading || !!profanityError;

  return (
    <>
      {showUpgradeModal && (
        <UpgradeModal
          onClose={() => setShowUpgradeModal(false)}
          isCompany={!!(isCompanyWS && company)}
          planName={planName}
        />
      )}

      <div style={{ margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh" }}>

        {/* ── Header ── */}
        <div style={{ background: "#fff", padding: "16px 16px 14px", borderBottom: "1px solid #f0f1f6" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>
                {isCompanyWS && company ? `Create for ${company.name}` : "Create Commitment"}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>
                {isCompanyWS && company
                  ? "This will appear on your company profile"
                  : "This will appear on your public profile"}
              </div>
            </div>

            {/* Credits pill */}
            <div
              onClick={() => { if (creditsLeft <= 0) setShowUpgradeModal(true); }}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                background: creditsLeft <= 0 ? "#fef2f2" : isLowCredits ? "#fef3c7" : "#f0f9ff",
                border: `1px solid ${creditsLeft <= 0 ? "#fecaca" : isLowCredits ? "#fde68a" : "#bae6fd"}`,
                borderRadius: 20, padding: "5px 10px",
                cursor: creditsLeft <= 0 ? "pointer" : "default",
              }}
            >
              <span style={{ fontSize: 12 }}>{isCompanyWS && company ? "🏢" : "⭐"}</span>
              <span style={{
                fontSize: 12, fontWeight: 700,
                color: creditsLeft <= 0 ? "#dc2626" : isLowCredits ? "#92400e" : "#0369a1",
              }}>
                {creditsLeft <= 0 ? "0 credits" : `${creditsLeft} left`}
              </span>
            </div>
          </div>

          {/* Low-credit warning */}
          {isLowCredits && (
            <div style={{
              marginTop: 10, background: "#fffbeb", border: "1px solid #fde68a",
              borderRadius: 10, padding: "8px 12px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 11, color: "#92400e", fontWeight: 600 }}>
                ⚠️ Only {creditsLeft} credit{creditsLeft !== 1 ? "s" : ""} left on {planName}
              </span>
              <a href="/upgrade" style={{ fontSize: 11, color: accentColor, fontWeight: 700, textDecoration: "none" }}>
                Upgrade →
              </a>
            </div>
          )}

          {/* Zero-credit warning */}
          {creditsLeft <= 0 && (
            <div style={{
              marginTop: 10, background: "#fef2f2", border: "1px solid #fecaca",
              borderRadius: 10, padding: "8px 12px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 11, color: "#dc2626", fontWeight: 600 }}>
                ✕ No credits remaining on {planName} plan
              </span>
              <a href="/upgrade" style={{ fontSize: 11, color: "#dc2626", fontWeight: 700, textDecoration: "none" }}>
                Upgrade →
              </a>
            </div>
          )}
        </div>

        <div style={{ padding: 16 }}>

          {/* ── Company badge ── */}
          {isCompanyWS && company && (
            <div style={{
              background: "#e0f2fe", border: "1px solid #bae6fd",
              borderRadius: 12, padding: "10px 14px", marginBottom: 16,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7, background: accentGradient,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 800, color: "#fff", flexShrink: 0,
              }}>
                {company.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0e7490" }}>Posting as {company.name}</div>
                <div style={{ fontSize: 10, color: "#0891b2" }}>Company commitment</div>
              </div>
            </div>
          )}

          {/* ── Commitment text ── */}
          <div style={{
            background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12,
            border: `1px solid ${profanityError ? "#fca5a5" : "#f0f1f6"}`,
          }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8, letterSpacing: 0.3 }}>
              Your commitment
            </label>
            <textarea
              placeholder="I commit to..."
              value={text}
              maxLength={280}
              onChange={(e) => handleTextChange(e.target.value)}
              rows={4}
              style={{
                width: "100%", border: `1.5px solid ${profanityError ? "#fca5a5" : "#e8eaf2"}`,
                borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#0f0c29",
                outline: "none", fontFamily: "inherit", background: profanityError ? "#fff5f5" : "#f8f9fc",
                resize: "none", lineHeight: 1.6, boxSizing: "border-box" as const,
              }}
            />
            {/* Profanity error */}
            {profanityError ? (
              <div style={{
                marginTop: 8, background: "#fef2f2", border: "1px solid #fecaca",
                borderRadius: 8, padding: "8px 10px",
                display: "flex", alignItems: "flex-start", gap: 7,
              }}>
                <span style={{ fontSize: 13, flexShrink: 0 }}>🚫</span>
                <span style={{ fontSize: 12, color: "#dc2626", fontWeight: 600, lineHeight: 1.5 }}>
                  {profanityError}
                </span>
              </div>
            ) : (
              <div style={{ fontSize: 11, color: text.length > 250 ? "#ef4444" : "#9ca3af", marginTop: 6, textAlign: "right" as const }}>
                {text.length} / 280
              </div>
            )}
          </div>

          {/* ── Category ── */}
          <div style={{ background: "#fff", borderRa
