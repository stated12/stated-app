"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { createClient } from "@/lib/supabase/client";

const INDIVIDUAL_PLANS = [
  { key: "ind_499",  name: "Starter",     price: 499,  credits: 20, updates: 5,  badge: null,     features: ["20 credits", "5 updates per commitment", "Analytics unlocked", "Public profile"] },
  { key: "ind_899",  name: "Growth",      price: 899,  credits: 40, updates: 10, badge: "Popular", features: ["40 credits", "10 updates per commitment", "Analytics unlocked", "PRO badge", "Extended insights"] },
  { key: "ind_1299", name: "Pro Creator", price: 1299, credits: 60, updates: 15, badge: null,     features: ["60 credits", "15 updates per commitment", "Analytics unlocked", "PRO badge", "Extended insights"] },
];

const COMPANY_PLANS = [
  { key: "comp_1999", name: "Team",   price: 1999, credits: 25, members: 5,  updates: 5,  badge: null,     features: ["25 shared credits", "Up to 5 members", "5 updates per commitment", "Company analytics"] },
  { key: "comp_2999", name: "Growth", price: 2999, credits: 50, members: 10, updates: 10, badge: "Popular", features: ["50 shared credits", "Up to 10 members", "10 updates per commitment", "Company analytics"] },
  { key: "comp_4999", name: "Scale",  price: 4999, credits: 75, members: 15, updates: 15, badge: null,     features: ["75 shared credits", "Up to 15 members", "15 updates per commitment", "Company analytics"] },
];

const CREDIT_PACKS = [
  { key: "pack_10", credits: 10, price: 199 },
  { key: "pack_25", credits: 25, price: 399 },
  { key: "pack_50", credits: 50, price: 699 },
];

export default function UpgradePage() {
  const supabase = createClient();
  const [currentPlan, setCurrentPlan] = useState("free");
  const [credits, setCredits] = useState(0);
  const [userType, setUserType] = useState<"individual" | "company_owner" | "company_member">("individual");
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase.from("profiles").select("plan_key, credits").eq("id", user.id).maybeSingle();

      // Check company ownership
      const { data: ownedCompany } = await supabase.from("companies").select("id, plan_key, credits").eq("owner_user_id", user.id).maybeSingle();
      if (ownedCompany) {
        setUserType("company_owner");
        setCurrentPlan(ownedCompany.plan_key || "free");
        setCredits(ownedCompany.credits || 0);
        setLoading(false);
        return;
      }

      // Check membership
      const { data: membership } = await supabase.from("company_members").select("id").eq("user_id", user.id).neq("role", "owner").maybeSingle();
      if (membership) { setUserType("company_member"); }

      setCurrentPlan(profile?.plan_key || "free");
      setCredits(profile?.credits || 0);
      setLoading(false);
    }
    load();
  }, []);

  async function handlePurchase(planKey: string) {
    setPurchasing(planKey);
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey }),
      });
      const data = await res.json();
      if (!res.ok || !data.orderId) { alert(data.error || "Payment initialization failed"); setPurchasing(null); return; }
      if (!(window as any).Razorpay) { alert("Payment system failed to load. Please refresh."); setPurchasing(null); return; }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        order_id: data.orderId,
        handler: async (response: any) => {
          await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, planKey }),
          });
          window.location.href = "/dashboard";
        },
        theme: { color: "#4338ca" },
      };
      new (window as any).Razorpay(options).open();
    } catch { alert("Payment failed to start."); }
    setPurchasing(null);
  }

  const isIndividualPaid = currentPlan.startsWith("ind_");
  const isCompanyPaid    = currentPlan.startsWith("comp_");
  const plans = userType === "company_owner" ? COMPANY_PLANS : INDIVIDUAL_PLANS;

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" }}>
      <div style={{ fontSize: 13, color: "#9ca3af" }}>Loading...</div>
    </div>
  );

  if (userType === "company_member") return (
    <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", textAlign: "center", maxWidth: 400 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🏢</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#0f0c29", marginBottom: 8 }}>Company plan managed by owner</div>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>Only the company owner can upgrade or purchase credits for the company account.</div>
        <Link href="/dashboard" style={{ display: "inline-block", background: "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", padding: "11px 28px", borderRadius: 22, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>← Back to Dashboard</Link>
      </div>
    </div>
  );

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div style={{ minHeight: "100vh", background: "#f2f3f7", padding: "24px 16px 60px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Image src="/logo.png" alt="" width={32} height={32} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#4338ca" }}>Stated</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>{userType === "company_owner" ? "Company Plan" : "Upgrade Plan"}</div>
              </div>
            </div>
            <Link href="/dashboard" style={{ fontSize: 12, color: "#6b7280", textDecoration: "none", fontWeight: 600 }}>← Dashboard</Link>
          </div>

          {/* Current status */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "16px 20px", marginBottom: 24, border: "1px solid #f0f1f6", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Current Plan</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#0f0c29" }}>
                {currentPlan === "free" ? "Free" :
                 currentPlan === "ind_499" ? "Starter" :
                 currentPlan === "ind_899" ? "Growth" :
                 currentPlan === "ind_1299" ? "Pro Creator" :
                 currentPlan === "comp_1999" ? "Team" :
                 currentPlan === "comp_2999" ? "Growth" :
                 currentPlan === "comp_4999" ? "Scale" : currentPlan}
              </div>
            </div>
            <div style={{ textAlign: "right" as const }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Credits</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: userType === "company_owner" ? "#0891b2" : "#d97706" }}>
                {userType === "company_owner" ? "🏢" : "⭐"} {credits}
              </div>
            </div>
          </div>

          {/* Free tier info */}
          {currentPlan === "free" && (
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "12px 16px", marginBottom: 24, fontSize: 13, color: "#92400e", lineHeight: 1.6 }}>
              <strong>Free plan:</strong> 5 credits, 2 updates per commitment, no analytics, {userType === "company_owner" ? "2 team members" : "no PRO badge"}.
              Upgrade to unlock more features.
            </div>
          )}

          {/* Plans */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0f0c29", marginBottom: 16 }}>
              {userType === "company_owner" ? "Company Plans" : "Individual Plans"}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {plans.map((plan) => {
                const isCurrent = currentPlan === plan.key;
                const isPopular = plan.badge === "Popular";
                return (
                  <div key={plan.key} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: `2px solid ${isPopular ? "#4338ca" : isCurrent ? "#10b981" : "#f0f1f6"}`, boxShadow: isPopular ? "0 4px 20px rgba(67,56,202,0.12)" : "0 1px 8px rgba(0,0,0,0.04)", position: "relative" as const }}>
                    {isPopular && <div style={{ background: "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 0", textAlign: "center" as const, letterSpacing: 1 }}>⭐ MOST POPULAR</div>}
                    {isCurrent && <div style={{ background: "linear-gradient(135deg,#10b981,#059669)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 0", textAlign: "center" as const, letterSpacing: 1 }}>✓ CURRENT PLAN</div>}
                    <div style={{ height: 3, background: isPopular ? "linear-gradient(90deg,#4338ca,#818cf8)" : isCurrent ? "linear-gradient(90deg,#10b981,#34d399)" : "linear-gradient(90deg,#e8eaf2,#f0f1f6)" }} />
                    <div style={{ padding: "16px" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f0c29", marginBottom: 4 }}>{plan.name}</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: isPopular ? "#4338ca" : "#0f0c29", marginBottom: 12 }}>
                        ₹{plan.price}
                        <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 400 }}> one-time</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 16 }}>
                        {plan.features.map((f, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#374151" }}>
                            <span style={{ color: "#10b981", fontSize: 12 }}>✓</span> {f}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => !isCurrent && handlePurchase(plan.key)}
                        disabled={isCurrent || purchasing === plan.key}
                        style={{ width: "100%", padding: "11px", borderRadius: 12, border: "none", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: isCurrent ? "not-allowed" : "pointer", background: isCurrent ? "#f3f4f6" : isPopular ? "linear-gradient(135deg,#4338ca,#6366f1)" : "linear-gradient(135deg,#374151,#4b5563)", color: isCurrent ? "#9ca3af" : "#fff", boxShadow: isCurrent ? "none" : "0 3px 10px rgba(0,0,0,0.15)" }}
                      >
                        {purchasing === plan.key ? "Opening..." : isCurrent ? "Current Plan" : "Choose Plan"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Credit packs — shown when on any paid plan OR always available */}
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0f0c29", marginBottom: 6 }}>Credit Packs</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.5 }}>
              Just want more credits without changing your plan? Buy a pack anytime — no plan required.
              {currentPlan === "free" && <span style={{ color: "#f59e0b", fontWeight: 600 }}> Note: analytics and other features require a plan upgrade.</span>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {CREDIT_PACKS.map((pack) => (
                <div key={pack.key} style={{ background: "#fff", borderRadius: 14, padding: "16px", border: "1px solid #f0f1f6", textAlign: "center" as const, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{pack.credits >= 50 ? "💎" : pack.credits >= 25 ? "💰" : "⭐"}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0f0c29", marginBottom: 2 }}>{pack.credits} Credits</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#4338ca", marginBottom: 12 }}>₹{pack.price}</div>
                  <button
                    onClick={() => handlePurchase(pack.key)}
                    disabled={purchasing === pack.key}
                    style={{ width: "100%", padding: "9px", borderRadius: 10, border: "none", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer", background: purchasing === pack.key ? "#a5b4fc" : "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", boxShadow: "0 2px 8px rgba(67,56,202,0.2)" }}
                  >
                    {purchasing === pack.key ? "Opening..." : "Buy Pack"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div style={{ textAlign: "center" as const, fontSize: 12, color: "#9ca3af", marginTop: 32, lineHeight: 1.6 }}>
            Secure payments via Razorpay • One-time payment • Instant activation • No subscription<br />
            Need a custom plan? Email <span style={{ color: "#4338ca", fontWeight: 600 }}>hello@stated.in</span>
          </div>

        </div>
      </div>
    </>
  );
}
