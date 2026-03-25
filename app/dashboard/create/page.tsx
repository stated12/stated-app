"use client";

import { Suspense, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// ── Profanity ────────────────────────────────────────────────────────────────
const BANNED = [
  "fuck","fucking","fucker","shit","shitty","asshole","bitch","cunt",
  "dick","cock","pussy","bastard","damn","damnit","crap","wtf","stfu",
  "gtfo","nigger","nigga","faggot","fag","whore","slut","piss","pissed",
  "motherfucker","mofo","jackass","dumbass","retard","bollocks","bugger",
  "wanker","tosser","twat",
];
function hasProfanity(s: string): boolean {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, " ");
  return BANNED.some((w) => new RegExp("\\b" + w + "\\b").test(clean));
}

// ── Plan names ────────────────────────────────────────────────────────────────
const PLAN_NAMES: Record<string, string> = {
  free: "Free", ind_499: "Starter", ind_899: "Growth", ind_1299: "Pro Creator",
  comp_1999: "Team", comp_2999: "Growth", comp_4999: "Scale",
};

// ── Categories ────────────────────────────────────────────────────────────────
const IND_CATS = [
  { label: "Fitness",                      e: "\uD83D\uDCAA" },
  { label: "Learning",                     e: "\uD83D\uDCDA" },
  { label: "Writing",                      e: "\u270D\uFE0F" },
  { label: "Health",                       e: "\u2764\uFE0F" },
  { label: "Finance",                      e: "\uD83D\uDCB0" },
  { label: "Business",                     e: "\uD83D\uDE80" },
  { label: "Career / Leadership",          e: "\uD83C\uDFC6" },
  { label: "Mental Health / Wellbeing",    e: "\uD83E\uDDE0" },
  { label: "Relationships / Community",    e: "\uD83E\uDD1D" },
  { label: "Sustainability / Environment", e: "\uD83C\uDF31" },
];
const CO_CATS = [
  { label: "Marketing",            e: "\uD83D\uDCE3" },
  { label: "Sales",                e: "\uD83D\uDCC8" },
  { label: "Operations",           e: "\u2699\uFE0F" },
  { label: "Product",              e: "\uD83D\uDCE6" },
  { label: "Strategic",            e: "\uD83C\uDFAF" },
  { label: "Announcements",        e: "\uD83D\uDCE2" },
  { label: "Innovation & R&D",     e: "\uD83D\uDD2C" },
  { label: "Culture & People",     e: "\uD83E\uDEC2" },
  { label: "ESG / Sustainability", e: "\uD83C\uDF0D" },
  { label: "Community & CSR",      e: "\uD83D\uDC9A" },
  { label: "Finance",              e: "\uD83D\uDCB0" },
  { label: "Legal & Compliance",   e: "\u2696\uFE0F" },
  { label: "Customer Success",     e: "\u2B50" },
];

// ── Deadline ──────────────────────────────────────────────────────────────────
const DEADLINES = [
  { v: "1w", l: "1 Week" }, { v: "2w", l: "2 Weeks" }, { v: "3w", l: "3 Weeks" },
  { v: "1m", l: "1 Month" }, { v: "3m", l: "3 Months" }, { v: "6m", l: "6 Months" },
  { v: "1y", l: "1 Year" }, { v: "custom", l: "Custom" },
];
function toDate(v: string, custom: string): string {
  if (v === "custom") return custom;
  const d = new Date();
  if (v === "1w") d.setDate(d.getDate() + 7);
  else if (v === "2w") d.setDate(d.getDate() + 14);
  else if (v === "3w") d.setDate(d.getDate() + 21);
  else if (v === "1m") d.setMonth(d.getMonth() + 1);
  else if (v === "3m") d.setMonth(d.getMonth() + 3);
  else if (v === "6m") d.setMonth(d.getMonth() + 6);
  else if (v === "1y") d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split("T")[0];
}

// ── Upgrade Modal ─────────────────────────────────────────────────────────────
function UpgradeModal(props: { onClose: () => void; isCompany: boolean; planName: string }) {
  const grad = props.isCompany
    ? "linear-gradient(135deg,#0891b2,#0e7490)"
    : "linear-gradient(135deg,#4338ca,#6366f1)";
  const shad = props.isCompany ? "rgba(8,145,178,0.3)" : "rgba(67,56,202,0.3)";
  return (
    <div
      onClick={props.onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,12,41,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 480, padding: "28px 24px 44px", boxShadow: "0 -8px 40px rgba(0,0,0,0.18)", animation: "slideUp 0.25s ease" }}
      >
        <div style={{ width: 36, height: 4, background: "#e5e7eb", borderRadius: 99, margin: "0 auto 22px" }} />
        <div style={{ width: 60, height: 60, borderRadius: 20, background: grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 18px", boxShadow: "0 8px 24px " + shad }}>
          {"\u2B50"}
        </div>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: "#0f0c29", marginBottom: 8 }}>No credits remaining</div>
          <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
            {"You've used all credits on the "}
            <strong>{props.planName}</strong>
            {" plan. Upgrade or buy a pack to keep publishing."}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
          <a href="/upgrade" style={{ display: "block", textAlign: "center", background: grad, color: "#fff", padding: "14px", borderRadius: 14, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px " + shad }}>
            View Plans &amp; Upgrade
          </a>
          <a href="/upgrade#credit-packs" style={{ display: "block", textAlign: "center", background: "#f8f9fc", border: "1.5px solid #e8eaf2", color: "#374151", padding: "13px", borderRadius: 14, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Buy a Credit Pack
          </a>
        </div>
        <button type="button" onClick={props.onClose} style={{ width: "100%", padding: "12px", background: "none", border: "none", fontSize: 13, color: "#9ca3af", cursor: "pointer", fontFamily: "inherit" }}>
          Maybe later
        </button>
      </div>
      <style>{`@keyframes slideUp { from { transform:translateY(100%); opacity:0 } to { transform:translateY(0); opacity:1 } }`}</style>
    </div>
  );
}

// ── Form ──────────────────────────────────────────────────────────────────────
function CreateCommitmentForm() {
  const supabase     = createClient();
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const [text, setText]             = useState("");
  const [cat, setCat]               = useState("");
  const [dl, setDl]                 = useState("");
  const [custom, setCustom]         = useState("");
  const [profile, setProfile]       = useState<any>(null);
  const [company, setCompany]       = useState<any>(null);
  const [loading, setLoading]       = useState(false);
  const [initLoad, setInitLoad]     = useState(true);
  const [showUp, setShowUp]         = useState(false);
  const [badWord, setBadWord]       = useState(false);

  const isCo = pathname.startsWith("/dashboard/company") || searchParams.get("workspace") === "company";
  const cats = isCo ? CO_CATS : IND_CATS;
  const ac   = isCo ? "#0891b2" : "#4338ca";
  const grad = isCo ? "linear-gradient(135deg,#0891b2,#0e7490)" : "linear-gradient(135deg,#4338ca,#6366f1)";

  useEffect(() => { loadUser(); }, []); // eslint-disable-line

  async function loadUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setProfile(p);
    if (isCo) {
      const { data: m } = await supabase.from("company_members").select("company_id").eq("user_id", user.id).maybeSingle();
      if (m) {
        const { data: co } = await supabase.from("companies").select("*").eq("id", m.company_id).single();
        setCompany(co);
      } else {
        const { data: co } = await supabase.from("companies").select("*").eq("owner_user_id", user.id).maybeSingle();
        if (co) setCompany(co);
      }
    }
    setInitLoad(false);
  }

  const src         = isCo && company ? company : profile;
  const credits     = (src?.credits ?? 0) as number;
  const planKey     = (src?.plan_key ?? "free") as string;
  const planName    = PLAN_NAMES[planKey] ?? planKey;
  const isLow       = credits > 0 && credits <= 2;

  function onTextChange(v: string) { setText(v); setBadWord(hasProfanity(v)); }

  async function deduct(uid: string): Promise<boolean> {
    if (credits <= 0) return false;
    const tbl = isCo && company ? "companies" : "profiles";
    const eid = isCo && company ? company.id : uid;
    const { error } = await supabase.from(tbl).update({ credits: credits - 1 }).eq("id", eid);
    if (error) return false;
    await supabase.from("credit_transactions").insert({ user_id: uid, amount: -1, type: "commitment_creation", description: "Commitment: " + text.trim().slice(0, 60) });
    return true;
  }

  async function rollback(uid: string) {
    const tbl = isCo && company ? "companies" : "profiles";
    const eid = isCo && company ? company.id : uid;
    await supabase.from(tbl).update({ credits: credits }).eq("id", eid);
    await supabase.from("credit_transactions").insert({ user_id: uid, amount: 1, type: "commitment_creation_rollback", description: "Rollback after failed insert" });
  }

  async function submit() {
    if (!text.trim()) { alert("Please write your commitment"); return; }
    if (hasProfanity(text)) { setBadWord(true); return; }
    if (!cat) { alert("Please select a category"); return; }
    if (!dl) { alert("Please select a deadline"); return; }
    if (dl === "custom" && !custom) { alert("Please pick a custom date"); return; }
    if (credits <= 0) { setShowUp(true); return; }
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const ok = await deduct(user.id);
    if (!ok) { setShowUp(true); setLoading(false); return; }
    const row: Record<string, unknown> = { text: text.trim(), category: cat, target_date: toDate(dl, custom), status: "active" };
    if (isCo && company) { row.company_id = company.id; row.created_by_user_id = user.id; }
    else { row.user_id = user.id; }
    const { error } = await supabase.from("commitments").insert(row);
    if (error) { await rollback(user.id); alert(error.message); setLoading(false); return; }
    router.push(isCo && company ? "/dashboard/company" : "/dashboard");
  }

  if (initLoad) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" }}>
        <div style={{ fontSize: 13, color: "#9ca3af" }}>Loading...</div>
      </div>
    );
  }

  const btnLabel = loading ? "Publishing..." : badWord ? "Inappropriate language" : credits <= 0 ? "Get Credits to Publish" : "Publish Commitment";
  const btnBg    = loading ? "#9ca3af" : badWord ? "#fee2e2" : credits <= 0 ? "#fee2e2" : grad;
  const btnColor = badWord || credits <= 0 ? "#dc2626" : "#fff";
  const btnBorder = badWord || credits <= 0 ? "1.5px solid #fecaca" : "none";

  return (
    <div style={{ margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh" }}>

      {showUp && <UpgradeModal onClose={() => setShowUp(false)} isCompany={!!(isCo && company)} planName={planName} />}

      <div style={{ background: "#fff", padding: "16px 16px 14px", borderBottom: "1px solid #f0f1f6" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>
              {isCo && company ? "Create for " + company.name : "Create Commitment"}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>
              {isCo && company ? "This will appear on your company profile" : "This will appear on your public profile"}
            </div>
          </div>
          <div
            onClick={() => { if (credits <= 0) setShowUp(true); }}
            style={{ display: "flex", alignItems: "center", gap: 5, background: credits <= 0 ? "#fef2f2" : isLow ? "#fef3c7" : "#f0f9ff", border: "1px solid " + (credits <= 0 ? "#fecaca" : isLow ? "#fde68a" : "#bae6fd"), borderRadius: 20, padding: "5px 10px", cursor: credits <= 0 ? "pointer" : "default" }}
          >
            <span style={{ fontSize: 12 }}>{isCo && company ? "\uD83C\uDFE2" : "\u2B50"}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: credits <= 0 ? "#dc2626" : isLow ? "#92400e" : "#0369a1" }}>
              {credits <= 0 ? "0 credits" : credits + " left"}
            </span>
          </div>
        </div>

        {isLow && (
          <div style={{ marginTop: 10, background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, color: "#92400e", fontWeight: 600 }}>Only {credits} credit{credits !== 1 ? "s" : ""} left on {planName}</span>
            <a href="/upgrade" style={{ fontSize: 11, color: ac, fontWeight: 700, textDecoration: "none" }}>Upgrade</a>
          </div>
        )}

        {credits <= 0 && (
          <div style={{ marginTop: 10, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, color: "#dc2626", fontWeight: 600 }}>No credits remaining on {planName}</span>
            <a href="/upgrade" style={{ fontSize: 11, color: "#dc2626", fontWeight: 700, textDecoration: "none" }}>Upgrade</a>
          </div>
        )}
      </div>

      <div style={{ padding: 16 }}>

        {isCo && company && (
          <div style={{ background: "#e0f2fe", border: "1px solid #bae6fd", borderRadius: 12, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
              {company.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0e7490" }}>Posting as {company.name}</div>
              <div style={{ fontSize: 10, color: "#0891b2" }}>Company commitment</div>
            </div>
          </div>
        )}

        <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid " + (badWord ? "#fca5a5" : "#f0f1f6") }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8, letterSpacing: 0.3 }}>
            Your commitment
          </label>
          <textarea
            placeholder="I commit to..."
            value={text}
            maxLength={280}
            onChange={(e) => onTextChange(e.target.value)}
            rows={4}
            style={{ width: "100%", border: "1.5px solid " + (badWord ? "#fca5a5" : "#e8eaf2"), borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#0f0c29", outline: "none", fontFamily: "inherit", background: badWord ? "#fff5f5" : "#f8f9fc", resize: "none", lineHeight: 1.6, boxSizing: "border-box" }}
          />
          {badWord ? (
            <div style={{ marginTop: 8, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "8px 10px", display: "flex", alignItems: "flex-start", gap: 7 }}>
              <span style={{ fontSize: 13, flexShrink: 0 }}>{"\uD83D\uDEAB"}</span>
              <span style={{ fontSize: 12, color: "#dc2626", fontWeight: 600, lineHeight: 1.5 }}>
                This platform is for positive public commitments. Inappropriate language is not allowed.
              </span>
            </div>
          ) : (
            <div style={{ fontSize: 11, color: text.length > 250 ? "#ef4444" : "#9ca3af", marginTop: 6, textAlign: "right" }}>
              {text.length} / 280
            </div>
          )}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #f0f1f6" }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 10, letterSpacing: 0.3 }}>
            Category
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {cats.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setCat(c.label)}
                style={{ padding: "7px 13px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: "1.5px solid " + (cat === c.label ? ac : "#e8eaf2"), background: cat === c.label ? ac : "#fff", color: cat === c.label ? "#fff" : "#6b7280", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}
              >
                <span>{c.e}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 20, border: "1px solid #f0f1f6" }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 10, letterSpacing: 0.3 }}>
            Deadline
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {DEADLINES.map((d) => (
              <button
                key={d.v}
                type="button"
                onClick={() => setDl(d.v)}
                style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: "1.5px solid " + (dl === d.v ? ac : "#e8eaf2"), background: dl === d.v ? ac : "#fff", color: dl === d.v ? "#fff" : "#6b7280", cursor: "pointer", fontFamily: "inherit" }}
              >
                {d.l}
              </button>
            ))}
          </div>
          {dl === "custom" && (
            <input
              type="date"
              value={custom}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setCustom(e.target.value)}
              style={{ marginTop: 12, width: "100%", border: "1px solid #e8eaf2", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#0f0c29", outline: "none", fontFamily: "inherit", background: "#f8f9fc", boxSizing: "border-box" }}
            />
          )}
        </div>

        <button
          type="button"
          disabled={loading || badWord}
          onClick={credits <= 0 ? () => setShowUp(true) : submit}
          style={{ width: "100%", padding: "14px", background: btnBg, border: btnBorder, borderRadius: 14, color: btnColor, fontSize: 14, fontWeight: 700, cursor: loading || badWord ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: loading || badWord || credits <= 0 ? "none" : "0 4px 14px rgba(" + (isCo && company ? "8,145,178" : "67,56,202") + ",0.3)" }}
        >
          {btnLabel}
        </button>

        {!badWord && credits > 0 && (
          <div style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", marginTop: 8 }}>
            {"1 credit used on publish \u2022 " + credits + " remaining on " + planName}
          </div>
        )}

        {badWord && (
          <div style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", marginTop: 8 }}>
            Stated is a public accountability platform - keep it professional
          </div>
        )}

      </div>

    </div>
  );
}

// ── Page wrapper ──────────────────────────────────────────────────────────────
export default function CreateCommitmentPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh"
