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
  if (period === "today") { const d = new Date(now); d.setHours(0,0,0,0); return d.toISOString(); }
  if (period === "week")  { const d = new Date(now); d.setDate(now.getDate()-7); return d.toISOString(); }
  if (period === "month") { const d = new Date(now); d.setDate(now.getDate()-30); return d.toISOString(); }
  return null;
}

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

export default async function AdminPage({ searchParams }: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (!process.env.ADMIN_USER_ID || user.id !== process.env.ADMIN_USER_ID) {
    redirect("/dashboard");
  }

  const period = searchParams.period || "month";
  const tab = searchParams.tab || "overview";
  const since = sinceDate(period);

  const cnt = (t: string) => supabase.from(t).select("*", { count: "exact", head: true });
  const cntF = (t: string) => since ? cnt(t).gte("created_at", since) : cnt(t);

  const [
    { count: totalIndividuals }, { count: totalCompanies }, { count: newSignups },
    { data: allProfiles }, { data: allCompanies },
    { count: totalCommitments }, { count: newCommitments },
    { count: activeC }, { count: completedC }, { count: withdrawnC }, { count: expiredC },
    { count: totalUpdates }, { count: newUpdates }, { count: totalCheers },
    { count: openTickets }, { count: resolvedTickets },
    { data: allTickets },
  ] = await Promise.all([
    cnt("profiles"), cnt("companies"), cntF("profiles"),
    supabase.from("profiles").select("plan_key"),
    supabase.from("companies").select("plan_key"),
    cnt("commitments"), cntF("commitments"),
    cnt("commitments").eq("status","active"),
    cnt("commitments").eq("status","completed"),
    cnt("commitments").eq("status","withdrawn"),
    cnt("commitments").eq("status","expired"),
    cnt("commitment_updates"), cntF("commitment_updates"), cnt("commitment_cheers"),
    cnt("support_tickets").eq("status","open"),
    cnt("support_tickets").eq("status","resolved"),
    supabase.from("support_tickets").select("*").order("created_at",{ascending:false}),
  ]);

  const indRevenue = (allProfiles||[]).reduce((s,p)=>s+(PLAN_REVENUE[p.plan_key]||0),0);
  const compRevenue = (allCompanies||[]).reduce((s,c)=>s+(PLAN_REVENUE[c.plan_key]||0),0);
  const totalRevenue = indRevenue + compRevenue;

  const openList = (allTickets||[]).filter((t:any)=>t.status==="open");
  const resolvedList = (allTickets||[]).filter((t:any)=>t.status==="resolved");

  return (
    <div style={{ padding:20 }}>

      {/* HEADER */}
      <h2>⚙️ Admin Dashboard</h2>

      {/* PERIOD FILTER */}
      <div style={{ display:"flex", gap:10, marginBottom:20 }}>
        {Object.entries(PERIOD_LABELS).map(([p,label])=>(
          <a key={p} href={`?period=${p}&tab=${tab}`}>
            {label}
          </a>
        ))}
      </div>

      {/* TAB SWITCH */}
      <div style={{ display:"flex", gap:10, marginBottom:20 }}>
        <a href={`?period=${period}&tab=overview`}>Overview</a>
        <a href={`?period=${period}&tab=tickets`}>Tickets ({openTickets||0})</a>
      </div>

      {/* OVERVIEW */}
      {tab==="overview" && (
        <>
          <h3>Revenue: ₹{totalRevenue}</h3>

          <div>Users: {totalIndividuals}</div>
          <div>Companies: {totalCompanies}</div>
          <div>New Signups: {newSignups}</div>

          <div>Total Commitments: {totalCommitments}</div>
          <div>Active: {activeC}</div>
          <div>Completed: {completedC}</div>

          <div>Total Updates: {totalUpdates}</div>
          <div>Total Cheers: {totalCheers}</div>
        </>
      )}

      {/* TICKETS */}
      {tab==="tickets" && (
        <>
          <h3>Open Tickets ({openList.length})</h3>

          {openList.map((t:any)=>(
            <div key={t.id}>
              <strong>{t.subject}</strong>
              <div>{t.message}</div>

              <form action={resolveTicket}>
                <input type="hidden" name="ticketId" value={t.id}/>
                <button>Resolve</button>
              </form>
            </div>
          ))}

          <h3>Resolved</h3>

          {resolvedList.map((t:any)=>(
            <div key={t.id}>
              <strong>{t.subject}</strong>
              <div>{t.message}</div>

              <form action={reopenTicket}>
                <input type="hidden" name="ticketId" value={t.id}/>
                <button>Reopen</button>
              </form>
            </div>
          ))}
        </>
      )}

    </div>
  );
}
