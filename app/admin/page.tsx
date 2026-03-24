export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const PLAN_REVENUE: Record<string, number> = {
  ind_499: 499, ind_899: 899, ind_1299: 1299,
  comp_1999: 1999, comp_2999: 2999, comp_4999: 4999,
};

const PLAN_LABELS: Record<string, string> = {
  free: "Free",
  ind_499: "Starter",
  ind_899: "Growth",
  ind_1299: "Pro Creator",
  comp_1999: "Team",
  comp_2999: "Growth",
  comp_4999: "Scale",
};

const PERIOD_LABELS: Record<string, string> = {
  today: "Today",
  week: "Last 7 days",
  month: "Last 30 days",
  all: "All time",
};

function sinceDate(period: string): string | null {
  const now = new Date();
  if (period === "today") {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  }
  if (period === "week") {
    const d = new Date(now);
    d.setDate(now.getDate() - 7);
    return d.toISOString();
  }
  if (period === "month") {
    const d = new Date(now);
    d.setDate(now.getDate() - 30);
    return d.toISOString();
  }
  return null;
}

// ── Server actions ──
async function resolveTicket(formData: FormData) {
  "use server";
  const ticketId = formData.get("ticketId") as string;
  if (!ticketId) return;
  const supabase = await createClient();
  await supabase.from("support_tickets").update({ status: "resolved" }).eq("id", ticketId);
  redirect("/admin");
}

async function reopenTicket(formData: FormData) {
  "use server";
  const ticketId = formData.get("ticketId") as string;
  if (!ticketId) return;
  const supabase = await createClient();
  await supabase.from("support_tickets").update({ status: "open" }).eq("id", ticketId);
  redirect("/admin");
}

export default async function AdminPage({ searchParams }: { searchParams: { period?: string; tab?: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  if (!process.env.ADMIN_USER_ID || user.id !== process.env.ADMIN_USER_ID) {
    redirect("/dashboard");
  }

  const period = searchParams.period || "month";
  const tab = searchParams.tab || "overview";
  const since = sinceDate(period);

  const cnt = (t: string) =>
    supabase.from(t).select("*", { count: "exact", head: true });

  const cntF = (t: string) =>
    since ? cnt(t).gte("created_at", since) : cnt(t);

  const [
    { count: totalIndividuals },
    { count: totalCompanies },
    { count: newSignups },
    { data: allProfiles },
    { data: allCompanies },
    { count: totalCommitments },
    { count: newCommitments },
    { count: activeC },
    { count: completedC },
    { count: withdrawnC },
    { count: expiredC },
    { count: totalUpdates },
    { count: newUpdates },
    { count: totalCheers },
    { count: openTickets },
    { count: resolvedTickets },
    { data: allTickets },
  ] = await Promise.all([
    cnt("profiles"),
    cnt("companies"),
    cntF("profiles"),
    supabase.from("profiles").select("plan_key"),
    supabase.from("companies").select("plan_key"),
    cnt("commitments"),
    cntF("commitments"),
    cnt("commitments").eq("status", "active"),
    cnt("commitments").eq("status", "completed"),
    cnt("commitments").eq("status", "withdrawn"),
    cnt("commitments").eq("status", "expired"),
    cnt("commitment_updates"),
    cntF("commitment_updates"),
    cnt("commitment_cheers"),
    cnt("support_tickets").eq("status", "open"),
    cnt("support_tickets").eq("status", "resolved"),
    supabase
      .from("support_tickets")
      .select("id,subject,message,status,created_at")
      .order("created_at", { ascending: false }),
  ]);

  const indRevenue =
    (allProfiles || []).reduce((s, p) => s + (PLAN_REVENUE[p.plan_key] || 0), 0);

  const compRevenue =
    (allCompanies || []).reduce((s, c) => s + (PLAN_REVENUE[c.plan_key] || 0), 0);

  const totalRevenue = indRevenue + compRevenue;

  const paidInd = (allProfiles || []).filter(p => p.plan_key && p.plan_key !== "free").length;
  const paidComp = (allCompanies || []).filter(c => c.plan_key && c.plan_key !== "free").length;

  const planCounts: Record<string, number> = {};
  [...(allProfiles || []), ...(allCompanies || [])].forEach(r => {
    if (r.plan_key) planCounts[r.plan_key] = (planCounts[r.plan_key] || 0) + 1;
  });

  const openList = (allTickets || []).filter((t: any) => t.status === "open");
  const resolvedList = (allTickets || []).filter((t: any) => t.status === "resolved");

  const cardStyle = {
    background: "#fff",
    borderRadius: 14,
    padding: "14px 16px",
    border: "1px solid #f0f1f6",
    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
  };

  const sectionLabel = {
    fontSize: 12,
    fontWeight: 700,
    color: "#9ca3af",
    textTransform: "uppercase" as const,
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 24,
  };

  function Stat({ label, value, sub, color = "#4338ca" }: any) {
    return (
      <div style={cardStyle}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af" }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: "#9ca3af" }}>{sub}</div>}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f2f3f7", padding: "24px 16px 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>⚙️ Admin Dashboard</div>
        </div>

        {/* Revenue */}
        <div style={{
          background: "linear-gradient(135deg,#4338ca,#6366f1)",
          borderRadius: 16,
          padding: 20,
          color: "#fff",
          marginBottom: 20
        }}>
          <div>Total Revenue</div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>₹{totalRevenue}</div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
          <Stat label="Users" value={totalIndividuals} />
          <Stat label="Companies" value={totalCompanies} />
          <Stat label="Commitments" value={totalCommitments} />
          <Stat label="Cheers" value={totalCheers} />
        </div>

        {/* Tickets link */}
        <div style={{ marginTop: 20 }}>
          <a href={`?period=${period}&tab=tickets`}>
            View Tickets ({openTickets || 0})
          </a>
        </div>

        {/* Tickets */}
        {tab === "tickets" && (
          <div style={{ marginTop: 20 }}>
            {openList.map((t: any) => (
              <div key={t.id} style={cardStyle}>
                <strong>{t.subject}</strong>
                <div>{t.message}</div>
                <form action={resolveTicket}>
                  <input type="hidden" name="ticketId" value={t.id} />
                  <button>Resolve</button>
                </form>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
