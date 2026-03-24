export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const PLAN_REVENUE: Record<string, number> = {
  ind_499: 499, ind_899: 899, ind_1299: 1299,
  comp_1999: 1999, comp_2999: 2999, comp_4999: 4999,
};
const PLAN_LABELS: Record<string, string> = {
  free: "Free", ind_499: "Starter", ind_899: "Growth", ind_1299: "Pro Creator",
  comp_1999: "Team", comp_2999: "Growth", comp_4999: "Scale",
};
const PERIOD_LABELS: Record<string, string> = {
  today: "Today", week: "Last 7 days", month: "Last 30 days", all: "All time",
};

function sinceDate(period: string): string | null {
  const now = new Date();
  if (period === "today") { const d = new Date(now); d.setHours(0,0,0,0); return d.toISOString(); }
  if (period === "week")  { const d = new Date(now); d.setDate(now.getDate()-7); return d.toISOString(); }
  if (period === "month") { const d = new Date(now); d.setDate(now.getDate()-30); return d.toISOString(); }
  return null;
}

// ── Server action to resolve a ticket ──
async function resolveTicket(formData: FormData) {
  "use server";
  const ticketId = formData.get("ticketId") as string;
  if (!ticketId) return;
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  await supabase.from("support_tickets").update({ status: "resolved" }).eq("id", ticketId);
  const { redirect } = await import("next/navigation");
  redirect("/admin");
}

// ── Server action to reopen a ticket ──
async function reopenTicket(formData: FormData) {
  "use server";
  const ticketId = formData.get("ticketId") as string;
  if (!ticketId) return;
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  await supabase.from("support_tickets").update({ status: "open" }).eq("id", ticketId);
  const { redirect } = await import("next/navigation");
  redirect("/admin");
}

export default async function AdminPage({ searchParams }: { searchParams: { period?: string; tab?: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (!process.env.ADMIN_USER_ID || user.id !== process.env.ADMIN_USER_ID) redirect("/dashboard");

  const period = searchParams.period || "month";
  const tab    = searchParams.tab || "overview";
  const since  = sinceDate(period);

  const cnt  = (t: string) => supabase.from(t).select("*", { count: "exact", head: true });
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
    supabase.from("support_tickets").select("id,subject,message,status,created_at").order("created_at",{ascending:false}),
  ]);

  const indRevenue  = (allProfiles  || []).reduce((s,p) => s+(PLAN_REVENUE[p.plan_key]||0), 0);
  const compRevenue = (allCompanies || []).reduce((s,c) => s+(PLAN_REVENUE[c.plan_key]||0), 0);
  const totalRevenue = indRevenue + compRevenue;
  const paidInd  = (allProfiles  || []).filter(p => p.plan_key && p.plan_key !== "free").length;
  const paidComp = (allCompanies || []).filter(c => c.plan_key && c.plan_key !== "free").length;

  const planCounts: Record<string,number> = {};
  [...(allProfiles||[]),...(allCompanies||[])].forEach(r => {
    if (r.plan_key) planCounts[r.plan_key] = (planCounts[r.plan_key]||0)+1;
  });

  const openList     = (allTickets || []).filter((t:any) => t.status === "open");
  const resolvedList = (allTickets || []).filter((t:any) => t.status === "resolved");

  // ── Styles ──
  const cardStyle = { background:"#fff", borderRadius:14, padding:"14px 16px", border:"1px solid #f0f1f6", boxShadow:"0 1px 6px rgba(0,0,0,0.04)" };
  const sectionLabel = { fontSize:12, fontWeight:700, color:"#9ca3af", textTransform:"uppercase" as const, letterSpacing:1, marginBottom:10, marginTop:24 };

  function Stat({ label, value, sub, color="#4338ca" }: { label:string; value:string|number; sub?:string; color?:string }) {
    return (
      <div style={cardStyle}>
        <div style={{ fontSize:10, fontWeight:600, color:"#9ca3af", textTransform:"uppercase" as const, letterSpacing:0.5, marginBottom:4 }}>{label}</div>
        <div style={{ fontSize:22, fontWeight:800, color }}>{value}</div>
        {sub && <div style={{ fontSize:11, color:"#9ca3af", marginTop:2 }}>{sub}</div>}
      </div>
    );
  }

  function TicketCard({ ticket, isOpen }: { ticket: any; isOpen: boolean }) {
    return (
      <div style={{ background:"#fff", borderRadius:14, border:`1px solid ${isOpen ? "#fecaca" : "#f0f1f6"}`, padding:"14px 16px", boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, flexWrap:"wrap" as const }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <span style={{ fontSize:10, fontWeight:700, padding:"2px 10px", borderRadius:20, background:isOpen?"#fee2e2":"#dcfce7", color:isOpen?"#dc2626":"#15803d" }}>
                {isOpen ? "Open" : "Resolved"}
              </span>
              <span style={{ fontSize:11, color:"#9ca3af" }}>
                {new Date(ticket.created_at).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
              </span>
            </div>
            <div style={{ fontSize:14, fontWeight:700, color:"#0f0c29", marginBottom:6 }}>{ticket.subject}</div>
            <div style={{ fontSize:13, color:"#6b7280", lineHeight:1.6, background:"#f8f9fc", borderRadius:10, padding:"10px 12px" }}>
              {ticket.message}
            </div>
          </div>
          {/* Action button */}
          <form action={isOpen ? resolveTicket : reopenTicket}>
            <input type="hidden" name="ticketId" value={ticket.id} />
            <button
              type="submit"
              style={{ padding:"8px 14px", borderRadius:10, border:"none", fontFamily:"inherit", fontSize:12, fontWeight:700, cursor:"pointer", background:isOpen?"linear-gradient(135deg,#10b981,#059669)":"#f3f4f6", color:isOpen?"#fff":"#6b7280", whiteSpace:"nowrap" as const, boxShadow:isOpen?"0 2px 8px rgba(16,185,129,0.25)":"none" }}
            >
              {isOpen ? "✓ Mark Resolved" : "↩ Reopen"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#f2f3f7", padding:"24px 16px 60px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap" as const, gap:12, marginBottom:24 }}>
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#0f0c29" }}>⚙️ Admin Dashboard</div>
            <div style={{ fontSize:11, color:"#9ca3af" }}>app.stated.in — internal overview</div>
          </div>
          <div style={{ display:"flex", gap:4, background:"#fff", borderRadius:12, padding:3, border:"1px solid #f0f1f6" }}>
            {Object.entries(PERIOD_LABELS).map(([p, lbl]) => (
              <a key={p} href={`?period=${p}&tab=${tab}`} style={{ padding:"6px 11px", borderRadius:9, fontSize:11, fontWeight:700, textDecoration:"none", background:period===p?"#4338ca":"transparent", color:period===p?"#fff":"#6b7280" }}>
                {lbl}
              </a>
            ))}
          </div>
        </div>

        {/* Tab nav */}
        <div style={{ display:"flex", gap:8, marginBottom:24 }}>
          {[["overview","📊 Overview"], ["tickets","🎫 Support Tickets"]].map(([t, lbl]) => (
            <a key={t} href={`?period=${period}&tab=${t}`} style={{ padding:"9px 18px", borderRadius:12, fontSize:13, fontWeight:700, textDecoration:"none", background:tab===t?"#0f0c29":"#fff", color:tab===t?"#fff":"#6b7280", border:"1px solid #f0f1f6", boxShadow: tab===t?"0 2px 8px rgba(0,0,0,0.1)":"none" }}>
              {lbl}
              {t === "tickets" && (openTickets || 0) > 0 && (
                <span style={{ marginLeft:6, background:"#ef4444", color:"#fff", borderRadius:20, fontSize:10, fontWeight:800, padding:"1px 6px" }}>
                  {openTickets}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {tab === "overview" && (
          <>
            {/* Revenue banner */}
            <div style={{ background:"linear-gradient(135deg,#4338ca,#6366f1)", borderRadius:16, padding:"20px 24px", marginBottom:4, color:"#fff", boxShadow:"0 4px 20px rgba(67,56,202,0.2)" }}>
              <div style={{ fontSize:11, fontWeight:600, opacity:0.75, textTransform:"uppercase" as const, letterSpacing:0.5, marginBottom:6 }}>Total Inferred Revenue (All Time)</div>
              <div style={{ fontSize:36, fontWeight:800, marginBottom:8 }}>₹{totalRevenue.toLocaleString()}</div>
              <div style={{ display:"flex", gap:24, flexWrap:"wrap" as const, fontSize:12, opacity:0.85 }}>
                <span>👤 Individual: ₹{indRevenue.toLocaleString()} ({paidInd} paid)</span>
                <span>🏢 Company: ₹{compRevenue.toLocaleString()} ({paidComp} paid)</span>
              </div>
            </div>
            <div style={{ fontSize:10, color:"#9ca3af", marginBottom:8, padding:"4px 2px" }}>
              * Based on current plan keys × price. Does not include credit pack purchases.
            </div>

            <div style={sectionLabel}>Users — {PERIOD_LABELS[period]}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10 }}>
              <Stat label="Individuals"      value={totalIndividuals||0} sub="all time"               color="#7c3aed" />
              <Stat label="Companies"        value={totalCompanies||0}   sub="all time"               color="#0891b2" />
              <Stat label="New Signups"      value={newSignups||0}       sub={PERIOD_LABELS[period]}  color="#10b981" />
              <Stat label="Paid Individuals" value={paidInd}             sub="on a plan"              color="#4338ca" />
              <Stat label="Paid Companies"   value={paidComp}            sub="on a plan"              color="#0891b2" />
            </div>

            <div style={sectionLabel}>Commitments</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:10 }}>
              <Stat label="Total"     value={totalCommitments||0}  sub="all time"              color="#4338ca" />
              <Stat label="New"       value={newCommitments||0}    sub={PERIOD_LABELS[period]} color="#10b981" />
              <Stat label="Active"    value={activeC||0}                                       color="#10b981" />
              <Stat label="Completed" value={completedC||0}                                    color="#4338ca" />
              <Stat label="Withdrawn" value={withdrawnC||0}                                    color="#f59e0b" />
              <Stat label="Expired"   value={expiredC||0}                                      color="#ef4444" />
            </div>

            <div style={sectionLabel}>Engagement</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10 }}>
              <Stat label="Total Updates" value={totalUpdates||0} sub="all time"              color="#6366f1" />
              <Stat label="New Updates"   value={newUpdates||0}   sub={PERIOD_LABELS[period]} color="#10b981" />
              <Stat label="Total Cheers"  value={totalCheers||0}  sub="all time"              color="#f59e0b" />
            </div>

            <div style={sectionLabel}>Plan Breakdown</div>
            <div style={{ background:"#fff", borderRadius:14, border:"1px solid #f0f1f6", overflow:"hidden" }}>
              {Object.keys(planCounts).length === 0 ? (
                <div style={{ padding:24, textAlign:"center" as const, fontSize:13, color:"#9ca3af" }}>No paid plans yet</div>
              ) : Object.entries(planCounts).sort((a,b)=>b[1]-a[1]).map(([key,count],i,arr) => (
                <div key={key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:i<arr.length-1?"1px solid #f0f1f6":"none" }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#0f0c29" }}>{PLAN_LABELS[key]||key} <span style={{ fontSize:10, color:"#9ca3af" }}>({key})</span></div>
                    <div style={{ fontSize:11, color:"#9ca3af" }}>₹{PLAN_REVENUE[key]||0} × {count} = ₹{((PLAN_REVENUE[key]||0)*count).toLocaleString()}</div>
                  </div>
                  <div style={{ fontSize:20, fontWeight:800, color:"#4338ca" }}>{count}</div>
                </div>
              ))}
            </div>

            <div style={sectionLabel}>Support Summary</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Stat label="Open Tickets"     value={openTickets||0}     sub="awaiting response" color="#ef4444" />
              <Stat label="Resolved Tickets" value={resolvedTickets||0} sub="closed"            color="#10b981" />
            </div>
            {(openTickets || 0) > 0 && (
              <div style={{ marginTop:12 }}>
                <a href={`?period=${period}&tab=tickets`} style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, fontWeight:700, color:"#ef4444", textDecoration:"none", background:"#fef2f2", padding:"8px 16px", borderRadius:10, border:"1px solid #fecaca" }}>
                  🎫 View {openTickets} open ticket{(openTickets||0)>1?"s":""} →
                </a>
              </div>
            )}
          </>
        )}

        {/* ── TICKETS TAB ── */}
        {tab === "tickets" && (
          <>
            {/* Open tickets */}
            <div style={{ fontSize:14, fontWeight:700, color:"#0f0c29", marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
              Open Tickets
              {openList.length > 0 && (
                <span style={{ background:"#ef4444", color:"#fff", borderRadius:20, fontSize:11, fontWeight:800, padding:"2px 8px" }}>{openList.length}</span>
              )}
            </div>
            {openList.length === 0 ? (
              <div style={{ background:"#fff", borderRadius:14, padding:"28px", textAlign:"center" as const, border:"1px solid #f0f1f6", marginBottom:24 }}>
                <div style={{ fontSize:24, marginBottom:8 }}>🎉</div>
                <div style={{ fontSize:13, color:"#9ca3af" }}>No open tickets — all caught up!</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column" as const, gap:10, marginBottom:28 }}>
                {openList.map((t:any) => <TicketCard key={t.id} ticket={t} isOpen={true} />)}
              </div>
            )}

            {/* Resolved tickets */}
            <div style={{ fontSize:14, fontWeight:700, color:"#0f0c29", marginBottom:12 }}>
              Resolved Tickets <span style={{ fontSize:12, color:"#9ca3af", fontWeight:400 }}>({resolvedList.length})</span>
            </div>
            {resolvedList.length === 0 ? (
              <div style={{ background:"#fff", borderRadius:14, padding:"28px", textAlign:"center" as const, border:"1px solid #f0f1f6" }}>
                <div style={{ fontSize:13, color:"#9ca3af" }}>No resolved tickets yet.</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column" as const, gap:10 }}>
                {resolvedList.map((t:any) => <TicketCard key={t.id} ticket={t} isOpen={false} />)}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
                           }
