export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const PLAN_LABELS: Record<string, string> = {
  free:      "Free",
  ind_499:   "Starter",
  ind_899:   "Growth",
  ind_1299:  "Pro Creator",
  comp_1999: "Team",
  comp_2999: "Growth",
  comp_4999: "Scale",
};

const PACK_LABELS: Record<string, string> = {
  pack_10: "10 Credit Pack",
  pack_25: "25 Credit Pack",
  pack_50: "50 Credit Pack",
};

const PLAN_FEATURES: Record<string, string[]> = {
  free:      ["5 credits", "2 updates per commitment", "No analytics", "2 team members (company)"],
  ind_499:   ["20 credits", "5 updates per commitment", "Analytics unlocked"],
  ind_899:   ["40 credits", "10 updates per commitment", "Analytics unlocked", "PRO badge", "Extended insights"],
  ind_1299:  ["60 credits", "15 updates per commitment", "Analytics unlocked", "PRO badge", "Extended insights"],
  comp_1999: ["25 shared credits", "Up to 5 members", "5 updates per commitment", "Company analytics"],
  comp_2999: ["50 shared credits", "Up to 10 members", "10 updates per commitment", "Company analytics"],
  comp_4999: ["75 shared credits", "Up to 15 members", "15 updates per commitment", "Company analytics"],
};

function planColor(planKey: string) {
  if (planKey.startsWith("comp_")) return { accent: "#0891b2", light: "#e0f2fe", text: "#0369a1" };
  if (planKey === "free")          return { accent: "#9ca3af", light: "#f3f4f6", text: "#6b7280" };
  return                                  { accent: "#4338ca", light: "#eef2ff", text: "#4338ca" };
}

function PaymentTable({ payments }: { payments: any[] }) {
  if (!payments || payments.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" as const, fontSize: 13, color: "#9ca3af" }}>
        No payments yet.
      </div>
    );
  }
  return (
    <div style={{ overflowX: "auto" as const }}>
      <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #f0f1f6" }}>
            {["Date", "Plan / Pack", "Amount", "Credits", "Type", "Status"].map((h) => (
              <th key={h} style={{ padding: "8px 12px", textAlign: "left" as const, fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase" as const, letterSpacing: 0.4, whiteSpace: "nowrap" as const }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={p.id} style={{ borderBottom: i < payments.length - 1 ? "1px solid #f8f9fc" : "none" }}>
              <td style={{ padding: "10px 12px", color: "#6b7280", whiteSpace: "nowrap" as const }}>
                {new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </td>
              <td style={{ padding: "10px 12px", fontWeight: 600, color: "#0f0c29" }}>
                {PLAN_LABELS[p.plan_key] || PACK_LABELS[p.plan_key] || p.plan_key}
              </td>
              <td style={{ padding: "10px 12px", fontWeight: 700, color: "#0f0c29" }}>
                Rs.{Math.round((p.amount || 0) / 100)}
              </td>
              <td style={{ padding: "10px 12px", color: "#374151" }}>
                +{p.credits_added || 0}
              </td>
              <td style={{ padding: "10px 12px" }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: p.payment_type === "credit_pack" ? "#f0fdf4" : "#eef2ff", color: p.payment_type === "credit_pack" ? "#15803d" : "#4338ca", whiteSpace: "nowrap" as const }}>
                  {p.payment_type === "credit_pack" ? "Credit Pack" : "Plan"}
                </span>
              </td>
              <td style={{ padding: "10px 12px" }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: p.status === "paid" ? "#dcfce7" : "#fee2e2", color: p.status === "paid" ? "#15803d" : "#dc2626" }}>
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlanSection({
  planKey, credits, payments, isCompany, upgradeHref,
}: {
  planKey: string; credits: number; payments: any[]; isCompany: boolean; upgradeHref: string;
}) {
  const color    = planColor(planKey);
  const isFree   = planKey === "free";
  const features = PLAN_FEATURES[planKey] || [];
  const totalCreditsAdded = payments.reduce((s, p) => s + (p.credits_added || 0), 0);

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f1f6", overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.04)", marginBottom: 16 }}>
      <div style={{ height: 3, background: "linear-gradient(90deg," + color.accent + "," + color.accent + "88)" }} />
      <div style={{ padding: "18px 20px" }}>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 10, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 4 }}>
              {isCompany ? "Company Plan" : "Individual Plan"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: "#0f0c29" }}>
                {PLAN_LABELS[planKey] || planKey}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 20, background: color.light, color: color.text }}>
                {isFree ? "FREE" : "ACTIVE"}
              </span>
            </div>
            {!isFree && features.length > 0 && (
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column" as const, gap: 3 }}>
                {features.map((f, i) => (
                  <div key={i} style={{ fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ color: "#10b981" }}>v</span> {f}
                  </div>
                ))}
              </div>
            )}
            {isFree && features.length > 0 && (
              <div style={{ marginTop: 8, fontSize: 12, color: "#92400e", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "6px 10px", lineHeight: 1.6 }}>
                <strong>Free plan:</strong> {features.join(", ")}. Upgrade to unlock more features.
              </div>
            )}
          </div>
          <Link
            href={upgradeHref}
            style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg," + color.accent + "," + color.accent + "cc)", padding: "8px 16px", borderRadius: 20, textDecoration: "none", whiteSpace: "nowrap" as const, boxShadow: "0 2px 8px " + color.accent + "33", flexShrink: 0 }}
          >
            {isFree ? "Upgrade" : "Buy Credits"}
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[
            { label: "Credits Left",   value: credits,           color: isCompany ? "#0891b2" : "#d97706" },
            { label: "Credits Bought", value: totalCreditsAdded, color: "#4338ca" },
            { label: "Payments",       value: payments.length,   color: "#10b981" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#f8f9fc", borderRadius: 12, padding: "10px 8px", textAlign: "center" as const, border: "1px solid #f0f1f6" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #f0f1f6", paddingTop: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f0c29", marginBottom: 10 }}>Payment History</div>
          <PaymentTable payments={payments} />
        </div>
      </div>
    </div>
  );
}

export default async function BillingPage({
  searchParams,
}: {
  searchParams: { workspace?: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Detect workspace from query param (server component -- no useSearchParams needed)
  const isCompanyContext = searchParams?.workspace === "company";

  const { data: profile } = await supabase
    .from("profiles").select("*").eq("id", user.id).maybeSingle();

  const { data: ownedCompany } = await supabase
    .from("companies").select("*").eq("owner_user_id", user.id).maybeSingle();

  const { data: individualPayments } = await supabase
    .from("payments").select("*")
    .eq("user_id", user.id).is("company_id", null)
    .order("created_at", { ascending: false });

  const { data: companyPayments } = ownedCompany
    ? await supabase.from("payments").select("*")
        .eq("company_id", ownedCompany.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  // Dashboard back link respects workspace context
  const dashboardHref   = isCompanyContext ? "/dashboard/company" : "/dashboard";
  const dashboardLabel  = isCompanyContext ? "Company Dashboard" : "Dashboard";
  const upgradeHref     = isCompanyContext ? "/upgrade?workspace=company" : "/upgrade";
  const pageTitle       = isCompanyContext ? "Company Billing" : "Billing";
  const pageSubtitle    = isCompanyContext ? "Company plan, credits & payment history" : "Plans, credits & payment history";

  return (
    <div style={{ minHeight: "100vh", background: "#f2f3f7", padding: "24px 16px 60px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image src="/logo.png" alt="" width={32} height={32} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: isCompanyContext ? "#0891b2" : "#4338ca" }}>{pageTitle}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{pageSubtitle}</div>
            </div>
          </div>
          <Link href={dashboardHref} style={{ fontSize: 12, color: "#6b7280", textDecoration: "none", fontWeight: 600 }}>
            {"<- "}{dashboardLabel}
          </Link>
        </div>

        {/* Show ONLY company section when in company context */}
        {isCompanyContext && ownedCompany && (
          <PlanSection
            planKey={ownedCompany.plan_key || "free"}
            credits={ownedCompany.credits ?? 0}
            payments={companyPayments || []}
            isCompany={true}
            upgradeHref={upgradeHref}
          />
        )}

        {/* Show ONLY individual section when in individual context */}
        {!isCompanyContext && profile && (
          <PlanSection
            planKey={profile.plan_key || "free"}
            credits={profile.credits ?? 0}
            payments={individualPayments || []}
            isCompany={false}
            upgradeHref={upgradeHref}
          />
        )}

        {/* If company owner visits plain /billing (no param), show both */}
        {!isCompanyContext && ownedCompany && (
          <PlanSection
            planKey={ownedCompany.plan_key || "free"}
            credits={ownedCompany.credits ?? 0}
            payments={companyPayments || []}
            isCompany={true}
            upgradeHref="/upgrade?workspace=company"
          />
        )}

        <div style={{ textAlign: "center" as const, fontSize: 11, color: "#9ca3af", marginTop: 8, lineHeight: 1.8 }}>
          Secure payments via Razorpay * Receipts sent via email at time of purchase
          <br />
          Questions?{" "}
          <Link href={isCompanyContext ? "/dashboard/support?workspace=company" : "/dashboard/support"} style={{ color: isCompanyContext ? "#0891b2" : "#4338ca", textDecoration: "none", fontWeight: 600 }}>
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
        }
