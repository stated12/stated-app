"use client";

import React, { Suspense, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const e = React.createElement;

// ------------ Profanity
const BANNED = [
  "fuck","fucking","fucker","shit","shitty","asshole","bitch","cunt",
  "dick","cock","pussy","bastard","crap","wtf","stfu","gtfo",
  "nigger","nigga","faggot","fag","whore","slut","piss","pissed",
  "motherfucker","mofo","jackass","dumbass","retard",
  "bollocks","bugger","wanker","tosser","twat",
];
function hasProfanity(s: string): boolean {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, " ");
  return BANNED.some((w) => new RegExp("\\b" + w + "\\b").test(clean));
}

// ------------ Plan names
const PLAN_NAMES: Record<string, string> = {
  free: "Free", ind_499: "Starter", ind_899: "Growth", ind_1299: "Pro Creator",
  comp_1999: "Team", comp_2999: "Growth", comp_4999: "Scale",
};

// ------------ Categories
const IND_CATS = [
  { label: "Fitness" }, { label: "Learning" }, { label: "Writing" },
  { label: "Health" }, { label: "Finance" }, { label: "Business" },
  { label: "Career / Leadership" }, { label: "Mental Health / Wellbeing" },
  { label: "Relationships / Community" }, { label: "Sustainability / Environment" },
];
const CO_CATS = [
  { label: "Marketing" }, { label: "Sales" }, { label: "Operations" },
  { label: "Product" }, { label: "Strategic" }, { label: "Announcements" },
  { label: "Innovation & R&D" }, { label: "Culture & People" },
  { label: "ESG / Sustainability" }, { label: "Community & CSR" },
  { label: "Finance" }, { label: "Legal & Compliance" }, { label: "Customer Success" },
];

// ------------ Deadline
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

// ------------ Styles
const S = {
  page:    { margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh" } as React.CSSProperties,
  header:  { background: "#fff", padding: "16px 16px 14px", borderBottom: "1px solid #f0f1f6" } as React.CSSProperties,
  hrow:    { display: "flex", alignItems: "center", justifyContent: "space-between" } as React.CSSProperties,
  htitle:  { fontSize: 15, fontWeight: 700, color: "#0f0c29" } as React.CSSProperties,
  hsub:    { fontSize: 11, color: "#9ca3af", marginTop: 1 } as React.CSSProperties,
  body:    { padding: 16 } as React.CSSProperties,
  card:    (border?: string): React.CSSProperties => ({ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, border: border || "1px solid #f0f1f6" }),
  lbl:     { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8, letterSpacing: 0.3 } as React.CSSProperties,
  lblGap:  { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 10, letterSpacing: 0.3 } as React.CSSProperties,
  chips:   { display: "flex", flexWrap: "wrap", gap: 8 } as React.CSSProperties,
  charCnt: (over: boolean): React.CSSProperties => ({ fontSize: 11, color: over ? "#ef4444" : "#9ca3af", marginTop: 6, textAlign: "right" }),
};

// ------------ Upgrade Modal
function UpgradeModal(props: { onClose: () => void; isCo: boolean; planName: string }) {
  const grad = props.isCo ? "linear-gradient(135deg,#0891b2,#0e7490)" : "linear-gradient(135deg,#4338ca,#6366f1)";
  const shad = props.isCo ? "rgba(8,145,178,0.3)" : "rgba(67,56,202,0.3)";

  return e("div", {
    onClick: props.onClose,
    style: { position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,12,41,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-end", justifyContent: "center" } as React.CSSProperties,
  },
    e("div", {
      onClick: (ev: React.MouseEvent) => ev.stopPropagation(),
      style: { background: "#fff", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 480, padding: "28px 24px 44px", boxShadow: "0 -8px 40px rgba(0,0,0,0.18)" } as React.CSSProperties,
    },
      e("div", { style: { width: 36, height: 4, background: "#e5e7eb", borderRadius: 99, margin: "0 auto 22px" } as React.CSSProperties }),
      e("div", { style: { textAlign: "center", marginBottom: 26 } as React.CSSProperties },
        e("div", { style: { fontSize: 19, fontWeight: 800, color: "#0f0c29", marginBottom: 8 } as React.CSSProperties }, "No credits remaining"),
        e("div", { style: { fontSize: 13, color: "#6b7280", lineHeight: 1.7 } as React.CSSProperties },
          "You have used all credits on the ", e("strong", null, props.planName), " plan. Upgrade or buy a pack to keep publishing."
        ),
      ),
      e("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 } as React.CSSProperties },
        e("a", { href: "/upgrade", style: { display: "block", textAlign: "center", background: grad, color: "#fff", padding: "14px", borderRadius: 14, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px " + shad } as React.CSSProperties }, "View Plans and Upgrade"),
        e("a", { href: "/upgrade#credit-packs", style: { display: "block", textAlign: "center", background: "#f8f9fc", border: "1.5px solid #e8eaf2", color: "#374151", padding: "13px", borderRadius: 14, fontSize: 14, fontWeight: 600, textDecoration: "none" } as React.CSSProperties }, "Buy a Credit Pack"),
      ),
      e("button", { type: "button", onClick: props.onClose, style: { width: "100%", padding: "12px", background: "none", border: "none", fontSize: 13, color: "#9ca3af", cursor: "pointer", fontFamily: "inherit" } as React.CSSProperties }, "Maybe later"),
    ),
  );
}

// ------------ Fallback UI
function FallbackUI() {
  return e("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" } as React.CSSProperties },
    e("div", { style: { fontSize: 13, color: "#9ca3af" } as React.CSSProperties }, "Loading...")
  );
}

// ------------ Form
function CreateCommitmentForm() {
  const supabase     = createClient();
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const [text,     setText]     = useState("");
  const [cat,      setCat]      = useState("");
  const [dl,       setDl]       = useState("");
  const [custom,   setCustom]   = useState("");
  const [profile,  setProfile]  = useState<any>(null);
  const [company,  setCompany]  = useState<any>(null);
  const [loading,  setLoading]  = useState(false);
  const [initLoad, setInitLoad] = useState(true);
  const [showUp,   setShowUp]   = useState(false);
  const [badWord,  setBadWord]  = useState(false);

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

  const src      = isCo && company ? company : profile;
  const credits  = (src?.credits ?? 0) as number;
  const planKey  = (src?.plan_key ?? "free") as string;
  const planName = PLAN_NAMES[planKey] ?? planKey;
  const isLow    = credits > 0 && credits <= 2;

  function onTextChange(v: string) { setText(v); setBadWord(hasProfanity(v)); }

  async function deduct(uid: string): Promise<boolean> {
    if (credits <= 0) return false;
    const tbl = isCo && company ? "companies" : "profiles";
    const eid = isCo && company ? company.id  : uid;
    const { error } = await supabase.from(tbl).update({ credits: credits - 1 }).eq("id", eid);
    if (error) return false;
    await supabase.from("credit_transactions").insert({
      user_id: uid, amount: -1, type: "commitment_creation",
      description: "Commitment: " + text.trim().slice(0, 60),
    });
    return true;
  }

  async function rollback(uid: string) {
    const tbl = isCo && company ? "companies" : "profiles";
    const eid = isCo && company ? company.id  : uid;
    await supabase.from(tbl).update({ credits }).eq("id", eid);
    await supabase.from("credit_transactions").insert({
      user_id: uid, amount: 1, type: "commitment_creation_rollback",
      description: "Rollback after failed insert",
    });
  }

  async function submit() {
    if (!text.trim())               { alert("Please write your commitment"); return; }
    if (hasProfanity(text))         { setBadWord(true); return; }
    if (!cat)                       { alert("Please select a category"); return; }
    if (!dl)                        { alert("Please select a deadline"); return; }
    if (dl === "custom" && !custom) { alert("Please pick a custom date"); return; }
    if (credits <= 0)               { setShowUp(true); return; }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const ok = await deduct(user.id);
    if (!ok) { setShowUp(true); setLoading(false); return; }

    const row: Record<string, unknown> = {
      text: text.trim(), category: cat, target_date: toDate(dl, custom), status: "active",
    };
    if (isCo && company) { row.company_id = company.id; row.created_by_user_id = user.id; }
    else { row.user_id = user.id; }

    const { error } = await supabase.from("commitments").insert(row);
    if (error) { await rollback(user.id); alert(error.message); setLoading(false); return; }
    router.push(isCo && company ? "/dashboard/company" : "/dashboard");
  }

  if (initLoad) {
    return e("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" } as React.CSSProperties },
      e("div", { style: { fontSize: 13, color: "#9ca3af" } as React.CSSProperties }, "Loading...")
    );
  }

  // ------------ Render
  const btnDisabled = loading || badWord;
  const btnBg     = badWord ? "#fee2e2" : loading ? "#9ca3af" : credits <= 0 ? "#fee2e2" : grad;
  const btnColor  = badWord || credits <= 0 ? "#dc2626" : "#fff";
  const btnBorder = badWord || credits <= 0 ? "1.5px solid #fecaca" : "none";
  const btnLabel  = loading ? "Publishing..." : badWord ? "Inappropriate language detected" : credits <= 0 ? "Get Credits to Publish" : "Publish Commitment";
  const btnShadow = btnDisabled || credits <= 0 ? "none" : "0 4px 14px rgba(" + (isCo && company ? "8,145,178" : "67,56,202") + ",0.3)";

  return e("div", { style: S.page },

    showUp ? e(UpgradeModal, { onClose: () => setShowUp(false), isCo: !!(isCo && company), planName }) : null,

    // Header
    e("div", { style: S.header },
      e("div", { style: S.hrow },
        e("div", null,
          e("div", { style: S.htitle }, isCo && company ? "Create for " + company.name : "Create Commitment"),
          e("div", { style: S.hsub }, isCo && company ? "This will appear on your company profile" : "This will appear on your public profile"),
        ),
        e("div", {
          onClick: () => { if (credits <= 0) setShowUp(true); },
          style: { display: "flex", alignItems: "center", gap: 5, background: credits <= 0 ? "#fef2f2" : isLow ? "#fef3c7" : "#f0f9ff", border: "1px solid " + (credits <= 0 ? "#fecaca" : isLow ? "#fde68a" : "#bae6fd"), borderRadius: 20, padding: "5px 10px", cursor: credits <= 0 ? "pointer" : "default" } as React.CSSProperties,
        },
          e("span", { style: { fontSize: 12, fontWeight: 700, color: credits <= 0 ? "#dc2626" : isLow ? "#92400e" : "#0369a1" } as React.CSSProperties },
            credits <= 0 ? "0 credits" : credits + " left"
          ),
        ),
      ),
      isLow ? e("div", { style: { marginTop: 10, background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" } as React.CSSProperties },
        e("span", { style: { fontSize: 11, color: "#92400e", fontWeight: 600 } as React.CSSProperties }, "Only " + credits + " credit" + (credits !== 1 ? "s" : "") + " left on " + planName),
        e("a", { href: "/upgrade", style: { fontSize: 11, color: ac, fontWeight: 700, textDecoration: "none" } as React.CSSProperties }, "Upgrade"),
      ) : null,
      credits <= 0 ? e("div", { style: { marginTop: 10, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" } as React.CSSProperties },
        e("span", { style: { fontSize: 11, color: "#dc2626", fontWeight: 600 } as React.CSSProperties }, "No credits remaining on " + planName),
        e("a", { href: "/upgrade", style: { fontSize: 11, color: "#dc2626", fontWeight: 700, textDecoration: "none" } as React.CSSProperties }, "Upgrade"),
      ) : null,
    ),

    // Body
    e("div", { style: S.body },

      // Company badge
      isCo && company ? e("div", { style: { background: "#e0f2fe", border: "1px solid #bae6fd", borderRadius: 12, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 } as React.CSSProperties },
        e("div", { style: { width: 28, height: 28, borderRadius: 7, background: grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff", flexShrink: 0 } as React.CSSProperties }, company.name.charAt(0)),
        e("div", null,
          e("div", { style: { fontSize: 12, fontWeight: 700, color: "#0e7490" } as React.CSSProperties }, "Posting as " + company.name),
          e("div", { style: { fontSize: 10, color: "#0891b2" } as React.CSSProperties }, "Company commitment"),
        ),
      ) : null,

      // Text card
      e("div", { style: S.card(badWord ? "1px solid #fca5a5" : undefined) },
        e("label", { style: S.lbl }, "Your commitment"),
        e("textarea", {
          placeholder: "I commit to...",
          value: text,
          maxLength: 280,
          onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => onTextChange(ev.target.value),
          rows: 4,
          style: { width: "100%", border: "1.5px solid " + (badWord ? "#fca5a5" : "#e8eaf2"), borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#0f0c29", outline: "none", fontFamily: "inherit", background: badWord ? "#fff5f5" : "#f8f9fc", resize: "none", lineHeight: 1.6, boxSizing: "border-box" } as React.CSSProperties,
        }),
        badWord
          ? e("div", { style: { marginTop: 8, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "8px 10px" } as React.CSSProperties },
              e("span", { style: { fontSize: 12, color: "#dc2626", fontWeight: 600, lineHeight: 1.5 } as React.CSSProperties }, "This platform is for positive public commitments. Inappropriate language is not allowed.")
            )
          : e("div", { style: S.charCnt(text.length > 250) }, text.length + " / 280"),
      ),

      // Category card
      e("div", { style: S.card() },
        e("label", { style: S.lblGap }, "Category"),
        e("div", { style: S.chips },
          ...cats.map((c) =>
            e("button", {
              key: c.label,
              type: "button",
              onClick: () => setCat(c.label),
              style: { padding: "7px 13px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: "1.5px solid " + (cat === c.label ? ac : "#e8eaf2"), background: cat === c.label ? ac : "#fff", color: cat === c.label ? "#fff" : "#6b7280", cursor: "pointer", fontFamily: "inherit" } as React.CSSProperties,
            }, c.label)
          ),
        ),
      ),

      // Deadline card
      e("div", { style: { ...S.card(), marginBottom: 20 } },
        e("label", { style: S.lblGap }, "Deadline"),
        e("div", { style: S.chips },
          ...DEADLINES.map((d) =>
            e("button", {
              key: d.v,
              type: "button",
              onClick: () => setDl(d.v),
              style: { padding: "7px 13px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: "1.5px solid " + (dl === d.v ? ac : "#e8eaf2"), background: dl === d.v ? ac : "#fff", color: dl === d.v ? "#fff" : "#6b7280", cursor: "pointer", fontFamily: "inherit" } as React.CSSProperties,
            }, d.l)
          ),
        ),
        dl === "custom" ? e("input", {
          type: "date",
          value: custom,
          onChange: (ev: React.ChangeEvent<HTMLInputElement>) => setCustom(ev.target.value),
          min: new Date().toISOString().split("T")[0],
          style: { marginTop: 12, width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#0f0c29", outline: "none", fontFamily: "inherit", background: "#f8f9fc", boxSizing: "border-box" } as React.CSSProperties,
        }) : null,
      ),

      // Submit button
      e("button", {
        type: "button",
        disabled: btnDisabled,
        onClick: submit,
        style: { width: "100%", padding: "15px", borderRadius: 14, fontSize: 15, fontWeight: 700, border: btnBorder, background: btnBg, color: btnColor, cursor: btnDisabled ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: btnShadow, transition: "opacity 0.15s" } as React.CSSProperties,
      }, btnLabel),

    ), // end body
  ); // end page
}

// ------------ Page export with Suspense
export default function CreateCommitmentPage() {
  return e(Suspense, { fallback: e(FallbackUI, null) },
    e(CreateCommitmentForm, null)
  );
      }
