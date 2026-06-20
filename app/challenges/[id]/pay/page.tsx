"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CHALLENGE_TYPES, CHALLENGE_PRICES, PLANS, type ChallengeType, type ChallengePlan } from "@/lib/challenges-config";

declare global { interface Window { Razorpay: any; } }

export default function PayChallengePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [challenge, setChallenge] = useState<any>(null);
  const [plan, setPlan]           = useState<ChallengePlan>("pro");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data } = await supabase
        .from("challenges")
        .select("id, title, type, status, plan, posted_by_user_id")
        .eq("id", id)
        .single();

      if (!data || data.posted_by_user_id !== user.id) {
        router.push("/dashboard/challenges"); return;
      }
      if (data.status !== "draft") {
        router.push(`/challenges/${id}`); return;
      }

      setChallenge(data);
      setPlan((data.plan as ChallengePlan) || "pro");
      setLoading(false);
    }
    load();

    if (!document.querySelector('script[src*="razorpay"]')) {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.head.appendChild(s);
    }
  }, [id, router]);

  async function handlePayment() {
    setError("");
    setSubmitting(true);
    try {
      // Create a new Razorpay order for the existing draft
      const res = await fetch("/api/challenges/create-order", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge_id: id, plan }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to create payment."); setSubmitting(false); return; }

      const { razorpay_order } = data;
      const priceINR = CHALLENGE_PRICES[challenge.type as ChallengeType][plan];
      const cfg = CHALLENGE_TYPES[challenge.type as ChallengeType];

      const options = {
        key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:      razorpay_order.amount,
        currency:    "INR",
        name:        "Stated",
        description: `${cfg.label} - ${PLANS[plan].label} plan`,
        order_id:    razorpay_order.id,
        handler: async (response: any) => {
          const activateRes = await fetch("/api/challenges/activate", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              challenge_id:        id,
              razorpay_order_id:   razorpay_order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              plan,
              amount_inr: priceINR,
            }),
          });
          const result = await activateRes.json();
          if (result.success) {
            router.push(`/challenges/${id}?posted=true`);
          } else {
            setError("Payment confirmed but activation failed. Contact hello@stated.in");
            setSubmitting(false);
          }
        },
        theme: { color: "#2563eb" },
        modal: { ondismiss: () => setSubmitting(false) },
      };

      new window.Razorpay(options).open();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
      <div style={{ width: 32, height: 32, border: "3px solid #e5e7eb", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!challenge) return null;

  const cfg      = CHALLENGE_TYPES[challenge.type as ChallengeType];
  const price    = CHALLENGE_PRICES[challenge.type as ChallengeType][plan];

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'DM Sans', sans-serif", padding: "40px 16px" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} *{box-sizing:border-box}`}</style>

      <div style={{ maxWidth: 480, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <button onClick={() => router.back()} style={{ background: "none", border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "6px 12px", fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}>Back</button>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: 0 }}>Complete Payment</h1>
        </div>

        {/* Challenge info */}
        <div style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "16px 18px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{cfg?.icon} {cfg?.label}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{challenge.title}</div>
          <div style={{ fontSize: 12, color: "#ef4444", marginTop: 6, fontWeight: 600 }}>Draft — payment needed to go live</div>
        </div>

        {/* Plan selection */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 10 }}>Select plan</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(["basic","pro","scale"] as ChallengePlan[]).map(p => {
              const pl = PLANS[p];
              const pPrice = CHALLENGE_PRICES[challenge.type as ChallengeType][p];
              if (pPrice === 0) return null;
              const selected = plan === p;
              return (
                <button key={p} onClick={() => setPlan(p)}
                  style={{ textAlign: "left", background: selected ? "#eff6ff" : "#fff", border: `2px solid ${selected ? "#2563eb" : "#e5e7eb"}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                  {pl.badge && <div style={{ position: "absolute", top: -8, right: 12, background: "#2563eb", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{pl.badge}</div>}
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${selected ? "#2563eb" : "#d1d5db"}`, background: selected ? "#2563eb" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {selected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: selected ? "#2563eb" : "#0f172a" }}>Rs.{pPrice.toLocaleString("en-IN")}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{pl.label}</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {[`${pl.durationDays} days`, `${pl.maxSubmissions >= 999999 ? "Unlimited" : pl.maxSubmissions} submissions`, `${pl.emailInvites} invites`, pl.featured ? "Featured" : null].filter(Boolean).map((f, i) => (
                        <span key={i} style={{ fontSize: 10, color: "#6b7280", background: "#f8fafc", border: "1px solid #e5e7eb", padding: "2px 7px", borderRadius: 5 }}>{f}</span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div style={{ background: "#f8fafc", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "16px 18px", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Order summary</div>
          {[
            { label: `${cfg?.label} - ${PLANS[plan].label}`, val: `Rs.${price.toLocaleString("en-IN")}` },
            { label: "Duration",      val: `${PLANS[plan].durationDays} days` },
            { label: "Email invites", val: `${PLANS[plan].emailInvites} included` },
          ].map(({ label, val }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: "#6b7280" }}>{label}</span>
              <span style={{ fontWeight: 600, color: "#0f172a" }}>{val}</span>
            </div>
          ))}
          <div style={{ height: 1, background: "#e5e7eb", margin: "8px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800 }}>
            <span>Total</span>
            <span style={{ color: "#2563eb" }}>Rs.{price.toLocaleString("en-IN")}</span>
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Inclusive of GST. Powered by Razorpay.</div>
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
    </div>
  );
}
