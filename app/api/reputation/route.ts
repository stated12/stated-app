import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const companyId = searchParams.get("companyId");

  // 🚫 Prevent invalid state
  if ((!userId && !companyId) || (userId && companyId)) {
    return NextResponse.json(null);
  }

  const supabase = await createClient();

  // ================= FETCH COMMITMENTS =================

  let commitmentQuery = supabase
    .from("commitments")
    .select("id, status, views")
    .eq("visibility", "public");

  if (companyId) {
    commitmentQuery = commitmentQuery.eq("company_id", companyId);
  } else {
    commitmentQuery = commitmentQuery.eq("user_id", userId);
  }

  const { data: commitments } = await commitmentQuery;

  if (!commitments || commitments.length === 0) {
    return NextResponse.json({
      score: 0,
      badge: "Beginner",
      completionRate: 0,
      completed: 0,
      active: 0,
      withdrawn: 0,
    });
  }

  // ================= COUNT STATUS =================

  const completed = commitments.filter(c => c.status === "completed").length;
  const active = commitments.filter(c => c.status === "active").length;
  const withdrawn = commitments.filter(c => c.status === "withdrawn").length;

  const total = completed + active + withdrawn;

  const completionRate =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  // ================= COUNT UPDATES =================

  const commitmentIds = commitments.map(c => c.id);

  const { count: updateCount } = await supabase
    .from("commitment_updates")
    .select("*", { count: "exact", head: true })
    .in("commitment_id", commitmentIds);

  // ================= CALCULATE VIEWS BONUS =================

  const totalViews =
    commitments.reduce((sum, c) => sum + (c.views || 0), 0);

  const viewsBonus = Math.floor(totalViews / 50);

  // ================= BONUS FOR COMPLETION RATE =================

  let rateBonus = 0;
  if (completionRate >= 80) rateBonus = 10;
  else if (completionRate >= 60) rateBonus = 5;

  // ================= FINAL SCORE =================

  const score =
    completed * 10 +
    active * 2 +
    (updateCount || 0) * 2 +
    viewsBonus -
    withdrawn * 5 +
    rateBonus;

  // ================= BADGE SYSTEM =================

  let badge = "Beginner";

  if (score >= 200) badge = "Trusted";
  else if (score >= 100) badge = "Leader";
  else if (score >= 50) badge = "Operator";
  else if (score >= 20) badge = "Builder";

  return NextResponse.json({
    score,
    badge,
    completionRate,
    completed,
    active,
    withdrawn,
  });
}
